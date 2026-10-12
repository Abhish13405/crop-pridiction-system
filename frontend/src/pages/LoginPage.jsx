import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Sprout, Phone, User, ArrowRight, ShieldCheck, Globe, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login, lang, toggleLang } = useAuth();
  const isHi = lang === 'hi';
  const navigate = useNavigate();
  const location = useLocation();

  const [phone, setPhone] = useState('9876543210');
  const [name, setName] = useState('रामकुमार सिंह (Ram Kumar Singh)');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login(phone, name);
    setLoading(false);
    navigate(from, { replace: true });
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-page)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      {/* Top Brand Pill */}
      <div style={{ marginBottom: '24px', textAlign: 'center' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div className="fm-brand-icon" style={{ width: '48px', height: '48px' }}>
            <Sprout size={28} />
          </div>
          <div style={{ textAlign: 'left' }}>
            <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-forest)', display: 'block' }}>
              FasalMitra
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {isHi ? 'सही फसल, बेहतर कल।' : 'Sahi Fasal, Behtar Kal.'}
            </span>
          </div>
        </Link>
      </div>

      {/* Main Login Card */}
      <div className="fm-card" style={{ maxWidth: '440px', width: '100%', padding: '32px 28px', backgroundColor: '#FFFFFF' }}>
        <div style={{ marginBottom: '24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--primary-forest)' }}>
            {isHi ? 'किसान प्रवेश (Farmer Login)' : 'Farmer Portal Login'}
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            {isHi 
              ? 'अपने खेत की जानकारी व फसल सलाह देखने के लिए प्रवेश करें।' 
              : 'Sign in to access your registered farm records & advice.'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label className="fm-label" htmlFor="login-phone">
              <Phone size={15} style={{ display: 'inline', marginRight: '6px' }} />
              {isHi ? 'मोबाइल नंबर (Mobile Number)' : 'Mobile Number'}
            </label>
            <input
              id="login-phone"
              type="tel"
              className="fm-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="9876543210"
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label className="fm-label" htmlFor="login-name">
              <User size={15} style={{ display: 'inline', marginRight: '6px' }} />
              {isHi ? 'किसान का नाम (Farmer Name)' : 'Farmer Name'}
            </label>
            <input
              id="login-name"
              type="text"
              className="fm-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="fm-btn fm-btn-primary"
            style={{ width: '100%', justifyContent: 'center', minHeight: '48px', fontSize: '1rem' }}
            disabled={loading}
          >
            <span>{loading ? (isHi ? 'प्रवेश हो रहा है...' : 'Signing in...') : (isHi ? 'डैशबोर्ड में प्रवेश करें' : 'Enter Dashboard')}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Demo Fast Access Assurance */}
        <div style={{
          marginTop: '20px',
          padding: '12px',
          backgroundColor: 'var(--surface-sage-light)',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.82rem',
          color: 'var(--primary-forest)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <CheckCircle2 size={16} />
          <span>{isHi ? 'सरल व निःशुल्क सेवा • कोई पासवर्ड याद रखने की जरूरत नहीं' : 'Free & Simple • No password hassle for farmers'}</span>
        </div>

        {/* Bottom Link to Public Home & Language switch */}
        <div style={{
          marginTop: '24px',
          paddingTop: '16px',
          borderTop: '1px solid var(--border-neutral)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.85rem'
        }}>
          <Link to="/" style={{ color: 'var(--primary-forest)', fontWeight: 600 }}>
            ← {isHi ? 'मुख्य पृष्ठ पर वापस' : 'Back to Public Home'}
          </Link>

          <button
            type="button"
            onClick={toggleLang}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.85rem'
            }}
          >
            <Globe size={14} />
            <span>{isHi ? 'English' : 'हिन्दी'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
