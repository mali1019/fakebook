
const mongoose=require('mongoose');
const Schema= mongoose.Schema;
const commentSchema=new Schema({

user:{
type:Schema.Types.ObjectId,
ref:'register'

},



body:{
type:String

}


})
module.exports=mongoose.model('comment',commentSchema);
