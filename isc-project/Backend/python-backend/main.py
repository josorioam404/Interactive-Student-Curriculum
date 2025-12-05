from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from settings import settings

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
