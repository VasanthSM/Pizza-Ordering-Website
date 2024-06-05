const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "pizza",
});

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("MySql Connected");
    }
});

app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    const checkUserQuery = "SELECT * FROM users WHERE Email = ?";
    const insertUserQuery = "INSERT INTO users (Name, Email, Password) VALUES (?, ?, ?)";


    db.query(checkUserQuery, [email], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        } else {
            if (results.length > 0) {
                res.status(400).json({ message: "Email already exists" });
            } else {
                db.query(insertUserQuery, [name, email, password], (err) => {
                    if (err) {
                        console.error(err);
                        res.status(500).json({ message: "Internal Server Error" });
                    } else {
                        console.log("User registered successfully");
                        res.status(200).json({ message: "User registered successfully" });
                    }
                });
            }
        }
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE Email = ? AND Password = ?";

    db.query(sql, [email, password], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        } else {
            if (result.length > 0) {
                console.log("Login successfully");
                res.status(200).json({ message: "Login successful" });
            } else {
                console.log("Invalid email or password");
                res.status(401).json({ message: "Invalid email or password" });
            }
        }
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
