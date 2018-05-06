const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const postSchema=new Schema({
user_id:String,
title:{
type:String,
required:true
},
status:{
  type:String,
  required:true
},
allowcomments:{
  type:String,
  required:true
},
body:{
  type:String,
  required:true
},
file:{
  type:String,
},
date:{
  type:Date,
  default:Date.now()

},

// comments:[{
//   type:Schema.Types.ObjectId,
//   ref:'comments'
//
// }]




},{usePushEach:true});
module.exports=mongoose.model('postss',postSchema);
