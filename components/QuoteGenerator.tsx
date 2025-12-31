
import React, { useState, useEffect } from 'react';
import { LOVELY_QUOTES } from '../constants';

export const QuoteGenerator: React.FC = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    setQuote(LOVELY_QUOTES[Math.floor(Math.random() * LOVELY_QUOTES.length)]);
    const interval = setInterval(() => {
      setQuote(LOVELY_QUOTES[Math.floor(Math.random() * LOVELY_QUOTES.length)]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center px-4 max-w-lg mx-auto py-8">
      <p className="text-pink-400 font-serif italic text-lg leading-relaxed animate-in fade-in duration-1000 key={quote}">
        “{quote}”
      </p>
    </div>
  );
};
