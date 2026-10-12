import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sprout, 
  ShieldAlert, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  TrendingUp, 
  FlaskConical, 
  CloudSun, 
  Store, 
  Sparkles, 
  ShieldCheck, 
  Calendar, 
  Calculator, 
  IndianRupee, 
  Award, 
  ChevronRight,
  Activity
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function HomePage({ setCurrentView, lang: propLang }) {
  const { lang: authLang } = useAuth();
  const navigate = useNavigate();
  const lang = propLang || authLang || 'hi';
  const isHi = lang === 'hi';

  const [topMandiGainers, setTopMandiGainers] = useState([]);

  // Fetch quick Mandi ticker preview
  useEffect(() => {
    fetch('/api/mandi-rates/')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.records) {
          const gainers = data.records.filter(r => r.trend === 'up').slice(0, 5);
          setTopMandiGainers(gainers);
        }
      })
      .catch(() => {});
  }, []);

  const goTo = (view, path) => {
    if (setCurrentView) setCurrentView(view);
    navigate(path);
  };

  const coreModules = [
    {
      id: 'crop-rec',
      title_hi: '1. एआई फसल सिफारिश (Crop Recommendation)',
      title_en: '1. AI Crop Recommendation',
      desc_hi: 'मिट्टी के N-P-K, pH और मौसम के आधार पर 99.55% सटीक फसल और खाद के कट्टों की गणना।',
      desc_en: 'Get highest-yielding crop recommendations and exact fertilizer bag schedules based on your soil test.',
      path: '/crop-recommendation',
      icon: Sprout,
      badge: '99.55% Accuracy',
      color: '#1B4332',
      bg: '#EAF3ED'
    },
    {
      id: 'disease',
      title_hi: '2. पौधे की बीमारी पहचान (Disease Vision AI)',
      title_en: '2. Plant Disease Vision AI',
      desc_hi: 'पत्ते की फोटो अपलोड करके फसल की बीमारी और उसका जैविक (Neem oil, जैव-कवकनाशी) उपचार जानें।',
      desc_en: 'Upload a leaf photo for instant deep CNN variety diagnosis, pest defense, and organic remedies.',
      path: '/disease-detection',
      icon: ShieldAlert,
      badge: 'MobileNetV2 CNN',
      color: '#991B1B',
      bg: '#FEE2E2'
    },
    {
      id: 'mandi',
      title_hi: '3. लाइव मंडी भाव एवं आमदनी (Mandi Bhav & Profit)',
      title_en: '3. Live Mandi Bhav & Revenue Simulator',
      desc_hi: 'अपने राज्य व जिले की नजदीकी मंडी के आज के ताज़ा मॉडल भाव देखें और कुल आमदनी कैलकुलेट करें।',
      desc_en: 'Track real-time modal prices across APMC mandis, MSP benchmark comparison, and estimate gross revenue.',
      path: '/mandi-bhav',
      icon: Store,
      badge: 'Agmarknet Real Data',
      color: '#B45309',
      bg: '#FEF3C7'
    },
    {
      id: 'soil',
      title_hi: '4. मृदा स्वास्थ्य कार्ड (Soil Health Card)',
      title_en: '4. Soil Health Diagnostic Card',
      desc_hi: 'अपनी मिट्टी के पोषक तत्वों (N, P, K, कार्बन, pH) का डिजिटल स्वास्थ्य कार्ड और सुधार सुझाव पाएं।',
      desc_en: 'Analyze macronutrient balance, organic carbon status, and pH correction advice for fertile soil.',
      path: '/soil-health',
      icon: FlaskConical,
      badge: 'Digital Soil Lab',
      color: '#0369A1',
      bg: '#E0F2FE'
    },
    {
      id: 'weather',
      title_hi: '5. मौसम पूर्वानुमान एवं कृषि सलाह (Weather Forecast)',
      title_en: '5. Weather Advisory & Forecast',
      desc_hi: 'आगामी 5 दिनों के तापमान, बारिश की संभावना और कीटनाशक छिड़काव की सटीक समय सारिणी।',
      desc_en: '5-day localized agro-meteorological forecast with pesticide spraying and irrigation advisory.',
      path: '/weather',
      icon: CloudSun,
      badge: '5-Day Forecast',
      color: '#4338CA',
      bg: '#EEF2FF'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28, width: '100%', paddingBottom: 40 }}>
      {/* 1. GRAND HERO BANNER */}
      <div className="fm-mandi-hero" style={{ padding: '42px 36px' }}>
        <div className="fm-mandi-hero-content" style={{ maxWidth: 820 }}>
          <div className="fm-mandi-hero-pill">
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#4ADE80', display: 'inline-block' }} />
            <Sparkles size={14} color="#FDE047" />
            <span>{isHi ? 'भारतीय किसानों के लिए आधुनिक एआई कृषि प्लेटफॉर्म' : 'Next-Gen AI Agronomic Platform for Indian Agriculture'}</span>
          </div>

          <h1 style={{ fontSize: '2.4rem', fontWeight: 900, lineHeight: 1.2, marginBottom: 14 }}>
            {isHi ? (
              <>सही फसल का चुनाव करें,<br />खेत में लाएं समृद्धि और खुशहाली।</>
            ) : (
              <>Smart Agronomic Intelligence<br />for Prosperous Farming.</>
            )}
          </h1>

          <p style={{ fontSize: '1.05rem', lineHeight: 1.6, color: '#E2ECE5', marginBottom: 20 }}>
            {isHi ? (
              'फसलमित्र आपकी मिट्टी की जांच (N, P, K, pH), मौसम और बाज़ार भाव का विश्लेषण करके सबसे उपयुक्त फसल, खाद के कट्टे और जैविक रोग निवारण बताता है।'
            ) : (
              'FasalMitra analyzes your soil telemetry, local weather patterns, and real-time mandi prices to empower you with scientific crop choices and maximum profits.'
            )}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <button
              onClick={() => goTo('crop-rec', '/crop-recommendation')}
              className="fm-btn"
              style={{
                backgroundColor: '#FFFFFF',
                color: 'var(--primary-forest)',
                fontWeight: 800,
                fontSize: '0.95rem',
                padding: '12px 24px',
                borderRadius: 12,
                boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                cursor: 'pointer'
              }}
            >
              <Sprout size={20} color="var(--primary-forest)" />
              <span>{isHi ? 'फसल की सलाह लें' : 'Get Crop Advice'}</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => goTo('mandi', '/mandi-bhav')}
              className="fm-btn"
              style={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.95rem',
                padding: '12px 22px',
                borderRadius: 12,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                cursor: 'pointer',
                backdropFilter: 'blur(8px)'
              }}
            >
              <Store size={18} color="#FDE047" />
              <span>{isHi ? 'आज का मंडी भाव देखें' : 'View Mandi Bhav'}</span>
            </button>
          </div>

          <div className="fm-mandi-hero-badges" style={{ marginTop: 24 }}>
            <div className="fm-mandi-hero-tag">
              <ShieldCheck size={14} color="#86EFAC" />
              <span>{isHi ? '22+ प्रमुख भारतीय फसलें' : '22+ Major Indian Crops'}</span>
            </div>
            <div className="fm-mandi-hero-tag">
              <Activity size={14} color="#FDE047" />
              <span>{isHi ? '99.55% प्रमाणित ML सटीकता' : '99.55% Validated ML Accuracy'}</span>
            </div>
            <div className="fm-mandi-hero-tag">
              <Store size={14} color="#93C5FD" />
              <span>{isHi ? '36+ सक्रिय APMC मंडियां' : '36+ APMC Mandis Live'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. LIVE MANDI TICKER ON HOMEPAGE */}
      {topMandiGainers.length > 0 && (
        <div className="fm-mandi-ticker">
          <div className="fm-mandi-ticker-title">
            <span style={{ backgroundColor: 'var(--status-success-bg)', color: 'var(--status-success-text)', padding: '3px 8px', borderRadius: 6, fontSize: '0.75rem', fontWeight: 800 }}>
              {isHi ? '📊 आज के मंडी भाव' : 'Live Mandi Bhav'}
            </span>
          </div>

          <div className="fm-mandi-ticker-list">
            {topMandiGainers.map((g, idx) => (
              <div 
                key={idx} 
                onClick={() => goTo('mandi', '/mandi-bhav')}
                className="fm-mandi-ticker-item"
              >
                <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{g.commodity.split(' ')[0]}</span>
                <span style={{ fontWeight: 800, color: 'var(--primary-forest)' }}>₹{g.modal_price}</span>
                <span style={{ color: '#1B5E20', fontWeight: 800, display: 'flex', alignItems: 'center', fontSize: '0.75rem' }}>
                  <TrendingUp size={12} style={{ marginRight: 2 }} />
                  {g.change_pct}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => goTo('mandi', '/mandi-bhav')}
            style={{ border: 'none', background: 'transparent', color: 'var(--primary-forest)', fontWeight: 700, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', whiteSpace: 'nowrap' }}
          >
            <span>{isHi ? 'सभी भाव देखें' : 'View All'}</span>
            <ChevronRight size={14} />
          </button>
        </div>
      )}

      {/* 3. 5 CORE FARMER MODULES GRID */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--accent-sage)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {isHi ? 'मुख्य किसान सेवाएं' : 'Key Farmer Services'}
            </span>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {isHi ? '🌾 फसलमित्र की 5 प्रमुख वैज्ञानिक सुविधाएं' : '🌾 5 Core Agronomic Modules'}
            </h2>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
          {coreModules.map((mod) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.id}
                onClick={() => goTo(mod.id, mod.path)}
                className="fm-mandi-card"
                style={{ cursor: 'pointer', padding: 24 }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: mod.bg, color: mod.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={24} />
                    </div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, backgroundColor: 'var(--bg-surface-sage)', color: 'var(--primary-forest)', padding: '3px 8px', borderRadius: 6, border: '1px solid var(--border-subtle)' }}>
                      {mod.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: 8, lineHeight: 1.3 }}>
                    {isHi ? mod.title_hi : mod.title_en}
                  </h3>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 16 }}>
                    {isHi ? mod.desc_hi : mod.desc_en}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid var(--border-subtle)', color: 'var(--primary-forest)', fontWeight: 800, fontSize: '0.85rem' }}>
                  <span>{isHi ? 'शुरू करें' : 'Open Module'}</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. 3-STEP FARMER ROADMAP */}
      <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-card)', borderRadius: 24, padding: 32, boxShadow: 'var(--shadow-subtle)' }}>
        <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 28px auto' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-sage)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {isHi ? 'आसान प्रक्रिया' : 'Simple Workflow'}
          </span>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginTop: 4 }}>
            {isHi ? '3 चरणों में वैज्ञानिक खेती और मुनाफा' : 'Smart Farming in 3 Easy Steps'}
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          <div style={{ backgroundColor: 'var(--bg-surface-sage)', borderRadius: 16, padding: 20, border: '1px solid var(--border-subtle)' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: 'var(--primary-forest)', color: '#FFFFFF', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              1
            </div>
            <h4 style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-main)', marginBottom: 6 }}>
              {isHi ? 'मृदा आंकड़े दर्ज करें' : 'Enter Soil Telemetry'}
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              {isHi ? 'अपने खेत के N-P-K, pH या प्रीसेट मिट्टी का चयन करें।' : 'Input laboratory soil test values or select regional soil presets.'}
            </p>
          </div>

          <div style={{ backgroundColor: 'var(--bg-surface-sage)', borderRadius: 16, padding: 20, border: '1px solid var(--border-subtle)' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: 'var(--primary-forest)', color: '#FFFFFF', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              2
            </div>
            <h4 style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-main)', marginBottom: 6 }}>
              {isHi ? 'एआई सिफारिश प्राप्त करें' : 'Get AI Recommendation'}
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              {isHi ? 'मशीन लर्निंग मॉडल सबसे अनुकूल फसल व यूरिया, डीएपी कट्टों का हिसाब देगा।' : 'Random Forest ML calculates top crops and exact Urea/DAP bags required.'}
            </p>
          </div>

          <div style={{ backgroundColor: 'var(--bg-surface-sage)', borderRadius: 16, padding: 20, border: '1px solid var(--border-subtle)' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: 'var(--primary-forest)', color: '#FFFFFF', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              3
            </div>
            <h4 style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-main)', marginBottom: 6 }}>
              {isHi ? 'मंडी में सही भाव पाएं' : 'Check Mandi Prices & Profit'}
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              {isHi ? 'लाइव भाव देखकर फसल की सही कीमत और अपनी शुद्ध आमदनी का आकलन करें।' : 'Track live APMC modal prices and calculate estimated farmer revenues.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
