const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const multer = require('multer'); 
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "pizza",
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("MySql Connected");
    }
});

const jwtSecret = "mySecretKey123";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + ext);
    }
});

const upload = multer({ storage: storage });

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
                        const token = jwt.sign({ email: email }, jwtSecret, { expiresIn: '2d' });
                        res.cookie('token', token, { httpOnly: true, maxAge: 2 * 24 * 60 * 60 * 1000 }); // 2 days
                        res.status(200).json({ message: "User registered successfully", token: token });
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
                const token = jwt.sign({ email: email }, jwtSecret, { expiresIn: '2d' });
                res.cookie('token', token, { httpOnly: true, maxAge: 2 * 24 * 60 * 60 * 1000 });
                res.status(200).json({ message: "Login successful", token: token });
            } else {
                console.log("Invalid email or password");
                res.status(401).json({ message: "Invalid email or password" });
            }
        }
    });
});

app.post('/data', upload.single('image'), (req, res) => {
    const { name, description, price, category } = req.body;
    const image = req.file;

    const sql = "INSERT INTO data (Name, Description, Price, Image, Category) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [name, description, price, image.filename, category], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        } else {
            res.status(201).json({ message: "Data inserted successfully", data: req.body });
        }
    });
});

app.get('/list', (req, res) => {
    const sql = "SELECT * FROM data";
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        } else {
            res.status(200).json(results);
        }
    });
});

app.post('/remove', (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ message: "ID is required" });
    }
    const sql = "DELETE FROM data WHERE id = ?";
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json({ success: true, message: "Item removed successfully" });
    });
});

app.get('/data', (req, res) => {
    const sql = "SELECT * FROM data";
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        } else {
            res.status(200).json(results);
        }
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
