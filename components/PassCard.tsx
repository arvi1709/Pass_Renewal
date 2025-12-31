
import React from 'react';
import { PassData, Theme } from '../types';
import { CheckCircle, Heart, Sparkles, Star, ShieldCheck } from 'lucide-react';

interface PassCardProps {
  data: PassData;
  id: string;
}

const THEME_STYLES: Record<Theme, string> = {
  Gold: 'from-amber-400 via-yellow-500 to-amber-600',
  Midnight: 'from-slate-800 via-indigo-950 to-slate-900',
  Sakura: 'from-pink-400 via-rose-500 to-pink-600',
  Ocean: 'from-cyan-400 via-blue-500 to-indigo-600',
};

const THEME_ACCENT: Record<Theme, string> = {
  Gold: 'text-amber-800',
  Midnight: 'text-indigo-200',
  Sakura: 'text-rose-100',
  Ocean: 'text-cyan-100',
};

export const PassCard: React.FC<PassCardProps> = ({ data, id }) => {
  const categoryName = data.category === 'Custom' ? data.customCategory : data.category;
  
  // High quality QR Code generator that works well with html-to-image
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=VERIFIED-BOND-2026-${encodeURIComponent(data.id)}&bgcolor=ffffff&color=000000&margin=1`;

  return (
    <div 
      id={id} 
      className={`relative w-full max-w-sm mx-auto aspect-[1/1.6] overflow-hidden rounded-[2.5rem] shadow-2xl bg-white flex flex-col group border-[8px] border-white transition-all duration-500`}
    >
      {/* Background decoration */}
      <div className={`absolute top-0 left-0 w-full h-56 bg-gradient-to-br ${THEME_STYLES[data.theme || 'Sakura']} -skew-y-12 -translate-y-16 transition-all duration-700`}></div>
      
      {/* Top Section */}
      <div className="relative pt-10 px-8 pb-4 flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30 w-fit mb-2 animate-pulse">
            <Star className="w-3 h-3 text-white fill-white" />
            <span className="text-white font-black text-[9px] uppercase tracking-[0.3em]">2026 Edition</span>
          </div>
          <h3 className={`text-white text-3xl font-black italic tracking-tighter leading-none uppercase shimmer-text`}>
            {categoryName}<br/><span className={`${THEME_ACCENT[data.theme || 'Sakura']} text-xl opacity-90`}>RENEWAL PASS</span>
          </h3>
        </div>
        <div className="bg-white/20 backdrop-blur-lg p-3 rounded-2xl border border-white/40 pulse-animation shadow-lg">
          <Heart className="w-6 h-6 text-white fill-white" />
        </div>
      </div>

      {/* Main Info */}
      <div className="flex-1 px-8 pt-8 flex flex-col relative z-10">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 mb-8">
          <div className="group-hover:translate-x-1 transition-transform">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Pass Holder</p>
            <p className="text-gray-800 font-black text-lg leading-tight truncate">{data.receiverName}</p>
          </div>
          <div className="group-hover:translate-x-1 transition-transform">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Authorized By</p>
            <p className="text-gray-800 font-black text-lg leading-tight truncate">{data.senderName}</p>
          </div>
          <div className="group-hover:translate-x-1 transition-transform">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Validity</p>
            <p className="text-rose-500 font-black text-lg leading-tight">2026 - {data.duration === 'Forever' ? '♾️' : `2027`}</p>
          </div>
          <div className="group-hover:translate-x-1 transition-transform">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Vibe Status</p>
            <p className="text-gray-800 font-black text-lg leading-tight uppercase tracking-tighter">{data.mood}</p>
          </div>
        </div>

        {/* AI Message */}
        <div className="relative mb-8 p-5 bg-gradient-to-tr from-gray-50 to-white rounded-[2rem] border border-gray-100 flex-1 shadow-inner group-hover:border-pink-200 transition-colors overflow-hidden">
          <Sparkles className="absolute -top-3 -right-3 w-8 h-8 text-amber-400 fill-amber-200 animate-bounce" />
          <div className="absolute top-0 left-0 w-full h-full shimmer-card rounded-[2rem] opacity-20 pointer-events-none"></div>
          <p className="text-gray-700 italic font-semibold leading-relaxed text-sm relative z-10">
            "{data.aiMessage}"
          </p>
        </div>

        {/* Footer */}
        <div className="mb-8 flex items-end justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-green-600 mb-2">
              <ShieldCheck className="w-5 h-5 fill-green-100" />
              <span className="text-[11px] font-black uppercase tracking-widest">Secure Renewal</span>
            </div>
            <div className="flex flex-col gap-0.5 opacity-50">
               <p className="text-[8px] text-gray-400 font-mono tracking-tighter">BOND_KEY: {data.id.slice(0, 16).toUpperCase()}</p>
               <p className="text-[8px] text-gray-400 font-mono tracking-tighter">TIMESTAMP: {new Date(data.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="relative p-1.5 bg-white rounded-xl border-2 border-gray-100 pulse-animation shadow-md group-hover:rotate-3 transition-transform">
            <img 
              src={qrUrl} 
              alt="Pass QR" 
              className="w-14 h-14"
              crossOrigin="anonymous"
            />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-16 -left-4 w-8 h-8 bg-[#ffdee9] rounded-full shadow-inner border border-white/20"></div>
      <div className="absolute bottom-16 -right-4 w-8 h-8 bg-[#b5fffc] rounded-full shadow-inner border border-white/20"></div>
      <div className="absolute bottom-20 left-10 right-10 border-t-4 border-dotted border-gray-200/40"></div>

      {/* Theme Ribbon */}
      <div className={`absolute top-0 right-8 w-10 h-16 bg-gradient-to-b ${THEME_STYLES[data.theme || 'Sakura']} rounded-b-xl shadow-lg flex items-center justify-center pt-8 border-x-2 border-white/30`}>
        <span className="text-[9px] font-black text-white rotate-90 tracking-[0.2em] whitespace-nowrap">PREMIUM</span>
      </div>
    </div>
  );
};
