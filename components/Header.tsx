
import React from 'react';
import { Heart, Moon, Sun } from 'lucide-react';

export const Header: React.FC<{ onReset: () => void }> = ({ onReset }) => {
  return (
    <header className="flex justify-between items-center py-6 px-4 md:px-8 max-w-6xl mx-auto w-full">
      <div 
        className="flex items-center gap-2 cursor-pointer group"
        onClick={onReset}
      >
        <div className="bg-white p-2 rounded-xl shadow-sm group-hover:scale-110 transition-transform">
          <Heart className="text-pink-500 fill-pink-500 w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold text-gray-800 tracking-tight">BondPortal</h1>
      </div>
      
      
    </header>
  );
};
