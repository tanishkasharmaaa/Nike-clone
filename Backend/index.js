require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const connection = require('./config/db');
const ProductRouter = require('./routes/product.route');
const PassportConfig = require('./utils/passport');
const GenerateToken = require('./utils/generateToken');
const verifyToken = require('./utils/verifyToken');  // Import verifyToken middleware
const UserRouter = require('./routes/user.route');
const CartRouter = require('./routes/cart.route');
const OrderRouter = require('./routes/order.route');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware Configuration
app.use(cors({
    origin: "*", // Replace with your frontend URL in production for security
    credentials: true,
}));
app.use(express.json());

// Session Configuration
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }, // Set to `true` if using HTTPS in production
    })
);

// Passport Configuration
PassportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/product', ProductRouter); // Protect product route with verifyToken
app.use('/profile', verifyToken, UserRouter);
app.use('/cart', verifyToken, CartRouter);
app.use('/order', verifyToken, OrderRouter);

// Google OAuth Route
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth Callback Route
app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login/failure' }), 
    (req, res) => {
        // Generate JWT on successful authentication
        const token = GenerateToken(req.user.email, req.user.googleId);
        res.status(200).json({ token });
    }
);

// Login Success Route
app.get('/login/success', (req, res) => {
    if (req.user) {
        res.status(200).json({ message: "Login Successful" });
    } else {
        res.status(403).json({ message: "403 Error, Not Authorized" });
    }
});

// Login Failure Route
app.get('/login/failure', (req, res) => {
    res.status(401).json({ message: "Login failed. Please try again." });
});

// Logout Route
app.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.send('<h1>See you again</h1>');
    });
});

// Start Server
app.listen(PORT, async () => {
    try {
        await connection;
        console.log(`Server is running and connected to the database at port ${PORT}`);
    } catch (error) {
        console.error("Database connection failed:", error);
    }
});
