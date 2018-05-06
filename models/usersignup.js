
const mongoose=require('mongoose');
const Schema= mongoose.Schema;
const usersignupSchema=new Schema({




firstname:{
type:String

},
lastname:{
type:String

},
email:{
type:String

},

password:{
type:String

}


})
module.exports=mongoose.model('usersignup',usersignupSchema);
