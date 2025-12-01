import pytest
from fastapi.testclient import TestClient
from httpx import AsyncClient
from main import app


class TestCurriculumAPI:
    
    @pytest.fixture
    def client(self):
        return TestClient(app)
    
    @pytest.fixture
    async def async_client(self):
        async with AsyncClient(app=app, base_url="http://test") as ac:
            yield ac
    
    def test_health_check(self, client):
        response = client.get("/health")
        assert response.status_code == 200
        assert response.json() == {"status": "healthy"}
    
    @pytest.mark.asyncio
    async def test_get_curriculum_success(self, async_client):
        # Given
        program_id = "ing_sistemas"
        
        # When
        response = await async_client.get(f"/api/curriculum/{program_id}")
        
        # Then
        assert response.status_code == 200
        data = response.json()
        assert "curriculum" in data
        assert isinstance(data["curriculum"], list)
    
    @pytest.mark.asyncio
    async def test_get_curriculum_invalid_program(self, async_client):
        # Given
        invalid_program = "invalid_program"
        
        # When
        response = await async_client.get(f"/api/curriculum/{invalid_program}")
        
        # Then
        assert response.status_code == 404
    
    @pytest.mark.asyncio
    async def test_upload_curriculum_success(self, async_client):
        # Given
        program_id = "ing_sistemas"
        file_content = "subject,credits,semester\nMath I,4,1\nProg I,3,1"
        
        # When
        response = await async_client.post(
            f"/api/curriculum/{program_id}/upload",
            files={"file": ("curriculum.csv", file_content, "text/csv")}
        )
        
        # Then
        assert response.status_code == 200
        data = response.json()
        assert data["message"] == "Curriculum uploaded successfully"
    
    @pytest.mark.asyncio
    async def test_upload_curriculum_invalid_format(self, async_client):
        # Given
        program_id = "ing_sistemas"
        invalid_content = "invalid format"
        
        # When
        response = await async_client.post(
            f"/api/curriculum/{program_id}/upload",
            files={"file": ("curriculum.csv", invalid_content, "text/csv")}
        )
        
        # Then
        assert response.status_code == 400
        data = response.json()
        assert "error" in data
    
    def test_get_student_progress_unauthorized(self, client):
        # When
        response = client.get("/api/student/123/progress")
        
        # Then
        assert response.status_code == 401