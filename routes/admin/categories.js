const express = require('express');
const router = express.Router();
const cate = require('../../models/category');


router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
});


router.get('/admin/category', (req, res) => {

    cate.find({ "user_id": req.user.id }).then((post) => {
        res.render('admin/category/index.handlebars', { post: post })
    })
});


router.post('/admin/category', (req, res) => {

    const newcate = new cate({
        user_id: req.user._id,
        name: req.body.name

    })
    newcate.save().then((postsave) => {

        console.log('post successfully insertd');
        res.render('admin/category/');

    }).catch((err) => {
        if (err) throw err;
    })
});

router.get('/edit/:id', (req, res) => {
    cate.findOne({ _id: req.params.id }).then((post) => {

        res.render('admin/category/edit.handlebars', { post: post });

    })

});




router.put('/edit/:id', (req, res) => {
    cate.findOne({ _id: req.params.id }).then((post) => {
        post.name = req.body.name;
        post.save().then((savedcate) => {

            res.render('admin/category/');
        })
    })
});

router.delete('/edit/:id', (req, res) => {
    cate.remove({ _id: req.params.id }).then((post) => {

        res.render('admin/category/index.handlebars');

    })

});


module.exports = router;
