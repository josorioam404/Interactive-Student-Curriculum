# Interactive-Student-Curriculum

## Requirements

- Docker
- Docker Compose

## For production

```bash
docker compose up --build
```


## For development 

```bash
docker compose -f docker-compose.dev.yml up --build
```


## Configuration

By default, the services start on the following ports:

- **java-backend:** 8080
- **python-backend:** 8000
- **Frontend:** 5173
- **Database:** 5432

Deploy experiment
