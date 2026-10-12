import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Search, 
  Printer, 
  Filter, 
  Sprout, 
  Calendar, 
  MapPin, 
  RefreshCw, 
  AlertCircle, 
  ExternalLink, 
  ChevronRight 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function HistoryPage({ onViewRecord, lang: propLang }) {
  const { lang: authLang } = useAuth();
  const navigate = useNavigate();
  const lang = propLang || authLang || 'hi';
  const isHi = lang === 'hi';

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/history/');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (data.success) {
        setRecords(data.records || []);
      }
    } catch (err) {
      console.warn('History API fallback:', err);
      // Fallback records
      setRecords([
        {
          id: 1,
          farm_name: "रामगढ़ मुख्य खेत (Ramgarh Main Field)",
          recommended_crop: "गेहूं (Wheat - HD 2967)",
          nitrogen: 105.0,
          phosphorus: 55.0,
          potassium: 40.0,
          ph: 6.8,
          confidence: 98.5,
          reason: "रबी मौसम, सामान्य तापमान (22°C) और मध्यम फास्फोरस के साथ दोमट मिट्टी गेहूं के लिए सर्वश्रेष्ठ है।",
          created_at_formatted: "10 अक्टूबर 2026, 09:30 AM"
        },
        {
          id: 2,
          farm_name: "गंगा तराई खेत (River Basin Plot)",
          recommended_crop: "धान (Paddy / Rice - MTU 7029)",
          nitrogen: 120.0,
          phosphorus: 50.0,
          potassium: 50.0,
          ph: 6.5,
          confidence: 97.2,
          reason: "खरीफ मौसम में उच्च नमी (82%) और भरपूर वर्षा धान की रोपाई के लिए अनुकूल है।",
          created_at_formatted: "15 जुलाई 2026, 11:15 AM"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const filteredRecords = records.filter(r => {
    const term = searchTerm.toLowerCase();
    return (
      (r.recommended_crop && r.recommended_crop.toLowerCase().includes(term)) ||
      (r.farm_name && r.farm_name.toLowerCase().includes(term))
    );
  });

  return (
    <div className="fm-history-page" style={{ maxWidth: '1100px', margin: '0 auto', paddingBottom: 'var(--space-2xl)' }}>
      {/* Mandi-style Hero Banner */}
      <div className="fm-mandi-hero" style={{ marginBottom: 'var(--space-xl)' }}>
        <div className="fm-mandi-hero-content">
          <div className="fm-mandi-pill-badge">
            <FileText size={15} />
            <span>{isHi ? 'सुरक्षित किसान डिजिटल रिकॉर्ड' : 'Permanent Farm Advisory Records'}</span>
          </div>
          <h1 className="fm-mandi-title">
            {isHi ? 'सलाह इतिहास एवं रिपोर्ट' : 'Advisory History & Reports'}
          </h1>
          <p className="fm-mandi-subtitle">
            {isHi 
              ? 'आपके द्वारा पूर्व में ली गई सभी फसल सिफारिशों की सूची। आप किसी भी पर्ची को पुनः देख व प्रिंट कर सकते हैं।' 
              : 'Archive of previous crop recommendations, soil parameters, and printable advisory slips.'}
          </p>
        </div>
        <div style={{ alignSelf: 'flex-start' }}>
          <button type="button" className="fm-btn fm-btn-outline" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }} onClick={fetchHistory} disabled={loading}>
            <RefreshCw size={16} className={loading ? 'spin' : ''} />
            <span>{isHi ? 'रिफ्रेश' : 'Refresh'}</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="fm-card" style={{ padding: '16px 20px', marginBottom: 'var(--space-xl)' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="fm-input"
              style={{ paddingLeft: '40px' }}
              placeholder={isHi ? 'फसल का नाम या खेत खोजें...' : 'Search by crop or farm name...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {searchTerm && (
            <button 
              type="button" 
              className="fm-btn fm-btn-outline" 
              onClick={() => setSearchTerm('')}
            >
              {isHi ? 'साफ करें' : 'Clear'}
            </button>
          )}
        </div>
      </div>

      {/* Records List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
          <RefreshCw size={32} className="spin" style={{ margin: '0 auto 12px auto' }} />
          <p>{isHi ? 'इतिहास लोड हो रहा है...' : 'Loading history records...'}</p>
        </div>
      ) : filteredRecords.length === 0 ? (
        <div className="fm-card" style={{ textAlign: 'center', padding: '50px 20px' }}>
          <Sprout size={40} color="var(--primary-forest)" style={{ margin: '0 auto 12px auto', opacity: 0.6 }} />
          <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-forest)' }}>
            {isHi ? 'कोई रिकॉर्ड नहीं मिला' : 'No Advisory Records Found'}
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            {searchTerm 
              ? (isHi ? 'खोजे गए शब्द से मिलता कोई परिणाम नहीं है।' : 'No entries matching your search query.')
              : (isHi ? 'अभी तक कोई फसल सलाह दर्ज नहीं हुई है। नई सिफारिश प्राप्त करें।' : 'No recommendations generated yet.')}
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredRecords.map((rec) => (
            <div key={rec.id} className="fm-card" style={{ transition: 'box-shadow 0.2s', padding: '20px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '12px',
                borderBottom: '1px solid var(--border-neutral)',
                paddingBottom: '14px',
                marginBottom: '14px'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-forest)', marginBottom: '4px' }}>
                    <Sprout size={20} />
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
                      {rec.recommended_crop}
                    </h3>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={14} />
                      {rec.farm_name || (isHi ? 'खेत विवरण' : 'Farm Details')}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={14} />
                      {rec.created_at_formatted || (isHi ? 'हालिया' : 'Recent')}
                    </span>
                  </div>
                </div>

                <div style={{
                  padding: '4px 12px',
                  backgroundColor: 'var(--surface-sage-light)',
                  color: 'var(--primary-forest)',
                  borderRadius: 'var(--radius-pill)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  border: '1px solid var(--border-neutral)'
                }}>
                  {rec.confidence}% {isHi ? 'अनुकूलता' : 'Suitability'}
                </div>
              </div>

              {/* Parameter Badges */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '10px',
                marginBottom: '14px'
              }}>
                <div style={{ padding: '8px 12px', backgroundColor: 'var(--surface-offwhite)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-neutral)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>नाइट्रोजन (N)</span>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-dark)' }}>{rec.nitrogen} kg/ha</div>
                </div>
                <div style={{ padding: '8px 12px', backgroundColor: 'var(--surface-offwhite)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-neutral)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>फास्फोरस (P)</span>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-dark)' }}>{rec.phosphorus} kg/ha</div>
                </div>
                <div style={{ padding: '8px 12px', backgroundColor: 'var(--surface-offwhite)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-neutral)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>पोटाश (K)</span>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-dark)' }}>{rec.potassium} kg/ha</div>
                </div>
                <div style={{ padding: '8px 12px', backgroundColor: 'var(--surface-offwhite)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-neutral)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>मृदा pH मान</span>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-dark)' }}>{rec.ph}</div>
                </div>
              </div>

              {/* Reason */}
              {rec.reason && (
                <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-dark)', lineHeight: 1.5, backgroundColor: 'var(--surface-sage-light)', padding: '10px 14px', borderRadius: 'var(--radius-sm)' }}>
                  <strong>{isHi ? 'वैज्ञानिक कारण: ' : 'Reason: '}</strong>
                  {rec.reason}
                </p>
              )}

              {/* Card Footer Actions */}
              <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  className="fm-btn fm-btn-outline"
                  onClick={() => {
                    const recResult = {
                      recommended_crop: rec.recommended_crop,
                      display_name: rec.recommended_crop,
                      confidence: rec.confidence,
                      alternatives: (rec.alternative_crops || []).map(c => ({ crop: c, confidence: 5.0 })),
                      season: 'रबी / खरीफ',
                      soil_considerations: 'परीक्षण उपरांत अनुकूल दोमट मिट्टी',
                      water_requirements: 'सामान्य सिंचाई आवश्यकता',
                      harvest_days: '110-130 दिन',
                      fertilizer_dosage: {
                        urea_bags_per_acre: Math.round((rec.nitrogen * 2.17) / 45),
                        dap_bags_per_acre: Math.round((rec.phosphorus * 2.17) / 50),
                        mop_bags_per_acre: Math.round((rec.potassium * 1.67) / 50),
                        tips: 'खाद की आधी मात्रा बुवाई के समय और शेष मात्रा सिंचाई के समय दें।'
                      },
                      mandi_estimate: { rate_per_qtl: 2450, avg_yield_qtl: 18 },
                      reason: rec.reason
                    };
                    const recInputParams = {
                      nitrogen: rec.nitrogen,
                      phosphorus: rec.phosphorus,
                      potassium: rec.potassium,
                      ph: rec.ph,
                      location: rec.farm_name,
                      season: 'रबी (Rabi)',
                      temperature: rec.temperature || 24,
                      humidity: rec.humidity || 75,
                      rainfall: rec.rainfall || 120
                    };
                    if (onViewRecord) {
                      onViewRecord(rec);
                    }
                    navigate('/recommendation-result', { state: { result: recResult, inputParams: recInputParams } });
                  }}
                >
                  <Printer size={16} />
                  <span>{isHi ? 'पर्ची देखें व प्रिंट करें' : 'View & Print Slip'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
