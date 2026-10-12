import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sprout, 
  ShieldAlert, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  Cpu, 
  TrendingUp, 
  FlaskConical, 
  CloudSun 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function HomePage({ setCurrentView, lang: propLang }) {
  const { lang: authLang } = useAuth();
  const navigate = useNavigate();
  const lang = propLang || authLang || 'hi';
  const isHi = lang === 'hi';

  const goTo = (view, path) => {
    if (setCurrentView) setCurrentView(view);
    navigate(path);
  };

  return (
    <div className="fm-home-page">
      {/* 1. HERO BANNER */}
      <section className="fm-hero-banner">
        <div className="fm-hero-content">
          <div className="fm-badge-trust">
            <CheckCircle2 size={16} color="var(--primary-forest)" />
            <span>
              {isHi ? 'भारतीय कृषि विज्ञान पर आधारित' : 'Based on Indian Agricultural Science'}
            </span>
          </div>

          <h1 className="fm-hero-title">
            {isHi ? (
              <>सही फसल का चुनाव करें,<br />खेत में लाएं खुशहाली।</>
            ) : (
              <>Choose the Right Crop,<br />Ensure Better Harvests.</>
            )}
          </h1>

          <p className="fm-hero-subtitle">
            {isHi ? (
              'फसलमित्र आपकी मिट्टी (N, P, K, pH) और स्थानीय मौसम के अनुसार सबसे उपयुक्त फसल और खाद की सही मात्रा बताता है।'
            ) : (
              'FasalMitra helps you find the most suitable crops and exact fertilizer requirements based on your soil and local climate.'
            )}
          </p>

          {/* Core Call to Actions */}
          <div className="fm-hero-actions">
            <button
              type="button"
              className="fm-btn fm-btn-primary"
              onClick={() => goTo('crop-recommendation', '/crop-recommendation')}
            >
              <Sprout size={20} />
              <span>{isHi ? 'फसल की सलाह लें' : 'Get Crop Advice'}</span>
              <ArrowRight size={18} />
            </button>

            <button
              type="button"
              className="fm-btn fm-btn-secondary"
              onClick={() => goTo('disease-detection', '/disease-detection')}
            >
              <ShieldAlert size={20} />
              <span>{isHi ? 'पौधे की बीमारी पहचानें' : 'Diagnose Plant Disease'}</span>
            </button>
          </div>
        </div>

        {/* Right Assurance Box */}
        <div className="fm-hero-badge-box">
          <div className="fm-badge-item">
            <CheckCircle2 size={18} color="var(--primary-forest)" />
            <span>{isHi ? '22 प्रमुख भारतीय फसलें' : '22 Major Indian Crops'}</span>
          </div>
          <div className="fm-badge-item">
            <CheckCircle2 size={18} color="var(--primary-forest)" />
            <span>{isHi ? 'प्रमाणित मृदा परीक्षण डेटा' : 'Standard Soil Test Norms'}</span>
          </div>
          <div className="fm-badge-item">
            <CheckCircle2 size={18} color="var(--primary-forest)" />
            <span>{isHi ? '100% निःशुल्क किसान सेवा' : '100% Free Farmer Service'}</span>
          </div>
          <div className="fm-badge-item">
            <CheckCircle2 size={18} color="var(--primary-forest)" />
            <span>{isHi ? 'मोबाइल व कंप्यूटर पर सुलभ' : 'Works on Mobile & Desktop'}</span>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS (यह कैसे काम करता है?) */}
      <section style={{ marginBottom: 'var(--space-2xl)' }}>
        <div className="fm-section-heading">
          <h2 className="fm-section-title">
            {isHi ? 'यह कैसे काम करता है?' : 'How FasalMitra Works'}
          </h2>
          <p className="fm-section-subtitle">
            {isHi 
              ? 'तीन सरल चरणों में अपने खेत के लिए सही निर्णय लें।' 
              : 'Make informed decisions for your farm in three simple steps.'}
          </p>
        </div>

        <div className="fm-steps-grid">
          {/* Step 1 */}
          <div className="fm-step-card">
            <div className="fm-step-num">1</div>
            <h3 className="fm-step-title">
              {isHi ? 'खेत व मिट्टी का विवरण दें' : 'Enter Soil & Farm Details'}
            </h3>
            <p className="fm-step-desc">
              {isHi 
                ? 'अपने मृदा स्वास्थ्य कार्ड (Soil Health Card) से नाइट्रोजन, फास्फोरस, पोटाश और pH मान दर्ज करें।' 
                : 'Enter Nitrogen (N), Phosphorus (P), Potassium (K) and pH values from your soil health card.'}
            </p>
          </div>

          {/* Step 2 */}
          <div className="fm-step-card">
            <div className="fm-step-num">2</div>
            <h3 className="fm-step-title">
              {isHi ? 'वैज्ञानिक मॉडल द्वारा गणना' : 'Scientific Model Calculation'}
            </h3>
            <p className="fm-step-desc">
              {isHi 
                ? 'प्रमाणित कृषि मॉडल आपकी मिट्टी के पोषक तत्वों और स्थानीय मौसम के अनुकूल फसलों का मिलान करता है।' 
                : 'Verified agronomic model evaluates nutrient availability against ideal crop growth requirements.'}
            </p>
          </div>

          {/* Step 3 */}
          <div className="fm-step-card">
            <div className="fm-step-num">3</div>
            <h3 className="fm-step-title">
              {isHi ? 'सही फसल व खाद की सलाह पाएं' : 'Get Crop & Fertilizer Advice'}
            </h3>
            <p className="fm-step-desc">
              {isHi 
                ? 'अधिकतम उपज देने वाली फसल, वैकल्पिक विकल्प और प्रति एकड़ यूरिया/डीएपी की सही मात्रा जानें।' 
                : 'Receive the best suited crop recommendation, alternatives, and exact fertilizer bags per acre.'}
            </p>
          </div>
        </div>
      </section>

      {/* 3. KEY ADVISORY SERVICES */}
      <section>
        <div className="fm-section-heading">
          <h2 className="fm-section-title">
            {isHi ? 'किसानों के लिए मुख्य सेवाएं' : 'Key Services for Farmers'}
          </h2>
          <p className="fm-section-subtitle">
            {isHi ? 'फसल की बुवाई से लेकर कटाई तक का संपूर्ण समाधान।' : 'Comprehensive agricultural support from sowing to harvesting.'}
          </p>
        </div>

        <div className="fm-features-grid">
          <div className="fm-feature-box">
            <div className="fm-feature-icon">
              <FlaskConical size={22} />
            </div>
            <div className="fm-feature-text">
              <h4>{isHi ? 'मृदा आधारित फसल सिफारिश' : 'Soil-Based Crop Advice'}</h4>
              <p>
                {isHi 
                  ? 'मिट्टी की उर्वरता के अनुसार सही फसल का चयन जिससे लागत घटे और मुनाफा बढ़े।' 
                  : 'Optimize crop selection based on soil fertility to lower input cost and maximize yield.'}
              </p>
            </div>
          </div>

          <div className="fm-feature-box">
            <div className="fm-feature-icon">
              <ShieldAlert size={22} />
            </div>
            <div className="fm-feature-text">
              <h4>{isHi ? 'पत्ती रोग निदान व जैविक उपचार' : 'Leaf Disease Diagnosis & Cure'}</h4>
              <p>
                {isHi 
                  ? 'रोगग्रस्त पत्ते की तस्वीर लेकर बीमारी की पहचान और सुरक्षित फफूंदनाशक/नीम तेल का परामर्श।' 
                  : 'Identify foliar pathogens early and receive validated bio-control and fungicide remedies.'}
              </p>
            </div>
          </div>

          <div className="fm-feature-box">
            <div className="fm-feature-icon">
              <CloudSun size={22} />
            </div>
            <div className="fm-feature-text">
              <h4>{isHi ? 'मौसम व सिंचाई अलर्ट' : 'Weather & Irrigation Alerts'}</h4>
              <p>
                {isHi 
                  ? 'विश्वसनीय मौसम वेधशाला से प्राप्त तापमान, वर्षा की स्थिति और सिंचाई की सलाह।' 
                  : 'Timely weather parameters and irrigation advisory sourced from official meteorological stations.'}
              </p>
            </div>
          </div>

          <div className="fm-feature-box">
            <div className="fm-feature-icon">
              <TrendingUp size={22} />
            </div>
            <div className="fm-feature-text">
              <h4>{isHi ? 'खेत का इतिहास व रिपोर्ट' : 'Farm History & Records'}</h4>
              <p>
                {isHi 
                  ? 'अपने सभी खेतों और पुरानी सलाह को सुरक्षित रखें ताकि अगले साल बेहतर योजना बना सकें।' 
                  : 'Keep permanent records of soil tests and seasonal recommendations for long-term planning.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
