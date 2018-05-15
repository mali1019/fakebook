
const express = require('express');
const router = express.Router();
const post = require('../../models/posts');
const cate = require('../../models/category');
const regist = require('../../models/register');
const usersignup = require('../../models/usersignup');
const bcrypt = require('bcrypt');
const passport = require('passport');
const comments=require('../../models/comments');
const Localstrategy = require('passport-local').Strategy;

//const {} = require('../../helpers/userauthentication');
const { adminAuthenticated } = require('../../helpers/authentication');

router.all('/*', (req, res, next) => {

    req.app.locals.layout = 'home';
    next();

});
router.get('/home',adminAuthenticated, (req, res) => {
    post.find({}).then((post) => {
        cate.find({}).then((cate) => {

            res.render('home/index.handlebars', { posts: post, cate: cate, user: req.user });

        })


    });


});

//login get


router.get('/about', (req, res) => {
    res.render('home/about', { user: req.user });
});


router.get('/home/postss/:id', (req, res) => {
    post.findOne({ _id: req.params.id }).populate('comments').then((post) => {
    //  comments.findOne({_id:req.params.id}).then((commm)=>{
        cate.find({}).then((cate) => {
            res.render('home/readmore.handlebars', { post: post, cate: cate,user:req.user});
        })


      //})



    })

//
 });


module.exports = router;
