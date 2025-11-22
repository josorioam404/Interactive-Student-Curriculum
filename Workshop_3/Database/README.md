# Database

The PostgreSQL image automatically initializes the databases on creation.

## Usage

```bash
docker compose up -d
```

## Admin Account

The initialization script creates an admin account with the following credentials:

- **Email:** admin@unal.edu.co
- **Password:** password

## Configuration

By default, the database is exposed on port `5432`.
