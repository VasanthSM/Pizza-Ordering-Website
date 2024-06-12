const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const multer = require('multer'); 
const path = require('path');
const app = express();
const {v4:uuidv4} = require("uuid")
const stripe = require("stripe")("sk_test_51PP2O1P4F4f9DURgoWb3jqvHho8lrrouLpqVmrHitnx17YjsYAUEKUvekuAdyUzn8CAHpq4ikZIKznfePHAAZoXZ00jbOREKRa")


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

app.get('/login', (req, res) => {
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
    const { _id } = req.body;
    if (!_id) {
        return res.status(400).json({ message: "ID is required" });
    }
    const sql = "DELETE FROM data WHERE _id = ?";
    db.query(sql, [_id], (err, results) => {
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

app.post("/payment", async (req, res) => {
    try {
        const { product, token } = req.body;
        const transactionKey = uuidv4();

        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });

        const charge = await stripe.charges.create({
            amount: product.price,
            currency: "inr",
            customer: customer.id,
            receipt_email: token.email,
            description: product.name
        });

        res.json(charge);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
  

app.post('/order', (req, res) => {
    let { userDetails, paymentData, totalAmount, cartItems } = req.body;
    if (!Array.isArray(cartItems)) {
        cartItems = [cartItems]; 
    }
  

    const order = {
        first_name: userDetails.firstName,
        last_name: userDetails.lastName,
        email: userDetails.email,
        street: userDetails.street,
        city: userDetails.city,
        district: userDetails.district,
        state: userDetails.state,
        zip_code: userDetails.zipCode,
        mobile_number: userDetails.mobileNumber,
        total_amount: totalAmount,
        userDetails: JSON.stringify(userDetails),
        cartItems: JSON.stringify(cartItems),
        payment_data: JSON.stringify(paymentData)
    };
    
    const orderQuery = 'INSERT INTO orders SET ?';
    db.query(orderQuery, order, (err, result) => {
        if (err) {
            console.error('Error placing order:', err);
            return res.status(500).json({ error: 'Failed to place order' });
        }
        const orderId = result.insertId;
        
    });
});


app.get('/order', (req, res) => {
    const sql = "SELECT * FROM orders";
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        } else {
            res.status(200).json(results);
        }
    });
});
app.get('/users', (req, res) => {
    const sql = "SELECT * FROM users";
    
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
