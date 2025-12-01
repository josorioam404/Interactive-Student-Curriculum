# Backend

This folder contains two services:
- `java-backend/` (Spring Boot): Authentication, JWT issuance, admin actions, and orchestration with the Python API.
- `python-backend/` (FastAPI): Curriculum logic, student progress, and file ingestion for study plans.

Below is the documentation for the Python service.

## Python Backend (FastAPI)

### Overview
- Exposes curriculum-related endpoints used by the frontend and Java backend.
- Verifies JWTs issued by the Java service (shared hex secret).
- Connects to PostgreSQL for users, subjects, study plans, and progress.

### Features / Endpoints
- `GET /health`: DB connectivity check.
- `GET /api/student/curriculum`: Full curriculum for the authenticated student.
- `GET /api/student/progress-summary`: Credits/GPA/PAPA summary.
- `POST /api/student/progress`: Upsert subject status and grade.
- `GET /api/student/available-courses`: Subjects unlocked by completed prerequisites.
- `GET /api/curriculum/available-subjects`: Available subjects (legacy/alternative calculation).
- `POST /api/curriculum/upload`: Receive CSV/JSON curriculum files from the Java admin flow.
- `GET /api/subjects/search`, `GET /api/subjects/{code}`, `PUT /api/subjects/{code}`: Placeholder admin endpoints (stub responses).

### Requirements
- Python 3.10+
- PostgreSQL reachable via env vars (defaults match Docker compose)
- Dependencies in `Backend/python-backend/requirements.txt`:
  `fastapi`, `uvicorn`, `psycopg2-binary`, `pydantic`, `python-multipart`, `pyjwt`, `requests`

Install locally:
```bash
pip install -r requirements.txt
```

### Configuration
Env vars (defaults shown):
- `DB_HOST=localhost`
- `DB_NAME=interactive_curriculum`
- `DB_USER=admin`
- `DB_PASSWORD=admin123`
- `DB_PORT=5432`
- `FRONTEND_URL=http://localhost:5173` (CORS)
- `JWT_SECRET` (hex string shared with Java; defaults to the Spring value in `utils/jwt_utils.py`)

Ports:
- App listens on `8000` by default.

### Run
Local/dev:
```bash
uvicorn main:app --reload --port 8000
```

With Docker (part of the stack):
```bash
docker compose -f ../../docker-compose.dev.yml up --build python-backend
```

### Data Model Expectations
- Tables: `User`, `StudyPlan`, `Subject`, `UserProgress`, and `Program` (see `Database/schema/*.sql`).
- Prerequisite rules are stored as JSONB in `studyplan.prereq_rules` and interpreted in `StudentService`/`calculate_available_subjects`.

### Code Structure
- `main.py` – FastAPI app and router wiring.
- `routers/` – Endpoint definitions (`student`, `curriculum`, `health`, `admin`).
- `services/` – Business logic (student progress, curriculum calculations).
- `repositories/` – DB access helpers using psycopg2.
- `dependencies/` – Auth dependency that decodes Java-issued JWTs.
- `utils/` – JWT helpers and curriculum file processors (CSV/JSON ingestion).
- `config/settings.py` – App metadata and CORS origins.

### Notes
- Auth: Pass `Authorization: Bearer <JWT>` issued by the Java backend; `get_current_user_id` extracts `userId`.
- Transactions: Write operations commit explicitly inside repositories.
- Uploads: `POST /api/curriculum/upload` accepts CSV or JSON; currently counts records and returns a summary payload.
