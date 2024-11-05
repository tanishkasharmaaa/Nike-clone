const mongoose=require('mongoose')
const orderSchema=mongoose.Schema({
    userID:{type:Number,required:true},
    productID:{type:mongoose.Schema.Types.ObjectId,ref:'products',required:true},
    title:{type:String,required:true },
    price:{type:Number,required:true},
    category:{type:String,enum:['shoes','sportswear','tops-tshirts','jerseys','hoodies'],required:true},
    gender:{type:String,enum:['men','women','kids']},
    size:{type:[String],required:true},
    selectedSize:{type:String,required:true},
    arrImg:{type:[String],required:true},
    units:{type:Number,default:1,required:true}
},
{
    versionKey:false
}
);


const OrderModel=mongoose.model('order',orderSchema)

module.exports=OrderModel