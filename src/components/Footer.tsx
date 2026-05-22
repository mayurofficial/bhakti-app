'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { language, t } = useLanguage();

  return (
    <footer className="w-full bg-slate-900 text-slate-300 mt-auto border-t-2 border-saffron">
      <div className="max-w-md mx-auto px-6 py-8 font-sans">
        
        {/* Sanskrit Chant/Blessing Header */}
        <div className="text-center mb-6">
          <p className="font-display text-lg text-saffron-medium tracking-wide">
            {t('chant', 'footer')}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {t('chantDesc', 'footer')}
          </p>
        </div>

        {/* SEO Navigation Directories */}
        <div className="grid grid-cols-2 gap-6 border-y border-slate-800 py-6 mb-6 text-sm">
          <div>
            <h4 className="font-semibold text-white mb-3 text-xs uppercase tracking-wider text-saffron">
              {t('popularCategories', 'footer')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/category/good-morning" className="hover:text-saffron-medium transition-colors">
                  {language === 'hi' ? '🌅 सुप्रभात संदेश' : '🌅 Good Morning'}
                </Link>
              </li>
              <li>
                <Link href="/category/good-night" className="hover:text-saffron-medium transition-colors">
                  {language === 'hi' ? '🌙 शुभ रात्रि संदेश' : '🌙 Good Night'}
                </Link>
              </li>
              <li>
                <Link href="/category/devotional" className="hover:text-saffron-medium transition-colors">
                  {language === 'hi' ? '📿 भक्ति और भजन' : '📿 Devotional'}
                </Link>
              </li>
              <li>
                <Link href="/category/suvichar" className="hover:text-saffron-medium transition-colors">
                  {language === 'hi' ? '💎 दैनिक सुविचार' : '💎 Daily Quotes'}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 text-xs uppercase tracking-wider text-saffron">
              {t('upcomingFestivals', 'footer')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/festival/diwali-wishes" className="hover:text-saffron-medium transition-colors">
                  {language === 'hi' ? '🪔 दीपावली बधाई संदेश' : '🪔 Happy Diwali'}
                </Link>
              </li>
              <li>
                <Link href="/festival/holi-wishes" className="hover:text-saffron-medium transition-colors">
                  {language === 'hi' ? '🎨 होली मंगलकामनाएं' : '🎨 Happy Holi'}
                </Link>
              </li>
              <li>
                <Link href="/festival/mahashivratri-wishes" className="hover:text-saffron-medium transition-colors">
                  {language === 'hi' ? '🔱 महाशिवरात्रि शुभकामना' : '🔱 Maha Shivaratri'}
                </Link>
              </li>
              <li>
                <Link href="/festival/ram-navami-wishes" className="hover:text-saffron-medium transition-colors">
                  {language === 'hi' ? '🏹 श्री राम नवमी बधाई' : '🏹 Ram Navami'}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Branding & Ads Placeholder */}
        <div className="text-center space-y-4">
          {/* Ad Slot Placeholder */}
          <div className="bg-slate-800/50 rounded-lg p-2 border border-slate-800 text-[10px] text-slate-500 tracking-wider">
            ADVERTISEMENT
            <div className="h-16 flex items-center justify-center font-sans text-xs text-slate-600">
              [Google Ads AdSense Responsive Slot]
            </div>
          </div>

          <div className="text-xs text-slate-500 font-sans space-y-1">
            <p>© {new Date().getFullYear()} {t('copyright', 'footer')}</p>
            <p className="text-[10px]">{t('madeWith', 'footer')}</p>
          </div>
        </div>

      </div>
    </footer>
  );
}

