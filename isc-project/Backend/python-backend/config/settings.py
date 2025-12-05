import os
from pydantic import BaseModel
from typing import List


class Settings(BaseModel):
    # App Info
    APP_TITLE: str = "Interactive Curriculum - Python Backend"
    APP_VERSION: str = "1.0.0"

    # Environment: "dev" or "prod"
    APP_ENV: str = os.getenv("APP_ENV", "prod")

    # DATABASE (NO DEFAULT SECRETS)
    DB_HOST: str = os.getenv("DB_HOST")
    DB_NAME: str = os.getenv("DB_NAME")
    DB_USER: str = os.getenv("DB_USER")
    DB_PASSWORD: str = os.getenv("DB_PASSWORD")
    DB_PORT: str = os.getenv("DB_PORT")

    # CORS (enabled only in dev)
    @property
    def CORS_ORIGINS(self) -> List[str]:
        if self.APP_ENV == "dev":
            return [
                "http://localhost:5173",
                "http://localhost:8080",
            ]
        return []


settings = Settings()
