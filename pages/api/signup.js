var CryptoJS = require("crypto-js");
import connectDb from "../middleware/mongoose";
import User from "@/models/User";
const handler = async (req, res) => {
  if (req.method == "POST") {
    let u= new User({ name:req.body.name,email:req.body.email,password: CryptoJS.AES.encrypt(req.body.password, process.env.AES_SECRET).toString()});
    await u.save();
    res.status(200).json({ success: true});
   
  } else{
    res.status(400).json({ error: "This method is not allowed" ,success:false});
  }
};
export default connectDb(handler)
