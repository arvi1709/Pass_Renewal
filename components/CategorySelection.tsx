
import React, { useState } from 'react';
import { CATEGORIES } from '../constants';
import { BondCategory } from '../types';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface CategorySelectionProps {
  onSelect: (category: BondCategory, custom?: string) => void;
  onBack: () => void;
}

export const CategorySelection: React.FC<CategorySelectionProps> = ({ onSelect, onBack }) => {
  const [selected, setSelected] = useState<BondCategory | null>(null);
  const [customVal, setCustomVal] = useState('');

  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
        Back
      </button>

      <h2 className="text-3xl font-bold text-gray-800 mb-2">Choose your bond ✨</h2>
      <p className="text-gray-500 mb-10">Which subscription are you renewing today?</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.label}
            onClick={() => setSelected(cat.label)}
            className={`
              flex flex-col items-center justify-center p-6 rounded-3xl border-2 transition-all group
              ${selected === cat.label 
                ? 'border-pink-400 bg-pink-50/50 shadow-md scale-[1.02]' 
                : 'border-transparent bg-white hover:bg-gray-50 hover:border-gray-200'
              }
            `}
          >
            <div className={`p-4 rounded-2xl mb-3 transition-transform group-hover:scale-110 ${cat.color}`}>
              {cat.icon}
            </div>
            <span className="font-semibold text-gray-700">{cat.label}</span>
          </button>
        ))}
      </div>

      {selected === 'Custom' && (
        <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-300">
          <label className="block text-sm font-medium text-gray-600 mb-2">Enter Custom Bond Name</label>
          <input
            type="text"
            placeholder="e.g. Partner in Crime"
            value={customVal}
            onChange={(e) => setCustomVal(e.target.value)}
            className="w-full bg-white border-2 border-gray-100 rounded-2xl px-6 py-4 focus:border-pink-300 outline-none transition-all text-lg"
          />
        </div>
      )}

      <div className="flex justify-end">
        <button
          disabled={!selected || (selected === 'Custom' && !customVal)}
          onClick={() => selected && onSelect(selected, customVal)}
          className={`
            flex items-center gap-2 px-10 py-4 rounded-full font-bold transition-all
            ${(!selected || (selected === 'Custom' && !customVal))
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-pink-500 text-white hover:bg-pink-600 shadow-lg shadow-pink-100'
            }
          `}
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
