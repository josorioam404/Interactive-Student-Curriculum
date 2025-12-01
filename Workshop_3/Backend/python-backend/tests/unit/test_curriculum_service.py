import pytest
from unittest.mock import Mock, patch
from services.curriculum_service import calculate_available_subjects, get_completed_subjects


class TestCurriculumService:
    
    @patch('services.curriculum_service.get_connection')
    def test_calculate_available_subjects_success(self, mock_get_connection):
        # Given
        mock_conn = Mock()
        mock_cur = Mock()
        mock_get_connection.return_value = mock_conn
        mock_conn.cursor.return_value = mock_cur
        
        # Mock database responses
        mock_cur.fetchone.return_value = ('ing_sistemas',)
        mock_cur.fetchall.side_effect = [
            [('MATH101',)],  # passed subjects
            [('PROG101', 'Programming I', 3, 1, 'Core', None)]  # all subjects
        ]
        
        # When
        result = calculate_available_subjects(1)
        
        # Then
        assert len(result) == 1
        assert result[0]['code'] == 'PROG101'
        mock_cur.close.assert_called()
        mock_conn.close.assert_called()
    
    @patch('services.curriculum_service.get_connection')
    def test_get_completed_subjects_success(self, mock_get_connection):
        # Given
        mock_conn = Mock()
        mock_cur = Mock()
        mock_get_connection.return_value = mock_conn
        mock_conn.cursor.return_value = mock_cur
        
        mock_cur.fetchall.return_value = [
            ('MATH101', 'Mathematics I', 4.5, 'Approved')
        ]
        
        # When
        result = get_completed_subjects(1)
        
        # Then
        assert len(result) == 1
        assert result[0]['code'] == 'MATH101'
        assert result[0]['grade'] == 4.5
        mock_cur.close.assert_called()
        mock_conn.close.assert_called()
