import User from "@/models/User";
import connectDb from "../middleware/mongoose";
 const  handler= async(req, res)=> {
    if(req.method=="POST"){
      let upuser=await User.findOneAndUpdate({email:req.body.email},{address:req.body.address,pincode:req.body.pincode,phone:req.body.phone,name:req.body.name});
        res.status(200).json({success:true})
    }
    else{
        res.status(400).json({error:"error"})
    }
    
  }
  export default connectDb(handler)