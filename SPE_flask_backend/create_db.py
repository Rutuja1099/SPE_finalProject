import mysql.connector
import pymysql

mydb = pymysql.connect(
    host = "localhost",
    user = "root",
    passwd = "Saurabh@123",
    )

my_cursor = mydb.cursor()

my_cursor.execute("CREATE DATABASE SPE")

my_cursor.execute("SHOW DATABASES")
for db in my_cursor:
    print(db)