
const mongoose=require('mongoose');

const categorySchema=new mongoose.Schema({

user_id:String,

name:{
type:String

}


})
module.exports=mongoose.model('category',categorySchema);
