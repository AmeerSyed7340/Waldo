const asyncHandler = require('express-async-handler');
//import User model
const User = require('../models/users');

exports.allUsers = asyncHandler(async(req, res, next) => {
    const users = await User.find();

    res.json(users);
})