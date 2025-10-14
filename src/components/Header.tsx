import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Wallet, TrendingUp, Bell, Settings } from 'lucide-react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <CreditCard className="logo-icon" />
          <span>Credit Card Tracker</span>
        </Link>
        
        <nav className="nav">
          <Link to="/my-cards" className="nav-link">
            <Wallet className="nav-icon" />
            My Cards
          </Link>
          <Link to="/rewards-optimizer" className="nav-link">
            <TrendingUp className="nav-icon" />
            Rewards Optimizer
          </Link>
          <Link to="/payment-tracking" className="nav-link">
            <Bell className="nav-icon" />
            Payment Tracking
          </Link>
          <Link to="/settings" className="nav-link">
            <Settings className="nav-icon" />
            Settings
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

