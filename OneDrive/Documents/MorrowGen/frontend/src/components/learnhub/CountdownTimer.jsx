import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ timer }) => {
  const [timeLeft, setTimeLeft] = useState(timer * 60 || 600); // Default to 10 minutes (600 seconds)

  useEffect(() => {
    if (timeLeft === 0) return;

    const countdown = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(countdown); // Cleanup
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className='flex bg-white p-2 rounded-lg'>
      {timeLeft > 0 ? formatTime(timeLeft) : "Time's up!"}
    </div>
  );
};

export default CountdownTimer;
