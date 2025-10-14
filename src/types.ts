export interface RewardCategory {
  id: string;
  name: string;
  multiplier: number;
  description?: string;
  type?: 'points' | 'cashback'; // Add reward type
}

export interface SignupBonus {
  points: number;
  spendRequirement: number;
  timeLimit: string;
  description: string;
}

export interface Credit {
  name: string;
  amount: number;
  frequency: string;
  description: string;
}

export interface TravelBenefit {
  type: 'lounge' | 'hotel' | 'rental';
  name: string;
  description: string;
  status?: string; // For hotel/rental status levels
}

export interface CreditCard {
  id: string;
  name: string;
  issuer: string;
  annualFee: number;
  rewards: RewardCategory[];
  closingDate: number; // Day of month (1-31)
  imageUrl?: string;
  description?: string;
  signupBonus?: SignupBonus;
  credits?: Credit[];
  allRewards?: RewardCategory[]; // Complete rewards for popup
  travelBenefits?: TravelBenefit[]; // Airport lounges, hotel status, rental car benefits
}

export interface UserCard {
  cardId: string;
  card: CreditCard;
  creditLimit?: number;
  isActive: boolean;
  addedDate: Date;
}

export interface SpendingCategory {
  id: string;
  name: string;
  description: string;
}

export interface CardRecommendation {
  card: CreditCard;
  multiplier: number;
  points: number;
  reason: string;
  rewardType?: 'points' | 'cashback'; // Add reward type to recommendations
  isTied?: boolean; // Flag for tied recommendations
}

export interface PaymentReminder {
  cardId: string;
  cardName: string;
  statementStartDate: Date;
  closingDate: Date;
  dueDate: Date;
  nextStatementStart?: Date;
  nextStatementEnd?: Date;
  nextDue?: Date;
  previousStatementStart?: Date;
  previousStatementEnd?: Date;
  previousDueDate?: Date;
  amount?: number;
  isPaid: boolean;
}

