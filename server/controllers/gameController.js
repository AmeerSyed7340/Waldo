const asyncHandler = require('express-async-handler')

exports.extractCoordinates = asyncHandler(async(req, res, next) => {
    console.log(req.body);
    res.json({message: req.body});
})

exports.test = asyncHandler(async(req, res, next) => {
    res.json({Message: 'Inside controller now'});
})