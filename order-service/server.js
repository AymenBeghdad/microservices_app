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
    console.log('Order Service connected to DB3');
});

// Create order
app.post('/orders', (req, res) => {
    const { userId, productId, quantity } = req.body;
    const query = 'INSERT INTO orders (userId, productId, quantity) VALUES (?, ?, ?)';
    db.query(query, [userId, productId, quantity], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('order added!');
    });
});

// Fetch all orders
app.get('/orders', (req, res) => {
    const sql = 'SELECT * FROM orders';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

// Fetch uorder by ID
app.get('/users/:id', (req, res) => {
    const { id } = req.params
    const sql = 'SELECT * FROM orders where id=?';
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Order Service running on port ${PORT}`);
});