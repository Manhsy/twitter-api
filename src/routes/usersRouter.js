
//user: UPDATE, READ, UPDATE, DELETE

const express = require("express");
const User = require('../model/User');
// initialize a new router
const router = express.Router();

// create
router.post("/", async(req, res) => {
    //get name
    const name = req.body.name;

    //get username 
    const username = req.body.username;

    const following = 0;
    const follower = 0; 
    const bio = "";

    const user = new User({username, name, following, follower, bio});
    //save to mongo
    const result = await user.save();
    //return 
    res.json(result);
  });
  
  // read
  router.get("/:id", async(req, res) => {
    const id = req.params.id;
    const info = await User.findById(id);
    res.json(info);

  });
  
  // update
  router.put("/:id", async(req, res) => {
    const id = req.params.id;
    const data = {};

    if (req.body.username) data.username = req.body.username;
    if (req.body.name) data.name = req.body.name;
    if (req.body.bio) data.bio = req.body.bio;

    const user = await User.findByIdAndUpdate(id, data);
    const re = await User.findById(id);
    res.json(re);
    
  });
  
  // delete
  router.delete("/:id", async(req, res) => {
    const id = req.params.id;
    await User.findByIdAndDelete(id);

    res.json({success: true})
  });

module.exports = router;