const mongoose = require('mongoose');
const ForgotSchema =new mongoose.Schema({
    email: {type: String,unique: false,default:""},
    token: {type: String, required:true,unique: true}
},{timestamps:true})
mongoose.models={}
export default mongoose.model("Forgot",ForgotSchema);