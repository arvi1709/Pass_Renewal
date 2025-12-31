
import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-6">
      <div className="relative mb-8 float-animation">
        <div className="absolute -inset-4 bg-pink-200/50 blur-2xl rounded-full"></div>
        <div className="relative bg-white p-8 rounded-[2rem] shadow-xl border border-pink-50">
           <span className="text-6xl">💌</span>
        </div>
      </div>
      
      <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4 tracking-tight">
        Renew Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400">Bond</span> 💖
      </h1>
      
      <p className="text-lg md:text-xl text-gray-600 max-w-md mb-10 leading-relaxed">
        Select the bond, renew the vibes, and share the love with a personalized digital pass.
      </p>
      
      <button
        onClick={onStart}
        className="group relative flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-black transition-all hover:scale-105 active:scale-95 shadow-lg shadow-gray-200"
      >
        <Sparkles className="w-5 h-5 text-yellow-400 group-hover:rotate-12 transition-transform" />
        Start Renewal
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>

      <div className="mt-16 flex gap-4 text-sm text-gray-400 font-medium uppercase tracking-widest">
        <span>✨ Fun</span>
        <span>•</span>
        <span>❤️ Heartfelt</span>
        <span>•</span>
        <span>👯‍♂️ Personal</span>
      </div>
    </div>
  );
};
