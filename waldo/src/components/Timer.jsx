import React, { useState, useEffect } from 'react';

const Timer = ({ wsUrl }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    // Initialize WebSocket connection
    const ws = new WebSocket(wsUrl);

    // Set up event listeners for WebSocket
    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setTime(data.timer);  // Update time from server's message
    };

    ws.onerror = (error) => {
      console.log('WebSocket error: ', error);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      // Optionally try to reconnect or handle the disconnection
    };

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      ws.close();
    };
  }, [wsUrl]); // Only re-run the effect if the wsUrl changes

  return (
    <div className="timer">
      Timer: {time}
    </div>
  );
};

export default Timer;
