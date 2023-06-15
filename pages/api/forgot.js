import User from "@/models/User";
import Forgot from "@/models/Forgot";
var CryptoJS = require("crypto-js");
import connectDb from "../middleware/mongoose";
import Jwt from "jsonwebtoken";
const handler = async (req, res) => {
  console.log(process.env.AUTH_KEY);
  //check if the customer exists in the database or not
  if (req.body.sendMail == true) {
    try{
      let token = `tprint${Math.floor(Math.random()*1000000000)}in`;
      let f = await Forgot.findOne({ email: req.body.email });
      console.log(f);
      if (f != null) {
        if (f.email == req.body.email) {
          await Forgot.deleteOne({_id:f._id});
        }
      }
      let forgot = new Forgot({
        email: req.body.email,
        token: token,
      });
      await forgot.save();
      //after deployment
      // const options = {
      //   method: 'POST',
      //   headers: {
      //     accept: 'application/json',
      //     'content-type': 'application/json',
      //     authkey: process.enc.AUTH_KEY
      //   },
      //   body: JSON.stringify({
      //     to: [{name: 'Mark', email:req.body.email}],
      //     from: {name: 'Joe', email: 'khanbasir5555@gmail.com'},
      //     domain: 'pcwytw.mailer91.com',
      //     template_id: 'emailauthforforgot',
      //     variables: {VAR1: token}
      //   })
      // };
      
      // fetch('https://control.msg91.com/api/v5/email/send', options)
      //   .then(response => response.json())
      //   .then(response => console.log(response))
      //   .catch(err => console.error(err));

      // let email = `We have sent you this email in response to your request to reset your password on Techprint.in
      // <br/><br/>
      // To reset your password for, please follow the link below:
  
      // <a href="${`https://techprint.com/forgot?token=${token}`}</a>
  
      // <br/><br/>
  
      // We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your Techprint.in My Account Page and clicking on the "Change Address or Password" link.`;
      //reset password logic
      res.status(200).json({ success: true ,forgot});
    }
    catch(err){
      res.status(400).json({ success: false});
    }
    
  } 
 else {
  try{
    let tokenn = await Forgot.findOne({ token: req.body.token });
    if (req.body.cpassword == req.body.password) {
      await User.findOneAndUpdate(
        { email: tokenn.email },
        {
          password: CryptoJS.AES.encrypt(
            req.body.cpassword,
            process.env.AES_SECRET
          ).toString(),
        }
      );
      res.status(200).json({ success: true });
    }
    else {
      res.status(400).json({ success: false });
    }
  }
  catch{
    res.status(400).json({ success: false });
  }
  
}
}
export default connectDb(handler);
