# Testing Strategy - Interactive Student Curriculum

## Overview
Comprehensive testing implementation covering unit, integration, and acceptance tests across all system components.

## Test Structure

### 1. Java Backend Tests (JUnit + Mockito + TestContainers)
**Location**: `Backend/java-backend/auth/src/test/`

#### Unit Tests
- **AuthServiceTest**: Tests authentication business logic
- **AuthControllerTest**: Tests REST API endpoints
- **JwtServiceTest**: Tests JWT token generation/validation

#### Integration Tests
- **AuthIntegrationTest**: End-to-end authentication flow with real database

**Run Commands**:
```bash
cd Backend/java-backend/auth
mvn test                    # Run all tests
mvn test -Dtest=AuthServiceTest  # Run specific test
mvn jacoco:report          # Generate coverage report
```

### 2. Python Backend Tests (pytest + FastAPI TestClient)
**Location**: `Backend/python-backend/tests/`

#### Unit Tests
- **test_curriculum_service.py**: Tests curriculum business logic
- **test_student_service.py**: Tests student progress tracking

#### Integration Tests
- **test_curriculum_api.py**: Tests FastAPI endpoints
- **test_database_integration.py**: Tests database operations

**Run Commands**:
```bash
cd Backend/python-backend
pytest tests/ -v                    # Run all tests
pytest tests/unit/ -v               # Run unit tests only
pytest --cov=. --cov-report=html    # Generate coverage report
```

### 3. Frontend Tests (Jest + React Testing Library)
**Location**: `Frontend/src/__tests__/` and component directories

#### Unit Tests
- **CurriculumGrid.test.tsx**: Tests curriculum visualization
- **Login.test.tsx**: Tests authentication UI
- **SubjectCard.test.tsx**: Tests individual subject components

#### Integration Tests
- **App.test.tsx**: Tests complete application flow
- **Dashboard.test.tsx**: Tests dashboard integration

**Run Commands**:
```bash
cd Frontend
npm test                    # Run all tests
npm run test:watch         # Run tests in watch mode
npm run test:coverage      # Generate coverage report
```

### 4. Acceptance Tests (Cucumber + Playwright)
**Location**: `acceptance-tests/`

#### Features
- **student-login.feature**: User authentication scenarios
- **curriculum-visualization.feature**: Curriculum display scenarios
- **admin-management.feature**: Administrative functions

**Run Commands**:
```bash
cd acceptance-tests
npm test                    # Run all acceptance tests
npm run test:report        # Generate HTML report
```

## Test Execution

### Run All Tests
```bash
# Windows
run-tests.bat

# Linux/Mac
./run-tests.sh
```

### Individual Test Suites
```bash
# Java Backend
cd Backend/java-backend/auth && mvn test

# Python Backend  
cd Backend/python-backend && pytest

# Frontend
cd Frontend && npm test

# Acceptance Tests
cd acceptance-tests && npm test
```

## Coverage Reports

After running tests, coverage reports are available at:

- **Java**: `Backend/java-backend/auth/target/site/jacoco/index.html`
- **Python**: `Backend/python-backend/htmlcov/index.html`
- **Frontend**: `Frontend/coverage/lcov-report/index.html`
- **Acceptance**: `acceptance-tests/reports/cucumber-report.html`

## Test Data Management

### Test Databases
- **Java**: Uses TestContainers with PostgreSQL
- **Python**: Uses pytest fixtures with test database
- **Integration**: Docker Compose test environment

### Mock Data
- User accounts for different roles (student, admin)
- Sample curriculum data for multiple programs
- Academic history test data

## CI/CD Integration

Tests are integrated into GitHub Actions workflows:

```yaml
# .github/workflows/ci.yml
- name: Run Backend Tests
  run: |
    cd Backend/java-backend/auth
    mvn test
    
- name: Run Frontend Tests  
  run: |
    cd Frontend
    npm test -- --coverage --watchAll=false
```

## Quality Gates

### Coverage Thresholds
- **Java Backend**: Minimum 80% line coverage
- **Python Backend**: Minimum 85% line coverage  
- **Frontend**: Minimum 75% line coverage

### Test Requirements
- All new features must include unit tests
- API endpoints require integration tests
- Critical user flows need acceptance tests
- No tests should be skipped in CI/CD

## Best Practices

1. **Test Naming**: Use descriptive names following pattern `methodName_shouldBehavior_whenCondition`
2. **Test Structure**: Follow Arrange-Act-Assert pattern
3. **Mocking**: Mock external dependencies, test real business logic
4. **Data**: Use test-specific data, avoid shared state
5. **Cleanup**: Ensure tests clean up after themselves

## Troubleshooting

### Common Issues
- **Port conflicts**: Ensure test databases use different ports
- **Test isolation**: Use transactions or cleanup fixtures
- **Async tests**: Properly handle async operations in tests
- **Browser tests**: Ensure headless mode for CI/CD

### Debug Commands
```bash
# Java - Run single test with debug
mvn test -Dtest=AuthServiceTest -Dmaven.surefire.debug

# Python - Run with verbose output
pytest tests/test_curriculum_service.py -v -s

# Frontend - Run specific test file
npm test -- --testNamePattern="Login"
```