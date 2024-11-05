
const ProductModel = require('../model/productModel');

const addProduct = async (req, res) => {
    try {
        const product = new ProductModel(req.body);
        await product.save();  // Await the save operation
        res.status(201).json({ message: "Created Successfully" });
    } catch (error) {
       
        res.status(400).json({ err: error.message || "Failed to create product" });
    }
};


const getProduct=async(req,res)=>{
    try {
        const product=await ProductModel.find();
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json(error)
    }
}

const getProductById=async(req,res)=>{
    try {
        const product=await ProductModel.findOne({_id:req.params.id})
        res.status(200).json(product)
    } catch (error) {
       res.status(400).json(error) 
    }
}

const getProductByQuery=async(req,res)=>{
    const filter={}
    const{title,q,sort,limit=10,page=1,category,gender,maxPrice,minPrice}=req.query
    const sortOption={}
    try {
      if(title){
        filter.title={$regex:title,$options:"i"}
      }  
      if(category){
        filter.category=category
      }
      if(gender){
        filter.gender=gender
      }
      if(maxPrice || minPrice){
        filter.price={}
        if (minPrice) filter.price.$gte=Number(minPrice)
        if (maxPrice) filter.price.$lte=Number(maxPrice)
      }
    if(q){
        filter.$or=[
            {title:{$regex:q,$options:"i"}},
            {category:{$regex:q,$options:"i"}},
            {gender:{$regex:q,$options:"i"}},
        ]
    }
      if(sort){
        
        if(sort==="asc"){
            sortOption.price=1
        }
        if(sort==="desc"){
            sortOption.price=-1
        }
    }
     const skip=(page-1)*limit
     const productSearchQuery=await ProductModel.find(filter).limit(Number(limit)).skip(Number(skip)).sort(sortOption)
     

      res.status(200).json(productSearchQuery)
    } catch (error) {
        res.status(400).json(error)
    }
}

const deleteProduct=async(req,res)=>{
    try {
       const product=await ProductModel.findByIdAndDelete({_id:req.params.id}) 
       res.status(200).json({deleted:product})
    } catch (error) {
        res.status(400).json(error)
    }
}

const updateProduct=async(req,res)=>{
    try {
        const product=await ProductModel.findByIdAndUpdate({_id:req.params.id},req.body,{new:true,runValidator:true})
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports = {
    addProduct,
    getProduct,
    getProductById,
    deleteProduct,
    updateProduct,
    getProductByQuery
};