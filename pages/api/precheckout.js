const Razorpay = require('razorpay');
import connectDb from "../middleware/mongoose";
import Product from "@/models/Product";
import Order from "@/models/Order";
import pincodes from "../../pincodes.json";
const handler = async (req, res) => {
  let rand=Math.floor(Math.random()*10000000);
  if(req.method=='POST'){
  
   
//INTIATE AN ORDER CORRESPONDING TO THIS ID
 //check if cart is tempered or not
 let product,sumtotal=0;
 let cart =req.body.cart;
 for(let item in cart){
 product=await Product.findOne({slug:item})
 sumtotal+=cart[item].price*cart[item].qty; 
 if(product.availableQty<cart[item].qty){
  res.status(200).json({success:false,"error":"Some items in your cart went out of stock . Please try again!",clearCart:false})
  return
 }

 if(product.price!=cart[item].price){
  res.status(200).json({success:false,"error":"The price of some item in your cart has been changed.Please try again!",clearCart:true})
  return
 }
 }
 if(sumtotal!==req.body.subTotal){
    res.status(200).json({success:false,"error":"The price of some item in your cart has been changed . Please try again!",clearCart:true})
    return
 }
 if(req.body.subTotal<=0){
  res.status(200).json({success:false,"error":"Your cart is empty please build your cart and try again",clearCart:true})
  return
 }
 if(req.body.phone.length!==10 ||!Number.isInteger(Number(req.body.phone))){
  res.status(200).json({success:false,"error":"Please enter your 10 digit phone number",clearCart:false})
  return
 }
 if(req.body.pincode.length!==6||!Number.isInteger(Number(req.body.pincode))){
  res.status(200).json({success:false,"error":"Please enter your 6 digit pincode",clearCart:false})
  return
 }
 if(!Object.keys(pincodes).includes(req.body.pincode)){
  res.status(200).json({success:false,"error":"Sorry! Your pin code is not serviceable",clearCart:false});
  return
 }
 // check if product is out of stock or not 


 //check if the all details are valid or not

var instance = new Razorpay({ key_id: `${process.env.NEXT_PUBLIC_KEY_ID}`, key_secret: `${process.env.NEXT_PUBLIC_KEY_SECRET}` })

var options = {
  amount: (req.body.subTotal)*100,  // amount in the smallest currency unit
  currency: "INR",
  receipt: `${rand}`
};
try{
instance.orders.create(options, async function(err, order) {
  console.log(order);
  res.status(200).json({order,success:true});
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
  