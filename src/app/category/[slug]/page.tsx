import React from 'react';
import db from '@/lib/db';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DailyMessageCard from '@/components/DailyMessageCard';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate dynamic SEO metadata per category!
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const category = await db.category.findUnique({ where: { slug } });
    if (category) {
      return {
        title: `${category.seoTitle || category.name} - सुप्रभात संदेश`,
        description: category.seoDesc || category.description,
      };
    }
  } catch (e) {
    console.error('Metadata lookup failed:', e);
  }

  return {
    title: 'धार्मिक और प्रेरक शुभकामना संदेश - सुप्रभात',
    description: 'बेहतरीन आध्यात्मिक संदेश, सुविचार, शायरी और शुभ प्रभात विशेज डाउनलोड करें।',
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  
  // Database lookup with robust try-catch
  let category = null;
  let messages: any[] = [];
  
  try {
    category = await db.category.findUnique({
      where: { slug },
      include: {
        messages: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });
    
    if (category) {
      messages = category.messages;
    }
  } catch (error) {
    console.error('Database connection error in category page:', error);
  }

  // Graceful 404/Fallback if category is not found in database
  if (!category) {
    return (
      <div className="flex flex-col min-h-screen bg-warm-beige">
        <Header />
        <main className="flex-1 w-full max-w-md mx-auto bg-white p-6 shadow-md text-center flex flex-col justify-center items-center font-sans">
          <span className="text-5xl">🌸</span>
          <h2 className="font-display text-2xl text-temple-maroon mt-4 mb-2">श्रेणी उपलब्ध नहीं है</h2>
          <p className="text-slate-600 text-sm mb-6">क्षमा करें, यह शुभकामना श्रेणी अभी उपलब्ध नहीं है।</p>
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
            {category.name.split(' ')[0]}
          </span>
        </div>

        {/* Category Description Banner */}
        <div className="p-5 bg-gradient-to-b from-amber-50 to-white border-b border-amber-100 text-center">
          <h1 className="font-display text-2xl text-temple-maroon mb-1">
            {category.name}
          </h1>
          <p className="text-xs text-slate-600 leading-relaxed font-sans max-w-[90%] mx-auto">
            {category.description}
          </p>
        </div>

        {/* Ad Placeholder below category header */}
        <div className="px-4 py-2 mt-2">
          <div className="bg-slate-50 rounded-xl p-2 border border-dashed border-slate-200 text-center text-[10px] text-slate-400 font-sans tracking-wide">
            ADVERTISEMENT
            <div className="h-14 flex items-center justify-center text-xs text-slate-400">
              [Google Adsense Category Horizontal Banner]
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
                authorName={`${category!.name.split(' ')[0]} संदेश #${index + 1}`}
                bgType="sunrise"
              />
            ))
          ) : (
            <div className="p-8 text-center text-slate-400 font-sans text-xs">
              इस श्रेणी में कोई संदेश उपलब्ध नहीं है। शीघ्र ही जोड़े जाएंगे!
            </div>
          )}
        </div>

      </main>

      <Footer />
    </div>
  );
}
