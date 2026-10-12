import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Default to true for easy farmer access, or check stored auth
    const stored = localStorage.getItem('fasalmitra_auth');
    if (stored !== null) {
      return stored === 'true';
    }
    // Farmer default logged-in session for seamless experience
    return true;
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('fasalmitra_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      name: 'रामकुमार सिंह (Ram Kumar Singh)',
      phone: '9876543210',
      district: 'वाराणसी (Varanasi)',
      state: 'उत्तर प्रदेश (Uttar Pradesh)',
      village: 'रामगढ़ (Ramgarh)'
    };
  });

  const [lang, setLang] = useState(() => {
    return localStorage.getItem('fasalmitra_lang') || 'hi';
  });

  const toggleLang = () => {
    setLang(prev => {
      const next = prev === 'hi' ? 'en' : 'hi';
      localStorage.setItem('fasalmitra_lang', next);
      return next;
    });
  };

  const register = async (formData) => {
    try {
      const res = await fetch('/api/auth/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success && data.user) {
        localStorage.setItem('fasalmitra_registered_user', JSON.stringify(data.user));
        return { success: true, message: data.message, user: data.user };
      } else {
        return { success: false, error: data.error || 'पंजीकरण में त्रुटि आई।' };
      }
    } catch (err) {
      console.warn('Offline registration fallback:', err);
      // Offline fallback
      const offlineUser = {
        name: formData.name || 'किसान मित्र',
        email: formData.email || '',
        phone: formData.phone || '9876543210',
        state: formData.state || 'उत्तर प्रदेश (Uttar Pradesh)',
        city: formData.city || 'वाराणसी (Varanasi)',
        district: formData.city || 'वाराणसी (Varanasi)',
        village: formData.village || 'रोहनिया',
        location: `${formData.village || 'ग्रामीण क्षेत्र'}, ${formData.city || 'वाराणसी'}, ${formData.state || 'उत्तर प्रदेश'}`,
        area_acres: parseFloat(formData.area_acres || 3.0),
        soil_type: formData.soil_type || 'दोमट मिट्टी (Loamy Soil)',
        is_authenticated: true
      };
      localStorage.setItem('fasalmitra_registered_user', JSON.stringify(offlineUser));
      return { success: true, message: 'पंजीकरण सफल (लोकल मोड)', user: offlineUser };
    }
  };

  const login = async (credentials = {}) => {
    let payload = {};
    if (typeof credentials === 'string') {
      payload = { phone: credentials, name: 'रामकुमार सिंह' };
    } else {
      payload = credentials;
    }

    try {
      const res = await fetch('/api/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        localStorage.setItem('fasalmitra_user', JSON.stringify(data.user));
      }
    } catch (err) {
      console.warn('Using offline farmer login credentials:', err);
      // Check if registered user exists locally
      const registered = localStorage.getItem('fasalmitra_registered_user');
      if (registered) {
        try {
          const regUser = JSON.parse(registered);
          setUser(regUser);
          localStorage.setItem('fasalmitra_user', JSON.stringify(regUser));
        } catch (e) {}
      }
    }
    setIsAuthenticated(true);
    localStorage.setItem('fasalmitra_auth', 'true');
  };

  const guestLogin = () => {
    const guestUser = {
      name: 'अतिथि किसान (Guest Farmer)',
      email: 'guest@fasalmitra.ai',
      phone: '9999999999',
      state: 'उत्तर प्रदेश (Uttar Pradesh)',
      district: 'वाराणसी (Varanasi)',
      city: 'वाराणसी (Varanasi)',
      village: 'मॉडल कृषि फार्म (Model Farm)',
      location: 'वाराणसी कृषि केंद्र, उत्तर प्रदेश',
      area_acres: 3.5,
      soil_type: 'दोमट मिट्टी (Alluvial Loam)',
      isGuest: true,
      is_authenticated: true
    };
    setUser(guestUser);
    setIsAuthenticated(true);
    localStorage.setItem('fasalmitra_user', JSON.stringify(guestUser));
    localStorage.setItem('fasalmitra_auth', 'true');
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout/', { method: 'POST' });
    } catch (err) {
      console.warn('Offline logout:', err);
    }
    setIsAuthenticated(false);
    localStorage.setItem('fasalmitra_auth', 'false');
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      lang, 
      toggleLang, 
      register, 
      login, 
      guestLogin, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
