
import React, { useState } from 'react';
import { ChevronLeft, Sparkles, Palette } from 'lucide-react';
import { MOODS, DURATIONS } from '../constants';
import { Mood, Duration, PassData, Theme } from '../types';

interface DetailsFormProps {
  initialData: Partial<PassData>;
  onSubmit: (data: Partial<PassData>) => void;
  onBack: () => void;
}

const THEMES: { id: Theme; color: string }[] = [
  { id: 'Sakura', color: 'bg-pink-400' },
  { id: 'Gold', color: 'bg-amber-400' },
  { id: 'Midnight', color: 'bg-slate-800' },
  { id: 'Ocean', color: 'bg-cyan-500' },
];

export const DetailsForm: React.FC<DetailsFormProps> = ({ initialData, onSubmit, onBack }) => {
  const [senderName, setSenderName] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [duration, setDuration] = useState<Duration>('Forever');
  const [mood, setMood] = useState<Mood>('Cute');
  const [theme, setTheme] = useState<Theme>('Sakura');
  const [customMessage, setCustomMessage] = useState('');

  const isFormValid = senderName.trim() && receiverName.trim();

  return (
    <div className="max-w-2xl mx-auto py-8 px-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors font-bold"
      >
        <ChevronLeft className="w-5 h-5" />
        Back to Category
      </button>

      <h2 className="text-4xl font-black text-gray-800 mb-2 tracking-tighter">The Final Details 🪄</h2>
      <p className="text-gray-500 mb-10 font-medium">Almost there! Let's make this official for 2026.</p>

      <div className="space-y-8 glass-card p-8 rounded-[3rem] shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[11px] font-black text-gray-400 mb-2 uppercase tracking-[0.2em]">Issued By (You)</label>
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className="w-full bg-white rounded-2xl px-5 py-4 border-2 border-transparent focus:border-pink-300 outline-none transition-all shadow-sm font-semibold"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-[11px] font-black text-gray-400 mb-2 uppercase tracking-[0.2em]">Pass Holder (Them)</label>
            <input
              type="text"
              value={receiverName}
              onChange={(e) => setReceiverName(e.target.value)}
              className="w-full bg-white rounded-2xl px-5 py-4 border-2 border-transparent focus:border-pink-300 outline-none transition-all shadow-sm font-semibold"
              placeholder="Their name"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-black text-gray-400 mb-3 uppercase tracking-[0.2em]">Pass Theme</label>
          <div className="flex gap-4">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`
                  relative w-12 h-12 rounded-full transition-all flex items-center justify-center border-4
                  ${theme === t.id ? 'border-pink-300 scale-110 shadow-lg' : 'border-white hover:scale-105 shadow-sm'}
                  ${t.color}
                `}
                title={t.id}
              >
                {theme === t.id && <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>}
              </button>
            ))}
            <span className="ml-2 self-center text-sm font-bold text-gray-600 uppercase tracking-widest">{theme}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-[11px] font-black text-gray-400 mb-3 uppercase tracking-[0.2em]">Bond Validity</label>
            <div className="flex gap-2">
              {DURATIONS.map((d) => (
                <button
                  key={d}
                  onClick={() => setDuration(d as Duration)}
                  className={`
                    flex-1 py-3 px-2 rounded-xl border-2 transition-all font-bold text-xs
                    ${duration === d 
                      ? 'bg-gray-900 text-white border-gray-900 shadow-xl' 
                      : 'bg-white text-gray-500 border-gray-100 hover:border-pink-200'
                    }
                  `}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-black text-gray-400 mb-3 uppercase tracking-[0.2em]">Message Vibe</label>
            <div className="grid grid-cols-4 gap-2">
              {MOODS.map((m) => (
                <button
                  key={m.label}
                  onClick={() => setMood(m.label)}
                  className={`
                    flex flex-col items-center py-2 rounded-xl border-2 transition-all
                    ${mood === m.label 
                      ? 'bg-white border-pink-300 shadow-md ring-2 ring-pink-50' 
                      : 'bg-white/50 border-transparent hover:border-pink-100'
                    }
                  `}
                  title={m.label}
                >
                  <span className="text-xl">{m.emoji}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-black text-gray-400 mb-2 uppercase tracking-[0.2em]">Personal Note</label>
          <textarea
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            className="w-full bg-white rounded-2xl px-5 py-4 border-2 border-transparent focus:border-pink-300 outline-none transition-all shadow-sm resize-none h-24 font-medium"
            placeholder="Any specific 2026 goal or internal joke?"
          />
        </div>

        <button
          disabled={!isFormValid}
          onClick={() => onSubmit({ senderName, receiverName, duration, mood, theme, customMessage })}
          className={`
            w-full flex items-center justify-center gap-3 py-5 rounded-[2rem] font-black transition-all text-xl
            ${!isFormValid 
              ? 'bg-gray-100 text-gray-300 cursor-not-allowed' 
              : 'bg-pink-500 text-white hover:bg-pink-600 shadow-2xl shadow-pink-200 hover:scale-[1.02] active:scale-95'
            }
          `}
        >
          <Sparkles className="w-6 h-6 text-yellow-300" />
          Generate 2026 Pass
        </button>
      </div>
    </div>
  );
};
