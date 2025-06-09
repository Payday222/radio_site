const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3099;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'admin2',
    password: 'eisheic7Ph',
    database: 'radio'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
});

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) return res.status(500).send('Server error');
        if (results.length === 0) return res.status(401).send('Invalid username or password');

        const user = results[0];
        if (password !== user.password) {
            return res.status(401).send('Invalid username or password');
        }

        res.status(200).send({ message: 'Login successful', user: { username: user.username } });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
