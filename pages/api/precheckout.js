const Razorpay = require('razorpay');
import connectDb from "../middleware/mongoose";
import Order from "@/models/Order";
const handler = async (req, res) => {
  let rand=Math.floor(Math.random()*10000000);
  if(req.method=='POST'){
  
   
//INTIATE AN ORDER CORRESPONDING TO THIS ID
 //check if cart is tempered or not[pending]

 // check if product is out of stock or not [pending]

 //check if the all details are valid or not [pending]

var instance = new Razorpay({ key_id: `${process.env.NEXT_PUBLIC_KEY_ID}`, key_secret: `${process.env.NEXT_PUBLIC_KEY_SECRET}` })

var options = {
  amount: (req.body.subTotal)*100,  // amount in the smallest currency unit
  currency: "INR",
  receipt: `${rand}`
};
try{
instance.orders.create(options, async function(err, order) {
  console.log(order);
  res.status(200).json(order)

  let ordersd=new Order({
    email:req.body.email,
    orderID:order.id,
    products:req.body.cart,
    address:req.body.address,
    amount:req.body.subTotal
  })
  await ordersd.save();

})}
catch{
alert("some error occured");
}
    
}
  }
export default connectDb(handler)
  