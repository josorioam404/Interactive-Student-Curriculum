#!/usr/bin/env python3
import psycopg
import os

def test_connection():
    try:
        # Test with exact same parameters as your app
        connection = psycopg.connect(
            host="localhost",
            dbname="interactive_curriculum", 
            user="admin",
            password="admin123",
            port="5432"
        )
        
        # Test the connection
        cursor = connection.cursor()
        cursor.execute("SELECT version();")
        result = cursor.fetchone()
        print(f"✅ Database connection successful!")
        print(f"PostgreSQL version: {result[0]}")
        
        cursor.close()
        connection.close()
        return True
        
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        return False

if __name__ == "__main__":
    test_connection()