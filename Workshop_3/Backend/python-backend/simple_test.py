import psycopg

try:
    connection = psycopg.connect(
        host="localhost",
        dbname="interactive_curriculum", 
        user="admin",
        password="admin123",
        port="5432"
    )
    print("Database connection successful!")
    connection.close()
except Exception as e:
    print(f"Database connection failed: {e}")