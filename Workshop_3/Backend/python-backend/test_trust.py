import psycopg

# Try connecting without password (trust method)
try:
    connection = psycopg.connect(
        host="127.0.0.1",
        dbname="interactive_curriculum", 
        user="admin",
        port="5432"
    )
    print("Database connection successful with trust method!")
    connection.close()
except Exception as e:
    print(f"Trust method failed: {e}")

# Try with password
try:
    connection = psycopg.connect(
        host="127.0.0.1",
        dbname="interactive_curriculum", 
        user="admin",
        password="admin123",
        port="5432"
    )
    print("Database connection successful with password!")
    connection.close()
except Exception as e:
    print(f"Password method failed: {e}")