import React, { useState, useRef } from 'react';
import { 
  ShieldAlert, 
  Upload, 
  Camera, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Leaf, 
  HelpCircle,
  FileCheck,
  ChevronRight,
  Info
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';

export default function DiseaseDetectionPage({ onBack, lang: propLang }) {
  const { lang: authLang } = useAuth();
  const lang = propLang || authLang || 'hi';
  const isHi = lang === 'hi';

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
      setError(isHi ? 'कृपया पहले पौधे के पत्ते की तस्वीर चुनें।' : 'Please choose a leaf image first.');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('/api/predict-image/', {
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
        throw new Error(data.error || 'बीमारी की पहचान करने में त्रुटि हुई।');
      }
    } catch (err) {
      console.error('Image prediction error:', err);
      setError(
        isHi
          ? (err.message || 'तस्वीर का विश्लेषण करने में समस्या आई। कृपया पुनः प्रयास करें।')
          : (err.message || 'Failed to analyze leaf image. Please try again.')
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="fm-disease-page" style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: 'var(--space-2xl)' }}>
      {/* Page Header */}
      <div style={{ marginBottom: 'var(--space-xl)' }}>
        <div className="fm-badge-trust" style={{ marginBottom: '8px' }}>
          <ShieldAlert size={16} color="var(--primary-forest)" />
          <span>{isHi ? 'कृत्रिम बुद्धिमत्ता (CNN AI) आधारित निदान' : 'CNN AI Plant Pathology'}</span>
        </div>
        <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--primary-forest)' }}>
          {isHi ? 'पौधे की बीमारी पहचानें' : 'Plant Leaf Disease Diagnosis'}
        </h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
          {isHi 
            ? 'रोगग्रस्त पत्ते की तस्वीर अपलोड करें। हमारा वैज्ञानिक मॉडल बीमारी की पुष्टि कर जैविक और रासायनिक उपचार बताएगा।' 
            : 'Upload a clear leaf photo. Our validated vision model identifies the foliar disease and provides actionable remedies.'}
        </p>
      </div>

      {/* Guidelines Box */}
      <div className="fm-card" style={{ padding: '16px 20px', marginBottom: 'var(--space-xl)', backgroundColor: 'var(--surface-sage-light)' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary-forest)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Info size={18} />
          <span>{isHi ? 'सही फोटो लेने के लिए किसान सुझाव' : 'Tips for Capturing Useful Leaf Photos'}</span>
        </h3>
        <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.88rem', color: 'var(--text-dark)', lineHeight: 1.6 }}>
          <li>{isHi ? 'पत्ती को दिन की प्राकृतिक रोशनी में रखें (छाया या सीधी तेज धूप से बचें)।' : 'Place the leaf under natural daylight (avoid harsh shadows or direct glare).'}</li>
          <li>{isHi ? 'कैमरे को केवल पत्ती और रोगग्रस्त धब्बे पर केंद्रित करें।' : 'Focus the camera squarely on the affected leaf surface and lesions.'}</li>
          <li>{isHi ? 'धुंधली (blurry) या दूर से ली गई तस्वीर अपलोड न करें।' : 'Avoid blurry, out-of-focus, or distant shots.'}</li>
        </ul>
      </div>

      {/* Upload & Prediction Section */}
      {!result ? (
        <form onSubmit={handleSubmit} className="fm-card">
          <div className="fm-card-header">
            <div>
              <h2 className="fm-card-title">
                <Camera size={20} />
                <span>{isHi ? 'पत्ती की तस्वीर अपलोड करें' : 'Upload Leaf Photograph'}</span>
              </h2>
              <p className="fm-card-desc">
                {isHi ? 'गैलरी से फोटो चुनें या कैमरे से तुरंत खींचें।' : 'Select a photo from storage or capture using your camera.'}
              </p>
            </div>
          </div>

          {/* Hidden File Input */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            style={{ display: 'none' }} 
            id="leaf-file-input"
          />

          {/* Drag & Drop Area */}
          {!previewUrl ? (
            <div 
              onDrop={handleDrop} 
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
              style={{
                border: '2px dashed var(--border-neutral)',
                borderRadius: 'var(--radius-md)',
                padding: '48px 24px',
                textAlign: 'center',
                backgroundColor: 'var(--surface-offwhite)',
                cursor: 'pointer',
                marginBottom: 'var(--space-lg)',
                transition: 'border-color 0.2s'
              }}
            >
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'var(--surface-sage-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                color: 'var(--primary-forest)'
              }}>
                <Upload size={32} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-forest)', marginBottom: '6px' }}>
                {isHi ? 'पत्ते की फोटो यहाँ डालें या चुनें' : 'Click to select or drag leaf photo here'}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {isHi ? 'JPG, JPEG, PNG प्रारूप (अधिकतम 10 MB)' : 'Supports JPG, JPEG, PNG (Max 10 MB)'}
              </p>
              <button 
                type="button" 
                className="fm-btn fm-btn-outline" 
                style={{ marginTop: '16px' }}
                onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
              >
                <Camera size={18} />
                <span>{isHi ? 'फोटो चुनें / कैमरा खोलें' : 'Choose File / Camera'}</span>
              </button>
            </div>
          ) : (
            <div style={{ marginBottom: 'var(--space-lg)' }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '16px',
                backgroundColor: 'var(--surface-sage-light)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-neutral)'
              }}>
                <img 
                  src={previewUrl} 
                  alt="Selected Leaf Preview" 
                  style={{
                    maxHeight: '280px',
                    maxWidth: '100%',
                    borderRadius: 'var(--radius-sm)',
                    objectFit: 'contain',
                    border: '1px solid var(--border-neutral)'
                  }}
                />
                <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                  <button 
                    type="button" 
                    className="fm-btn fm-btn-outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <RefreshCw size={16} />
                    <span>{isHi ? 'दूसरी फोटो बदलें' : 'Change Image'}</span>
                  </button>
                  <button 
                    type="button" 
                    className="fm-btn fm-btn-outline"
                    onClick={handleReset}
                  >
                    <span>{isHi ? 'हटाएं' : 'Remove'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 16px',
              backgroundColor: '#FDF2E9',
              border: '1px solid #F5C6CB',
              borderRadius: 'var(--radius-sm)',
              color: '#842029',
              marginBottom: 'var(--space-lg)',
              fontSize: '0.9rem'
            }}>
              <AlertTriangle size={18} />
              <span>{error}</span>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            {onBack && (
              <button type="button" className="fm-btn fm-btn-outline" onClick={onBack}>
                {isHi ? 'पीछे जाएं' : 'Back'}
              </button>
            )}

            <button 
              type="submit" 
              className="fm-btn fm-btn-primary" 
              disabled={loading || !selectedFile}
              style={{ minWidth: '220px' }}
            >
              {loading ? (
                <>
                  <RefreshCw size={18} className="spin" />
                  <span>{isHi ? 'जांच जारी है...' : 'Diagnosing Leaf...'}</span>
                </>
              ) : (
                <>
                  <ShieldAlert size={18} />
                  <span>{isHi ? 'बीमारी पहचानें (Diagnose)' : 'Diagnose Disease'}</span>
                  <ChevronRight size={18} />
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        /* Results Section */
        <div className="fm-disease-result-container">
          {/* Result Card */}
          <div className="fm-card" style={{ marginBottom: 'var(--space-xl)' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              borderBottom: '1px solid var(--border-neutral)',
              paddingBottom: '16px',
              marginBottom: '20px',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-forest)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {isHi ? 'निदान परिणाम' : 'Diagnosis Report'}
                </span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-forest)', marginTop: '4px' }}>
                  {result.display_name || result.predicted_crop}
                </h2>
              </div>

              {/* Confidence Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                backgroundColor: result.is_uncertain ? '#FFF3CD' : 'var(--surface-sage-light)',
                color: result.is_uncertain ? '#856404' : 'var(--primary-forest)',
                borderRadius: 'var(--radius-pill)',
                fontWeight: 700,
                fontSize: '0.95rem',
                border: '1px solid var(--border-neutral)'
              }}>
                {result.is_uncertain ? <AlertTriangle size={18} /> : <CheckCircle2 size={18} />}
                <span>
                  {result.confidence}% {isHi ? 'सटीकता' : 'Confidence'}
                </span>
              </div>
            </div>

            {/* Uncertainty Warning Box */}
            {result.is_uncertain && (
              <div style={{
                backgroundColor: '#FFF3CD',
                border: '1px solid #FFEEBA',
                borderRadius: 'var(--radius-sm)',
                padding: '16px',
                marginBottom: '20px',
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start',
                color: '#856404'
              }}>
                <AlertTriangle size={24} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700 }}>
                    {isHi ? 'सावधानी: मॉडल सटीकता कम है' : 'Caution: Low Model Confidence'}
                  </h4>
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.88rem', lineHeight: 1.5 }}>
                    {isHi 
                      ? 'फोटो में पर्याप्त स्पष्टता न होने के कारण पहचान पूरी तरह सुनिश्चित नहीं है। कृपया दिन के उजाले में पत्ती की दूसरी स्पष्ट फोटो लें या अपने स्थानीय कृषि विज्ञान केंद्र (KVK) के कृषि वैज्ञानिक से संपर्क करें।' 
                      : 'Due to lighting or focus, the diagnosis is inconclusive (< 50%). Please take a clearer photograph under bright natural light or consult your local KVK agriculture officer.'}
                  </p>
                </div>
              </div>
            )}

            {/* Visual Preview & Top Probabilities */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              {previewUrl && (
                <div>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    {isHi ? 'जांची गई पत्ती की तस्वीर' : 'Evaluated Image'}
                  </h4>
                  <img 
                    src={previewUrl} 
                    alt="Analyzed leaf" 
                    style={{
                      width: '100%',
                      maxHeight: '220px',
                      objectFit: 'contain',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--surface-offwhite)',
                      border: '1px solid var(--border-neutral)'
                    }}
                  />
                </div>
              )}

              {result.top3 && result.top3.length > 0 && (
                <div>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    {isHi ? 'शीर्ष संभावित वर्गीकरण' : 'Top Model Classifications'}
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {result.top3.map((item, idx) => (
                      <div key={idx} style={{
                        padding: '10px 14px',
                        backgroundColor: 'var(--surface-offwhite)',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-neutral)'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '4px', fontWeight: 600 }}>
                          <span>{item.name}</span>
                          <span style={{ color: 'var(--primary-forest)' }}>{item.confidence}%</span>
                        </div>
                        <div style={{ width: '100%', height: '6px', backgroundColor: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{
                            width: `${item.confidence}%`,
                            height: '100%',
                            backgroundColor: idx === 0 ? 'var(--primary-forest)' : '#94A3B8'
                          }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actionable Remedies Section */}
            {result.guidance && (
              <div style={{ marginTop: '20px', borderTop: '1px solid var(--border-neutral)', paddingTop: '20px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-forest)', marginBottom: '16px' }}>
                  {isHi ? 'प्रमाणित उपचार एवं रोकथाम निर्देश' : 'Validated Treatment & Advisory'}
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                  {/* Organic Care */}
                  <div style={{
                    padding: '16px',
                    backgroundColor: 'var(--surface-sage-light)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-neutral)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-forest)', marginBottom: '8px' }}>
                      <Leaf size={18} />
                      <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700 }}>
                        {isHi ? 'जैविक उपचार (Organic Care)' : 'Organic Remedy'}
                      </h4>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-dark)', lineHeight: 1.5 }}>
                      {result.guidance.organic_cure}
                    </p>
                  </div>

                  {/* Chemical Care */}
                  <div style={{
                    padding: '16px',
                    backgroundColor: 'var(--surface-offwhite)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-neutral)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#B45309', marginBottom: '8px' }}>
                      <FileCheck size={18} />
                      <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700 }}>
                        {isHi ? 'संस्तुत रासायनिक नियंत्रण' : 'Recommended Chemical Control'}
                      </h4>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-dark)', lineHeight: 1.5 }}>
                      {result.guidance.chemical_cure}
                    </p>
                  </div>
                </div>

                {/* Agronomic Advisory */}
                <div style={{
                  padding: '14px 18px',
                  backgroundColor: '#F8FAFC',
                  borderRadius: 'var(--radius-sm)',
                  borderLeft: '4px solid var(--primary-forest)',
                  fontSize: '0.9rem',
                  color: 'var(--text-dark)'
                }}>
                  <strong>{isHi ? 'किसान मित्र सलाह: ' : 'Agronomic Advisory: '}</strong>
                  {result.guidance.advisory}
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button 
                type="button" 
                className="fm-btn fm-btn-outline" 
                onClick={handleReset}
              >
                <RefreshCw size={16} />
                <span>{isHi ? 'नई पत्ती की जांच करें' : 'Diagnose Another Leaf'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
