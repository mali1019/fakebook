module.exports={




adminAuthenticated: function(req,res,next){

if(req.isAuthenticated()){


 return next();




}
res.redirect('/');

}



}
