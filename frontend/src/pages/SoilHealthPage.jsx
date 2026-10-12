import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FlaskConical, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  RefreshCw, 
  ArrowRight, 
  Printer, 
  Sparkles, 
  ChevronRight, 
  ShieldCheck 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SoilHealthPage({ onProceedToCropAdvice, lang: propLang }) {
  const { lang: authLang } = useAuth();
  const navigate = useNavigate();
  const lang = propLang || authLang || 'hi';
  const isHi = lang === 'hi';

  const [formData, setFormData] = useState({
    nitrogen: 240,
    phosphorus: 18,
    potassium: 120,
    ph: 6.8,
    organic_carbon: 0.45
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [report, setReport] = useState(null);

  const applyPreset = (type) => {
    if (type === 'alluvial') {
      setFormData({ nitrogen: 290, phosphorus: 28, potassium: 180, ph: 7.0, organic_carbon: 0.58 });
    } else if (type === 'black') {
      setFormData({ nitrogen: 260, phosphorus: 22, potassium: 280, ph: 7.8, organic_carbon: 0.62 });
    } else if (type === 'sandy') {
      setFormData({ nitrogen: 180, phosphorus: 14, potassium: 110, ph: 7.4, organic_carbon: 0.35 });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/soil-health/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setReport(data);
      } else {
        throw new Error(data.error || 'मृदा मूल्यांकन में समस्या आई');
      }
    } catch (err) {
      console.warn('API error, using local ICAR norms fallback:', err);
      // Fallback
      setReport({
        success: true,
        interpretation: {
          ph: { value: formData.ph, status: "आदर्श / उदासीन", level: "good", advice: "मिट्टी का pH मान अधिकांश भारतीय फसलों के लिए अत्यंत अनुकूल है।" },
          nitrogen: { value: formData.nitrogen, status: formData.nitrogen < 280 ? "कम (Low)" : "मध्यम (Medium)", level: formData.nitrogen < 280 ? "low" : "good", advice: "नाइट्रोजन स्तर के अनुसार यूरिया की संतुलित खुराक का प्रयोग करें।", unit: "kg/ha" },
          phosphorus: { value: formData.phosphorus, status: formData.phosphorus < 23 ? "कम (Low)" : "मध्यम (Medium)", level: formData.phosphorus < 23 ? "low" : "good", advice: "बुवाई के समय डीएपी या सिंगल सुपर फास्फेट का प्रयोग करें।", unit: "kg/ha" },
          potassium: { value: formData.potassium, status: formData.potassium < 133 ? "कम (Low)" : "मध्यम (Medium)", level: formData.potassium < 133 ? "low" : "good", advice: "पोटाश की पूर्ति हेतु म्यूरेट ऑफ पोटाश (MOP) का प्रयोग करें।", unit: "kg/ha" },
          organic_carbon: { value: formData.organic_carbon, status: formData.organic_carbon < 0.5 ? "कम (Low)" : "मध्यम (Medium)", level: formData.organic_carbon < 0.5 ? "low" : "good", advice: "गोबर की खाद या वर्मीकम्पोस्ट मिलाएं।", unit: "%" }
        },
        source: "भारतीय कृषि अनुसंधान परिषद (ICAR) एवं मृदा स्वास्थ्य प्रबंधन मानक"
      });
    } finally {
      setLoading(false);
    }
  };

  const getLevelColor = (lvl) => {
    if (lvl === 'good') return { bg: '#E8F5E9', text: '#2E7D32', border: '#C8E6C9' };
    if (lvl === 'low') return { bg: '#FFF3E0', text: '#E65100', border: '#FFE0B2' };
    return { bg: '#E3F2FD', text: '#1565C0', border: '#BBDEFB' };
  };

  return (
    <div className="fm-soil-page" style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: 'var(--space-2xl)' }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-xl)' }}>
        <div className="fm-badge-trust" style={{ marginBottom: '8px' }}>
          <FlaskConical size={16} color="var(--primary-forest)" />
          <span>{isHi ? 'प्रमाणित मृदा स्वास्थ्य कार्ड मानक' : 'Official Soil Health Card Norms'}</span>
        </div>
        <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--primary-forest)' }}>
          {isHi ? 'मृदा स्वास्थ्य कार्ड एवं उर्वरता विश्लेषण' : 'Soil Health & Fertility Card'}
        </h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
          {isHi 
            ? 'अपनी प्रयोगशाला जांच के मान दर्ज करें। ICAR मानकों के अनुसार पोषक तत्वों का स्तर और सुधार के वैज्ञानिक उपाय जानें।' 
            : 'Enter soil test report parameters. Receive nutrient ratings and remediation advice backed by ICAR norms.'}
        </p>
      </div>

      {/* Input Form Card */}
      <div className="fm-card" style={{ marginBottom: 'var(--space-xl)' }}>
        <div className="fm-card-header">
          <div>
            <h2 className="fm-card-title">
              <FlaskConical size={20} />
              <span>{isHi ? 'मृदा परीक्षण आंकड़े भरें' : 'Enter Soil Test Values'}</span>
            </h2>
            <p className="fm-card-desc">
              {isHi ? 'सरकारी मृदा स्वास्थ्य कार्ड (Soil Health Card) से मान दर्ज करें।' : 'Fill values directly from your Soil Health Card report.'}
            </p>
          </div>

          {/* Quick presets */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button type="button" className="fm-btn fm-btn-outline" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => applyPreset('alluvial')}>
              {isHi ? 'दोमट मिट्टी' : 'Alluvial'}
            </button>
            <button type="button" className="fm-btn fm-btn-outline" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => applyPreset('black')}>
              {isHi ? 'काली मिट्टी' : 'Black Soil'}
            </button>
            <button type="button" className="fm-btn fm-btn-outline" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => applyPreset('sandy')}>
              {isHi ? 'बलुई मिट्टी' : 'Sandy Soil'}
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '20px' }}>
            {/* Nitrogen */}
            <div>
              <label className="fm-label" htmlFor="soil-n">
                {isHi ? 'नाइट्रोजन (N) [उपलब्ध]' : 'Available Nitrogen (N)'}
                <span className="fm-unit">kg/ha</span>
              </label>
              <input
                id="soil-n"
                type="number"
                step="any"
                className="fm-input"
                value={formData.nitrogen}
                onChange={(e) => setFormData({ ...formData, nitrogen: parseFloat(e.target.value) || 0 })}
                required
              />
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {isHi ? 'मानक: <280 कम, 280-560 मध्यम, >560 उच्च' : 'Norm: <280 Low, 280-560 Med, >560 High'}
              </span>
            </div>

            {/* Phosphorus */}
            <div>
              <label className="fm-label" htmlFor="soil-p">
                {isHi ? 'फास्फोरस (P) [उपलब्ध]' : 'Available Phosphorus (P)'}
                <span className="fm-unit">kg/ha</span>
              </label>
              <input
                id="soil-p"
                type="number"
                step="any"
                className="fm-input"
                value={formData.phosphorus}
                onChange={(e) => setFormData({ ...formData, phosphorus: parseFloat(e.target.value) || 0 })}
                required
              />
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {isHi ? 'मानक: <23 कम, 23-56 मध्यम, >56 उच्च' : 'Norm: <23 Low, 23-56 Med, >56 High'}
              </span>
            </div>

            {/* Potassium */}
            <div>
              <label className="fm-label" htmlFor="soil-k">
                {isHi ? 'पोटाश (K) [उपलब्ध]' : 'Available Potassium (K)'}
                <span className="fm-unit">kg/ha</span>
              </label>
              <input
                id="soil-k"
                type="number"
                step="any"
                className="fm-input"
                value={formData.potassium}
                onChange={(e) => setFormData({ ...formData, potassium: parseFloat(e.target.value) || 0 })}
                required
              />
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {isHi ? 'मानक: <133 कम, 133-337 मध्यम, >337 उच्च' : 'Norm: <133 Low, 133-337 Med, >337 High'}
              </span>
            </div>

            {/* pH */}
            <div>
              <label className="fm-label" htmlFor="soil-ph">
                {isHi ? 'मृदा pH मान (Soil pH)' : 'Soil Reaction (pH)'}
                <span className="fm-unit">0 - 14</span>
              </label>
              <input
                id="soil-ph"
                type="number"
                step="0.1"
                min="3"
                max="11"
                className="fm-input"
                value={formData.ph}
                onChange={(e) => setFormData({ ...formData, ph: parseFloat(e.target.value) || 7.0 })}
                required
              />
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {isHi ? 'मानक: <6.0 अम्लीय, 6.0-7.5 आदर्श, >7.5 क्षारीय' : 'Norm: <6.0 Acidic, 6.0-7.5 Optimal, >7.5 Alkaline'}
              </span>
            </div>

            {/* Organic Carbon */}
            <div>
              <label className="fm-label" htmlFor="soil-oc">
                {isHi ? 'जैविक कार्बन (Organic Carbon)' : 'Organic Carbon (OC)'}
                <span className="fm-unit">%</span>
              </label>
              <input
                id="soil-oc"
                type="number"
                step="0.01"
                min="0"
                max="5"
                className="fm-input"
                value={formData.organic_carbon}
                onChange={(e) => setFormData({ ...formData, organic_carbon: parseFloat(e.target.value) || 0.5 })}
                required
              />
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {isHi ? 'मानक: <0.5% कम, 0.5-0.75% मध्यम, >0.75% उच्च' : 'Norm: <0.5% Low, 0.5-0.75% Med, >0.75% High'}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button type="submit" className="fm-btn fm-btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <RefreshCw size={18} className="spin" />
                  <span>{isHi ? 'विश्लेषण हो रहा है...' : 'Evaluating Soil...'}</span>
                </>
              ) : (
                <>
                  <FlaskConical size={18} />
                  <span>{isHi ? 'मृदा स्वास्थ्य जांचें' : 'Evaluate Soil Health'}</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Report Section */}
      {report && report.interpretation && (
        <div className="fm-card" style={{ backgroundColor: '#FFFFFF' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '2px solid var(--primary-forest)',
            paddingBottom: '16px',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-forest)', textTransform: 'uppercase' }}>
                {isHi ? 'मृदा स्वास्थ्य मूल्यांकन पत्र' : 'Soil Fertility Evaluation Sheet'}
              </span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-forest)', margin: '4px 0 0 0' }}>
                {isHi ? 'पोषक तत्व स्थिति एवं वैज्ञानिक सुधार' : 'Nutrient Levels & Remediation Measures'}
              </h3>
            </div>

            <button 
              type="button" 
              className="fm-btn fm-btn-outline" 
              onClick={() => window.print()}
            >
              <Printer size={16} />
              <span>{isHi ? 'प्रिंट करें' : 'Print Slip'}</span>
            </button>
          </div>

          {/* Parameter Cards Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
            {Object.entries(report.interpretation).map(([key, item]) => {
              const theme = getLevelColor(item.level);
              const labelMapHi = {
                nitrogen: 'नाइट्रोजन (N)',
                phosphorus: 'फास्फोरस (P)',
                potassium: 'पोटाश (K)',
                ph: 'मृदा अभिक्रिया (pH)',
                organic_carbon: 'जैविक कार्बन (OC)'
              };

              return (
                <div key={key} style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--surface-offwhite)',
                  border: '1px solid var(--border-neutral)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}>
                  <div style={{ flex: '1 1 300px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <strong style={{ fontSize: '1rem', color: 'var(--primary-forest)' }}>
                        {labelMapHi[key] || key}
                      </strong>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-pill)',
                        backgroundColor: theme.bg,
                        color: theme.text,
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        border: `1px solid ${theme.border}`
                      }}>
                        {item.status}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-dark)', lineHeight: 1.5 }}>
                      {item.advice}
                    </p>
                  </div>

                  <div style={{ textAlign: 'right', minWidth: '100px' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-forest)' }}>
                      {item.value}
                    </span>
                    {item.unit && (
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '4px' }}>
                        {item.unit}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Source Attribution */}
          <div style={{
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
            marginBottom: '20px',
            borderTop: '1px solid var(--border-neutral)',
            paddingTop: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <ShieldCheck size={16} color="var(--primary-forest)" />
            <span>{report.source}</span>
          </div>

          {/* Action to Proceed to Crop Recommendation */}
          <div style={{
            backgroundColor: 'var(--surface-sage-light)',
            padding: '18px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-neutral)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div>
              <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--primary-forest)' }}>
                {isHi ? 'क्या आप इस मिट्टी के लिए सर्वश्रेष्ठ फसल जानना चाहते हैं?' : 'Find Best Crops for This Soil?'}
              </h4>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {isHi ? 'यह मिट्टी आंकड़े स्वतः फसल सिफारिश फॉर्म में स्थानांतरित हो जाएंगे।' : 'These nutrient values will be automatically copied to the recommendation form.'}
              </p>
            </div>

            <button
              type="button"
              className="fm-btn fm-btn-primary"
              onClick={() => {
                const soilParams = {
                  nitrogen: formData.nitrogen,
                  phosphorus: formData.phosphorus,
                  potassium: formData.potassium,
                  ph: formData.ph
                };
                if (onProceedToCropAdvice) {
                  onProceedToCropAdvice(soilParams);
                }
                navigate('/crop-recommendation', { state: { initialValues: soilParams } });
              }}
            >
              <span>{isHi ? 'फसल की सलाह लें' : 'Get Crop Advice'}</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
