import User from "@/models/User";
import connectDb from "../middleware/mongoose";
import Jwt from "jsonwebtoken";
 const  handler= async(req, res)=> {
    if(req.method=="POST"){
        const token = req.body.token;
    const data = Jwt.verify(token,process.env.JWT_SECRET)
      let dbuser=await User.findOne({email:data.email});
      const {name,email,address,pincode,phone}=dbuser;
        res.status(200).json({name,email,address,pincode,phone})
    }
    else{
        res.status(400).json({error:"error"})
    }
    
  }
  export default connectDb(handler)