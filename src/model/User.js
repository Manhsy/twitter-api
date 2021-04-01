const mongoose = require('../db/client');

//create schema for user object
const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    following: Number,
    followers: Number,
    bio: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;