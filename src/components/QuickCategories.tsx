'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

interface CategoryItem {
  name: string;
  slug: string;
  emoji: string;
  colorClass: string;
  bgClass: string;
}

export default function QuickCategories() {
  const { language, t } = useLanguage();

  const items: CategoryItem[] = [
    {
      name: language === 'hi' ? 'सुप्रभात' : 'Good Morning',
      slug: 'good-morning',
      emoji: '🌅',
      colorClass: 'text-orange-600',
      bgClass: 'bg-orange-50 border-orange-200 hover:bg-orange-100/80',
    },
    {
      name: language === 'hi' ? 'शुभ रात्रि' : 'Good Night',
      slug: 'good-night',
      emoji: '🌙',
      colorClass: 'text-indigo-600',
      bgClass: 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100/80',
    },
    {
      name: language === 'hi' ? 'भक्ति संदेश' : 'Bhakti Wishes',
      slug: 'devotional',
      emoji: '📿',
      colorClass: 'text-red-600',
      bgClass: 'bg-red-50 border-red-200 hover:bg-red-100/80',
    },
    {
      name: language === 'hi' ? 'दैनिक सुविचार' : 'Daily Quotes',
      slug: 'suvichar',
      emoji: '💎',
      colorClass: 'text-amber-600',
      bgClass: 'bg-amber-50 border-amber-200 hover:bg-amber-100/80',
    },
  ];

  return (
    <section className="w-full px-4 py-6 font-sans">
      <h3 className="font-display text-xl text-temple-maroon mb-4 flex items-center justify-between border-b border-saffron-light pb-2">
        <span>{t('title', 'categories')}</span>
        <span className="text-xs font-sans text-slate-500 font-normal">{t('subtitle', 'categories')}</span>
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/category/${item.slug}`}
            className={`flex items-center space-x-3 p-4 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 active:scale-95 shadow-sm ${item.bgClass}`}
          >
            <span className="text-3xl filter drop-shadow-sm select-none">{item.emoji}</span>
            <div className="flex flex-col">
              <span className="font-semibold text-slate-800 text-sm tracking-wide">
                {item.name}
              </span>
              <span className={`text-[10px] font-sans font-medium uppercase tracking-wider ${item.colorClass}`}>
                {t('viewAll', 'categories')}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

