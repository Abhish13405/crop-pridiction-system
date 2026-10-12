import React from 'react';
import { Sprout, PhoneCall, ShieldCheck } from 'lucide-react';

export default function Footer({ lang }) {
  const isHi = lang === 'hi';

  return (
    <footer className="fm-footer">
      <div className="fm-footer-inner">
        <div className="fm-footer-brand">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-forest)', fontWeight: 700 }}>
            <Sprout size={20} />
            <span>FasalMitra (फसलमित्र)</span>
          </div>
          <p className="fm-footer-text">
            {isHi 
              ? 'भारतीय किसान भाइयों के लिए विश्वसनीय कृषि सलाहकार प्रणाली।' 
              : 'Dedicated agricultural advisory platform for Indian farmers.'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <PhoneCall size={16} />
            <span>{isHi ? 'किसान कॉल सेंटर: 1800-180-1551 (टोल फ्री)' : 'Kisan Call Centre: 1800-180-1551'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <ShieldCheck size={16} />
            <span>{isHi ? 'प्रमाणित वैज्ञानिक कृषि डेटा' : 'Verified Agronomic Data'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
