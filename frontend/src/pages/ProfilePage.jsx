import React, { useState } from 'react';
import { 
  User, 
  Globe, 
  ShieldCheck, 
  Phone, 
  MapPin, 
  Save, 
  CheckCircle2, 
  RefreshCw, 
  HelpCircle, 
  Lock 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage({ lang: propLang, toggleLang: propToggle }) {
  const { lang: authLang, toggleLang: authToggle, user } = useAuth();
  const lang = propLang || authLang || 'hi';
  const toggleLang = propToggle || authToggle;
  const isHi = lang === 'hi';

  const [farmerProfile, setFarmerProfile] = useState(() => {
    const saved = localStorage.getItem('fasalmitra_farmer_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      name: 'रामकुमार सिंह (Ram Kumar Singh)',
      phone: '9876543210',
      state: 'उत्तर प्रदेश (Uttar Pradesh)',
      district: 'वाराणसी (Varanasi)',
      village: 'रामगढ़ (Ramgarh)'
    };
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('fasalmitra_farmer_profile', JSON.stringify(farmerProfile));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="fm-profile-page" style={{ maxWidth: '960px', margin: '0 auto', paddingBottom: 'var(--space-2xl)' }}>
      {/* Mandi-style Hero Banner */}
      <div className="fm-mandi-hero" style={{ marginBottom: 'var(--space-xl)' }}>
        <div className="fm-mandi-hero-content">
          <div className="fm-mandi-pill-badge">
            <User size={15} />
            <span>{isHi ? 'किसान प्रोफ़ाइल व सेटिंग्स' : 'Farmer Profile & Settings'}</span>
          </div>
          <h1 className="fm-mandi-title">
            {isHi ? 'मेरी जानकारी एवं भाषा' : 'Profile & App Settings'}
          </h1>
          <p className="fm-mandi-subtitle">
            {isHi 
              ? 'अपनी व्यक्तिगत जानकारी सुरक्षित रखें और भाषा प्राथमिकताएं बदलें।' 
              : 'Manage your local farm profile, language preferences, and data privacy.'}
          </p>
        </div>
      </div>

      {/* Language Preference Card */}
      <div className="fm-card" style={{ marginBottom: 'var(--space-xl)' }}>
        <div className="fm-card-header">
          <div>
            <h2 className="fm-card-title">
              <Globe size={20} />
              <span>{isHi ? 'भाषा का चयन (Language Selection)' : 'Language Selection'}</span>
            </h2>
            <p className="fm-card-desc">
              {isHi ? 'अपनी सुविधानुसार ऐप की भाषा चुनें।' : 'Choose your preferred language for the interface.'}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className={`fm-btn ${isHi ? 'fm-btn-primary' : 'fm-btn-outline'}`}
            style={{ minWidth: '160px', justifyContent: 'center' }}
            onClick={() => { if (!isHi) toggleLang(); }}
          >
            <span>हिन्दी (Hindi - First)</span>
            {isHi && <CheckCircle2 size={16} />}
          </button>

          <button
            type="button"
            className={`fm-btn ${!isHi ? 'fm-btn-primary' : 'fm-btn-outline'}`}
            style={{ minWidth: '160px', justifyContent: 'center' }}
            onClick={() => { if (isHi) toggleLang(); }}
          >
            <span>English (अंग्रेजी)</span>
            {!isHi && <CheckCircle2 size={16} />}
          </button>
        </div>
      </div>

      {/* Farmer Information Form */}
      <div className="fm-card" style={{ marginBottom: 'var(--space-xl)' }}>
        <div className="fm-card-header">
          <div>
            <h2 className="fm-card-title">
              <User size={20} />
              <span>{isHi ? 'किसान का विवरण' : 'Farmer Profile Details'}</span>
            </h2>
            <p className="fm-card-desc">
              {isHi ? 'सलाह पर्ची पर यह नाम और पता मुद्रित होगा।' : 'This information appears on your printable advisory slips.'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSave}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label className="fm-label" htmlFor="prof-name">
                {isHi ? 'किसान का पूरा नाम' : 'Farmer Full Name'}
              </label>
              <input
                id="prof-name"
                type="text"
                className="fm-input"
                value={farmerProfile.name}
                onChange={(e) => setFarmerProfile({ ...farmerProfile, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="fm-label" htmlFor="prof-phone">
                {isHi ? 'मोबाइल नंबर' : 'Mobile Number'}
              </label>
              <input
                id="prof-phone"
                type="tel"
                className="fm-input"
                value={farmerProfile.phone}
                onChange={(e) => setFarmerProfile({ ...farmerProfile, phone: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="fm-label" htmlFor="prof-state">
                {isHi ? 'राज्य' : 'State'}
              </label>
              <input
                id="prof-state"
                type="text"
                className="fm-input"
                value={farmerProfile.state}
                onChange={(e) => setFarmerProfile({ ...farmerProfile, state: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="fm-label" htmlFor="prof-dist">
                {isHi ? 'जिला' : 'District'}
              </label>
              <input
                id="prof-dist"
                type="text"
                className="fm-input"
                value={farmerProfile.district}
                onChange={(e) => setFarmerProfile({ ...farmerProfile, district: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="fm-label" htmlFor="prof-village">
                {isHi ? 'गाँव / क्षेत्र' : 'Village / Area'}
              </label>
              <input
                id="prof-village"
                type="text"
                className="fm-input"
                value={farmerProfile.village}
                onChange={(e) => setFarmerProfile({ ...farmerProfile, village: e.target.value })}
                required
              />
            </div>
          </div>

          {savedSuccess && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 14px',
              backgroundColor: '#D1E7DD',
              color: '#0F5132',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '16px',
              fontSize: '0.9rem'
            }}>
              <CheckCircle2 size={16} />
              <span>{isHi ? 'विवरण सफलतापूर्वक सुरक्षित कर लिया गया।' : 'Profile details saved successfully.'}</span>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="fm-btn fm-btn-primary">
              <Save size={18} />
              <span>{isHi ? 'विवरण सुरक्षित करें' : 'Save Profile'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Data Privacy & Security Assurance */}
      <div className="fm-card" style={{ marginBottom: 'var(--space-xl)', backgroundColor: 'var(--surface-sage-light)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary-forest)', marginBottom: '8px' }}>
          <ShieldCheck size={20} />
          <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>
            {isHi ? 'डेटा सुरक्षा एवं गोपनीयता' : 'Data Privacy & Security Guarantee'}
          </h3>
        </div>
        <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-dark)', lineHeight: 1.6 }}>
          {isHi 
            ? 'फसलमित्र पर दर्ज आपका मृदा परीक्षण और खेत का डेटा पूर्णतः गोपनीय है। हम कोई भी निजी डेटा किसी तीसरे पक्ष के साथ साझा नहीं करते हैं। आपके रिकॉर्ड्स केवल आपके डिवाइस और सुरक्षित लोकल डेटाबेस में सुरक्षित रहते हैं।' 
            : 'All soil and farm records remain strictly confidential and belong entirely to you. No personal agricultural data is shared with commercial third parties.'}
        </p>
      </div>

      {/* Emergency Kisan Support Numbers */}
      <div className="fm-card">
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-forest)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Phone size={18} />
          <span>{isHi ? 'महत्वपूर्ण किसान सहायता हेल्पलाइन' : 'Official Farmer Helplines'}</span>
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
          <div style={{ padding: '12px', backgroundColor: 'var(--surface-offwhite)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-neutral)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{isHi ? 'किसान कॉल सेंटर (निःशुल्क)' : 'Kisan Call Centre (Toll Free)'}</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary-forest)', marginTop: '4px' }}>
              1800-180-1551
            </div>
          </div>

          <div style={{ padding: '12px', backgroundColor: 'var(--surface-offwhite)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-neutral)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{isHi ? 'प्रधानमंत्री फसल बीमा हेल्पलाइन' : 'PMFBY Crop Insurance'}</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary-forest)', marginTop: '4px' }}>
              14447
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
