"""
Comprehensive Crop Knowledge Base, Soil Advisory Engine, and Market Pricing
Covers all 30 classes from the Agricultural-crops dataset.
"""

CROP_DATABASE = {
    "Cherry": {
        "display_name": "Cherry (Prunus avium)",
        "category": "Fruit / Horticulture",
        "season": "Perennial (Spring Blossom, Summer Harvest)",
        "soil": "Well-drained deep sandy loam (pH 6.0 - 7.5)",
        "ideal_temp": "15°C - 25°C (Requires chilling hours)",
        "water_req": "Moderate (600 - 800 mm/yr)",
        "harvest_days": "60 - 80 days post bloom",
        "npk_ratio": "100:50:100 kg/ha",
        "fertilizer_tips": "Apply well-rotted farmyard manure in winter; split nitrogen application in early spring.",
        "pests": ["Cherry fruit fly", "Aphids", "Bacterial canker"],
        "organic_remedy": "Neem oil spray (3ml/L) and copper oxychloride for fungal canker control.",
        "avg_yield_per_acre_qtl": 25,
        "mandi_rate_per_qtl": 14000,
        "peak_selling_month": "May - July",
        "npk_profile": {"N": 60, "P": 45, "K": 80, "temp": 20, "humidity": 65, "ph": 6.8, "rainfall": 70}
    },
    "Coffee-plant": {
        "display_name": "Coffee Plant (Coffea arabica / robusta)",
        "category": "Plantation / Cash Crop",
        "season": "Perennial (Monsoon Growth, Winter Harvest)",
        "soil": "Rich volcanic / porous forest loam with humus (pH 5.5 - 6.5)",
        "ideal_temp": "18°C - 28°C (High shade required)",
        "water_req": "High (1500 - 2500 mm/yr)",
        "harvest_days": "7 - 9 months for berries",
        "npk_ratio": "120:90:120 kg/ha",
        "fertilizer_tips": "Split NPK application pre-monsoon and post-monsoon; mulch heavily with coffee pulp.",
        "pests": ["Coffee berry borer", "White stem borer", "Leaf rust"],
        "organic_remedy": "Beauveria bassiana bio-pesticide spray for berry borer; Bordeaux mixture (1%) for rust.",
        "avg_yield_per_acre_qtl": 8,
        "mandi_rate_per_qtl": 28000,
        "peak_selling_month": "November - February",
        "npk_profile": {"N": 100, "P": 70, "K": 95, "temp": 23, "humidity": 80, "ph": 6.0, "rainfall": 180}
    },
    "Cucumber": {
        "display_name": "Cucumber (Cucumis sativus)",
        "category": "Vegetable / Zaid",
        "season": "Zaid / Summer (Feb - June)",
        "soil": "Sandy loam rich in organic matter (pH 6.0 - 7.0)",
        "ideal_temp": "22°C - 32°C",
        "water_req": "Moderate (Drip irrigation advised)",
        "harvest_days": "45 - 60 days",
        "npk_ratio": "75:50:50 kg/ha",
        "fertilizer_tips": "Basal dose of DAP and Potash; foliar spray of micronutrients at flowering.",
        "pests": ["Fruit fly", "Red pumpkin beetle", "Powdery mildew"],
        "organic_remedy": "Pheromone traps for fruit flies; wettable sulfur (2g/L) for powdery mildew.",
        "avg_yield_per_acre_qtl": 50,
        "mandi_rate_per_qtl": 2200,
        "peak_selling_month": "March - May",
        "npk_profile": {"N": 80, "P": 50, "K": 60, "temp": 28, "humidity": 60, "ph": 6.5, "rainfall": 50}
    },
    "Fox_nut(Makhana)": {
        "display_name": "Fox Nut / Makhana (Euryale ferox)",
        "category": "Aquatic Cash Crop",
        "season": "Summer - Autumn (December to August)",
        "soil": "Heavy clayey marshland / wetland soil rich in organic matter",
        "ideal_temp": "20°C - 35°C (Wetland ponds)",
        "water_req": "Very High (Standing water 1-1.5 ft required)",
        "harvest_days": "180 - 210 days",
        "npk_ratio": "100:60:40 kg/ha in pond mud",
        "fertilizer_tips": "Incorporate vermicompost and mustard oil cake directly into pond beds before seeding.",
        "pests": ["Aphids", "Root borers", "Algal bloom interference"],
        "organic_remedy": "Botanical extracts of tobacco and neem cake in water bodies; water circulation.",
        "avg_yield_per_acre_qtl": 14,
        "mandi_rate_per_qtl": 65000,
        "peak_selling_month": "August - October",
        "npk_profile": {"N": 90, "P": 60, "K": 50, "temp": 30, "humidity": 85, "ph": 7.0, "rainfall": 200}
    },
    "Lemon": {
        "display_name": "Lemon / Citrus (Citrus limon)",
        "category": "Fruit / Horticulture",
        "season": "Perennial (Harvest in July-Sept & Dec-Feb)",
        "soil": "Well-drained light loamy soil (pH 5.5 - 7.5)",
        "ideal_temp": "20°C - 34°C",
        "water_req": "Moderate (Avoid waterlogging)",
        "harvest_days": "150 days from fruit set",
        "npk_ratio": "300:200:300 g/tree/year",
        "fertilizer_tips": "Zinc sulfate (0.5%) spray during new flush; apply bone meal and potassium sulfate.",
        "pests": ["Citrus psylla", "Leaf miner", "Citrus canker"],
        "organic_remedy": "Imidacloprid alternative: Neem seed kernel extract (NSKE 5%) + Copper spray.",
        "avg_yield_per_acre_qtl": 45,
        "mandi_rate_per_qtl": 4500,
        "peak_selling_month": "March - June",
        "npk_profile": {"N": 70, "P": 40, "K": 70, "temp": 27, "humidity": 65, "ph": 6.8, "rainfall": 75}
    },
    "Olive-tree": {
        "display_name": "Olive Tree (Olea europaea)",
        "category": "Oilseed / Plantation",
        "season": "Perennial (Autumn - Winter harvest)",
        "soil": "Calcareous, well-drained rocky / sandy soil (pH 6.5 - 8.2)",
        "ideal_temp": "15°C - 30°C (Requires dry summers)",
        "water_req": "Low to Moderate (Drought tolerant)",
        "harvest_days": "180 days post flowering",
        "npk_ratio": "80:40:100 kg/ha",
        "fertilizer_tips": "Add Boron (20g/tree) and Potassium nitrate during fruit swelling phase.",
        "pests": ["Olive fruit fly", "Scale insects", "Peacock spot"],
        "organic_remedy": "Spinosad bait sprays for fruit fly; copper hydroxide for fungal spots.",
        "avg_yield_per_acre_qtl": 18,
        "mandi_rate_per_qtl": 16000,
        "peak_selling_month": "October - December",
        "npk_profile": {"N": 45, "P": 35, "K": 75, "temp": 22, "humidity": 50, "ph": 7.6, "rainfall": 45}
    },
    "Pearl_millet(bajra)": {
        "display_name": "Pearl Millet / Bajra (Pennisetum glaucum)",
        "category": "Cereal / Coarse Grain",
        "season": "Kharif (June - October)",
        "soil": "Sandy loam to light black soil (pH 6.5 - 8.0)",
        "ideal_temp": "25°C - 35°C",
        "water_req": "Low (350 - 500 mm)",
        "harvest_days": "80 - 95 days",
        "npk_ratio": "80:40:30 kg/ha",
        "fertilizer_tips": "Half N with full P and K at sowing; remaining N top-dressed at 30 days.",
        "pests": ["Downy mildew (Green ear)", "Shoot fly", "Stem borer"],
        "organic_remedy": "Seed treatment with Trichoderma viride (4g/kg); carbofuran only if severe.",
        "avg_yield_per_acre_qtl": 15,
        "mandi_rate_per_qtl": 2450,
        "peak_selling_month": "October - December",
        "npk_profile": {"N": 65, "P": 40, "K": 35, "temp": 32, "humidity": 45, "ph": 7.2, "rainfall": 40}
    },
    "Tobacco-plant": {
        "display_name": "Tobacco Plant (Nicotiana tabacum)",
        "category": "Commercial Cash Crop",
        "season": "Rabi (October - March)",
        "soil": "Light sandy to red loamy soil with low chloride (pH 5.5 - 6.5)",
        "ideal_temp": "20°C - 30°C",
        "water_req": "Moderate (500 - 650 mm)",
        "harvest_days": "100 - 120 days",
        "npk_ratio": "40:60:60 kg/ha (SOP preferred over MOP)",
        "fertilizer_tips": "Use Sulfate of Potash (SOP) strictly to maintain leaf burning quality.",
        "pests": ["Tobacco caterpillar", "Aphids", "Root knot nematode"],
        "organic_remedy": "Pheromone traps for Spodoptera litura; neem cake application for nematodes.",
        "avg_yield_per_acre_qtl": 12,
        "mandi_rate_per_qtl": 18500,
        "peak_selling_month": "February - April",
        "npk_profile": {"N": 50, "P": 65, "K": 70, "temp": 25, "humidity": 65, "ph": 6.2, "rainfall": 60}
    },
    "almond": {
        "display_name": "Almond (Prunus dulcis)",
        "category": "Nut / Horticulture",
        "season": "Perennial (Spring bloom, Late Summer harvest)",
        "soil": "Deep, loamy, well-aerated fertile soils (pH 6.5 - 7.5)",
        "ideal_temp": "15°C - 30°C (Requires cold winter dormancy)",
        "water_req": "Moderate (Drip irrigation essential in summer)",
        "harvest_days": "210 - 240 days from flowering",
        "npk_ratio": "120:60:150 kg/ha",
        "fertilizer_tips": "Zinc and Boron spray during pink bud stage; split potassium throughout summer.",
        "pests": ["Navel orangeworm", "Spider mites", "Shot hole disease"],
        "organic_remedy": "Bacillus thuringiensis (Bt) for worm control; sulfur sprays for mites.",
        "avg_yield_per_acre_qtl": 16,
        "mandi_rate_per_qtl": 62000,
        "peak_selling_month": "August - October",
        "npk_profile": {"N": 80, "P": 50, "K": 110, "temp": 22, "humidity": 55, "ph": 7.0, "rainfall": 55}
    },
    "banana": {
        "display_name": "Banana (Musa acuminata)",
        "category": "Fruit / Commercial",
        "season": "Year-round (Planting in June-July or Sept-Oct)",
        "soil": "Rich clay loam to alluvial soil (pH 6.5 - 7.5)",
        "ideal_temp": "25°C - 35°C",
        "water_req": "Very High (1800 - 2200 mm)",
        "harvest_days": "11 - 13 months",
        "npk_ratio": "200:60:300 g/plant/year",
        "fertilizer_tips": "High potassium demand. Fertigate in 4 split doses; spray 2% potassium sulfate on bunches.",
        "pests": ["Pseudostem weevil", "Banana aphid (Bunchy top vector)", "Sigatoka leaf spot"],
        "organic_remedy": "Stem injection of Beauveria bassiana; mineral oil spray for Sigatoka.",
        "avg_yield_per_acre_qtl": 180,
        "mandi_rate_per_qtl": 2100,
        "peak_selling_month": "September - November",
        "npk_profile": {"N": 120, "P": 60, "K": 140, "temp": 29, "humidity": 80, "ph": 6.8, "rainfall": 170}
    },
    "cardamom": {
        "display_name": "Cardamom / Queen of Spices (Elettaria cardamomum)",
        "category": "Spice / Cash Crop",
        "season": "Perennial (Harvest August - February)",
        "soil": "Forest loam rich in organic matter (pH 5.0 - 6.5)",
        "ideal_temp": "15°C - 28°C (High shade required)",
        "water_req": "High (2000 - 3500 mm)",
        "harvest_days": "30 - 40 days intervals during season",
        "npk_ratio": "75:75:150 kg/ha",
        "fertilizer_tips": "Heavy organic mulching; apply neem cake (1kg/clump) with biofertilizers.",
        "pests": ["Thrips", "Shoot and capsule borer", "Azhukal rot"],
        "organic_remedy": "Verticillium lecanii spray for thrips; Pseudomonas fluorescens drenching for rot.",
        "avg_yield_per_acre_qtl": 3,
        "mandi_rate_per_qtl": 185000,
        "peak_selling_month": "September - January",
        "npk_profile": {"N": 70, "P": 75, "K": 120, "temp": 21, "humidity": 85, "ph": 5.8, "rainfall": 220}
    },
    "chilli": {
        "display_name": "Chilli / Red Pepper (Capsicum annuum)",
        "category": "Spice / Vegetable",
        "season": "Kharif & Rabi (Transplanting June or October)",
        "soil": "Well-drained black clay or sandy loam (pH 6.5 - 7.5)",
        "ideal_temp": "20°C - 30°C",
        "water_req": "Moderate (600 - 800 mm)",
        "harvest_days": "75 - 90 days after transplanting",
        "npk_ratio": "120:60:60 kg/ha",
        "fertilizer_tips": "Apply 50% N + full P & K at transplanting; remaining N in two top dressings.",
        "pests": ["Thrips", "Mites", "Anthracnose / Die-back"],
        "organic_remedy": "Yellow and blue sticky traps; garlic-chilli extract + neem oil (5ml/L).",
        "avg_yield_per_acre_qtl": 22,
        "mandi_rate_per_qtl": 18000,
        "peak_selling_month": "January - April",
        "npk_profile": {"N": 90, "P": 55, "K": 60, "temp": 26, "humidity": 65, "ph": 6.8, "rainfall": 70}
    },
    "clove": {
        "display_name": "Clove (Syzygium aromaticum)",
        "category": "Spice / Plantation",
        "season": "Perennial (Flowering Sept - Nov, Harvest Dec - Feb)",
        "soil": "Rich red loams and laterite soils (pH 5.5 - 6.5)",
        "ideal_temp": "20°C - 30°C (Coastal hill climate)",
        "water_req": "High (1500 - 2500 mm)",
        "harvest_days": "Unopened flower buds harvested manually",
        "npk_ratio": "300:250:750 g/tree/year",
        "fertilizer_tips": "Apply bone meal, wood ash, and cow dung in circular trenches around canopy.",
        "pests": ["Stem borer", "Scale insects", "Leaf rot"],
        "organic_remedy": "Swabbing carbaryl paste on trunk for borer; Bordeaux paste on cuts.",
        "avg_yield_per_acre_qtl": 4,
        "mandi_rate_per_qtl": 75000,
        "peak_selling_month": "January - March",
        "npk_profile": {"N": 80, "P": 60, "K": 110, "temp": 25, "humidity": 80, "ph": 6.0, "rainfall": 190}
    },
    "coconut": {
        "display_name": "Coconut (Cocos nucifera)",
        "category": "Plantation / Oilseed",
        "season": "Perennial (Monthly harvesting cycle)",
        "soil": "Coastal sands, alluvial or red sandy loams (pH 5.5 - 8.0)",
        "ideal_temp": "25°C - 35°C (High sunlight & humidity)",
        "water_req": "High (1500 - 2500 mm)",
        "harvest_days": "Every 45 days per mature palm",
        "npk_ratio": "500:320:1200 g/palm/year",
        "fertilizer_tips": "High requirement for potassium and common salt (NaCl 1kg/palm) for nut weight.",
        "pests": ["Rhinoceros beetle", "Red palm weevil", "Eriophyid mite"],
        "organic_remedy": "Metarhizium anisopliae fungus for beetles; neem-garlic emulsion for mites.",
        "avg_yield_per_acre_qtl": 70,
        "mandi_rate_per_qtl": 3600,
        "peak_selling_month": "Year-round",
        "npk_profile": {"N": 85, "P": 45, "K": 130, "temp": 28, "humidity": 82, "ph": 7.0, "rainfall": 160}
    },
    "cotton": {
        "display_name": "Cotton / White Gold (Gossypium hirsutum)",
        "category": "Fibre / Cash Crop",
        "season": "Kharif (April - May sowing, Oct - Dec harvest)",
        "soil": "Deep Black cotton soil / Vertisol (pH 6.5 - 8.5)",
        "ideal_temp": "25°C - 35°C",
        "water_req": "Moderate (650 - 1000 mm)",
        "harvest_days": "150 - 180 days",
        "npk_ratio": "120:60:60 kg/ha",
        "fertilizer_tips": "Foliar spray of 2% DAP and 1% MgSO4 at square formation and boll development.",
        "pests": ["Pink bollworm", "Whitefly", "Jassids"],
        "organic_remedy": "Install pheromone traps (Phero-Sensor); spray NSKE 5% for sucking pests.",
        "avg_yield_per_acre_qtl": 14,
        "mandi_rate_per_qtl": 7300,
        "peak_selling_month": "November - February",
        "npk_profile": {"N": 110, "P": 50, "K": 55, "temp": 30, "humidity": 60, "ph": 7.5, "rainfall": 75}
    },
    "gram": {
        "display_name": "Bengal Gram / Chickpea (Cicer arietinum)",
        "category": "Pulse / Legume",
        "season": "Rabi (October - November sowing)",
        "soil": "Well-drained clay loam to medium black soil (pH 6.0 - 7.5)",
        "ideal_temp": "15°C - 25°C",
        "water_req": "Low (250 - 400 mm, Sensitive to excess moisture)",
        "harvest_days": "90 - 110 days",
        "npk_ratio": "20:50:20 kg/ha (Rhizobium inoculated)",
        "fertilizer_tips": "Nitrogen fixation crop. Seed inoculation with Rhizobium and PSB culture.",
        "pests": ["Gram pod borer (Helicoverpa armigera)", "Fusarium wilt", "Collar rot"],
        "organic_remedy": "HaNPV virus spray (250 LE/ha); bird perches (15/acre) to control caterpillars.",
        "avg_yield_per_acre_qtl": 10,
        "mandi_rate_per_qtl": 6200,
        "peak_selling_month": "March - May",
        "npk_profile": {"N": 25, "P": 60, "K": 30, "temp": 20, "humidity": 45, "ph": 7.0, "rainfall": 35}
    },
    "jowar": {
        "display_name": "Sorghum / Jowar (Sorghum bicolor)",
        "category": "Cereal / Millet",
        "season": "Kharif & Rabi (June - July / Sept - Oct)",
        "soil": "Clayey to loamy black soil (pH 6.0 - 8.5)",
        "ideal_temp": "25°C - 34°C (High drought resistance)",
        "water_req": "Low (400 - 550 mm)",
        "harvest_days": "100 - 115 days",
        "npk_ratio": "80:40:40 kg/ha",
        "fertilizer_tips": "Apply full P, K and half N at sowing time; remaining N at panicle initiation.",
        "pests": ["Sorghum shoot fly", "Stem borer", "Grain mold"],
        "organic_remedy": "Early sowing escapes shoot fly; neem seed extract (5%) for stem borer.",
        "avg_yield_per_acre_qtl": 16,
        "mandi_rate_per_qtl": 3150,
        "peak_selling_month": "October - December",
        "npk_profile": {"N": 75, "P": 40, "K": 40, "temp": 30, "humidity": 50, "ph": 7.2, "rainfall": 50}
    },
    "jute": {
        "display_name": "Jute / Golden Fibre (Corchorus capsularis)",
        "category": "Fibre Crop",
        "season": "Kharif / Pre-monsoon (March - May)",
        "soil": "Alluvial, loamy to sandy-loam deltaic soil (pH 6.0 - 7.5)",
        "ideal_temp": "24°C - 35°C (High warmth and humidity)",
        "water_req": "High (1200 - 1500 mm, Standing water tolerating)",
        "harvest_days": "120 - 135 days (Harvest at 50% flowering)",
        "npk_ratio": "60:30:30 kg/ha",
        "fertilizer_tips": "Foliar application of 1.5% urea twice at 35 and 50 days after sowing.",
        "pests": ["Jute semilooper", "Yellow mite", "Stem rot"],
        "organic_remedy": "Perches for predatory birds; spray wettable sulfur for yellow mites.",
        "avg_yield_per_acre_qtl": 15,
        "mandi_rate_per_qtl": 5200,
        "peak_selling_month": "August - October",
        "npk_profile": {"N": 70, "P": 35, "K": 35, "temp": 31, "humidity": 85, "ph": 6.8, "rainfall": 150}
    },
    "maize": {
        "display_name": "Maize / Corn (Zea mays)",
        "category": "Cereal / Food & Feed",
        "season": "Kharif, Rabi & Spring",
        "soil": "Deep, well-drained fertile loam rich in organic matter (pH 6.5 - 7.5)",
        "ideal_temp": "21°C - 30°C",
        "water_req": "Moderate (500 - 750 mm)",
        "harvest_days": "90 - 110 days",
        "npk_ratio": "120:60:40 kg/ha + 25 kg ZnSO4",
        "fertilizer_tips": "Zinc application is mandatory to avoid white bud disorder; split N at knee-high and tasseling.",
        "pests": ["Fall armyworm (Spodoptera frugiperda)", "Stem borer", "Turcicum leaf blight"],
        "organic_remedy": "Whorl application of sand + lime mixture; Metarhizium rileyi for armyworm.",
        "avg_yield_per_acre_qtl": 30,
        "mandi_rate_per_qtl": 2250,
        "peak_selling_month": "October - December",
        "npk_profile": {"N": 115, "P": 60, "K": 45, "temp": 26, "humidity": 65, "ph": 6.9, "rainfall": 70}
    },
    "mustard-oil": {
        "display_name": "Mustard / Rapeseed (Brassica juncea)",
        "category": "Oilseed / Cash Crop",
        "season": "Rabi (October - November sowing)",
        "soil": "Sandy loam to light alluvial soil (pH 6.0 - 7.5)",
        "ideal_temp": "15°C - 25°C",
        "water_req": "Low (250 - 400 mm, 2-3 irrigations)",
        "harvest_days": "110 - 130 days",
        "npk_ratio": "80:40:40 kg/ha + 20 kg Sulphur",
        "fertilizer_tips": "Sulphur application (20-30 kg/ha) increases oil content by 2.5-3%.",
        "pests": ["Mustard aphid (Lipaphis erysimi)", "Painted bug", "White rust"],
        "organic_remedy": "Yellow sticky cards (25/ha); spray Verticillium lecanii or soap oil solution for aphids.",
        "avg_yield_per_acre_qtl": 10,
        "mandi_rate_per_qtl": 5800,
        "peak_selling_month": "March - May",
        "npk_profile": {"N": 70, "P": 45, "K": 40, "temp": 19, "humidity": 55, "ph": 6.8, "rainfall": 40}
    },
    "papaya": {
        "display_name": "Papaya (Carica papaya)",
        "category": "Fruit / Horticulture",
        "season": "Year-round (Planting June-Sept or Jan-Feb)",
        "soil": "Rich, porous loam with exceptional drainage (pH 6.0 - 7.0)",
        "ideal_temp": "25°C - 35°C (Extremely sensitive to frost)",
        "water_req": "High (Regular watering, avoid collar rot)",
        "harvest_days": "9 - 11 months from planting",
        "npk_ratio": "250:250:500 g/plant/year",
        "fertilizer_tips": "Apply in bi-monthly split doses; Boron (0.1%) spray prevents fruit bumpy disorder.",
        "pests": ["Papaya ringspot virus (Aphid-borne)", "Mealybug", "Collar rot / Pythium"],
        "organic_remedy": "Silver reflective mulch to deter aphids; Trichoderma viride around root zone for collar rot.",
        "avg_yield_per_acre_qtl": 140,
        "mandi_rate_per_qtl": 2600,
        "peak_selling_month": "Year-round",
        "npk_profile": {"N": 100, "P": 80, "K": 120, "temp": 28, "humidity": 75, "ph": 6.5, "rainfall": 120}
    },
    "pineapple": {
        "display_name": "Pineapple (Ananas comosus)",
        "category": "Fruit / Tropical Cash Crop",
        "season": "Perennial (Main harvest July - September)",
        "soil": "Acidic sandy loam to laterite (pH 4.5 - 5.5)",
        "ideal_temp": "22°C - 32°C",
        "water_req": "Moderate (1000 - 1500 mm)",
        "harvest_days": "15 - 18 months from suckers",
        "npk_ratio": "12:4:12 g/plant in 4-6 splits",
        "fertilizer_tips": "High potassium promotes fruit sweetness and shelf life; apply foliar iron and zinc.",
        "pests": ["Mealybug wilt", "Heart rot (Phytophthora)", "Nematodes"],
        "organic_remedy": "Dip suckers in bio-fungicide before planting; control ants that foster mealybugs.",
        "avg_yield_per_acre_qtl": 110,
        "mandi_rate_per_qtl": 3400,
        "peak_selling_month": "June - August",
        "npk_profile": {"N": 80, "P": 40, "K": 100, "temp": 27, "humidity": 80, "ph": 5.0, "rainfall": 130}
    },
    "rice": {
        "display_name": "Paddy / Rice (Oryza sativa)",
        "category": "Cereal / Staple Grain",
        "season": "Kharif (June - Nov) & Rabi (Boro)",
        "soil": "Heavy clay or clayey loam holding standing water (pH 5.5 - 7.0)",
        "ideal_temp": "22°C - 34°C",
        "water_req": "Very High (1200 - 2000 mm, Standing water)",
        "harvest_days": "115 - 145 days",
        "npk_ratio": "120:60:60 kg/ha + 25 kg ZnSO4",
        "fertilizer_tips": "Split nitrogen in 3 doses (basal, tillering, panicle initiation). Maintain zinc level.",
        "pests": ["Yellow stem borer", "Brown planthopper (BPH)", "Blast / Bacterial leaf blight"],
        "organic_remedy": "Pheromone traps (8/acre) for stem borer; Pseudomonas fluorescens seed treatment.",
        "avg_yield_per_acre_qtl": 24,
        "mandi_rate_per_qtl": 2300,
        "peak_selling_month": "November - January",
        "npk_profile": {"N": 120, "P": 50, "K": 50, "temp": 28, "humidity": 85, "ph": 6.4, "rainfall": 180}
    },
    "soyabean": {
        "display_name": "Soybean (Glycine max)",
        "category": "Oilseed / Legume",
        "season": "Kharif (June - October)",
        "soil": "Well-drained fertile medium to deep black soils (pH 6.5 - 7.5)",
        "ideal_temp": "22°C - 32°C",
        "water_req": "Moderate (600 - 800 mm)",
        "harvest_days": "95 - 110 days",
        "npk_ratio": "30:60:40 kg/ha + 20 kg Sulphur",
        "fertilizer_tips": "Bradyrhizobium japonicum inoculation; basal application of single superphosphate (SSP).",
        "pests": ["Girdle beetle", "Tobacco caterpillar", "Yellow mosaic virus"],
        "organic_remedy": "Collect and destroy infested plant parts; spray Beauveria bassiana (1.5 kg/ha).",
        "avg_yield_per_acre_qtl": 11,
        "mandi_rate_per_qtl": 4800,
        "peak_selling_month": "October - December",
        "npk_profile": {"N": 35, "P": 65, "K": 45, "temp": 27, "humidity": 70, "ph": 7.0, "rainfall": 80}
    },
    "sugarcane": {
        "display_name": "Sugarcane (Saccharum officinarum)",
        "category": "Cash / Sugar Crop",
        "season": "Annual / Biennial (10 - 14 months)",
        "soil": "Deep, rich alluvial or heavy loam soils (pH 6.5 - 7.5)",
        "ideal_temp": "25°C - 35°C",
        "water_req": "Very High (1500 - 2500 mm)",
        "harvest_days": "300 - 360 days",
        "npk_ratio": "250:100:120 kg/ha",
        "fertilizer_tips": "Nitrogen applied in 4 split doses before earthing up; trash mulching conserves moisture.",
        "pests": ["Early shoot borer", "Top borer", "Red rot"],
        "organic_remedy": "Release Trichogramma chilonis egg parasitoids (50,000/ha); dip setts in carbendazim.",
        "avg_yield_per_acre_qtl": 350,
        "mandi_rate_per_qtl": 340,
        "peak_selling_month": "November - March",
        "npk_profile": {"N": 140, "P": 70, "K": 80, "temp": 30, "humidity": 75, "ph": 7.1, "rainfall": 160}
    },
    "sunflower": {
        "display_name": "Sunflower (Helianthus annuus)",
        "category": "Oilseed / Commercial",
        "season": "Kharif, Rabi & Spring",
        "soil": "Deep fertile soils with high water holding capacity (pH 6.5 - 8.0)",
        "ideal_temp": "20°C - 30°C",
        "water_req": "Moderate (500 - 650 mm)",
        "harvest_days": "85 - 100 days",
        "npk_ratio": "60:40:30 kg/ha + 20 kg Sulphur",
        "fertilizer_tips": "Boron (0.2% Borax spray) at ray floret stage prevents chaffy seed formation.",
        "pests": ["Head borer (Helicoverpa)", "Green leafhopper", "Alternaria blight"],
        "organic_remedy": "Install bird perches; spray Bacillus thuringiensis (2g/L) for head caterpillars.",
        "avg_yield_per_acre_qtl": 9,
        "mandi_rate_per_qtl": 5900,
        "peak_selling_month": "April - June",
        "npk_profile": {"N": 65, "P": 50, "K": 35, "temp": 26, "humidity": 60, "ph": 7.2, "rainfall": 60}
    },
    "tea": {
        "display_name": "Tea (Camellia sinensis)",
        "category": "Plantation / Beverage",
        "season": "Perennial (Plucking March - November)",
        "soil": "Acidic, friable, well-drained organic forest loam (pH 4.5 - 5.5)",
        "ideal_temp": "18°C - 30°C (High shade & mist)",
        "water_req": "High (1500 - 2500 mm)",
        "harvest_days": "Plucking rounds every 7 - 10 days",
        "npk_ratio": "150:40:120 kg/ha",
        "fertilizer_tips": "Zinc sulfate + Urea foliar spray increases tender shoot flushes; avoid lime.",
        "pests": ["Tea mosquito bug", "Red spider mite", "Blister blight"],
        "organic_remedy": "Entomopathogenic fungal formulations; botanical extract of Clerodendrum.",
        "avg_yield_per_acre_qtl": 18,
        "mandi_rate_per_qtl": 21000,
        "peak_selling_month": "May - October",
        "npk_profile": {"N": 90, "P": 40, "K": 85, "temp": 22, "humidity": 82, "ph": 5.0, "rainfall": 175}
    },
    "tomato": {
        "display_name": "Tomato (Solanum lycopersicum)",
        "category": "Vegetable / Commercial",
        "season": "Kharif, Rabi & Summer",
        "soil": "Well-drained sandy loam rich in humus (pH 6.0 - 7.2)",
        "ideal_temp": "20°C - 28°C",
        "water_req": "Moderate (600 - 800 mm)",
        "harvest_days": "70 - 90 days after transplanting",
        "npk_ratio": "100:60:60 kg/ha",
        "fertilizer_tips": "Calcium nitrate spray prevents blossom end rot; apply balanced fertigation weekly.",
        "pests": ["Fruit borer", "Leaf miner", "Early & late blight"],
        "organic_remedy": "Marigold intercropping as trap crop for fruit borers; Trichoderma seed coating.",
        "avg_yield_per_acre_qtl": 120,
        "mandi_rate_per_qtl": 2400,
        "peak_selling_month": "January - April",
        "npk_profile": {"N": 95, "P": 65, "K": 75, "temp": 25, "humidity": 65, "ph": 6.6, "rainfall": 65}
    },
    "vigna-radiati(Mung)": {
        "display_name": "Mung Bean / Green Gram (Vigna radiata)",
        "category": "Pulse / Legume",
        "season": "Kharif & Summer / Zaid",
        "soil": "Well-drained loamy to sandy loam (pH 6.5 - 7.5)",
        "ideal_temp": "25°C - 35°C",
        "water_req": "Low (300 - 450 mm)",
        "harvest_days": "60 - 75 days (Early maturing)",
        "npk_ratio": "20:40:20 kg/ha",
        "fertilizer_tips": "Rhizobium and PSB seed treatment; 2% DAP foliar spray at flowering increases pod set.",
        "pests": ["Whitefly (Yellow mosaic virus vector)", "Pod borer", "Powdery mildew"],
        "organic_remedy": "Grow YMV resistant varieties; install yellow sticky traps to capture whitefly vectors.",
        "avg_yield_per_acre_qtl": 7,
        "mandi_rate_per_qtl": 8400,
        "peak_selling_month": "May - June & Oct - Nov",
        "npk_profile": {"N": 20, "P": 50, "K": 25, "temp": 30, "humidity": 55, "ph": 7.0, "rainfall": 45}
    },
    "wheat": {
        "display_name": "Wheat (Triticum aestivum)",
        "category": "Cereal / Rabi Staple",
        "season": "Rabi (November sowing, March - April harvest)",
        "soil": "Well-aerated fertile loamy to clay loam (pH 6.5 - 7.8)",
        "ideal_temp": "15°C - 24°C (Requires cool vegetative period)",
        "water_req": "Moderate (400 - 550 mm, 4-6 key irrigations)",
        "harvest_days": "115 - 135 days",
        "npk_ratio": "120:60:40 kg/ha",
        "fertilizer_tips": "Critical first irrigation and nitrogen top dress at Crown Root Initiation (CRI) stage.",
        "pests": ["Wheat aphid", "Yellow / Brown rust", "Termites"],
        "organic_remedy": "Chlorpyrifos alternative: seed treatment with neem oil; rust-resistant high yield seeds.",
        "avg_yield_per_acre_qtl": 20,
        "mandi_rate_per_qtl": 2425,
        "peak_selling_month": "April - June",
        "npk_profile": {"N": 105, "P": 55, "K": 40, "temp": 18, "humidity": 50, "ph": 7.1, "rainfall": 45}
    }
}

PROJECT_TEAM = [
    {
        "name": "Abhishek Kushwaha",
        "role": "Team Lead & ML Architect",
        "tag": "Lead Developer",
        "avatar_bg": "linear-gradient(135deg, #10b981, #047857)",
        "initials": "AK",
        "responsibilities": [
            "MobileNetV2 Deep Transfer Learning Architecture",
            "Model Training, Validation & Hyperparameter Optimization",
            "Inference Pipeline & Real-Time Performance Benchmarking"
        ]
    },
    {
        "name": "Jaya Maurya",
        "role": "Data Scientist & Dataset Engineering",
        "tag": "Data Specialist",
        "avatar_bg": "linear-gradient(135deg, #3b82f6, #1d4ed8)",
        "initials": "JM",
        "responsibilities": [
            "30-Class Agricultural Dataset Cleansing & Curation",
            "Data Augmentation (Rotation, Zoom, Flip, Shear)",
            "Class Distribution Balancing & Stratified Validation"
        ]
    },
    {
        "name": "Aman Gupta",
        "role": "Full Stack & Backend Systems",
        "tag": "Backend Engineer",
        "avatar_bg": "linear-gradient(135deg, #8b5cf6, #6d28d9)",
        "initials": "AG",
        "responsibilities": [
            "Flask REST API Service Architecture & Serving",
            "SQLite Authentication & Session Management",
            "Soil Recommender & Mandi Yield Calculation Engines"
        ]
    },
    {
        "name": "Mriganka Singh",
        "role": "Frontend UI/UX & System Design",
        "tag": "UI/UX Designer",
        "avatar_bg": "linear-gradient(135deg, #ec4899, #be185d)",
        "initials": "MS",
        "responsibilities": [
            "Responsive Glassmorphic UI Dashboard Layout",
            "Interactive 5-Stage AI Pipeline Roadmap Design",
            "Agronomic Interactive Calculators & Visual Visualizers"
        ]
    }
]

def calculate_soil_compatibility(user_params):
    """
    Given user parameters:
    {'N': float, 'P': float, 'K': float, 'temp': float, 'humidity': float, 'ph': float, 'rainfall': float}
    Calculates weighted Euclidean / similarity score across all 30 crops.
    Returns ranked list of crops with match percentage and advice.
    """
    scores = []
    
    weights = {
        "N": 0.20,
        "P": 0.15,
        "K": 0.15,
        "temp": 0.15,
        "humidity": 0.10,
        "ph": 0.10,
        "rainfall": 0.15
    }

    max_ranges = {
        "N": 140.0,
        "P": 100.0,
        "K": 150.0,
        "temp": 45.0,
        "humidity": 100.0,
        "ph": 14.0,
        "rainfall": 300.0
    }

    for crop_key, crop_info in CROP_DATABASE.items():
        profile = crop_info.get("npk_profile")
        if not profile:
            continue
            
        penalty = 0.0
        for param, weight in weights.items():
            ideal = profile.get(param, 50.0)
            actual = float(user_params.get(param, ideal))
            max_r = max_ranges[param]
            diff = abs(actual - ideal) / max_r
            penalty += weight * (diff ** 1.3)
            
        match_pct = max(15.0, round((1.0 - min(penalty, 0.85)) * 100, 1))
        
        scores.append({
            "crop_key": crop_key,
            "display_name": crop_info["display_name"],
            "category": crop_info["category"],
            "season": crop_info["season"],
            "match_pct": match_pct,
            "ideal_soil": crop_info["soil"],
            "water_req": crop_info["water_req"],
            "avg_yield": crop_info["avg_yield_per_acre_qtl"],
            "mandi_rate": crop_info["mandi_rate_per_qtl"],
            "fertilizer_tips": crop_info["fertilizer_tips"]
        })

    scores.sort(key=lambda x: x["match_pct"], reverse=True)
    return scores
