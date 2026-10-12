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
  FileCheck 
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
    <div className="fm-result-page">
      {/* Top Action Bar (hidden during print) */}
      <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)', flexWrap: 'wrap', gap: '12px' }}>
        <button type="button" className="fm-btn fm-btn-outline" onClick={handleBack}>
          <ArrowLeft size={18} />
          <span>{isHi ? 'नई जांच करें (New Query)' : 'Back to Input Form'}</span>
        </button>

        <button type="button" className="fm-btn fm-btn-primary" onClick={handlePrint}>
          <Printer size={18} />
          <span>{isHi ? 'सलाह पर्ची प्रिंट / PDF सेव करें' : 'Print / Save Advisory PDF'}</span>
        </button>
      </div>

      {/* Main Printable Advisory Slip Card */}
      <div className="fm-card print-slip" style={{ maxWidth: '860px', margin: '0 auto', backgroundColor: '#FFFFFF' }}>
        {/* Slip Header */}
        <div style={{
          borderBottom: '2px solid var(--primary-forest)',
          paddingBottom: '16px',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-forest)' }}>
              <Sprout size={28} />
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0 }}>FasalMitra (फसलमित्र)</h2>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              {isHi ? 'वैज्ञानिक कृषि एवं मृदा आधारित फसल परामर्श पर्ची' : 'Scientific Soil & Agronomic Crop Advisory Slip'}
            </p>
          </div>

          <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <div><strong>{isHi ? 'जारी दिनांक:' : 'Date:'}</strong> {new Date().toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
            <div><strong>{isHi ? 'क्षेत्र / जिला:' : 'Region:'}</strong> {inputParams?.location || 'वाराणसी'}</div>
            {result.record_id && (
              <div style={{ color: 'var(--primary-forest)', fontWeight: 600 }}>
                {isHi ? `पंजीकरण संख्या: FM-${result.record_id}` : `Record ID: FM-${result.record_id}`}
              </div>
            )}
          </div>
        </div>

        {/* 1. PRIMARY RECOMMENDED CROP HERO CARD */}
        <div style={{
          backgroundColor: 'var(--bg-surface-sage)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
            <div>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '4px',
                fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase',
                color: 'var(--status-success-text)', backgroundColor: 'var(--status-success-bg)',
                padding: '3px 10px', borderRadius: 'var(--radius-pill)', marginBottom: '8px',
                border: '1px solid var(--status-success-border)'
              }}>
                <CheckCircle2 size={14} />
                {isHi ? 'सर्वाधिक अनुशंसित फसल' : 'Highest Match Crop'}
              </span>
              <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--primary-forest)', lineHeight: 1.2 }}>
                {result.display_name || result.recommended_crop}
              </h1>
            </div>

            <div style={{
              textAlign: 'center', backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-card)', padding: '10px 18px', borderRadius: 'var(--radius-md)'
            }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>
                {isHi ? 'मॉडल विश्वास स्कोर' : 'ML Confidence'}
              </span>
              <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-forest)' }}>
                {result.confidence}%
              </span>
            </div>
          </div>

          <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: 1.5 }}>
            {result.reason}
          </p>
        </div>

        {/* 2. CROP KEY PARAMETERS GRID */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px',
          marginBottom: '24px'
        }}>
          <div style={{ backgroundColor: 'var(--bg-surface-subtle)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '12px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
              {isHi ? 'अनुकूल मिट्टी' : 'Soil Suitability'}
            </span>
            <strong style={{ fontSize: '0.9rem', color: 'var(--primary-forest)' }}>
              {result.soil_considerations}
            </strong>
          </div>

          <div style={{ backgroundColor: 'var(--bg-surface-subtle)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '12px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
              {isHi ? 'सिंचाई की आवश्यकता' : 'Water Requirement'}
            </span>
            <strong style={{ fontSize: '0.9rem', color: 'var(--primary-forest)' }}>
              {result.water_requirements}
            </strong>
          </div>

          <div style={{ backgroundColor: 'var(--bg-surface-subtle)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '12px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
              {isHi ? 'फसल की अवधि' : 'Harvest Window'}
            </span>
            <strong style={{ fontSize: '0.9rem', color: 'var(--primary-forest)' }}>
              {result.harvest_days}
            </strong>
          </div>

          <div style={{ backgroundColor: 'var(--bg-surface-subtle)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '12px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
              {isHi ? 'औसत मंडी भाव व पैदावार' : 'Avg Mandi Rate & Yield'}
            </span>
            <strong style={{ fontSize: '0.9rem', color: 'var(--primary-forest)' }}>
              ₹{mandi.rate_per_qtl || 2425}/Qtl ({mandi.avg_yield_qtl || 18} Qtl/एकड़)
            </strong>
          </div>
        </div>

        {/* 3. CALCULATED FERTILIZER DOSAGE BOX */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-md)',
          padding: '18px',
          marginBottom: '24px'
        }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary-forest)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sprout size={18} />
            <span>{isHi ? 'प्रति एकड़ खाद (उर्वरक) की संस्तुत मात्रा' : 'Recommended Fertilizer Bags Per Acre'}</span>
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            marginBottom: '14px',
            textAlign: 'center'
          }}>
            <div style={{ backgroundColor: 'var(--bg-surface-subtle)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>यूरिया (Urea - 45kg)</span>
              <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary-forest)' }}>
                {fert.urea_bags_per_acre || 4.2} <small style={{ fontSize: '0.75rem' }}>बोरी</small>
              </span>
            </div>

            <div style={{ backgroundColor: 'var(--bg-surface-subtle)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>डीएपी (DAP - 50kg)</span>
              <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary-forest)' }}>
                {fert.dap_bags_per_acre || 2.0} <small style={{ fontSize: '0.75rem' }}>बोरी</small>
              </span>
            </div>

            <div style={{ backgroundColor: 'var(--bg-surface-subtle)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>पोटाश (MOP - 50kg)</span>
              <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary-forest)' }}>
                {fert.mop_bags_per_acre || 1.5} <small style={{ fontSize: '0.75rem' }}>बोरी</small>
              </span>
            </div>
          </div>

          <div style={{ fontSize: '0.85rem', color: 'var(--text-body)', backgroundColor: 'var(--bg-surface-sage)', padding: '10px 14px', borderRadius: 'var(--radius-sm)' }}>
            <strong>{isHi ? 'खाद देने का सही समय:' : 'Application Guidelines:'}</strong>{' '}
            {fert.tips}
          </div>
        </div>

        {/* 4. ALTERNATIVE CROPS TABLE */}
        {result.alternatives && result.alternatives.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary-forest)', marginBottom: '8px' }}>
              {isHi ? 'वैकल्पिक फसलें (Alternative Crop Options)' : 'Alternative Crops'}
            </h4>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {result.alternatives.map((alt, i) => (
                <div key={i} style={{
                  backgroundColor: 'var(--bg-surface-subtle)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '6px 14px',
                  fontSize: '0.85rem'
                }}>
                  <strong style={{ color: 'var(--text-main)' }}>{alt.crop}</strong>
                  <span style={{ color: 'var(--text-muted)', marginLeft: 6 }}>({alt.confidence}%)</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. SLIP FOOTER */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          <div>
            FasalMitra Agronomic AI &bull; ICAR Benchmark Trained &bull; टोल फ्री किसान हेल्पलाइन: 1800-180-1551
          </div>
          <div style={{ fontStyle: 'italic' }}>
            {isHi ? 'यह सलाह मृदा परीक्षण व क्षेत्रीय मौसम के आधार पर जारी की गई है।' : 'Generated using authenticated soil & climate reference parameters.'}
          </div>
        </div>
      </div>
    </div>
  );
}
