const express = require('express');
const router = express.Router();
const post = require('../../models/posts');
const { userAuthenticated } = require('../../helpers/authentication');

router.all('/*', (req, res, next) => {
  req.app.locals.layout = 'admin';
  next();
});

router.get('/admin/posts', (req, res) => {
  //res.render('admin/post.handlebars');
  console.log(req.user)
  post.find({ "user_id": req.user.id }).then((post) => {

    res.render('admin/posts', { posts: post, user: req.user });

  }).catch((err) => {

    if (err) return err;
  })

});

router.get('/admin/posts/create', (req, res) => {

  //res.render('home/login.handlebars');

  res.render('admin/posts/create.handlebars', { user: req.user });
});

router.post('/admin/posts/create', (req, res) => {
  console.log(req.body);
  let errors = [];
  if (!req.body.title) {

    errors.push({ message: 'title field is required' })

  }
  if (!req.body.body) {

    errors.push({ message: 'body  field is required' })

  }

  if (errors.length > 0) {

    res.render('admin/posts/create.handlebars', {

      errors: errors
    })

  }

  else {

    let file = req.files.file;
    let filename = Date.now() + file.name;

    file.mv('./public/uploads/' + filename, (err) => {
      if (err) throw err;
    });

    let allowcomments = true;
    if (req.body.checkbox) {
      allowcomments = true;
    } else {
      allowcomments = false;
    }
    const newpost = new post({
      user_id: req.user._id,
      title: req.body.title,
      status: req.body.status,
      allowcomments: allowcomments,
      body: req.body.body,
      file: filename
    })

    newpost.save().then((savedPost) => {
      req.flash('success_message', `posts ${savedPost.title} was created successfully`);
      console.log("successfully data saved");
      res.redirect('/admin/posts');
    })
  }
});

router.get('/admin/posts/edit/:id', (req, res) => {
  post.findOne({ _id: req.params.id }).then((post) => {
    res.render('admin/posts/edit.handlebars', { posts: post });
  })
});

router.put('/admin/posts/edit/:id', (req, res) => {
  post.findOne({ _id: req.params.id }).then((post) => {
    if (req.body.checkbox) {
      allowcomments = true;
    } else {
      allowcomments = false;
    }
    //files update
    let file = req.files.file;
    let filename = Date.now() + file.name;

    file.mv('./public/uploads/' + filename, (err) => {
      if (err) throw err;
    });


    post.title = req.body.title;
    post.status = req.body.status;
    post.allowcomments = allowcomments;
    post.body = req.body.body;
    post.file = filename;
    post.save().then((postsupdated) => {

      req.flash('success_message', 'post successfully updated');

      res.redirect('/admin/posts');
    })
  })
});

router.delete('/admin/posts/:id', (req, res) => {

  post.remove({ _id: req.params.id }).then((result) => {
    req.flash('success_message', 'post successfully deleted');
    res.redirect('/admin/posts');

  })

})


module.exports = router;
