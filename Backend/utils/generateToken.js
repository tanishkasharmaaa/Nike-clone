const jwt=require("jsonwebtoken");
require("dotenv").config()
const jwt_private_key=process.env.JWT_PRIVATE_KEY

const GenerateToken=(email,googleId)=>{
    if(email&&googleId){
        const token=jwt.sign({email:email,googleId:googleId},jwt_private_key,{algorithm:'HS256'}, { expiresIn: '30d' })
   return token
    }
    else{
        return null
    }
    
}


module.exports=GenerateToken