 const express = require('express'), bodyParser = require('body-parser');
    const app = express();
    app.use(bodyParser.json());
    app.use(express.urlencoded({extended: false}));

    const mysql = require('mysql');
    const port = 3000;

    var cors = require('cors');

    app.use(cors())

    app.listen(port);


    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'book_table'
    });


    connection.connect(function (err) {
        console.log('Connected to the MySQL server.');
    });

    app.post('/books', (req, res) => {
        var errThrown = false;
        let sql = 'INSERT INTO books SET ?'
        let post = {
            author: req.body.author,
            title: req.body.title,
            genre: req.body.genre,
            price: req.body.price
        }
        connection.query(sql, post, (err, res) => {
    });
        res.end();
    });

    app.get('/books/:book_name', (req, res) => {
        const book_name = "%" + req.params.book_name + "%";
        let sql = 'SELECT * FROM books WHERE title LIKE ?';
        connection.query(sql, book_name, (err, result) => {
            res.json(result);
        });
    });
