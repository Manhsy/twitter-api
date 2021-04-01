const mongoose = require('../db/client');

const postSchema = new mongoose.Schema({
    text: String,
    likes: Number,
    creator: String,
});

const Post = mongoose.model('postSchema', postSchema);
module.exports = Post;