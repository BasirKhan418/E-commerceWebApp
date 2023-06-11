import * as crypto from "crypto"
import connectDb from "../middleware/mongoose";
import Order from "@/models/Order";
import Product from "@/models/Product";
const handler = async (req, res) => {
  let order ;
  console.log(req.body);
  //validate payment using razorpay
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
      // razorpay_order_id
  //     razorpay_payment_id: 'pay_LzpFe1jHO8rymk',
  // razorpay_order_id: 'order_LzpFVdVQVloXpf',
  // razorpay_signature:
 
     order= await Order.findOneAndUpdate({orderID:req.body.razorpay_order_id},{status:"Paid",payment_id:req.body.razorpay_payment_id,payment_signature:req.body.razorpay_signature});
     let products = order.products;
     for (let slug in products){
       await Product.findOneAndUpdate({slug:slug},{$inc:{"availableQty":-products[slug].qty }})
     }
      res.redirect(`/order?id=${order._id}&clearCart=1`,200);
      }
    else{
       order =await Order.findOneAndUpdate({orderID:req.body.razorpay_order_id},{status:"Pending",payment_id:req.body.razorpay_payment_id,payment_signature:req.body.razorpay_signature});
    }
  }
  export default connectDb(handler)
  