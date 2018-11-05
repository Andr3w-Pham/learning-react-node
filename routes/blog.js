const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require("../models/Blog");
const Blog = mongoose.model('blogs');

router.post('/', (req,res) => {
  console.log(req.body);
  
  var newBlog = {
    title: req.body.title,
    description: req.body.description
  };
  new Blog(newBlog)
    .save()
      .then(blog => {
        console.log(blog);
      })
      .catch(err => console.log(err));


  res.send("data was sent to post route successfully")
});

router.get('/', (req, res) => {
  Blog.find()
  .then(blogs => {
   
   res.json(blogs)
  })
  .catch(err => console.log(err));
});


router.put('/', (req, res) => {

  Blog.findById({
    _id: req.body._id
  })
  .then(blog => {
    blog.title = req.body.title,
    blog.description = req.body.description
    // save the updated blog
    console.log("updated blog before save to db")
    console.log(blog)
    blog.save()
      .then(() => res.json(blog))
     
  })
  .catch((err) => console.log(err));

});

module.exports = router;