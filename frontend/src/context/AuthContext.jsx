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

  const login = async (phone = '9876543210', name = 'रामकुमार सिंह') => {
    try {
      const res = await fetch('/api/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, name })
      });
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        localStorage.setItem('fasalmitra_user', JSON.stringify(data.user));
      }
    } catch (err) {
      console.warn('Using offline farmer login credentials:', err);
    }
    setIsAuthenticated(true);
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
    <AuthContext.Provider value={{ isAuthenticated, user, lang, toggleLang, login, logout }}>
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
