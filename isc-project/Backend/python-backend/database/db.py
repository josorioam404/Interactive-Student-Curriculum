import time
import psycopg2
from config.settings import settings


def get_connection():
    max_retries = 5
    retry_delay = 2

    for attempt in range(max_retries):
        try:
            connection = psycopg2.connect(
                host=settings.DB_HOST,
                dbname=settings.DB_NAME,
                user=settings.DB_USER,
                password=settings.DB_PASSWORD,
                port=settings.DB_PORT,
            )
            return connection

        except psycopg2.OperationalError as e:
            print(f"Intento {attempt + 1}/{max_retries} fallido conectando a DB: {e}")

            if attempt < max_retries - 1:
                time.sleep(retry_delay)
            else:
                print("Error fatal: No se pudo conectar a la base de datos.")
                raise e
