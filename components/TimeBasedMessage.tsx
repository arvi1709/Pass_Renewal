import React, { useState, useEffect } from 'react';

const getTimeBasedMessage = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return "Good morning, sunshine ☀️";
  } else if (hour >= 17 && hour < 21) {
    return "Hope your day went well 🌆";
  } else if (hour >= 21 && hour < 24) {
    return "Hope you’re resting well 🌙";
  } else if (hour >= 0 && hour < 4) {
    return "Still awake? Me too.";
  }
  return "";
};

export const TimeBasedMessage: React.FC = () => {
  const [message, setMessage] = useState(getTimeBasedMessage());

  useEffect(() => {
    const timer = setInterval(() => {
      setMessage(getTimeBasedMessage());
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  if (!message) return null;

  return (
    <div className="text-center text-gray-500 font-medium animate-in fade-in slide-in-from-bottom-2 duration-500">
      <p>{message}</p>
    </div>
  );
};
