const jwt = require("jsonwebtoken");
const UserModel = require("../model/usermodel");
require("dotenv").config()
const jwt_private_key=process.env.JWT_PRIVATE_KEY;

const verifyToken = async(req, res, next) => {
    // Extract the token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1];
    
    // Check if token is provided
    if (!token) {
        return res.status(403).json({ message: "Access denied, token missing" });
    }

    try {
        // Verify the token and extract the payload
        const decoded = jwt.verify(token, jwt_private_key, { algorithms: ['HS256'] });
        const user=await UserModel.findOne({email:decoded.email,googleId:decoded.googleId})
        if(!user){
            res.status(401).json({message:"You are unauthorized to access this route"})
        }
        
        next()
    } catch (error) {
        // Handle invalid token
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

module.exports = verifyToken;
