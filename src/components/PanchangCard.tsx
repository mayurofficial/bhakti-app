'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface PanchangData {
  date: string;
  panchangText: string;
  rashifal: {
    [key: string]: string;
  };
}

const defaultPanchang: PanchangData = {
  date: 'शुक्रवार, २२ मई २०२६',
  panchangText: 'जेष्ठ कृष्ण पक्ष एकादशी तिथि (अपरा एकादशी), नक्षत्र: उत्तराभाद्रपद, योग: विष्कुंभ, करण: बव। सूर्योदय: ०५:२८ AM, सूर्यास्त: ०७:०८ PM।',
  rashifal: {
    'मेष (Aries)': 'आज मानसिक शांति मिलेगी, नए कार्यों को शुरू करने के लिए दिन अनुकूल है। स्वास्थ्य अच्छा रहेगा। 🌟',
    'वृष (Taurus)': 'व्यापार में लाभ के उत्तम योग हैं। किसी पुराने मित्र से मुलाकात हो सकती है। भाग्यशाली रंग पीला है। 🌾',
    'मिथुन (Gemini)': 'स्वास्थ्य सामान्य रहेगा, बाहर के भोजन से बचें। खर्चों पर थोड़ा नियंत्रण रखने की आवश्यकता है। 💰',
    'कर्क (Cancer)': 'परिवार के सदस्यों का पूर्ण सहयोग प्राप्त होगा। अध्यात्म की ओर झुकाव बढ़ेगा। 🌸',
    'सिंह (Leo)': 'आज कार्यक्षेत्र में नया काम शुरू करने से बचें। वाणी पर संयम रखें, विवाद टलेंगे। 🙏',
    'कन्या (Virgo)': 'रुका हुआ धन मिलने की संभावना है। विद्यार्थियों के लिए आज का दिन अत्यंत अनुकूल है। 📚',
    'तुला (Libra)': 'कार्यक्षेत्र में सराहना मिलेगी, पदोन्नति के योग बन रहे हैं। घर में सुख-समृद्धि रहेगी। 🏡',
    'वृश्चिक (Scorpio)': 'धार्मिक यात्रा के योग बन रहे हैं। आज किया गया निवेश भविष्य में शुभ फल देगा। 📿',
    'धनु (Sagittarius)': 'सकारात्मक ऊर्जा का संचार होगा। माता-पिता के स्वास्थ्य का विशेष ध्यान रखें। 🚩',
    'मकर (Capricorn)': 'आर्थिक स्थिति में सुधार होगा। नए व्यावसायिक संपर्क स्थापित होंगे, जो हितकारी रहेंगे। 🤝',
    'कुंभ (Aquarius)': 'कलात्मक कार्यों में रुचि बढ़ेगा। आज परिवार के साथ सुखद समय व्यतीत करेंगे। 🎨',
    'मीन (Pisces)': 'मन प्रसन्न रहेगा, पुराने विवादों से मुक्ति मिलेगी। हनुमान चालीसा का पाठ करें, लाभ होगा। 🔱',
  }
};

const englishPanchang: PanchangData = {
  date: 'Friday, May 22, 2026',
  panchangText: 'Jyeshtha Krishna Paksha Ekadashi Tithi (Apara Ekadashi), Nakshatra: Uttarabhadrapada, Yoga: Vishkumbha, Karana: Bava. Sunrise: 05:28 AM, Sunset: 07:08 PM.',
  rashifal: {
    'मेष (Aries)': 'Today you will experience mental peace. The day is favorable for starting new projects. Health will remain excellent. 🌟',
    'वृष (Taurus)': 'Great prospects for business profits today. You might meet an old friend. Lucky color is yellow. 🌾',
    'मिथुन (Gemini)': 'Health will be normal, avoid eating outside. Keep a check on your expenses today. 💰',
    'कर्क (Cancer)': 'You will receive full support from family members. Your inclination towards spirituality will increase. 🌸',
    'सिंह (Leo)': 'Avoid starting new ventures in the workplace today. Control your words to avoid unnecessary disputes. 🙏',
    'कन्या (Virgo)': 'Possibility of receiving stuck funds. Today is highly favorable for students. 📚',
    'तुला (Libra)': 'You will get appreciation at the workplace; chances of promotion are high. Happiness and prosperity will prevail at home. 🏡',
    'वृश्चिक (Scorpio)': 'Chances of a spiritual or religious journey. Investments made today will yield good returns in the future. 📿',
    'धनु (Sagittarius)': 'Positive energy will flow. Take special care of your parents\' health. 🚩',
    'मकर (Capricorn)': 'Financial conditions will improve. New business contacts will be established, which will be beneficial. 🤝',
    'कुंभ (Aquarius)': 'Interest in artistic and creative work will increase. Today you will spend a delightful time with family. 🎨',
    'मीन (Pisces)': 'Your mind will remain cheerful. You will get relief from old disputes. Pray or chant Hanuman Chalisa for good luck. 🔱',
  }
};

export default function PanchangCard() {
  const [selectedRashi, setSelectedRashi] = useState<string | null>('मेष (Aries)');
  const { language, t } = useLanguage();

  const panchangData = language === 'hi' ? defaultPanchang : englishPanchang;

  return (
    <section className="w-full px-4 py-4">
      {/* Container Card */}
      <div className="bg-gradient-to-br from-gold-light via-white to-orange-50 rounded-2xl border-2 border-gold/40 shadow-md p-5 relative overflow-hidden">
        
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-saffron-medium rounded-tl-xl opacity-60"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-saffron-medium rounded-tr-xl opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-saffron-medium rounded-bl-xl opacity-60"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-saffron-medium rounded-br-xl opacity-60"></div>

        {/* Section Title */}
        <div className="text-center mb-4">
          <span className="text-3xl select-none">📿</span>
          <h3 className="font-display text-2xl text-temple-maroon leading-tight mt-1">
            {t('title', 'panchang')}
          </h3>
          <p className="text-xs text-saffron-dark font-semibold tracking-wider uppercase mt-1">
            {panchangData.date}
          </p>
        </div>

        {/* Ancient Scroll styled Panchang Section */}
        <div className="bg-amber-50/60 rounded-xl p-4 border border-amber-200/60 mb-5 relative">
          <div className="absolute -top-2 left-4 bg-saffron text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
            {t('panchangHeader', 'panchang')}
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-medium mt-1 font-sans text-center">
            {panchangData.panchangText}
          </p>
        </div>

        {/* Dynamic Rashifal Widget */}
        <div className="border-t border-saffron-light pt-4">
          <h4 className="text-center font-display text-lg text-temple-maroon mb-3">
            {t('horoscopeHeader', 'panchang')}
          </h4>

          {/* Rashi Selector Dropdown / Grid */}
          <div className="mb-4">
            <label htmlFor="rashi-select" className="sr-only">
              {language === 'hi' ? 'राशि चुनें' : 'Select Zodiac'}
            </label>
            <select
              id="rashi-select"
              value={selectedRashi || ''}
              onChange={(e) => setSelectedRashi(e.target.value)}
              className="w-full bg-white border border-saffron-medium rounded-lg px-3 py-2 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-saffron text-slate-800 font-medium"
            >
              {Object.keys(panchangData.rashifal).map((rashi) => {
                const displayName = language === 'hi' ? rashi : (rashi.match(/\(([^)]+)\)/)?.[1] || rashi);
                return (
                  <option key={rashi} value={rashi}>
                    {displayName}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Selected Rashi Display Card */}
          {selectedRashi && (
            <div className="bg-white rounded-xl p-4 border border-gold/30 shadow-inner animate-[fadeIn_0.3s_ease-out] relative">
              <span className="absolute -top-2 right-4 bg-gold-dark text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                {t('horoscopeSub', 'panchang')}
              </span>
              <h5 className="font-semibold text-saffron-dark text-sm mb-1.5 font-sans">
                {language === 'hi' ? selectedRashi : (selectedRashi.match(/\(([^)]+)\)/)?.[1] || selectedRashi)} {t('horoscopeTitle', 'panchang')}
              </h5>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                {panchangData.rashifal[selectedRashi]}
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
