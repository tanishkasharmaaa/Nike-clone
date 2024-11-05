const express = require("express");
const UserModel = require("../model/usermodel");
const CartModel = require("../model/cartModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ProductModel = require("../model/productModel");
require("dotenv").config();

const cartItem=async(req,res)=>{
    
try {
    const token=req.headers.authorization.split(" ")[1];
    if(!token){
        res.status(400).json({message:`Authorization token missing`})
    }
    const decoded=jwt.verify(token,process.env.JWT_PRIVATE_KEY);
    const cart=await CartModel.find({userID:decoded.googleId});
    res.status(200).json(cart)
} catch (error) {
    res.status(400).json(error)
}
}

const addToCart = async (req, res) => {
    try {
        let token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Authorization token missing" });
        }

        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY, { algorithms: ['HS256'] });

        const prod = await ProductModel.findOne({ _id: req.params.id });
        if (!prod) {
            return res.status(404).json({ message: "Product not found" });
        }
        const cartItem=await CartModel.findOne({productID:req.params.id})
        if(cartItem){
          return  res.status(400).json({message:'Product Already in cart'})
        }

        const cart = new CartModel({
            userID: decoded.googleId,
            productID: prod._id,
            title: prod.title,
            price: prod.price,
            category: prod.category,
            gender: prod.gender,
            size: prod.size,
            selectedSized:null,
            arrImg: prod.arrImg,
            unit: req.body.unit || 1  // Default to 1 if no unit specified
        });

        await cart.save();
        res.status(200).json({ message: "Product added to cart" });
    } catch (error) {
        console.error("Error adding product to cart:", error);
        res.status(500).json({ message: "An error occurred while adding the product to the cart" });
    }
};

const updateCart = async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Authorization token missing" });
      }
      
      const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
      
      const updates = {
        units: req.body.units,
        selectedSize: req.body.selectedSize
      };
      
      const cartUpdate = await CartModel.findOneAndUpdate(
        { _id: req.params.id, userID: decoded.googleId },
        updates,
        { new: true, runValidators: true }
      );
      
      if (!cartUpdate) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      res.status(200).json({ cartUpdated: cartUpdate });
    } catch (error) {
      res.status(500).json({ message: "An error occurred", error });
    }
  };
  

const deleteCartItem=async(req,res)=>{
    try {
        const cart=await CartModel.findByIdAndDelete({_id:req.params.id})
        res.status(200).json({message:"Item deleted from cart"})
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports = {
    cartItem,
    addToCart,
    updateCart,
    deleteCartItem
};
