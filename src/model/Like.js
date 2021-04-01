const mongoose = require('../db/client');

const likeSchema = new mongoose.Schema({
    postId: String,
    likedBy: String,
});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;