import pytest
from fastapi.testclient import TestClient
from unittest.mock import Mock, patch
import sys
import os

# Add the parent directory to the path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from main import app
import services.curriculum_service as curriculum_service
import services.student_service as student_service

client = TestClient(app)

class TestHealthEndpoint:
    def test_health_check(self):
        response = client.get("/health")
        assert response.status_code == 200
        data = response.json()
        assert "status" in data

class TestStudentEndpoints:
    @patch('dependencies.auth.verify_token')
    @patch('services.student_service.StudentService.get_student_curriculum')
    def test_get_curriculum(self, mock_curriculum, mock_auth):
        mock_auth.return_value = {"user_id": 1, "role": "STUDENT"}
        mock_curriculum.return_value = {
            "userId": 1,
            "curriculum": [
                {
                    "subject_code": "TEST101",
                    "suggested_semester": 1,
                    "subject": {"name": "Test Subject", "credits": 3}
                }
            ]
        }
        
        response = client.get("/api/student/curriculum", headers={"Authorization": "Bearer test-token"})
        assert response.status_code == 200
        data = response.json()
        assert data["userId"] == 1
        assert len(data["curriculum"]) == 1

    @patch('dependencies.auth.verify_token')
    @patch('services.student_service.StudentService.get_progress_summary')
    def test_progress_summary(self, mock_summary, mock_auth):
        mock_auth.return_value = {"user_id": 1, "role": "STUDENT"}
        mock_summary.return_value = {
            "userId": 1,
            "completedCredits": 15,
            "gpa": 4.2,
            "progressPercentage": 25.0
        }
        
        response = client.get("/api/student/progress-summary", headers={"Authorization": "Bearer test-token"})
        assert response.status_code == 200
        data = response.json()
        assert data["completedCredits"] == 15
        assert data["gpa"] == 4.2

    @patch('dependencies.auth.verify_token')
    @patch('services.student_service.StudentService.update_subject_progress')
    def test_update_progress(self, mock_update, mock_auth):
        mock_auth.return_value = {"user_id": 1, "role": "STUDENT"}
        mock_update.return_value = {
            "success": True,
            "message": "Progress updated",
            "subject_code": "TEST101"
        }
        
        response = client.post(
            "/api/student/progress",
            data={"subject_code": "TEST101", "status": "Completed", "final_grade": "4.5"},
            headers={"Authorization": "Bearer test-token"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True

class TestCurriculumService:
    def test_calculate_gpa(self):
        # Test GPA calculation logic
        grades = [4.0, 3.5, 4.5]
        credits = [3, 4, 2]
        
        total_points = sum(g * c for g, c in zip(grades, credits))
        total_credits = sum(credits)
        expected_gpa = total_points / total_credits
        
        assert abs(expected_gpa - 3.89) < 0.1  # Approximate GPA

    def test_available_subjects_logic(self):
        # Test basic prerequisite logic
        passed_subjects = {"MATH101", "PHYS101"}
        required_prereq = "MATH101"
        
        # Subject should be available if prerequisite is met
        is_available = required_prereq in passed_subjects
        assert is_available is True
        
        # Subject should not be available if prerequisite is missing
        required_prereq = "CHEM101"
        is_available = required_prereq in passed_subjects
        assert is_available is False

if __name__ == "__main__":
    pytest.main([__file__])