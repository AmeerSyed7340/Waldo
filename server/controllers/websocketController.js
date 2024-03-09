// controllers/websocketController.js
const asyncHandler = require('express-async-handler');

exports.setupWebSocket = (ws) => {
    let timer = 0; // Move the timer inside the function scope
    let isTimerActive = true;//flag to control timer

    // Set up the interval for this specific connection
    const interval = setInterval(() => {
        if(isTimerActive){
            timer++;
            ws.send(JSON.stringify({ timer }));
        }
    }, 1000);

    ws.on('message', (msg) => {
        const message = JSON.parse(msg);

        //Check if the message indicates to stop the timer
        if(message.stopTimer){
            isTimerActive = false;//stop timer
        }
    })
    ws.on('close', () => {
        clearInterval(interval); // Only clear the interval for this connection
    });

    ws.on('error', (err) => {
        console.error('WebSocket encountered error:', err);
        clearInterval(interval);
    });
};

