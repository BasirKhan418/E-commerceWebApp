import * as crypto from "crypto"
export default async function handler(req, res) {
    const {razorpay_order_id, razorpay_payment_id,razorpay_signature} = req.body;
    // Pass yours key_secret here
    const key_secret = process.env.NEXT_PUBLIC_KEY_SECRET;     
  
    // STEP 8: Verification & Send Response to User
      
    // Creating hmac object 
    let hmac = crypto.createHmac('sha256', key_secret); 
  
    // Passing the data to be hashed
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
      
    // Creating the hmac in the required format
    const generated_signature = hmac.digest('hex');
      
      
    if(razorpay_signature===generated_signature){
        return res.status(200).json({success:true, message:"Payment has been verified"})
      }
    else{
    return res.status(400).json({success:false, message:"Payment verification failed"})
    }
  }
  