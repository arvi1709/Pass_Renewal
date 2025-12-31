import React, { useState } from 'react';
import { Heart, Hand, Smile } from 'lucide-react';

const moods = [
  { mood: "Cozy", emoji: "🫶", color: "text-rose-500" },
  { mood: "Chaos", emoji: "😂", color: "text-amber-500" },
  { mood: "Missing You", emoji: "🥺", color: "text-blue-500" },
  { mood: "Soft Love", emoji: "💗", color: "text-pink-500" },
  { mood: "Silent Understanding", emoji: "🤍", color: "text-gray-500" },
];

export const EmotionalFeatures: React.FC = () => {
  const [currentMood, setCurrentMood] = useState(moods[0]);
  const [interactionMessage, setInteractionMessage] = useState('');

  const handleInteraction = (message: string) => {
    setInteractionMessage(message);
    setTimeout(() => setInteractionMessage(''), 2000);
  };

  return (
    <div className="w-full space-y-6">
      <div className="text-center p-4 rounded-xl bg-white/50 border border-white">
        <p className="font-bold text-gray-700">
          Today’s vibe between us: <span className={`transition-colors duration-500 ${currentMood.color}`}>{currentMood.emoji} {currentMood.mood}</span>
        </p>
      </div>
      <div className="flex justify-center gap-4">
        <button onClick={() => handleInteraction("Hug delivered successfully 🤗")} className="p-3 bg-white/50 rounded-full shadow-md hover:scale-110 transition-transform"><Hand className="text-amber-500" /></button>
        <button onClick={() => handleInteraction("High five received ✋")} className="p-3 bg-white/50 rounded-full shadow-md hover:scale-110 transition-transform"><Smile className="text-pink-500" /></button>
        <button onClick={() => handleInteraction("Heart sent 💗")} className="p-3 bg-white/50 rounded-full shadow-md hover:scale-110 transition-transform"><Heart className="text-rose-500" /></button>
      </div>
      {interactionMessage && <p className="text-center text-sm text-gray-600 animate-in fade-in">{interactionMessage}</p>}
    </div>
  );
};
