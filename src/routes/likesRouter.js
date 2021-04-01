//likes: CREATE, READ, DELETE
const express = require("express");
const Like = require('../model/Like');
const Post = require('../model/Post');
// initialize a new router
const router = express.Router();

// create
router.post("/", async(req, res) => {
    const postId = req.body.postID;
    const likedBy = req.body.likedBy;

    //create a like
    const like = new Like({postId, likedBy});
    await like.save();

    const oldPost = await Post.findById(postId);
    //increment post's like count
    await Post.findByIdAndUpdate(postId, {likes: oldPost.likes +1});
    const newPost = await Post.findById(postId);
    
    res.json(newPost);

  });
  
  // read
  router.get("/:id", async(req, res) => {
    const like = await Like.findById(req.params.id);
    //get post id
    const postId = like.postId;
    //find post
    const post = await Post.findById(postId);
    res.json(post);
  });

  // delete
  router.delete("/:id", async(req, res) => {
    //like id
    const like = await Like.findById(req.params.id);
    //delete like
    await Like.findByIdAndDelete(like);
    //get post id 
    const postId = like.postId;
    //find post 
    const oldPost = await Post.findById(postId);
    //update post
    const newPost = await Post.findByIdAndUpdate(postId, {likes: oldPost.likes-1});

    const updatedPost = await Post.findById(postId);

    res.json(updatedPost);

  });

module.exports = router;
