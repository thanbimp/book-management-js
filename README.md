# book-management-js


- A simple web app to manage books.

The backend implementation is node.js with express.js

A MySQL Database is required with the schema book_table.

The table that the application uses is given below:

```sql
CREATE TABLE BOOKS(
    AUTHOR VARCHAR(255),
    TITLE VARCHAR(255),
    GENRE VARCHAR(255),
    PRICE NUMBER(10)
);
```

The login details for the MySQL server can be changed in the backend.js file.

Note:The frontend application must be hosted seperately in the HTTP server of your choice.
