import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Check, DollarSign, Calendar, Trash2, AlertTriangle, ArrowUpDown } from 'lucide-react';
import { CREDIT_CARDS } from '../data';
import { CreditCard, UserCard } from '../types';
import CardDetailsPopup from '../components/CardDetailsPopup';
import './CardSelection.css';

const CardSelection: React.FC = () => {
  const { issuerName } = useParams<{ issuerName: string }>();
  const navigate = useNavigate();
  const [userCards, setUserCards] = useState<UserCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState<{cardId: string, cardName: string} | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [addedCardsCount, setAddedCardsCount] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('default');
  const [selectedCardForPopup, setSelectedCardForPopup] = useState<CreditCard | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  useEffect(() => {
    // Load user's cards from localStorage
    const savedCards = localStorage.getItem('userCards');
    if (savedCards) {
      setUserCards(JSON.parse(savedCards));
    }
  }, []);

  const issuerCards = CREDIT_CARDS.filter(card => card.issuer === issuerName);
  const userCardIds = userCards.map(uc => uc.cardId);

  // Sort cards based on selected option
  const sortedCards = [...issuerCards].sort((a, b) => {
    switch (sortBy) {
      case 'fee-low-high':
        return a.annualFee - b.annualFee;
      case 'fee-high-low':
        return b.annualFee - a.annualFee;
      case 'name-a-z':
        return a.name.localeCompare(b.name);
      case 'name-z-a':
        return b.name.localeCompare(a.name);
      case 'rewards-high':
        // Sort by highest reward multiplier (sum of all multipliers)
        const aRewards = a.rewards.reduce((sum, reward) => sum + reward.multiplier, 0);
        const bRewards = b.rewards.reduce((sum, reward) => sum + reward.multiplier, 0);
        return bRewards - aRewards;
      case 'popular':
        // Popular cards (premium cards first, then by name)
        const aIsPremium = a.annualFee >= 200;
        const bIsPremium = b.annualFee >= 200;
        if (aIsPremium && !bIsPremium) return -1;
        if (!aIsPremium && bIsPremium) return 1;
        return a.name.localeCompare(b.name);
      default:
        return 0; // Default order
    }
  });

  const handleCardToggle = (cardId: string) => {
    setSelectedCards(prev => 
      prev.includes(cardId) 
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId]
    );
  };

  const handleAddCards = () => {
    const newUserCards: UserCard[] = selectedCards
      .filter(cardId => !userCardIds.includes(cardId))
      .map(cardId => {
        const card = CREDIT_CARDS.find(c => c.id === cardId)!;
        return {
          cardId,
          card,
          isActive: true,
          addedDate: new Date()
        };
      });

    const updatedUserCards = [...userCards, ...newUserCards];
    setUserCards(updatedUserCards);
    localStorage.setItem('userCards', JSON.stringify(updatedUserCards));
    
    // Show success message instead of navigating
    setAddedCardsCount(newUserCards.length);
    setShowSuccessMessage(true);
    setSelectedCards([]);
    
    // Auto-hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 5000);
  };

  const handleRemoveCard = (cardId: string, cardName: string) => {
    setShowRemoveConfirm({ cardId, cardName });
  };

  const confirmRemoveCard = () => {
    if (showRemoveConfirm) {
      const updatedUserCards = userCards.filter(uc => uc.cardId !== showRemoveConfirm.cardId);
      setUserCards(updatedUserCards);
      localStorage.setItem('userCards', JSON.stringify(updatedUserCards));
      setShowRemoveConfirm(null);
    }
  };

  const cancelRemoveCard = () => {
    setShowRemoveConfirm(null);
  };

  const dismissSuccessMessage = () => {
    setShowSuccessMessage(false);
  };

  const viewMyCards = () => {
    setShowSuccessMessage(false);
    navigate('/my-cards');
  };

  const handleCardImageClick = (card: CreditCard) => {
    setSelectedCardForPopup(card);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedCardForPopup(null);
  };

  const formatAnnualFee = (fee: number, cardId?: string) => {
    if (cardId === 'amex-delta-gold') {
      return '$0 first year, then $150.00 each year';
    }
    return fee === 0 ? 'No Annual Fee' : `$${fee}/year`;
  };

  const getIssuerLogoPath = (issuer: string) => {
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
    <div className="card-selection">
      <div className="container">
        <div className="header">
          <button 
            className="back-btn"
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={20} />
            Back to Issuers
          </button>
          <div 
            className="logo-container"
            style={{
              backgroundImage: `url(${getIssuerLogoPath(issuerName || '')})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
          </div>
        </div>

        <div className="sorting-section">
          <div className="sort-controls">
            <ArrowUpDown size={18} />
            <label htmlFor="sort-select">Sort by:</label>
            <select 
              id="sort-select"
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-dropdown"
            >
              <option value="default">Default Order</option>
              <option value="fee-low-high">Annual Fee: Low to High</option>
              <option value="fee-high-low">Annual Fee: High to Low</option>
              <option value="name-a-z">Name: A to Z</option>
              <option value="name-z-a">Name: Z to A</option>
              <option value="rewards-high">Best Rewards</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>

        <div className="cards-grid">
          {sortedCards.map((card) => (
            <div 
              key={card.id} 
              className={`card-item ${userCardIds.includes(card.id) ? 'owned' : ''} ${selectedCards.includes(card.id) ? 'selected' : ''}`}
            >
              <div className="card-image-container">
                <img 
                  src={card.imageUrl || '/images/cards/default-card.svg'} 
                  alt={`${card.name} credit card`}
                  className="card-image"
                  onClick={() => handleCardImageClick(card)}
                />
                {userCardIds.includes(card.id) && (
                  <span className="owned-badge">Owned</span>
                )}
              </div>

              <div className="card-content">
                <div className="card-header">
                  <h3>{card.name}</h3>
                </div>

                <div className="card-details">
                  <div className="detail-item">
                    <DollarSign size={16} />
                    <span>{formatAnnualFee(card.annualFee, card.id)}</span>
                  </div>
                </div>

                <div className="rewards-section">
                  <h4>Rewards:</h4>
                  <ul>
                    {card.rewards.map((reward) => (
                      <li key={reward.id}>
                        <strong>{reward.multiplier}x</strong> {reward.name}
                        {reward.description && (
                          <span className="reward-desc"> - {reward.description}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {card.description && (
                  <p className="card-description">{card.description}</p>
                )}

                {!userCardIds.includes(card.id) ? (
                  <button
                    className={`select-btn ${selectedCards.includes(card.id) ? 'selected' : ''}`}
                    onClick={() => handleCardToggle(card.id)}
                  >
                    {selectedCards.includes(card.id) ? (
                      <>
                        <Check size={16} />
                        Selected
                      </>
                    ) : (
                      <>
                        <Plus size={16} />
                        Select
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveCard(card.id, card.name)}
                  >
                    <Trash2 size={16} />
                    Remove from Collection
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {selectedCards.length > 0 && (
          <div className="add-cards-section">
            <div className="selected-summary">
              <h3>{selectedCards.length} card(s) selected</h3>
              <button className="add-btn" onClick={handleAddCards}>
                <Plus size={20} />
                Add Selected Cards
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Remove Confirmation Dialog */}
      {showRemoveConfirm && (
        <div className="confirmation-overlay">
          <div className="confirmation-dialog">
            <div className="confirmation-header">
              <AlertTriangle className="warning-icon" />
              <h3>Remove Card from Collection</h3>
            </div>
            <div className="confirmation-content">
              <p>Are you sure you want to remove <strong>{showRemoveConfirm.cardName}</strong> from your collection?</p>
              <p className="confirmation-warning">This action cannot be undone. You'll need to add the card again if you want to track it.</p>
            </div>
            <div className="confirmation-actions">
              <button className="cancel-btn" onClick={cancelRemoveCard}>
                Cancel
              </button>
              <button className="confirm-remove-btn" onClick={confirmRemoveCard}>
                <Trash2 size={16} />
                Remove Card
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="success-overlay">
          <div className="success-dialog">
            <div className="success-header">
              <Check className="success-icon" />
              <h3>Cards Added Successfully!</h3>
            </div>
            <div className="success-content">
              <p>You've successfully added <strong>{addedCardsCount} card{addedCardsCount > 1 ? 's' : ''}</strong> to your collection.</p>
              <p>You can continue adding more cards or view your collection.</p>
            </div>
            <div className="success-actions">
              <button className="continue-btn" onClick={dismissSuccessMessage}>
                Continue Adding Cards
              </button>
              <button className="view-cards-btn" onClick={viewMyCards}>
                View My Cards
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Card Details Popup */}
      <CardDetailsPopup 
        card={selectedCardForPopup}
        isOpen={isPopupOpen}
        onClose={closePopup}
        isSelected={selectedCardForPopup ? selectedCards.includes(selectedCardForPopup.id) : false}
      />
    </div>
  );
};

export default CardSelection;

