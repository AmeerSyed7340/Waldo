import '../styles/GamePage.css'
import PopUp from './PopUp';
import React, { useState, useEffect, useRef } from 'react';

function GamePage() {
    const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
    const [showPopup, setShowPopup] = useState(false);
    const gameAreaRef = React.useRef(null);
    const [adjustedPosition, setAdjustedPosition] = useState({ x: 0, y: 0 });
    const [time, setTime] = useState(0);
    const ws = useRef(null);

    useEffect(() => {
        // Initialize WebSocket connection
        ws.current = new WebSocket('ws://localhost:3000/ws/timer');

        ws.current.onopen = () => console.log('WebSocket connected');
        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setTime(data.timer); // Update time based on messages from the server
        };
        ws.current.onerror = (error) => console.log('WebSocket error: ', error);
        ws.current.onclose = () => console.log('WebSocket disconnected');

        // Clean up the WebSocket connection when the component unmounts
        return () => {
            if(ws.current) {
                ws.current.close();
            }
        };
    }, []);

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
        setAdjustedPosition({ x: adjustedX, y: adjustedY });
        setClickPosition({ x: event.clientX - gameAreaRect.left, y: event.clientY - gameAreaRect.top });

        console.log(`Adjusted x: ${adjustedX}, Adjusted y: ${adjustedY}`);

        setShowPopup(true);
    }

    function handleConfirm(event) {
        event.stopPropagation();
        console.log(`inside confirm Adjusted x: ${adjustedPosition.x}, Adjusted y: ${adjustedPosition.y}`);

        //send in coodinates
        const dataToSend = { x: adjustedPosition.x, y: adjustedPosition.y };

        fetch('http://localhost:3000/game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.correct) {
                    //save time 
                    const finalTime = data.time;

                    console.log(`Coordinates are correct. Stopping timer. ${data.time}`)
                    ws.current.send(JSON.stringify({ stopTimer: true })) ; // Send message to stop the timer
                    
                    //Prompt the user for their name
                    const userName = prompt("Enter name of winner");

                    if(userName){
                        const userData = {
                            name: userName,
                            time: finalTime
                        }

                        //make api call to backend with winners info
                        fetch('http://localhost:3000/register', {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify(userData)
                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log(`User registered succefully: ${data}`)
                        })
                        .catch((error) => {
                            console.error(`Error registering the user: ${error}`)
                        })
                    }
                }
                setShowPopup(false);
            })
            .catch((err) => {
                console.error(err);
            });
    }


    return (
        <>
            <div className='timer'>Timer: {time}</div>
            <div className="main-content" ref={gameAreaRef} onClick={handleClick}>
                {
                    showPopup && (
                        <PopUp onConfirm={handleConfirm} onClose={(event) => {
                            event.stopPropagation();
                            setShowPopup(false)
                        }
                        }
                            clickPosition={clickPosition}></PopUp>
                    )
                }
            </div>
        </>
    )
}

export default GamePage;