import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import IssuerSelection from './pages/IssuerSelection';
import CardSelection from './pages/CardSelection';
import MyCards from './pages/MyCards';
import RewardsOptimizer from './pages/RewardsOptimizer';
import PaymentTracking from './pages/PaymentTracking';
import Settings from './pages/Settings';

function AppContent() {
  const location = useLocation();
  
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <Routes key={location.pathname}>
          <Route path="/" element={<IssuerSelection />} />
          <Route path="/issuer/:issuerName" element={<CardSelection />} />
          <Route path="/my-cards" element={<MyCards />} />
          <Route path="/rewards-optimizer" element={<RewardsOptimizer />} />
          <Route path="/payment-tracking" element={<PaymentTracking />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router basename="/credit-card-tracker">
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;

