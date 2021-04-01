const mongoose = require('../db/client');

const followSchema = new mongoose.Schema({
    userId: String,
    follower: String,
    followee: String,
});

const Follow = mongoose.model('Follow', followSchema);
module.exports = Follow;