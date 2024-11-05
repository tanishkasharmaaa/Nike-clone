const express=require('express');
const {addProduct,getProduct,getProductById,deleteProduct, updateProduct, getProductByQuery}=require('../controllers/product.controller')
const ProductRouter=express.Router();

ProductRouter.use(express.json())

ProductRouter.post('/add-products',addProduct)
ProductRouter.get('/get-product',getProduct)
ProductRouter.get('/get-product-byID/:id',getProductById)
ProductRouter.get('/get-query',getProductByQuery)
ProductRouter.delete('/delete-product/:id',deleteProduct)
ProductRouter.put('/update-product/:id',updateProduct)

module.exports=ProductRouter