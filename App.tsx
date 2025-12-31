import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { CategorySelection } from './components/CategorySelection';
import { DetailsForm } from './components/DetailsForm';
import { VerificationForm } from './components/VerificationForm';
import { PassCard } from './components/PassCard';
import { QuoteGenerator } from './components/QuoteGenerator';
import { AppState, BondCategory, PassData } from './types';
import { generatePersonalizedMessage } from './services/gemini';
import { Download, Share2, RefreshCw, Heart, PartyPopper, History, ChevronLeft, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import * as htmlToImage from 'html-to-image';
import { TimeBasedMessage } from './components/TimeBasedMessage';
import { EmotionalFeatures } from './components/EmotionalFeatures';


const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    step: 'landing',
    data: {},
    history: [],
  });
  const [theme, setTheme] = useState('Sakura');
  const passRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('bond_passes_2026_v2');
    if (saved) {
      try {
        setState(prev => ({ ...prev, history: JSON.parse(saved) }));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const handleStart = () => setState(prev => ({ ...prev, step: 'category' }));

  const handleCategorySelect = (category: BondCategory, custom?: string) => {
    if (category === 'Love') {
      setState(prev => ({
        ...prev,
        step: 'verification',
        data: { ...prev.data, category, customCategory: custom }
      }));
    } else {
      setState(prev => ({
        ...prev,
        step: 'details',
        data: { ...prev.data, category, customCategory: custom }
      }));
    }
  };

  const handleVerificationSuccess = () => {
    setState(prev => ({ ...prev, step: 'details' }));
  };

  const handleFormSubmit = async (formData: Partial<PassData>) => {
    setState(prev => ({ ...prev, step: 'generating', data: { ...prev.data, ...formData } }));
    
    const aiMessage = await generatePersonalizedMessage({ ...state.data, ...formData });
    
    const finalPass: PassData = {
      id: crypto.randomUUID(),
      category: state.data.category!,
      customCategory: state.data.customCategory,
      senderName: formData.senderName!,
      receiverName: formData.receiverName!,
      duration: formData.duration!,
      mood: formData.mood!,
      theme: formData.theme || 'Sakura',
      customMessage: formData.customMessage,
      aiMessage,
      createdAt: Date.now(),
    };

    const newHistory = [finalPass, ...state.history].slice(0, 15);
    localStorage.setItem('bond_passes_2026_v2', JSON.stringify(newHistory));

    setTimeout(() => {
      setState(prev => ({ 
        ...prev, 
        step: 'result', 
        data: finalPass, 
        history: newHistory 
      }));
      confetti({
        particleCount: 150,
        spread: 120,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#ec4899', '#fbbf24', '#2dd4bf', '#818cf8']
      });
    }, 2800);
  };

  const handleDownload = async () => {
    if (passRef.current === null) return;
    setDownloading(true);
    
    try {
      // Use toPng with options that skip fonts if they fail, but usually with crossorigin fix it works.
      const dataUrl = await htmlToImage.toPng(passRef.current, { 
        cacheBust: true,
        pixelRatio: 3, // Higher quality
        backgroundColor: '#ffffff',
        // In case of stubborn CSS rules errors, we can use filter to ignore external sheets
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left'
        }
      });
      const link = document.createElement('a');
      link.download = `BondRenewal-2026-${state.data.receiverName}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Capture failed', err);
      alert('We hit a minor security snag while capturing the image. 🔒 Please take a screenshot for now – it works perfectly! 📸');
    } finally {
      setDownloading(false);
    }
  };

  const handleReset = () => {
    setState(prev => ({ ...prev, step: 'landing', data: {} }));
  };

  const deleteHistoryItem = (id: string) => {
    const newHistory = state.history.filter(p => p.id !== id);
    setState(prev => ({ ...prev, history: newHistory }));
    localStorage.setItem('bond_passes_2026_v2', JSON.stringify(newHistory));
  };

  const shareViaWhatsApp = () => {
    const data = state.data as PassData;
    const cat = data.category === 'Custom' ? data.customCategory : data.category;
    const text = `🎆 *2026 BOND RENEWAL* 🎆\n\nHey ${data.receiverName}! 💌 I just renewed our ${cat} bond for the new year!\n\nOfficial Certificate: "${data.aiMessage}"\n\nGenerated via BondPortal 2026 🥂`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <Header onReset={handleReset} />
      

      <main className="flex-1 flex flex-col items-center justify-center py-8 px-4 relative z-10">
        {state.step === 'landing' && (
          <div className="flex flex-col items-center">
            <LandingPage onStart={handleStart} />
            {state.history.length > 0 && (
              <button 
                onClick={() => setState(prev => ({ ...prev, step: 'history' }))}
                className="mt-8 flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-all font-bold group"
              >
                <History className="w-5 h-5 group-hover:rotate-[-10deg]" />
                View Past Renewals
              </button>
            )}
          </div>
        )}

        {state.step === 'history' && (
          <div className="w-full max-w-4xl py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <button 
              onClick={handleReset}
              className="mb-8 flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-bold"
            >
              <ChevronLeft className="w-5 h-5" /> Back Home
            </button>
            <h2 className="text-4xl font-black text-gray-800 mb-8 tracking-tighter">Bond Archives 🏛️</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {state.history.map(pass => (
                <div key={pass.id} className="relative group cursor-pointer" onClick={() => setState(prev => ({ ...prev, step: 'result', data: pass }))}>
                  <div className="scale-[0.6] origin-top transform transition-transform group-hover:scale-[0.62]">
                    <PassCard data={pass} id={`hist-${pass.id}`} />
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); deleteHistoryItem(pass.id); }}
                    className="absolute top-2 right-2 bg-white/80 p-2 rounded-full text-red-400 hover:text-red-600 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="mt-[-100px] text-center">
                    <p className="font-black text-gray-700">{pass.receiverName}</p>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">{pass.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {state.step === 'category' && (
          <CategorySelection onSelect={handleCategorySelect} onBack={handleReset} />
        )}

        {state.step === 'verification' && (
          <VerificationForm 
            onSuccess={handleVerificationSuccess}
            onBack={() => setState(prev => ({ ...prev, step: 'category' }))}
          />
        )}

        {state.step === 'details' && (
          <DetailsForm 
            initialData={state.data}
            onBack={() => setState(prev => ({ ...prev, step: 'category' }))}
            onSubmit={handleFormSubmit}
          />
        )}

        {state.step === 'generating' && (
          <div className="flex flex-col items-center justify-center space-y-8 p-12 text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-pink-400 blur-[40px] opacity-30 animate-pulse"></div>
              <div className="relative bg-white p-10 rounded-[2.5rem] shadow-2xl pulse-animation">
                 <Heart className="w-20 h-20 text-pink-500 fill-pink-500 animate-bounce" />
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-4xl font-black text-gray-800 tracking-tighter">SEALING THE VIBES...</h3>
              <p className="text-gray-500 font-bold max-w-xs mx-auto">AI is encrypting your 2026 bond certificate with pure love. ✨</p>
            </div>
          </div>
        )}

        {state.step === 'result' && state.data.id && (
          <div className="w-full max-w-5xl mx-auto px-6 py-4 animate-in fade-in zoom-in duration-700">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="w-full lg:w-1/2 flex justify-center">
                <div ref={passRef} className="shadow-2xl rounded-[2.5rem]">
                  <PassCard data={state.data as PassData} id="pass-to-download" />
                </div>
              </div>
              
              <div className="w-full lg:w-1/2 flex flex-col space-y-8">
                <TimeBasedMessage />
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-pink-500">
                    <PartyPopper className="w-6 h-6 animate-tada" />
                    <span className="font-black uppercase tracking-[0.3em] text-xs">Official Certification</span>
                  </div>
                  <h2 className="text-5xl font-black text-gray-800 tracking-tighter leading-none">
                    Certified for <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-amber-500 italic">2026!</span> 🥂
                  </h2>
                  <p className="text-gray-500 leading-relaxed text-lg font-medium">
                    This bond renewal has been officially issued for {state.data.receiverName}. Share the vibes to finalize the contract!
                  </p>
                </div>

                <EmotionalFeatures />

                <div className="grid grid-cols-1 gap-4">
                  <button 
                    onClick={shareViaWhatsApp}
                    className="flex items-center justify-center gap-4 bg-[#25D366] text-white p-5 rounded-[2rem] font-black hover:bg-green-600 transition-all shadow-xl shadow-green-100 hover:scale-[1.02] active:scale-95 text-lg"
                  >
                    <Share2 className="w-6 h-6" />
                    Share on WhatsApp
                  </button>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={handleDownload}
                      disabled={downloading}
                      className="flex items-center justify-center gap-3 bg-white text-gray-800 p-5 rounded-[2rem] font-black border-2 border-gray-100 hover:border-pink-300 transition-all hover:bg-pink-50 shadow-sm disabled:opacity-50"
                    >
                      <Download className={`w-5 h-5 text-pink-500 ${downloading ? 'animate-bounce' : ''}`} />
                      {downloading ? 'Saving...' : 'Save HQ'}
                    </button>
                    <button 
                      onClick={handleReset}
                      className="flex items-center justify-center gap-3 bg-gray-900 text-white p-5 rounded-[2rem] font-black hover:bg-black transition-all shadow-xl active:scale-95"
                    >
                      <RefreshCw className="w-5 h-5 text-amber-400" />
                      New Pass
                    </button>
                  </div>
                </div>

                <div className="pt-8 border-t-2 border-dashed border-gray-200">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.4em] mb-4">Daily Manifestation</p>
                  <div className="bg-white/40 backdrop-blur-sm p-6 rounded-[2rem] border border-white">
                    <QuoteGenerator />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="py-8 bg-transparent relative z-10">
        <div className="text-center opacity-30 hover:opacity-100 transition-opacity">
          <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.5em]">BondPortal 2026 • Encrypted & Verified Bond System</p>
          <p className="text-xs mt-2">Some moments don’t need explanations.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
