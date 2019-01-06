const express = require('express');
const router = express.Router();
const usersignup = require('../../models/usersignup');
const passport = require('passport');
const Localstrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
router.all('/*', (req, res, next) => {

    req.app.locals.layout = 'userlogin';
    next();

});


router.get('/', (req, res) => {

    //res.send("userlogin page working");

    res.render('loginuser/userlogin.handlebars');

});

passport.use(new Localstrategy({ usernameField: 'email' }, (email, password, done) => {
    usersignup.findOne({ email: email }).then((response) => {

        if (!response) return done(null, false, { message: "user not found" })
        bcrypt.compare(password, response.password, (err, res) => {
            if (err) return err;
            if (res) {
                return done(null, response);
            } else {
                return done(null, false, { message: "incorrect password" })
            }
        })
    })
}))
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    usersignup.findById(id, function(err, user) {
        done(err, user);
    });
});


router.post('/userlogin', (req, res, next) => {
    //res.send("usersignup page working");

    passport.authenticate('local', {

        successRedirect: "/home",
        failureRedirect: "/",
        failureFlash: true
    })(req, res, next)

});


router.get('/userlogout', (req, res) => {

    //res.send("userlogin page working");
    req.logOut();
    res.redirect('/');

});











router.get('/usersignup', (req, res) => {

    //res.send("usersignup page working");

    res.render('loginuser/checking.handlebars');

});


router.post('/usersignup', (req, res) => {
    let file = req.files.file;
    let filename = file.name;

    file.mv('./public/uploads/' + filename, (err) => {
        if (err) throw err;
    });

    const newusersignup = new usersignup({

        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        file: filename

    })
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newusersignup.password, salt, (err, hash) => {
            if (err) return err;
            newusersignup.password = hash;
            newusersignup.save().then((post) => {
                req.flash('error_message', 'registration successfull');

                res.redirect("/");
                //res.send('inserted');
            })
        })
    })




});


module.exports = router;