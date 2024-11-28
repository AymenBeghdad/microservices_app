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
    console.log('User Service connected to DB1');
});

// Create user
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
    db.query(query, [name, email], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('user added successfully');
    });
});

/*
app.post('users', (req,res) =>{

    const { name, email } = req.body;
    const sql = `INSERT INTO users (\`name\`, email) VALUES (?, ?)`
  
    db.query(sql, [name, email], (err, result) => {
      if(err){
        console.log('Erreur', err);
        res.status(500).send(`<h3>Erreur ._. !!</h3>`);
        return;
      }else{
        console.log('user added succesfully');
        res.status(200).send(`<h3>user added succesfully</h3>`);
      }
    });
  }); */

// Fetch all users
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

// Fetch users by ID
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM users where id=?';
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`User Service running on port ${PORT}`);
});