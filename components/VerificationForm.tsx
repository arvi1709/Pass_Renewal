
import React, { useState } from 'react';
import { ShieldCheck, ChevronRight, ChevronLeft, HeartCrack } from 'lucide-react';

interface VerificationFormProps {
  onSuccess: () => void;
  onBack: () => void;
}

export const VerificationForm: React.FC<VerificationFormProps> = ({ onSuccess, onBack }) => {
  const [step, setStep] = useState(1);
  const [ans1, setAns1] = useState('');
  const [ans2, setAns2] = useState('');
  const [failed, setFailed] = useState(false);

  const check1 = () => {
    if (ans1.trim().toLowerCase() === 'jalpari') {
      setStep(2);
    } else {
      setFailed(true);
    }
  };

  const check2 = () => {
    const validWords = ['baby', 'babyyy', 'babyyyy'];
    if (validWords.includes(ans2.trim().toLowerCase())) {
      onSuccess();
    } else {
      setFailed(true);
    }
  };

  if (failed) {
    return (
      <div className="max-w-md mx-auto text-center py-12 px-6 animate-in fade-in duration-500">
        <HeartCrack className="w-16 h-16 text-rose-400 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Verification Failed 💔</h2>
        <p className="text-gray-600 mb-8 leading-relaxed italic">
          “This pass isn’t meant for you… but someone out there is.”
        </p>
        <button 
          onClick={onBack}
          className="bg-gray-800 text-white px-8 py-3 rounded-full font-bold hover:bg-black transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-12 px-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white/70 backdrop-blur-md p-8 rounded-[2.5rem] border border-white shadow-xl text-center">
        <div className="bg-pink-100 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="w-8 h-8 text-pink-500" />
        </div>
        
        <h2 className="text-2xl font-black text-gray-800 mb-2 uppercase tracking-tight">Access Check</h2>
        <p className="text-gray-500 mb-8 text-sm">Only the right person can unlock this special 2026 pass.</p>

        {step === 1 ? (
          <div className="space-y-6">
            <label className="block text-sm font-bold text-gray-600 uppercase tracking-wider">
              Question 1/2
            </label>
            <p className="text-lg font-semibold text-gray-700">“What’s the nickname only you call me?”</p>
            <input 
              autoFocus
              type="text"
              value={ans1}
              onChange={(e) => setAns1(e.target.value)}
              className="w-full bg-white rounded-2xl px-6 py-4 border-2 border-transparent focus:border-pink-300 outline-none transition-all shadow-inner text-center text-lg"
              placeholder="Your answer..."
              onKeyDown={(e) => e.key === 'Enter' && check1()}
            />
            <button 
              onClick={check1}
              className="w-full flex items-center justify-center gap-2 bg-pink-500 text-white py-4 rounded-2xl font-bold shadow-lg shadow-pink-100 hover:bg-pink-600 transition-all"
            >
              Verify Identity <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <label className="block text-sm font-bold text-gray-600 uppercase tracking-wider">
              Question 2/2
            </label>
            <p className="text-lg font-semibold text-gray-700">“What word I say a lot?”</p>
            <input 
              autoFocus
              type="text"
              value={ans2}
              onChange={(e) => setAns2(e.target.value)}
              className="w-full bg-white rounded-2xl px-6 py-4 border-2 border-transparent focus:border-pink-300 outline-none transition-all shadow-inner text-center text-lg"
              placeholder="Your answer..."
              onKeyDown={(e) => e.key === 'Enter' && check2()}
            />
            <button 
              onClick={check2}
              className="w-full flex items-center justify-center gap-2 bg-pink-500 text-white py-4 rounded-2xl font-bold shadow-lg shadow-pink-100 hover:bg-pink-600 transition-all"
            >
              Unlock Memory <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
      
      <button 
        onClick={onBack}
        className="mt-6 flex items-center gap-2 text-gray-400 hover:text-gray-600 mx-auto transition-colors text-sm font-bold"
      >
        <ChevronLeft className="w-4 h-4" /> Cancel Verification
      </button>
    </div>
  );
};
