const jwt=require("jsonwebtoken");

const GenerateToken=(email,googleId)=>{
    if(email&&googleId){
        const token=jwt.sign({email:email,googleId:googleId},process.env.JWT_PRIVATE_KEY,{algorithm:'HS256'}, { expiresIn: '30d' })
   return token
    }
    else{
        return null
    }
    
}


module.exports=GenerateToken