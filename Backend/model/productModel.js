const mongoose=require('mongoose')

const productSchema=mongoose.Schema({
    title:{type:String,required:true },
    price:{type:Number,required:true},
    category:{type:String,enum:['shoes','sportswear','tops-tshirts','jerseys','hoodies'],required:true},
    gender:{type:String,enum:['men','women','kids'],required:true},
    size:{type:[String],required:true},
    arrImg:{type:[String],required:true},
    units:{type:Number,required:true},
    status:{type:String,enum:['out','in'],required:true}
},
{versionKey:false}
)

const ProductModel=mongoose.model('product',productSchema)

module.exports=ProductModel
