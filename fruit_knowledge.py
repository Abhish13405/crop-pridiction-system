"""
=============================================================================
FRUITS & HORTICULTURE KNOWLEDGE BASE
Nutritional, Agronomic, and Disease Prevention Data for Common Indian Fruits
=============================================================================
"""

FRUIT_DATABASE = {
    "apple": {
        "display_name": "सेब / Apple (Malus domestica)",
        "hindi_name": "सेब (Apple)",
        "category": "शीतोष्ण फल (Temperate Fruit)",
        "ideal_climate": "ठंडी जलवायु (15°C - 24°C), पहाड़ी क्षेत्र (J&K, HP, Uttarakhand)",
        "harvest_season": "जुलाई - अक्टूबर (July - October)",
        "nutrition": "फाइबर, विटामिन C, एंटीऑक्सीडेंट से भरपूर",
        "common_threats": ["एप्पल स्कैब (Apple Scab)", "पाउडरी मिल्ड्यू (Powdery Mildew)", "एफिड्स / चेपा"],
        "organic_care": "नीम तेल (5ml/L) का छिड़काव और बोर्डो मिश्रण (1%) फफूंद रोकथाम हेतु प्रयोग करें।",
        "chemical_care": "मैंकोजेब (2.5g/L) या कार्बेन्डाजिम (1g/L) का छिड़काव स्कैब दिखने पर करें।",
        "market_rate_per_kg": "₹80 - ₹160 प्रति किलो"
    },
    "banana": {
        "display_name": "केला / Banana (Musa acuminata)",
        "hindi_name": "केला (Banana)",
        "category": "उष्णकटिबंधीय फल (Tropical Fruit)",
        "ideal_climate": "गर्म व नम जलवायु (25°C - 35°C), पर्याप्त धूप",
        "harvest_season": "साल भर (Year-round production)",
        "nutrition": "पोटेशियम, विटामिन B6, ऊर्जा का प्रचुर स्रोत",
        "common_threats": ["सिगाटोका लीफ स्पॉट (Sigatoka Leaf Spot)", "पनामा विल्ट (Panama Wilt)", "तना घुन"],
        "organic_care": "स्यूडोमोनास फ्लोरेसेंस जैव-कवकनाशी तथा ट्राइकोडर्मा की जड़ में ड्रेंचिंग करें।",
        "chemical_care": "प्रोपिकोनाजोल (1ml/L) फफूंद जनित पत्ती धब्बा रोग पर छिड़कें।",
        "market_rate_per_kg": "₹30 - ₹60 प्रति दर्जन"
    },
    "orange": {
        "display_name": "संतरा / Orange (Citrus sinensis / reticulata)",
        "hindi_name": "संतरा (Orange / Mandarin)",
        "category": "साइट्रस / खट्टे फल (Citrus)",
        "ideal_climate": "उपोष्णकटिबंधीय जलवायु (20°C - 32°C), अच्छी जल निकासी",
        "harvest_season": "नवंबर - मार्च (Winter Harvest)",
        "nutrition": "विटामिन C, फ्लेवोनोइड्स, इम्यून बूस्टर",
        "common_threats": ["सिट्रस कैंकर (Citrus Canker)", "डाईबैक (Dieback)", "लीफ माइनर"],
        "organic_care": "नीम बीज अर्क (NSKE 5%) तथा कॉपर ऑक्सीक्लोराइड का छिड़काव करें।",
        "chemical_care": "स्ट्रेप्टोसाइक्लिन (100 ppm) + कॉपर फफूंदनाशक जीवाणु कैंकर पर प्रयोग करें।",
        "market_rate_per_kg": "₹50 - ₹100 प्रति किलो"
    },
    "lemon": {
        "display_name": "नींबू / Lemon (Citrus limon)",
        "hindi_name": "नींबू (Lemon / Citrus)",
        "category": "साइट्रस / खट्टे फल (Citrus)",
        "ideal_climate": "गर्म व मध्यम जलवायु (20°C - 35°C)",
        "harvest_season": "साल भर, मुख्य रूप से गर्मी व बरसात",
        "nutrition": "प्रचुर विटामिन C, साइट्रिक एसिड, पाचक रस",
        "common_threats": ["सिट्रस कैंकर (Canker)", "लीफ माइनर (Leaf Miner)", "गमोसिस"],
        "organic_care": "नीम का तेल (5ml/L) तथा नीम खली की खाद जड़ों में दें।",
        "chemical_care": "कॉपर ऑक्सीक्लोराइड (3g/L) फफूंद रोकथाम के लिए छिड़कें।",
        "market_rate_per_kg": "₹40 - ₹120 प्रति किलो"
    },
    "mango": {
        "display_name": "आम / फलों का राजा Mango (Mangifera indica)",
        "hindi_name": "आम (Mango)",
        "category": "उष्णकटिबंधीय फल (King of Fruits)",
        "ideal_climate": "उष्ण जलवायु (24°C - 36°C), पाला रहित मौसम",
        "harvest_season": "मई - जुलाई (Summer Harvest)",
        "nutrition": "विटामिन A, C, ई और उच्च फाइबर",
        "common_threats": ["मैंगो हॉपर (Mango Hopper)", "पाउडरी मिल्ड्यू", "एंथ्रेक्नोज (Anthracnose)"],
        "organic_care": "ब्यूवेरिया बेसियाना जैव-कीटनाशी और घुलनशील गंधक (2g/L) का छिड़काव।",
        "chemical_care": "इमिडाक्लोप्रिड (0.5ml/L) बौर आने पर हॉपर कीट के नियंत्रण हेतु छिड़कें।",
        "market_rate_per_kg": "₹60 - ₹150 प्रति किलो"
    },
    "pomegranate": {
        "display_name": "अनार / Pomegranate (Punica granatum)",
        "hindi_name": "अनार (Pomegranate)",
        "category": "उपोष्णकटिबंधीय फल (Nutritious Fruit)",
        "ideal_climate": "शुष्क व अर्ध-शुष्क जलवायु (22°C - 38°C), पर्याप्त धूप",
        "harvest_season": "अगस्त - दिसंबर (Mridula / Bhagwa)",
        "nutrition": "एंटीऑक्सीडेंट्स, आयरन, हीमोग्लोबिन वर्धक",
        "common_threats": ["जीवाणु झुलसा / तेली (Bacterial Blight)", "फल छेदक तितली (Anar Butterfly)"],
        "organic_care": "बोर्डो पेस्ट तने पर लगाएं, नीम तेल व ट्राइकोडर्मा का नियमित छिड़काव करें।",
        "chemical_care": "स्ट्रेप्टोसाइक्लिन (0.5g/L) + कॉपर ऑक्सीक्लोराइड तेली रोग पर छिड़कें।",
        "market_rate_per_kg": "₹100 - ₹220 प्रति किलो"
    },
    "strawberry": {
        "display_name": "स्ट्रॉबेरी / Strawberry (Fragaria ananassa)",
        "hindi_name": "स्ट्रॉबेरी (Strawberry)",
        "category": "बेरी / शीतकालीन फल (Berry)",
        "ideal_climate": "शीतोष्ण व ठंडी रातें (15°C - 24°C), मल्चिंग युक्त मिट्टी",
        "harvest_season": "दिसंबर - मार्च (Winter / Spring)",
        "nutrition": "विटामिन C, मैंगनीज, फोलेट",
        "common_threats": ["ग्रे मोल्ड / बोट्राइटिस (Grey Mould)", "रेड स्पाइडर माइट्स"],
        "organic_care": "काली प्लास्टिक मल्चिंग से फल मिट्टी से दूर रखें, नीम तेल छिड़कें।",
        "chemical_care": "कैप्टान (2g/L) या आइप्रोडिओन फफूंद सड़न पर छिड़कें।",
        "market_rate_per_kg": "₹150 - ₹350 प्रति किलो"
    },
    "pineapple": {
        "display_name": "अनानास / Pineapple (Ananas comosus)",
        "hindi_name": "अनानास (Pineapple)",
        "category": "उष्णकटिबंधीय फल (Tropical Fruit)",
        "ideal_climate": "गर्म व आर्द्र तटीय जलवायु (22°C - 32°C)",
        "harvest_season": "जुलाई - सितंबर (July - September)",
        "nutrition": "ब्रोमेलेन एंजाइम (पाचक), विटामिन C",
        "common_threats": ["हार्ट रॉट (Heart Rot)", "मिलीबग (Mealybug)"],
        "organic_care": "वर्मीकम्पोस्ट और नीम अर्क; जलभराव बिल्कुल न होने दें।",
        "chemical_care": "मेटालेक्सिल (2g/L) हार्ट रॉट की शुरुआती अवस्था में डालें।",
        "market_rate_per_kg": "₹50 - ₹90 प्रति पीस"
    },
    "papaya": {
        "display_name": "पपीता / Papaya (Carica papaya)",
        "hindi_name": "पपीता (Papaya)",
        "category": "उष्णकटिबंधीय फल (Fast Growing Fruit)",
        "ideal_climate": "गर्म जलवायु (22°C - 34°C), पाला सहन नहीं करता",
        "harvest_season": "रोपाई के 9 - 12 महीने बाद साल भर",
        "nutrition": "पपेन एंजाइम, विटामिन A, C, पाचन में लाभकारी",
        "common_threats": ["पपाया रिंगस्पॉट वायरस (PRSV)", "कॉलर रॉट (Collar Rot)"],
        "organic_care": "सफेद मक्खी (वाहक) के लिए पीले चिपचिपे कार्ड लगाएं, नीम तेल छिड़कें।",
        "chemical_care": "कॉपर फफूंदनाशक से तने के निचले हिस्से पर लेप करें।",
        "market_rate_per_kg": "₹30 - ₹60 प्रति किलो"
    },
    "guava": {
        "display_name": "अमरूद / Guava (Psidium guajava)",
        "hindi_name": "अमरूद (Guava)",
        "category": "सदाबहार फल (Evergreen Fruit)",
        "ideal_climate": "उष्ण व उपोष्ण जलवायु (20°C - 35°C), सहनशील पौधा",
        "harvest_season": "अगस्त - सितंबर एवं नवंबर - जनवरी",
        "nutrition": "संतरे से 4 गुना अधिक विटामिन C, उच्च फाइबर",
        "common_threats": ["अमरूद का उकठा (Guava Wilt)", "फल मक्खी (Fruit Fly)"],
        "organic_care": "मिथाइल यूजीनॉल फेरोमोन ट्रैप लगाएं; ट्राइकोडर्मा खाद में मिलाएं।",
        "chemical_care": "कार्बेन्डाजिम (2g/L) की जड़ों के पास ड्रेंचिंग उकठा रोग में करें।",
        "market_rate_per_kg": "₹40 - ₹80 प्रति किलो"
    },
    "custard_apple": {
        "display_name": "शरीफा / सीताफल Custard Apple (Annona squamosa)",
        "hindi_name": "शरीफा / सीताफल (Custard Apple)",
        "category": "अर्ध-शुष्क फल (Dryland Fruit)",
        "ideal_climate": "गर्म व शुष्क जलवायु (22°C - 36°C)",
        "harvest_season": "सितंबर - नवंबर (Autumn Harvest)",
        "nutrition": "मैग्नीशियम, विटामिन C, पोटेशियम",
        "common_threats": ["मिलीबग (Mealybug)", "फल सड़न (Fruit Rot)"],
        "organic_care": "साबुन के घोल और नीम तेल (5ml/L) से मिलीबग को साफ करें।",
        "chemical_care": "क्लोरोपायरीफॉस या इमिडाक्लोप्रिड मिलीबग संक्रमण पर छिड़कें।",
        "market_rate_per_kg": "₹60 - ₹120 प्रति किलो"
    },
    "jackfruit": {
        "display_name": "कटहल / Jackfruit (Artocarpus heterophyllus)",
        "hindi_name": "कटहल (Jackfruit)",
        "category": "विशाल उष्णकटिबंधीय फल (Largest Tree Fruit)",
        "ideal_climate": "गर्म व भारी वर्षा वाले क्षेत्र (24°C - 36°C)",
        "harvest_season": "मार्च - जून (Summer Season)",
        "nutrition": "कॉम्प्लेक्स कार्बोहाइड्रेट, फाइबर, पोटेशियम",
        "common_threats": ["राइजोपस फल सड़न (Soft Rot)", "शूट बोरर"],
        "organic_care": "पेड़ के चारों ओर सफाई रखें, नीम तेल व कॉपर घोल छिड़कें।",
        "chemical_care": "मैंकोजेब (2.5g/L) फल सड़न रोकने के लिए छिड़कें।",
        "market_rate_per_kg": "₹30 - ₹70 प्रति किलो"
    },
    "watermelon": {
        "display_name": "तरबूज / Watermelon (Citrullus lanatus)",
        "hindi_name": "तरबूज (Watermelon)",
        "category": "जायद / ग्रीष्मकालीन फल (Cucurbit)",
        "ideal_climate": "गर्म व शुष्क मौसम (25°C - 38°C), बलुई दोमट मिट्टी",
        "harvest_season": "मार्च - जून (Summer Harvest)",
        "nutrition": "92% जल तत्व, लाइकोपीन, हाइड्रेटिंग पोषक",
        "common_threats": ["फ्यूजैरियम विल्ट (Fusarium Wilt)", "रेड पम्पकिन बीटल"],
        "organic_care": "ट्राइकोडर्मा से बीज शोधन करें; नीम बीज अर्क (5%) छिड़कें।",
        "chemical_care": "हेक्साकोनाजोल (1ml/L) पाउडरी मिल्ड्यू पर छिड़कें।",
        "market_rate_per_kg": "₹15 - ₹35 प्रति किलो"
    },
    "grapes": {
        "display_name": "अंगूर / Grapes (Vitis vinifera)",
        "hindi_name": "अंगूर (Grapes)",
        "category": "बेल फल / उद्यानिकी (Vine Fruit)",
        "ideal_climate": "गर्म, सूखा मौसम (20°C - 35°C), कम वर्षा (महाराष्ट्र/नासिक)",
        "harvest_season": "जनवरी - अप्रैल (Winter/Spring)",
        "nutrition": "रेस्वेराट्रोल (हार्ट हेल्थ), एंटीऑक्सीडेंट्स",
        "common_threats": ["डाउनी मिल्ड्यू (Downy Mildew)", "पाउडरी मिल्ड्यू", "थ्रिप्स"],
        "organic_care": "बोर्डो मिश्रण (0.8%) व सल्फर डस्टिंग कवक रोकथाम हेतु करें।",
        "chemical_care": "एजोक्सीस्ट्रोबिन (1ml/L) डाउनी मिल्ड्यू के नियंत्रण में छिड़कें।",
        "market_rate_per_kg": "₹70 - ₹160 प्रति किलो"
    }
}
