import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, TrendingUp, Bell, Trash2, Edit3 } from 'lucide-react';
import { UserCard, RewardCategory } from '../types';
import GlobalAlert from '../components/GlobalAlert';
import './MyCards.css';

const MyCards: React.FC = () => {
  const navigate = useNavigate();
  const [userCards, setUserCards] = useState<UserCard[]>([]);

  useEffect(() => {
    const savedCards = localStorage.getItem('userCards');
    if (savedCards) {
      setUserCards(JSON.parse(savedCards));
    }
  }, []);

  const handleRemoveCard = (cardId: string) => {
    const updatedCards = userCards.filter(uc => uc.cardId !== cardId);
    setUserCards(updatedCards);
    localStorage.setItem('userCards', JSON.stringify(updatedCards));
  };

  const handleToggleActive = (cardId: string) => {
    const updatedCards = userCards.map(uc => 
      uc.cardId === cardId ? { ...uc, isActive: !uc.isActive } : uc
    );
    setUserCards(updatedCards);
    localStorage.setItem('userCards', JSON.stringify(updatedCards));
  };

  const handleClosingDateChange = (cardId: string, newClosingDate: number) => {
    const updatedCards = userCards.map(uc => 
      uc.cardId === cardId ? { ...uc, card: { ...uc.card, closingDate: newClosingDate } } : uc
    );
    setUserCards(updatedCards);
    localStorage.setItem('userCards', JSON.stringify(updatedCards));
  };

  const handleCreditLimitChange = (cardId: string, newCreditLimit: number) => {
    const updatedCards = userCards.map(uc => 
      uc.cardId === cardId ? { ...uc, creditLimit: newCreditLimit } : uc
    );
    setUserCards(updatedCards);
    localStorage.setItem('userCards', JSON.stringify(updatedCards));
  };

  // Function to format multiplier display (X for points, % for cash back)
  const formatMultiplier = (reward: RewardCategory, cardName: string) => {
    const isCashBackCard = cardName.toLowerCase().includes('cash') || 
                          cardName.toLowerCase().includes('freedom') ||
                          cardName.toLowerCase().includes('blue cash') ||
                          cardName.toLowerCase().includes('unlimited cash') ||
                          cardName.toLowerCase().includes('customized cash') ||
                          reward.name.toLowerCase().includes('cash');
    return isCashBackCard ? `${reward.multiplier}%` : `${reward.multiplier}x`;
  };

  const formatAnnualFee = (fee: number) => {
    return fee === 0 ? 'No Annual Fee' : `$${fee}/year`;
  };

  // Function to get the best rewards for each card (removing overlaps)
  const getBestRewardsForCards = (cards: UserCard[]) => {
    const bestRewards: { [cardId: string]: RewardCategory[] } = {};
    
    // First, collect all rewards from all cards
    const allRewards: { [category: string]: { cardId: string; reward: RewardCategory; multiplier: number }[] } = {};
    
    cards.forEach(userCard => {
      const rewards = userCard.card.allRewards || userCard.card.rewards;
      rewards.forEach(reward => {
        if (!allRewards[reward.id]) {
          allRewards[reward.id] = [];
        }
        allRewards[reward.id].push({
          cardId: userCard.cardId,
          reward,
          multiplier: reward.multiplier
        });
      });
    });
    
    // For each category, find the card with the highest multiplier
    Object.keys(allRewards).forEach(category => {
      const categoryRewards = allRewards[category];
      const bestReward = categoryRewards.reduce((best, current) => 
        current.multiplier > best.multiplier ? current : best
      );
      
      if (!bestRewards[bestReward.cardId]) {
        bestRewards[bestReward.cardId] = [];
      }
      bestRewards[bestReward.cardId].push(bestReward.reward);
    });
    
    return bestRewards;
  };

  const activeCards = userCards.filter(uc => uc.isActive);
  const inactiveCards = userCards.filter(uc => !uc.isActive);
  const bestRewards = getBestRewardsForCards(activeCards);

  return (
    <div className="my-cards">
      <GlobalAlert userCards={userCards} currentDate={new Date()} />
      <div className="container">
        <div className="header">
          <h1>My Credit Cards</h1>
          <p>Manage your credit card collection and track rewards</p>
        </div>

        {userCards.length === 0 ? (
          <div className="empty-state">
            <Wallet size={64} className="empty-icon" />
            <h2>No cards added yet</h2>
            <p>Start by selecting credit card issuers and adding cards to your collection.</p>
            <button 
              className="primary-btn"
              onClick={() => navigate('/')}
            >
              Browse Card Issuers
            </button>
          </div>
        ) : (
          <>
            <div className="cards-summary">
              <div className="summary-card">
                <h3>Total Credit Limit</h3>
                <span className="summary-number">
                  ${activeCards.reduce((sum, uc) => sum + (uc.creditLimit || 0), 0).toLocaleString()}
                </span>
              </div>
              <div className="summary-card">
                <h3>Active Cards</h3>
                <span className="summary-number">{activeCards.length}</span>
              </div>
              <div className="summary-card">
                <h3>Total Annual Fees</h3>
                <span className="summary-number">
                  ${userCards.reduce((sum, uc) => sum + uc.card.annualFee, 0)}
                </span>
              </div>
            </div>

            {activeCards.length > 0 && (
              <div className="cards-section">
                <h2>My Active Cards</h2>
                <div className="cards-grid">
                  {activeCards.map((userCard) => (
                    <div key={userCard.cardId} className="card-item active">
                      <div className="card-image-container">
                        <img 
                          src={userCard.card.imageUrl || '/images/cards/default-card.svg'} 
                          alt={userCard.card.name}
                          className="card-image"
                        />
                      </div>
                      <div className="card-header">
                        <h3>{userCard.card.name}</h3>
                        <div className="card-actions">
                          <button
                            className="action-btn remove"
                            onClick={() => handleRemoveCard(userCard.cardId)}
                            title="Remove this card from my collection"
                          >
                            <Trash2 size={16} />
                            Remove Card
                          </button>
                        </div>
                      </div>

                      <div className="card-details">
                        <div className="detail-row">
                          <span className="label">Issuer:</span>
                          <span>{userCard.card.issuer}</span>
                        </div>
                        <div className="detail-row">
                          <span className="label">Annual Fee:</span>
                          <span>{formatAnnualFee(userCard.card.annualFee)}</span>
                        </div>
                        <div className="detail-row">
                          <span className="label">Credit Limit:</span>
                          <input 
                            type="number"
                            value={userCard.creditLimit || ''}
                            onChange={(e) => handleCreditLimitChange(userCard.cardId, parseInt(e.target.value) || 0)}
                            className="credit-limit-input"
                            placeholder="Enter limit"
                          />
                        </div>
                        <div className="detail-row">
                          <span className="label">Closing Date:</span>
                          <select 
                            value={userCard.card.closingDate} 
                            onChange={(e) => handleClosingDateChange(userCard.cardId, parseInt(e.target.value))}
                            className="closing-date-select"
                          >
                            {Array.from({length: 31}, (_, i) => i + 1).map(day => (
                              <option key={day} value={day}>{day}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="rewards-summary">
                        <h4>Top Rewards:</h4>
                        <div className="rewards-list">
                          {userCard.card.rewards.slice(0, 3).map((reward) => (
                            <div key={reward.id} className="reward-item">
                              <span className="multiplier">{formatMultiplier(reward, userCard.card.name)}</span>
                              <span className="category">{reward.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeCards.length > 0 && (
              <div className="rewards-perks-section">
                <h2>My Rewards & Perks</h2>
                <div className="rewards-perks-content">
                  <div className="rewards-column">
                    <h3>When to Use Each Card</h3>
                    <div className="rewards-list">
                      {activeCards.map((userCard) => (
                        <div key={userCard.cardId} className="card-rewards">
                          <h4>{userCard.card.name}</h4>
                          {bestRewards[userCard.cardId] && bestRewards[userCard.cardId].length > 0 ? (
                            bestRewards[userCard.cardId].map((reward) => (
                              <div key={reward.id} className="reward-item">
                                <span className="multiplier">{formatMultiplier(reward, userCard.card.name)}</span>
                                <span className="category">{reward.name}</span>
                                <span className="description">{reward.description}</span>
                              </div>
                            ))
                          ) : (
                            <div className="no-best-rewards">
                              <span>No optimal uses (overlaps with other cards)</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="credits-column">
                    <h3>All My Credits & Benefits</h3>
                    <div className="credits-list">
                      {activeCards.map((userCard) => (
                        <div key={userCard.cardId} className="card-credits">
                          <h4>{userCard.card.name}</h4>
                          {userCard.card.credits && userCard.card.credits.length > 0 ? (
                            userCard.card.credits.map((credit, index) => (
                              <div key={index} className="credit-item">
                                <span className="credit-name">{credit.name}</span>
                                <span className="credit-amount">
                                  {credit.amount > 0 ? `$${credit.amount}` : 'Included'}
                                </span>
                                <span className="credit-description">{credit.description}</span>
                              </div>
                            ))
                          ) : (
                            <div className="no-credits">
                              <span>No credits or benefits available</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {inactiveCards.length > 0 && (
              <div className="cards-section">
                <h2>Inactive Cards</h2>
                <div className="cards-grid">
                  {inactiveCards.map((userCard) => (
                    <div key={userCard.cardId} className="card-item inactive">
                      <div className="card-header">
                        <h3>{userCard.card.name}</h3>
                        <div className="card-actions">
                          <button
                            className="action-btn"
                            onClick={() => handleToggleActive(userCard.cardId)}
                            title="Activate card"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            className="action-btn delete"
                            onClick={() => handleRemoveCard(userCard.cardId)}
                            title="Remove card"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <p className="inactive-note">This card is currently inactive</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="quick-actions">
              <h2>Quick Actions</h2>
              <div className="quick-action-buttons">
                <button 
                  className="quick-btn primary"
                  onClick={() => navigate('/rewards-optimizer')}
                >
                  <TrendingUp size={20} />
                  Optimize Rewards
                </button>
                <button 
                  className="quick-btn secondary"
                  onClick={() => navigate('/payment-tracking')}
                >
                  <Bell size={18} />
                  Payment Tracking
                </button>
                <button 
                  className="quick-btn secondary"
                  onClick={() => navigate('/')}
                >
                  <Wallet size={20} />
                  Add More Cards
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyCards;

