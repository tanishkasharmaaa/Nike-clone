const mongoose=require('mongoose')
const cartSchema=mongoose.Schema({
    userID:{type:Number,required:true},
    productID:{type:mongoose.Schema.Types.ObjectId,ref:'products',required:true},
    title:{type:String,required:true },
    price:{type:Number,required:true},
    category:{type:String,enum:['shoes','sportswear','tops-tshirts','jerseys','hoodies'],required:true},
    gender:{type:String,enum:['men','women','kids'],required:true},
    size:{type:[String],required:true},
    selectedSize:{type:String,default:null},
    arrImg:{type:[String],required:true},
    units:{type:Number,default:1,required:true}
},
{
    versionKey:false
}
);

const CartModel=mongoose.model('cart',cartSchema)
module.exports=CartModel