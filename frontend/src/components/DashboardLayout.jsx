import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu, Globe, Sprout, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, toggleLang, user } = useAuth();
  const isHi = lang === 'hi';
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Page title mapping based on current route
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return isHi ? 'किसान डैशबोर्ड' : 'Farmer Dashboard';
      case '/crop-recommendation':
        return isHi ? 'फसल सिफारिश' : 'Crop Recommendation';
      case '/recommendation-result':
        return isHi ? 'सलाह परिणाम पर्ची' : 'Advisory Report';
      case '/disease-detection':
        return isHi ? 'पौधे की बीमारी पहचान' : 'Plant Disease Detection';
      case '/soil-health':
        return isHi ? 'मृदा स्वास्थ्य कार्ड' : 'Soil Health Card';
      case '/weather':
        return isHi ? 'कृषि मौसम पूर्वानुमान' : 'Agro-Weather Forecast';
      case '/history':
        return isHi ? 'सलाह इतिहास' : 'Advisory History';
      case '/profile':
        return isHi ? 'किसान प्रोफ़ाइल' : 'Farmer Profile';
      case '/settings':
        return isHi ? 'ऐप सेटिंग्स' : 'App Settings';
      default:
        return 'FasalMitra';
    }
  };

  return (
    <div className="fm-dashboard-shell">
      {/* 1. Left Sticky Sidebar (Only on authenticated pages) */}
      <Sidebar 
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* 2. Main Content Right Area */}
      <div className="fm-dashboard-content-area">
        {/* Top Bar for Dashboard Pages */}
        <header className="fm-dashboard-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Hamburger button (visible on mobile / tablet) */}
            <button
              type="button"
              className="fm-hamburger-btn"
              onClick={() => setMobileOpen(true)}
              aria-label="मेनू खोलें (Open Menu)"
            >
              <Menu size={22} />
            </button>

            {/* Current Page Title */}
            <div>
              <h1 className="fm-topbar-title">{getPageTitle()}</h1>
            </div>
          </div>

          {/* Top Bar Right: Farmer Name & Language Switch */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="fm-topbar-farmer-badge">
              <span className="fm-online-dot"></span>
              {user?.name ? user.name.split('(')[0].trim() : (isHi ? 'पंजीकृत किसान' : 'Farmer')}
            </span>

            <button
              type="button"
              className="fm-lang-btn"
              onClick={toggleLang}
              title={isHi ? 'Switch to English' : 'हिंदी में बदलें'}
              style={{ padding: '6px 12px', minHeight: '38px' }}
            >
              <Globe size={16} />
              <span>{isHi ? 'English' : 'हिन्दी'}</span>
            </button>
          </div>
        </header>

        {/* Dynamic Page Outlet */}
        <main className="fm-dashboard-main-viewport">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
