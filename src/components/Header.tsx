import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Wallet, TrendingUp, Bell, Settings } from 'lucide-react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-content">
        <nav className="nav">
          <Link to="/" className="nav-link logo-link">
            <CreditCard className="nav-icon" />
            <span>Home</span>
          </Link>
          <Link to="/my-cards" className="nav-link">
            <Wallet className="nav-icon" />
            <span>My Cards</span>
          </Link>
          <Link to="/rewards-optimizer" className="nav-link">
            <TrendingUp className="nav-icon" />
            <span>Rewards</span>
          </Link>
          <Link to="/payment-tracking" className="nav-link">
            <Bell className="nav-icon" />
            <span>Payments</span>
          </Link>
          <Link to="/settings" className="nav-link">
            <Settings className="nav-icon" />
            <span>Settings</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

