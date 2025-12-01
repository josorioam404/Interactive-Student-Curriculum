# Interactive-Student-Curriculum

Interactive Student Curriculum is a full-stack application that helps students visualize and manage their academic progress. It combines a Java Spring Boot service for authentication and orchestration, a Python FastAPI service for curriculum logic, a PostgreSQL database, and a web frontend.

## Architecture at a Glance
- **Frontend (Vite/React)**: User-facing app for students/admins.
- **Java backend (Spring Boot)**: Auth, JWT issuance, admin actions, and coordination with the Python API.
- **Python backend (FastAPI)**: Curriculum calculations, student progress, and file ingestion for study plans.
- **PostgreSQL**: Stores users, subjects, study plans, and progress; seeded via `Database/schema/*.sql`.

## Repository Layout
- `Frontend/` – React application.
- `Backend/java-backend/` – Spring Boot services.
- `Backend/python-backend/` – FastAPI service for curriculum features.
- `Database/schema/` – SQL init scripts and sample study plans.
- `Docs/` – API docs and supplementary documentation.

## Prerequisites
- Docker and Docker Compose (recommended for local/dev/prod parity).
- Alternatively: Java 17 + Maven, Python 3.10+, Node 18+ if running services without Docker.

## Run with Docker
Production-like (uses prebuilt images):
```bash
docker compose up --build
```

Developer mode (builds local sources):
```bash
docker compose -f docker-compose.dev.yml up --build
```

Services expose by default:
- Java backend: `http://localhost:8080`
- Python backend: `http://localhost:8000`
- Frontend: `http://localhost:5173`
- PostgreSQL: `localhost:5432` (`interactive_curriculum` / `admin` / `admin123`)

## Running Without Docker (advanced)
- **Java**: `cd Backend/java-backend/auth && mvn spring-boot:run`
- **Python**: `cd Backend/python-backend && pip install -r requirements.txt && uvicorn main:app --reload --port 8000`
- **Frontend**: `cd Frontend && npm install && npm run dev -- --host`

Set env vars so each service can reach others (see compose files for examples).

## Documentation
- Java API: `Docs/API_Documentation.md`
- Python API and service details: `Backend/python-backend/README.md`
- Database schema: `Database/schema/`
