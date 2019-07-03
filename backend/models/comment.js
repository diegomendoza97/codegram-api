const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    content: String
});

module.exports = mongoose.model('Comment', postSchema);