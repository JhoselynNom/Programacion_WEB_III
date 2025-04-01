# src/database/connector.py
import mysql.connector

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password='',
        database="testdlb"
    )

def list_tables():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("""
        SELECT table_name, table_rows, create_time, update_time 
        FROM information_schema.tables 
        WHERE table_schema = DATABASE()
    """)
    
    tables = cursor.fetchall()
    
    cursor.close()
    conn.close()
    
    return tables