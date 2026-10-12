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
  AlertCircle
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

  function roundVal(v) {
    return Math.round(v * 10) / 10;
  }

  return (
    <div className="fm-crop-form-page">
      {/* Page Header */}
      <div style={{ marginBottom: 'var(--space-lg)' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-forest)', marginBottom: '4px' }}>
          {isHi ? 'मृदा व मौसम आधारित फसल सलाह' : 'Soil & Weather Crop Recommendation'}
        </h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
          {isHi 
            ? 'अपने मृदा स्वास्थ्य कार्ड (Soil Health Card) के आंकड़े दर्ज करें। सभी मान स्पष्ट इकाई में उपलब्ध हैं।' 
            : 'Enter soil test values and climate parameters to receive machine learning crop guidance.'}
        </p>
      </div>

      {/* Quick Soil Preset Chips */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-card)',
        borderRadius: 'var(--radius-md)',
        padding: '14px 18px',
        marginBottom: 'var(--space-lg)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flexWrap: 'wrap'
      }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-forest)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <FlaskConical size={16} />
          {isHi ? 'त्वरित मिट्टी प्रकार:' : 'Quick Soil Presets:'}
        </span>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button type="button" className="fm-btn fm-btn-outline" style={{ minHeight: '38px', padding: '6px 12px', fontSize: '0.82rem' }} onClick={() => applyPreset('alluvial')}>
            दोमट मिट्टी (Alluvial Loam)
          </button>
          <button type="button" className="fm-btn fm-btn-outline" style={{ minHeight: '38px', padding: '6px 12px', fontSize: '0.82rem' }} onClick={() => applyPreset('black')}>
            काली मिट्टी (Black Cotton)
          </button>
          <button type="button" className="fm-btn fm-btn-outline" style={{ minHeight: '38px', padding: '6px 12px', fontSize: '0.82rem' }} onClick={() => applyPreset('sandy')}>
            बलुई मिट्टी (Sandy Soil)
          </button>
          <button type="button" className="fm-btn fm-btn-outline" style={{ minHeight: '38px', padding: '6px 12px', fontSize: '0.82rem' }} onClick={() => applyPreset('clay')}>
            तराई / चिकनी मिट्टी (Clay)
          </button>
        </div>
      </div>

      {/* Main Form Card */}
      <form onSubmit={handleSubmit} className="fm-card" style={{ maxWidth: '820px', margin: '0 auto' }}>
        {error && (
          <div style={{
            backgroundColor: '#FFEBEE', border: '1px solid #FFCDD2', color: '#C62828',
            padding: '12px 16px', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-lg)',
            display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem'
          }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Section 1: Soil Test Values */}
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--primary-forest)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FlaskConical size={18} />
              <span>{isHi ? '1. मृदा परीक्षण आंकड़े (Soil Test Values)' : '1. Soil Nutrient Parameters'}</span>
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {isHi ? 'मृदा स्वास्थ्य कार्ड (Soil Health Card) से पोषक तत्वों की मात्रा दर्ज करें' : 'Enter values in kg/ha as reported on your soil test'}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {/* Nitrogen N */}
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '4px' }}>
                {isHi ? 'नाइट्रोजन (N)' : 'Nitrogen (N)'} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(kg/ha)</span>
              </label>
              <input 
                type="number"
                min="0"
                max="250"
                required
                value={formData.nitrogen}
                onChange={e => setFormData({...formData, nitrogen: e.target.value})}
                style={{ width: '100%', padding: '12px', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-sm)', fontSize: '1rem' }}
              />
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>
                {isHi ? 'पौधों की हरी पत्तियों व वृद्धि के लिए' : 'Supports vegetative growth'}
              </span>
            </div>

            {/* Phosphorus P */}
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '4px' }}>
                {isHi ? 'फास्फोरस (P)' : 'Phosphorus (P)'} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(kg/ha)</span>
              </label>
              <input 
                type="number"
                min="0"
                max="200"
                required
                value={formData.phosphorus}
                onChange={e => setFormData({...formData, phosphorus: e.target.value})}
                style={{ width: '100%', padding: '12px', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-sm)', fontSize: '1rem' }}
              />
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>
                {isHi ? 'जड़ों के विकास व कल्ले फूटने के लिए' : 'Strengthens root structure'}
              </span>
            </div>

            {/* Potassium K */}
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '4px' }}>
                {isHi ? 'पोटाश (K)' : 'Potassium (K)'} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(kg/ha)</span>
              </label>
              <input 
                type="number"
                min="0"
                max="250"
                required
                value={formData.potassium}
                onChange={e => setFormData({...formData, potassium: e.target.value})}
                style={{ width: '100%', padding: '12px', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-sm)', fontSize: '1rem' }}
              />
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>
                {isHi ? 'रोग प्रतिरोध व दानों की चमक के लिए' : 'Enhances grain quality & disease defense'}
              </span>
            </div>

            {/* pH */}
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '4px' }}>
                {isHi ? 'मिट्टी का pH मान' : 'Soil pH Value'} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(0 - 14)</span>
              </label>
              <input 
                type="number"
                step="0.1"
                min="3.5"
                max="9.5"
                required
                value={formData.ph}
                onChange={e => setFormData({...formData, ph: e.target.value})}
                style={{ width: '100%', padding: '12px', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-sm)', fontSize: '1rem' }}
              />
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>
                {isHi ? '6.0 से 7.5 सामान्य उपजाऊ मिट्टी मानी जाती है' : '6.0 to 7.5 is ideal fertile range'}
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: Location & Season */}
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--primary-forest)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={18} />
              <span>{isHi ? '2. स्थान व बुवाई का मौसम (Location & Season)' : '2. Region & Sowing Season'}</span>
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '4px' }}>
                {isHi ? 'खेत का स्थान / जिला' : 'Farm Location / District'}
              </label>
              <input 
                type="text"
                required
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
                style={{ width: '100%', padding: '12px', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-sm)', fontSize: '1rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '4px' }}>
                {isHi ? 'बुवाई का मौसम' : 'Sowing Season'}
              </label>
              <select
                value={formData.season}
                onChange={e => setFormData({...formData, season: e.target.value})}
                style={{ width: '100%', padding: '12px', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-sm)', fontSize: '1rem' }}
              >
                <option value="रबी (Rabi - Winter)">रबी मौसम (अक्टूबर - मार्च: गेहूं, सरसों, चना)</option>
                <option value="खरीफ (Kharif - Monsoon)">खरीफ मौसम (जून - अक्टूबर: धान, मक्का, कपास)</option>
                <option value="जायद (Zaid - Summer)">जायद मौसम (मार्च - जून: खीरा, मूंग, तरबूज)</option>
                <option value="वार्षिक (Annual / Perennial)">वार्षिक / बारहमासी (गन्ना, केला, फल)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Weather Parameters */}
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--primary-forest)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Thermometer size={18} />
              <span>{isHi ? '3. अनुमानित मौसम पैरामीटर्स (Weather Estimates)' : '3. Weather Estimates'}</span>
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '4px' }}>
                {isHi ? 'औसत तापमान' : 'Avg Temperature'} <span style={{ color: 'var(--text-muted)' }}>(°C)</span>
              </label>
              <input 
                type="number"
                step="0.5"
                min="5"
                max="50"
                value={formData.temperature}
                onChange={e => setFormData({...formData, temperature: e.target.value})}
                style={{ width: '100%', padding: '12px', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-sm)', fontSize: '1rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '4px' }}>
                {isHi ? 'हवा में नमी' : 'Relative Humidity'} <span style={{ color: 'var(--text-muted)' }}>(%)</span>
              </label>
              <input 
                type="number"
                min="10"
                max="100"
                value={formData.humidity}
                onChange={e => setFormData({...formData, humidity: e.target.value})}
                style={{ width: '100%', padding: '12px', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-sm)', fontSize: '1rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '4px' }}>
                {isHi ? 'औसत वर्षा' : 'Rainfall'} <span style={{ color: 'var(--text-muted)' }}>(mm)</span>
              </label>
              <input 
                type="number"
                min="0"
                max="400"
                value={formData.rainfall}
                onChange={e => setFormData({...formData, rainfall: e.target.value})}
                style={{ width: '100%', padding: '12px', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-sm)', fontSize: '1rem' }}
              />
            </div>
          </div>
        </div>

        {/* Submit Action */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button
            type="submit"
            className="fm-btn fm-btn-primary"
            style={{ width: '100%', maxWidth: '320px' }}
            disabled={loading}
          >
            {loading ? (
              <>
                <RefreshCw size={20} className="spin" />
                <span>{isHi ? 'वैज्ञानिक गणना जारी है...' : 'Calculating ML Guidance...'}</span>
              </>
            ) : (
              <>
                <Sprout size={20} />
                <span>{isHi ? 'वैज्ञानिक फसल सलाह प्राप्त करें' : 'Get Scientific Recommendation'}</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
