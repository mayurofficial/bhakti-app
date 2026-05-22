'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

export type Language = 'hi' | 'en';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, section: string) => string;
}

const translations: Record<Language, Record<string, Record<string, string>>> = {
  hi: {
    app: {
      title: 'सुप्रभात',
      tagline: 'दैनिक आशीर्वाद संदेश',
      dailyBlessings: 'दैनिक आशीर्वाद',
    },
    header: {
      bellTitle: 'मंदिर की घंटी बजाएं',
      daily: 'दैनिक',
    },
    footer: {
      chant: '॥ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ॥',
      chantDesc: 'सभी सुखी रहें, सभी निरोगी रहें - यही हमारा संकल्प है।',
      popularCategories: 'लोकप्रिय श्रेणियां',
      upcomingFestivals: 'आगामी पर्व / त्योहार',
      copyright: 'सुप्रभात ऐप। सर्वाधिकार सुरक्षित।',
      madeWith: 'बनाया गया है अत्यंत श्रद्धा और प्रेम के साथ 🧡',
    },
    categories: {
      title: '🌸 आज के मुख्य संदेश',
      subtitle: 'श्रेणियां चुनें',
      goodMorning: 'सुप्रभात',
      goodNight: 'शुभ रात्रि',
      devotional: 'भक्ति संदेश',
      suvichar: 'दैनिक सुविचार',
      viewAll: 'देखें संदेश →',
    },
    greeting: {
      header: 'आज का अभिवादन',
      guest: 'श्रद्धालु',
      changeName: 'नाम बदलें',
      edit: 'नाम संपादित करें',
      placeholder: 'अपना नाम लिखें...',
      save: 'सहेजें',
    },
    dailyCard: {
      header: '✨ आज का पावन विचार ✨',
      title: '🚩 शुभ प्रभात',
      share: 'व्हाट्सएप पर शेयर करें (Share)',
      copy: 'संदेश कॉपी करें',
      copied: 'कॉपी हो गया!',
      personalize: 'अपना नाम लिखें',
    },
    panchang: {
      title: 'दैनिक पंचांग व राशिफल',
      panchangHeader: 'आज का पंचांग',
      horoscopeHeader: '🔮 अपना दैनिक राशिफल देखें',
      horoscopeSub: 'आज का भविष्यफल',
      horoscopeTitle: 'का राशिफल:',
    },
    generate: {
      title: '✨ खुद का सुंदर बधाई कार्ड बनाएं',
      nameLabel: 'आपका नाम लिखें (जैसे: रमेश, शर्मा परिवार)',
      namePlaceholder: 'कार्ड पर दिखने वाला नाम...',
      festivalLabel: 'बधाई का अवसर (Occasion)',
      messageLabel: 'शुभकामना संदेश संपादित करें',
      previewHeader: 'कार्ड प्रीव्यू (Real-time Preview)',
      cardHeader: '✨ शुभ संदेश ✨',
      giftFrom: 'सप्रेम भेंट',
      downloadBtn: 'बधाई कार्ड डाउनलोड करें (PNG)',
      downloading: 'तैयार किया जा रहा है...',
      shareBtn: 'व्हाट्सएप पर बधाई भेजें (Share)',
      backBtn: 'मुख्य पृष्ठ',
      cardMaker: 'कार्ड मेकर',
    }
  },
  en: {
    app: {
      title: 'Suprabhat',
      tagline: 'Daily Blessings & Wishes',
      dailyBlessings: 'Daily Blessings',
    },
    header: {
      bellTitle: 'Ring Temple Bell',
      daily: 'DAILY',
    },
    footer: {
      chant: '|| Sarve Bhavantu Sukhinah Sarve Santu Niramayah ||',
      chantDesc: 'May all be happy, may all be healthy and free from illness.',
      popularCategories: 'Popular Categories',
      upcomingFestivals: 'Upcoming Festivals',
      copyright: 'Suprabhat App. All Rights Reserved.',
      madeWith: 'Made with absolute devotion and love 🧡',
    },
    categories: {
      title: '🌸 Today\'s Key Messages',
      subtitle: 'Select Category',
      goodMorning: 'Good Morning',
      goodNight: 'Good Night',
      devotional: 'Devotional',
      suvichar: 'Daily Quotes',
      viewAll: 'View Wishes →',
    },
    greeting: {
      header: 'Today\'s Greeting',
      guest: 'Devotee',
      changeName: 'Change Name',
      edit: 'Edit Name',
      placeholder: 'Enter your name...',
      save: 'Save',
    },
    dailyCard: {
      header: '✨ Sacred Thought of the Day ✨',
      title: '🚩 Shubh Prabhat',
      share: 'Share on WhatsApp',
      copy: 'Copy Message',
      copied: 'Copied!',
      personalize: 'Add Your Name',
    },
    panchang: {
      title: 'Daily Panchang & Horoscope',
      panchangHeader: 'Today\'s Panchang',
      horoscopeHeader: '🔮 View Your Daily Horoscope',
      horoscopeSub: 'Today\'s Forecast',
      horoscopeTitle: 'Horoscope:',
    },
    generate: {
      title: '✨ Create Your Custom Card',
      nameLabel: 'Enter Your Name (e.g. Ramesh, Sharma Family)',
      namePlaceholder: 'Name on the card...',
      festivalLabel: 'Select Occasion / Festival',
      messageLabel: 'Edit Blessing / Message Text',
      previewHeader: 'Real-time Card Preview',
      cardHeader: '✨ Sacred Greetings ✨',
      giftFrom: 'Warm Regards',
      downloadBtn: 'Download Greeting Card (PNG)',
      downloading: 'Generating Card...',
      shareBtn: 'Send Blessings on WhatsApp',
      backBtn: 'Home',
      cardMaker: 'Card Maker',
    }
  }
};

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('hi');

  // Load language preference from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('suprabhat_lang') as Language;
      if (stored === 'hi' || stored === 'en') {
        setLanguageState(stored);
      }
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('suprabhat_lang', lang);
      // Toggle HTML element lang attribute for perfect SEO/accessibility
      document.documentElement.lang = lang;
    }
  }, []);

  const t = useCallback((key: string, section: string): string => {
    return translations[language]?.[section]?.[key] || key;
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
