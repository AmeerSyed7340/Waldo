const asyncHandler = require('express-async-handler')

exports.extractCoordinates = asyncHandler(async (req, res, next) => {
    
    const userCoordinates = req.body;

    //Hardcoded coordinates for comparison
    const correctCoordinates = { x: 785, y: 428 };

    //Logic to compare coordinates
    const isCorrect = checkIfCoordinatesMatch(userCoordinates, correctCoordinates);


    res.json({ correct: isCorrect });
})

function checkIfCoordinatesMatch(userCoords, correctCoords) {
    //some margin of error
    console.log(`match coords: ${userCoords.x}, ${userCoords.y}`)
    const marginOfError = 10;

    return (
        Math.abs(userCoords.x - correctCoords.x) <= marginOfError &&
        Math.abs(userCoords.y - correctCoords.y) <= marginOfError
    );
}//helper function to compare codes

exports.test = asyncHandler(async (req, res, next) => {
    res.json({ Message: 'Inside controller now' });
})