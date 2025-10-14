import { CreditCard, RewardCategory, SpendingCategory } from './types';

export const SPENDING_CATEGORIES: SpendingCategory[] = [
  // FOOD & DINING
  { id: 'dining', name: 'Dining', description: 'Restaurants, takeout, and food delivery' },
  { id: 'groceries', name: 'Groceries', description: 'Supermarkets and grocery stores' },
  { id: 'wholesale', name: 'Wholesale Warehouses', description: 'Costco, Sam\'s Club, BJ\'s Wholesale' },
  
  // TRAVEL & TRANSPORTATION
  { id: 'flights', name: 'Flights', description: 'Airline tickets and purchases' },
  { id: 'hotels', name: 'Hotels', description: 'Hotel stays and accommodations' },
  { id: 'transit', name: 'Transit', description: 'Rideshare, parking, tolls, public transit' },
  { id: 'gas', name: 'Gas Stations', description: 'Fuel and gas station purchases' },
  
  // SHOPPING & RETAIL
  { id: 'online', name: 'Online Shopping', description: 'Online retail purchases' },
  { id: 'shopping', name: 'Retail Shopping', description: 'In-store retail purchases' },
  
  // ENTERTAINMENT & SERVICES
  { id: 'streaming', name: 'Streaming', description: 'Netflix, Hulu, Disney+, etc.' },
  { id: 'entertainment', name: 'Entertainment', description: 'Movies, events, concerts' },
  
  // UTILITIES & ESSENTIALS
  { id: 'utilities', name: 'Utilities', description: 'Electric, water, internet bills' },
  { id: 'healthcare', name: 'Healthcare', description: 'Medical expenses and pharmacies' },
  
  // GENERAL
  { id: 'general', name: 'General', description: 'All other purchases' }
];

// Merchant-specific exceptions and restrictions
export const MERCHANT_EXCEPTIONS: { [merchant: string]: { excludedIssuers: string[], notes?: string } } = {
  'costco': {
    excludedIssuers: ['American Express'],
    notes: 'Costco only accepts Visa cards'
  }
};

// Map spending categories to potential merchant restrictions
export const CATEGORY_MERCHANT_MAPPING: { [categoryId: string]: string[] } = {
  'wholesale': ['costco'],
  'dining': [],
  'groceries': [],
  'flights': [],
  'hotels': [],
  'transit': [],
  'gas': [],
  'online': [],
  'shopping': [],
  'streaming': [],
  'entertainment': [],
  'utilities': [],
  'healthcare': [],
  'general': []
};

export const CREDIT_CARDS: CreditCard[] = [
  // Visa Cards
  {
    id: 'chase-sapphire-preferred',
    name: 'Chase Sapphire Preferred',
    issuer: 'Chase',
    annualFee: 95,
    closingDate: 15,
    imageUrl: '/images/cards/chase-sapphire-preferred.png',
    rewards: [
      { id: 'dining', name: 'Dining', multiplier: 3, description: '3x points on dining worldwide', type: 'points' },
      { id: 'online', name: 'Online Groceries', multiplier: 3, description: '3x points on online grocery purchases', type: 'points' },
      { id: 'streaming', name: 'Streaming', multiplier: 3, description: '3x points on select streaming services', type: 'points' }
    ],
    description: 'Popular travel rewards card with flexible point redemption',
    allRewards: [
      { id: 'dining', name: 'Dining', multiplier: 3, description: '3x points on dining worldwide', type: 'points' },
      { id: 'online', name: 'Online Groceries', multiplier: 3, description: '3x points on online grocery purchases', type: 'points' },
      { id: 'streaming', name: 'Streaming', multiplier: 3, description: '3x points on select streaming services', type: 'points' },
      { id: 'general', name: 'General', multiplier: 1, description: '1x points on all other purchases', type: 'points' }
    ],
    signupBonus: {
      points: 60000,
      spendRequirement: 4000,
      timeLimit: '3 months',
      description: '60,000 bonus points after spending $4,000 in first 3 months'
    },
    credits: [
      { name: 'Annual Travel Credit', amount: 50, frequency: 'annual', description: '$50 annual travel credit' }
    ]
  },
  {
    id: 'chase-freedom-unlimited',
    name: 'Chase Freedom Unlimited',
    issuer: 'Chase',
    annualFee: 0,
    closingDate: 15,
    imageUrl: '/images/cards/chase-freedom-unlimited.png',
    rewards: [
      { id: 'dining', name: 'Dining', multiplier: 3, description: '3% cash back on dining', type: 'cashback' },
      { id: 'drugstores', name: 'Drugstores', multiplier: 3, description: '3% cash back at drugstores', type: 'cashback' }
    ],
    description: 'No annual fee cash back card with rotating categories',
    allRewards: [
      { id: 'dining', name: 'Dining', multiplier: 3, description: '3% cash back on dining', type: 'cashback' },
      { id: 'drugstores', name: 'Drugstores', multiplier: 3, description: '3% cash back at drugstores', type: 'cashback' },
      { id: 'general', name: 'General', multiplier: 1.5, description: '1.5% cash back on all other purchases', type: 'cashback' }
    ],
    signupBonus: {
      points: 20000,
      spendRequirement: 500,
      timeLimit: '3 months',
      description: '$200 bonus after spending $500 in first 3 months'
    }
  },
  {
    id: 'citi-double-cash',
    name: 'Citi Double Cash',
    issuer: 'Citi',
    annualFee: 0,
    closingDate: 20,
    imageUrl: '/images/cards/citi-double-cash.jpg',
    rewards: [
      { id: 'general', name: 'General', multiplier: 2, description: '2% cash back on all purchases (1% when you buy, 1% when you pay)', type: 'cashback' }
    ],
    description: 'Simple 2% cash back on everything with no annual fee',
    allRewards: [
      { id: 'general', name: 'General', multiplier: 2, description: '2% cash back on all purchases (1% when you buy, 1% when you pay)', type: 'cashback' }
    ],
    signupBonus: {
      points: 0,
      spendRequirement: 0,
      timeLimit: 'N/A',
      description: 'No signup bonus'
    }
  },
  {
    id: 'costco-visa',
    name: 'Costco Anywhere Visa',
    issuer: 'Citi',
    annualFee: 0,
    closingDate: 20,
    imageUrl: '/images/cards/Citi costco anywhere.png',
    rewards: [
      { id: 'gas', name: 'Gas', multiplier: 4, description: '4% cash back on gas (up to $7,000/year)', type: 'cashback' },
      { id: 'wholesale', name: 'Costco', multiplier: 2, description: '2% cash back at Costco and Costco.com', type: 'cashback' },
      { id: 'dining', name: 'Dining', multiplier: 3, description: '3% cash back on dining', type: 'cashback' }
    ],
    description: 'Costco membership required. Great for Costco and gas purchases',
    allRewards: [
      { id: 'gas', name: 'Gas', multiplier: 4, description: '4% cash back on gas (up to $7,000/year)', type: 'cashback' },
      { id: 'wholesale', name: 'Costco', multiplier: 2, description: '2% cash back at Costco and Costco.com', type: 'cashback' },
      { id: 'dining', name: 'Dining', multiplier: 3, description: '3% cash back on dining', type: 'cashback' },
      { id: 'general', name: 'General', multiplier: 1, description: '1% cash back on all other purchases', type: 'cashback' }
    ],
    signupBonus: {
      points: 0,
      spendRequirement: 0,
      timeLimit: 'N/A',
      description: 'No signup bonus'
    }
  },

  // American Express Cards
  {
    id: 'amex-gold',
    name: 'American Express Gold Card',
    issuer: 'American Express',
    annualFee: 325,
    closingDate: 15,
    imageUrl: '/images/cards/amex-gold-card.jpg',
    rewards: [
      { id: 'dining', name: 'Dining', multiplier: 4, description: '4x points on dining worldwide', type: 'points' },
      { id: 'groceries', name: 'Groceries', multiplier: 4, description: '4x points at U.S. supermarkets (up to $25,000/year)', type: 'points' }
    ],
    description: 'Premium dining and grocery rewards card',
    allRewards: [
      { id: 'dining', name: 'Dining', multiplier: 4, description: '4x points on dining worldwide', type: 'points' },
      { id: 'groceries', name: 'Groceries', multiplier: 4, description: '4x points at U.S. supermarkets (up to $25,000/year)', type: 'points' },
      { id: 'flights', name: 'Flights', multiplier: 3, description: '3x points on flights booked directly with airlines', type: 'points' },
      { id: 'hotels', name: 'Prepaid Hotels', multiplier: 2, description: '2x points on prepaid hotels booked through Amex Travel', type: 'points' },
      { id: 'general', name: 'General', multiplier: 1, description: '1x points on all other purchases', type: 'points' }
    ],
    signupBonus: {
      points: 100000,
      spendRequirement: 6000,
      timeLimit: '6 months',
      description: '100,000 Membership Rewards points after spending $6,000 in first 6 months'
    },
    credits: [
      { name: 'Dining Credit', amount: 120, frequency: 'annual', description: '$120 dining credit ($10 monthly) at participating partners' },
      { name: 'Uber Credit', amount: 120, frequency: 'annual', description: '$120 Uber Cash ($10 monthly) for Uber Eats or Uber rides' },
      { name: 'Resy Credit', amount: 100, frequency: 'annual', description: '$100 Resy credit ($50 semi-annual) for dining at Resy restaurants' },
      { name: 'Dunkin Credit', amount: 84, frequency: 'annual', description: '$84 Dunkin credit ($7 monthly) at Dunkin locations' },
      { name: 'Hotel Credit', amount: 100, frequency: 'annual', description: '$100 hotel credit for select hotels (requires 2-night minimum stay)' }
    ],
    travelBenefits: [
      { type: 'rental', name: 'Hertz Five Star', description: 'Hertz Five Star status with priority service and upgrades', status: 'Five Star' }
    ]
  },
  {
    id: 'amex-platinum',
    name: 'American Express Platinum Card',
    issuer: 'American Express',
    annualFee: 895,
    closingDate: 20,
    imageUrl: '/images/cards/amex-platinum-card.jpg',
    rewards: [
      { id: 'flights', name: 'Flights', multiplier: 5, description: '5x points on flights booked directly with airlines or through Amex Travel', type: 'points' },
      { id: 'hotels', name: 'Hotels', multiplier: 5, description: '5x points on prepaid hotels booked through Amex Travel', type: 'points' }
    ],
    description: 'Premium travel rewards card with luxury benefits including Global Lounge Collection access',
    allRewards: [
      { id: 'flights', name: 'Flights', multiplier: 5, description: '5x points on flights booked directly with airlines or through Amex Travel', type: 'points' },
      { id: 'hotels', name: 'Hotels', multiplier: 5, description: '5x points on prepaid hotels booked through Amex Travel', type: 'points' },
      { id: 'general', name: 'General', multiplier: 1, description: '1x points on all other purchases', type: 'points' }
    ],
    signupBonus: {
      points: 150000,
      spendRequirement: 8000,
      timeLimit: '6 months',
      description: '150,000 Membership Rewards points after spending $8,000 in first 6 months'
    },
    credits: [
      { name: 'Resy Credit', amount: 400, frequency: 'annual', description: '$400 Resy credit ($100 quarterly) for dining at Resy restaurants' },
      { name: 'Digital Entertainment', amount: 300, frequency: 'annual', description: '$300 digital entertainment credit ($25 monthly) for Disney+, Hulu, NYT, etc.' },
      { name: 'Lululemon Credit', amount: 300, frequency: 'annual', description: '$300 Lululemon credit ($75 quarterly) for Lululemon purchases' },
      { name: 'Walmart+ Credit', amount: 155, frequency: 'annual', description: '$155 Walmart+ credit ($12.95 monthly) for membership fees' },
      { name: 'Saks Credit', amount: 100, frequency: 'annual', description: '$100 Saks Fifth Avenue credit ($50 semi-annual)' },
      { name: 'Oura Ring Credit', amount: 200, frequency: 'annual', description: '$200 Oura Ring credit for Oura Ring purchases' },
      { name: 'Equinox Credit', amount: 300, frequency: 'annual', description: '$300 Equinox credit for eligible Equinox memberships' },
      { name: 'Clear Plus Credit', amount: 209, frequency: 'annual', description: '$209 CLEAR Plus credit for expedited airport security' },
      { name: 'Airline Fee Credit', amount: 200, frequency: 'annual', description: '$200 airline fee credit for incidental fees charged by selected airline' },
      { name: 'Uber One Credit', amount: 120, frequency: 'annual', description: '$120 Uber One credit for Uber One membership' },
      { name: 'Uber Cash Credit', amount: 200, frequency: 'annual', description: '$200 Uber Cash ($15 monthly + $20 December bonus) for Uber Eats or Uber rides' },
      { name: 'Hotel Credit', amount: 600, frequency: 'annual', description: '$600 hotel credit ($300 semi-annual) for Fine Hotels + Resorts or The Hotel Collection bookings' }
    ],
    travelBenefits: [
      { type: 'lounge', name: 'Centurion Lounges', description: 'Access to American Express Centurion Lounges worldwide' },
      { type: 'lounge', name: 'Priority Pass™', description: 'Access to 1,300+ lounges worldwide' },
      { type: 'lounge', name: 'Delta Sky Club', description: 'Access to Delta Sky Club lounges when flying Delta' },
      { type: 'lounge', name: 'Plaza Premium Lounges', description: 'Access to Plaza Premium Lounges worldwide' },
      { type: 'hotel', name: 'Marriott Bonvoy Gold', description: 'Marriott Bonvoy Gold Elite status with room upgrades and late checkout', status: 'Gold Elite' },
      { type: 'hotel', name: 'Hilton Honors Gold', description: 'Hilton Honors Gold status with room upgrades and bonus points', status: 'Gold' },
      { type: 'rental', name: 'Hertz President\'s Circle', description: 'Hertz President\'s Circle status with vehicle upgrades and priority service', status: 'President\'s Circle' },
      { type: 'rental', name: 'Avis Preferred Plus', description: 'Avis Preferred Plus status with priority service and upgrades', status: 'Preferred Plus' },
      { type: 'rental', name: 'National Executive', description: 'National Executive status with Emerald Club benefits', status: 'Executive' }
    ]
  },
  {
    id: 'amex-blue-cash-preferred',
    name: 'Blue Cash Preferred',
    issuer: 'American Express',
    annualFee: 95,
    closingDate: 10,
    imageUrl: '/images/cards/amex-blue-cash-preferred.jpg',
    rewards: [
      { id: 'groceries', name: 'Groceries', multiplier: 6, description: '6% cash back at U.S. supermarkets (up to $6,000/year)', type: 'cashback' },
      { id: 'streaming', name: 'Streaming', multiplier: 6, description: '6% cash back on select U.S. streaming subscriptions', type: 'cashback' }
    ],
    description: 'Cash back card for groceries and streaming',
    allRewards: [
      { id: 'groceries', name: 'Groceries', multiplier: 6, description: '6% cash back at U.S. supermarkets (up to $6,000/year)', type: 'cashback' },
      { id: 'streaming', name: 'Streaming', multiplier: 6, description: '6% cash back on select U.S. streaming subscriptions', type: 'cashback' },
      { id: 'transit', name: 'Transit', multiplier: 3, description: '3% cash back on transit including rideshare, parking, tolls', type: 'cashback' },
      { id: 'gas', name: 'Gas', multiplier: 3, description: '3% cash back at U.S. gas stations', type: 'cashback' },
      { id: 'general', name: 'General', multiplier: 1, description: '1% cash back on all other purchases', type: 'cashback' }
    ],
    signupBonus: {
      points: 75,
      spendRequirement: 1000,
      timeLimit: '6 months',
      description: '$75 statement credit after spending $1,000 in first 6 months'
    },
    credits: [
      { name: 'Disney Credit', amount: 120, frequency: 'annual', description: '$120 Disney credit ($10 monthly) for Disney+ subscriptions' }
    ]
  },
  {
    id: 'amex-blue-cash-everyday',
    name: 'Blue Cash Everyday',
    issuer: 'American Express',
    annualFee: 0,
    closingDate: 5,
    imageUrl: '/images/cards/amex-blue-cash-everyday.jpg',
    rewards: [
      { id: 'groceries', name: 'Groceries', multiplier: 3, description: '3% cash back at U.S. supermarkets (up to $6,000/year)', type: 'cashback' },
      { id: 'gas', name: 'Gas', multiplier: 3, description: '3% cash back at U.S. gas stations', type: 'cashback' },
      { id: 'online', name: 'Online Shopping', multiplier: 3, description: '3% cash back on online retail purchases (up to $6,000/year)', type: 'cashback' }
    ],
    description: 'No annual fee cash back card',
    allRewards: [
      { id: 'groceries', name: 'Groceries', multiplier: 3, description: '3% cash back at U.S. supermarkets (up to $6,000/year)', type: 'cashback' },
      { id: 'gas', name: 'Gas', multiplier: 3, description: '3% cash back at U.S. gas stations', type: 'cashback' },
      { id: 'online', name: 'Online Shopping', multiplier: 3, description: '3% cash back on online retail purchases (up to $6,000/year)', type: 'cashback' },
      { id: 'general', name: 'General', multiplier: 1, description: '1% cash back on all other purchases', type: 'cashback' }
    ],
    signupBonus: {
      points: 200,
      spendRequirement: 2000,
      timeLimit: '6 months',
      description: '$200 statement credit after spending $2,000 in first 6 months'
    },
    credits: [
      { name: 'Disney Credit', amount: 84, frequency: 'annual', description: '$84 Disney credit ($7 monthly) for Disney+ subscriptions' }
    ]
  },
  {
    id: 'amex-green',
    name: 'American Express Green Card',
    issuer: 'American Express',
    annualFee: 150,
    closingDate: 25,
    imageUrl: '/images/cards/amex-green-card.jpg',
    rewards: [
      { id: 'travel', name: 'Travel', multiplier: 3, description: '3x points on travel and transit' },
      { id: 'dining', name: 'Dining', multiplier: 3, description: '3x points on dining worldwide' }
    ],
    description: 'Mid-tier travel and dining rewards card',
    allRewards: [
      { id: 'travel', name: 'Travel', multiplier: 3, description: '3x points on travel and transit' },
      { id: 'dining', name: 'Dining', multiplier: 3, description: '3x points on dining worldwide' },
      { id: 'general', name: 'General', multiplier: 1, description: '1x points on all other purchases' }
    ],
    signupBonus: {
      points: 40000,
      spendRequirement: 3000,
      timeLimit: '6 months',
      description: '40,000 Membership Rewards points after spending $3,000 in first 6 months'
    },
    credits: [
      { name: 'Clear Plus Credit', amount: 209, frequency: 'annual', description: '$209 CLEAR Plus credit for expedited airport security' }
    ]
  },
  {
    id: 'amex-hilton-honors',
    name: 'Hilton Honors American Express',
    issuer: 'American Express',
    annualFee: 0,
    closingDate: 12,
    imageUrl: '/images/cards/amex-hilton-honors.jpg',
    rewards: [
      { id: 'hotels', name: 'Hilton Hotels', multiplier: 7, description: '7x Hilton Honors points on hotels and resorts in the Hilton portfolio' },
      { id: 'dining', name: 'Dining', multiplier: 5, description: '5x Hilton Honors points on dining, restaurants, takeout, and delivery' },
      { id: 'groceries', name: 'Groceries', multiplier: 5, description: '5x Hilton Honors points on groceries' }
    ],
    description: 'No annual fee Hilton hotel rewards card',
    allRewards: [
      { id: 'hotels', name: 'Hilton Hotels', multiplier: 7, description: '7x Hilton Honors points on hotels and resorts in the Hilton portfolio' },
      { id: 'dining', name: 'Dining', multiplier: 5, description: '5x Hilton Honors points on dining, restaurants, takeout, and delivery' },
      { id: 'groceries', name: 'Groceries', multiplier: 5, description: '5x Hilton Honors points on groceries' },
      { id: 'gas', name: 'Gas', multiplier: 5, description: '5x Hilton Honors points on gas stations' },
      { id: 'general', name: 'General', multiplier: 3, description: '3x Hilton Honors points on eligible purchases' }
    ],
    signupBonus: {
      points: 80000,
      spendRequirement: 2000,
      timeLimit: '6 months',
      description: '80,000 Hilton Honors points after spending $2,000 in first 6 months'
    }
  },
  {
    id: 'amex-delta-gold',
    name: 'Delta SkyMiles Gold American Express',
    issuer: 'American Express',
    annualFee: 0, // $0 first year, then $150 after first year
    closingDate: 8,
    imageUrl: '/images/cards/amex-delta-gold.jpg',
    rewards: [
      { id: 'dining', name: 'Dining', multiplier: 2, description: '2x miles on dining worldwide' },
      { id: 'groceries', name: 'Groceries', multiplier: 2, description: '2x miles on groceries at U.S. supermarkets' },
      { id: 'delta', name: 'Delta Purchases', multiplier: 2, description: '2x miles on Delta purchases' }
    ],
    description: 'Delta airline rewards card with dining and grocery bonuses',
    allRewards: [
      { id: 'dining', name: 'Dining', multiplier: 2, description: '2x miles on dining worldwide' },
      { id: 'groceries', name: 'Groceries', multiplier: 2, description: '2x miles on groceries at U.S. supermarkets' },
      { id: 'delta', name: 'Delta Purchases', multiplier: 2, description: '2x miles on Delta purchases' },
      { id: 'general', name: 'General', multiplier: 1, description: '1x miles on all other purchases' }
    ],
    signupBonus: {
      points: 80000,
      spendRequirement: 3000,
      timeLimit: '6 months',
      description: '80,000 Delta SkyMiles after spending $3,000 in first 6 months'
    },
    credits: [
      { name: 'Delta Flight Credit', amount: 200, frequency: 'annual', description: '$200 Delta flight credit after spending $10,000 in a calendar year' },
      { name: 'Delta Stays Credit', amount: 100, frequency: 'annual', description: '$100 Delta Stays credit for hotel bookings' },
      { name: 'First Checked Bag Free', amount: 0, frequency: 'per flight', description: 'First checked bag free for you and up to 8 companions on the same reservation' },
      { name: 'In-Flight Discount', amount: 0, frequency: 'per purchase', description: '20% back on in-flight purchases' }
    ]
  },
  {
    id: 'amex-delta-blue',
    name: 'Delta SkyMiles Blue American Express',
    issuer: 'American Express',
    annualFee: 0,
    closingDate: 12,
    imageUrl: '/images/cards/amex-delta-blue.jpg',
    rewards: [
      { id: 'dining', name: 'Dining', multiplier: 2, description: '2x miles on dining worldwide' },
      { id: 'delta', name: 'Delta Purchases', multiplier: 2, description: '2x miles on Delta purchases' }
    ],
    description: 'No annual fee Delta rewards card with dining bonuses',
    allRewards: [
      { id: 'dining', name: 'Dining', multiplier: 2, description: '2x miles on dining worldwide' },
      { id: 'delta', name: 'Delta Purchases', multiplier: 2, description: '2x miles on Delta purchases' },
      { id: 'general', name: 'General', multiplier: 1, description: '1x miles on all other purchases' }
    ],
    signupBonus: {
      points: 10000,
      spendRequirement: 1000,
      timeLimit: '6 months',
      description: '10,000 Delta SkyMiles after spending $1,000 in first 6 months'
    },
    credits: [
      { name: 'In-Flight Discount', amount: 0, frequency: 'per purchase', description: '20% back on in-flight purchases' }
    ]
  },
  {
    id: 'amex-delta-platinum',
    name: 'Delta SkyMiles Platinum American Express',
    issuer: 'American Express',
    annualFee: 350,
    closingDate: 6,
    imageUrl: '/images/cards/amex-delta-platinum.jpg',
    rewards: [
      { id: 'delta', name: 'Delta Purchases', multiplier: 3, description: '3x miles on Delta purchases' },
      { id: 'hotels', name: 'Hotels', multiplier: 3, description: '3x miles at hotels worldwide' },
      { id: 'dining', name: 'Dining', multiplier: 2, description: '2x miles on dining worldwide' }
    ],
    description: 'Premium Delta airline rewards card with hotel and dining bonuses',
    allRewards: [
      { id: 'delta', name: 'Delta Purchases', multiplier: 3, description: '3x miles on Delta purchases' },
      { id: 'hotels', name: 'Hotels', multiplier: 3, description: '3x miles at hotels worldwide' },
      { id: 'dining', name: 'Dining', multiplier: 2, description: '2x miles on dining worldwide' },
      { id: 'groceries', name: 'Groceries', multiplier: 2, description: '2x miles on groceries at U.S. supermarkets' },
      { id: 'general', name: 'General', multiplier: 1, description: '1x miles on all other purchases' }
    ],
    signupBonus: {
      points: 90000,
      spendRequirement: 4000,
      timeLimit: '6 months',
      description: '90,000 Delta SkyMiles after spending $4,000 in first 6 months'
    },
    credits: [
      { name: 'Rideshare Credit', amount: 120, frequency: 'annual', description: '$10 monthly rideshare credit ($120 annually)' },
      { name: 'Delta Stays Credit', amount: 150, frequency: 'annual', description: '$150 Delta Stays credit for hotel bookings' },
      { name: 'Delta Flight Discount', amount: 0, frequency: 'per booking', description: '15% off Delta flights when using miles' },
      { name: 'MQD Head Start', amount: 2500, frequency: 'annual', description: '$2,500 Medallion Qualification Dollars (MQD) head start each year' }
    ]
  },
  {
    id: 'amex-delta-reserve',
    name: 'Delta SkyMiles Reserve American Express',
    issuer: 'American Express',
    annualFee: 650,
    closingDate: 14,
    imageUrl: '/images/cards/amex-delta-reserve.jpg',
    rewards: [
      { id: 'delta', name: 'Delta Purchases', multiplier: 3, description: '3x miles on Delta purchases' }
    ],
    description: 'Premium Delta airline rewards card with luxury benefits and Sky Club access',
    allRewards: [
      { id: 'delta', name: 'Delta Purchases', multiplier: 3, description: '3x miles on Delta purchases' },
      { id: 'general', name: 'General', multiplier: 1, description: '1x miles on all other purchases' }
    ],
    signupBonus: {
      points: 125000,
      spendRequirement: 6000,
      timeLimit: '6 months',
      description: '125,000 Delta SkyMiles after spending $6,000 in first 6 months'
    },
    credits: [
      { name: 'MQD Head Start', amount: 2500, frequency: 'annual', description: '$2,500 Medallion Qualification Dollars (MQD) head start each year' },
      { name: 'MQD Boost', amount: 0, frequency: 'per $10', description: '1 Medallion Qualification Dollar for each $10 in purchases' },
      { name: 'Resy Statement Credit', amount: 240, frequency: 'annual', description: '$20 monthly Resy statement credit ($240 annually)' },
      { name: 'Delta Stays Credit', amount: 200, frequency: 'annual', description: '$200 Delta Stays statement credit for hotel bookings' },
      { name: 'Delta Sky Club Access', amount: 0, frequency: 'unlimited', description: 'Complimentary Delta Sky Club access for you and up to 2 guests' }
    ]
  },
  {
    id: 'amex-hilton-aspire',
    name: 'Hilton Honors Aspire American Express',
    issuer: 'American Express',
    annualFee: 550,
    closingDate: 9,
    imageUrl: '/images/cards/amex-hilton-aspire.jpg',
    rewards: [
      { id: 'hotels', name: 'Hilton Hotels', multiplier: 14, description: '14x Hilton Honors points on hotels and resorts in the Hilton portfolio' },
      { id: 'travel', name: 'Select Travel', multiplier: 7, description: '7x Hilton Honors points on select travel booked directly with Amex' },
      { id: 'dining', name: 'Dining', multiplier: 7, description: '7x Hilton Honors points on dining worldwide' }
    ],
    description: 'Premium Hilton hotel rewards card with Diamond status and luxury benefits',
    allRewards: [
      { id: 'hotels', name: 'Hilton Hotels', multiplier: 14, description: '14x Hilton Honors points on hotels and resorts in the Hilton portfolio' },
      { id: 'travel', name: 'Select Travel', multiplier: 7, description: '7x Hilton Honors points on select travel booked directly with Amex' },
      { id: 'dining', name: 'Dining', multiplier: 7, description: '7x Hilton Honors points on dining worldwide' },
      { id: 'general', name: 'General', multiplier: 3, description: '3x Hilton Honors points on all other purchases' }
    ],
    signupBonus: {
      points: 150000,
      spendRequirement: 6000,
      timeLimit: '6 months',
      description: '150,000 Hilton Honors points after spending $6,000 in first 6 months'
    },
    credits: [
      { name: 'Hilton Resort Credit', amount: 400, frequency: 'annual', description: '$200 semi-annual Hilton resort credit ($400 annually)' },
      { name: 'Free Night Award', amount: 0, frequency: 'annual', description: 'One free night each year at select Hilton properties' },
      { name: 'In-Flight Statement Credit', amount: 200, frequency: 'annual', description: '$50 in-flight statement credit quarterly ($200 annually)' },
      { name: 'Clear Plus Credit', amount: 209, frequency: 'annual', description: '$209 CLEAR Plus credit for expedited airport security' },
      { name: 'Hilton Diamond Status', amount: 0, frequency: 'annual', description: 'Complimentary Hilton Honors Diamond status' }
    ]
  },
  {
    id: 'amex-hilton-surpass',
    name: 'Hilton Honors Surpass American Express',
    issuer: 'American Express',
    annualFee: 150,
    closingDate: 21,
    imageUrl: '/images/cards/amex-hilton-surpass.jpg',
    rewards: [
      { id: 'hotels', name: 'Hilton Hotels', multiplier: 12, description: '12x Hilton Honors points on hotels and resorts in the Hilton portfolio' },
      { id: 'dining', name: 'Dining & Groceries', multiplier: 6, description: '6x Hilton Honors points on dining and groceries' },
      { id: 'gas', name: 'Gas', multiplier: 6, description: '6x Hilton Honors points on gas stations' }
    ],
    description: 'Mid-tier Hilton hotel rewards card with Gold status and everyday bonuses',
    allRewards: [
      { id: 'hotels', name: 'Hilton Hotels', multiplier: 12, description: '12x Hilton Honors points on hotels and resorts in the Hilton portfolio' },
      { id: 'dining', name: 'Dining & Groceries', multiplier: 6, description: '6x Hilton Honors points on dining and groceries' },
      { id: 'gas', name: 'Gas', multiplier: 6, description: '6x Hilton Honors points on gas stations' },
      { id: 'online', name: 'Online Retail', multiplier: 4, description: '4x Hilton Honors points on online retail purchases' },
      { id: 'general', name: 'General', multiplier: 3, description: '3x Hilton Honors points on all other purchases' }
    ],
    signupBonus: {
      points: 130000,
      spendRequirement: 3000,
      timeLimit: '6 months',
      description: '130,000 Hilton Honors points after spending $3,000 in first 6 months'
    },
    credits: [
      { name: 'Hilton Statement Credit', amount: 200, frequency: 'annual', description: '$50 quarterly statement credit for Hilton properties ($200 annually)' },
      { name: 'Free Night Reward', amount: 0, frequency: 'annual', description: 'Free night reward from Hilton Honors after spending $15,000 in a calendar year' },
      { name: 'National Car Rental Status', amount: 0, frequency: 'annual', description: 'National Car Rental Emerald Club Executive status' },
      { name: 'Diamond Status Upgrade', amount: 0, frequency: 'annual', description: 'Spend $40,000 on eligible purchases in a calendar year to upgrade to Diamond status' },
      { name: 'Hilton Gold Status', amount: 0, frequency: 'annual', description: 'Complimentary Hilton Honors Gold status' }
    ]
  },
  {
    id: 'amex-marriott-brilliant',
    name: 'Marriott Bonvoy Brilliant American Express',
    issuer: 'American Express',
    annualFee: 650,
    closingDate: 17,
    imageUrl: '/images/cards/amex-marriott-brilliant.jpg',
    rewards: [
      { id: 'hotels', name: 'Marriott Hotels', multiplier: 6, description: '6x Marriott Bonvoy points on hotels participating in Marriott Bonvoy' },
      { id: 'dining', name: 'Restaurants', multiplier: 3, description: '3x Marriott Bonvoy points at restaurants' },
      { id: 'flights', name: 'Flights', multiplier: 3, description: '3x Marriott Bonvoy points on flights' }
    ],
    description: 'Premium Marriott hotel rewards card with Platinum elite status and luxury benefits',
    allRewards: [
      { id: 'hotels', name: 'Marriott Hotels', multiplier: 6, description: '6x Marriott Bonvoy points on hotels participating in Marriott Bonvoy' },
      { id: 'dining', name: 'Restaurants', multiplier: 3, description: '3x Marriott Bonvoy points at restaurants' },
      { id: 'flights', name: 'Flights', multiplier: 3, description: '3x Marriott Bonvoy points on flights' },
      { id: 'general', name: 'General', multiplier: 2, description: '2x Marriott Bonvoy points on all other purchases' }
    ],
    signupBonus: {
      points: 185000,
      spendRequirement: 6000,
      timeLimit: '6 months',
      description: '185,000 Marriott Bonvoy points after spending $6,000 in first 6 months'
    },
    credits: [
      { name: 'Restaurant Statement Credit', amount: 300, frequency: 'annual', description: '$25 monthly statement credit for purchases at restaurants ($300 annually)' },
      { name: 'Free Night Award', amount: 0, frequency: 'annual', description: 'One free night every year (up to 85,000 Marriott Bonvoy points)' },
      { name: 'Marriott Platinum Elite Status', amount: 0, frequency: 'annual', description: 'Marriott Bonvoy Platinum Elite status with room upgrades and enhanced views' }
    ]
  },
  {
    id: 'amex-marriott-bevy',
    name: 'Marriott Bonvoy Bevy American Express',
    issuer: 'American Express',
    annualFee: 250,
    closingDate: 11,
    imageUrl: '/images/cards/amex-marriott-bevy.jpg',
    rewards: [
      { id: 'hotels', name: 'Marriott Hotels', multiplier: 6, description: '6x Marriott Bonvoy points on hotels participating in Marriott Bonvoy' },
      { id: 'dining', name: 'Restaurants & Supermarkets', multiplier: 4, description: '4x Marriott Bonvoy points at restaurants and supermarkets (up to $15,000/year)' },
      { id: 'general', name: 'General', multiplier: 2, description: '2x Marriott Bonvoy points on all other purchases' }
    ],
    description: 'Mid-tier Marriott hotel rewards card with Gold elite status and everyday bonuses',
    allRewards: [
      { id: 'hotels', name: 'Marriott Hotels', multiplier: 6, description: '6x Marriott Bonvoy points on hotels participating in Marriott Bonvoy' },
      { id: 'dining', name: 'Restaurants & Supermarkets', multiplier: 4, description: '4x Marriott Bonvoy points at restaurants and supermarkets (up to $15,000/year)' },
      { id: 'dining-cap', name: 'Restaurants & Supermarkets (After Cap)', multiplier: 2, description: '2x Marriott Bonvoy points at restaurants and supermarkets after $15,000/year' },
      { id: 'general', name: 'General', multiplier: 2, description: '2x Marriott Bonvoy points on all other purchases' }
    ],
    signupBonus: {
      points: 155000,
      spendRequirement: 5000,
      timeLimit: '6 months',
      description: '155,000 Marriott Bonvoy points after spending $5,000 in first 6 months'
    },
    credits: [
      { name: 'Bonus Points Per Stay', amount: 0, frequency: 'per stay', description: '1,000 bonus points per stay with participating Marriott properties' },
      { name: 'Marriott Gold Elite Status', amount: 0, frequency: 'annual', description: 'Marriott Bonvoy Gold Elite status - earn up to 2.5x points from Marriott Bonvoy eligible hotels' },
      { name: 'Elite Night Credits', amount: 15, frequency: 'annual', description: '15 elite night credits each calendar year toward Marriott Bonvoy elite status' }
    ]
  },

  // Chase Cards
  {
    id: 'chase-sapphire-preferred',
    name: 'Chase Sapphire Preferred',
    issuer: 'Chase',
    annualFee: 95,
    closingDate: 5,
    imageUrl: '/images/cards/chase-sapphire-preferred.png',
    rewards: [
      { id: 'chase-travel', name: 'Chase Travel', multiplier: 5, description: '5x total points on travel purchased through Chase Travel' },
      { id: 'dining', name: 'Dining', multiplier: 3, description: '3x points on dining, including eligible delivery services, takeout and dining out' },
      { id: 'travel', name: 'Other Travel', multiplier: 2, description: '2x points on other travel purchases' }
    ],
    description: 'Premium dining & travel rewards card with extensive benefits',
    allRewards: [
      { id: 'chase-travel', name: 'Chase Travel', multiplier: 5, description: '5x total points on travel purchased through Chase Travel, excluding hotel purchases that qualify for the $50 Annual Chase Travel Hotel Credit' },
      { id: 'dining', name: 'Dining', multiplier: 3, description: '3x points on dining, including eligible delivery services, takeout and dining out' },
      { id: 'travel', name: 'Other Travel', multiplier: 2, description: '2x points on other travel purchases' },
      { id: 'groceries', name: 'Online Groceries', multiplier: 3, description: '3x points on online grocery purchases (excluding Target, Walmart and wholesale clubs)' },
      { id: 'streaming', name: 'Streaming Services', multiplier: 3, description: '3x points on select streaming services' },
      { id: 'general', name: 'General', multiplier: 1, description: '1 point per dollar spent on all other purchases' }
    ],
    signupBonus: {
      points: 75000,
      spendRequirement: 5000,
      timeLimit: '3 months',
      description: '75,000 Chase Ultimate Rewards points after spending $5,000 in first 3 months'
    },
    credits: [
      { name: 'Annual Hotel Credit', amount: 50, frequency: 'annual', description: '$50 Annual Chase Travel Hotel Credit for hotel stays purchased through Chase Travel' },
      { name: 'Anniversary Bonus Points', amount: 0, frequency: 'annual', description: 'Bonus points equal to 10% of your total purchases made the previous year' },
      { name: 'Partnership Benefits', amount: 200, frequency: 'annual', description: 'Over $200 in partnership benefit value' }
    ]
  },
  {
    id: 'chase-sapphire-reserve',
    name: 'Chase Sapphire Reserve',
    issuer: 'Chase',
    annualFee: 550,
    closingDate: 15,
    imageUrl: '/images/cards/chase-sapphire-reserve.png',
    rewards: [
      { id: 'chase-travel', name: 'Chase Travel', multiplier: 8, description: '8x points on purchases through Chase Travel' },
      { id: 'flights', name: 'Flights', multiplier: 4, description: '4x points on flights booked directly with airlines' },
      { id: 'hotels', name: 'Hotels', multiplier: 4, description: '4x points on hotels booked directly' },
      { id: 'dining', name: 'Dining', multiplier: 3, description: '3x points on dining worldwide' }
    ],
    description: 'Premium travel rewards card with luxury benefits and extensive statement credits',
    allRewards: [
      { id: 'chase-travel', name: 'Chase Travel', multiplier: 8, description: '8x points on purchases through Chase Travel' },
      { id: 'flights', name: 'Flights', multiplier: 4, description: '4x points on flights booked directly with airlines' },
      { id: 'hotels', name: 'Hotels', multiplier: 4, description: '4x points on hotels booked directly' },
      { id: 'dining', name: 'Dining', multiplier: 3, description: '3x points on dining worldwide' },
      { id: 'lyft', name: 'Lyft', multiplier: 5, description: '5x total points on Lyft rides' },
      { id: 'peloton', name: 'Peloton', multiplier: 10, description: '10x points on Peloton equipment purchases' },
      { id: 'general', name: 'General', multiplier: 1, description: '1x points on all other purchases' }
    ],
    signupBonus: {
      points: 125000,
      spendRequirement: 6000,
      timeLimit: '3 months',
      description: '125,000 Chase Ultimate Rewards points after spending $6,000 in first 3 months'
    },
    credits: [
      { name: 'Annual Travel Credit', amount: 300, frequency: 'annual', description: '$300 annual travel credit for flights, hotels, car rentals, and more' },
      { name: 'Hotel Statement Credit', amount: 500, frequency: 'semi-annual', description: '$500 semi-annual statement credit for hotels' },
      { name: 'Dining Statement Credit', amount: 150, frequency: 'semi-annual', description: '$150 semi-annual statement credit for dining at restaurants part of Sapphire Reserve exclusive tables' },
      { name: 'Apple Services Credit', amount: 250, frequency: 'annual', description: '$250 in Apple TV Plus and Apple Music subscriptions' },
      { name: 'DashPass Membership', amount: 120, frequency: 'annual', description: '$120 DashPass membership (yearly)' },
      { name: 'DoorDash Promos', amount: 300, frequency: 'annual', description: '$300 in DoorDash promos split monthly' },
      { name: 'StubHub Credit', amount: 150, frequency: 'semi-annual', description: '$150 semi-annual statement credits for StubHub' },
      { name: 'Lyft Credit', amount: 10, frequency: 'monthly', description: '$10 monthly Lyft credits' },
      { name: 'Peloton Credit', amount: 10, frequency: 'monthly', description: '$10 monthly statement credit for Peloton' },
      { name: 'Global Entry Credit', amount: 120, frequency: '4 years', description: '$120 statement credit every 4 years for Global Entry, TSA Pre-check, or Nexus' },
      { name: 'Priority Pass Membership', amount: 469, frequency: 'annual', description: '$469 Priority Pass Select membership' },
      { name: 'Chase Sapphire Lounge Access', amount: 0, frequency: 'unlimited', description: 'Access to Chase Sapphire Lounge by The Club with two complementary guests' },
      { name: 'IHG Platinum Elite Status', amount: 0, frequency: 'annual', description: 'IHG One Rewards Platinum Elite status' }
    ],
    travelBenefits: [
      { type: 'lounge', name: 'Priority Pass™', description: 'Access to 1,300+ lounges worldwide' },
      { type: 'lounge', name: 'Chase Sapphire Lounges', description: 'Access to Chase Sapphire Lounge by The Club with two complementary guests' },
      { type: 'hotel', name: 'IHG Platinum Elite', description: 'IHG One Rewards Platinum Elite status with room upgrades and bonus points', status: 'Platinum Elite' }
    ]
  },
  {
    id: 'chase-freedom-flex',
    name: 'Chase Freedom Flex',
    issuer: 'Chase',
    annualFee: 0,
    closingDate: 12,
    imageUrl: '/images/cards/chase-freedom-flex.png',
    rewards: [
      { id: 'quarterly', name: 'Quarterly Categories', multiplier: 5, description: '5% cash back on quarterly bonus categories (up to $1,500 per quarter)', type: 'cashback' },
      { id: 'chase-travel', name: 'Chase Travel', multiplier: 5, description: '5% cash back on travel purchased through Chase Travel', type: 'cashback' },
      { id: 'dining', name: 'Dining', multiplier: 3, description: '3% cash back on dining at restaurants, including takeout and eligible delivery services', type: 'cashback' }
    ],
    description: 'No annual fee cash back card with rotating quarterly categories and bonus rewards',
    allRewards: [
      { id: 'quarterly', name: 'Quarterly Categories', multiplier: 5, description: '5% cash back on quarterly bonus categories (up to $1,500 per quarter)', type: 'cashback' },
      { id: 'chase-travel', name: 'Chase Travel', multiplier: 5, description: '5% cash back on travel purchased through Chase Travel', type: 'cashback' },
      { id: 'dining', name: 'Dining', multiplier: 3, description: '3% cash back on dining at restaurants, including takeout and eligible delivery services', type: 'cashback' },
      { id: 'drugstores', name: 'Drugstores', multiplier: 3, description: '3% cash back on drugstore purchases', type: 'cashback' },
      { id: 'general', name: 'General', multiplier: 1, description: '1% cash back on all other purchases', type: 'cashback' }
    ],
    signupBonus: {
      points: 200,
      spendRequirement: 500,
      timeLimit: '3 months',
      description: '$200 cash back bonus after spending $500 in first 3 months'
    },
    credits: [
      { name: 'Intro APR', amount: 0, frequency: '15 months', description: '0% intro APR for 15 months from account opening on purchases and balance transfers' },
      { name: 'No Expiration', amount: 0, frequency: 'unlimited', description: 'Cash back rewards do not expire as long as your account is open' },
      { name: 'No Minimum Redemption', amount: 0, frequency: 'unlimited', description: 'No minimum to redeem for cash back' }
    ]
  },
  {
    id: 'chase-freedom-unlimited',
    name: 'Chase Freedom Unlimited',
    issuer: 'Chase',
    annualFee: 0,
    closingDate: 8,
    imageUrl: '/images/cards/chase-freedom-unlimited.png',
    rewards: [
      { id: 'chase-travel', name: 'Chase Travel', multiplier: 5, description: '5% cash back on travel purchased through Chase Travel', type: 'cashback' },
      { id: 'dining', name: 'Dining', multiplier: 3, description: '3% cash back on dining at restaurants, including takeout and eligible delivery services', type: 'cashback' },
      { id: 'drugstores', name: 'Drugstores', multiplier: 3, description: '3% cash back on drugstore purchases', type: 'cashback' }
    ],
    description: 'Unlimited 1.5% cash back card with bonus categories and no annual fee',
    allRewards: [
      { id: 'chase-travel', name: 'Chase Travel', multiplier: 5, description: '5% cash back on travel purchased through Chase Travel', type: 'cashback' },
      { id: 'dining', name: 'Dining', multiplier: 3, description: '3% cash back on dining at restaurants, including takeout and eligible delivery services', type: 'cashback' },
      { id: 'drugstores', name: 'Drugstores', multiplier: 3, description: '3% cash back on drugstore purchases', type: 'cashback' },
      { id: 'general', name: 'General', multiplier: 1.5, description: '1.5% cash back on all other purchases', type: 'cashback' }
    ],
    signupBonus: {
      points: 200,
      spendRequirement: 500,
      timeLimit: '3 months',
      description: '$200 cash back bonus after spending $500 in first 3 months'
    },
    credits: [
      { name: 'Intro APR', amount: 0, frequency: '15 months', description: '0% intro APR for 15 months from account opening on purchases and balance transfers' },
      { name: 'No Expiration', amount: 0, frequency: 'unlimited', description: 'Cash back rewards do not expire as long as your account is open' },
      { name: 'No Minimum Redemption', amount: 0, frequency: 'unlimited', description: 'No minimum to redeem for cash back' }
    ]
  },
  {
    id: 'chase-freedom-rise',
    name: 'Chase Freedom Rise',
    issuer: 'Chase',
    annualFee: 0,
    closingDate: 10,
    imageUrl: '/images/cards/chase-freedom-rise.png',
    rewards: [
      { id: 'general', name: 'General', multiplier: 1.5, description: '1.5% cash back on all purchases', type: 'cashback' }
    ],
    description: 'No annual fee card designed for new to credit and students',
    allRewards: [
      { id: 'general', name: 'General', multiplier: 1.5, description: '1.5% cash back on all purchases', type: 'cashback' },
      { id: 'lyft', name: 'Lyft', multiplier: 2, description: '2% total cash back on Lyft rides (through September 30, 2027)', type: 'cashback' }
    ],
    signupBonus: {
      points: 25,
      spendRequirement: 0,
      timeLimit: 'immediate',
      description: '$25 cash back bonus for enrolling in automatic payments'
    },
    credits: [
      { name: 'Automatic Payments Bonus', amount: 25, frequency: 'one-time', description: '$25 cash back bonus for enrolling in automatic payments' },
      { name: 'DashPass Membership', amount: 0, frequency: '6 months', description: '6 months of complimentary DashPass membership ($0 delivery fees)' },
      { name: 'DashPass Quarterly Credit', amount: 10, frequency: 'quarterly', description: 'Up to $10 off quarterly on non-restaurant DoorDash orders (through Dec 31, 2027)' },
      { name: 'No Minimum Redemption', amount: 0, frequency: 'unlimited', description: 'No minimum to redeem for cash back' },
      { name: 'No Expiration', amount: 0, frequency: 'unlimited', description: 'Cash back rewards do not expire as long as your account is open' }
    ]
  },
  {
    id: 'chase-marriott-bonvoy-bold',
    name: 'Marriott Bonvoy Bold',
    issuer: 'Chase',
    annualFee: 0,
    closingDate: 15,
    imageUrl: '/images/cards/chase-marriott-bonvoy-bold.png',
    rewards: [
      { id: 'marriott-hotels', name: 'Marriott Hotels', multiplier: 14, description: 'Up to 14x total points at hotels participating in Marriott Bonvoy' },
      { id: 'dining', name: 'Dining', multiplier: 2, description: '2x points on dining' },
      { id: 'general', name: 'General', multiplier: 1, description: '1x points on all other purchases' }
    ],
    description: 'No annual fee Marriott rewards card with automatic Silver Elite status',
    allRewards: [
      { id: 'marriott-hotels', name: 'Marriott Hotels', multiplier: 14, description: 'Up to 14x total points at hotels participating in Marriott Bonvoy' },
      { id: 'dining', name: 'Dining', multiplier: 2, description: '2x points on dining' },
      { id: 'general', name: 'General', multiplier: 1, description: '1x points on all other purchases' }
    ],
    signupBonus: {
      points: 30000,
      spendRequirement: 1000,
      timeLimit: '3 months',
      description: '30,000 Marriott Bonvoy bonus points after spending $1,000 in first 3 months'
    },
    credits: [
      { name: 'Silver Elite Status', amount: 0, frequency: 'annual', description: 'Automatic Silver Elite Status' },
      { name: 'Elite Night Credits', amount: 5, frequency: 'annual', description: '5 Elite Night Credits towards the next level of Marriott Bonvoy Elite Status' },
      { name: 'DashPass Membership', amount: 0, frequency: '1 year', description: 'One-year complimentary DashPass membership ($0 delivery fees)' },
      { name: 'DashPass Quarterly Credit', amount: 10, frequency: 'quarterly', description: 'Up to $10 off quarterly on non-restaurant DoorDash orders (through Dec 31, 2027)' },
      { name: 'Statement Credit Redemption', amount: 0, frequency: 'unlimited', description: 'Redeem Marriott Bonvoy points for statement credit to cover qualifying travel purchases' }
    ]
  },
  {
    id: 'chase-marriott-bonvoy-boundless',
    name: 'Marriott Bonvoy Boundless',
    issuer: 'Chase',
    annualFee: 95,
    closingDate: 18,
    imageUrl: '/images/cards/chase-marriott-bonvoy-boundless.png',
    rewards: [
      { id: 'marriott-hotels', name: 'Marriott Hotels', multiplier: 17, description: 'Up to 17x total points at hotels participating in Marriott Bonvoy' },
      { id: 'bonus-categories', name: 'Bonus Categories', multiplier: 3, description: '3x points on first $6,000 annually on grocery stores, gas stations, and dining' },
      { id: 'general', name: 'General', multiplier: 2, description: '2x points on all other purchases' }
    ],
    description: 'Premium Marriott hotel rewards card with annual free night and elite status',
    allRewards: [
      { id: 'marriott-hotels', name: 'Marriott Hotels', multiplier: 17, description: 'Up to 17x total points at hotels participating in Marriott Bonvoy (6x from card + up to 10x from Marriott + 1x from Silver Elite)' },
      { id: 'bonus-categories', name: 'Bonus Categories', multiplier: 3, description: '3x points on first $6,000 annually on grocery stores, gas stations, and dining' },
      { id: 'general', name: 'General', multiplier: 2, description: '2x points on all other purchases' }
    ],
    signupBonus: {
      points: 150000,
      spendRequirement: 3000,
      timeLimit: '3 months',
      description: '3 Free Night Awards after spending $3,000 in first 3 months (valued up to 150,000 points)'
    },
    credits: [
      { name: 'Annual Free Night Award', amount: 0, frequency: 'annual', description: 'Free Night Award each account anniversary (up to 35,000 points)' },
      { name: 'Silver Elite Status', amount: 0, frequency: 'annual', description: 'Automatic Silver Elite Status' },
      { name: 'Elite Night Credits', amount: 15, frequency: 'annual', description: '15 Elite Night Credits towards the next level of Marriott Bonvoy Elite Status' },
      { name: 'Elite Night Credits per Spend', amount: 0, frequency: 'per $5,000', description: '1 Elite Night Credit towards Elite Status for every $5,000 spent' },
      { name: 'Gold Status Path', amount: 0, frequency: 'annual', description: 'Path to Gold Status when you spend $35,000 on purchases each calendar year' },
      { name: 'DashPass Membership', amount: 0, frequency: '1 year', description: 'One-year complimentary DashPass membership ($0 delivery fees)' },
      { name: 'DashPass Quarterly Credit', amount: 10, frequency: 'quarterly', description: 'Up to $10 off quarterly on non-restaurant DoorDash orders (through Dec 31, 2027)' }
    ]
  },
  {
    id: 'chase-marriott-bonvoy-bountiful',
    name: 'Marriott Bonvoy Bountiful',
    issuer: 'Chase',
    annualFee: 250,
    closingDate: 20,
    imageUrl: '/images/cards/chase-marriott-bonvoy-bountiful.png',
    rewards: [
      { id: 'marriott-hotels', name: 'Marriott Hotels', multiplier: 18.5, description: 'Up to 18.5x total points at hotels participating in Marriott Bonvoy' },
      { id: 'groceries', name: 'Groceries', multiplier: 4, description: '4x points on groceries (up to $15,000 per year)' },
      { id: 'dining', name: 'Dining', multiplier: 4, description: '4x points on dining (up to $15,000 per year)' },
      { id: 'general', name: 'General', multiplier: 2, description: '2x points on all other purchases' }
    ],
    description: 'Premium Marriott hotel rewards card with enhanced earning potential',
    allRewards: [
      { id: 'marriott-hotels', name: 'Marriott Hotels', multiplier: 18.5, description: 'Up to 18.5x total points at hotels participating in Marriott Bonvoy' },
      { id: 'groceries', name: 'Groceries', multiplier: 4, description: '4x points on groceries (up to $15,000 per year)' },
      { id: 'dining', name: 'Dining', multiplier: 4, description: '4x points on dining (up to $15,000 per year)' },
      { id: 'general', name: 'General', multiplier: 2, description: '2x points on all other purchases' }
    ],
    signupBonus: {
      points: 85000,
      spendRequirement: 4000,
      timeLimit: '3 months',
      description: '85,000 Marriott Bonvoy bonus points after spending $4,000 in first 3 months'
    },
    credits: [
      { name: 'DashPass Membership', amount: 0, frequency: '1 year', description: 'One-year complimentary DashPass membership ($0 delivery fees)' },
      { name: 'DashPass Quarterly Credit', amount: 10, frequency: 'quarterly', description: 'Up to $10 off quarterly on non-restaurant DoorDash orders (through Dec 31, 2027)' }
    ]
  },
  {
    id: 'chase-united-club',
    name: 'United Club Infinite',
    issuer: 'Chase',
    annualFee: 695,
    closingDate: 25,
    imageUrl: '/images/cards/chase-united-club.png',
    rewards: [
      { id: 'united-flights', name: 'United Flights', multiplier: 9, description: '9x total miles on United flights' },
      { id: 'united-purchases', name: 'United Purchases', multiplier: 4, description: '4x miles on all other eligible United purchases' },
      { id: 'hotels', name: 'Hotels', multiplier: 5, description: '5x miles on hotel stays through Renowned Hotels and Resorts' },
      { id: 'travel', name: 'Travel', multiplier: 2, description: '2x miles on all other travel' },
      { id: 'dining', name: 'Dining', multiplier: 2, description: '2x miles on dining including delivery services' },
      { id: 'general', name: 'General', multiplier: 1, description: '1x mile on all other purchases' }
    ],
    description: 'Premium United card with United Club membership and extensive travel benefits',
    allRewards: [
      { id: 'united-flights', name: 'United Flights', multiplier: 9, description: '9x total miles on United flights (5x from MileagePlus member + 4x from card)' },
      { id: 'united-purchases', name: 'United Purchases', multiplier: 4, description: '4x miles on all other eligible United purchases' },
      { id: 'hotels', name: 'Hotels', multiplier: 5, description: '5x miles on hotel stays when you prepay directly through Renowned Hotels and Resorts' },
      { id: 'travel', name: 'Travel', multiplier: 2, description: '2x miles on all other travel including airfare, trains, local transit, cruise lines, hotels, car rentals, taxicabs, resorts, ride share services and tolls' },
      { id: 'dining', name: 'Dining', multiplier: 2, description: '2x miles on dining including eligible delivery services' },
      { id: 'general', name: 'General', multiplier: 1, description: '1x mile on all other purchases' }
    ],
    signupBonus: {
      points: 80000,
      spendRequirement: 5000,
      timeLimit: '3 months',
      description: '80,000 United bonus miles after spending $5,000 in first 3 months, plus 10,000 bonus miles after adding an authorized user'
    },
    credits: [
      { name: 'United Club Membership', amount: 750, frequency: 'annual', description: 'United Club card membership - at least $750 value per year' },
      { name: 'United Club One-Time Passes', amount: 4, frequency: 'annual', description: '4 United Club one-time passes (starting with first anniversary)' },
      { name: 'Free Checked Bags', amount: 360, frequency: 'per roundtrip', description: 'Free first and second checked bags for primary cardmember and one companion (save up to $360 per roundtrip)' },
      { name: 'Premier Access', amount: 0, frequency: 'unlimited', description: 'Premier Access travel services with priority check-in, security screening, boarding, and baggage handling' },
      { name: 'Award Flight Discount', amount: 10000, frequency: 'twice annually', description: '10,000-mile award flight discount after $20,000 in purchases (up to two times each calendar year)' },
      { name: 'Award Flight Savings', amount: 0, frequency: 'unlimited', description: 'Save an average of 30% in miles when booking award flights under the Cardmembers save banner' },
      { name: 'Hotel Credits', amount: 200, frequency: 'annual', description: 'Up to $200 in credits annually on prepaid hotel stays' },
      { name: 'Car Rental Credits', amount: 200, frequency: 'annual', description: 'Up to $200 in credits annually on car rentals' },
      { name: 'Dining Credits', amount: 200, frequency: 'annual', description: 'Up to $200 in credits annually on dining' },
      { name: 'Entertainment Credits', amount: 200, frequency: 'annual', description: 'Up to $200 in credits annually on entertainment' },
      { name: 'Instacart+ Membership', amount: 0, frequency: 'annual', description: 'Complimentary Instacart+ Membership with unlimited deliveries ($0 delivery fees through 12/31/27)' }
    ]
  },
  {
    id: 'chase-united-gateway',
    name: 'United Gateway Card',
    issuer: 'Chase',
    annualFee: 0,
    closingDate: 12,
    imageUrl: '/images/cards/chase-united-gateway.png',
    rewards: [
      { id: 'united-flights', name: 'United Flights', multiplier: 7, description: '7x total miles on United flights' },
      { id: 'united-hotels', name: 'United Hotels', multiplier: 5, description: '5x total miles on hotel stays through United Hotels' },
      { id: 'united-purchases', name: 'United Purchases', multiplier: 2, description: '2x miles on all other eligible United purchases' },
      { id: 'gas', name: 'Gas', multiplier: 2, description: '2x miles at gas stations' },
      { id: 'transit', name: 'Transit', multiplier: 2, description: '2x miles on local transit and commuting' },
      { id: 'general', name: 'General', multiplier: 1, description: '1x mile on all other purchases' }
    ],
    description: 'No annual fee United card with enhanced earning and travel benefits',
    allRewards: [
      { id: 'united-flights', name: 'United Flights', multiplier: 7, description: '7x total miles on United flights (5x from MileagePlus member + 2x from card)' },
      { id: 'united-hotels', name: 'United Hotels', multiplier: 5, description: '5x total miles on hotel stays through United Hotels (2x from United + 2x from card + 1x bonus when prepaid)' },
      { id: 'united-purchases', name: 'United Purchases', multiplier: 2, description: '2x miles on all other eligible United purchases' },
      { id: 'gas', name: 'Gas', multiplier: 2, description: '2x miles at gas stations' },
      { id: 'transit', name: 'Transit', multiplier: 2, description: '2x miles on local transit and commuting including ride share services, taxicabs, train tickets, tolls, and mass transit' },
      { id: 'general', name: 'General', multiplier: 1, description: '1x mile on all other purchases' }
    ],
    signupBonus: {
      points: 30000,
      spendRequirement: 1000,
      timeLimit: '3 months',
      description: '30,000 United bonus miles after spending $1,000 in first 3 months, plus 10,000 bonus miles after adding an authorized user'
    },
    credits: [
      { name: 'Free Checked Bags', amount: 0, frequency: 'after $10k spend', description: 'Earn 2 checked bags after you spend $10,000 in a calendar year' },
      { name: 'In-Flight Statement Credit', amount: 25, frequency: 'unlimited', description: '25% back as statement credit on food, beverages and Wi-Fi on United flights and Club premium drinks' },
      { name: 'Cardmember Award Pricing', amount: 0, frequency: 'after $10k spend', description: 'Cardmember award pricing after you spend $10,000 on purchases in a calendar year' },
      { name: 'No Foreign Transaction Fees', amount: 0, frequency: 'unlimited', description: 'No foreign transaction fees on purchases made outside the U.S.' },
      { name: '0% Intro APR', amount: 0, frequency: '12 months', description: '0% intro APR for the first 12 months on purchases' }
    ]
  },
  {
    id: 'chase-united-quest',
    name: 'United Quest Card',
    issuer: 'Chase',
    annualFee: 350,
    closingDate: 8,
    imageUrl: '/images/cards/chase-united-quest.png',
    rewards: [
      { id: 'united-flights', name: 'United Flights', multiplier: 8, description: '8x total miles on United flights' },
      { id: 'united-purchases', name: 'United Purchases', multiplier: 3, description: '3x miles on all other eligible United purchases' },
      { id: 'hotels', name: 'Hotels', multiplier: 5, description: '5x miles on hotel stays through Renowned Hotels and Resorts' },
      { id: 'travel', name: 'Travel', multiplier: 2, description: '2x miles on all other travel' },
      { id: 'dining', name: 'Dining', multiplier: 2, description: '2x miles on dining including delivery services' },
      { id: 'streaming', name: 'Streaming', multiplier: 2, description: '2x miles on select streaming services' },
      { id: 'general', name: 'General', multiplier: 1, description: '1x mile on all other purchases' }
    ],
    description: 'Mid-tier United rewards card with travel credits and Premier benefits',
    allRewards: [
      { id: 'united-flights', name: 'United Flights', multiplier: 8, description: '8x total miles on United flights (5x from MileagePlus member + 3x from card)' },
      { id: 'united-purchases', name: 'United Purchases', multiplier: 3, description: '3x miles on all other eligible United purchases' },
      { id: 'hotels', name: 'Hotels', multiplier: 5, description: '5x miles on hotel stays when you prepay directly through Renowned Hotels and Resorts' },
      { id: 'travel', name: 'Travel', multiplier: 2, description: '2x miles on all other travel including airfare, trains, local transit, cruise lines, hotels, car rentals, taxicabs, resorts, ride share services and tolls' },
      { id: 'dining', name: 'Dining', multiplier: 2, description: '2x miles on dining including eligible delivery services' },
      { id: 'streaming', name: 'Streaming', multiplier: 2, description: '2x miles on select streaming services' },
      { id: 'general', name: 'General', multiplier: 1, description: '1x mile on all other purchases' }
    ],
    signupBonus: {
      points: 70000,
      spendRequirement: 4000,
      timeLimit: '3 months',
      description: '70,000 United bonus miles + 1,000 Premier qualifying points (PQP) after spending $4,000 in first 3 months, plus 10,000 bonus miles after adding an authorized user'
    },
    credits: [
      { name: 'United Travel Credit', amount: 200, frequency: 'annual', description: '$200 United travel credit' },
      { name: 'Annual Award Flight Discount', amount: 10000, frequency: 'annual', description: '10,000-mile discount toward eligible award flight (starting with first anniversary)' },
      { name: 'Spend-Based Award Flight Discount', amount: 10000, frequency: 'after $20k spend', description: '10,000-mile award flight discount after spending $20,000 each calendar year' },
      { name: 'Free Checked Bags', amount: 360, frequency: 'per roundtrip', description: 'Free first and second checked bags for primary cardmember and one companion (save up to $360 per roundtrip)' },
      { name: 'Economy Plus Upgrades', amount: 2, frequency: 'after $40k spend', description: '2 global Economy Plus seat upgrades after spending $40,000 each calendar year' },
      { name: 'Award Flight Savings', amount: 0, frequency: 'unlimited', description: 'Save an average of 30% in miles when booking award flights under the Cardmembers save banner' },
      { name: 'Card Bonus PQP', amount: 1000, frequency: 'annual', description: '1,000 Card Bonus Premier qualifying points (PQP) each year (starting 2026)' },
      { name: 'PQP Earning', amount: 0, frequency: 'per $500', description: 'Earn 1 Premier qualifying point (PQP) for every $500 spent on purchases' },
      { name: 'Instacart+ Membership', amount: 0, frequency: '3 months', description: '3-month complimentary Instacart+ Membership (then 50% off annual rate through 12/31/27)' }
    ]
  },
  {
    id: 'chase-southwest-premier',
    name: 'Southwest Rapid Rewards Premier',
    issuer: 'Chase',
    annualFee: 149,
    closingDate: 15,
    imageUrl: '/images/cards/chase-southwest-premier.png',
    rewards: [
      { id: 'southwest', name: 'Southwest Airlines', multiplier: 3, description: '3x points on Southwest Airlines purchases' },
      { id: 'groceries', name: 'Groceries', multiplier: 2, description: '2x points at grocery stores' },
      { id: 'dining', name: 'Dining', multiplier: 2, description: '2x points at restaurants' },
      { id: 'general', name: 'General', multiplier: 1, description: '1x points on all other purchases' }
    ],
    description: 'Mid-tier Southwest rewards card with enhanced benefits and travel perks',
    allRewards: [
      { id: 'southwest', name: 'Southwest Airlines', multiplier: 3, description: '3x points on Southwest Airlines purchases' },
      { id: 'groceries', name: 'Groceries', multiplier: 2, description: '2x points at grocery stores (first $8,000 annually)' },
      { id: 'dining', name: 'Dining', multiplier: 2, description: '2x points at restaurants (first $8,000 annually)' },
      { id: 'general', name: 'General', multiplier: 1, description: '1x points on all other purchases' }
    ],
    signupBonus: {
      points: 50000,
      spendRequirement: 1000,
      timeLimit: '3 months',
      description: '50,000 Southwest Rapid Rewards bonus points after spending $1,000 in first 3 months'
    },
    credits: [
      { name: 'Anniversary Points', amount: 6000, frequency: 'annual', description: '6,000 points every year on your Cardmember anniversary' },
      { name: 'Free Checked Bags', amount: 0, frequency: 'unlimited', description: 'First checked bag free for Cardmembers and up to 8 additional passengers in the same reservation' },
      { name: 'Complimentary Preferred Seat', amount: 0, frequency: 'unlimited', description: 'Select a Standard or Preferred seat within 48 hours prior to departure when available (flights operating in 2026 and beyond)' },
      { name: '15% Flight Discount', amount: 0, frequency: 'annual', description: 'Receive a 15% promo code each year on your Cardmember anniversary (Excludes Basic fare)' },
      { name: 'Group 5 Boarding', amount: 0, frequency: 'unlimited', description: 'Cardmembers and up to 8 additional passengers board with Group 5 (flights operating in 2026 and beyond)' },
      { name: 'In-Flight Purchase Credit', amount: 25, frequency: 'unlimited', description: '25% back on inflight purchases' },
      { name: 'A-List Status Boost', amount: 1500, frequency: 'per $5k spend', description: 'Earn 1,500 tier qualifying points (TQPs) toward A-List status for every $5,000 spent annually' },
      { name: 'Companion Pass Boost', amount: 10000, frequency: 'annual', description: '10,000 Companion Pass qualifying points boost each year' },
      { name: 'No Foreign Transaction Fees', amount: 0, frequency: 'unlimited', description: 'No foreign transaction fees' },
      { name: 'DashPass Membership', amount: 0, frequency: '1 year', description: 'One-year complimentary DashPass membership ($0 delivery fees)' },
      { name: 'DashPass Quarterly Credit', amount: 10, frequency: 'quarterly', description: 'Up to $10 off quarterly on non-restaurant DoorDash orders (through Dec 31, 2027)' }
    ]
  },
  {
    id: 'chase-southwest-priority',
    name: 'Southwest Rapid Rewards Priority',
    issuer: 'Chase',
    annualFee: 229,
    closingDate: 20,
    imageUrl: '/images/cards/chase-southwest-priority.png',
    rewards: [
      { id: 'southwest', name: 'Southwest Airlines', multiplier: 4, description: '4x points on Southwest Airlines purchases' },
      { id: 'gas', name: 'Gas', multiplier: 2, description: '2x points at gas stations' },
      { id: 'dining', name: 'Dining', multiplier: 2, description: '2x points at restaurants' },
      { id: 'general', name: 'General', multiplier: 1, description: '1x points on all other purchases' }
    ],
    description: 'Premium Southwest rewards card with enhanced benefits and travel perks',
    allRewards: [
      { id: 'southwest', name: 'Southwest Airlines', multiplier: 4, description: '4x points on Southwest Airlines purchases' },
      { id: 'gas', name: 'Gas', multiplier: 2, description: '2x points at gas stations' },
      { id: 'dining', name: 'Dining', multiplier: 2, description: '2x points at restaurants' },
      { id: 'general', name: 'General', multiplier: 1, description: '1x points on all other purchases' }
    ],
    signupBonus: {
      points: 50000,
      spendRequirement: 1000,
      timeLimit: '3 months',
      description: '50,000 Southwest Rapid Rewards bonus points after spending $1,000 in first 3 months'
    },
    credits: [
      { name: 'Anniversary Points', amount: 7500, frequency: 'annual', description: '7,500 points every year on your Cardmember anniversary' },
      { name: 'Free Checked Bags', amount: 0, frequency: 'unlimited', description: 'First checked bag free for Cardmembers and up to 8 additional passengers in the same reservation' },
      { name: 'Complimentary Preferred Seat', amount: 0, frequency: 'unlimited', description: 'Complimentary Preferred seat at booking when available (flights operating in 2026 and beyond)' },
      { name: 'Extra Legroom Seat Upgrade', amount: 0, frequency: 'unlimited', description: 'Unlimited upgrades to an Extra Legroom seat within 48 hours prior to departure when available (flights operating in 2026 and beyond)' },
      { name: 'Group 5 Boarding', amount: 0, frequency: 'unlimited', description: 'Cardmembers and up to 8 additional passengers board with Group 5 (flights operating in 2026 and beyond)' },
      { name: 'In-Flight Purchase Credit', amount: 25, frequency: 'unlimited', description: '25% back on inflight purchases' },
      { name: 'A-List Status Boost', amount: 2500, frequency: 'per $5k spend', description: 'Earn 2,500 tier qualifying points (TQPs) toward A-List status for every $5,000 spent annually' },
      { name: 'Companion Pass Boost', amount: 10000, frequency: 'annual', description: '10,000 Companion Pass qualifying points boost each year' },
      { name: 'No Foreign Transaction Fees', amount: 0, frequency: 'unlimited', description: 'No foreign transaction fees' },
      { name: 'DashPass Membership', amount: 0, frequency: '1 year', description: 'One-year complimentary DashPass membership ($0 delivery fees)' },
      { name: 'DashPass Quarterly Credit', amount: 10, frequency: 'quarterly', description: 'Up to $10 off quarterly on non-restaurant DoorDash orders (through Dec 31, 2027)' }
    ]
  },
  {
    id: 'chase-southwest-plus',
    name: 'Southwest Rapid Rewards Plus',
    issuer: 'Chase',
    annualFee: 99,
    closingDate: 10,
    imageUrl: '/images/cards/chase-southwest-plus.png',
    rewards: [
      { id: 'southwest', name: 'Southwest Airlines', multiplier: 2, description: '2x points on Southwest Airlines purchases' },
      { id: 'gas', name: 'Gas', multiplier: 2, description: '2x points at gas stations' },
      { id: 'groceries', name: 'Groceries', multiplier: 2, description: '2x points at grocery stores' },
      { id: 'general', name: 'General', multiplier: 1, description: '1x points on all other purchases' }
    ],
    description: 'Entry-level Southwest rewards card with enhanced benefits and travel perks',
    allRewards: [
      { id: 'southwest', name: 'Southwest Airlines', multiplier: 2, description: '2x points on Southwest Airlines purchases' },
      { id: 'gas', name: 'Gas', multiplier: 2, description: '2x points at gas stations (first $5,000 annually)' },
      { id: 'groceries', name: 'Groceries', multiplier: 2, description: '2x points at grocery stores (first $5,000 annually)' },
      { id: 'general', name: 'General', multiplier: 1, description: '1x points on all other purchases' }
    ],
    signupBonus: {
      points: 50000,
      spendRequirement: 1000,
      timeLimit: '3 months',
      description: '50,000 Southwest Rapid Rewards bonus points after spending $1,000 in first 3 months'
    },
    credits: [
      { name: 'Anniversary Points', amount: 3000, frequency: 'annual', description: '3,000 points every year on your Cardmember anniversary' },
      { name: 'Free Checked Bags', amount: 0, frequency: 'unlimited', description: 'First checked bag free for Cardmembers and up to 8 additional passengers in the same reservation' },
      { name: 'Complimentary Standard Seat', amount: 0, frequency: 'unlimited', description: 'Select a Standard seat within 48 hours prior to departure when available (flights operating in 2026 and beyond)' },
      { name: '10% Flight Discount', amount: 0, frequency: 'annual', description: 'Receive a 10% promo code each year on your Cardmember anniversary (Excludes Basic fare)' },
      { name: 'Group 5 Boarding', amount: 0, frequency: 'unlimited', description: 'Cardmembers and up to 8 additional passengers board with Group 5 (flights operating in 2026 and beyond)' },
      { name: 'In-Flight Purchase Credit', amount: 25, frequency: 'unlimited', description: '25% back on inflight purchases' },
      { name: 'Companion Pass Boost', amount: 10000, frequency: 'annual', description: '10,000 Companion Pass qualifying points boost each year' },
      { name: 'No Foreign Transaction Fees', amount: 0, frequency: 'unlimited', description: 'No foreign transaction fees' },
      { name: 'DashPass Membership', amount: 0, frequency: '1 year', description: 'One-year complimentary DashPass membership ($0 delivery fees)' },
      { name: 'DashPass Quarterly Credit', amount: 10, frequency: 'quarterly', description: 'Up to $10 off quarterly on non-restaurant DoorDash orders (through Dec 31, 2027)' }
    ]
  },

  // Bank of America Cards
  {
    id: 'boa-customized-cash',
    name: 'Bank of America Customized Cash Rewards',
    issuer: 'Bank of America',
    annualFee: 0,
    closingDate: 25,
    imageUrl: '/images/cards/boa-customized-cash-rewards.png',
    rewards: [
      { id: 'custom-category', name: 'Custom Category', multiplier: 6, description: '6% cash back in a category of your choice (gas, online shopping, dining, travel, drug stores, home improvement) for first year, then 3%' },
      { id: 'groceries', name: 'Groceries', multiplier: 2, description: '2% cash back at grocery stores and wholesale clubs' },
      { id: 'general', name: 'General', multiplier: 1, description: '1% cash back on all other purchases' }
    ],
    description: 'Flexible cash back card with customizable category selection',
    allRewards: [
      { id: 'custom-category', name: 'Custom Category', multiplier: 6, description: '6% cash back in a category of your choice (gas, online shopping, dining, travel, drug stores, home improvement) for first year, then 3%' },
      { id: 'groceries', name: 'Groceries', multiplier: 2, description: '2% cash back at grocery stores and wholesale clubs' },
      { id: 'general', name: 'General', multiplier: 1, description: '1% cash back on all other purchases' }
    ],
    signupBonus: {
      points: 200,
      spendRequirement: 1000,
      timeLimit: '90 days',
      description: '$200 online cash rewards bonus after spending $1,000 in first 90 days'
    },
    credits: [
      { name: 'Welcome Bonus', amount: 200, frequency: 'one-time', description: '$200 online cash rewards bonus after spending $1,000 in first 90 days' }
    ]
  },
  {
    id: 'boa-travel-rewards',
    name: 'Bank of America Travel Rewards',
    issuer: 'Bank of America',
    annualFee: 0,
    closingDate: 18,
    imageUrl: '/images/cards/boa-travel-rewards.png',
    rewards: [
      { id: 'general', name: 'General', multiplier: 1.5, description: '1.5x points per $1 spent on all purchases' }
    ],
    description: 'No annual fee travel rewards card with flexible redemption',
    allRewards: [
      { id: 'general', name: 'General', multiplier: 1.5, description: '1.5x points per $1 spent on all purchases' }
    ],
    signupBonus: {
      points: 25000,
      spendRequirement: 1000,
      timeLimit: '90 days',
      description: '25,000 online bonus points after spending $1,000 in first 90 days'
    },
    credits: [
      { name: 'Welcome Bonus', amount: 25000, frequency: 'one-time', description: '25,000 online bonus points after spending $1,000 in first 90 days' }
    ]
  },
  {
    id: 'boa-premium-rewards',
    name: 'Bank of America Premium Rewards',
    issuer: 'Bank of America',
    annualFee: 95,
    closingDate: 10,
    imageUrl: '/images/cards/boa-premium-rewards.png',
    rewards: [
      { id: 'travel', name: 'Travel & Dining', multiplier: 2, description: '2x points on travel and dining purchases' },
      { id: 'general', name: 'General', multiplier: 1.5, description: '1.5x points on all other purchases' }
    ],
    description: 'Premium travel and dining rewards card',
    allRewards: [
      { id: 'travel', name: 'Travel & Dining', multiplier: 2, description: '2x points on travel and dining purchases' },
      { id: 'general', name: 'General', multiplier: 1.5, description: '1.5x points on all other purchases' }
    ],
    signupBonus: {
      points: 60000,
      spendRequirement: 4000,
      timeLimit: '90 days',
      description: '60,000 bonus points after spending $4,000 in first 90 days'
    },
    credits: [
      { name: 'Airline Incidental Credit', amount: 100, frequency: 'annual', description: 'Up to $100 in airline incidental statement credits annually' },
      { name: 'Global Entry/TSA PreCheck Credit', amount: 100, frequency: '4 years', description: 'Up to $100 statement credit for Global Entry or TSA PreCheck application fees every four years' }
    ]
  },
  {
    id: 'boa-premium-rewards-elite',
    name: 'Bank of America Premium Rewards Elite',
    issuer: 'Bank of America',
    annualFee: 550,
    closingDate: 20,
    imageUrl: '/images/cards/boa-premium-rewards-elite.png',
    rewards: [
      { id: 'travel', name: 'Travel & Dining', multiplier: 2, description: '2x points on travel and dining purchases' },
      { id: 'general', name: 'General', multiplier: 1.5, description: '1.5x points on all other purchases' }
    ],
    description: 'Premium travel rewards card with luxury benefits',
    allRewards: [
      { id: 'travel', name: 'Travel & Dining', multiplier: 2, description: '2x points on travel and dining purchases' },
      { id: 'general', name: 'General', multiplier: 1.5, description: '1.5x points on all other purchases' }
    ],
    signupBonus: {
      points: 75000,
      spendRequirement: 5000,
      timeLimit: '90 days',
      description: '75,000 bonus points after spending $5,000 in first 90 days'
    },
    credits: [
      { name: 'Airline Incidental Credit', amount: 300, frequency: 'annual', description: 'Up to $300 annually in airline incidental statement credits for qualifying purchases such as seat upgrades, baggage fees, airline lounge fees and in-flight services' },
      { name: 'Lifestyle Conveniences Credit', amount: 150, frequency: 'annual', description: 'Up to $150 annually for lifestyle conveniences including video streaming services, food delivery, fitness subscriptions and rideshare services' },
      { name: 'Global Entry/TSA PreCheck Credit', amount: 120, frequency: '4 years', description: 'Up to $120 in statement credits for either Global Entry or TSA PreCheck application fees, every four years' }
    ]
  },
  {
    id: 'boa-unlimited-cash-rewards',
    name: 'Bank of America Unlimited Cash Rewards',
    issuer: 'Bank of America',
    annualFee: 0,
    closingDate: 12,
    imageUrl: '/images/cards/boa-unlimited-cash-rewards.png',
    rewards: [
      { id: 'general', name: 'General', multiplier: 2, description: '2% cash back on all purchases for first year, then 1.5%' }
    ],
    description: 'Simple unlimited cash back card',
    allRewards: [
      { id: 'general', name: 'General', multiplier: 2, description: '2% cash back on all purchases for first year, then 1.5%' }
    ],
    signupBonus: {
      points: 200,
      spendRequirement: 1000,
      timeLimit: '90 days',
      description: '$200 cash back after spending $1,000 in first 90 days'
    },
    credits: [
      { name: 'Welcome Bonus', amount: 200, frequency: 'one-time', description: '$200 cash back after spending $1,000 in first 90 days' }
    ]
  },

  // Capital One Cards
  {
    id: 'capital-one-venture',
    name: 'Capital One Venture Rewards',
    issuer: 'Capital One',
    annualFee: 95,
    closingDate: 3,
    imageUrl: '/images/cards/capitalone-venture.jpg',
    rewards: [
      { id: 'general', name: 'General', multiplier: 2, description: '2x miles on all purchases' },
      { id: 'travel', name: 'Travel', multiplier: 5, description: '5x miles on hotels, vacation rentals, and rental cars booked through Capital One Travel' }
    ],
    description: 'Earn unlimited 2X miles and 75,000 bonus miles',
    allRewards: [
      { id: 'general', name: 'General', multiplier: 2, description: '2x miles on all purchases' },
      { id: 'travel', name: 'Travel', multiplier: 5, description: '5x miles on hotels, vacation rentals, and rental cars booked through Capital One Travel' }
    ],
    signupBonus: {
      points: 75000,
      spendRequirement: 4000,
      timeLimit: '3 months',
      description: '75,000 bonus miles after spending $4,000 in first 3 months'
    },
    credits: [
      { name: 'Global Entry/TSA PreCheck Credit', amount: 120, frequency: '4 years', description: 'Up to $120 statement credit for Global Entry or TSA PreCheck application fees' },
      { name: 'Lifestyle Collection Experience Credit', amount: 50, frequency: 'per stay', description: '$50 experience credit on every Lifestyle Collection stay' },
      { name: 'Capital One Café Discount', amount: 50, frequency: 'ongoing', description: '50% off handcrafted beverages at any Capital One Café nationwide' }
    ],
    travelBenefits: [
      { type: 'rental', name: 'Hertz Five Star', description: 'Skip the rental counter and choose from a wider selection of cars', status: 'Five Star' }
    ]
  },
  {
    id: 'capital-one-venture-x',
    name: 'Capital One Venture X',
    issuer: 'Capital One',
    annualFee: 395,
    closingDate: 16,
    imageUrl: '/images/cards/capitalone-venture-x.jpg',
    rewards: [
      { id: 'general', name: 'General', multiplier: 2, description: '2x miles on all purchases' },
      { id: 'travel', name: 'Travel', multiplier: 5, description: '5x miles on flights and vacation rentals booked through Capital One Travel' }
    ],
    description: 'Elevated travel rewards designed to take you further',
    allRewards: [
      { id: 'general', name: 'General', multiplier: 2, description: '2x miles on all purchases' },
      { id: 'travel', name: 'Travel', multiplier: 5, description: '5x miles on flights and vacation rentals booked through Capital One Travel' }
    ],
    signupBonus: {
      points: 75000,
      spendRequirement: 4000,
      timeLimit: '3 months',
      description: '75,000 bonus miles after spending $4,000 in first 3 months'
    },
    credits: [
      { name: 'Travel Credit', amount: 300, frequency: 'annual', description: '$300 annual travel credit when booking through Capital One Travel' },
      { name: 'Global Entry/TSA PreCheck Credit', amount: 120, frequency: '4 years', description: 'Up to $120 statement credit for Global Entry or TSA PreCheck application fees' },
      { name: 'PRIOR Subscription', amount: 149, frequency: 'annual', description: 'Complimentary PRIOR Subscription for extraordinary travel experiences and destination guides' },
      { name: 'The Cultivist Membership', amount: 50, frequency: 'annual', description: '50% off The Cultivist Enthusiast membership for access to 60+ world-class museums' },
      { name: 'Capital One Café Discount', amount: 50, frequency: 'ongoing', description: '50% off handcrafted beverages at any Capital One Café nationwide' }
    ],
    travelBenefits: [
      { type: 'lounge', name: 'Capital One Lounges', description: 'Access to Capital One Lounge and Landing locations' },
      { type: 'lounge', name: 'Priority Pass™', description: 'Access to 1,300+ lounges worldwide' },
      { type: 'rental', name: 'Hertz President\'s Circle', description: 'Skip the rental counter and choose from a wider selection of cars', status: 'President\'s Circle' }
    ]
  },
  {
    id: 'capital-one-ventureone',
    name: 'Capital One VentureOne Rewards',
    issuer: 'Capital One',
    annualFee: 0,
    closingDate: 5,
    imageUrl: '/images/cards/capitalone-ventureone.jpg',
    rewards: [
      { id: 'travel', name: 'Travel', multiplier: 5, description: '5x miles on hotels, vacation rentals, and rental cars booked through Capital One Travel' },
      { id: 'general', name: 'General', multiplier: 1.25, description: '1.25x miles on all other purchases' }
    ],
    description: 'No annual fee travel rewards card with travel benefits',
    allRewards: [
      { id: 'travel', name: 'Travel', multiplier: 5, description: '5x miles on hotels, vacation rentals, and rental cars booked through Capital One Travel' },
      { id: 'general', name: 'General', multiplier: 1.25, description: '1.25x miles on all other purchases' }
    ],
    signupBonus: {
      points: 20000,
      spendRequirement: 500,
      timeLimit: '3 months',
      description: '20,000 bonus miles after spending $500 in first 3 months'
    },
    credits: [
      { name: 'Capital One Travel Credit', amount: 100, frequency: 'first year', description: '$100 Capital One Travel credit for purchases made through Capital One Travel' },
      { name: 'Capital One Café Discount', amount: 50, frequency: 'ongoing', description: '50% off handcrafted beverages at any Capital One Café nationwide' }
    ],
    travelBenefits: [
      { type: 'rental', name: 'Hertz Five Star', description: 'Hertz Five Star status with priority service and upgrades', status: 'Five Star' }
    ]
  },
  {
    id: 'capital-one-savorone',
    name: 'Capital One SavorOne Cash Rewards',
    issuer: 'Capital One',
    annualFee: 39,
    closingDate: 14,
    imageUrl: '/images/cards/capitalone-savorone.jpg',
    rewards: [
      { id: 'groceries', name: 'Groceries', multiplier: 3, description: '3% cash back at grocery stores (excluding superstores like Walmart and Target)' },
      { id: 'dining', name: 'Dining', multiplier: 3, description: '3% cash back on dining' },
      { id: 'entertainment', name: 'Entertainment', multiplier: 3, description: '3% cash back on entertainment' },
      { id: 'streaming', name: 'Streaming', multiplier: 3, description: '3% cash back on popular streaming services' },
      { id: 'general', name: 'General', multiplier: 1, description: '1% cash back on all other purchases' }
    ],
    description: 'Cash back card for groceries, dining, entertainment, and streaming services',
    allRewards: [
      { id: 'groceries', name: 'Groceries', multiplier: 3, description: '3% cash back at grocery stores (excluding superstores like Walmart and Target)' },
      { id: 'dining', name: 'Dining', multiplier: 3, description: '3% cash back on dining' },
      { id: 'entertainment', name: 'Entertainment', multiplier: 3, description: '3% cash back on entertainment' },
      { id: 'streaming', name: 'Streaming', multiplier: 3, description: '3% cash back on popular streaming services' },
      { id: 'general', name: 'General', multiplier: 1, description: '1% cash back on all other purchases' }
    ],
    credits: [
      { name: 'Capital One Café Discount', amount: 50, frequency: 'ongoing', description: '50% off handcrafted beverages at any Capital One Café nationwide' }
    ]
  },
  {
    id: 'capital-one-savor-rewards',
    name: 'Capital One Savor Cash Rewards',
    issuer: 'Capital One',
    annualFee: 0,
    closingDate: 20,
    imageUrl: '/images/cards/capitalone-savor.jpg',
    rewards: [
      { id: 'travel', name: 'Travel', multiplier: 5, description: '5% cash back on hotels, vacation rentals, and rental cars booked through Capital One Travel' },
      { id: 'groceries', name: 'Groceries', multiplier: 3, description: '3% cash back at grocery stores (excluding superstores like Walmart and Target)' },
      { id: 'dining', name: 'Dining', multiplier: 3, description: '3% cash back on dining' },
      { id: 'entertainment', name: 'Entertainment', multiplier: 3, description: '3% cash back on entertainment' },
      { id: 'streaming', name: 'Streaming', multiplier: 3, description: '3% cash back on popular streaming services' },
      { id: 'general', name: 'General', multiplier: 1, description: '1% cash back on all other purchases' }
    ],
    description: 'No annual fee dining and entertainment rewards card with travel benefits',
    allRewards: [
      { id: 'travel', name: 'Travel', multiplier: 5, description: '5% cash back on hotels, vacation rentals, and rental cars booked through Capital One Travel' },
      { id: 'groceries', name: 'Groceries', multiplier: 3, description: '3% cash back at grocery stores (excluding superstores like Walmart and Target)' },
      { id: 'dining', name: 'Dining', multiplier: 3, description: '3% cash back on dining' },
      { id: 'entertainment', name: 'Entertainment', multiplier: 3, description: '3% cash back on entertainment' },
      { id: 'streaming', name: 'Streaming', multiplier: 3, description: '3% cash back on popular streaming services' },
      { id: 'general', name: 'General', multiplier: 1, description: '1% cash back on all other purchases' }
    ],
    signupBonus: {
      points: 200,
      spendRequirement: 500,
      timeLimit: '3 months',
      description: '$200 cash bonus after spending $500 in first 3 months'
    },
    credits: [
      { name: 'Capital One Travel Credit', amount: 100, frequency: 'first year', description: '$100 Capital One Travel credit for purchases made through Capital One Travel' },
      { name: 'Capital One Café Discount', amount: 50, frequency: 'ongoing', description: '50% off handcrafted beverages at any Capital One Café nationwide' }
    ],
    travelBenefits: [
      { type: 'rental', name: 'Hertz Five Star', description: 'Hertz Five Star status with priority service and upgrades', status: 'Five Star' }
    ]
  },
  {
    id: 'capital-one-quicksilver',
    name: 'Capital One Quicksilver Cash Rewards',
    issuer: 'Capital One',
    annualFee: 0,
    closingDate: 7,
    imageUrl: '/images/cards/capitalone-quicksilver.jpg',
    rewards: [
      { id: 'general', name: 'General', multiplier: 1.5, description: '1.5% cash back on all purchases' }
    ],
    description: 'Simple cash back card with no annual fee and no foreign transaction fees',
    allRewards: [
      { id: 'general', name: 'General', multiplier: 1.5, description: '1.5% cash back on all purchases' }
    ],
    signupBonus: {
      points: 200,
      spendRequirement: 500,
      timeLimit: '3 months',
      description: '$200 cash bonus after spending $500 in first 3 months'
    },
    credits: [
      { name: 'Capital One Travel Credit', amount: 100, frequency: 'first year', description: '$100 Capital One Travel credit for purchases made through Capital One Travel' },
      { name: 'Capital One Café Discount', amount: 50, frequency: 'ongoing', description: '50% off handcrafted beverages at any Capital One Café nationwide' }
    ],
    travelBenefits: [
      { type: 'rental', name: 'Hertz Five Star', description: 'Hertz Five Star status with priority service and upgrades', status: 'Five Star' }
    ]
  },
  {
    id: 'capital-one-quicksilverone',
    name: 'Capital One QuicksilverOne Cash Rewards',
    issuer: 'Capital One',
    annualFee: 39,
    closingDate: 15,
    imageUrl: '/images/cards/capitalone-quicksilverone.jpg',
    rewards: [
      { id: 'general', name: 'General', multiplier: 1.5, description: '1.5% cash back on all purchases' }
    ],
    description: 'Unlimited 1.5% cash back on every purchase, every day with access to valuable benefits',
    allRewards: [
      { id: 'general', name: 'General', multiplier: 1.5, description: '1.5% cash back on all purchases' }
    ],
    credits: [
      { name: 'Capital One Café Discount', amount: 50, frequency: 'ongoing', description: '50% off handcrafted beverages at any Capital One Café nationwide' }
    ]
  },
  {
    id: 'capital-one-platinum-mastercard',
    name: 'Capital One Platinum Mastercard',
    issuer: 'Capital One',
    annualFee: 0,
    closingDate: 10,
    imageUrl: '/images/cards/capitalone-platinum-mastercard.jpg',
    rewards: [
      { id: 'general', name: 'General', multiplier: 1, description: '1% cash back on all purchases' }
    ],
    description: 'No annual fee card for building credit with responsible use',
    allRewards: [
      { id: 'general', name: 'General', multiplier: 1, description: '1% cash back on all purchases' }
    ],
    credits: [
      { name: 'Capital One Café Discount', amount: 50, frequency: 'ongoing', description: '50% off handcrafted beverages at any Capital One Café nationwide' }
    ]
  },

  // Citi Cards
  {
    id: 'citi-double-cash',
    name: 'Citi Double Cash',
    issuer: 'Citi',
    annualFee: 0,
    closingDate: 20,
    imageUrl: '/images/cards/citi-double-cash.jpg',
    rewards: [
      { id: 'general', name: 'General', multiplier: 2, description: '1% cash back when you buy, plus 1% as you pay' },
      { id: 'travel', name: 'Travel', multiplier: 5, description: '5% total cash back on hotels, car rentals, and attractions booked through Citi Travel' }
    ],
    description: 'Earn 2% cash back on all purchases with no annual fee',
    allRewards: [
      { id: 'general', name: 'General', multiplier: 2, description: '1% cash back when you buy, plus 1% as you pay' },
      { id: 'travel', name: 'Travel', multiplier: 5, description: '5% total cash back on hotels, car rentals, and attractions booked through Citi Travel' }
    ],
    signupBonus: {
      points: 200,
      spendRequirement: 1500,
      timeLimit: '6 months',
      description: '$200 cash back after spending $1,500 in first 6 months'
    }
  },
  {
    id: 'citi-aadvantage-platinum-select',
    name: 'Citi AAdvantage Platinum Select',
    issuer: 'Citi',
    annualFee: 99,
    closingDate: 18,
    imageUrl: '/images/cards/citi-aadvantage-platinum-select.jpg',
    rewards: [
      { id: 'restaurants', name: 'Restaurants', multiplier: 2, description: '2x miles on restaurants' },
      { id: 'gas', name: 'Gas', multiplier: 2, description: '2x miles on gas stations' },
      { id: 'american-airlines', name: 'American Airlines', multiplier: 2, description: '2x miles on eligible American Airlines purchases' },
      { id: 'general', name: 'General', multiplier: 1, description: '1x miles on all other purchases' }
    ],
    description: 'American Airlines rewards card with travel benefits',
    allRewards: [
      { id: 'restaurants', name: 'Restaurants', multiplier: 2, description: '2x miles on restaurants' },
      { id: 'gas', name: 'Gas', multiplier: 2, description: '2x miles on gas stations' },
      { id: 'american-airlines', name: 'American Airlines', multiplier: 2, description: '2x miles on eligible American Airlines purchases' },
      { id: 'general', name: 'General', multiplier: 1, description: '1x miles on all other purchases' }
    ],
    signupBonus: {
      points: 50000,
      spendRequirement: 2500,
      timeLimit: '3 months',
      description: '50,000 bonus miles after spending $2,500 in first 3 months'
    },
    credits: [
      { name: 'First Checked Bag Free', amount: 35, frequency: 'per bag', description: 'First checked bag free on domestic American Airlines itineraries for you and up to 4 companions' },
      { name: 'Inflight Food & Beverage Savings', amount: 25, frequency: 'ongoing', description: '25% savings on American Airlines inflight food and beverage purchases' }
    ]
  },
  {
    id: 'citi-aadvantage-select',
    name: 'Citi AAdvantage Select',
    issuer: 'Citi',
    annualFee: 0,
    closingDate: 8,
    imageUrl: '/images/cards/citi-aadvantage-select.jpg',
    rewards: [
      { id: 'travel', name: 'Travel', multiplier: 2, description: '2x miles on American Airlines purchases' },
      { id: 'gas', name: 'Gas', multiplier: 2, description: '2x miles on gas stations' },
      { id: 'general', name: 'General', multiplier: 1, description: '1x miles on all other purchases' }
    ],
    description: 'No annual fee American Airlines rewards card'
  },
  {
    id: 'citi-custom-cash',
    name: 'Citi Custom Cash',
    issuer: 'Citi',
    annualFee: 0,
    closingDate: 22,
    imageUrl: '/images/cards/citi-custom-cash.jpg',
    rewards: [
      { id: 'top-category', name: 'Top Category', multiplier: 5, description: '5% cash back on top eligible spend category up to $500 each billing cycle' },
      { id: 'general', name: 'General', multiplier: 1, description: '1% cash back on all other purchases' },
      { id: 'travel', name: 'Travel', multiplier: 5, description: '5% total cash back on hotels, car rentals, and attractions booked through Citi Travel' }
    ],
    description: 'Earn 5% cash back on your top spending category with no annual fee',
    allRewards: [
      { id: 'top-category', name: 'Top Category', multiplier: 5, description: '5% cash back on top eligible spend category up to $500 each billing cycle' },
      { id: 'general', name: 'General', multiplier: 1, description: '1% cash back on all other purchases' },
      { id: 'travel', name: 'Travel', multiplier: 5, description: '5% total cash back on hotels, car rentals, and attractions booked through Citi Travel' }
    ],
    signupBonus: {
      points: 200,
      spendRequirement: 1500,
      timeLimit: '6 months',
      description: '$200 cash back after spending $1,500 in first 6 months'
    }
  },
  {
    id: 'citi-diamond-preferred',
    name: 'Citi Diamond Preferred',
    issuer: 'Citi',
    annualFee: 0,
    closingDate: 14,
    imageUrl: '/images/cards/citi-diamond-preferred.jpg',
    rewards: [],
    description: 'No annual fee card with low intro APR on purchases and balance transfers',
    allRewards: [],
    signupBonus: undefined,
    credits: [
      { name: 'Free Access to FICO Score', amount: 0, frequency: 'ongoing', description: 'Free access to your FICO Score updated monthly' },
      { name: 'Mastercard ID Theft Protection', amount: 0, frequency: 'ongoing', description: 'Mastercard ID Theft Protection available for no additional charge' }
    ]
  },
  {
    id: 'citi-simplicity',
    name: 'Citi Simplicity',
    issuer: 'Citi',
    annualFee: 0,
    closingDate: 6,
    imageUrl: '/images/cards/citi-simplicity.jpg',
    rewards: [],
    description: 'No annual fee card with no late fees and no penalty rates',
    allRewards: [],
    signupBonus: undefined,
    credits: [
      { name: 'No Late Fees', amount: 0, frequency: 'ongoing', description: 'No late fees - ever' },
      { name: 'No Penalty Rate', amount: 0, frequency: 'ongoing', description: 'No penalty rate - ever' },
      { name: 'No Annual Fee', amount: 0, frequency: 'ongoing', description: 'No annual fee - ever' }
    ]
  },
  {
    id: 'citi-strata-elite',
    name: 'Citi Strata Elite',
    issuer: 'Citi',
    annualFee: 595,
    closingDate: 28,
    imageUrl: '/images/cards/citi-strata-elite.jpg',
    rewards: [
      { id: 'hotels-car-rentals', name: 'Hotels/Car Rentals/Attractions', multiplier: 12, description: '12x points on hotels, car rentals, and attractions booked on cititravel.com' },
      { id: 'air-travel', name: 'Air Travel', multiplier: 6, description: '6x points on air travel booked on cititravel.com' },
      { id: 'dining-citi-nights', name: 'Dining Citi Nights', multiplier: 6, description: '6x points at restaurants on Citi Nights purchases, Friday and Saturday 6 PM - 6 AM ET' },
      { id: 'dining-general', name: 'Dining', multiplier: 3, description: '3x points at restaurants any other time' },
      { id: 'general', name: 'General', multiplier: 1.5, description: '1.5x points on all other purchases' }
    ],
    description: 'Premium travel rewards card with luxury benefits and comprehensive travel protection',
    allRewards: [
      { id: 'hotels-car-rentals', name: 'Hotels/Car Rentals/Attractions', multiplier: 12, description: '12x points on hotels, car rentals, and attractions booked on cititravel.com' },
      { id: 'air-travel', name:'Air Travel', multiplier: 6, description: '6x points on air travel booked on cititravel.com' },
      { id: 'dining-citi-nights', name: 'Dining Citi Nights', multiplier: 6, description: '6x points at restaurants on Citi Nights purchases, Friday and Saturday 6 PM - 6 AM ET' },
      { id: 'dining-general', name: 'Dining', multiplier: 3, description: '3x points at restaurants any other time' },
      { id: 'general', name: 'General', multiplier: 1.5, description: '1.5x points on all other purchases' }
    ],
    signupBonus: {
      points: 75000,
      spendRequirement: 4000,
      timeLimit: '3 months',
      description: '75,000 bonus ThankYou points after spending $4,000 in first 3 months'
    },
    credits: [
      { name: '$300 Annual Hotel Benefit', amount: 300, frequency: 'annual', description: 'Up to $300 off a hotel stay of 2 nights or more when booked through cititravel.com' },
      { name: '$200 Annual Splurge Credit', amount: 200, frequency: 'annual', description: 'Up to $200 statement credits on choice of up to 2 brands: 1stDibs, American Airlines, Best Buy, Future Personal Training, and Live Nation' },
      { name: '$200 Annual Blacklane Credit', amount: 200, frequency: 'annual', description: 'Up to $200 statement credits when booking with Blacklane premium chauffeur service ($100 Jan-June, $100 July-Dec)' },
      { name: 'Global Entry/TSA PreCheck Credit', amount: 120, frequency: 'every 4 years', description: 'Up to $120 statement credit every four years for Global Entry or TSA PreCheck application fees' }
    ],
    travelBenefits: [
      { type: 'lounge', name: 'Priority Pass Select', description: 'Complimentary access to 1,500+ airport lounges worldwide (Annual membership fee valued at $469)' },
      { type: 'lounge', name: 'American Airlines Admirals Club Passes', description: '4 Admirals Club Citi Strata Elite Passes annually for access to nearly 50 Admirals Club lounges (over $300 in value)' },
      { type: 'hotel', name: 'Hilton Honors Gold Status', description: 'Automatic Hilton Honors Gold status for room upgrades and benefits', status: 'Gold' },
      { type: 'rental', name: 'Avis Preferred Plus', description: 'Avis Preferred Plus status for faster rental service', status: 'Preferred Plus' }
    ]
  },
  {
    id: 'citi-strata-premier',
    name: 'Citi Strata Premier',
    issuer: 'Citi',
    annualFee: 95,
    closingDate: 16,
    imageUrl: '/images/cards/citi-strata-premier.jpg',
    rewards: [
      { id: 'hotels-car-rentals', name: 'Hotels/Car Rentals/Attractions', multiplier: 10, description: '10x points on hotels, car rentals, and attractions booked on cititravel.com' },
      { id: 'air-travel-hotels', name: 'Air Travel & Hotels', multiplier: 3, description: '3x points on air travel and other hotel purchases' },
      { id: 'dining', name: 'Dining', multiplier: 3, description: '3x points at restaurants' },
      { id: 'supermarkets', name: 'Supermarkets', multiplier: 3, description: '3x points at supermarkets' },
      { id: 'gas-stations', name: 'Gas & EV Charging', multiplier: 3, description: '3x points on gas & EV charging stations' },
      { id: 'general', name: 'General', multiplier: 1, description: '1 Point per $1 on all other purchases' }
    ],
    description: 'Travel rewards card with comprehensive earning categories and hotel benefits',
    allRewards: [
      { id: 'hotels-car-rentals', name: 'Hotels/Car Rentals/Attractions', multiplier: 10, description: '10x points on hotels, car rentals, and attractions booked on cititravel.com' },
      { id: 'air-travel-hotels', name: 'Air Travel & Hotels', multiplier: 3, description: '3x points on air travel and other hotel purchases' },
      { id: 'dining', name: 'Dining', multiplier: 3, description: '3x points on restaurants' },
      { id: 'supermarkets', name: 'Supermarkets', multiplier: 3, description: '3x points at supermarkets' },
      { id: 'gas-stations', name: 'Gas & EV Charging', multiplier: 3, description: '3x points on gas & EV charging stations' },
      { id: 'general', name: 'General', multiplier: 1, description: '1 Point per $1 on all other purchases' }
    ],
    signupBonus: {
      points: 75000,
      spendRequirement: 4000,
      timeLimit: '3 months',
      description: '75,000 bonus ThankYou points after spending $4,000 in first 3 months'
    },
    credits: [
      { name: '$100 Annual Hotel Benefit', amount: 100, frequency: 'annual', description: 'Once per year, get $100 off a single hotel stay of $500 or more booked through cititravel.com' }
    ]
  },
  {
    id: 'citi-strata',
    name: 'Citi Strata',
    issuer: 'Citi',
    annualFee: 0,
    closingDate: 10,
    imageUrl: '/images/cards/citi-strata.jpg',
    rewards: [
      { id: 'hotels-car-rentals-attractions', name: 'Hotels/Car Rentals/Attractions', multiplier: 5, description: '5x points on hotels, car rentals, and attractions booked on cititravel.com' },
      { id: 'supermarkets', name: 'Supermarkets', multiplier: 3, description: '3x points at supermarkets' },
      { id: 'transit-gas-stations', name: 'Transit & Gas', multiplier: 3, description: '3x points on select transit and at gas & EV charging stations' },
      { id: 'self-select-category', name: 'Self-Select Category', multiplier: 3, description: '3x points on an eligible Self-Select Category of your choice' },
      { id: 'dining', name: 'Dining', multiplier: 2, description: '2x points at restaurants' },
      { id: 'general', name: 'General', multiplier: 1, description: '1x points on all other purchases' }
    ],
    description: 'No annual fee travel rewards card with customizable earning categories',
    allRewards: [
      { id: 'hotels-car-rentals-attractions', name: 'Hotels/Car Rentals/Attractions', multiplier: 5, description: '5x points on hotels, car rentals, and attractions booked on cititravel.com' },
      { id: 'supermarkets', name: 'Supermarkets', multiplier: 3, description: '3x points at supermarkets' },
      { id: 'transit-gas-stations', name: 'Transit & Gas', multiplier: 3, description: '3x points on select transit and at gas & EV charging stations' },
      { id: 'self-select-category', name: 'Self-Select Category', multiplier: 3, description: '3x points on eligible Self-Select Categories: Fitness Clubs, Select Streaming Services, Live Entertainment, Cosmetic Stores/Barber Shops/Hair Salons, and Pet Supply Stores' },
      { id: 'dining', name: 'Dining', multiplier: 2, description: '2x points at restaurants' },
      { id: 'general', name: 'General', multiplier: 1, description: '1x points on all other purchases' }
    ],
    signupBonus: {
      points: 20000,
      spendRequirement: 1500,
      timeLimit: '3 months',
      description: '20,000 bonus ThankYou points after spending $1,500 in first 3 months'
    }
  },

  // Discover Cards
  {
    id: 'discover-it-cash-back',
    name: 'Discover it Cash Back',
    issuer: 'Discover',
    annualFee: 0,
    closingDate: 15,
    imageUrl: '/images/cards/discover-it-cash-back.jpg',
    rewards: [
      { id: 'rotating', name: '5% Category', multiplier: 5, description: '5% cash back on rotating quarterly categories like grocery stores, restaurants, gas stations' },
      { id: 'general', name: 'General', multiplier: 1, description: '1x cash back on all other purchases' }
    ],
    description: 'No annual fee card with 5% rotating quarterly categories and Cashback Match',
    allRewards: [
      { id: 'rotating', name: '5% Category', multiplier: 5, description: '5% cash back on rotating quarterly categories like grocery stores, restaurants, gas stations' },
      { id: 'general', name: 'General', multiplier: 1, description: '1x cash back on all other purchases' }
    ],
    signupBonus: {
      points: 0,
      spendRequirement: 0,
      timeLimit: 'first year',
      description: 'Cashback Match: Discover will match all cash back you earn in your first year, automatically'
    }
  },
  {
    id: 'discover-it-miles',
    name: 'Discover it Miles',
    issuer: 'Discover',
    annualFee: 0,
    closingDate: 8,
    imageUrl: '/images/cards/discover-it-miles.jpg',
    rewards: [
      { id: 'general', name: 'General', multiplier: 1.5, description: '1.5x miles on every purchase' }
    ],
    description: 'No annual fee travel rewards card with 1.5x miles on all purchases',
    allRewards: [
      { id: 'general', name: '1.5x Miles', multiplier: 1.5, description: 'Earn unlimited 1.5x Miles on travel purchases and all your everyday purchases' }
    ],
    signupBonus: {
      points: 0,
      spendRequirement: 0,
      timeLimit: 'first year',
      description: '2x Miles your first year with Discover Match: We\'ll automatically match all the Miles you\'ve earned at the end of your first year'
    }
  },
  {
    id: 'discover-it-chrome',
    name: 'Discover it Chrome',
    issuer: 'Discover',
    annualFee: 0,
    closingDate: 22,
    imageUrl: '/images/cards/discover-it-chrome.jpg',
    rewards: [
      { id: 'gas', name: 'Gas Stations', multiplier: 2, description: '2% cash back at gas stations and restaurants on up to $1,000 combined quarterly' },
      { id: 'general', name: 'General', multiplier: 1, description: 'Unlimited 1% cash back on all other purchases' }
    ],
    description: 'No annual fee gas and restaurant cash back card with automatic 2% rewards on up to $1,000 quarterly',
    allRewards: [
      { id: 'gas', name: '2% Gas & Dining', multiplier: 2, description: 'Earn 2% Cashback Bonus at Gas Stations and Restaurants on up to $1,000 in combined purchases each quarter, automatically' },
      { id: 'general', name: '1% General', multiplier: 1, description: 'Plus, earn unlimited 1% cash back on all other purchases' }
    ],
    signupBonus: {
      points: 0,
      spendRequirement: 0,
      timeLimit: 'first year',
      description: 'Unlimited Cashback Match: Get an unlimited dollar-for-dollar match of all the cash back you earn at the end of your first year, automatically'
    }
  },
  {
    id: 'discover-it-secured',
    name: 'Discover it Secured',
    issuer: 'Discover',
    annualFee: 0,
    closingDate: 12,
    imageUrl: '/images/cards/discover-it-secured.jpg',
    rewards: [
      { id: 'gas', name: 'Gas Stations', multiplier: 2, description: '2% cash back at gas stations and restaurants on up to $1,000 combined quarterly' },
      { id: 'general', name: 'General', multiplier: 1, description: 'Unlimited 1% cash back on all other purchases' }
    ],
    description: 'Secured card for building or rebuilding credit with refundable security deposit',
    allRewards: [
      { id: 'gas', name: '2% Gas & Dining', multiplier: 2, description: 'Earn 2% Cashback Bonus at Gas Stations and Restaurants on up to $1,000 in combined purchases each quarter, automatically' },
      { id: 'general', name: '1% General', multiplier: 1, description: 'Plus, earn unlimited 1% cash back on all other purchases' }
    ],
    signupBonus: {
      points: 0,
      spendRequirement: 0,
      timeLimit: 'first year',
      description: '2x Cashback Match: Get an unlimited dollar-for-dollar match of all the cash back you earn at the end of your first year, automatically'
    }
  },
  {
    id: 'discover-it-student-cash-back',
    name: 'Discover it Student Cash Back',
    issuer: 'Discover',
    annualFee: 0,
    closingDate: 18,
    imageUrl: '/images/cards/discover-it-student-cash-back.jpg',
    rewards: [
      { id: 'rotating', name: '5% Category', multiplier: 5, description: '5% cash back on rotating quarterly categories like grocery stores, restaurants, gas stations' },
      { id: 'general', name: 'General', multiplier: 1, description: '1% cash back on all other purchases' }
    ],
    description: 'Student card designed to build credit history while earning rewards - no credit score required to apply',
    allRewards: [
      { id: 'rotating', name: '5% Category', multiplier: 5, description: 'Earn 5% cash back on everyday purchases at different places you shop each quarter like grocery stores, restaurants, gas stations, and more, up to the quarterly maximum when you activate' },
      { id: 'general', name: '1% General', multiplier: 1, description: 'Plus, earn 1% cash back on all other purchases' }
    ],
    signupBonus: {
      points: 0,
      spendRequirement: 0,
      timeLimit: 'first year',
      description: 'Unlimited Cashback Match: Get an unlimited dollar-for-dollar match of all the cash back you earn at the end of your first year, automatically'
    }
  },

  // Wells Fargo Cards
  {
    id: 'wells-fargo-active-cash',
    name: 'Wells Fargo Active Cash',
    issuer: 'Wells Fargo',
    annualFee: 0,
    closingDate: 5,
    imageUrl: '/images/cards/wellsfargo-active-cash.jpg',
    rewards: [
      { id: 'general', name: 'General', multiplier: 2, description: 'Unlimited 2% cash rewards on purchases with no categories to track' }
    ],
    description: 'Simple cash back card earning unlimited 2% cash rewards on all purchases with no annual fee',
    allRewards: [
      { id: 'general', name: '2% General', multiplier: 2, description: 'Unlimited 2% cash rewards on purchases with no categories to track or quarterly activations' }
    ],
    signupBonus: {
      points: 200,
      spendRequirement: 500,
      timeLimit: '3 months',
      description: '$200 cash rewards bonus after spending $500 in purchases'
    }
  },
  {
    id: 'wells-fargo-autograph',
    name: 'Wells Fargo Autograph',
    issuer: 'Wells Fargo',
    annualFee: 0,
    closingDate: 18,
    imageUrl: '/images/cards/wellsfargo-autograph.jpg',
    rewards: [
      { id: 'categories', name: '3X Categories', multiplier: 3, description: '3X points on restaurants, travel, gas stations, transit, streaming, phone plans' },
      { id: 'general', name: 'General', multiplier: 1, description: ' 1X points on other purchases' }
    ],
    description: 'No annual fee Visa Signature card earning 3X points on multiple everyday categories',
    allRewards: [
      { id: 'restaurants', name: '3X Restaurants', multiplier: 3, description: 'Dining in, take-out, catering, delivery and more' },
      { id: 'travel', name: '3X Travel', multiplier: 3, description: 'Airfare, hotels, car rentals, cruises and more' },
      { id: 'gas', name: '3X Gas', multiplier: 3, description: 'Gas stations and electric vehicle charging stations' },
      { id: 'transit', name: '3X Transit', multiplier: 3, description: 'Subways, ride shares, parking, tolls and more' },
      { id: 'streaming', name: '3X Streaming', multiplier: 3, description: 'Popular streaming services' },
      { id: 'phone', name: '3X Phone Plans', multiplier: 3, description: 'Cell phone and landline providers' },
      { id: 'general', name: '1X General', multiplier: 1, description: 'Other purchases' }
    ],
    signupBonus: {
      points: 20000,
      spendRequirement: 1000,
      timeLimit: '3 months',
      description: '20,000 bonus points after spending $1,000 ($200 cash redemption value)'
    }
  },
  {
    id: 'wellsfargo-attune',
    name: 'Wells Fargo Attune',
    issuer: 'Wells Fargo',
    annualFee: 0,
    closingDate: 15,
    imageUrl: '/images/cards/wellsfargo-attune.jpg',
    rewards: [
      { id: 'categories', name: '4% Categories', multiplier: 4, description: '4% cash rewards on self-care, sports/entertainment, and impactful purchases' },
      { id: 'general', name: 'General', multiplier: 1, description: '1% cash rewards on other purchases' }
    ],
    description: 'No annual fee Mastercard World Elite card focused on self-care, entertainment, and planet-friendly purchases',
    allRewards: [
      { id: 'self-care', name: '4% Self-Care', multiplier: 4, description: 'Spas, gyms, fitness and wellness purchases' },
      { id: 'entertainment', name: '4% Sports & Entertainment', multiplier: 4, description: 'Live events, movies, recreation' },
      { id: 'impactful', name: '4% Impactful Purchases', multiplier: 4, description: 'Public transportation, EV charging, thrift stores' },
      { id: 'general', name: '1% General', multiplier: 1, description: 'Other purchases' }
    ],
    signupBonus: {
      points: 100,
      spendRequirement: 500,
      timeLimit: '3 months',
      description: '$100 cash rewards bonus after spending $500 plus Wells Fargo donates $50 to Capital Link'
    }
  },
  {
    id: 'wellsfargo-autograph-journey',
    name: 'Wells Fargo Autograph Journey',
    issuer: 'Wells Fargo',
    annualFee: 95,
    closingDate: 8,
    imageUrl: '/images/cards/wellsfargo-autograph-journey.jpg',
    rewards: [
      { id: 'travel', name: 'Travel Categories', multiplier: 5, description: '5X points with hotels, 4X points with airlines, 3X points on restaurants and other travel' },
      { id: 'general', name: 'General', multiplier: 1, description: '1X points on other purchases' }
    ],
    description: 'Premium travel rewards Visa Signature card with elevated hotel and airline earning rates',
    allRewards: [
      { id: 'hotels', name: '5X Hotels', multiplier: 5, description: '5X points with hotels' },
      { id: 'airlines', name: '4X Airlines', multiplier: 4, description: '4X points with airlines' },
      { id: 'dining-travel', name: '3X Dining & Travel', multiplier: 3, description: '3X points on restaurants and other travel' },
      { id: 'general', name: '1X General', multiplier: 1, description: 'Other purchases' }
    ],
    signupBonus: {
      points: 60000,
      spendRequirement: 4000,
      timeLimit: '3 months',
      description: '60,000 bonus points after spending $4,000 in first 3 months'
    },
    credits: [
      { name: 'Airline Statement Credit', amount: 50, frequency: 'Annual', description: '$50 annual statement credit with $50 minimum airline purchase' }
    ]
  },
  {
    id: 'wellsfargo-bilt-mastercard',
    name: 'Wells Fargo Bilt Mastercard',
    issuer: 'Wells Fargo',
    annualFee: 0,
    closingDate: 20,
    imageUrl: '/images/cards/wellsfargo-bilt-mastercard.jpg',
    rewards: [
      { id: 'rent', name: 'Rent', multiplier: 1, description: '1X points on rent payments without transaction fees (up to 100,000 points/year)' },
      { id: 'travel', name: 'Travel', multiplier: 2, description: '2X points on travel' },
      { id: 'dining', name: 'Dining', multiplier: 3, description: '3X points on dining' },
      { id: 'general', name: 'General', multiplier: 1, description: '1X points on other purchases' }
    ],
    description: 'No annual fee card that lets you earn points on rent without transaction fees - requires 5 transactions per statement period',
    allRewards: [
      { id: 'rent', name: '1X Rent', multiplier: 1, description: '1X points on rent payments without transaction fees (up to 100,000 points per calendar year)' },
      { id: 'travel', name: '2X Travel', multiplier: 2, description: '2X points on travel booked directly with airlines, hotels, cruise lines, and car rental agencies' },
      { id: 'dining', name: '3X Dining', multiplier: 3, description: '3X points on dining at restaurants, lounges, or ordering in' },
      { id: 'general', name: '1X General', multiplier: 1, description: '1X points on other purchases' },
      { id: 'double-points', name: 'Monthly Double Points', multiplier: 2, description: 'Double points on 1st of each month: 6X dining, 4X travel, 2X general (up to 1,000 bonus points)' }
    ],
    credits: [
      { name: 'Lyft Credits', amount: 5, frequency: 'Monthly', description: '$5 Lyft credit after 3 eligible rides per month' }
    ]
  },
  {
    id: 'choice-privileges-mastercard',
    name: 'Choice Privileges Mastercard',
    issuer: 'Wells Fargo',
    annualFee: 0,
    closingDate: 15,
    imageUrl: '/images/cards/wells fargo choice privileges mastercard.png',
    rewards: [
      { id: 'hotels', name: 'Choice Hotels', multiplier: 5, description: '5X points on stays at Choice Hotels properties' },
      { id: 'selected', name: 'Selected Categories', multiplier: 3, description: '3X points on gas stations, grocery stores, home improvement stores, phone plan services' },
      { id: 'general', name: 'General', multiplier: 1, description: '1X points on other purchases' }
    ],
    description: 'No annual fee card that earns 5X points at Choice Hotels properties with automatic Gold Elite membership',
    allRewards: [
      { id: 'hotels', name: '5X Choice Hotels', multiplier: 5, description: '5 points per $1 on stays at participating Choice Hotels properties plus Choice Privileges point purchases' },
      { id: 'gas', name: '3X Gas', multiplier: 3, description: '3 points per $1 at gas stations and electric vehicle charging stations' },
      { id: 'groceries', name: '3X Groceries', multiplier: 3, description: '3 points per $1 at grocery stores, supermarkets, delis and bakeries' },
      { id: 'phone', name: '3X Phone Plans', multiplier: 3, description: '3 points per $1 on landline and cell phone provider services' },
      { id: 'home-improvement', name: '3X Home Improvement', multiplier: 3, description: '3 points per $1 at home improvement stores, hardware stores, furniture and household appliance stores' },
      { id: 'general', name: '1X General', multiplier: 1, description: '1 point per $1 on other purchases' }
    ],
    signupBonus: {
      points: 40000,
      spendRequirement: 1000,
      timeLimit: '3 months',
      description: '40,000 bonus points after spending $1,000 (enough for up to 5 reward nights at Choice Hotels properties)'
    },
    credits: [
      { name: 'Automatic Gold Elite Status', amount: 0, frequency: 'Ongoing', description: 'Automatic Gold Elite membership with 10% bonus points on qualifying stays' }
    ]
  },
  {
    id: 'choice-privileges-select-mastercard',
    name: 'Choice Privileges Select Mastercard',
    issuer: 'Wells Fargo',
    annualFee: 95,
    closingDate: 10,
    imageUrl: '/images/cards/Wells fargo choice privileges select mastercard.png',
    rewards: [
      { id: 'hotels', name: 'Choice Hotels', multiplier: 10, description: '10X points on stays at Choice Hotels properties' },
      { id: 'selected', name: 'Selected Categories', multiplier: 5, description: '5X points on gas stations, grocery stores, home improvement stores, phone plan services' },
      { id: 'general', name: 'General', multiplier: 1, description: '1X points on other purchases' }
    ],
    description: '$95 annual fee premium card earning 10X points at Choice Hotels properties with automatic Platinum Elite membership',
    allRewards: [
      { id: 'hotels', name: '10X Choice Hotels', multiplier: 10, description: '10 points per $1 on stays at participating Choice Hotels properties plus Choice Privileges point purchases' },
      { id: 'gas', name: '5X Gas', multiplier: 5, description: '5 points per $1 at gas stations and electric vehicle charging stations' },
      { id: 'groceries', name: '5X Groceries', multiplier: 5, description: '5 points per $1 at grocery stores, supermarkets, delis and bakeries' },
      { id: 'phone', name: '5X Phone Plans', multiplier: 5, description: '5 points per $1 on landline and cell phone provider services' },
      { id: 'home-improvement', name: '5X Home Improvement', multiplier: 5, description: '5 points per $1 at home improvement stores, hardware stores, furniture and household appliance stores' },
      { id: 'general', name: '1X General', multiplier: 1, description: '1 point per $1 on other purchases' }
    ],
    signupBonus: {
      points: 60000,
      spendRequirement: 3000,
      timeLimit: '3 months',
      description: '60,000 bonus points after spending $3,000 plus earn 30,000 bonus points every account anniversary'
    },
    credits: [
      { name: 'Global Entry/TSA PreCheck', amount: 120, frequency: 'Every 4 years', description: 'Statement credit up to $120 for Global Entry or TSA PreCheck application fee' }
    ],
    travelBenefits: [
      { type: 'hotel', name: 'Choice Hotels Platinum Elite Status', status: 'Platinum Elite', description: 'Automatic Platinum Elite membership with 25% bonus points on qualifying stays' }
    ]
  },
  {
    id: 'wellsfargo-reflect',
    name: 'Wells Fargo Reflect',
    issuer: 'Wells Fargo',
    annualFee: 0,
    closingDate: 25,
    imageUrl: '/images/cards/wellsfargo-reflect.jpg',
    rewards: [
      { id: 'general', name: 'General', multiplier: 0, description: 'No rewards program' }
    ],
    description: 'No annual fee card with 0% intro APR for 21 months on purchases and balance transfers',
    allRewards: [
      { id: 'intro-apr', name: '0% Intro APR', multiplier: 0, description: '0% intro APR for 21 months on purchases and qualifying balance transfers' }
    ]
  }
];

export const CARD_ISSUERS = [
  'American Express',
  'Chase',
  'Bank of America',
  'Capital One',
  'Citi',
  'Discover',
  'Wells Fargo'
];

// Grace period in days between statement closing and payment due date for each issuer
export const GRACE_PERIODS: { [key: string]: number } = {
  'Chase': 23,
  'American Express': 25,
  'Bank of America': 25,
  'Capital One': 25,
  'Citi': 25,
  'Discover': 25,
  'Wells Fargo': 24
};