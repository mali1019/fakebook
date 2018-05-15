const express=require('express');
const router=express.Router();
const post=require('../../models/posts');
const comments=require('../../models/comments');



router.all('/*', (req, res, next) => {
  req.app.locals.layout = 'admin';
  next();
});





router.post('/admin/comments',(req,res)=>{
post.findOne({_id:req.body.id}).then((post)=>{

const newcomments=new  comments({
user_id:req.user._id,
username:req.body.username,
body:req.body.body,
file:req.user.file,
})
post.comments.push(newcomments);
post.save().then((savepost)=>{
newcomments.save().then((savecomments)=>{

  res.redirect(`/home/postss/${post.id}`);
  //res.send('data saved succussfully');
})
})
})
//res.send('working');
})

router.get('/admin/commentss/co',(req,res)=>{
comments.find({user_id:req.user.id}).then((comm)=>{

res.render("admin/comments/findcomment.handlebars",{comm:comm,user:req.user})

})

})

router.delete('/delete/:id',(req,res)=>{
comments.remove({_id:req.params.id}).then((deleted)=>{

res.redirect("/admin/commentss/co");

})
})





module.exports=router;
