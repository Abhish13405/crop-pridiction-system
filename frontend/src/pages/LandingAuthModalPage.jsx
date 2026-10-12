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
  Sparkles,
  MapPin,
  Phone,
  Compass,
  Layers,
  ChevronRight,
  Globe,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LandingAuthModalPage() {
  const { register, login, guestLogin, lang, toggleLang } = useAuth();
  const isHi = lang === 'hi';
  const navigate = useNavigate();

  // Mode: 'signup' | 'login'
  const [mode, setMode] = useState('signup');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Signup Form Fields
  const [signupData, setSignupData] = useState({
    name: 'Abhishek Kushwaha',
    email: 'abhishek@fasalmitra.ai',
    phone: '9876543210',
    password: 'password123',
    confirmPassword: 'password123',
    state: isHi ? 'उत्तर प्रदेश (Uttar Pradesh)' : 'Uttar Pradesh',
    city: isHi ? 'वाराणसी (Varanasi)' : 'Varanasi',
    village: isHi ? 'रोहनिया (Rohaniya)' : 'Rohaniya',
    area_acres: '3.5',
    soil_type: isHi ? 'दोमट मिट्टी (Loamy Soil)' : 'Loamy Soil'
  });

  // Login Form Fields
  const [loginIdentifier, setLoginIdentifier] = useState('abhishek@fasalmitra.ai');
  const [loginPassword, setLoginPassword] = useState('password123');

  // Indian Agricultural States
  const indianStatesHi = [
    'उत्तर प्रदेश (Uttar Pradesh)',
    'बिहार (Bihar)',
    'मध्य प्रदेश (Madhya Pradesh)',
    'पंजाब (Punjab)',
    'हरियाणा (Haryana)',
    'राजस्थान (Rajasthan)',
    'महाराष्ट्र (Maharashtra)',
    'गुजरात (Gujarat)',
    'पश्चिम बंगाल (West Bengal)',
    'कर्नाटक (Karnataka)',
    'उत्तराखंड (Uttarakhand)',
    'झारखंड (Jharkhand)',
    'छत्तीसगढ़ (Chhattisgarh)'
  ];

  const indianStatesEn = [
    'Uttar Pradesh',
    'Bihar',
    'Madhya Pradesh',
    'Punjab',
    'Haryana',
    'Rajasthan',
    'Maharashtra',
    'Gujarat',
    'West Bengal',
    'Karnataka',
    'Uttarakhand',
    'Jharkhand',
    'Chhattisgarh'
  ];

  // Soil types
  const soilTypesHi = [
    'दोमट मिट्टी (Loamy Soil)',
    'काली मिट्टी (Black Soil / Regur)',
    'जलोढ़ मिट्टी (Alluvial Soil)',
    'बलुई दोमट (Sandy Loam)',
    'लाल और पीली मिट्टी (Red & Yellow Soil)',
    'चिकनी मिट्टी (Clay Soil)'
  ];

  const soilTypesEn = [
    'Loamy Soil',
    'Black Soil (Regur)',
    'Alluvial Soil',
    'Sandy Loam',
    'Red & Yellow Soil',
    'Clay Soil'
  ];

  // Team Members
  const teamMembers = [
    { 
      name: 'Abhishek Kushwaha', 
      roleHi: 'टीम लीडर एवं एमएल / फुल-स्टैक आर्किटेक्ट',
      roleEn: 'Team Lead & ML / Full-Stack Architect', 
      badge: 'Lead' 
    },
    { 
      name: 'Aman Gupta', 
      roleHi: 'फ्रंटएंड एवं मॉडल इंटीग्रेशन इंजीनियर',
      roleEn: 'Frontend & Model Integration Engineer', 
      badge: 'Core' 
    },
    { 
      name: 'Jaya Maurya', 
      roleHi: 'डेटा विश्लेषण एवं पौध रोग विशेषज्ञ',
      roleEn: 'Data Analysis & Disease Model Specialist', 
      badge: 'Core' 
    },
    { 
      name: 'Mriganka Singh', 
      roleHi: 'कृषि अनुसंधान एवं यूआई/यूएक्स को-लीड',
      roleEn: 'Agricultural Research & UI/UX Co-Lead', 
      badge: 'Core' 
    }
  ];

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData(prev => ({ ...prev, [name]: value }));
  };

  // Handle Signup Submission
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!signupData.name.trim()) {
      setErrorMsg(isHi ? 'कृपया अपना पूरा नाम दर्ज करें।' : 'Please enter your full name.');
      return;
    }
    if (signupData.password !== signupData.confirmPassword) {
      setErrorMsg(isHi ? 'पासवर्ड और पुष्टि पासवर्ड एक समान होने चाहिए!' : 'Password and Confirm Password must match!');
      return;
    }

    setLoading(true);
    try {
      const res = await register(signupData);
      if (res && res.success) {
        setSuccessMsg(
          isHi 
            ? '✅ पंजीकरण सफल! आपका खाता सुरक्षित बन गया है। अब कृपया लॉगिन करें।' 
            : '✅ Registration successful! Your account is created. Please log in now.'
        );
        setLoginIdentifier(signupData.email || signupData.phone);
        setLoginPassword(signupData.password);
        setTimeout(() => {
          setMode('login');
        }, 1200);
      } else {
        setErrorMsg(res?.error || (isHi ? 'पंजीकरण में त्रुटि आई। कृपया पुनः प्रयास करें।' : 'Registration failed. Please try again.'));
      }
    } catch (err) {
      console.error('Signup error:', err);
      setErrorMsg(isHi ? 'सर्वर से कनेक्ट होने में समस्या आई।' : 'Server connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Login Submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    try {
      await login({
        email: loginIdentifier,
        phone: loginIdentifier,
        password: loginPassword,
        name: signupData.name || (isHi ? 'किसान' : 'Farmer')
      });
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setErrorMsg(isHi ? 'लॉगिन करने में त्रुटि। कृपया पुनः प्रयास करें।' : 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Guest Mode (Bypass login completely)
  const handleGuestExplore = () => {
    guestLogin();
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
      fontFamily: 'var(--font-sans, system-ui, -apple-system, sans-serif)'
    }}>
      {/* Background ambient lighting */}
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

      {/* Main Container */}
      <div style={{
        width: '100%',
        maxWidth: '1180px',
        background: '#e5e7eb',
        borderRadius: '28px',
        padding: '16px',
        boxShadow: '0 25px 70px -15px rgba(0, 0, 0, 0.75)',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          background: '#ffffff',
          borderRadius: '24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
        }}>

          {/* LEFT SIDE: Agricultural Showcase & Team Members */}
          <div style={{
            position: 'relative',
            minHeight: '520px',
            backgroundImage: `linear-gradient(rgba(7, 26, 15, 0.45), rgba(4, 20, 10, 0.88)), url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '30px 26px',
            color: '#ffffff',
            margin: '12px',
            borderRadius: '20px',
            overflow: 'hidden'
          }}>
            {/* Top Emblem & Language Switch */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: '2px solid rgba(255, 255, 255, 0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(8px)'
                }}>
                  <Sprout size={26} color="#ffffff" strokeWidth={2.4} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 900, margin: 0, letterSpacing: '-0.3px' }}>
                    FasalMitra AI
                  </h3>
                  <span style={{ fontSize: '0.78rem', color: '#86efac', fontWeight: 600 }}>
                    {isHi ? 'स्मार्ट कृषि निर्णय प्रणाली' : 'Smart Agriculture Decision System'}
                  </span>
                </div>
              </div>

              {/* Language Switcher Pill */}
              <button
                type="button"
                onClick={toggleLang}
                title={isHi ? 'Switch to English' : 'हिंदी में बदलें'}
                style={{
                  background: 'rgba(255, 255, 255, 0.18)',
                  border: '1.5px solid rgba(255, 255, 255, 0.5)',
                  color: '#ffffff',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.2s ease'
                }}
              >
                <Globe size={14} color="#86efac" />
                <span>{isHi ? 'English Version' : 'हिन्दी संस्करण'}</span>
              </button>
            </div>

            {/* Middle Feature Highlights */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '16px',
              padding: '16px 18px',
              margin: '20px 0'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.76rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                color: '#86efac',
                fontWeight: 800,
                marginBottom: '6px'
              }}>
                <Sparkles size={14} />
                <span>{isHi ? 'आधुनिक कृषि नवाचार' : 'Agricultural AI Innovation'}</span>
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '2px 0 6px 0' }}>
                {isHi 
                  ? 'सटीक फसल चयन • रोग निदान • लाइव मंडी भाव' 
                  : 'Precise Crop Selection • Plant Pathology • Live Mandi Rates'}
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.88)', margin: 0, lineHeight: 1.45 }}>
                {isHi 
                  ? 'मशीन लर्निंग (Random Forest 99.55% Acc) और डीप लर्निंग (CNN 30 Classes) द्वारा संचालित संपूर्ण किसान सहायता मंच।' 
                  : 'Empowered by Random Forest (99.55% Acc) and Deep Learning (CNN 30 Classes) for precision Indian agriculture.'}
              </p>
            </div>

            {/* BOTTOM SECTION: Team Members Banner */}
            <div style={{
              background: 'rgba(5, 20, 10, 0.86)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(74, 222, 128, 0.35)',
              borderRadius: '16px',
              padding: '14px 16px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
                paddingBottom: '8px',
                marginBottom: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Users size={16} color="#4ade80" />
                  <span style={{ fontSize: '0.84rem', fontWeight: 800, color: '#f0fdf4' }}>
                    {isHi ? 'परियोजना विकास दल (Project Team)' : 'Project Development Team'}
                  </span>
                </div>
                <span style={{
                  fontSize: '0.7rem',
                  background: 'rgba(74, 222, 128, 0.25)',
                  color: '#86efac',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  fontWeight: 700
                }}>
                  {isHi ? 'प्रमुख योगदानकर्ता' : 'Core Contributors'}
                </span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '8px'
              }}>
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '8px',
                      padding: '6px 8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: index === 0 ? '#22c55e' : 'rgba(255, 255, 255, 0.2)',
                      color: index === 0 ? '#052e16' : '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      flexShrink: 0
                    }}>
                      {member.name.charAt(0)}
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        color: '#ffffff',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden'
                      }}>
                        {member.name}
                      </div>
                      <div style={{
                        fontSize: '0.65rem',
                        color: 'rgba(255, 255, 255, 0.72)',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden'
                      }}>
                        {isHi ? member.roleHi : member.roleEn}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: Interactive Auth Panel (Sign Up / Log In / Guest Mode) */}
          <div style={{
            padding: '32px 30px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: '#ffffff'
          }}>

            {/* Top Language Toggle Switch for Right Column */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
              <button
                type="button"
                onClick={toggleLang}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  color: '#334155',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Globe size={13} color="#16a34a" />
                <span>{isHi ? 'Switch to English' : 'हिंदी में बदलें'}</span>
              </button>
            </div>

            {/* Mode Toggle Pills (Sign Up vs Log In) */}
            <div style={{
              display: 'flex',
              background: '#f1f5f9',
              padding: '4px',
              borderRadius: '9999px',
              marginBottom: '18px'
            }}>
              <button
                type="button"
                onClick={() => { setMode('signup'); setErrorMsg(''); setSuccessMsg(''); }}
                style={{
                  flex: 1,
                  padding: '9px 16px',
                  borderRadius: '9999px',
                  border: 'none',
                  background: mode === 'signup' ? '#18181b' : 'transparent',
                  color: mode === 'signup' ? '#ffffff' : '#64748b',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {isHi ? '1. नया खाता बनाएं (Sign Up)' : '1. Create Account (Sign Up)'}
              </button>
              <button
                type="button"
                onClick={() => { setMode('login'); setErrorMsg(''); setSuccessMsg(''); }}
                style={{
                  flex: 1,
                  padding: '9px 16px',
                  borderRadius: '9999px',
                  border: 'none',
                  background: mode === 'login' ? '#18181b' : 'transparent',
                  color: mode === 'login' ? '#ffffff' : '#64748b',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {isHi ? '2. लॉगिन करें (Log In)' : '2. Sign In (Log In)'}
              </button>
            </div>

            {/* Status Notifications */}
            {successMsg && (
              <div style={{
                background: '#f0fdf4',
                border: '1.5px solid #86efac',
                color: '#166534',
                padding: '10px 14px',
                borderRadius: '12px',
                fontSize: '0.85rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px'
              }}>
                <CheckCircle2 size={18} color="#22c55e" flexShrink={0} />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div style={{
                background: '#fef2f2',
                border: '1.5px solid #fca5a5',
                color: '#991b1b',
                padding: '10px 14px',
                borderRadius: '12px',
                fontSize: '0.85rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px'
              }}>
                <AlertCircle size={18} color="#ef4444" flexShrink={0} />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* FORM 1: FULL SIGN UP FORM */}
            {mode === 'signup' ? (
              <form onSubmit={handleSignupSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ marginBottom: '4px' }}>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0' }}>
                    {isHi ? 'किसान पंजीकरण फॉर्म' : 'Farmer Registration Form'}
                  </h2>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>
                    {isHi 
                      ? 'सटीक कृषि सलाह और व्यक्तिगत रिकॉर्ड के लिए कृपया अपनी सही जानकारी भरें:' 
                      : 'Please provide your farm details for personalized AI recommendations & records:'}
                  </p>
                </div>

                {/* 1. Name & Email */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>
                      {isHi ? 'पूरा नाम (Full Name) *' : 'Full Name *'}
                    </label>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '10px',
                      padding: '4px 12px',
                      background: '#ffffff'
                    }}>
                      <User size={16} color="#64748b" style={{ marginRight: '8px' }} />
                      <input
                        type="text"
                        name="name"
                        value={signupData.name}
                        onChange={handleSignupChange}
                        placeholder={isHi ? 'उदा. अभिषेक कुशवाहा' : 'e.g. Abhishek Kushwaha'}
                        required
                        style={{ border: 'none', outline: 'none', width: '100%', padding: '8px 0', fontSize: '0.88rem' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>
                      {isHi ? 'ईमेल पता (Email) *' : 'Email Address *'}
                    </label>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '10px',
                      padding: '4px 12px',
                      background: '#ffffff'
                    }}>
                      <Mail size={16} color="#64748b" style={{ marginRight: '8px' }} />
                      <input
                        type="email"
                        name="email"
                        value={signupData.email}
                        onChange={handleSignupChange}
                        placeholder="abhishek@fasalmitra.ai"
                        required
                        style={{ border: 'none', outline: 'none', width: '100%', padding: '8px 0', fontSize: '0.88rem' }}
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Phone & State */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>
                      {isHi ? 'मोबाइल नंबर (Phone) *' : 'Phone Number *'}
                    </label>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '10px',
                      padding: '4px 12px',
                      background: '#ffffff'
                    }}>
                      <Phone size={16} color="#64748b" style={{ marginRight: '8px' }} />
                      <input
                        type="tel"
                        name="phone"
                        value={signupData.phone}
                        onChange={handleSignupChange}
                        placeholder="9876543210"
                        required
                        style={{ border: 'none', outline: 'none', width: '100%', padding: '8px 0', fontSize: '0.88rem' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>
                      {isHi ? 'राज्य (State) *' : 'State *'}
                    </label>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '10px',
                      padding: '4px 12px',
                      background: '#ffffff'
                    }}>
                      <MapPin size={16} color="#64748b" style={{ marginRight: '8px' }} />
                      <select
                        name="state"
                        value={signupData.state}
                        onChange={handleSignupChange}
                        style={{ border: 'none', outline: 'none', width: '100%', padding: '8px 0', fontSize: '0.86rem', background: 'transparent' }}
                      >
                        {(isHi ? indianStatesHi : indianStatesEn).map((st, i) => (
                          <option key={i} value={st}>{st}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* 3. City/District & Village/Location */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>
                      {isHi ? 'जिला / शहर (City / District) *' : 'City / District *'}
                    </label>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '10px',
                      padding: '4px 12px',
                      background: '#ffffff'
                    }}>
                      <Compass size={16} color="#64748b" style={{ marginRight: '8px' }} />
                      <input
                        type="text"
                        name="city"
                        value={signupData.city}
                        onChange={handleSignupChange}
                        placeholder={isHi ? 'उदा. वाराणसी / लखनऊ / पटना' : 'e.g. Varanasi / Lucknow / Patna'}
                        required
                        style={{ border: 'none', outline: 'none', width: '100%', padding: '8px 0', fontSize: '0.88rem' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>
                      {isHi ? 'गाँव / तहसील (Village / Location) *' : 'Village / Location *'}
                    </label>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '10px',
                      padding: '4px 12px',
                      background: '#ffffff'
                    }}>
                      <MapPin size={16} color="#64748b" style={{ marginRight: '8px' }} />
                      <input
                        type="text"
                        name="village"
                        value={signupData.village}
                        onChange={handleSignupChange}
                        placeholder={isHi ? 'उदा. रोहनिया / रामगढ़' : 'e.g. Rohaniya / Ramgarh'}
                        required
                        style={{ border: 'none', outline: 'none', width: '100%', padding: '8px 0', fontSize: '0.88rem' }}
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Farm Area & Soil Type */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>
                      {isHi ? 'खेत का रकबा (Area in Acres)' : 'Farm Area (Acres)'}
                    </label>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '10px',
                      padding: '4px 12px',
                      background: '#ffffff'
                    }}>
                      <Layers size={16} color="#64748b" style={{ marginRight: '8px' }} />
                      <input
                        type="number"
                        step="0.5"
                        name="area_acres"
                        value={signupData.area_acres}
                        onChange={handleSignupChange}
                        placeholder="3.5"
                        style={{ border: 'none', outline: 'none', width: '100%', padding: '8px 0', fontSize: '0.88rem' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>
                      {isHi ? 'मिट्टी का प्रकार (Soil Type)' : 'Soil Type'}
                    </label>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '10px',
                      padding: '4px 12px',
                      background: '#ffffff'
                    }}>
                      <Sprout size={16} color="#64748b" style={{ marginRight: '8px' }} />
                      <select
                        name="soil_type"
                        value={signupData.soil_type}
                        onChange={handleSignupChange}
                        style={{ border: 'none', outline: 'none', width: '100%', padding: '8px 0', fontSize: '0.86rem', background: 'transparent' }}
                      >
                        {(isHi ? soilTypesHi : soilTypesEn).map((st, i) => (
                          <option key={i} value={st}>{st}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* 5. Password & Confirm Password */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>
                      {isHi ? 'पासवर्ड (Password) *' : 'Password *'}
                    </label>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '10px',
                      padding: '4px 12px',
                      background: '#ffffff'
                    }}>
                      <Lock size={16} color="#64748b" style={{ marginRight: '8px' }} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={signupData.password}
                        onChange={handleSignupChange}
                        placeholder={isHi ? 'पासवर्ड बनाएं' : 'Create password'}
                        required
                        style={{ border: 'none', outline: 'none', width: '100%', padding: '8px 0', fontSize: '0.88rem' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>
                      {isHi ? 'पासवर्ड पुष्टि (Confirm) *' : 'Confirm Password *'}
                    </label>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '10px',
                      padding: '4px 12px',
                      background: '#ffffff'
                    }}>
                      <Lock size={16} color="#64748b" style={{ marginRight: '8px' }} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={signupData.confirmPassword}
                        onChange={handleSignupChange}
                        placeholder={isHi ? 'पासवर्ड पुनः दर्ज करें' : 'Re-enter password'}
                        required
                        style={{ border: 'none', outline: 'none', width: '100%', padding: '8px 0', fontSize: '0.88rem' }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '2px' }}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Submit Signup Button */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    marginTop: '8px',
                    backgroundColor: '#16a34a',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '13px 20px',
                    fontSize: '0.96rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#15803d'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}
                >
                  <span>
                    {loading 
                      ? (isHi ? 'पंजीकरण हो रहा है...' : 'Creating Account...') 
                      : (isHi ? 'खाता बनाएं एवं आगे बढ़ें (Register & Continue)' : 'Register & Continue')}
                  </span>
                  <ArrowRight size={17} />
                </button>
              </form>
            ) : (
              /* FORM 2: LOGIN FORM */
              <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ marginBottom: '8px' }}>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0' }}>
                    {isHi ? 'किसान लॉगिन (Farmer Login)' : 'Farmer Login'}
                  </h2>
                  <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0 }}>
                    {isHi 
                      ? 'अपने पंजीकृत ईमेल या फ़ोन नंबर और पासवर्ड से पोर्टल में प्रवेश करें:' 
                      : 'Sign in with your registered email or mobile number and password:'}
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>
                    {isHi ? 'ईमेल अथवा मोबाइल नंबर (Email / Phone) *' : 'Email or Phone Number *'}
                  </label>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1.5px solid #cbd5e1',
                    borderRadius: '12px',
                    padding: '6px 14px',
                    background: '#ffffff'
                  }}>
                    <Mail size={18} color="#64748b" style={{ marginRight: '10px' }} />
                    <input
                      type="text"
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      placeholder={isHi ? 'abhishek@fasalmitra.ai या 9876543210' : 'abhishek@fasalmitra.ai or 9876543210'}
                      required
                      style={{ border: 'none', outline: 'none', width: '100%', padding: '8px 0', fontSize: '0.92rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>
                    {isHi ? 'पासवर्ड (Password) *' : 'Password *'}
                  </label>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1.5px solid #cbd5e1',
                    borderRadius: '12px',
                    padding: '6px 14px',
                    background: '#ffffff'
                  }}>
                    <Lock size={18} color="#64748b" style={{ marginRight: '10px' }} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••••••"
                      required
                      style={{ border: 'none', outline: 'none', width: '100%', padding: '8px 0', fontSize: '0.92rem' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '4px' }}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    marginTop: '8px',
                    backgroundColor: '#18181b',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '13px 20px',
                    fontSize: '0.96rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(24, 24, 27, 0.25)',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#27272a'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#18181b'}
                >
                  <span>
                    {loading 
                      ? (isHi ? 'सत्यापन हो रहा है...' : 'Verifying...') 
                      : (isHi ? 'लॉगिन करें और प्रवेश करें (Log In)' : 'Log In to Portal')}
                  </span>
                  <ArrowRight size={17} />
                </button>
              </form>
            )}

            {/* SEPARATOR & GUEST MODE HIGHLIGHT */}
            <div style={{
              margin: '22px 0 16px 0',
              paddingTop: '16px',
              borderTop: '1.5px dashed #e2e8f0',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '0.8rem',
                color: '#64748b',
                fontWeight: 600,
                marginBottom: '10px'
              }}>
                {isHi ? 'या बिना लॉगिन किए सीधे इस्तेमाल करें:' : 'Or explore immediately without signing in:'}
              </div>

              {/* GUEST MODE CARD / BUTTON */}
              <button
                type="button"
                onClick={handleGuestExplore}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                  border: '2px solid #86efac',
                  borderRadius: '14px',
                  padding: '12px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 8px rgba(34, 197, 94, 0.15)'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', textAlign: 'left' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: '#22c55e',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Sprout size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#166534' }}>
                      {isHi ? '🌾 अतिथि मोड (Continue as Guest)' : '🌾 Continue as Guest'}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#15803d' }}>
                      {isHi 
                        ? 'बिना पासवर्ड / लॉगिन के सभी AI फीचर्स (फसल, रोग, मंडी) देखें' 
                        : 'Explore all AI tools (Crops, Disease, Mandi rates) without login'}
                    </div>
                  </div>
                </div>
                <div style={{
                  background: '#22c55e',
                  color: '#ffffff',
                  padding: '5px 12px',
                  borderRadius: '9999px',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <span>{isHi ? 'सीधे प्रवेश' : 'Enter Directly'}</span>
                  <ChevronRight size={14} />
                </div>
              </button>
            </div>

            {/* Quick Links at Footer */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.8rem',
              color: '#64748b',
              marginTop: '8px'
            }}>
              <span>{isHi ? '🛡️ डेटा 100% सुरक्षित एवं स्थानीय' : '🛡️ 100% Secure & Local Data'}</span>
              <Link to="/explore" style={{ color: '#16a34a', textDecoration: 'none', fontWeight: 700 }}>
                {isHi ? 'सार्वजनिक पोर्टल देखें →' : 'Explore Public Portal →'}
              </Link>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
