const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.static('public'));

// Nastavení pripojení k databázi
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// Endpoint pro zobrazení príspevku
app.get('/posts', (req, res) => {
    let sql = 'SELECT * FROM posts';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
