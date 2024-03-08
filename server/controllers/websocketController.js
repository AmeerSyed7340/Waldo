// controllers/websocketController.js

function setupWebSocket(ws) {
    let timer = 0; // Move the timer inside the function scope

    // Set up the interval for this specific connection
    const interval = setInterval(() => {
        timer++;
        ws.send(JSON.stringify({ timer }));
    }, 1000);

    ws.on('close', () => {
        clearInterval(interval); // Only clear the interval for this connection
    });

    ws.on('error', (err) => {
        console.error('WebSocket encountered error:', err);
        clearInterval(interval);
    });
}

module.exports = {
    setupWebSocket,
};
