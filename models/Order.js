const mongoose = require('mongoose');
const OrderSchema =new mongoose.Schema({
    name: {type: String, required:true},
    email: {type: String, required:true},
    orderID: {type: String, required:true},
    payment_id: {type: String, default:''},
    payment_signature: {type: String, default:''},
    products:{type:Object,required:true},
    address:{type:String,required:true},
    pincode:{type:String,required:true},
    city:{type:String,required:true},
    state:{type:String,required:true},
    phone:{type:String,required:true},
    amount:{type:Number,required:true},
    status:{type:String,default:"initiated",required:true},
    deliveryStatus:{type:String,default:"unshipped",required:true}
},{timestamps:true})
mongoose.models={};
export default mongoose.model("Order",OrderSchema);