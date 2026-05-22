'use client';

import React, { useState, useEffect } from 'react';
import { Share2, Copy, Sparkles, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface DailyMessageCardProps {
  messageText?: string;
  authorName?: string;
  bgType?: string;
}

export default function DailyMessageCard({
  messageText = '🌸 सुप्रभात! ईश्वर का आशीर्वाद आपके जीवन में सदैव बना रहे। आपका आज का दिन अत्यंत मंगलमय और आनंदमयी हो! जय श्री राम! 🙏',
  authorName = 'सुप्रभात संदेश',
  bgType = 'sunrise'
}: DailyMessageCardProps) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { language, t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(finalMessageText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  // Smart English dynamic translator for our seed database messages
  let finalMessageText = messageText;
  if (language === 'en') {
    if (messageText.includes('ईश्वर का आशीर्वाद आपके जीवन')) {
      finalMessageText = '🌸 Good Morning! May the divine blessings of God be with you always. May your day be filled with peace, joy, and prosperity! 🙏';
    } else if (messageText.includes('उगता हुआ सूरज आपके जीवन')) {
      finalMessageText = '🌅 Good Morning! May the rising sun bring new light, new hope, and abundance into your life. Jai Shree Krishna! Radhe Radhe! 🌸';
    } else if (messageText.includes('हर सुबह एक नया अवसर है')) {
      finalMessageText = '📿 Good Morning! Every morning is a fresh opportunity. Thank the Lord and start your day with absolute positivity. Jai Shree Ram! 🙏';
    } else if (messageText.includes('प्रभु श्री राम की असीम कृपा से')) {
      finalMessageText = '🌸 Good Morning! By the infinite grace of Lord Shri Ram, may your day be extremely auspicious, happy, and filled with divine peace! Jai Shree Ram! 🙏';
    } else if (messageText.includes('श्री कृष्ण का आशीर्वाद आपके')) {
      finalMessageText = '🌅 Good Morning! May the blessings of Lord Krishna dissolve all obstacles from your life. Start a wonderful, energetic day! Radhe Radhe! 🌸';
    } else if (messageText.includes('फूल खिलते रहें जिंदगी की राह में')) {
      finalMessageText = '🌸 Good Morning! May flowers blossom along your life journey, and happiness gleam in your eyes. Wishing you standard joy every step of the way! 🌅';
    } else if (messageText.includes('मन की पवित्रता और ईश्वर पर अटूट')) {
      finalMessageText = '🌺 Good Morning! Purity of mind and absolute faith in the Divine is the greatest wealth of human life. Have a blessed day! 🙏';
    } else if (messageText.includes('संकट कटै मिटै सब पीरा')) {
      finalMessageText = '🚩 Good Morning! May Hanuman ji bless your day with strength, health, and peace. All sorrows vanish by chanting his name. Jai Bajrangbali! 🌸';
    } else if (messageText.includes('शांत और सुहानी रात में')) {
      finalMessageText = '🌙 Good Night! In this quiet and beautiful night, may the Divine grant you peaceful dreams and protection. Sleep well! 🙏';
    } else if (messageText.includes('आज का दिन जैसा भी रहा')) {
      finalMessageText = '🌸 Good Night! Whatever happened today, surrender it to the Almighty and sleep in complete peace. Tomorrow brings new light. Shubh Ratri! 🌙';
    } else if (messageText.includes('कर्म ही पूजा है')) {
      finalMessageText = '💎 Work is Worship. If you perform your duties with complete honesty and dedication, understand that you are rendering true devotion to God. ✨';
    } else if (messageText.includes('सच्चा सुख दूसरों की भलाई में है')) {
      finalMessageText = '🌸 True happiness lies in the well-being of others. When we bring a smile to someone\'s face, the Divine is pleased. Good Morning! 🙏';
    }
  }

  const getWhatsAppLink = () => {
    const origin = mounted && typeof window !== 'undefined' ? window.location.origin : 'https://suprabhat.app';
    const titleEmoji = language === 'hi' ? '🌸 *सुप्रभात!* 🌸' : '🌸 *Good Morning!* 🌸';
    const cardPromoText = language === 'hi' 
      ? '👇 *आपके लिए विशेष सुविचार और बधाई कार्ड प्राप्त करें:* 👇'
      : '👇 *Get your customized daily blessing card here:* 👇';

    const formattedText = `${titleEmoji}\n\n"${finalMessageText}"\n\n${cardPromoText}\n${origin}?from=whatsapp`;
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(formattedText)}`;
  };

  const finalAuthor = language === 'hi' ? authorName : (authorName === 'दैनिक आशीर्वाद' ? 'Daily Blessing' : 'Devotional');

  return (
    <section className="w-full px-4 py-4">
      {/* Decorative Outer Border Box */}
      <div className="marigold-border bg-warm-cream rounded-2xl shadow-xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl">
        
        {/* Main Display Image Frame */}
        <div className="relative min-h-[220px] bg-gradient-to-b from-orange-500 to-amber-400 p-6 flex flex-col justify-between text-center overflow-hidden">
          
          {/* Subtle Devotional Background Decorative Rays */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-300/30 via-transparent to-transparent select-none pointer-events-none"></div>
          
          {/* Top Border Banner */}
          <div className="z-10 flex justify-between items-center text-white/90 text-xs font-semibold tracking-wider font-display">
            <span>{t('header', 'dailyCard')}</span>
            <span>{t('title', 'dailyCard')}</span>
          </div>

          {/* Devotional Message Text */}
          <div className="z-10 my-4 flex flex-col items-center justify-center min-h-[100px]">
            <p className="font-display text-xl leading-relaxed text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] font-bold px-2">
              {finalMessageText}
            </p>
          </div>

          {/* Signature/Author */}
          <div className="z-10 text-right">
            <span className="bg-white/20 backdrop-blur-sm text-yellow-100 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
              📿 {finalAuthor}
            </span>
          </div>
        </div>

        {/* Action Buttons Panel */}
        <div className="bg-white p-4 flex flex-col space-y-3 border-t border-saffron-light">
          
          {/* WhatsApp Direct Share - Primary CTA */}
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3 px-4 rounded-xl flex items-center justify-center font-bold text-base shadow-md transition-all duration-200 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-[#25D366]/40 font-sans"
          >
            <span className="text-xl mr-2 select-none">💚</span>
            {t('share', 'dailyCard')}
          </a>

          {/* Secondary Actions */}
          <div className="grid grid-cols-2 gap-3 font-sans">
            {/* Copy Button */}
            <button
              onClick={copyToClipboard}
              className="bg-slate-50 hover:bg-slate-100/80 text-slate-700 border border-slate-200 py-2.5 px-3 rounded-xl flex items-center justify-center text-xs font-semibold shadow-sm transition-colors active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-300"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600 mr-1.5 animate-[scaleUp_0.2s_ease-out]" />
                  <span className="text-emerald-700 font-bold">{t('copied', 'dailyCard')}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500 mr-1.5" />
                  <span>{t('copy', 'dailyCard')}</span>
                </>
              )}
            </button>

            {/* Customizer Redirect Button */}
            <a
              href={`/generate?message=${encodeURIComponent(finalMessageText)}`}
              className="bg-gradient-to-r from-saffron to-amber-500 hover:from-saffron-dark hover:to-orange-500 text-white py-2.5 px-3 rounded-xl flex items-center justify-center text-xs font-bold shadow-sm transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-saffron/40"
            >
              <Sparkles className="w-4 h-4 text-white mr-1.5 animate-pulse" />
              <span>{t('personalize', 'dailyCard')}</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}

