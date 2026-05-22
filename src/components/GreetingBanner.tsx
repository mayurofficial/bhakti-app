'use client';

import React, { useState, useEffect } from 'react';
import { User, Edit2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function GreetingBanner() {
  const [name, setName] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  
  const { language, t } = useLanguage();

  // Load name from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedName = localStorage.getItem('suprabhat_user_name');
      if (storedName) {
        setName(storedName);
        setInputValue(storedName);
      }
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = inputValue.trim();
    if (cleanName) {
      setName(cleanName);
      localStorage.setItem('suprabhat_user_name', cleanName);
    }
    setIsEditing(false);
  };

  const welcomeMessage = language === 'hi' 
    ? `सुप्रभात, ${name ? `${name} जी` : 'श्रद्धालु जी'}!`
    : `Good Morning, ${name ? name : 'Devotee'}!`;

  return (
    <div className="w-full px-4 pt-6">
      <div className="max-w-md mx-auto bg-gradient-to-r from-saffron-light to-amber-50 rounded-2xl p-4 border border-saffron-medium/30 shadow-sm flex items-center justify-between">
        
        {isEditing ? (
          <form onSubmit={handleSave} className="flex items-center space-x-2 w-full font-sans">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t('placeholder', 'greeting')}
              className="bg-white border border-saffron rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-saffron w-full text-slate-800"
              maxLength={20}
              autoFocus
            />
            <button
              type="submit"
              className="bg-saffron text-white text-xs font-bold px-3 py-2 rounded-lg hover:bg-saffron-dark transition-colors"
            >
              {t('save', 'greeting')}
            </button>
          </form>
        ) : (
          <>
            <div className="flex items-center space-x-3">
              <span className="text-3xl filter drop-shadow-sm select-none">🌸</span>
              <div className="flex flex-col">
                <span className="text-xs text-saffron-dark font-semibold tracking-wide uppercase font-sans">
                  {t('header', 'greeting')}
                </span>
                <h2 className="font-display text-xl text-temple-maroon">
                  {welcomeMessage}
                </h2>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-saffron-dark hover:bg-saffron-light rounded-full transition-colors"
              title={t('changeName', 'greeting')}
              aria-label={t('edit', 'greeting')}
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </>
        )}

      </div>
    </div>
  );
}

