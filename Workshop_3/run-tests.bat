@echo off
echo ========================================
echo Running Interactive Curriculum Tests
echo ========================================

echo.
echo [1/4] Running Java Backend Tests...
cd Backend\java-backend\auth
call mvn clean test
if %errorlevel% neq 0 (
    echo Java tests failed!
    exit /b 1
)

echo.
echo [2/4] Running Python Backend Tests...
cd ..\..\python-backend
call python -m pytest tests/ -v --cov=. --cov-report=html
if %errorlevel% neq 0 (
    echo Python tests failed!
    exit /b 1
)

echo.
echo [3/4] Running Frontend Tests...
cd ..\Frontend
call npm test -- --coverage --watchAll=false
if %errorlevel% neq 0 (
    echo Frontend tests failed!
    exit /b 1
)

echo.
echo [4/4] Running Acceptance Tests...
cd ..\acceptance-tests
call npm test
if %errorlevel% neq 0 (
    echo Acceptance tests failed!
    exit /b 1
)

echo.
echo ========================================
echo All tests completed successfully!
echo ========================================
echo.
echo Coverage Reports:
echo - Java: Backend\java-backend\auth\target\site\jacoco\index.html
echo - Python: Backend\python-backend\htmlcov\index.html
echo - Frontend: Frontend\coverage\lcov-report\index.html
echo - Acceptance: acceptance-tests\reports\cucumber-report.html