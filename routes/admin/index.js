const express = require('express');
const router = express.Router();
//const { adminAuthenticated } = require('../../helpers/authentication');

const faker = require('faker');
const kt = require('../../models/posts');

router.post('/admin/posts/fake', (req, res) => {


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
  res.render('admin/index.handlebars', { user: req.user });
});

router.get('/admin/dashboard', (req, res, next) => {
  res.render('admin/dashboard.handlebars', { user: req.user });
});


router.get('/chart', (req, res, next) => {
  res.render('admin/chart.handlebars', { user: req.user });
});

module.exports = router;
