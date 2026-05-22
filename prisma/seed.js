const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Clean Database
  await prisma.dailyContent.deleteMany();
  await prisma.message.deleteMany();
  await prisma.festival.deleteMany();
  await prisma.category.deleteMany();

  console.log('🗑️ Cleaned existing records.');

  // 2. Create Categories
  const categoryData = [
    {
      name: 'सुप्रभात (Good Morning)',
      slug: 'good-morning',
      description: 'सुबह की पावन शुरुआत के लिए सुंदर संदेश, भगवान के चित्र और सुविचार।',
      seoTitle: 'Spiritual Good Morning Images in Hindi - सुप्रभात संदेश',
      seoDesc: 'डाउनलोड करें बेहतरीन आध्यात्मिक सुप्रभात संदेश, इमेजेस, शायरी और सुविचार अपने परिजनों के साथ साझा करने के लिए।'
    },
    {
      name: 'शुभ रात्रि (Good Night)',
      slug: 'good-night',
      description: 'रात की मीठी नींद और ईश्वर के ध्यान के साथ अपनों को भेजें ये संदेश।',
      seoTitle: 'Devotional Good Night Wishes in Hindi - शुभ रात्रि संदेश',
      seoDesc: 'भेजें शांतिप्रिय शुभ रात्रि संदेश, ईश्वर के आशीर्वाद वाली तस्वीरें और सुविचार।'
    },
    {
      name: 'भक्ति और आराधना (Devotional)',
      slug: 'devotional',
      description: 'श्री राम, हनुमान जी, शिव जी और सभी देवी-देवताओं के पावन संदेश और भजन।',
      seoTitle: 'Bhakti Messages & God Images in Hindi - भक्ति संदेश',
      seoDesc: 'सभी देवी-देवताओं के पावन भक्ति संदेश, मंत्र और तस्वीरें व्हाट्सएप पर शेयर करें।'
    },
    {
      name: 'दैनिक सुविचार (Daily Suvichar)',
      slug: 'suvichar',
      description: 'जीवन को सही दिशा देने वाले प्रेरणादायक और सकारात्मक हिंदी सुविचार।',
      seoTitle: 'Best Hindi Suvichar & Motivational Quotes - दैनिक सुविचार',
      seoDesc: 'प्रेरणादायक हिंदी सुविचार, चाणक्य नीति और महान लोगों के सकारात्मक विचार।'
    }
  ];

  const categories = {};
  for (const cat of categoryData) {
    const created = await prisma.category.create({ data: cat });
    categories[cat.slug] = created;
  }
  console.log(`✅ Created ${categoryData.length} categories.`);

  // 3. Create Festivals
  const festivalData = [
    {
      name: 'दीपावली (Diwali)',
      slug: 'diwali-wishes',
      date: '11-09',
      description: 'रोशनी, खुशियों और माता लक्ष्मी की कृपा का पावन पर्व दीपावली।'
    },
    {
      name: 'होली (Holi)',
      slug: 'holi-wishes',
      date: '03-14',
      description: 'रंगों, आपसी प्रेम और भाईचारे का उत्सव होली।'
    },
    {
      name: 'महाशिवरात्रि (Maha Shivaratri)',
      slug: 'mahashivratri-wishes',
      date: '02-15',
      description: 'भगवान शिव और माता पार्वती के मिलन का महापर्व महाशिवरात्रि।'
    },
    {
      name: 'राम नवमी (Ram Navami)',
      slug: 'ram-navami-wishes',
      date: '04-06',
      description: 'मर्यादा पुरुषोत्तम भगवान श्री राम का पावन जन्मोत्सव राम नवमी।'
    },
    {
      name: 'कृष्ण जन्माष्टमी (Janmashtami)',
      slug: 'janmashtami-wishes',
      date: '08-16',
      description: 'प्रभु श्री कृष्ण के धरा पर अवतरण का महापर्व जन्माष्टमी।'
    }
  ];

  const festivals = {};
  for (const fest of festivalData) {
    const created = await prisma.festival.create({ data: fest });
    festivals[fest.slug] = created;
  }
  console.log(`✅ Created ${festivalData.length} festivals.`);

  // 4. Create Messages
  const messages = [
    // Good Morning Messages
    {
      content: '🌸 सुप्रभात! ईश्वर का आशीर्वाद आपके जीवन में सदैव बना रहे। आपका आज का दिन अत्यंत मंगलमय और आनंदमयी हो! 🙏',
      categoryId: categories['good-morning'].id,
      tone: 'Devotional'
    },
    {
      content: '🌅 उगता हुआ सूरज आपके जीवन में नई रोशनी, नई उम्मीद और सुख-समृद्धि लाए। जय श्री कृष्णा! राधे राधे! 🌸',
      categoryId: categories['good-morning'].id,
      tone: 'Devotional'
    },
    {
      content: '📿 हर सुबह एक नया अवसर है, ईश्वर को धन्यवाद करें और अपने दिन की शुरुआत सकारात्मकता के साथ करें। जय श्री राम! 🙏',
      categoryId: categories['good-morning'].id,
      tone: 'Devotional'
    },
    {
      content: '🌸 फूल खिलते रहें जिंदगी की राह में, खुशी चमकती रहे आपकी निगाह में। हर कदम पर मिले सुख की बहार आपको, यही दुआ है हमारी भगवान से। शुभ प्रभात! 🌅',
      categoryId: categories['good-morning'].id,
      tone: 'Traditional'
    },
    {
      content: '🌺 मन की पवित्रता और ईश्वर पर अटूट विश्वास ही मानव जीवन का सबसे बड़ा धन है। शुभ प्रभात! आपका दिन शुभ हो! 🙏',
      categoryId: categories['good-morning'].id,
      tone: 'Devotional'
    },
    {
      content: '🚩 संकट कटै मिटै सब पीरा, जो सुमिरै हनुमत बलबीरा। आज का सुबह हनुमान जी के आशीर्वाद के साथ। जय बजरंगबली! शुभ प्रभात! 🌸',
      categoryId: categories['good-morning'].id,
      tone: 'Devotional'
    },

    // Good Night Messages
    {
      content: '🌙 शांत और सुहानी रात में, ईश्वर आपके और आपके परिवार को सुखद स्वप्न और सुरक्षा प्रदान करें। शुभ रात्रि! 🙏',
      categoryId: categories['good-night'].id,
      tone: 'Devotional'
    },
    {
      content: '🌸 आज का दिन जैसा भी रहा, उसे भगवान को समर्पित करें और शांति से सो जाएं। कल की सुबह नई उम्मीद लेकर आएगी। शुभ रात्रि! जय सियाराम! 🌙',
      categoryId: categories['good-night'].id,
      tone: 'Devotional'
    },
    {
      content: '🌺 रात आई है तो चाँद-सितारे संग लायी है, ईश्वर की शीतल छाया आपके ऊपर हमेशा रहे, यही प्रार्थना हमारी आयी है। शुभ रात्रि! 🌙',
      categoryId: categories['good-night'].id,
      tone: 'Traditional'
    },

    // Devotional Messages
    {
      content: '🔱 ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात्। हर हर महादेव! भगवान शिव आपकी रक्षा करें। 🙏',
      categoryId: categories['devotional'].id,
      tone: 'Devotional'
    },
    {
      content: '🚩 मंगल भवन अमंगल हारी, द्रवहु सुदसरथ अजिर बिहारी। प्रभु श्री राम की कृपा आपके पूरे परिवार पर सदैव बनी रहे। जय श्री राम! 🙏',
      categoryId: categories['devotional'].id,
      tone: 'Devotional'
    },
    {
      content: '🌸 राधे कृष्ण! जिनके मन में प्रभु का नाम है, उनके हर बिगड़े काम बन जाते हैं। सच्चे मन से कहिए - राधे राधे! 📿',
      categoryId: categories['devotional'].id,
      tone: 'Devotional'
    },

    // Suvichar Messages
    {
      content: '💎 कर्म ही पूजा है। यदि आप ईमानदारी और लगन से अपना कर्तव्य निभा रहे हैं, तो समझें कि आप साक्षात ईश्वर की आराधना कर रहे हैं। ✨',
      categoryId: categories['suvichar'].id,
      tone: 'Spiritual'
    },
    {
      content: '🌟 जीवन में जब भी मुश्किलें आएं, तो समझ लेना कि भगवान आपको और मजबूत बनाना चाहते हैं। धैर्य ही जीवन की सबसे बड़ी जीत है। 🌸',
      categoryId: categories['suvichar'].id,
      tone: 'Spiritual'
    },
    {
      content: '🍂 जैसे पतझड़ के बिना पेड़ पर नए पत्ते नहीं आते, ठीक वैसे ही संघर्ष और कठिनाई के बिना इंसान के जीवन में अच्छे दिन नहीं आते। 💎',
      categoryId: categories['suvichar'].id,
      tone: 'Spiritual'
    },

    // Festival specific messages
    {
      content: '✨ दीपावली के इस पावन पर्व पर आपके जीवन में सुख, समृद्धि, ऐश्वर्य और उत्तम स्वास्थ्य का वास हो। मां लक्ष्मी की असीम अनुकंपा आप पर बनी रहे। शुभ दीपावली! 🪔',
      categoryId: categories['devotional'].id,
      festivalId: festivals['diwali-wishes'].id,
      tone: 'Devotional'
    },
    {
      content: '🎨 रंग, उमंग, उल्लास और आपसी भाईचारे के पावन त्योहार होली की आपको और आपके पूरे परिवार को सतरंगी शुभकामनाएं! होली की हार्दिक बधाई! 🌸',
      categoryId: categories['devotional'].id,
      festivalId: festivals['holi-wishes'].id,
      tone: 'Traditional'
    },
    {
      content: '🔱 ॐ नमः शिवाय! शिव सत्य है, शिव सुंदर है, शिव अनंत है। महाशिवरात्रि के पावन पर्व पर भोलेनाथ की कृपा आप पर बनी रहे। हर हर महादेव! 🌸',
      categoryId: categories['devotional'].id,
      festivalId: festivals['mahashivratri-wishes'].id,
      tone: 'Devotional'
    }
  ];

  for (const msg of messages) {
    await prisma.message.create({ data: msg });
  }
  console.log(`✅ Seeded ${messages.length} messages.`);

  // 5. Create Daily Content Cache (Seed for today: 2026-05-22 and next few days)
  const todayStr = '2026-05-22';
  const tomorrowStr = '2026-05-23';

  await prisma.dailyContent.create({
    data: {
      date: todayStr,
      message: '🌸 सुप्रभात! प्रभु श्री राम की असीम कृपा से आपका आज का दिन अत्यंत मंगलमय, सुखद और स्वास्थ्यवर्धक हो! जय श्री राम! 🙏',
      quote: 'सच्चा सुख दूसरों की भलाई में है। जब हम किसी के चेहरे पर मुस्कान लाते हैं, तो साक्षात ईश्वर प्रसन्न होते हैं।',
      panchang: 'शुक्रवार, जेष्ठ कृष्ण पक्ष एकादशी तिथि (अपरा एकादशी), नक्षत्र: उत्तराभाद्रपद, योग: विष्कुंभ, करण: बव।',
      rashifal: 'मेष: आज मानसिक शांति मिलेगी। वृष: व्यापार में लाभ के योग हैं। मिथुन: स्वास्थ्य सामान्य रहेगा। कर्क: परिवार का सहयोग प्राप्त होगा। सिंह: आज नया काम टालें। कन्या: धन लाभ संभव है।',
      bgImage: 'sunrise'
    }
  });

  await prisma.dailyContent.create({
    data: {
      date: tomorrowStr,
      message: '🌅 सुप्रभात! श्री कृष्ण का आशीर्वाद आपके जीवन के सभी कष्टों को दूर करे। आज एक नई और ऊर्जावान शुरुआत करें! राधे राधे! 🌸',
      quote: 'धैर्य और परिश्रम ही वो सीढ़ियां हैं जो मनुष्य को उसकी सफलता की चरम सीमा तक पहुंचाती हैं। विश्वास रखें।',
      panchang: 'शनिवार, जेष्ठ कृष्ण पक्ष द्वादशी तिथि, नक्षत्र: रेवती, योग: प्रीति, करण: बालव।',
      rashifal: 'मेष: यात्रा के योग हैं। वृष: नया मित्र बनेगा। मिथुन: खर्चों पर नियंत्रण रखें। कर्क: कार्यक्षेत्र में सराहना मिलेगी। सिंह: सुखद समाचार मिलेगा। कन्या: क्रोध से बचें।',
      bgImage: 'temple'
    }
  });

  console.log('✅ Created initial DailyContent cache for today & tomorrow.');
  console.log('🎉 Database seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Error while seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
