import React from 'react';
import db from '@/lib/db';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GreetingBanner from '@/components/GreetingBanner';
import DailyMessageCard from '@/components/DailyMessageCard';
import PanchangCard from '@/components/PanchangCard';
import QuickCategories from '@/components/QuickCategories';
import Link from 'next/link';

// Beautiful spiritual fallback data in case DB isn't seeded or available
const fallbackContent = {
  message: '🌸 सुप्रभात! ईश्वर का आशीर्वाद आपके जीवन में सदैव बना रहे। आपका आज का दिन अत्यंत मंगलमय और आनंदमयी हो! जय श्री राम! 🙏',
  quote: 'सच्चा सुख दूसरों की भलाई में है। जब हम किसी के चेहरे पर मुस्कान लाते हैं, तो साक्षात ईश्वर प्रसन्न होते हैं।',
  bgImage: 'sunrise'
};

async function getTodayContent() {
  const todayStr = '2026-05-22'; // Hardcoded to match our seed date for high reliability
  try {
    const content = await db.dailyContent.findUnique({
      where: { date: todayStr }
    });
    return content || fallbackContent;
  } catch (error) {
    console.error('Error fetching today\'s content from database:', error);
    return fallbackContent;
  }
}

export default async function Home() {
  const todayContent = await getTodayContent();

  return (
    <div className="flex flex-col min-h-screen bg-warm-beige">
      {/* 1. Header with bell chime */}
      <Header />

      {/* Main Container constrained for mobile-first scrolling */}
      <main className="flex-1 w-full max-w-md mx-auto bg-white shadow-md border-x border-saffron-light/20 flex flex-col pb-8">
        
        {/* 2. Client Greeting Banner */}
        <GreetingBanner />

        {/* 3. Daily Card Display */}
        <DailyMessageCard 
          messageText={todayContent.message} 
          authorName="दैनिक आशीर्वाद"
          bgType={todayContent.bgImage}
        />

        {/* Ad Placeholder below main card */}
        <div className="px-4 py-2">
          <div className="bg-amber-50/40 rounded-xl p-2 border border-dashed border-amber-200 text-center text-[10px] text-amber-600 font-sans tracking-wide">
            ADVERTISEMENT
            <div className="h-20 flex items-center justify-center text-xs text-slate-400">
              [Google Adsense Display Banner - High RPM]
            </div>
          </div>
        </div>

        {/* 4. Panchang & Rashifal Widget */}
        <PanchangCard />

        {/* 5. Navigation Category Grid */}
        <QuickCategories />

        {/* 6. Upcoming Festivals SEO Banner */}
        <section className="px-4 py-2">
          <div className="bg-gradient-to-r from-saffron-dark to-temple-maroon rounded-2xl p-5 text-white shadow-md text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-8 -mt-8 pointer-events-none"></div>
            <span className="text-3xl select-none">🪔</span>
            <h4 className="font-display text-2xl mt-2 mb-1">आगामी महापर्व: दीपावली बधाई</h4>
            <p className="text-xs text-amber-200 leading-relaxed font-sans mb-4">
              दीपावली के शुभ अवसर पर अपने मित्रों और परिवार के लिए सुंदर नाम वाला बधाई पत्र और इमेज तैयार करें!
            </p>
            <Link 
              href="/generate?festival=diwali-wishes"
              className="inline-block bg-white text-temple-maroon hover:bg-gold-light font-bold text-sm px-6 py-2.5 rounded-xl shadow transition-transform active:scale-95 font-sans"
            >
              बधाई पत्र बनाएं (Create Card) →
            </Link>
          </div>
        </section>

      </main>

      {/* 7. Footer */}
      <Footer />
    </div>
  );
}
