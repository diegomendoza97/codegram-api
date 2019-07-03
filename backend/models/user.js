const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: {type: String, required: true, unique: true },
    password: { type: String, required: true },
    following: [{type: Schema.Types.ObjectId, ref: 'User'}],
    followers: [{type: Schema.Types.ObjectId, ref: 'User'}],
    postsLiked: [{type: Schema.Types.ObjectId, ref: 'Posts'}]
});

module.exports = mongoose.model('User', userSchema);