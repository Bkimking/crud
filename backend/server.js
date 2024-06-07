const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const port = 5000;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

app.post('/add_user', (req, res) => {
    const sql = "INSERT INTO users (name, email, age, gender) VALUES (?, ?, ?, ?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.age,
        req.body.gender
    ];
    
    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error: something has happened ' + err });
        }
        return res.status(200).json({ success: 'User added successfully.' });
    });
});

app.get('/users', (req, res) => { 
    const sql = "SELECT * FROM users";  
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error from server: ' + err });
        }
        return res.status(200).json(result);  
    });
});

app.get('/get_user/:id', (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM users WHERE id = ?";
    
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error from server: ' + err });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(result[0]);
    });
});

app.post('/edit_user/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, age, gender } = req.body;
    const sql = "UPDATE users SET `name`=?, `email`=?, `age`=?, `gender`=? WHERE id=?";
    
    const values = [
        name,
        email,
        age,
        gender,
        id
    ];
    
    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error: something has happened ' + err });
        }
        return res.status(200).json({ success: 'User edited successfully.' });
    });
});

app.delete('/delete_user/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM users WHERE id = ?";
    
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error: something has happened ' + err });
        }
        return res.status(200).json({ success: 'User deleted successfully.' });
    });
});

app.listen(port, () => {
    console.log("Server is listening on port " + port);
});
