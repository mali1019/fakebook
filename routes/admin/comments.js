const express=require('express');
const router=express.Router();
const post=require('../../models/posts');
const comments=require('../../models/comments');

router.post('/admin/comments',(req,res)=>{
comments.findOne({_id:req.body.id}).then((pos)=>{

const newcomments=new  comments({

user:req.user.id,
body:req.body.body


})

//pos.comments.push(newcomments);
//pos.save().then((savepost)=>{
newcomments.save().then((savecomments)=>{

//  res.redirect('home/readmore');
  res.send('data saved succussfully');
})


//})




})
//res.send('working');


})


module.exports=router;
