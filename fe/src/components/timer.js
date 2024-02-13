import React, { useState, useEffect } from 'react';

export default function Timer({ active, time }) {
  const [seconds, setSeconds] = useState(time);

  useEffect(() => {
    let interval = null;

    if (active && seconds < time) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if (!active && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [active, seconds, time]);

  useEffect(() => {
    if (!active) {
      setSeconds(time);
    }
  }, [active, time]);

  return (
    <div>
      {Math.floor(seconds / 60)}:{seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}
    </div>
  );
}