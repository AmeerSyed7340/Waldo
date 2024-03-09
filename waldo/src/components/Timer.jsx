import React, { useState, useEffect } from 'react';

const Timer = ({ wsUrl }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setTime(data.timer);
    };

    ws.onerror = (error) => {
      console.log('WebSocket error: ', error);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    // Cleanup function
    return () => {
      ws.close(); // Close the WebSocket connection
    };
  }, [wsUrl]); // Dependency array containing wsUrl

  return (
    <div className="timer">
      Timer: {time}
    </div>
  );
};

export default Timer;