import '../styles/GamePage.css'
import PopUp from './PopUp';
import React, { useState } from 'react';

function GamePage() {
    const [clickPosition, setClickPosition] = useState({x: 0, y: 0});
    const [showPopup, setShowPopup] = useState(false);
    const gameAreaRef = React.useRef(null);

    function handleClick(event) {
        const gameAreaRect = event.currentTarget.getBoundingClientRect();

        // Original dimensions of the image
        const originalImageWidth = 1612; // Replace with your image's original width
        const originalImageHeight = 806; // Replace with your image's original height
        const imageAspectRatio = originalImageWidth / originalImageHeight;

        // Aspect ratio of the .main-content div (viewport in this case)
        const divAspectRatio = gameAreaRect.width / gameAreaRect.height;

        let adjustedX, adjustedY;
        let xOffset = 0, yOffset = 0; // Offsets for letterboxing/pillarboxing

        // Calculate if the image is letterboxed or pillarboxed within the .main-content div
        if (divAspectRatio > imageAspectRatio) {
            // Pillarboxing (empty space on sides)
            const displayHeight = gameAreaRect.height;
            const displayWidth = displayHeight * imageAspectRatio;
            xOffset = (gameAreaRect.width - displayWidth) / 2; // Horizontal offset
            adjustedX = (event.clientX - gameAreaRect.left - xOffset) * (originalImageWidth / displayWidth);
            adjustedY = (event.clientY - gameAreaRect.top) * (originalImageHeight / gameAreaRect.height);
        } else {
            // Letterboxing (empty space on top/bottom)
            const displayWidth = gameAreaRect.width;
            const displayHeight = displayWidth / imageAspectRatio;
            yOffset = (gameAreaRect.height - displayHeight) / 2; // Vertical offset
            adjustedX = (event.clientX - gameAreaRect.left) * (originalImageWidth / displayWidth);
            adjustedY = (event.clientY - gameAreaRect.top - yOffset) * (originalImageHeight / displayHeight);
        }

        setClickPosition({x: event.clientX-gameAreaRect.left, y: event.clientY-gameAreaRect.top});
        
        console.log(`Adjusted x: ${adjustedX}, Adjusted y: ${adjustedY}`);
        setShowPopup(true);
    }

    function handleConfirm(event) {
        event.stopPropagation();

        fetch('http://localhost:3000')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setShowPopup(false);
        })
        .catch((err) => {
            console.error(err);
        });
    }


    return (
        <div className="main-content" ref={gameAreaRef} onClick={handleClick}>
            {
                showPopup && (
                    <PopUp onConfirm={handleConfirm} onClose={(event) => {
                        event.stopPropagation();
                        setShowPopup(false)
                    }
                    }
                    clickPosition = {clickPosition}></PopUp>
                )
            }
        </div>
    )
}

export default GamePage;