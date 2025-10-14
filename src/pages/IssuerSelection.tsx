import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CARD_ISSUERS } from '../data';
import './IssuerSelection.css';

const IssuerSelection: React.FC = () => {
  const navigate = useNavigate();

  const handleIssuerClick = (issuer: string) => {
    navigate(`/issuer/${encodeURIComponent(issuer)}`);
  };

  const getIssuerLogo = (issuer: string) => {
    const logoMap: { [key: string]: string } = {
      'American Express': '/images/amex-logo.png',
      'Chase': '/images/chase-logo.png',
      'Bank of America': '/images/bofa-logo.png',
      'Capital One': '/images/capitalone-logo.png',
      'Citi': '/images/citi-logo.png',
      'Discover': '/images/discover-logo.png',
      'Wells Fargo': '/images/wellsfargo-logo.png'
    };
    return logoMap[issuer] || '/images/default-logo.svg';
  };

  return (
    <div className="issuer-selection">
      <div className="container">
        <div className="hero-section">
          <h1>Choose Your Credit Card Issuer</h1>
          <p>Click on any company logo below to view and add their available cards to your collection.</p>
        </div>

        <div className="issuers-grid">
          {CARD_ISSUERS.map((issuer) => (
            <div
              key={issuer}
              className="issuer-card"
              onClick={() => handleIssuerClick(issuer)}
              style={{
                backgroundImage: `url(${getIssuerLogo(issuer)})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: '#f8fafc'
              }}
            >
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default IssuerSelection;

