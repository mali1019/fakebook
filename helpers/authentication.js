module.exports = {


    
    
    adminAuthenticated:(req,res,next)=>{
        if(req.isAuthenticated()){
            console.log(req.user.allowed)
            return next();
        }
        else{
            res.redirect('/login')
        }
    },
    userAuthenticated: function (req, res, next) {

        if (req.isAuthenticated()) {


            return next();




        }
        res.redirect('/');

    },



}
