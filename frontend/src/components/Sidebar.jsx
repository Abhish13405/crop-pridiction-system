import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Sprout, 
  ShieldAlert, 
  FlaskConical, 
  CloudSun, 
  FileText, 
  User, 
  Settings, 
  LogOut, 
  X, 
  Globe,
  Home,
  Store
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({ mobileOpen, onCloseMobile }) {
  const { user, lang, toggleLang, logout } = useAuth();
  const isHi = lang === 'hi';
  const navigate = useNavigate();

  const links = [
    { 
      to: '/dashboard', 
      label_hi: 'डैशबोर्ड', 
      label_en: 'Dashboard', 
      icon: LayoutDashboard 
    },
    { 
      to: '/crop-recommendation', 
      label_hi: 'फसल सलाह', 
      label_en: 'Crop Recommendation', 
      icon: Sprout 
    },
    { 
      to: '/disease-detection', 
      label_hi: 'पौधे की बीमारी पहचान', 
      label_en: 'Plant Disease Detection', 
      icon: ShieldAlert 
    },
    { 
      to: '/mandi-bhav', 
      label_hi: 'मंडी भाव (बाज़ार दरें)', 
      label_en: 'Mandi Bhav (Live Rates)', 
      icon: Store 
    },
    { 
      to: '/soil-health', 
      label_hi: 'मृदा स्वास्थ्य कार्ड', 
      label_en: 'Soil Health Card', 
      icon: FlaskConical 
    },
    { 
      to: '/weather', 
      label_hi: 'मौसम पूर्वानुमान', 
      label_en: 'Weather Forecast', 
      icon: CloudSun 
    },
    { 
      to: '/history', 
      label_hi: 'इतिहास व रिपोर्ट', 
      label_en: 'History & Reports', 
      icon: FileText 
    },
    { 
      to: '/profile', 
      label_hi: 'किसान प्रोफ़ाइल', 
      label_en: 'Farmer Profile', 
      icon: User 
    },
    { 
      to: '/settings', 
      label_hi: 'सेटिंग्स', 
      label_en: 'Settings', 
      icon: Settings 
    },
  ];

  const handleLogout = async () => {
    if (onCloseMobile) onCloseMobile();
    await logout();
    navigate('/');
  };

  const handleLinkClick = () => {
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div 
          className="fm-sidebar-backdrop" 
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Main Left Sidebar */}
      <aside className={`fm-sidebar ${mobileOpen ? 'fm-sidebar-mobile-open' : ''}`}>
        {/* 1. Sidebar Brand Header */}
        <div className="fm-sidebar-header">
          <div 
            className="fm-sidebar-brand"
            onClick={() => { navigate('/dashboard'); handleLinkClick(); }}
            role="button"
            tabIndex={0}
          >
            <div className="fm-brand-icon">
              <Sprout size={22} />
            </div>
            <div className="fm-brand-text">
              <span className="fm-brand-title">FasalMitra</span>
              <span className="fm-brand-tagline">
                {isHi ? 'सही फसल, बेहतर कल।' : 'Sahi Fasal, Behtar Kal.'}
              </span>
            </div>
          </div>

          {/* Mobile Close Button */}
          <button 
            type="button" 
            className="fm-sidebar-close-btn"
            onClick={onCloseMobile}
            aria-label="मेनू बंद करें"
          >
            <X size={20} />
          </button>
        </div>

        {/* 2. Navigation Links */}
        <nav className="fm-sidebar-nav" aria-label="डैशबोर्ड नेविगेशन">
          <div className="fm-sidebar-nav-group">
            <span className="fm-sidebar-group-title">
              {isHi ? 'कृषि सेवाएं' : 'Farming Modules'}
            </span>

            {links.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={handleLinkClick}
                  className={({ isActive }) => 
                    `fm-sidebar-link ${isActive ? 'active' : ''}`
                  }
                >
                  <Icon size={19} className="fm-sidebar-link-icon" />
                  <span className="fm-sidebar-link-text">
                    {isHi ? item.label_hi : item.label_en}
                  </span>
                </NavLink>
              );
            })}
          </div>

          {/* Quick link to public home */}
          <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border-neutral)' }}>
            <NavLink
              to="/"
              onClick={handleLinkClick}
              className="fm-sidebar-link fm-sidebar-link-secondary"
            >
              <Home size={18} className="fm-sidebar-link-icon" />
              <span className="fm-sidebar-link-text">
                {isHi ? 'मुख्य पोर्टल पर जाएं' : 'Back to Public Home'}
              </span>
            </NavLink>
          </div>
        </nav>

        {/* 3. Account & Settings Section at the Bottom */}
        <div className="fm-sidebar-footer">
          {/* Language Toggle in Sidebar */}
          <button 
            type="button" 
            className="fm-sidebar-lang-btn"
            onClick={toggleLang}
            title={isHi ? 'Switch to English' : 'हिंदी में बदलें'}
          >
            <Globe size={16} />
            <span>{isHi ? 'Language: English' : 'भाषा: हिन्दी'}</span>
          </button>

          {/* Farmer Account Badge */}
          <div className="fm-sidebar-user-card">
            <div className="fm-sidebar-user-avatar">
              <User size={18} />
            </div>
            <div className="fm-sidebar-user-info">
              <span className="fm-sidebar-user-name">
                {user?.name ? user.name.split('(')[0].trim() : (isHi ? 'किसान मित्र' : 'Farmer')}
              </span>
              <span className="fm-sidebar-user-meta">
                {user?.phone || user?.district || 'वाराणसी, उत्तर प्रदेश'}
              </span>
            </div>
          </div>

          {/* Logout Button */}
          <button 
            type="button" 
            className="fm-sidebar-logout-btn"
            onClick={handleLogout}
            title={isHi ? 'खाते से बाहर निकलें' : 'Log out from your account'}
          >
            <LogOut size={17} />
            <span>{isHi ? 'लॉगआउट (Logout)' : 'Logout'}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
