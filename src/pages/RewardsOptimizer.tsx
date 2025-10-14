import React, { useState, useEffect } from 'react';
import { CreditCard, Star, BarChart3, Calculator, DollarSign, Info, ExternalLink } from 'lucide-react';
import { UserCard, CardRecommendation, CreditCard as CreditCardType } from '../types';
import { SPENDING_CATEGORIES, MERCHANT_EXCEPTIONS, CATEGORY_MERCHANT_MAPPING, CREDIT_CARDS } from '../data';
import GlobalAlert from '../components/GlobalAlert';
import CardDetailsPopup from '../components/CardDetailsPopup';
import './RewardsOptimizer.css';



const RewardsOptimizer: React.FC = () => {
  const [userCards, setUserCards] = useState<UserCard[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [spendingAmount, setSpendingAmount] = useState<number>(100);
  const [recommendations, setRecommendations] = useState<CardRecommendation[]>([]);
  const [monthlySpending, setMonthlySpending] = useState<{ [category: string]: number }>({});
  const [activeTab, setActiveTab] = useState<'optimizer' | 'insights'>('optimizer');
  const [compatibilityWarning, setCompatibilityWarning] = useState<string>('');
  const [cardSuggestions, setCardSuggestions] = useState<any[]>([]);
  const [selectedCardForPopup, setSelectedCardForPopup] = useState<CreditCardType | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  useEffect(() => {
    const savedCards = localStorage.getItem('userCards');
    if (savedCards) {
      const parsedCards = JSON.parse(savedCards);
      // Update cards to include reward types if missing
      const updatedCards = parsedCards.map((userCard: any) => ({
        ...userCard,
        card: {
          ...userCard.card,
          rewards: userCard.card.rewards.map((reward: any) => ({
            ...reward,
            type: reward.type || (userCard.card.name.toLowerCase().includes('cash') ? 'cashback' : 'points')
          })),
          allRewards: userCard.card.allRewards?.map((reward: any) => ({
            ...reward,
            type: reward.type || (userCard.card.name.toLowerCase().includes('cash') ? 'cashback' : 'points')
          }))
        }
      }));
      setUserCards(updatedCards);
      // Save updated cards back to localStorage
      localStorage.setItem('userCards', JSON.stringify(updatedCards));
    }
    
    // Load saved monthly spending data
    const savedSpending = localStorage.getItem('monthlySpending');
    if (savedSpending) {
      setMonthlySpending(JSON.parse(savedSpending));
    } else {
      // Initialize with default spending amounts
      const defaultSpending: { [category: string]: number } = {};
      SPENDING_CATEGORIES.forEach(category => {
        defaultSpending[category.id] = 0;
      });
      setMonthlySpending(defaultSpending);
    }
  }, []);

  useEffect(() => {
    if (selectedCategory && userCards.length > 0) {
      calculateRecommendations();
    }
  }, [selectedCategory, spendingAmount, userCards]);


  const calculateRecommendations = () => {
    const activeCards = userCards.filter(uc => uc.isActive);
    const recs: CardRecommendation[] = [];
    const fallbackRecs: CardRecommendation[] = [];

    // Check if card is compatible with the selected category
    const isCardCompatible = (card: any, categoryId: string) => {
      // For wholesale warehouses, show all cards but warn about Costco restrictions
      if (categoryId === 'wholesale') {
        return true; // Show all cards for wholesale warehouses
      }
      
      const merchants = CATEGORY_MERCHANT_MAPPING[categoryId] || [];
      
      for (const merchant of merchants) {
        const exception = MERCHANT_EXCEPTIONS[merchant];
        if (exception && exception.excludedIssuers.includes(card.issuer)) {
          return false;
        }
      }
      return true;
    };

    // Map categories to their corresponding rewards
    const getMatchingRewards = (card: any, categoryId: string) => {
      if (categoryId === 'wholesale') {
        // Wholesale warehouses often count as groceries
        return card.rewards.filter((r: any) => r.id === 'groceries');
      } else {
        // For other categories, find exact match
        return card.rewards.filter((r: any) => r.id === categoryId);
      }
    };

    activeCards.forEach(userCard => {
      const card = userCard.card;
      
      // Skip incompatible cards
      if (!isCardCompatible(card, selectedCategory)) {
        return;
      }
      
      const matchingRewards = getMatchingRewards(card, selectedCategory);
      
      if (matchingRewards.length > 0) {
        // Find the best reward (highest multiplier)
        const bestReward = matchingRewards.reduce((best: any, current: any) => 
          current.multiplier > best.multiplier ? current : best
        );
        
        const rewardType = bestReward.type || 'points';
        const points = Math.floor(spendingAmount * bestReward.multiplier);
        
        let reasonText = '';
        if (selectedCategory === 'wholesale') {
          // For wholesale warehouses, show that it's using grocery rewards
          reasonText = rewardType === 'cashback' 
            ? `${bestReward.multiplier}% cash back on groceries (wholesale warehouses)`
            : `${bestReward.multiplier}x points on groceries (wholesale warehouses)`;
        } else {
          reasonText = rewardType === 'cashback' 
            ? `${bestReward.multiplier}% cash back on ${bestReward.name}`
            : `${bestReward.multiplier}x points on ${bestReward.name}`;
        }
        
        recs.push({
          card,
          multiplier: bestReward.multiplier,
          points,
          reason: reasonText,
          rewardType
        });
      } else {
        // Check for general rewards as fallback
        const generalReward = card.rewards.find(r => r.id === 'general');
        if (generalReward) {
          const rewardType = generalReward.type || 'points';
          const points = Math.floor(spendingAmount * generalReward.multiplier);
          fallbackRecs.push({
            card,
            multiplier: generalReward.multiplier,
            points,
            reason: rewardType === 'cashback'
              ? `${generalReward.multiplier}% cash back on all purchases`
              : `${generalReward.multiplier}x points on all purchases`,
            rewardType
          });
        } else {
          // Also check allRewards for general rewards if not found in rewards
          const allRewardsGeneral = card.allRewards?.find(r => r.id === 'general');
          if (allRewardsGeneral) {
            const rewardType = allRewardsGeneral.type || 'points';
            const points = Math.floor(spendingAmount * allRewardsGeneral.multiplier);
            fallbackRecs.push({
              card,
              multiplier: allRewardsGeneral.multiplier,
              points,
              reason: rewardType === 'cashback'
                ? `${allRewardsGeneral.multiplier}% cash back on all purchases`
                : `${allRewardsGeneral.multiplier}x points on all purchases`,
              rewardType
            });
          }
        }
      }
    });

    // If we have specific category rewards, use those
    if (recs.length > 0) {
      recs.sort((a, b) => b.points - a.points);
      setRecommendations(recs);
      setCardSuggestions([]); // Clear suggestions when we have specific recommendations
    } else if (fallbackRecs.length > 0) {
      // If no specific rewards, show fallback recommendations
      fallbackRecs.sort((a, b) => b.points - a.points);
      
      // Check for ties in general rewards and handle sorting
      if (fallbackRecs.length > 0 && fallbackRecs[0]?.reason.includes('all purchases')) {
        // Group cards by points earned to find ties
        const pointsGroups: { [points: number]: any[] } = {};
        fallbackRecs.forEach(rec => {
          if (!pointsGroups[rec.points]) {
            pointsGroups[rec.points] = [];
          }
          pointsGroups[rec.points].push(rec);
        });
        
        // Mark cards as tied if they're in groups with more than one card
        Object.values(pointsGroups).forEach(group => {
          if (group.length > 1) {
            group.forEach(rec => {
              rec.isTied = true;
            });
          }
        });
        
        // Re-sort: points cards first (by annual fee desc), then cash back cards (by annual fee desc)
        fallbackRecs.sort((a, b) => {
          // If both have same points, sort by reward type and annual fee
          if (a.points === b.points) {
            // Points cards first
            if (a.rewardType === 'points' && b.rewardType === 'cashback') return -1;
            if (a.rewardType === 'cashback' && b.rewardType === 'points') return 1;
            
            // Within same type, sort by annual fee (highest first)
            return b.card.annualFee - a.card.annualFee;
          }
          
          // For different points, keep original points-based sorting
          return b.points - a.points;
        });
      }
      
      setRecommendations(fallbackRecs);
      
      // Also get intelligent card suggestions
      const suggestions = getIntelligentCardSuggestions(selectedCategory);
      setCardSuggestions(suggestions.suggestions);
    } else {
      setRecommendations([]);
      setCardSuggestions([]);
    }

    // Set compatibility warning if applicable
    if (selectedCategory === 'wholesale') {
      // Special warning for wholesale warehouses about Costco restrictions
      const amexCards = activeCards.filter(uc => uc.card.issuer === 'American Express');
      if (amexCards.length > 0) {
        setCompatibilityWarning('Note: American Express cards are not accepted at Costco, but work at Sam\'s Club and BJ\'s Wholesale');
      } else {
        setCompatibilityWarning('');
      }
    } else {
      const merchants = CATEGORY_MERCHANT_MAPPING[selectedCategory] || [];
      const excludedCards = activeCards.filter(userCard => {
        const card = userCard.card;
        return !isCardCompatible(card, selectedCategory);
      });

      if (excludedCards.length > 0 && merchants.length > 0) {
        const excludedIssuers = Array.from(new Set(excludedCards.map(uc => uc.card.issuer)));
        const merchantNames = merchants.map(m => MERCHANT_EXCEPTIONS[m]?.notes || m).join(', ');
        setCompatibilityWarning(`${excludedIssuers.join(', ')} cards excluded: ${merchantNames}`);
      } else {
        setCompatibilityWarning('');
      }
    }
  };

  const getBestCard = () => {
    return recommendations.length > 0 ? recommendations[0] : null;
  };

  const formatPoints = (points: number) => {
    return points.toLocaleString();
  };

  const formatRewardValue = (points: number, rewardType: 'points' | 'cashback' | undefined) => {
    if (rewardType === 'cashback') {
      return `$${(points / 100).toFixed(2)}`;
    }
    return `${points.toLocaleString()} points`;
  };

  const formatRewardRate = (multiplier: number, rewardType: 'points' | 'cashback' | undefined) => {
    if (rewardType === 'cashback') {
      return `${multiplier}%`;
    }
    return `${multiplier}x`;
  };

  const updateMonthlySpending = (category: string, amount: number) => {
    const newSpending = { ...monthlySpending, [category]: amount };
    setMonthlySpending(newSpending);
    localStorage.setItem('monthlySpending', JSON.stringify(newSpending));
  };



  const getTotalMonthlySpending = () => {
    return Object.values(monthlySpending).reduce((sum, amount) => sum + amount, 0);
  };

  const calculateOptimalRewards = () => {
    const activeCards = userCards.filter(uc => uc.isActive);
    let totalPoints = 0;
    let totalCashBack = 0;
    const categoryBreakdown: { [categoryId: string]: { points: number, cashBack: number, cardUsed: string, cardImage: string, cardId: string, tiedCards?: { cardUsed: string, cardImage: string, cardId: string }[] } } = {};
    const cardUsageCount: { [cardId: string]: number } = {};

    Object.entries(monthlySpending).forEach(([categoryId, amount]) => {
      if (amount > 0) {
        let bestCard: CreditCardType | null = null;
        let bestMultiplier = 0;
        let bestRewardType = 'points';

        // Find the best card for this category
        activeCards.forEach(userCard => {
          const card = userCard.card;
          
          // Check for specific category rewards first
          let relevantReward;
          if (categoryId === 'wholesale') {
            relevantReward = card.rewards.find(r => r.id === 'groceries');
          } else {
            relevantReward = card.rewards.find(r => r.id === categoryId);
          }
          
          // If no specific reward, check allRewards
          if (!relevantReward && card.allRewards) {
            if (categoryId === 'wholesale') {
              relevantReward = card.allRewards.find(r => r.id === 'groceries');
            } else {
              relevantReward = card.allRewards.find(r => r.id === categoryId);
            }
          }
          
          // If still no specific reward, use general
          if (!relevantReward) {
            relevantReward = card.rewards.find(r => r.id === 'general') || 
                           card.allRewards?.find(r => r.id === 'general');
          }

          if (relevantReward && relevantReward.multiplier > bestMultiplier) {
            bestMultiplier = relevantReward.multiplier;
            bestRewardType = relevantReward.type || 'points';
            bestCard = card;
          }
        });

        if (bestCard && bestMultiplier > 0) {
          const rewardAmount = Math.floor(amount * bestMultiplier);
          
          // Find all cards with the same reward amount (ties)
          const tiedCards: { card: CreditCardType, multiplier: number, rewardType: string }[] = [];
          
          activeCards.forEach(userCard => {
            const card = userCard.card;
            let relevantReward;
            if (categoryId === 'wholesale') {
              relevantReward = card.rewards.find(r => r.id === 'groceries');
            } else {
              relevantReward = card.rewards.find(r => r.id === categoryId);
            }
            
            if (!relevantReward && card.allRewards) {
              if (categoryId === 'wholesale') {
                relevantReward = card.allRewards.find(r => r.id === 'groceries');
              } else {
                relevantReward = card.allRewards.find(r => r.id === categoryId);
              }
            }
            
            if (!relevantReward) {
              relevantReward = card.rewards.find(r => r.id === 'general') || 
                             card.allRewards?.find(r => r.id === 'general');
            }

            if (relevantReward && Math.floor(amount * relevantReward.multiplier) === rewardAmount) {
              tiedCards.push({
                card,
                multiplier: relevantReward.multiplier,
                rewardType: relevantReward.type || 'points'
              });
            }
          });
          
          // Sort tied cards by annual fee (highest first)
          tiedCards.sort((a, b) => b.card.annualFee - a.card.annualFee);
          
          // Track card usage for all tied cards
          tiedCards.forEach(tc => {
            cardUsageCount[tc.card.id] = (cardUsageCount[tc.card.id] || 0) + 1;
          });
          
          const card = bestCard as CreditCardType;
          
          // For tied cards, show the reward amount (same for all tied cards)
          // but display both points and cash back if there are mixed reward types
          let displayPoints = 0;
          let displayCashBack = 0;
          
          // Check if we have mixed reward types in tied cards
          const hasPointsCards = tiedCards.some(tc => tc.rewardType === 'points');
          const hasCashBackCards = tiedCards.some(tc => tc.rewardType === 'cashback');
          
          if (hasPointsCards && hasCashBackCards) {
            // Mixed types: show both (using the reward amount from the best card)
            if (bestRewardType === 'cashback') {
              displayCashBack = rewardAmount / 100;
              // Find a points card to show equivalent points
              const pointsCard = tiedCards.find(tc => tc.rewardType === 'points');
              if (pointsCard) {
                displayPoints = Math.floor(amount * pointsCard.multiplier);
              }
            } else {
              displayPoints = rewardAmount;
              // Find a cash back card to show equivalent cash back
              const cashBackCard = tiedCards.find(tc => tc.rewardType === 'cashback');
              if (cashBackCard) {
                displayCashBack = Math.floor(amount * cashBackCard.multiplier) / 100;
              }
            }
          } else if (hasPointsCards) {
            // Only points cards
            displayPoints = rewardAmount;
          } else if (hasCashBackCards) {
            // Only cash back cards
            displayCashBack = rewardAmount / 100;
          }
          
          // Add to totals (only count once, not for each tied card)
          totalPoints += displayPoints;
          totalCashBack += displayCashBack;
          
          categoryBreakdown[categoryId] = {
            points: displayPoints,
            cashBack: displayCashBack,
            cardUsed: card.name,
            cardImage: card.imageUrl ? `${process.env.PUBLIC_URL}${card.imageUrl}` : `${process.env.PUBLIC_URL}/images/cards/default-card.svg`,
            cardId: card.id,
            tiedCards: tiedCards.length > 1 ? tiedCards.map(tc => ({
              cardUsed: tc.card.name,
              cardImage: tc.card.imageUrl ? `${process.env.PUBLIC_URL}${tc.card.imageUrl}` : `${process.env.PUBLIC_URL}/images/cards/default-card.svg`,
              cardId: tc.card.id
            })) : undefined
          };
        }
      }
    });

    // Calculate total spending per card for sorting
    const cardTotalSpending: { [cardId: string]: number } = {};
    Object.entries(categoryBreakdown).forEach(([categoryId, data]) => {
      const spending = monthlySpending[categoryId] || 0;
      cardTotalSpending[data.cardId] = (cardTotalSpending[data.cardId] || 0) + spending;
    });

    // Sort category breakdown by card usage, then by total spending per card, then group by card, then by spending within each card
    const sortedBreakdown = Object.entries(categoryBreakdown).sort(([categoryIdA, a], [categoryIdB, b]) => {
      const usageA = cardUsageCount[a.cardId] || 0;
      const usageB = cardUsageCount[b.cardId] || 0;
      
      // First sort by card usage (most used cards first)
      if (usageA !== usageB) {
        return usageB - usageA;
      }
      
      // If same card usage, sort by total spending per card (highest first)
      const totalSpendingA = cardTotalSpending[a.cardId] || 0;
      const totalSpendingB = cardTotalSpending[b.cardId] || 0;
      if (totalSpendingA !== totalSpendingB) {
        return totalSpendingB - totalSpendingA;
      }
      
      // If same total spending, group by card (alphabetically for consistency)
      if (a.cardId !== b.cardId) {
        return a.cardUsed.localeCompare(b.cardUsed);
      }
      
      // Same card, sort by points earned (highest first)
      const pointsA = a.points + (a.cashBack * 100); // Convert cash back to points equivalent
      const pointsB = b.points + (b.cashBack * 100);
      return pointsB - pointsA;
    });

    return { totalPoints, totalCashBack, categoryBreakdown: Object.fromEntries(sortedBreakdown) };
  };

  const getCategoryName = (categoryId: string) => {
    return SPENDING_CATEGORIES.find(c => c.id === categoryId)?.name || categoryId;
  };

  const handleCardSuggestionClick = (cardId: string) => {
    // Open the card details popup instead of navigating
    const card = CREDIT_CARDS.find(c => c.id === cardId);
    if (card) {
      setSelectedCardForPopup(card);
      setIsPopupOpen(true);
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedCardForPopup(null);
  };

  const getIntelligentCardSuggestions = (categoryId: string) => {
    const activeCards = userCards.filter(uc => uc.isActive);
    const userCardIds = activeCards.map(uc => uc.card.id);
    
    // Analyze user's issuer preferences
    const issuerCounts: { [issuer: string]: number } = {};
    activeCards.forEach(uc => {
      issuerCounts[uc.card.issuer] = (issuerCounts[uc.card.issuer] || 0) + 1;
    });
    
    const preferredIssuer = Object.keys(issuerCounts).reduce((a, b) => 
      issuerCounts[a] > issuerCounts[b] ? a : b
    );
    
    // Find cards that offer rewards for this category
    const relevantCards = CREDIT_CARDS.filter(card => {
      // Don't suggest cards the user already has
      if (userCardIds.includes(card.id)) return false;
      
      // Check if card has rewards for this category (check both rewards and allRewards)
      const hasCategoryReward = card.rewards.some(reward => {
        if (categoryId === 'wholesale') {
          return reward.id === 'groceries'; // Wholesale maps to groceries
        }
        return reward.id === categoryId;
      }) || (card.allRewards && card.allRewards.some(reward => {
        if (categoryId === 'wholesale') {
          return reward.id === 'groceries'; // Wholesale maps to groceries
        }
        return reward.id === categoryId;
      }));
      
      return hasCategoryReward;
    });
    
    // Sort by best multiplier for this category
    const sortedCards = relevantCards.map(card => {
      // First check rewards array, then allRewards array for complete info
      let categoryReward = card.rewards.find(reward => {
        if (categoryId === 'wholesale') {
          return reward.id === 'groceries';
        }
        return reward.id === categoryId;
      });
      
      // If not found in rewards, check allRewards for complete reward info
      if (!categoryReward && card.allRewards) {
        categoryReward = card.allRewards.find(reward => {
          if (categoryId === 'wholesale') {
            return reward.id === 'groceries';
          }
          return reward.id === categoryId;
        });
      }
      
      return {
        ...card,
        categoryMultiplier: categoryReward?.multiplier || 0,
        categoryReward
      };
    }).sort((a, b) => b.categoryMultiplier - a.categoryMultiplier);
    
    // Prioritize cards from preferred issuer, then others
    const preferredIssuerCards = sortedCards.filter(card => card.issuer === preferredIssuer);
    const otherIssuerCards = sortedCards.filter(card => card.issuer !== preferredIssuer);
    
    const suggestions = [...preferredIssuerCards.slice(0, 2), ...otherIssuerCards.slice(0, 1)];
    
    return {
      suggestions: suggestions.slice(0, 3),
      preferredIssuer,
      hasPreferredIssuerCards: preferredIssuerCards.length > 0
    };
  };

  return (
    <div className="rewards-optimizer">
      <GlobalAlert userCards={userCards} currentDate={new Date()} />
      <div className="container">
        <div className="header">
          <h1>Rewards Optimizer</h1>
          <p>Maximize your credit card rewards with intelligent spending analysis</p>
        </div>

        {/* Navigation Tabs */}
        <div className="tab-navigation">
          <button 
            className={`tab-btn ${activeTab === 'optimizer' ? 'active' : ''}`}
            onClick={() => setActiveTab('optimizer')}
          >
            <Calculator size={20} />
            Quick Optimizer
          </button>
          <button 
            className={`tab-btn ${activeTab === 'insights' ? 'active' : ''}`}
            onClick={() => setActiveTab('insights')}
          >
            <BarChart3 size={20} />
            Spending Insights
          </button>
        </div>

        {userCards.length === 0 ? (
          <div className="empty-state">
            <CreditCard size={64} className="empty-icon" />
            <h2>No cards to optimize</h2>
            <p>Add some credit cards to your collection first to use the rewards optimizer.</p>
          </div>
        ) : (
          <>
            {/* Quick Optimizer Tab */}
            {activeTab === 'optimizer' && (
              <div className="tab-content">
                <div className="optimizer-controls">
                  <div className="control-group">
                    <label htmlFor="category">Spending Category</label>
                    <select
                      id="category"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="">Select a category</option>
                      {SPENDING_CATEGORIES.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name} - {category.description}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {compatibilityWarning && (
                    <div className="compatibility-warning">
                      <Info size={16} />
                      <span>{compatibilityWarning}</span>
                    </div>
                  )}

                  <div className="control-group">
                    <label htmlFor="amount">Spending Amount ($)</label>
                    <input
                      id="amount"
                      type="number"
                      value={spendingAmount}
                      onChange={(e) => setSpendingAmount(Number(e.target.value))}
                      min="1"
                      step="1"
                    />
                  </div>
                </div>

                {selectedCategory && recommendations.length > 0 && (
                  <div className="recommendations">
                    {/* Show combined fallback/tied message if these are general rewards */}
                    {recommendations.length > 0 && recommendations[0].reason.includes('all purchases') && (
                      <div className="fallback-notice">
                        <Info size={20} />
                        <div>
                          <strong>General Category Rewards:</strong> None of your cards offer specific rewards for {getCategoryName(selectedCategory)}. 
                          {recommendations[0].isTied 
                            ? ` You would be activating the general category multiplier, which is a tie between your cards with the same rate.`
                            : ` Showing your cards' general/catch-all rewards below.`
                          }
                        </div>
                      </div>
                    )}
                    
                    {/* Only show best card if there's no tie at the top position */}
                    {recommendations.length > 0 && !recommendations[0].isTied && (
                      <div className="best-card">
                        <h2>
                          <Star className="star-icon" />
                          Best Card for This Purchase
                        </h2>
                        {getBestCard() && (
                          <div className="best-card-details">
                            <h3>{getBestCard()!.card.name}</h3>
                            <div className="card-info">
                              <div className="info-item">
                                <span className="label">Issuer:</span>
                                <span>{getBestCard()!.card.issuer}</span>
                              </div>
                              <div className="info-item">
                                <span className="label">Reward Rate:</span>
                                <span className="highlight">{formatRewardRate(getBestCard()!.multiplier, getBestCard()!.rewardType)}</span>
                              </div>
                              <div className="info-item">
                                <span className="label">Reward Earned:</span>
                                <span className="highlight">{formatRewardValue(getBestCard()!.points, getBestCard()!.rewardType)}</span>
                              </div>
                              <div className="info-item">
                                <span className="label">Reason:</span>
                                <span>{getBestCard()!.reason}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="all-recommendations">
                      <h3>All Your Cards Ranked</h3>
                      <div className="recommendations-list">
                        {recommendations.map((rec, index) => {
                          const isTied = rec.isTied;
                          
                          return (
                            <div key={rec.card.id} className={`recommendation-item ${index === 0 && !isTied ? 'best' : ''} ${isTied ? 'tied' : ''}`}>
                              <div className="rank">
                                {isTied ? (
                                  <span className="tie-indicator">T</span>
                                ) : (
                                  `#${index + 1}`
                                )}
                              </div>
                              <div className="card-info">
                                <h4>{rec.card.name}</h4>
                                <p className="issuer">{rec.card.issuer}</p>
                              </div>
                              <div className="rewards-info">
                                <div className="multiplier">{formatRewardRate(rec.multiplier, rec.rewardType)}</div>
                                <div className="points">{formatRewardValue(rec.points, rec.rewardType)}</div>
                                <div className="reason">{rec.reason}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {selectedCategory && recommendations.length === 0 && cardSuggestions.length === 0 && (
                  <div className="no-recommendations">
                    <p>No rewards available for this category with your current cards.</p>
                    <p>Consider adding cards that offer rewards for {SPENDING_CATEGORIES.find(c => c.id === selectedCategory)?.name}.</p>
                  </div>
                )}

                {/* Intelligent Card Suggestions */}
                {selectedCategory && cardSuggestions.length > 0 && (
                  <div className="card-suggestions">
                    <h3>💡 Smart Card Suggestions</h3>
                    <p className="suggestions-intro">
                      None of your current cards offer specific rewards for {getCategoryName(selectedCategory)}. 
                      Here are some cards that could maximize your rewards for this category:
                    </p>
                    <div className="suggestions-grid">
                      {cardSuggestions.map((suggestion, index) => (
                        <div key={suggestion.id} className="suggestion-card">
                          <div className="suggestion-header">
                            <h4>{suggestion.name}</h4>
                            <span className="suggestion-issuer">{suggestion.issuer}</span>
                          </div>
                          <div className="suggestion-reward">
                            <div className="reward-rate">
                              {suggestion.categoryReward?.type === 'cashback' 
                                ? `${suggestion.categoryReward.multiplier}%` 
                                : `${suggestion.categoryReward?.multiplier}x`}
                            </div>
                            <div className="reward-category">
                              {suggestion.categoryReward?.type === 'cashback' 
                                ? 'cash back' 
                                : 'points'} on {getCategoryName(selectedCategory)}
                            </div>
                          </div>
                          <div className="suggestion-details">
                            <div className="annual-fee">${suggestion.annualFee}/year</div>
                            <div className="suggestion-description">{suggestion.description}</div>
                          </div>
                          <button 
                            className="view-card-btn"
                            onClick={() => handleCardSuggestionClick(suggestion.id)}
                          >
                            <ExternalLink size={16} />
                            View Card Details
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Spending Insights Tab */}
            {activeTab === 'insights' && (
              <div className="tab-content">
                <div className="insights-header">
                  <h2>Monthly Spending Analysis</h2>
                  <p>Track your spending by category to optimize rewards</p>
                </div>

                <div className="spending-inputs">
                  {SPENDING_CATEGORIES.map(category => (
                    <div key={category.id} className="spending-input-group">
                      <label htmlFor={category.id}>{category.name}</label>
                      <div className="input-with-icon">
                        <DollarSign size={16} />
                        <input
                          id={category.id}
                          type="number"
                          value={monthlySpending[category.id] || 0}
                          onChange={(e) => updateMonthlySpending(category.id, Number(e.target.value))}
                          min="0"
                          step="1"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="spending-summary">
                  <div className="summary-card">
                    <h3>Total Monthly Spending</h3>
                    <div className="summary-amount">${getTotalMonthlySpending().toLocaleString()}</div>
                  </div>
                </div>

                {/* Optimal Rewards Results */}
                {getTotalMonthlySpending() > 0 && (
                  <div className="optimal-rewards-section">
                    <h3>🎯 Optimal Rewards with Your Cards</h3>
                    <p>Total rewards you could earn by using your best card for each category:</p>
                    
                    {(() => {
                      const { totalPoints, totalCashBack, categoryBreakdown } = calculateOptimalRewards();
                      return (
                        <div className="rewards-results">
                          <div className="total-rewards-summary">
                            <div className="reward-total">
                              <div className="reward-label">Total Points</div>
                              <div className="reward-value">{totalPoints.toLocaleString()}</div>
                            </div>
                            <div className="reward-total">
                              <div className="reward-label">Total Cash Back</div>
                              <div className="reward-value">${totalCashBack.toFixed(2)}</div>
                            </div>
                          </div>
                          
                          <div className="category-rewards-breakdown">
                            <h4>Category Breakdown</h4>
                            <div className="breakdown-list">
                              {Object.entries(categoryBreakdown).map(([categoryId, data]) => (
                                <div key={categoryId} className="breakdown-item">
                                  <div className="category-info">
                                    <span className="category-name">{getCategoryName(categoryId)}</span>
                                    <span className="spending-amount">${monthlySpending[categoryId]?.toLocaleString()}</span>
                                  </div>
                                  <div className="reward-info">
                                    {data.tiedCards && data.tiedCards.length > 1 ? (
                                      <>
                                        <span className="combined-rewards">
                                          {(() => {
                                            const hasPoints = data.points > 0;
                                            const hasCashBack = data.cashBack > 0;
                                            
                                            if (hasPoints && hasCashBack) {
                                              return (
                                                <>
                                                  <span className="points-part">{data.points.toLocaleString()} points</span>
                                                  <span> / </span>
                                                  <span className="cashback-part">${data.cashBack.toFixed(2)} cash back</span>
                                                </>
                                              );
                                            } else if (hasPoints) {
                                              return <span className="points-part">{data.points.toLocaleString()} points</span>;
                                            } else if (hasCashBack) {
                                              return <span className="cashback-part">${data.cashBack.toFixed(2)} cash back</span>;
                                            }
                                            return '';
                                          })()}
                                        </span>
                                        <div className="tied-cards-container">
                                          {data.tiedCards.map((tiedCard, index) => (
                                            <img 
                                              key={tiedCard.cardId}
                                              src={tiedCard.cardImage} 
                                              alt={tiedCard.cardUsed}
                                              className="card-image-small tied-card"
                                              onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = '/images/cards/default-card.svg';
                                              }}
                                            />
                                          ))}
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        {data.points > 0 && (
                                          <span className="points-earned">{data.points.toLocaleString()} points</span>
                                        )}
                                        {data.cashBack > 0 && (
                                          <span className="cashback-earned">${data.cashBack.toFixed(2)} cash back</span>
                                        )}
                                        <img 
                                          src={data.cardImage} 
                                          alt={data.cardUsed}
                                          className="card-image-small"
                                          onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = '/images/cards/default-card.svg';
                                          }}
                                        />
                                      </>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

              </div>
            )}

            {/* Card Details Popup */}
            {isPopupOpen && selectedCardForPopup && (
              <CardDetailsPopup
                card={selectedCardForPopup}
                isOpen={isPopupOpen}
                onClose={closePopup}
                isSelected={false}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RewardsOptimizer;

