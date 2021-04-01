//posts: CREATE, READ, DELETE, UPDATE 
const express = require("express");
const Post = require('../model/Post');
const user = require('../model/User');
// initialize a new router
const router = express.Router();
// create
router.post("/", async(req, res) => {
    const text = req.body.text;
    const likes = 0; 
    const creator = req.body.creator;

    const newPost = new Post({text, likes, creator});
    const createPost = await newPost.save();

    const userName = await user.findById(creator);

    res.json({text: text, likes: likes, creator: userName.name});
  });
  
  // read
  router.get("/:id", async(req, res) => {
    const postId = req.params.id;
    const result = await Post.findById(postId);

    res.json(result);
  });
  
  // update
  router.put("/:id", async(req, res) => {
    const id = req.params.id;
    const text = req.body.text;
    const update = await Post.findByIdAndUpdate(id, {text});
    const re = await Post.findById(id);

    res.json(re);
  });
  
  // delete
  router.delete("/:id", async(req, res) => {
    const id = req.params.id;
    await Post.findByIdAndDelete(id)

    res.json({sucessful: true});
  });

module.exports = router;