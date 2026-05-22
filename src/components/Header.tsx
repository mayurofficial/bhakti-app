'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Header() {
  const [isRinging, setIsRinging] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const ringBell = () => {
    if (isRinging) return;
    setIsRinging(true);
    
    // Synthesize a beautiful temple bell sound in real time using Web Audio API
    if (typeof window !== 'undefined') {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          const ctx = new AudioContextClass();
          
          // Primary bell tone (D5 - sweet, clear)
          const osc1 = ctx.createOscillator();
          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(587.33, ctx.currentTime); 
          
          // Pure overtone (A5 - harmonious fifth)
          const osc2 = ctx.createOscillator();
          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(880.00, ctx.currentTime); 

          // Deep resonance (D4 - base humming)
          const osc3 = ctx.createOscillator();
          osc3.type = 'triangle';
          osc3.frequency.setValueAtTime(293.66, ctx.currentTime); 
          
          const gainNode = ctx.createGain();
          const resonanceGain = ctx.createGain();
          
          gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
          // Exponential decay for realistic bell ring decay
          gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.0);
          
          resonanceGain.gain.setValueAtTime(0.1, ctx.currentTime);
          resonanceGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 4.0);
          
          osc1.connect(gainNode);
          osc2.connect(gainNode);
          osc3.connect(resonanceGain);
          
          gainNode.connect(ctx.destination);
          resonanceGain.connect(ctx.destination);
          
          osc1.start();
          osc2.start();
          osc3.start();
          
          osc1.stop(ctx.currentTime + 3.0);
          osc2.stop(ctx.currentTime + 3.0);
          osc3.stop(ctx.currentTime + 4.0);
        }
      } catch (e) {
        console.error('AudioContext is not supported or was blocked:', e);
      }
    }

    setTimeout(() => {
      setIsRinging(false);
    }, 1000);
  };

  const brandName = language === 'hi' ? '🌸 सुप्रभात' : '🌸 Suprabhat';
  const dailyText = t('daily', 'header');

  return (
    <header className="sticky top-0 z-50 w-full bg-warm-cream/95 backdrop-blur-md border-b border-saffron-light shadow-sm">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center space-x-2 group">
          <span className="text-2xl font-display text-temple-maroon drop-shadow-sm transition-transform group-hover:scale-[1.02]">
            {brandName}
          </span>
          <span className="bg-gradient-to-r from-saffron to-saffron-dark text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm tracking-wide uppercase font-sans">
            {dailyText}
          </span>
        </Link>

        {/* Right side Actions (Bell & Language Toggle) */}
        <div className="flex items-center space-x-3">
          
          {/* Toggle Language Button Capsule - Segmented Sliding Control */}
          <div className="flex bg-saffron-light/50 p-0.5 rounded-full border border-saffron-medium/20 font-sans shadow-inner">
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wide transition-all active:scale-95 cursor-pointer ${
                language === 'hi'
                  ? 'bg-gradient-to-r from-saffron to-saffron-dark text-white shadow-sm font-semibold'
                  : 'text-saffron-dark hover:bg-saffron-light/40'
              }`}
              title="हिन्दी में बदलें"
            >
              हिन्दी
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wide transition-all active:scale-95 cursor-pointer ${
                language === 'en'
                  ? 'bg-gradient-to-r from-saffron to-saffron-dark text-white shadow-sm font-semibold'
                  : 'text-saffron-dark hover:bg-saffron-light/40'
              }`}
              title="Switch to English"
            >
              EN
            </button>
          </div>

          {/* Floating Bell Trigger */}
          <button
            onClick={ringBell}
            className="relative p-2 rounded-full hover:bg-saffron-light/50 transition-colors focus:outline-none focus:ring-2 focus:ring-saffron/40"
            aria-label={t('bellTitle', 'header')}
            title={t('bellTitle', 'header')}
          >
            <div
              className={`text-2xl cursor-pointer transition-transform origin-top select-none ${
                isRinging ? 'animate-[bounce_0.4s_infinite]' : 'animate-float'
              }`}
              style={{
                transform: isRinging ? 'rotate(25deg)' : 'none',
                filter: 'drop-shadow(0 2px 4px rgba(212,175,55,0.4))'
              }}
            >
              🔔
            </div>
            {isRinging && (
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-saffron opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-saffron"></span>
              </span>
            )}
          </button>

        </div>
      </div>
    </header>
  );
}
