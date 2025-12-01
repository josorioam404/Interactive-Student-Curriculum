# Database Setup Guide for Testing

## Current Status
- ✅ **Unit Tests**: Working perfectly (2/2 passed)
- ❌ **Integration Tests**: Database connection issues
- 🔧 **Database**: PostgreSQL container running but authentication problems

## Quick Solution: Run Unit Tests Only

```bash
# Run only unit tests (these work!)
python -m pytest tests/unit/ -v

# Run with coverage
python -m pytest tests/unit/ --cov=services --cov-report=term-missing
```

## Database Setup Options

### Option 1: Fix Current Database (Recommended)

The PostgreSQL container is running but has authentication issues. Here's how to fix it:

1. **Stop and recreate the database container:**
```bash
docker stop interactive_curriculum_db
docker rm interactive_curriculum_db
```

2. **Start a new container with proper configuration:**
```bash
docker run -d \
  --name postgres-test \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=admin123 \
  -e POSTGRES_DB=interactive_curriculum \
  -p 5433:5432 \
  postgres:13
```

3. **Update your database connection to use port 5433:**
```python
# In your test configuration
DB_HOST=localhost
DB_PORT=5433
DB_USER=admin
DB_PASSWORD=admin123
DB_NAME=interactive_curriculum
```

### Option 2: Use Docker Compose Test Environment

1. **Create a test docker-compose file:**
```yaml
# docker-compose.test.yml
version: '3.9'
services:
  test-db:
    image: postgres:13
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: admin123
      POSTGRES_DB: interactive_curriculum
    ports:
      - "5433:5432"
    tmpfs:
      - /var/lib/postgresql/data  # Use tmpfs for faster tests
```

2. **Start test database:**
```bash
docker-compose -f docker-compose.test.yml up -d test-db
```

### Option 3: Use SQLite for Tests (Fastest)

For unit tests, consider using SQLite instead of PostgreSQL:

1. **Install SQLite adapter:**
```bash
pip install sqlite3
```

2. **Create test configuration:**
```python
# test_config.py
TEST_DATABASE_URL = "sqlite:///test.db"
```

## Running Tests Step by Step

### Step 1: Set Environment Variables
```bash
set DB_HOST=localhost
set DB_PORT=5433
set DB_USER=admin
set DB_PASSWORD=admin123
set DB_NAME=interactive_curriculum
```

### Step 2: Navigate to Backend Directory
```bash
# From project root
cd Workshop_3\Backend\python-backend
```

### Step 3: Run Tests
```bash
# Unit tests only (working)
python -m pytest tests/unit/ -v

# With coverage
python -m pytest tests/unit/ --cov=services --cov-report=term-missing

# All tests (includes failing integration tests)
python -m pytest tests/ -v

# Only integration tests (will fail without DB fix)
python -m pytest tests/integration/ -v
```

### Step 3: View Results
- Check console output for pass/fail status
- Coverage report shows code coverage percentage
- Failed tests show detailed error messages

## Test Commands Summary

**From project root directory:**
```bash
# Navigate to backend and run unit tests
cd Workshop_3\Backend\python-backend && python -m pytest tests/unit/ -v

# With coverage report
cd Workshop_3\Backend\python-backend && python -m pytest tests/unit/ --cov=services --cov-report=term-missing

# All tests (including failing integration tests)
cd Workshop_3\Backend\python-backend && python -m pytest tests/ -v
```

**From backend directory (Workshop_3\Backend\python-backend):**
```bash
# Unit tests only (guaranteed to work)
python -m pytest tests/unit/ -v

# With coverage report
python -m pytest tests/unit/ --cov=services --cov-report=term-missing

# Generate HTML coverage report
python -m pytest tests/unit/ --cov=services --cov-report=html

# Run specific test file
python -m pytest tests/unit/test_curriculum_service.py -v

# All tests with detailed output
python -m pytest tests/ -v -s
```

## Current Test Results

### ✅ Working Tests (Unit Tests)
- `test_calculate_available_subjects_success` - PASSED
- `test_get_completed_subjects_success` - PASSED

### ❌ Failing Tests (Integration Tests)
- `test_health_check` - Database connection failure
- `test_get_curriculum_success` - Async client configuration error
- `test_get_curriculum_invalid_program` - Async client configuration error
- `test_upload_curriculum_success` - Async client configuration error
- `test_upload_curriculum_invalid_format` - Async client configuration error
- `test_get_student_progress_unauthorized` - Incorrect status code

## Next Steps

1. **Immediate**: Use unit tests for development and validation
2. **Short term**: Fix database authentication for integration tests
3. **Long term**: Add more unit tests to increase coverage

## Troubleshooting

### Database Connection Issues
- Verify PostgreSQL container is running: `docker ps`
- Check container logs: `docker logs interactive_curriculum_db`
- Test connection: `docker exec interactive_curriculum_db psql -U admin -d interactive_curriculum -c "SELECT 1;"`

### Test Issues
- Clear pytest cache: `python -m pytest --cache-clear`
- Reinstall dependencies: `pip install -r requirements.txt`
- Check Python version compatibility