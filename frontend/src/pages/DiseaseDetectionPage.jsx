import React, { useState, useRef } from 'react';
import { 
  ShieldAlert, 
  Upload, 
  Camera, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Leaf, 
  Sparkles,
  ShieldCheck,
  Activity,
  ArrowRight,
  Info,
  Check,
  ChevronRight,
  Store
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function DiseaseDetectionPage({ onBack, lang: propLang }) {
  const { lang: authLang } = useAuth();
  const navigate = useNavigate();
  const lang = propLang || authLang || 'hi';
  const isHi = lang === 'hi';

  const [activeTab, setActiveTab] = useState('crop'); // 'crop' | 'fruit'
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError(isHi ? 'कृपया केवल छवि फ़ाइल (JPG/PNG) चुनें।' : 'Please select an image file (JPG/PNG).');
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
      setResult(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
      setResult(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError(isHi ? 'कृपया पहले तस्वीर चुनें।' : 'Please choose an image first.');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    const endpoint = activeTab === 'fruit' ? '/api/predict-fruit/' : '/api/predict-image/';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setResult(data);
      } else {
        throw new Error(data.error || 'पहचान करने में त्रुटि हुई।');
      }
    } catch (err) {
      console.error('Image prediction error:', err);
      setError(
        isHi
          ? (err.message || 'तस्वीर का विश्लेषण करने में समस्या आई। कृपया पुनः प्रयास करें।')
          : (err.message || 'Failed to analyze image. Please try again.')
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%', paddingBottom: 40, maxWidth: 960, margin: '0 auto' }}>
      {/* 1. HERO BANNER */}
      <div className="fm-mandi-hero">
        <div className="fm-mandi-hero-content">
          <div className="fm-mandi-hero-pill">
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#4ADE80', display: 'inline-block' }} />
            <Sparkles size={14} color="#FDE047" />
            <span>{isHi ? 'कंप्यूटर विज़न डीप सीएनएन मॉडल (MobileNetV2)' : 'Computer Vision Deep CNN (MobileNetV2 Transfer Learning)'}</span>
          </div>

          <h1>
            {activeTab === 'fruit'
              ? (isHi ? '🍎 फल पहचान व उद्यानिकी एआई' : '🍎 Fruit Recognition & Nutrition AI')
              : (isHi ? '🔬 पौधे की पत्ती, फसल व कीट पहचान' : '🔬 Plant Leaf & Crop Diagnosis AI')}
          </h1>
          <p>
            {activeTab === 'fruit'
              ? (isHi 
                  ? 'फल की तस्वीर अपलोड करें। हमारा डीप लर्निंग मॉडल पहचान करेगा कि यह कौन सा फल है (सेब, केला, संतरा, अनार, आम आदि) तथा इसके पोषक तत्व व बाजार भाव बताएगा।'
                  : 'Upload a fruit photograph to instantly identify fruit variety, nutrition profile, harvest seasonality, and disease care.')
              : (isHi 
                  ? 'फसल या पत्ते की तस्वीर अपलोड करें। डीप लर्निंग मॉडल फसल की पहचान करेगा, बीमारी के धब्बे पहचानेगा और प्रमाणित जैविक उपचार बताएगा।' 
                  : 'Upload a leaf photograph for instant computer vision classification across 30 crops, diagnostic confidence scoring, and biological remedies.')}
          </p>

          {/* Mode Switcher Pills (Crops/Leaves vs Fruits) */}
          <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => { setActiveTab('crop'); resetForm(); }}
              style={{
                padding: '8px 18px',
                borderRadius: 999,
                border: 'none',
                backgroundColor: activeTab === 'crop' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.2)',
                color: activeTab === 'crop' ? '#1B4332' : '#FFFFFF',
                fontWeight: 800,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                transition: 'all 0.2s ease'
              }}
            >
              <Leaf size={15} />
              <span>{isHi ? 'फसल व पत्ती पहचान (30 Crops)' : 'Crop & Leaf AI'}</span>
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('fruit'); resetForm(); }}
              style={{
                padding: '8px 18px',
                borderRadius: 999,
                border: 'none',
                backgroundColor: activeTab === 'fruit' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.2)',
                color: activeTab === 'fruit' ? '#1B4332' : '#FFFFFF',
                fontWeight: 800,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                transition: 'all 0.2s ease'
              }}
            >
              <Sparkles size={15} />
              <span>{isHi ? 'फल पहचान मॉडल (Fruit Recognition)' : 'Fruit AI'}</span>
            </button>
          </div>

          <div className="fm-mandi-hero-badges">
            <div className="fm-mandi-hero-tag">
              <ShieldCheck size={14} color="#86EFAC" />
              <span>{isHi ? '30+ कृषि फसल श्रेणियां' : '30+ Agricultural Classes'}</span>
            </div>
            <div className="fm-mandi-hero-tag">
              <Leaf size={14} color="#FDE047" />
              <span>{isHi ? 'जैविक व रासायनिक उपचार' : 'Organic & Chemical Remedies'}</span>
            </div>
            <div className="fm-mandi-hero-tag">
              <Activity size={14} color="#93C5FD" />
              <span>{isHi ? '92.1% शीर्ष-3 सटीकता' : '92.1% Top-3 Accuracy'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. PHOTO GUIDANCE BAR */}
      <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-card)', borderRadius: 16, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: 'var(--shadow-subtle)' }}>
        <Info size={20} color="var(--primary-forest)" style={{ shrink: 0 }} />
        <span style={{ fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: 1.5 }}>
          {isHi 
            ? '💡 अच्छी पहचान हेतु: पत्ते को दिन की प्राकृतिक रोशनी में रखें, कैमरे को रोगग्रस्त धब्बे पर केंद्रित करें और धुंधली फोटो से बचें।' 
            : '💡 Tip: Capture under natural daylight, keep the camera focused on affected leaf spots, and avoid blurry or distant shots.'}
        </span>
      </div>

      {error && (
        <div style={{ backgroundColor: '#FFEBEE', border: '1px solid #FFCDD2', color: '#C62828', padding: '14px 18px', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.9rem', fontWeight: 600 }}>
          <AlertTriangle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* 3. UPLOAD OR RESULTS SECTION */}
      {!result ? (
        <form onSubmit={handleSubmit} style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-card)', borderRadius: 20, padding: 28, boxShadow: 'var(--shadow-card)' }}>
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-forest)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Camera size={22} />
              <span>{isHi ? 'पत्ती की तस्वीर अपलोड करें' : 'Upload Leaf Photograph'}</span>
            </h3>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              {isHi ? 'गैलरी से फोटो चुनें या कैमरे से तुरंत खींचें' : 'Select an image from device or capture with mobile camera'}
            </span>
          </div>

          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            style={{ display: 'none' }} 
            id="leaf-file-input"
          />

          {!previewUrl ? (
            <div 
              onDrop={handleDrop} 
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: '2px dashed var(--border-card)',
                borderRadius: 16,
                padding: '48px 24px',
                textAlign: 'center',
                backgroundColor: 'var(--bg-page)',
                cursor: 'pointer',
                marginBottom: 20,
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ width: 68, height: 68, borderRadius: '50%', backgroundColor: 'var(--bg-surface-sage)', color: 'var(--primary-forest)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Upload size={32} />
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary-forest)', marginBottom: 6 }}>
                {isHi ? 'पत्ते की फोटो यहाँ डालें या क्लिक करें' : 'Click to select or drag leaf photo here'}
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                {isHi ? 'JPG, JPEG, PNG प्रारूप (अधिकतम 10 MB)' : 'Supports JPG, JPEG, PNG (Max 10 MB)'}
              </p>
              <button 
                type="button" 
                className="fm-btn fm-btn-outline" 
                style={{ marginTop: 16, padding: '8px 18px', fontSize: '0.85rem' }}
                onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
              >
                <Camera size={16} />
                <span>{isHi ? 'फ़ाइल चुनें / कैमरा' : 'Browse File / Camera'}</span>
              </button>
            </div>
          ) : (
            <div style={{ marginBottom: 20, textAlign: 'center' }}>
              <div style={{ maxWidth: 360, margin: '0 auto', borderRadius: 16, overflow: 'hidden', border: '2px solid var(--border-card)', backgroundColor: 'var(--bg-page)', padding: 8 }}>
                <img 
                  src={previewUrl} 
                  alt="Selected Leaf" 
                  style={{ width: '100%', maxHeight: 260, objectFit: 'contain', borderRadius: 10 }}
                />
              </div>
              <div style={{ marginTop: 12, display: 'flex', justifyContent: 'center', gap: 10 }}>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="fm-btn fm-btn-outline"
                  style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                >
                  <RefreshCw size={14} />
                  <span>{isHi ? 'दूसरी फोटो चुनें' : 'Change Image'}</span>
                </button>
              </div>
            </div>
          )}

          <div style={{ textAlign: 'center' }}>
            <button
              type="submit"
              disabled={loading || !selectedFile}
              className="fm-btn fm-btn-primary"
              style={{
                padding: '14px 36px',
                fontSize: '1rem',
                fontWeight: 800,
                borderRadius: 14,
                boxShadow: '0 4px 14px rgba(27, 67, 50, 0.2)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                cursor: loading || !selectedFile ? 'not-allowed' : 'pointer',
                opacity: !selectedFile ? 0.6 : 1
              }}
            >
              {loading ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  <span>{isHi ? 'डीप सीएनएन मॉडल विश्लेषण कर रहा है...' : 'Analyzing with MobileNetV2...'}</span>
                </>
              ) : (
                <>
                  <Sparkles size={18} color="#FDE047" />
                  <span>{isHi ? 'बीमारी व फसल की पहचान करें' : 'Diagnose Disease & Pests'}</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        /* RESULTS VIEW */
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Top Result Card */}
          <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-card)', borderRadius: 20, padding: 26, boxShadow: 'var(--shadow-card)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 16, marginBottom: 18, flexWrap: 'wrap', gap: 12 }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-sage)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {activeTab === 'fruit' ? (isHi ? '🍎 फल पहचान रिपोर्ट (Fruit AI Report)' : 'Fruit AI Report') : (isHi ? 'एआई निदान रिपोर्ट (Diagnosis Report)' : 'AI Diagnosis Report')}
                </span>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--primary-forest)', marginTop: 2 }}>
                  {result.display_name || result.hindi_name || result.predicted_crop}
                </h2>
                {result.category && (
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginTop: 2 }}>
                    श्रेणी: {result.category}
                  </span>
                )}
              </div>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 999, backgroundColor: 'var(--bg-surface-sage)', border: '1px solid var(--border-card)', fontWeight: 800, color: 'var(--primary-forest)' }}>
                <CheckCircle2 size={18} color="#1B5E20" />
                <span>{result.confidence}% {isHi ? 'सटीकता' : 'Confidence'}</span>
              </div>
            </div>

            {/* Extra Fruit Badges (Nutrition, Season, Market Rate) */}
            {activeTab === 'fruit' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 20 }}>
                {result.nutrition && (
                  <div style={{ padding: '10px 14px', backgroundColor: '#FEF3C7', borderRadius: 12, border: '1px solid #FDE68A' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#92400E' }}>🥗 पोषण व स्वास्थ्य (Nutrition)</span>
                    <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#78350F', marginTop: 3 }}>{result.nutrition}</div>
                  </div>
                )}
                {result.harvest_season && (
                  <div style={{ padding: '10px 14px', backgroundColor: '#EFF6FF', borderRadius: 12, border: '1px solid #BFDBFE' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1E40AF' }}>📅 तुड़ाई / मौसम (Harvest Season)</span>
                    <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#1E3A8A', marginTop: 3 }}>{result.harvest_season}</div>
                  </div>
                )}
                {result.market_rate && (
                  <div style={{ padding: '10px 14px', backgroundColor: '#F0FDF4', borderRadius: 12, border: '1px solid #BBF7D0' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#166534' }}>💰 अनुमानित बाजार भाव (Market Rate)</span>
                    <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#14532D', marginTop: 3 }}>{result.market_rate}</div>
                  </div>
                )}
              </div>
            )}

            {/* Image Preview & Top 3 Probabilities */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 20 }}>
              {previewUrl && (
                <div style={{ textAlign: 'center' }}>
                  <img 
                    src={previewUrl} 
                    alt="Analyzed leaf" 
                    style={{ width: '100%', maxHeight: 220, objectFit: 'contain', borderRadius: 14, backgroundColor: 'var(--bg-page)', border: '1px solid var(--border-card)' }}
                  />
                </div>
              )}

              {result.top3 && result.top3.length > 0 && (
                <div>
                  <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 10 }}>
                    {isHi ? 'शीर्ष मॉडल संभावनाएं (Top Predictions):' : 'Top Classifications:'}
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {result.top3.map((item, idx) => (
                      <div key={idx} style={{ padding: '10px 14px', backgroundColor: 'var(--bg-page)', borderRadius: 12, border: '1px solid var(--border-subtle)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: 4 }}>
                          <span style={{ color: 'var(--text-main)' }}>{item.name || item.crop}</span>
                          <span style={{ color: 'var(--primary-forest)', fontWeight: 800 }}>{item.confidence}%</span>
                        </div>
                        <div style={{ width: '100%', height: 6, backgroundColor: '#E2E8F0', borderRadius: 3, overflow: 'hidden' }}>
                          <div style={{ width: `${item.confidence}%`, height: '100%', backgroundColor: idx === 0 ? 'var(--primary-forest)' : '#94A3B8' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Biological & Chemical Remedies */}
            {result.guidance && (
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 18 }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary-forest)', marginBottom: 14 }}>
                  {isHi ? '🌾 अनुशंसित वैज्ञानिक उपचार व रोकथाम' : 'Scientific Treatment & Crop Defense'}
                </h3>

                {/* Common Threats / Diseases Identified */}
                {result.guidance.common_threats && result.guidance.common_threats.length > 0 && (
                  <div style={{ backgroundColor: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: 14, padding: 14, marginBottom: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#92400E', fontWeight: 800, fontSize: '0.88rem', marginBottom: 6 }}>
                      <ShieldAlert size={16} />
                      <span>{isHi ? 'संभावित रोग व कीट लक्षण (Common Threats)' : 'Identified Plant Threats'}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {result.guidance.common_threats.map((threat, tIdx) => (
                        <span key={tIdx} style={{ backgroundColor: '#FFFBEB', border: '1px solid #FCD34D', borderRadius: 999, padding: '4px 12px', fontSize: '0.8rem', fontWeight: 700, color: '#B45309' }}>
                          ⚠️ {threat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
                  {/* Organic Care */}
                  <div style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 14, padding: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#166534', fontWeight: 800, fontSize: '0.9rem', marginBottom: 6 }}>
                      <Leaf size={16} />
                      <span>{isHi ? 'जैविक उपचार (Organic Care)' : 'Organic Remedy'}</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#14532D', lineHeight: 1.5, margin: 0 }}>
                      {result.guidance.organic_cure || result.guidance.organic || 'नीम तेल (5ml/लीटर पानी) का छिड़काव करें एवं ट्राइकोडर्मा विरिडी जैव-कवकनाशी का प्रयोग करें।'}
                    </p>
                  </div>

                  {/* Chemical Care */}
                  <div style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 14, padding: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#1E40AF', fontWeight: 800, fontSize: '0.9rem', marginBottom: 6 }}>
                      <ShieldAlert size={16} />
                      <span>{isHi ? 'रासायनिक उपचार (Chemical Schedule)' : 'Chemical Remedy'}</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#1E3A8A', lineHeight: 1.5, margin: 0 }}>
                      {result.guidance.chemical_cure || result.guidance.chemical || 'संक्रमण अधिक होने पर अनुशंसित फफूंदनाशक (कॉपर ऑक्सीक्लोराइड 3g/लीटर या Mancozeb) का घोल बनाकर छिड़काव करें।'}
                    </p>
                  </div>
                </div>

                {/* Advisory Note */}
                {result.guidance.advisory && (
                  <div style={{ marginTop: 14, padding: 12, backgroundColor: 'var(--bg-page)', borderRadius: 12, border: '1px solid var(--border-card)', fontSize: '0.85rem', color: 'var(--primary-forest)' }}>
                    <strong>{isHi ? 'कृषि वैज्ञानिक सलाह: ' : 'Expert Agronomic Advisory: '}</strong>
                    {result.guidance.advisory}
                  </div>
                )}
              </div>
            )}

            {/* Reset Button */}
            <div style={{ marginTop: 20, textAlign: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: 16 }}>
              <button
                type="button"
                onClick={resetForm}
                className="fm-btn fm-btn-outline"
                style={{ padding: '8px 20px', fontSize: '0.85rem' }}
              >
                <RefreshCw size={15} />
                <span>{isHi ? 'अन्य पौधे की जांच करें' : 'Diagnose Another Plant'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
