//follow: CREATE, DELETE, READ
const express = require("express");
const Follow = require('../model/Follow');
const Post = require("../model/Post");
const User = require('../model/User');
// initialize a new router
const router = express.Router();

// create
router.post("/", async(req, res) => {
    const newFollow = new Follow();
    const userId = req.body.userId; 

    //get user 
    const user = await User.findById(userId);
    newFollow.userId = userId;
    
    if(req.body.newFollowerId) {
      newFollow.follower = req.body.newFollowerId;
      await User.findByIdAndUpdate(userId, {followers: user.followers+1});
    }
    if(req.body.newFollowingId) {
      newFollow.followee = req.body.newFollowingId;
      await User.findByIdAndUpdate(userId, {following: user.following+1});
    }

    await newFollow.save();
    const getUpdatedUser = await User.findById(userId);
    
    res.json(getUpdatedUser);
  });
  
  // read
  router.get("/:id", async(req, res) => {
    const followId = await Follow.findById(req.params.id);
    const userId = followId.userId;
    const re = await User.findById(userId);
    res.json(re);
  });

    
  // delete
  router.delete("/:id", async(req, res) => {
    const follow = await Follow.findById(req.params.id);

    await Follow.findByIdAndDelete(req.params.id);
    const userID = follow.userId;
    const user = await User.findById(userID);

    if(follow.follower) await User.findByIdAndUpdate(userID, {followers: user.followers -1});
    if(follow.followee) await User.findByIdAndUpdate(userID, {following: user.following -1});

    const updatedUser  = await User.findById(userID);
    res.json(updatedUser);
  });

module.exports = router;