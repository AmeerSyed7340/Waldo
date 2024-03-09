const asyncHandler = require('express-async-handler')
//import User model
const User = require('../models/users');

exports.registerUser = asyncHandler(async(req, res, next) => {
    console.log(req.body); // Check what data is being received
    const { username, time } = req.body;
    
    try {
        const newUser = await User.create({ username, time });
        const Users = await User.find();
        res.status(201).json(Users);    
    } catch (error) {
        console.error(error); // Log any errors that occur
        next(error); // Make sure to call next with the error to use your error handling middleware
    }
});
