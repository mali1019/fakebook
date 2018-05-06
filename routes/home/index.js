
const express = require('express');
const router = express.Router();
const post = require('../../models/posts');
const cate = require('../../models/category');
const regist = require('../../models/register');
const usersignup = require('../../models/usersignup');
const bcrypt = require('bcrypt');
const passport = require('passport');
const Localstrategy = require('passport-local').Strategy;
//const { usersignAuthenticated } = require('../../helpers/userauthentication');

router.all('/*', (req, res, next) => {

    req.app.locals.layout = 'home';
    next();

});
router.get('/home', (req, res) => {
    post.find({}).then((post) => {
        cate.find({}).then((cate) => {

            res.render('home/index.handlebars', { posts: post, cate: cate, user: req.user });

        })


    });


});

//login get




router.get('/login', (req, res) => {
    res.render('home/login.handlebars');
});

//passport use
// passport.use(new Localstrategy({ usernameField: 'email' }, (email, password, done) => {
//     regist.findOne({ email: email }).then(response => {
//         if (!response) return done(null, false, { message: 'No user found' });
//         bcrypt.compare(password, response.password, (err, res) => {
//             if (err) return err;
//             if (res) {
//                 return done(null, response);
//             } else {
//                 return done(null, false, { message: 'Incorrect password' });
//             }
//         });
//     }).catch((err) => {
//         if (err) return err;

//     });
// }));

// passport.serializeUser(function (regist, done) {
//     done(null, regist.id);
// });
// passport.deserializeUser(function (id, done) {
//     regist.findById(id, function (err, regist) {
//         done(err, regist);
//     });
// });

passport.use(new Localstrategy({ usernameField: 'email' }, (email, password, done) => {
    usersignup.findOne({ email: email }).then((response) => {

        if (!response) return done(null, false, { message: "user not found" })
        bcrypt.compare(password, response.password, (err, res) => {
            if (err) return err;
            if (res) {
                return done(null, response);
            }
            else {
                return done(null, false, { message: "incorrect password" })
            }
        })
    })
}))
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    usersignup.findById(id, function (err, user) {
        done(err, user);
    });
});


// login post
router.post('/login', (req, res, next) => {

    passport.authenticate('local', {

        successRedirect: '/admin',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', (req, res) => {

    req.logOut();
    res.redirect('/login');

});



router.get('/signup', (req, res) => {
    res.render('home/register.handlebars');
});


router.post('/signup', (req, res) => {

    //validations
    let err = [];
    if (!req.body.firstName) {

        err.push({ mes: 'enter first name' })

    }
    if (!req.body.lastName) {

        err.push({ mes: 'enter last name' })

    }
    if (!req.body.email) {

        err.push({ mes: 'plz insert email' })

    }

    if (!req.body.password) {

        err.push({ mes: 'plz insert password' })
    }
    if (!req.body.passwordConfirm) {

        err.push({ mes: 'plz insert confirm password' })
    }

    if (req.body.password !== req.body.passwordConfirm) {

        err.push({ mes: 'password not matched' })
    }
    if (err.length > 0) {
        res.render('home/register.handlebars', {
            err: err,
            firstname: req.body.firstName,
            lastname: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        })
    }
    else {
        //email exist functionality
        regist.findOne({ email: req.body.email }).then((response) => {
            if (response === null) {
                const newregist = new regist({
                    firstname: req.body.firstName,
                    lastname: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password
                })
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newregist.password, salt, (err, hash) => {
                        if (err) return err;
                        newregist.password = hash;
                        newregist.save().then((post) => {
                            req.flash('error_message', 'registration successfull');

                            res.redirect("/login");
                            //res.send('inserted');
                        })
                    })
                })
            }
            else {
                req.flash('exist_success', 'email already exist plz login from another email');
                res.redirect("/signup");
            }
            //res.send('working');
        }).catch((error) => {
            console.log(error);
        })
    }
});



router.get('/about', (req, res) => {
    res.render('home/about', { user: req.user });
});


router.get('/home/postss/:id', (req, res) => {
    post.findOne({ _id: req.params.id }).then((post) => {
        cate.find({}).then((cate) => {
            res.render('home/readmore.handlebars', { post: post, cate: cate });
        })



    })


});


module.exports = router;
