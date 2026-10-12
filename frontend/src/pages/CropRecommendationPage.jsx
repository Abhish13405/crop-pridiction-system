import React, { useState } from 'react';
import { 
  Sprout, 
  FlaskConical, 
  MapPin, 
  Calendar, 
  Thermometer, 
  Droplets, 
  CloudRain, 
  ArrowRight, 
  RefreshCw, 
  Info,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Activity,
  Award
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function CropRecommendationPage({ onResultReady, initialValues: propInit, lang: propLang }) {
  const { lang: authLang } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const lang = propLang || authLang || 'hi';
  const isHi = lang === 'hi';

  const initialValues = location.state?.initialValues || propInit;

  const [formData, setFormData] = useState({
    nitrogen: initialValues?.nitrogen ?? 90,
    phosphorus: initialValues?.phosphorus ?? 45,
    potassium: initialValues?.potassium ?? 45,
    ph: initialValues?.ph ?? 6.5,
    location: 'वाराणसी (Varanasi, UP)',
    season: 'रबी (Rabi - Winter)',
    temperature: 24.0,
    humidity: 75.0,
    rainfall: 120.0
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Quick Soil Presets for Indian Farmers
  const applyPreset = (preset) => {
    if (preset === 'alluvial') {
      setFormData(prev => ({ ...prev, nitrogen: 95, phosphorus: 50, potassium: 45, ph: 6.8, rainfall: 110 }));
    } else if (preset === 'black') {
      setFormData(prev => ({ ...prev, nitrogen: 115, phosphorus: 55, potassium: 55, ph: 7.5, rainfall: 80 }));
    } else if (preset === 'sandy') {
      setFormData(prev => ({ ...prev, nitrogen: 50, phosphorus: 35, potassium: 35, ph: 7.2, rainfall: 50 }));
    } else if (preset === 'clay') {
      setFormData(prev => ({ ...prev, nitrogen: 80, phosphorus: 60, potassium: 50, ph: 6.2, rainfall: 160 }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/recommend-crop/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nitrogen: parseFloat(formData.nitrogen),
          phosphorus: parseFloat(formData.phosphorus),
          potassium: parseFloat(formData.potassium),
          ph: parseFloat(formData.ph),
          temperature: parseFloat(formData.temperature),
          humidity: parseFloat(formData.humidity),
          rainfall: parseFloat(formData.rainfall),
          location: formData.location,
          season: formData.season,
          save_to_history: true
        })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || (isHi ? 'सिफारिश प्राप्त करने में त्रुटि हुई।' : 'Failed to receive crop recommendation.'));
      }

      if (onResultReady) onResultReady(data, formData);
      navigate('/recommendation-result', { state: { result: data, inputParams: formData } });
    } catch (err) {
      console.error('Crop recommendation API failure:', err);
      setError(err.message || (isHi ? 'सर्वर से संपर्क नहीं हो पाया। कृपया इंटरनेट कनेक्शन या आंकड़े जांचें।' : 'Could not contact prediction service. Please check your inputs.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%', paddingBottom: 40 }}>
      {/* 1. HERO BANNER */}
      <div className="fm-mandi-hero">
        <div className="fm-mandi-hero-content">
          <div className="fm-mandi-hero-pill">
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#4ADE80', display: 'inline-block' }} />
            <Sparkles size={14} color="#FDE047" />
            <span>{isHi ? 'रैंडम फ़ॉरेस्ट एमएल मॉडल (99.55% शुद्धता)' : 'Scikit-Learn Random Forest Classifier (99.55% Acc)'}</span>
          </div>

          <h1>
            {isHi ? '🌱 मृदा व जलवायु आधारित स्मार्ट फसल सलाह' : '🌱 Soil & Climate AI Crop Recommender'}
          </h1>
          <p>
            {isHi 
              ? 'अपने खेत की मिट्टी के N-P-K व pH आंकड़े दर्ज करें। एआई मॉडल आपकी मिट्टी के लिए सर्वाधिक लाभकारी फसल और यूरिया/डीएपी की सही मात्रा बताएगा।' 
              : 'Input soil test telemetry and weather parameters to receive instant highest-yielding crop recommendations and fertilizer schedule.'}
          </p>

          <div className="fm-mandi-hero-badges">
            <div className="fm-mandi-hero-tag">
              <ShieldCheck size={14} color="#86EFAC" />
              <span>{isHi ? '22+ मुख्य भारतीय फसलें' : '22 Benchmark Crops'}</span>
            </div>
            <div className="fm-mandi-hero-tag">
              <FlaskConical size={14} color="#FDE047" />
              <span>{isHi ? 'खाद के कट्टों की गणना (Urea/DAP/MOP)' : 'Exact Fertilizer Bag Calculator'}</span>
            </div>
            <div className="fm-mandi-hero-tag">
              <Activity size={14} color="#93C5FD" />
              <span>{isHi ? 'आईसीआर (ICAR) मानक आधारित' : 'ICAR Agronomic Standards'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. QUICK SOIL PRESETS BAR */}
      <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-card)', borderRadius: 18, padding: '16px 20px', boxShadow: 'var(--shadow-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <FlaskConical size={18} color="var(--primary-forest)" />
          <span style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--text-main)' }}>
            {isHi ? 'त्वरित मिट्टी प्रकार चुनें (Quick Presets):' : 'Select Regional Soil Preset:'}
          </span>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button 
            type="button" 
            className="fm-mandi-cat-btn"
            onClick={() => applyPreset('alluvial')}
          >
            🌾 {isHi ? 'जलोढ़ दोमट मिट्टी' : 'Alluvial Loam'}
          </button>
          <button 
            type="button" 
            className="fm-mandi-cat-btn"
            onClick={() => applyPreset('black')}
          >
            ⚫ {isHi ? 'काली कपासी मिट्टी' : 'Black Cotton'}
          </button>
          <button 
            type="button" 
            className="fm-mandi-cat-btn"
            onClick={() => applyPreset('sandy')}
          >
            🏜️ {isHi ? 'बलुई / रेतीली मिट्टी' : 'Sandy Soil'}
          </button>
          <button 
            type="button" 
            className="fm-mandi-cat-btn"
            onClick={() => applyPreset('clay')}
          >
            🧱 {isHi ? 'चिकनी मटियार मिट्टी' : 'Clay Soil'}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ backgroundColor: '#FFEBEE', border: '1px solid #FFCDD2', color: '#C62828', padding: '14px 18px', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.9rem', fontWeight: 600 }}>
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* 3. MAIN FORM */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
          {/* Card 1: Soil Nutrient Values */}
          <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-card)', borderRadius: 20, padding: 24, boxShadow: 'var(--shadow-card)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 14, marginBottom: 18 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, backgroundColor: 'var(--bg-surface-sage)', color: 'var(--primary-forest)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FlaskConical size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary-forest)' }}>
                  {isHi ? '1. मृदा पोषक तत्व (Soil Nutrients)' : '1. Soil Test Parameters'}
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {isHi ? 'मृदा स्वास्थ्य कार्ड (Soil Card) के अनुसार मान भरें' : 'Enter values in kg/ha as reported on soil test'}
                </span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {/* Nitrogen */}
              <div className="fm-mandi-field">
                <label>
                  {isHi ? 'नाइट्रोजन (N)' : 'Nitrogen (N)'} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(kg/ha)</span>
                </label>
                <input 
                  type="number"
                  min="0"
                  max="250"
                  required
                  value={formData.nitrogen}
                  onChange={e => setFormData({...formData, nitrogen: e.target.value})}
                />
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {isHi ? 'पौधों के विकास हेतु' : 'Vegetative growth'}
                </span>
              </div>

              {/* Phosphorus */}
              <div className="fm-mandi-field">
                <label>
                  {isHi ? 'फास्फोरस (P)' : 'Phosphorus (P)'} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(kg/ha)</span>
                </label>
                <input 
                  type="number"
                  min="0"
                  max="200"
                  required
                  value={formData.phosphorus}
                  onChange={e => setFormData({...formData, phosphorus: e.target.value})}
                />
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {isHi ? 'जड़ों की मजबूती हेतु' : 'Root development'}
                </span>
              </div>

              {/* Potassium */}
              <div className="fm-mandi-field">
                <label>
                  {isHi ? 'पोटाश (K)' : 'Potassium (K)'} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(kg/ha)</span>
                </label>
                <input 
                  type="number"
                  min="0"
                  max="250"
                  required
                  value={formData.potassium}
                  onChange={e => setFormData({...formData, potassium: e.target.value})}
                />
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {isHi ? 'रोग प्रतिरोधक क्षमता हेतु' : 'Disease resistance'}
                </span>
              </div>

              {/* pH */}
              <div className="fm-mandi-field">
                <label>
                  {isHi ? 'मृदा पीएच (pH)' : 'Soil pH (0-14)'}
                </label>
                <input 
                  type="number"
                  step="0.1"
                  min="3.0"
                  max="10.0"
                  required
                  value={formData.ph}
                  onChange={e => setFormData({...formData, ph: e.target.value})}
                />
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {isHi ? 'अम्लीय या क्षारीय संतुलन' : 'Neutral is 6.5 - 7.5'}
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Climate & Location */}
          <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-card)', borderRadius: 20, padding: 24, boxShadow: 'var(--shadow-card)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 14, marginBottom: 18 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, backgroundColor: 'var(--bg-surface-sage)', color: 'var(--primary-forest)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CloudRain size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary-forest)' }}>
                  {isHi ? '2. जलवायु व स्थान (Climate & Environment)' : '2. Environmental Factors'}
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {isHi ? 'स्थानीय मौसम व वर्षा के अनुमानित आंकड़े' : 'Regional climate & seasonal rainfall'}
                </span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {/* Temperature */}
              <div className="fm-mandi-field">
                <label>
                  {isHi ? 'तापमान (Temp °C)' : 'Temperature (°C)'}
                </label>
                <input 
                  type="number"
                  step="0.5"
                  min="5"
                  max="50"
                  required
                  value={formData.temperature}
                  onChange={e => setFormData({...formData, temperature: e.target.value})}
                />
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {isHi ? 'मौसम का औसत तापमान' : 'Average field temp'}
                </span>
              </div>

              {/* Humidity */}
              <div className="fm-mandi-field">
                <label>
                  {isHi ? 'आर्द्रता (Humidity %)' : 'Humidity (%)'}
                </label>
                <input 
                  type="number"
                  step="1"
                  min="10"
                  max="100"
                  required
                  value={formData.humidity}
                  onChange={e => setFormData({...formData, humidity: e.target.value})}
                />
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {isHi ? 'हवा में नमी की मात्रा' : 'Atmospheric moisture'}
                </span>
              </div>

              {/* Rainfall */}
              <div className="fm-mandi-field">
                <label>
                  {isHi ? 'वर्षा (Rainfall mm)' : 'Rainfall (mm)'}
                </label>
                <input 
                  type="number"
                  step="5"
                  min="10"
                  max="350"
                  required
                  value={formData.rainfall}
                  onChange={e => setFormData({...formData, rainfall: e.target.value})}
                />
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {isHi ? 'फसल चक्र की वर्षा' : 'Seasonal precipitation'}
                </span>
              </div>

              {/* Season */}
              <div className="fm-mandi-field">
                <label>
                  {isHi ? 'कृषि ऋतु (Crop Season)' : 'Agricultural Season'}
                </label>
                <select 
                  value={formData.season}
                  onChange={e => setFormData({...formData, season: e.target.value})}
                >
                  <option value="खरीफ (Kharif - Monsoon)">{isHi ? "खरीफ (Kharif - Monsoon)" : "Kharif (Monsoon)"}</option>
                  <option value="रबी (Rabi - Winter)">{isHi ? "रबी (Rabi - Winter)" : "Rabi (Winter)"}</option>
                  <option value="जायद (Zaid - Summer)">{isHi ? "जायद (Zaid - Summer)" : "Zaid (Summer)"}</option>
                </select>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {isHi ? 'बुवाई का मौसम' : 'Sowing season'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Submit Button */}
        <div style={{ textAlign: 'center', paddingTop: 10 }}>
          <button 
            type="submit"
            disabled={loading}
            className="fm-btn fm-btn-primary"
            style={{
              padding: '16px 40px',
              fontSize: '1.05rem',
              fontWeight: 800,
              borderRadius: 14,
              boxShadow: '0 6px 18px rgba(27, 67, 50, 0.25)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? (
              <>
                <RefreshCw size={20} className="animate-spin" />
                <span>{isHi ? 'एमएल मॉडल विश्लेषण कर रहा है...' : 'Running Random Forest Model...'}</span>
              </>
            ) : (
              <>
                <Sparkles size={20} color="#FDE047" />
                <span>{isHi ? 'एआई फसल सलाह व खाद की गणना करें' : 'Analyze Soil & Recommend Best Crops'}</span>
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
