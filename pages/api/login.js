var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');
import connectDb from "../middleware/mongoose";
import User from "@/models/User";
const handler = async (req, res) => {
  if (req.method == "POST") {
    let user= await User.findOne({"email":req.body.email});
    const bytes  = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
    const decryptpass = bytes.toString(CryptoJS.enc.Utf8);
    if(user){
        if(req.body.email==user.email&&req.body.password==decryptpass){ 
          const token = jwt.sign({email:user.email,name:user.name}, process.env.JWT_SECRET,{
            expiresIn: '3d' 
          });
    res.status(200).json({success: true,token});
}
else{

res.status(200).json({ success: false,error:"Invalid credentials"});
}
}
else{
    res.status(200).json({ success: false,error:"No user found"});
}
  } else{
    res.status(400).json({ error: "This method is not allowed" ,success:false});
  }
};
export default connectDb(handler)