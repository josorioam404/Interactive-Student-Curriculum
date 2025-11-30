# Usamos una imagen ligera de Python
FROM python:3.10-slim

# Instalar dependencias del sistema necesarias para psycopg2 (Postgres)
RUN apt-get update && apt-get install -y libpq-dev gcc

WORKDIR /app

# Copiar e instalar requerimientos
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código
COPY . .

# Exponer el puerto 8000
EXPOSE 8000

# Ejecutar con Uvicorn (Servidor de producción)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]