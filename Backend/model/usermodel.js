const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstname: { type: String, required: true},
    lastname:{type:String},
    gender: { type: String,default:"not specified" ,required:true},
    email: { type: String, required: true ,unique:true},
    password:{type:String,required:true},
    googleId:{type:String,required:true},
    recommendation:{type:[String],default:[null],required:true}
    },
  {
    versionKey: false,
  }
);
const UserModel=mongoose.model('user',userSchema);

module.exports=UserModel