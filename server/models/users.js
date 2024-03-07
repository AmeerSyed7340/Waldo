const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    required: [true, 'Username not provided'],
    trim: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;