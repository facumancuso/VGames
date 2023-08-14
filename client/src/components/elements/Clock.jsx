import React, { useState, useEffect } from 'react';
const Clock = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000); 
    return function cleanup() {
      clearInterval(timerID); 
    };
  });

  const tick = () => {
    setDate(new Date()); 
  }

  return (
    <div>
      {date.toLocaleTimeString()}
      {date.toDateString()} 
    </div>
  );
}

export default Clock;
