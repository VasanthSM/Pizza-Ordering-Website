const express = require("express");
const mysql = require("mysql");
const cors = require('cors');
const jwt = require("jsonwebtoken");
const multer = require('multer'); 
const path = require('path');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const app = express();
const dotenv = require('dotenv')
const stripe = require("stripe")("sk_test_51PP2O1P4F4f9DURgoWb3jqvHho8lrrouLpqVmrHitnx17YjsYAUEKUvekuAdyUzn8CAHpq4ikZIKznfePHAAZoXZ00jbOREKRa")


app.use(express.json());
dotenv.config();



var allowlist = ['http://localhost:3001', 'http://localhost:3000', 'http://localhost:4000']
var corsOptionsDelegate = function (req, callback, origin) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1 || !origin) {
    corsOptions = { origin: true }
  } else {
    corsOptions = { origin: false }
  }
  callback(null, corsOptions) 
}

app.use(cors(corsOptionsDelegate));

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

var del = db._protocol._delegateError;
db._protocol._delegateError = function(err, sequence){
  if (err.fatal) {
    console.trace('fatal error: ' + err.message);
  }
  return del.call(this, err, sequence);
};


app.use('/', express.static(path.join(__dirname, 'src')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("MySql Connected");
    }
});

const jwtSecret = process.env.JWT_SECRET;

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
            res.status(500).json({ message: "Internal Server Error" });
        } else {
            if (results.length > 0) {
                res.status(400).json({ message: "Email already exists" });
            } else {
                db.query(insertUserQuery, [name, email, password], (err) => {
                    if (err) {
                        res.status(500).json({ message: "Internal Server Error" });
                    } else {
                        const token = jwt.sign({ email: email }, jwtSecret, { expiresIn: '2d' });
                        res.cookie('token', token, { httpOnly: true, maxAge: 2 * 24 * 60 * 60 * 1000 }); 
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
            console.error(err);
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
app.get('/order/:orderId', (req, res) => {
    const orderId = req.params.orderId;
    const sql = 'SELECT * FROM orders WHERE id = ?';
  
    db.query(sql, [orderId], (err, result) => {
      if (err) {
        console.error('Error fetching order details:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        if (result.length > 0) {
          const order = result[0];
          res.json({
            userDetails: JSON.parse(order.userDetails),
            totalAmount: order.total_amount,
            cartItems: JSON.parse(order.cartItems)
          });
        } else {
          res.status(404).json({ error: 'Order not found' });
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
    let { userDetails, paymentData, totalAmount, cartItems, itemNames } = req.body;

    if (!Array.isArray(cartItems)) {
        cartItems = [cartItems]; 
    }
    if (!Array.isArray(itemNames)) {
        itemNames = [itemNames]; 
    }

    const userOrder = {
        first_name: userDetails.firstName,
        last_name: userDetails.lastName,
        email: userDetails.email,
        street: userDetails.street,
        city: userDetails.city,
        district: userDetails.district,
        state: userDetails.state,
        zip_code: userDetails.zipCode,
        mobile_number: userDetails.mobileNumber,
        userDetails: JSON.stringify(userDetails)
    };

    const userOrderQuery = 'INSERT INTO UserOrderDetails SET ?';
    db.query(userOrderQuery, userOrder, (err, userResult) => {
        if (err) {
            console.error('Error inserting user order details:', err);
            return res.status(500).json({ error: 'Failed to place user order details' });
        }
        const userOrderId = userResult.insertId;

        const orderDetails = {
            total_amount: totalAmount,
            itemNames: JSON.stringify(itemNames),
            cartItems: JSON.stringify(cartItems)
        };

        const orderDetailsQuery = 'INSERT INTO orderDetails SET ?';
        db.query(orderDetailsQuery, orderDetails, (err, orderResult) => {
            if (err) {
                console.error('Error inserting order details:', err);
                return res.status(500).json({ error: 'Failed to place order details' });
            }
            const orderDetailsId = orderResult.insertId;

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
                itemNames: JSON.stringify(itemNames),
                payment_data: JSON.stringify(paymentData),
                user_order_id: userOrderId,
                order_details_id: orderDetailsId,
            };

            const orderQuery = 'INSERT INTO orders SET ?';
                db.query(orderQuery, order, (err, result) => {
                    if (err) {
                        console.error('Error placing order:', err);
                        return res.status(500).json({ error: 'Failed to place order' });
                    }
                    const orderId = result.insertId;
                    res.status(201).json({ orderId: orderId });
                });
        });
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

app.delete('/order/:id', (req, res) => {
    const orderId = req.params.id;
    const query = 'DELETE FROM orders WHERE id = ?';
  
    db.query(query, [orderId], (err, result) => {
      if (err) {
        console.error('Error deleting order:', err);
        return res.status(500).send('Error deleting order');
      }
      if (result.affectedRows === 0) {
        return res.status(404).send('Order not found');
      }
      res.status(200).send('Order canceled successfully');
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

const generateToken = () => {
    return crypto.randomBytes(20).toString('hex');
};

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS
    }
});
app.post('/forgotpassword', (req, res,token) => {
    const { email } = req.body;
    const resetToken = generateToken(); 

    const updateTokenQuery = "UPDATE users SET reset_password_token = ?, reset_password_expires = ? WHERE Email = ?";

    db.query(updateTokenQuery, [resetToken, Date.now() + 3600000, email], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        } else {
            if (result.affectedRows === 0) {
                return res.status(200).json({ message: "Password reset email sent if the user exists" });
            }
            const resetUrl = `http://localhost:3000/resetpassword`;
            const mailOptions = {
                to: email,
                from: 'vasanthsubburaj24@gmail.com',
                subject: 'Password Reset Request',
                text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
                Please click on the following link, or paste this into your browser to complete the process:\n
                ${resetUrl}\n
                If you did not request this, please ignore this email and your password will remain unchanged.\n 
                ${email}` 
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending password reset email:', error);
                    res.status(500).json({ message: "Failed to send password reset email" });
                } else {
                    console.log('Password reset email sent:', info.response);
                    res.status(200).json({ message: "Password reset email sent if the user exists" });
                }
            });
        }
    });
});


app.post('/resetpassword', (req, res) => {
    const { email, password } = req.body;

    const updatePasswordQuery = "UPDATE users SET Password = ? WHERE Email = ?";
    
    db.query(updatePasswordQuery, [password, email], (err, result) => {
      if (err) {
        console.error("Error updating password:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Email not found" });
      }
  
      console.log("Password updated successfully");
      res.status(200).json({ message: "Password updated successfully" });
    });
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});