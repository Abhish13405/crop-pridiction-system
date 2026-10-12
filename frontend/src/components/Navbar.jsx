import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sprout, LayoutDashboard, Home, Globe, ShieldAlert, LogIn, Store } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { lang, toggleLang, isAuthenticated } = useAuth();
  const isHi = lang === 'hi';
  const location = useLocation();

  return (
    <header className="fm-navbar">
      <div className="fm-nav-inner">
        {/* Brand */}
        <Link to="/" className="fm-brand">
          <div className="fm-brand-icon" aria-hidden="true">
            <Sprout size={24} />
          </div>
          <div className="fm-brand-text">
            <span className="fm-brand-title">FasalMitra</span>
            <span className="fm-brand-tagline">
              {isHi ? 'सही फसल, बेहतर कल।' : 'Sahi Fasal, Behtar Kal.'}
            </span>
          </div>
        </Link>

        {/* Public Horizontal Navigation Links & Language Switch */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <nav className="fm-nav-links" aria-label="मुख्य नेविगेशन">
            <Link
              to="/"
              className={`fm-nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              <Home size={18} />
              <span>{isHi ? 'मुख्य पृष्ठ' : 'Home'}</span>
            </Link>

            <Link
              to="/crop-recommendation"
              className={`fm-nav-link ${location.pathname === '/crop-recommendation' ? 'active' : ''}`}
            >
              <Sprout size={18} />
              <span>{isHi ? 'फसल सलाह' : 'Crop Advice'}</span>
            </Link>

            <Link
              to="/disease-detection"
              className={`fm-nav-link ${location.pathname === '/disease-detection' ? 'active' : ''}`}
            >
              <ShieldAlert size={18} />
              <span>{isHi ? 'रोग पहचान' : 'Disease Detection'}</span>
            </Link>

            <Link
              to="/mandi-bhav"
              className={`fm-nav-link ${location.pathname === '/mandi-bhav' ? 'active' : ''}`}
            >
              <Store size={18} />
              <span>{isHi ? 'मंडी भाव' : 'Mandi Rates'}</span>
            </Link>

            <Link
              to={isAuthenticated ? "/dashboard" : "/login"}
              className={`fm-nav-link ${location.pathname.startsWith('/dashboard') ? 'active' : ''}`}
              style={{
                backgroundColor: 'var(--primary-forest)',
                color: '#FFFFFF',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              <LayoutDashboard size={18} />
              <span>
                {isAuthenticated 
                  ? (isHi ? 'किसान डैशबोर्ड' : 'Dashboard') 
                  : (isHi ? 'किसान प्रवेश' : 'Farmer Login')}
              </span>
            </Link>
          </nav>

          {/* Language Toggle Button */}
          <button
            type="button"
            className="fm-lang-btn"
            onClick={toggleLang}
            title={isHi ? 'Switch to English' : 'हिंदी में बदलें'}
            aria-label="भाषा बदलें (Change Language)"
          >
            <Globe size={16} />
            <span>{isHi ? 'English' : 'हिन्दी'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
