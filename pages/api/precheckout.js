const Razorpay = require('razorpay');
export default function handler(req, res) {
 let rand=Math.floor(Math.random()*100000);
var instance = new Razorpay({ key_id: `${process.env.NEXT_PUBLIC_KEY_ID}`, key_secret: `${process.env.NEXT_PUBLIC_KEY_SECRET}` })

var options = {
  amount: (req.body.subTotal)*100,  // amount in the smallest currency unit
  currency: "INR",
  receipt: `${rand}specarecheckout${req.body.subTotal}`
};
try{
instance.orders.create(options, function(err, order) {
  console.log(order);
  res.status(200).json(order)
})}
catch{
alert("some error occured");
}
  }
  