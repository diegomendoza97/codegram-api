const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const postSchema = mongoose.Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    content: String,
    likes: Number,
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    date: String,
    image: String
});

module.exports = mongoose.model('Post', postSchema);