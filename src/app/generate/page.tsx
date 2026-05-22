'use client';

import React, { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, Download, Share2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

interface FestivalOption {
  id: string;
  name: string;
  emoji: string;
  defaultMessage: string;
  bgGradient: string; // Tailwind gradient classes
  canvasBg: string[]; // Start & end hex values for canvas render
}

const festivalOptions: FestivalOption[] = [
  {
    id: 'good-morning',
    name: 'सुप्रभात (Good Morning)',
    emoji: '🌅',
    defaultMessage: '🌸 सुप्रभात! ईश्वर का आशीर्वाद आपके जीवन में सदैव बना रहे। आपका दिन मंगलमय और आनंदमयी हो! 🙏',
    bgGradient: 'from-orange-500 to-amber-400',
    canvasBg: ['#FF512F', '#F09819'],
  },
  {
    id: 'diwali',
    name: 'दीपावली (Diwali)',
    emoji: '🪔',
    defaultMessage: '✨ दीपावली के पावन पर्व पर आपके जीवन में सुख, समृद्धि और आरोग्य का वास हो। शुभ दीपावली! 🪔',
    bgGradient: 'from-amber-600 to-red-600',
    canvasBg: ['#cb356b', '#bd3f32'],
  },
  {
    id: 'holi',
    name: 'होली (Holi)',
    emoji: '🎨',
    defaultMessage: '🎨 रंग, उमंग और खुशियों के त्योहार होली की आपको और आपके पूरे परिवार को हार्दिक शुभकामनाएं! 🌸',
    bgGradient: 'from-pink-500 via-purple-500 to-indigo-500',
    canvasBg: ['#ec008c', '#fc6767'],
  },
  {
    id: 'mahashivratri',
    name: 'महाशिवरात्रि (Shivratri)',
    emoji: '🔱',
    defaultMessage: '🔱 ॐ नमः शिवाय! महाशिवरात्रि के पावन पर्व पर भोलेनाथ की कृपा आप पर सदैव बनी रहे। हर हर महादेव! 🌸',
    bgGradient: 'from-slate-800 to-slate-900',
    canvasBg: ['#0f2027', '#203a43'],
  },
];

export default function GeneratePage() {
  const [name, setName] = useState('');
  const [selectedFestival, setSelectedFestival] = useState<FestivalOption>(festivalOptions[0]);
  const [customMessage, setCustomMessage] = useState(festivalOptions[0].defaultMessage);
  const [tone, setTone] = useState('spiritual'); // spiritual, traditional
  const [isDownloading, setIsDownloading] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { language, t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Dynamically translate festival option properties
  const getTranslatedFestival = (fest: FestivalOption): FestivalOption => {
    if (language === 'hi') return fest;
    
    let name = fest.name;
    let defaultMessage = fest.defaultMessage;
    
    if (fest.id === 'good-morning') {
      name = 'Good Morning 🌅';
      defaultMessage = '🌸 Good Morning! May the divine blessings of God be with you always. May your day be filled with peace, joy, and prosperity! 🙏';
    } else if (fest.id === 'diwali') {
      name = 'Diwali wishes 🪔';
      defaultMessage = '✨ May your life be filled with happiness, prosperity, and good health on the auspicious occasion of Diwali. Happy Diwali! 🪔';
    } else if (fest.id === 'holi') {
      name = 'Holi wishes 🎨';
      defaultMessage = '🎨 Wishing you and your family a very happy and colorful Holi filled with joy and sweetness! 🌸';
    } else if (fest.id === 'mahashivratri') {
      name = 'Maha Shivaratri 🔱';
      defaultMessage = '🔱 Om Namah Shivaya! May the blessings of Lord Shiva be with you always on this sacred Maha Shivaratri. Har Har Mahadev! 🌸';
    }
    
    return { ...fest, name, defaultMessage };
  };

  const currentFestivalOptions = festivalOptions.map(getTranslatedFestival);
  const activeFestival = currentFestivalOptions.find(f => f.id === selectedFestival.id) || selectedFestival;

  // Sync default message when festival changes
  const handleFestivalChange = (festId: string) => {
    const option = currentFestivalOptions.find(f => f.id === festId);
    if (option) {
      const baseOption = festivalOptions.find(f => f.id === festId);
      if (baseOption) setSelectedFestival(baseOption);
      setCustomMessage(option.defaultMessage);
    }
  };

  // Smart toggle default message when active language switches
  useEffect(() => {
    if (!mounted) return;
    
    const currentFestId = selectedFestival.id;
    const baseOption = festivalOptions.find(f => f.id === currentFestId);
    if (!baseOption) return;
    
    const hiMsg = baseOption.defaultMessage;
    const enMsg = currentFestId === 'good-morning'
      ? '🌸 Good Morning! May the divine blessings of God be with you always. May your day be filled with peace, joy, and prosperity! 🙏'
      : currentFestId === 'diwali'
      ? '✨ May your life be filled with happiness, prosperity, and good health on the auspicious occasion of Diwali. Happy Diwali! 🪔'
      : currentFestId === 'holi'
      ? '🎨 Wishing you and your family a very happy and colorful Holi filled with joy and sweetness! 🌸'
      : currentFestId === 'mahashivratri'
      ? '🔱 Om Namah Shivaya! May the blessings of Lord Shiva be with you always on this sacred Maha Shivaratri. Har Har Mahadev! 🌸'
      : '';
      
    if (language === 'hi' && customMessage === enMsg) {
      setCustomMessage(hiMsg);
    } else if (language === 'en' && customMessage === hiMsg) {
      setCustomMessage(enMsg);
    }
  }, [language, mounted, selectedFestival]);

  // Client-Side Canvas Exporter Engine
  const drawAndDownloadImage = () => {
    setIsDownloading(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high-res canvas dimensions for crisp mobile sharing
    canvas.width = 800;
    canvas.height = 1000;

    // 1. Draw Background Gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, activeFestival.canvasBg[0]);
    gradient.addColorStop(1, activeFestival.canvasBg[1]);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Draw Subtle Radial Highlight
    const radial = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 3, 50,
      canvas.width / 2, canvas.height / 3, 400
    );
    radial.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
    radial.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 3. Draw Traditional Marigold Border Frame
    ctx.strokeStyle = '#d4af37'; // gold color
    ctx.lineWidth = 12;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    ctx.strokeStyle = '#ffffff'; // inner white line
    ctx.lineWidth = 3;
    ctx.strokeRect(32, 32, canvas.width - 64, canvas.height - 64);

    // 4. Draw Devotional Symbol (Header Emoji / Text)
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Draw Spiritual Header
    ctx.font = 'bold 36px Arial, Helvetica, sans-serif';
    ctx.fillText(t('cardHeader', 'generate'), canvas.width / 2, 90);

    // Draw Main Emoji Icon
    ctx.font = '80px Arial, Helvetica, sans-serif';
    ctx.fillText(activeFestival.emoji, canvas.width / 2, 220);

    // 5. Draw the Main Quote/Message Text (Multi-line wrap support)
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 40px sans-serif';
    
    const text = customMessage;
    const words = text.split('');
    let line = '';
    const lines: string[] = [];
    const maxWidth = canvas.width - 120;
    const lineHeight = 58;
    
    // Simple character wrap helper for Hindi
    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n];
      let metrics = ctx.measureText(testLine);
      let testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        lines.push(line);
        line = words[n];
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    // Render lines in the middle
    let startY = 480 - (lines.length * lineHeight) / 2;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 4;

    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], canvas.width / 2, startY + i * lineHeight);
    }
    ctx.shadowColor = 'transparent'; // reset shadow

    // 6. Draw "Created By" personalized sender name footer
    const senderSuffix = language === 'hi' ? ' जी' : '';
    const defaultSender = language === 'hi' ? 'श्रद्धालु परिवार' : 'Devotee Family';
    const senderName = name.trim() ? `${name}${senderSuffix}` : defaultSender;
    
    // Draw golden banner block
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.roundRect(100, canvas.height - 180, canvas.width - 200, 90, 20);
    ctx.fill();

    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#fffde7';
    ctx.font = 'italic bold 32px sans-serif';
    
    const giftLabel = t('giftFrom', 'generate');
    ctx.fillText(`${giftLabel}: ${senderName} 📿`, canvas.width / 2, canvas.height - 135);

    // 7. Trigger Direct File Download
    try {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `suprabhat-card-${activeFestival.id}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Canvas export failed:', err);
    }

    setIsDownloading(false);
  };

  const getWhatsAppShareLink = () => {
    const sender = name.trim() ? `${name}${language === 'hi' ? ' जी' : ''}` : (language === 'hi' ? 'श्रद्धालु' : 'Devotee');
    const origin = mounted && typeof window !== 'undefined' ? window.location.origin : 'https://suprabhat.app';
    
    const occasionText = language === 'hi' 
      ? `*${activeFestival.name} बधाई*`
      : `*${activeFestival.name} Wishes*`;
    const signatureText = language === 'hi'
      ? `सप्रेम भेंट: ${sender}`
      : `Warm Regards: ${sender}`;
    const promoText = language === 'hi'
      ? `आप भी अपने नाम का विशेष कार्ड बनाएं:`
      : `Create your own custom greeting card here:`;
      
    const text = `🌸 ${occasionText} 🌸\n\n"${customMessage}"\n\n🧡 *${signatureText}* 🙏\n\n👇 *${promoText}* 👇\n${origin}/generate`;
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-warm-beige">
      <Header />

      <main className="flex-1 w-full max-w-md mx-auto bg-white shadow-md border-x border-saffron-light/20 flex flex-col pb-8">
        
        {/* Navigation Back Header */}
        <div className="px-4 pt-5 pb-3 flex items-center justify-between border-b border-slate-100">
          <Link href="/" className="flex items-center text-slate-600 hover:text-saffron transition-colors text-sm font-semibold font-sans">
            <ArrowLeft className="w-4 h-4 mr-1" />
            {t('backBtn', 'generate')}
          </Link>
          <span className="text-xs bg-saffron-light text-saffron-dark font-bold px-2 py-0.5 rounded-full font-sans animate-pulse">
            {t('cardMaker', 'generate')} (V1)
          </span>
        </div>

        {/* 1. Interactive Customizer Form */}
        <div className="p-4 space-y-4">
          <h2 className="font-display text-xl text-temple-maroon">
            {t('title', 'generate')}
          </h2>

          <div className="space-y-3 font-sans">
            
            {/* Input Name */}
            <div className="flex flex-col">
              <label htmlFor="user-name" className="text-xs font-semibold text-slate-600 mb-1.5">
                {t('nameLabel', 'generate')}
              </label>
              <input
                id="user-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('namePlaceholder', 'generate')}
                className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-saffron text-slate-800 font-medium"
                maxLength={24}
              />
            </div>

            {/* Select Festival Theme */}
            <div className="flex flex-col">
              <label htmlFor="festival-select" className="text-xs font-semibold text-slate-600 mb-1.5">
                {t('festivalLabel', 'generate')}
              </label>
              <select
                id="festival-select"
                value={activeFestival.id}
                onChange={(e) => handleFestivalChange(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-saffron text-slate-800 font-medium"
              >
                {currentFestivalOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.emoji} {option.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Message input */}
            <div className="flex flex-col">
              <label htmlFor="custom-message" className="text-xs font-semibold text-slate-600 mb-1.5">
                {t('messageLabel', 'generate')}
              </label>
              <textarea
                id="custom-message"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-saffron text-slate-800 font-medium h-20 resize-none leading-relaxed"
                maxLength={150}
              />
            </div>

          </div>
        </div>

        {/* 2. Interactive Real-Time Preview Card */}
        <div className="px-4 py-2">
          <h3 className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider font-sans text-center">
            {t('previewHeader', 'generate')}
          </h3>

          {/* Render Styled Preview matching Canvas output */}
          <div className={`marigold-border bg-gradient-to-b ${activeFestival.bgGradient} rounded-2xl p-6 min-h-[350px] flex flex-col justify-between text-center text-white relative shadow-lg overflow-hidden`}>
            
            {/* Subtle Sunrays Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent pointer-events-none"></div>

            <span className="z-10 text-[10px] uppercase font-bold tracking-widest text-white/80 font-sans">
              {t('cardHeader', 'generate')}
            </span>

            <div className="z-10 flex flex-col items-center justify-center my-6">
              <span className="text-5xl filter drop-shadow mb-4 select-none animate-float">
                {activeFestival.emoji}
              </span>
              <p className="font-display text-lg leading-relaxed font-bold px-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                {customMessage}
              </p>
            </div>

            <div className="z-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl py-2 px-4 inline-block max-w-[90%] mx-auto shadow-inner">
              <span className="font-semibold text-yellow-100 text-xs italic">
                {t('giftFrom', 'generate')}: {name.trim() ? `${name}${language === 'hi' ? ' जी' : ''}` : (language === 'hi' ? 'शर्मा परिवार' : 'Sharma Family')} 📿
              </span>
            </div>
          </div>
        </div>

        {/* Hidden Canvas used purely for high-res offline background exporting */}
        <canvas ref={canvasRef} className="hidden" />

        {/* 3. Export Buttons Action Area */}
        <div className="p-4 space-y-3 font-sans">
          
          {/* Download Image Exporter */}
          <button
            onClick={drawAndDownloadImage}
            disabled={isDownloading}
            className="w-full bg-saffron hover:bg-saffron-dark text-white py-3 px-4 rounded-xl flex items-center justify-center font-bold text-base shadow-md transition-all active:scale-95 disabled:opacity-75 focus:outline-none focus:ring-2 focus:ring-saffron/40 cursor-pointer"
          >
            <Download className="w-5 h-5 mr-2 animate-bounce" />
            {isDownloading ? t('downloading', 'generate') : t('downloadBtn', 'generate')}
          </button>

          {/* WhatsApp Direct Prefilled Share */}
          <a
            href={getWhatsAppShareLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3 px-4 rounded-xl flex items-center justify-center font-bold text-base shadow-md transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#25D366]/40"
          >
            <span className="text-xl mr-2">💚</span>
            {t('shareBtn', 'generate')}
          </a>

        </div>

      </main>

      <Footer />
    </div>
  );
}
