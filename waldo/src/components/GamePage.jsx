import '../styles/GamePage.css'
import React from 'react';

function GamePage() {
     const gameAreaRef = React.useRef(null);

    function handleClick(event) {
        // Dimensions of the .main-content div
        const gameAreaRect = event.currentTarget.getBoundingClientRect();

        // Provided image dimensions
        const originalImageWidth = 480;
        const originalImageHeight = 480;

        // Calculate the aspect ratio of the div
        const divAspectRatio = gameAreaRect.width / gameAreaRect.height;

        // Since the image aspect ratio is 1 (square), we only need to compare with the div's aspect ratio
        let adjustedX, adjustedY;
        let xOffset = 0, yOffset = 0; // Offsets for letterboxing or pillarboxing

        // Calculate if the image is letterboxed or pillarboxed within the .main-content div
        if (divAspectRatio > 1) {
            // Pillarboxing (empty space on the sides)
            const displayHeight = gameAreaRect.height;
            const displayWidth = displayHeight; // Image is square, so width equals height
            xOffset = (gameAreaRect.width - displayWidth) / 2; // Horizontal offset
            adjustedX = (event.clientX - gameAreaRect.left - xOffset) * (originalImageWidth / displayWidth);
            adjustedY = (event.clientY - gameAreaRect.top) * (originalImageHeight / gameAreaRect.height);
        } else {
            // Letterboxing (empty space on top and bottom)
            const displayWidth = gameAreaRect.width;
            const displayHeight = displayWidth; // Image is square, so height equals width
            yOffset = (gameAreaRect.height - displayHeight) / 2; // Vertical offset
            adjustedX = (event.clientX - gameAreaRect.left) * (originalImageWidth / displayWidth);
            adjustedY = (event.clientY - gameAreaRect.top - yOffset) * (originalImageHeight / displayHeight);
        }

        console.log(`Adjusted x: ${adjustedX}, Adjusted y: ${adjustedY}`);
    }


    return (
        <div className="main-content" ref={gameAreaRef} onClick={handleClick}></div>
    )
}

export default GamePage;