import React from 'react';
import { CreditCard } from '../types';
import { X } from 'lucide-react';
import './CardDetailsPopup.css';

interface CardDetailsPopupProps {
  card: CreditCard | null;
  isOpen: boolean;
  onClose: () => void;
  isSelected?: boolean;
}

const CardDetailsPopup: React.FC<CardDetailsPopupProps> = ({ card, isOpen, onClose, isSelected = false }) => {
  if (!isOpen || !card) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPoints = (points: number) => {
    return new Intl.NumberFormat('en-US').format(points);
  };

  const padDescription = (description: string, targetLength: number = 80) => {
    const spacesNeeded = Math.max(0, targetLength - description.length);
    return description + '\u00A0'.repeat(spacesNeeded);
  };

  return (
    <div className="card-popup-overlay" onClick={onClose}>
      <div className={`card-popup-content ${isSelected ? 'selected' : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className="card-popup-close" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="card-popup-header">
          <img 
            src={card.imageUrl ? `${process.env.PUBLIC_URL}${card.imageUrl}` : `${process.env.PUBLIC_URL}/images/cards/default-card.svg`} 
            alt={card.name}
            className="card-popup-image"
          />
          <div className="card-popup-title">
            <h2>{card.name}</h2>
            <p className="card-popup-issuer">{card.issuer}</p>
            <p className="card-popup-annual-fee">
              Annual Fee: <span className="fee-amount">
                {card.id === 'amex-delta-gold' 
                  ? '$0 first year, then $150.00 each year' 
                  : formatCurrency(card.annualFee)
                }
              </span>
            </p>
          </div>
        </div>

        <div className="card-popup-body">
          {/* Sign-up Bonus */}
          {card.signupBonus && (
            <div className="card-popup-section">
              <h3>Sign-up Bonus</h3>
              <div className="signup-bonus">
                {card.signupBonus.points > 0 ? (
                  <p className="bonus-points">
                    <span className="points-amount">
                      {card.id === 'chase-marriott-bonvoy-boundless' 
                        ? '3 Free Nights'
                        : card.name.toLowerCase().includes('cash') || card.name.toLowerCase().includes('freedom') 
                          ? `$${formatPoints(card.signupBonus.points)}`
                          : formatPoints(card.signupBonus.points)}
                    </span> {card.signupBonus.description.split(' ').slice(1).join(' ')}
                  </p>
                ) : (
                  <p className="bonus-description">
                    {card.signupBonus.description}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Complete Rewards */}
          {card.allRewards && card.allRewards.length > 0 && (
            <div className="card-popup-section">
              <h3>Complete Rewards Structure</h3>
              <div className="rewards-grid">
                {card.allRewards.map((reward) => (
                  <div key={reward.id} className="reward-item">
                    <div className="reward-multiplier">{reward.multiplier}x</div>
                    <div className="reward-details">
                      <div className="reward-category">{reward.name}</div>
                      <div className="reward-description">{reward.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Preferred Rewards Section for Bank of America Cards */}
          {card.issuer === 'Bank of America' && (
            <div className="card-popup-section">
              <h3>Bank of America Preferred Rewards Program</h3>
              <div className="preferred-rewards-info">
                <p className="preferred-rewards-intro">
                  Boost your rewards by maintaining qualifying balances in Bank of America deposit accounts and Merrill investment accounts.
                </p>
                
                <div className="preferred-rewards-tiers">
                  <div className="preferred-rewards-tier">
                    <div className="tier-header">
                      <span className="tier-name">Gold Tier</span>
                      <span className="tier-bonus">+25% Bonus</span>
                    </div>
                    <div className="tier-requirement">$20,000+ combined balance</div>
                    <div className="tier-results">
                      {card.allRewards?.map((reward) => (
                        <div key={reward.id} className="tier-result">
                          <span className="base-rate">{reward.multiplier}x</span>
                          <span className="arrow">→</span>
                          <span className="bonus-rate">{(reward.multiplier * 1.25).toFixed(2)}x</span>
                          <span className="category">{reward.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="preferred-rewards-tier">
                    <div className="tier-header">
                      <span className="tier-name">Platinum Tier</span>
                      <span className="tier-bonus">+50% Bonus</span>
                    </div>
                    <div className="tier-requirement">$50,000+ combined balance</div>
                    <div className="tier-results">
                      {card.allRewards?.map((reward) => (
                        <div key={reward.id} className="tier-result">
                          <span className="base-rate">{reward.multiplier}x</span>
                          <span className="arrow">→</span>
                          <span className="bonus-rate">{(reward.multiplier * 1.5).toFixed(2)}x</span>
                          <span className="category">{reward.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="preferred-rewards-tier">
                    <div className="tier-header">
                      <span className="tier-name">Platinum Honors Tier</span>
                      <span className="tier-bonus">+75% Bonus</span>
                    </div>
                    <div className="tier-requirement">$100,000+ combined balance</div>
                    <div className="tier-results">
                      {card.allRewards?.map((reward) => (
                        <div key={reward.id} className="tier-result">
                          <span className="base-rate">{reward.multiplier}x</span>
                          <span className="arrow">→</span>
                          <span className="bonus-rate">{(reward.multiplier * 1.75).toFixed(2)}x</span>
                          <span className="category">{reward.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="preferred-rewards-note">
                  <p><strong>Note:</strong> Balances are reviewed monthly. Benefits are secured for a full year once enrolled, even if balances temporarily dip below requirements.</p>
                </div>
              </div>
            </div>
          )}

          {/* Travel Benefits Section */}
          <div className="card-popup-section">
            <h3>Travel Benefits</h3>
            <div className="travel-benefits-container">
              {/* Airport Lounge Access */}
              <div className="travel-benefit-category">
                <h4 className="benefit-category-title">Airport Lounge Access</h4>
                <div className="benefit-items">
                  {card.travelBenefits && card.travelBenefits.filter(benefit => benefit.type === 'lounge').length > 0 ? (
                    card.travelBenefits
                      .filter(benefit => benefit.type === 'lounge')
                      .map((benefit, index) => (
                        <div key={index} className="benefit-item">
                          <div className="benefit-name">{benefit.name}</div>
                          <div className="benefit-description">{benefit.description}</div>
                        </div>
                      ))
                  ) : (
                    <div className="no-benefit">No lounge access benefits</div>
                  )}
                </div>
              </div>

              {/* Hotel Status */}
              <div className="travel-benefit-category">
                <h4 className="benefit-category-title">Hotel Status</h4>
                <div className="benefit-items">
                  {card.travelBenefits && card.travelBenefits.filter(benefit => benefit.type === 'hotel').length > 0 ? (
                    card.travelBenefits
                      .filter(benefit => benefit.type === 'hotel')
                      .map((benefit, index) => (
                        <div key={index} className="benefit-item">
                          <div className="benefit-name">{benefit.name}</div>
                          {benefit.status && <div className="benefit-status">{benefit.status}</div>}
                          <div className="benefit-description">{benefit.description}</div>
                        </div>
                      ))
                  ) : (
                    <div className="no-benefit">No hotel status benefits</div>
                  )}
                </div>
              </div>

              {/* Rental Car Status */}
              <div className="travel-benefit-category">
                <h4 className="benefit-category-title">Rental Car Status</h4>
                <div className="benefit-items">
                  {card.travelBenefits && card.travelBenefits.filter(benefit => benefit.type === 'rental').length > 0 ? (
                    card.travelBenefits
                      .filter(benefit => benefit.type === 'rental')
                      .map((benefit, index) => (
                        <div key={index} className="benefit-item">
                          <div className="benefit-name">{benefit.name}</div>
                          {benefit.status && <div className="benefit-status">{benefit.status}</div>}
                          <div className="benefit-description">{benefit.description}</div>
                        </div>
                      ))
                  ) : (
                    <div className="no-benefit">No rental car status benefits</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {card.credits && card.credits.length > 0 && (
            <div className="card-popup-section">
              <h3>Statement Credits & Benefits</h3>
              <div className="credits-list">
                {card.credits.map((credit, index) => (
                  <div key={index} className="credit-item">
                    <div className="credit-amount">{formatCurrency(credit.amount)}</div>
                    <div className="credit-details">
                      <div className="credit-name">{credit.name}</div>
                      <div className="credit-description">{padDescription(credit.description)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {card.description && (
            <div className="card-popup-section">
              <h3>About This Card</h3>
              <p className="card-description">{card.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardDetailsPopup;
