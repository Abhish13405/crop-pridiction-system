import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Sprout, 
  User, 
  Mail, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Eye, 
  EyeOff, 
  Award, 
  Sparkles,
  Leaf,
  TrendingUp,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LandingAuthModalPage() {
  const { login, lang } = useAuth();
  const isHi = lang === 'hi';
  const navigate = useNavigate();

  const [mode, setMode] = useState('signup'); // 'signup' | 'login'
  const [name, setName] = useState('Abhishek Kushwaha');
  const [email, setEmail] = useState('abhishek@fasalmitra.ai');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Team Members as requested by the user
  const teamMembers = [
    { name: 'Abhishek Kushwaha', role: 'Team Lead & ML / Full-Stack Architect', badge: 'Lead' },
    { name: 'Aman Gupta', role: 'Frontend & Model Integration Engineer', badge: 'Core' },
    { name: 'Jaya Maurya', role: 'Data Analysis & Disease Model Specialist', badge: 'Core' },
    { name: 'Mriganka Singh', role: 'Agricultural Research & UI/UX Co-Lead', badge: 'Core' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login('9876543210', name || 'Kisan Mitra');
    } catch (err) {
      console.warn('Auth login error fallback:', err);
    } finally {
      setLoading(false);
      navigate('/dashboard');
    }
  };

  const handleGuestExplore = () => {
    login('9876543210', name || 'Abhishek Kushwaha');
    navigate('/dashboard');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#07160e',
      backgroundImage: `linear-gradient(rgba(5, 20, 12, 0.82), rgba(3, 15, 8, 0.90)), url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1920&q=80')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'var(--font-sans, system-ui, -apple-system, sans-serif)'
    }}>
      {/* Subtle background ambient blur blobs */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '10%',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(74, 222, 128, 0.15) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        right: '10%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(34, 197, 94, 0.12) 0%, transparent 70%)',
        filter: 'blur(70px)',
        pointerEvents: 'none'
      }} />

      {/* Main Elevated Modal Frame (similar to user mockup) */}
      <div style={{
        width: '100%',
        maxWidth: '1120px',
        background: '#e5e7eb',
        borderRadius: '28px',
        padding: '16px',
        boxShadow: '0 25px 70px -15px rgba(0, 0, 0, 0.75)',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Inner Split-Card */}
        <div style={{
          background: '#ffffff',
          borderRadius: '24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
        }}>

          {/* LEFT SIDE: Auth / Sign-up Form */}
          <div style={{
            padding: '40px 36px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: '#ffffff'
          }}>
            {/* Brand Logo & Name */}
            <div style={{ textAlign: 'center', marginBottom: '22px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#22c55e',
                fontWeight: 800,
                fontSize: '1.25rem',
                letterSpacing: '-0.3px',
                marginBottom: '6px'
              }}>
                <Sprout size={24} strokeWidth={2.5} />
                <span>GrowWise / FasalMitra</span>
              </div>
              <h1 style={{
                fontSize: '1.75rem',
                fontWeight: 900,
                color: '#0f172a',
                lineHeight: 1.2,
                margin: '6px 0 0 0'
              }}>
                {mode === 'signup' 
                  ? (isHi ? 'आपकी कृषि यात्रा यहाँ से शुरू होती है' : 'Your farming journey starts here') 
                  : (isHi ? 'अपने खाते में पुनः प्रवेश करें' : 'Welcome back to your farm')}
              </h1>
              <p style={{ fontSize: '0.86rem', color: '#64748b', marginTop: '6px' }}>
                {isHi 
                  ? 'एआई आधारित फसल सिफारिश, रोग पहचान एवं वास्तविक मंडी भाव'
                  : 'AI-powered crop recommendation, disease detection & real-time mandi rates'}
              </p>
            </div>

            {/* Social / Quick Login Icons */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginBottom: '20px' }}>
              <button
                type="button"
                onClick={handleGuestExplore}
                title="Quick Access via Google"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  border: '1px solid #e2e8f0',
                  background: '#f8fafc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.25 21.37 7.33 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.63 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
              </button>
              <button
                type="button"
                onClick={handleGuestExplore}
                title="Quick Access via Apple"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  border: '1px solid #e2e8f0',
                  background: '#f8fafc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#0f172a">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.87-.9.04-2 .6-2.64 1.36-.56.65-1.06 1.71-.93 2.74 1.01.08 2.04-.48 2.65-1.23z"/>
                </svg>
              </button>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Name field */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: '#ffffff',
                border: '1.5px solid #e2e8f0',
                borderRadius: '9999px',
                padding: '4px 18px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                transition: 'border 0.2s ease'
              }}>
                <User size={18} color="#94a3b8" style={{ marginRight: '10px', flexShrink: 0 }} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isHi ? 'किसान का नाम' : 'Full Name'}
                  required
                  style={{
                    border: 'none',
                    outline: 'none',
                    width: '100%',
                    padding: '10px 0',
                    fontSize: '0.95rem',
                    color: '#0f172a',
                    background: 'transparent'
                  }}
                />
              </div>

              {/* Email / Username field */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: '#ffffff',
                border: '1.5px solid #e2e8f0',
                borderRadius: '9999px',
                padding: '4px 18px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                transition: 'border 0.2s ease'
              }}>
                <Mail size={18} color="#94a3b8" style={{ marginRight: '10px', flexShrink: 0 }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isHi ? 'ईमेल या फ़ोन नंबर' : 'Email Address'}
                  required
                  style={{
                    border: 'none',
                    outline: 'none',
                    width: '100%',
                    padding: '10px 0',
                    fontSize: '0.95rem',
                    color: '#0f172a',
                    background: 'transparent'
                  }}
                />
              </div>

              {/* Password field */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: '#ffffff',
                border: '1.5px solid #e2e8f0',
                borderRadius: '9999px',
                padding: '4px 18px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                transition: 'border 0.2s ease'
              }}>
                <Lock size={18} color="#94a3b8" style={{ marginRight: '10px', flexShrink: 0 }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isHi ? 'पासवर्ड' : 'Password'}
                  required
                  style={{
                    border: 'none',
                    outline: 'none',
                    width: '100%',
                    padding: '10px 0',
                    fontSize: '0.95rem',
                    color: '#0f172a',
                    background: 'transparent'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#94a3b8',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Submit CTA Pill */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  marginTop: '10px',
                  backgroundColor: '#18181b',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '13px 24px',
                  fontSize: '0.98rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'background-color 0.2s ease, transform 0.1s ease',
                  boxShadow: '0 4px 12px rgba(24, 24, 27, 0.25)'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#27272a'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#18181b'}
              >
                <span>{loading ? (isHi ? 'लोड हो रहा है...' : 'Signing in...') : (mode === 'signup' ? 'Sign up' : 'Log in')}</span>
                <ArrowRight size={17} />
              </button>
            </form>

            {/* Toggle Sign up / Log in */}
            <div style={{ textAlign: 'center', marginTop: '18px', fontSize: '0.86rem', color: '#64748b' }}>
              {mode === 'signup' ? (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    style={{ background: 'none', border: 'none', color: '#0f172a', fontWeight: 800, cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Log in
                  </button>
                </>
              ) : (
                <>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    style={{ background: 'none', border: 'none', color: '#0f172a', fontWeight: 800, cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Sign up
                  </button>
                </>
              )}
            </div>

            {/* Fast Direct Access to Dashboard */}
            <div style={{ marginTop: '22px', paddingTop: '16px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                type="button"
                onClick={handleGuestExplore}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#15803d',
                  fontWeight: 700,
                  fontSize: '0.84rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <span>{isHi ? 'सीधे पोर्टल खोलें (Explore as Guest)' : 'Enter Dashboard directly'}</span>
                <ChevronRight size={15} />
              </button>
              <Link to="/mandi-rates" style={{ color: '#64748b', fontSize: '0.84rem', textDecoration: 'none', fontWeight: 500 }}>
                {isHi ? 'लाइव मंडी भाव' : 'Live Mandi Bhav'} →
              </Link>
            </div>
          </div>


          {/* RIGHT SIDE: Visual Card with Authentic Lush Green Agricultural Crop Fields & Team Members */}
          <div style={{
            position: 'relative',
            minHeight: '480px',
            backgroundImage: `linear-gradient(rgba(7, 26, 15, 0.45), rgba(4, 20, 10, 0.85)), url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '32px 28px',
            color: '#ffffff',
            margin: '12px',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: 'inset 0 0 40px rgba(0,0,0,0.3)'
          }}>
            {/* Top Emblem / Circular Logo (Matching the user screenshot's white badge) */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '10px'
            }}>
              <div style={{
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                border: '3.5px solid rgba(255, 255, 255, 0.95)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)'
              }}>
                <Sprout size={44} color="#ffffff" strokeWidth={2.2} />
              </div>
            </div>

            {/* Middle Badge / Project Highlight */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '16px',
              padding: '16px 20px',
              textAlign: 'center',
              margin: '16px 0'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.78rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                color: '#86efac',
                fontWeight: 800,
                marginBottom: '4px'
              }}>
                <Sparkles size={14} />
                <span>Agricultural AI Innovation</span>
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '2px 0 6px 0' }}>
                FasalMitra • Crop Prediction System
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.85)', margin: 0, lineHeight: 1.4 }}>
                Smart Crop Intelligence, Soil NPK Health, Plant Pathology & Live APMC Mandi Rates for Indian Farmers.
              </p>
            </div>

            {/* BOTTOM SECTION: Team Members Banner (As requested by user) */}
            <div style={{
              background: 'rgba(5, 20, 10, 0.82)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(74, 222, 128, 0.3)',
              borderRadius: '16px',
              padding: '16px 18px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
                paddingBottom: '8px',
                marginBottom: '10px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Users size={16} color="#4ade80" />
                  <span style={{ fontSize: '0.86rem', fontWeight: 800, letterSpacing: '0.3px', color: '#f0fdf4' }}>
                    Project Development Team
                  </span>
                </div>
                <span style={{
                  fontSize: '0.72rem',
                  background: 'rgba(74, 222, 128, 0.2)',
                  color: '#86efac',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  fontWeight: 700
                }}>
                  Core Contributors
                </span>
              </div>

              {/* Grid of Team Members */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '8px'
              }}>
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    style={{
                      background: 'rgba(255, 255, 255, 0.07)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px',
                      padding: '8px 10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      background: index === 0 ? '#22c55e' : 'rgba(255, 255, 255, 0.2)',
                      color: index === 0 ? '#052e16' : '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      flexShrink: 0
                    }}>
                      {member.name.charAt(0)}
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: '#ffffff',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden'
                      }}>
                        {member.name}
                      </div>
                      <div style={{
                        fontSize: '0.68rem',
                        color: 'rgba(255, 255, 255, 0.7)',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden'
                      }}>
                        {member.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
