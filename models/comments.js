
const mongoose=require('mongoose');
const Schema= mongoose.Schema;
const commentSchema=new Schema({


user_id:String,


user:{
type:Schema.Types.ObjectId,
ref:'usersignup'

},

username:{

  type:String
},

body:{
type:String

},
date:{
  type:Date,
  default:Date.now()


},
file:String

})
module.exports=mongoose.model('comments',commentSchema);
