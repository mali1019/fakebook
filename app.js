
const express=require("express");
const app=express();
const exphbs=require("express-handlebars");
const path=require('path');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const methodoverride=require('method-override');
const fileupload=require('express-fileupload');
const session=require('express-session');
const flash=require('connect-flash');
const passport=require('passport');
const {mongoDb}=require('./config/database');


mongoose.connect(mongoDb).then(()=>{

console.log('database successfully connected');

}).catch((err)=>{

if (err) return err;
//console.log('database not connected');

});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(methodoverride('_method'));
app.use(fileupload());
app.use(flash());
app.use(session({

secret:'zubairkamboh',
resave: true,
saveUninitialized: true

}));
app.use((req,res,next)=>{

// res.locals.regist = req.regist || null;
  //console.log(res.locals.regist=req.regist);
res.locals.success_message=req.flash('success_message');
res.locals.error_message=req.flash('error_message');
res.locals.exist_success=req.flash('exist_success');
res.locals.error=req.flash('error');
//res.locals.signuperror=req.flash('signuperror');
next();

})



app.use(passport.initialize());
app.use(passport.session());


app.get('/userlogin',(req,res)=>{
res.render('userlogin.handlebars');
//res.send('userlogin working');
});






app.engine('handlebars',exphbs({defaultLayout:"home"}));
app.set('view engine','handlebars');



const home=require('./routes/home/index');
const admin=require('./routes/admin/index');
const posts=require('./routes/admin/posts');
const category=require('./routes/admin/categories');
const comments=require('./routes/admin/comments');
const users=require('./routes/userlogin/userslogin');
app.use('/',home);
app.use('/',admin);
app.use('/',posts);
app.use('/',category);
app.use('/',comments);
app.use('/',users);


const port=8888;
app.listen(port,()=>{
console.log(`listening on port ${port}`);
})
