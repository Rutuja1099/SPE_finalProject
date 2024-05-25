import pymysql

def create_database():
    # Database connection
    localhost1 = 'SPE_database'
    mydb = pymysql.connect(
        host=localhost1,
        user="root",
        passwd="Saurabh123",
    )

    my_cursor = mydb.cursor()

    my_cursor.execute("SHOW DATABASES LIKE 'SPE'")
    database_exists = my_cursor.fetchone()


    if not database_exists:
        my_cursor.execute("CREATE DATABASE SPE")
        print("Database 'SPE' created.")
    else:
        print("Database 'SPE' already exists.")


    my_cursor.close()
    mydb.close()


# if __name__ == '__main__':
#     create_database()
