import React from 'react';
import db from '@/lib/db';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DailyMessageCard from '@/components/DailyMessageCard';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Metadata } from 'next';

interface FestivalPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate dynamic SEO metadata per festival!
export async function generateMetadata({ params }: FestivalPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const festival = await db.festival.findUnique({ where: { slug } });
    if (festival) {
      return {
        title: `${festival.name} बधाई संदेश और कार्ड्स - सुप्रभात`,
        description: festival.description || `सुंदर ${festival.name} बधाई संदेश, कोट्स, इमेजेस और नाम वाले व्हाट्सएप शुभकामना पत्र डाउनलोड करें।`,
      };
    }
  } catch (e) {
    console.error('Festival metadata lookup failed:', e);
  }

  return {
    title: 'धार्मिक त्योहारों के पावन बधाई संदेश - सुप्रभात',
    description: 'भारतीय त्योहारों के पावन बधाई संदेश, सुविचार और व्हाट्सएप बधाई पत्र।',
  };
}

export default async function FestivalPage({ params }: FestivalPageProps) {
  const { slug } = await params;
  
  // Database lookup with robust try-catch
  let festival = null;
  let messages: any[] = [];
  
  try {
    festival = await db.festival.findUnique({
      where: { slug },
      include: {
        messages: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });
    
    if (festival) {
      messages = festival.messages;
    }
  } catch (error) {
    console.error('Database connection error in festival page:', error);
  }

  // Graceful 404/Fallback if festival is not found in database
  if (!festival) {
    return (
      <div className="flex flex-col min-h-screen bg-warm-beige">
        <Header />
        <main className="flex-1 w-full max-w-md mx-auto bg-white p-6 shadow-md text-center flex flex-col justify-center items-center font-sans">
          <span className="text-5xl">🌸</span>
          <h2 className="font-display text-2xl text-temple-maroon mt-4 mb-2">त्योहार जानकारी उपलब्ध नहीं है</h2>
          <p className="text-slate-600 text-sm mb-6">क्षमा करें, इस पावन त्योहार की शुभकामनाएं अभी उपलब्ध नहीं हैं।</p>
          <Link href="/" className="bg-saffron text-white py-2 px-6 rounded-xl font-bold hover:bg-saffron-dark transition-colors">
            मुख्य पृष्ठ पर जाएं
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-warm-beige">
      <Header />

      <main className="flex-1 w-full max-w-md mx-auto bg-white shadow-md border-x border-saffron-light/20 flex flex-col pb-8">
        
        {/* Navigation Breadcrumb */}
        <div className="px-4 pt-5 pb-3 flex items-center justify-between border-b border-slate-100">
          <Link href="/" className="flex items-center text-slate-600 hover:text-saffron transition-colors text-sm font-semibold font-sans">
            <ArrowLeft className="w-4 h-4 mr-1" />
            मुख्य पृष्ठ
          </Link>
          <span className="text-xs bg-saffron-light text-saffron-dark font-bold px-2.5 py-0.5 rounded-full font-sans uppercase tracking-wider">
            त्योहार विशेष
          </span>
        </div>

        {/* Festival Header Banner */}
        <div className="p-6 bg-gradient-to-b from-orange-50 to-white border-b border-orange-100 text-center relative overflow-hidden">
          <span className="text-3xl select-none filter drop-shadow">📿</span>
          <h1 className="font-display text-2xl text-temple-maroon mt-2 mb-1">
            {festival.name} शुभकामना संदेश
          </h1>
          <p className="text-xs text-slate-600 leading-relaxed font-sans max-w-[90%] mx-auto mb-4">
            {festival.description}
          </p>

          {/* Quick Customizer CTA Button */}
          <Link
            href={`/generate?festival=${festival.slug}`}
            className="inline-flex items-center bg-gradient-to-r from-saffron to-amber-500 hover:from-saffron-dark hover:to-orange-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-md transition-transform active:scale-95 font-sans"
          >
            <Sparkles className="w-4 h-4 mr-1.5 animate-pulse" />
            अपना नाम लिखकर बधाई पत्र तैयार करें
          </Link>
        </div>

        {/* Ad Placeholder below festival header */}
        <div className="px-4 py-2 mt-2">
          <div className="bg-slate-50 rounded-xl p-2 border border-dashed border-slate-200 text-center text-[10px] text-slate-400 font-sans tracking-wide">
            ADVERTISEMENT
            <div className="h-14 flex items-center justify-center text-xs text-slate-400">
              [Google Adsense Responsive Banner Slot]
            </div>
          </div>
        </div>

        {/* Message Listings */}
        <div className="flex flex-col space-y-1">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <DailyMessageCard
                key={msg.id}
                messageText={msg.content}
                authorName={`${festival!.name} मंगलकामना #${index + 1}`}
                bgType="sunrise"
              />
            ))
          ) : (
            <div className="p-8 text-center text-slate-400 font-sans text-xs">
              इस त्योहार के लिए अभी विशिष्ट संदेश जोड़े जा रहे हैं। शीघ्र ही उपलब्ध होंगे!
            </div>
          )}
        </div>

      </main>

      <Footer />
    </div>
  );
}
