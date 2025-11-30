# Backend

## java-backend

### Requirements

-   Java 17
-   Maven

### Usage

``` bash
mvn spring-boot:run
```

### Configuration

By default, the server starts on port `8080`.

------------------------------------------------------------------------

## python-backend

### Requirements

-   fastapi==0.109.0
-   uvicorn==0.27.0
-   psycopg2-binary==2.9.9
-   pydantic==2.6.0
-   python-multipart==0.0.6
-   pyjwt==2.8.0
-   requests==2.31.0

### Usage

``` bash
uvicorn main:app --reload --port 8000
```

### Configuration

By default, the server starts on port `8000`.
