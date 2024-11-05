const express=require("express");
const { addToOrder } = require("../controllers/order.controller");
const router=express.Router();

router.use(express.json())

router.post('/add-to-order/:id',addToOrder)

module.exports=router