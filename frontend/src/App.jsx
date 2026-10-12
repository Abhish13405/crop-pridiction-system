import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import LandingAuthModalPage from './pages/LandingAuthModalPage';
import DashboardPage from './pages/DashboardPage';
import CropRecommendationPage from './pages/CropRecommendationPage';
import RecommendationResultPage from './pages/RecommendationResultPage';
import DiseaseDetectionPage from './pages/DiseaseDetectionPage';
import SoilHealthPage from './pages/SoilHealthPage';
import WeatherPage from './pages/WeatherPage';
import HistoryPage from './pages/HistoryPage';
import ProfilePage from './pages/ProfilePage';
import MandiBhavPage from './pages/MandiBhavPage';

// Public Homepage Layout (NO SIDEBAR, ONLY HORIZONTAL NAVBAR)
function PublicHomeLayout() {
  return (
    <div className="fm-layout">
      {/* 1. Existing Horizontal Navbar on Public Homepage */}
      <Navbar />

      {/* 2. Main Public Homepage Content */}
      <main className="fm-main-container" id="main-content">
        <HomePage />
      </main>

      {/* 3. Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Initial Landing Modal Page (GrowWise / FasalMitra Auth + Team Showcase) */}
          <Route path="/" element={<LandingAuthModalPage />} />
          <Route path="/home" element={<PublicHomeLayout />} />
          <Route path="/explore" element={<PublicHomeLayout />} />
          <Route path="/login" element={<LandingAuthModalPage />} />

          {/* Authenticated Routes (Wrapped in DashboardLayout with Left Sidebar) */}
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/crop-recommendation" element={<CropRecommendationPage />} />
            <Route path="/recommendation-result" element={<RecommendationResultPage />} />
            <Route path="/disease-detection" element={<DiseaseDetectionPage />} />
            <Route path="/mandi-bhav" element={<MandiBhavPage />} />
            <Route path="/soil-health" element={<SoilHealthPage />} />
            <Route path="/weather" element={<WeatherPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<ProfilePage />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
