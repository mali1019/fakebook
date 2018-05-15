const express = require('express');
const router = express.Router();
//const { adminAuthenticated } = require('../../helpers/authentication');
const faker = require('faker');
const kt = require('../../models/posts');
const post = require('../../models/posts');
const cate = require('../../models/category');
const comments=require('../../models/comments');

router.post('/admin/posts/fake', (req, res) => {
//const {adminAuthenticated} = require('../../helpers/authentication');

  for (let i = 0; i < req.body.amount; i++) {
    let post = new kt();

    post.title = faker.name.title();
    post.status = 'public';
    post.allowcomments = faker.random.boolean();
    post.body = faker.lorem.sentences();

    post.save();



    res.redirect('/admin/posts');
  }
});

router.all('/*', (req, res, next) => {
  req.app.locals.layout = 'admin';
  next();
});


router.get('/admin', (req, res) => {
// post.count({}).then((poscount)=>{
// res.render('admin/index.handlebars', { user: req.user,poscount:poscount });
//
// })
    const promises = [
        post.count().exec(),
        cate.count().exec(),
        comments.count().exec()
    ];
    Promise.all(promises).then(([postCount, categoryCount,comm])=>{
        res.render('admin/index', {postCount: postCount, categoryCount: categoryCount,comm:comm,user:req.user});
    });

});







router.get('/admin/dashboard', (req, res, next) => {
  res.render('admin/dashboard.handlebars', { user: req.user });
});


router.get('/chart', (req, res, next) => {
  res.render('admin/chart.handlebars', { user: req.user });
});

module.exports = router;
