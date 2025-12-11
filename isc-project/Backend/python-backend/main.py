from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import health, student, curriculum, admin
from config.settings import settings

app = FastAPI(title=settings.APP_TITLE, version=settings.APP_VERSION)

if settings.APP_ENV == "dev":
    print("Running in DEV mode → CORS enabled")

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
else:
    print("Running in PROD mode → CORS disabled (handled by NGINX)")

# Register routers
app.include_router(health.router, tags=["Health"])
app.include_router(student.router, prefix="/student", tags=["Student"])
app.include_router(curriculum.router, prefix="/curriculum", tags=["Curriculum"])
app.include_router(admin.router, tags=["Admin"])
