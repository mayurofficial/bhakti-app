import type { Metadata } from "next";
import { Poppins, Rozha_One } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const rozhaOne = Rozha_One({
  weight: "400",
  variable: "--font-rozha",
  subsets: ["devanagari", "latin"],
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "सुप्रभात (Suprabhat) - दैनिक सुविचार, पंचांग, राशिफल और भक्ति संदेश",
  description: "हर सुबह अपनों को भेजें सुंदर सुविचार, पंचांग, दैनिक राशिफल और धार्मिक त्योहारों के बधाई कार्ड्स। व्हाट्सएप शेयर और फ्री डाउनलोड उपलब्ध।",
  keywords: "suprabhat, daily blessings, bhaktihub, shubh sandesh, good morning hindi status, panchang hindi, rashifal today, festival wishes",
  openGraph: {
    title: "सुप्रभात (Suprabhat) - दैनिक सुविचार और बधाई संदेश",
    description: "हर सुबह अपनों को भेजें सुंदर सुविचार, पंचांग, दैनिक राशिफल और बधाई कार्ड्स।",
    locale: "hi_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="hi"
      className={`${rozhaOne.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-warm-beige text-slate-800 selection:bg-saffron selection:text-white">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

