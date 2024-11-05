 const express=require("express");
const { addToCart, cartItem, updateCart, deleteCartItem } = require("../controllers/cart.controller");
 const router=express.Router()

 router.use(express.json())

router.get('/get-cart',cartItem)
router.post('/add-to-cart/:id',addToCart)
router.patch('/update-cart/:id',updateCart)
router.delete('/delete-cartItem/:id',deleteCartItem)


 module.exports=router

