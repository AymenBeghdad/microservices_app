require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurer l'application pour utiliser body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Parse JSON data

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  

// Connect to MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) throw err;
    console.log('Products Service connected to DB2');
});

// Create prodect
app.post('/products', (req, res) => {
    const { name, price, categorie } = req.body;
    const query = 'INSERT INTO products (name, price, categorie) VALUES (?, ?, ?)';
    db.query(query, [name, price, categorie], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('Product added!');
    });
});

// Fetch all prodects
app.get('/products', (req, res) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

// Fetch product by categorie
app.get('/products/:categorie', (req, res) => {
    const { categorie } = req.params;
    const sql = 'SELECT * FROM products where categorie=?';
    db.query(sql, [categorie], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

// Delete product

app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM products where id=?';
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Product Service running on port ${PORT}`);
});