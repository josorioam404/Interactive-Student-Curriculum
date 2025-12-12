import pytest
from fastapi.testclient import TestClient
from unittest.mock import Mock, patch, MagicMock
import sys
import os

# Add the parent directory to the path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from main import app
from services.student_service import StudentService

client = TestClient(app)

class TestHealthEndpoint:
    def test_health_check(self):
        response = client.get("/health")
        assert response.status_code == 200
        data = response.json()
        assert "status" in data

class TestStudentService:
    @patch('services.student_service.StudentRepository')
    @patch('services.student_service.CurriculumRepository')
    def test_get_student_curriculum(self, mock_curriculum_repo, mock_student_repo):
        # Setup mocks
        service = StudentService()
        service.student_repo = mock_student_repo
        service.curriculum_repo = mock_curriculum_repo
        
        # Mock repository responses
        mock_student_repo.get_user_program.return_value = ("ING_SISTEMAS", "Test User")
        mock_student_repo.get_curriculum_with_progress.return_value = [
            (1, "MATH101", 1, "Core", True, None, "Calculus I", 4, 6, "Math course", "Not Taken", None)
        ]
        
        result = service.get_student_curriculum(1)
        
        assert result.userId == 1
        assert result.userName == "Test User"
        assert result.programCode == "ING_SISTEMAS"
        assert len(result.curriculum) == 1
        assert result.curriculum[0].subject_code == "MATH101"

    @patch('services.student_service.StudentRepository')
    @patch('services.student_service.CurriculumRepository')
    def test_get_progress_summary(self, mock_curriculum_repo, mock_student_repo):
        service = StudentService()
        service.student_repo = mock_student_repo
        service.curriculum_repo = mock_curriculum_repo
        
        mock_student_repo.get_user_program.return_value = ("ING_SISTEMAS", "Test User")
        mock_curriculum_repo.get_program_total_credits.return_value = 160
        mock_student_repo.get_progress_statistics.return_value = (5, 20, 4.2, 4.1)
        
        result = service.get_progress_summary(1)
        
        assert result.userId == 1
        assert result.completedSubjects == 5
        assert result.completedCredits == 20
        assert result.totalProgramCredits == 160
        assert result.gpa == 4.2
        assert result.papa == 4.1

    @patch('services.student_service.StudentRepository')
    @patch('services.student_service.CurriculumRepository')
    def test_update_progress(self, mock_curriculum_repo, mock_student_repo):
        service = StudentService()
        service.student_repo = mock_student_repo
        service.curriculum_repo = mock_curriculum_repo
        
        mock_curriculum_repo.subject_exists.return_value = True
        mock_student_repo.get_user_program.return_value = ("ING_SISTEMAS", "Test User")
        mock_student_repo.get_completed_subjects.return_value = {"MATH101"}
        mock_student_repo.get_subject_prerequisites.return_value = None
        mock_student_repo.update_subject_progress.return_value = None
        
        result = service.update_progress(1, "PHYS101", "Completed", 4.5)
        
        assert result["success"] is True
        assert result["subject_code"] == "PHYS101"
        assert result["status"] == "Completed"
        assert result["final_grade"] == 4.5

class TestBusinessLogic:
    def test_calculate_gpa(self):
        # Test GPA calculation logic
        grades = [4.0, 3.5, 4.5]
        credits = [3, 4, 2]
        
        total_points = sum(g * c for g, c in zip(grades, credits))
        total_credits = sum(credits)
        expected_gpa = total_points / total_credits
        
        assert abs(expected_gpa - 3.89) < 0.1

    def test_prerequisite_checking(self):
        service = StudentService()
        
        # Test simple prerequisite checking
        completed_subjects = {"MATH101", "PHYS101"}
        prereq_rules = {"required": ["MATH101"]}
        
        prereqs_met, missing = service._check_prerequisites(prereq_rules, completed_subjects)
        assert prereqs_met is True
        assert len(missing) == 0
        
        # Test missing prerequisite
        prereq_rules = {"required": ["CHEM101"]}
        prereqs_met, missing = service._check_prerequisites(prereq_rules, completed_subjects)
        assert prereqs_met is False
        assert "CHEM101" in missing

if __name__ == "__main__":
    pytest.main([__file__])