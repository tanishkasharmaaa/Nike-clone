const express=require("express");
const CartModel=require("../model/cartModel");
const OrderModel = require("../model/orderModel");
const jwt = require("jsonwebtoken");
const ProductModel = require("../model/productModel");
require("dotenv").config()

const addToOrder=async(req,res)=>{
    try {
        const token=req.headers.authorization.split(" ")[1];
        if(!token){
            return res.status(400).json({message:"Authorization headers missing"})
        }
        const decoded=jwt.verify(token,process.env.JWT_PRIVATE_KEY)
        
        const cart=await CartModel.findOne({_id:req.params.id});
        if(!cart){
         return res.status(404).json({message:"Product not in cart"})
        }
        const order=new OrderModel({
        userID:decoded.googleId,
        productID:cart.productID,
        title:cart.title,
        price:cart.price,
        category:cart.category,
        gender:cart.gender,
        size:cart.size,
        selectedSize:cart.selectedSize,
        units:cart.units,
        arrImg:cart.arrImg
        })
        await order.save()
        const cartDelete=await CartModel.findByIdAndDelete({_id:req.params.id})
        const product=await ProductModel.findById({_id:cart.productID});
        if(!product){
          res.status(400).json({message:`Product with id ${cart.productID} not found`})
        }
        product.units=Number(product.units-order.units);
        await product.save();
        res.status(200).json({message:order});

    } catch (error) {
        res.status(400).json(error)
    } 
}

module.exports={
    addToOrder
}