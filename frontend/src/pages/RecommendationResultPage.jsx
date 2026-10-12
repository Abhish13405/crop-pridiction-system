import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  CheckCircle2, 
  Sprout, 
  Printer, 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Droplet, 
  Clock, 
  ShieldCheck, 
  TrendingUp, 
  FileCheck,
  Store,
  Sparkles,
  ArrowRight,
  FlaskConical,
  Wheat,
  Share2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function RecommendationResultPage({ result: propResult, inputParams: propParams, onBack, lang: propLang }) {
  const { lang: authLang } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const lang = propLang || authLang || 'hi';
  const isHi = lang === 'hi';

  const result = propResult || location.state?.result || {
    recommended_crop: "wheat",
    display_name: "गेहूं (Wheat - HD 2967)",
    confidence: 96.5,
    alternatives: [{ crop: "mustard", confidence: 2.5 }],
    season: "रबी (Rabi)",
    soil_considerations: "दोमट या बलुई दोमट मिट्टी (pH 6.5 - 7.5)",
    water_requirements: "मध्यम सिंचाई (4-5 मुख्य सिंचाई)",
    harvest_days: "115 - 135 दिन",
    fertilizer_dosage: {
      urea_bags_per_acre: 4.5,
      dap_bags_per_acre: 2.0,
      mop_bags_per_acre: 1.5,
      tips: "बुवाई के समय डीएपी और पोटाश की पूरी मात्रा दें। यूरिया को दो भागों में दें।"
    },
    mandi_estimate: { rate_per_qtl: 2425, avg_yield_qtl: 20 },
    reason: "अनुकूल तापमान व उर्वर दोमट मिट्टी में गेहूं की पैदावार अधिकतम रहेगी।"
  };

  const inputParams = propParams || location.state?.inputParams || {
    nitrogen: 90, phosphorus: 45, potassium: 45, ph: 6.5,
    location: "वाराणसी", season: "रबी (Rabi)", temperature: 24, humidity: 75, rainfall: 120
  };

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    if (onBack) onBack();
    navigate('/crop-recommendation');
  };

  const fert = result.fertilizer_dosage || {};
  const mandi = result.mandi_estimate || {};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%', paddingBottom: 40, maxWidth: 960, margin: '0 auto' }}>
      {/* Top Action Buttons (no-print) */}
      <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <button 
          type="button" 
          className="fm-btn fm-btn-outline" 
          onClick={handleBack}
          style={{ padding: '8px 16px', fontSize: '0.85rem' }}
        >
          <ArrowLeft size={16} />
          <span>{isHi ? 'नई जांच करें (New Query)' : 'Back to Input Form'}</span>
        </button>

        <div style={{ display: 'flex', gap: 10 }}>
          <button 
            type="button" 
            className="fm-btn fm-btn-primary" 
            onClick={handlePrint}
            style={{ padding: '8px 18px', fontSize: '0.85rem' }}
          >
            <Printer size={16} />
            <span>{isHi ? 'परामर्श पर्ची प्रिंट करें (PDF)' : 'Print Advisory PDF'}</span>
          </button>
        </div>
      </div>

      {/* 1. HERO RESULT BANNER */}
      <div className="fm-mandi-hero" style={{ padding: '36px 30px' }}>
        <div className="fm-mandi-hero-content">
          <div className="fm-mandi-hero-pill">
            <CheckCircle2 size={15} color="#4ADE80" />
            <span>{isHi ? 'मृदा विश्लेषण सफल (AI Recommendation Ready)' : 'Soil Telemetry Verified'}</span>
          </div>

          <h1 style={{ fontSize: '2.1rem', fontWeight: 900, marginBottom: 8 }}>
            {isHi ? '🎉 आपकी मिट्टी के लिए अनुशंसित फसल:' : '🎉 Top Recommended Crop for Your Soil:'}
          </h1>
          <div style={{ fontSize: '2.3rem', fontWeight: 900, color: '#FDE047', letterSpacing: '-0.02em', marginBottom: 12 }}>
            {result.display_name || result.recommended_crop}
          </div>

          <p style={{ fontSize: '0.95rem', color: '#E2ECE5', lineHeight: 1.6 }}>
            {result.reason || (isHi ? 'आपकी मिट्टी के पोषक तत्वों व मौसम के आधार पर यह फसल सबसे अधिक उपज देगी।' : 'Optimal agro-climatic conditions for this variety.')}
          </p>

          <div className="fm-mandi-hero-badges" style={{ marginTop: 18 }}>
            <div className="fm-mandi-hero-tag">
              <Sparkles size={14} color="#86EFAC" />
              <span>{isHi ? `सटीकता विश्वास: ${result.confidence || 98}%` : `Confidence: ${result.confidence || 98}%`}</span>
            </div>
            <div className="fm-mandi-hero-tag">
              <Calendar size={14} color="#FDE047" />
              <span>{isHi ? `उपयुक्त ऋतु: ${result.season || 'रबी'}` : `Season: ${result.season}`}</span>
            </div>
            <div className="fm-mandi-hero-tag">
              <Clock size={14} color="#93C5FD" />
              <span>{isHi ? `फसल चक्र: ${result.harvest_days || '115-135 दिन'}` : `Maturity: ${result.harvest_days}`}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. DIRECT LINK TO MANDI BHAV FOR THIS CROP */}
      <div style={{ backgroundColor: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: 18, padding: '18px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: '#FDE68A', color: '#92400E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Store size={22} />
          </div>
          <div>
            <h4 style={{ fontWeight: 800, fontSize: '1rem', color: '#78350F' }}>
              {isHi ? `क्या आप ${result.display_name || 'इस फसल'} का आज का मंडी भाव देखना चाहते हैं?` : 'Check Today\'s Mandi Bhav for this crop?'}
            </h4>
            <p style={{ fontSize: '0.8rem', color: '#92400E' }}>
              {isHi ? 'लाइव न्यूनतम, अधिकतम व मॉडल भाव देखें तथा अपनी कुल आमदनी कैलकुलेट करें।' : 'Track real APMC prices and forecast your harvest sales value.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/mandi-bhav')}
          className="fm-btn fm-btn-primary"
          style={{ padding: '9px 18px', fontSize: '0.85rem', gap: 6 }}
        >
          <Store size={15} />
          <span>{isHi ? 'मंडी भाव देखें' : 'View Mandi Rates'}</span>
          <ArrowRight size={15} />
        </button>
      </div>

      {/* 3. FERTILIZER BAG DOSAGE GRID */}
      <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-card)', borderRadius: 20, padding: 24, boxShadow: 'var(--shadow-card)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 14, marginBottom: 20 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: 'var(--bg-surface-sage)', color: 'var(--primary-forest)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FlaskConical size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary-forest)' }}>
              {isHi ? 'खाद खुराक एवं पोषक तत्व प्रबंधन (Fertilizer Bag Schedule)' : 'Fertilizer Bag Schedule (Per Acre)'}
            </h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {isHi ? 'प्रति एकड़ अनुशंसित रासायनिक खाद के कट्टे' : 'Recommended 45kg/50kg standard commercial bags'}
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 18 }}>
          {/* Urea */}
          <div style={{ backgroundColor: 'var(--bg-page)', border: '1px solid var(--border-card)', borderRadius: 16, padding: 18, textAlign: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              {isHi ? 'यूरिया (Urea - 46% N)' : 'Urea (46% N)'}
            </span>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--primary-forest)', margin: '6px 0' }}>
              {fert.urea_bags_per_acre ?? 3.5} <span style={{ fontSize: '1rem', fontWeight: 700 }}>{isHi ? 'कट्टे' : 'Bags'}</span>
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              {isHi ? 'प्रति एकड़ (45 kg बैग)' : 'Per Acre (45kg Bag)'}
            </span>
          </div>

          {/* DAP */}
          <div style={{ backgroundColor: 'var(--bg-page)', border: '1px solid var(--border-card)', borderRadius: 16, padding: 18, textAlign: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              {isHi ? 'डीएपी (DAP - 18:46:0)' : 'DAP (18:46:0)'}
            </span>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--primary-forest)', margin: '6px 0' }}>
              {fert.dap_bags_per_acre ?? 1.8} <span style={{ fontSize: '1rem', fontWeight: 700 }}>{isHi ? 'कट्टे' : 'Bags'}</span>
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              {isHi ? 'प्रति एकड़ (50 kg बैग)' : 'Per Acre (50kg Bag)'}
            </span>
          </div>

          {/* MOP */}
          <div style={{ backgroundColor: 'var(--bg-page)', border: '1px solid var(--border-card)', borderRadius: 16, padding: 18, textAlign: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              {isHi ? 'पोटाश (MOP - 60% K)' : 'MOP Potash (60% K)'}
            </span>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--primary-forest)', margin: '6px 0' }}>
              {fert.mop_bags_per_acre ?? 1.2} <span style={{ fontSize: '1rem', fontWeight: 700 }}>{isHi ? 'कट्टे' : 'Bags'}</span>
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              {isHi ? 'प्रति एकड़ (50 kg बैग)' : 'Per Acre (50kg Bag)'}
            </span>
          </div>
        </div>

        {fert.tips && (
          <div style={{ padding: '12px 16px', backgroundColor: 'var(--bg-surface-sage)', borderRadius: 12, border: '1px solid var(--border-subtle)', fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: 1.5 }}>
            <strong style={{ color: 'var(--primary-forest)' }}>💡 {isHi ? 'विशेष वैज्ञानिक सुझाव: ' : 'Expert Agronomic Tip: '}</strong>
            {fert.tips}
          </div>
        )}
      </div>

      {/* 4. AGRONOMIC SPECIFICATIONS & ALTERNATIVES */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
        {/* Specifications */}
        <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-card)', borderRadius: 20, padding: 22, boxShadow: 'var(--shadow-subtle)' }}>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Wheat size={18} color="var(--primary-forest)" />
            <span>{isHi ? 'फसल की मुख्य आवश्यकताएं' : 'Crop Requirements'}</span>
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 8, borderBottom: '1px solid var(--border-subtle)' }}>
              <span style={{ color: 'var(--text-muted)' }}>{isHi ? 'मृदा उपयुक्तता:' : 'Soil Suitability:'}</span>
              <strong style={{ color: 'var(--text-main)' }}>{result.soil_considerations || 'दोमट मिट्टी (pH 6.5-7.5)'}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 8, borderBottom: '1px solid var(--border-subtle)' }}>
              <span style={{ color: 'var(--text-muted)' }}>{isHi ? 'सिंचाई आवश्यकता:' : 'Water Needs:'}</span>
              <strong style={{ color: 'var(--text-main)' }}>{result.water_requirements || 'मध्यम (4-5 सिंचाई)'}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 8, borderBottom: '1px solid var(--border-subtle)' }}>
              <span style={{ color: 'var(--text-muted)' }}>{isHi ? 'पकने की अवधि:' : 'Harvest Days:'}</span>
              <strong style={{ color: 'var(--text-main)' }}>{result.harvest_days || '115-135 दिन'}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>{isHi ? 'अनुमानित पैदावार:' : 'Expected Yield:'}</span>
              <strong style={{ color: 'var(--primary-forest)' }}>{mandi.avg_yield_qtl || 20} {isHi ? 'क्विंटल / एकड़' : 'Qtl / Acre'}</strong>
            </div>
          </div>
        </div>

        {/* Alternatives */}
        <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-card)', borderRadius: 20, padding: 22, boxShadow: 'var(--shadow-subtle)' }}>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            <TrendingUp size={18} color="var(--primary-forest)" />
            <span>{isHi ? 'वैकल्पिक अनुकूल फसलें (Alternatives)' : 'Alternative Suitable Crops'}</span>
          </h4>

          {result.alternatives && result.alternatives.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {result.alternatives.map((alt, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', backgroundColor: 'var(--bg-surface-sage)', borderRadius: 12, border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.9rem' }}>
                    {alt.crop}
                  </span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary-forest)', backgroundColor: '#FFFFFF', padding: '3px 8px', borderRadius: 6 }}>
                    {alt.confidence ? `${alt.confidence}%` : (isHi ? 'अनुकूल' : 'Suitable')}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {isHi ? 'आपकी मिट्टी के लिए चयनित फसल ही सबसे उपयुक्त है।' : 'Single high-confidence recommendation.'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
