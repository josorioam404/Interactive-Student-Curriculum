import psycopg2
import os
import time

def get_connection():
    # Intenta conectar con reintentos para esperar a que la DB arranque
    max_retries = 5
    retry_delay = 2 

    for attempt in range(max_retries):
        try:
            connection = psycopg2.connect(
                # Valores por defecto para desarrollo local, pero Docker inyectará los suyos
                host=os.getenv("DB_HOST", "localhost"),
                dbname=os.getenv("DB_NAME", "interactive_curriculum"),
                user=os.getenv("DB_USER", "admin"),
                password=os.getenv("DB_PASSWORD", "admin123"),
                port=os.getenv("DB_PORT", "5432")
            )
            return connection
        except psycopg2.OperationalError as e:
            print(f"Intento {attempt + 1}/{max_retries} fallido conectando a DB: {e}")
            if attempt < max_retries - 1:
                time.sleep(retry_delay)
            else:
                print("Error fatal: No se pudo conectar a la base de datos.")
                raise e
