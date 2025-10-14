# Credit Card Tracker

A comprehensive React application that helps users optimize their credit card rewards and track payment due dates. This app allows users to select their credit cards from various issuers and provides intelligent recommendations for maximizing rewards on different spending categories.

## Features

### 🏦 Card Management
- **Issuer Selection**: Browse credit cards by issuer (American Express, Chase, Bank of America, Capital One, etc.)
- **Card Collection**: Add cards to your personal collection with detailed reward information
- **Card Dashboard**: View all your cards with annual fees, closing dates, and reward structures

### 💰 Rewards Optimization
- **Smart Recommendations**: Get personalized card recommendations for different spending categories
- **Category-Based Optimization**: Select spending categories (gas, groceries, dining, travel, etc.) to find the best card
- **Points Calculator**: See exactly how many points you'll earn with each card for any spending amount
- **Ranked Results**: View all your cards ranked by potential rewards

### 📅 Payment Reminders
- **Due Date Tracking**: Automatic calculation of payment due dates based on closing dates
- **Status Management**: Mark payments as paid/unpaid with visual status indicators
- **Priority Alerts**: Color-coded reminders for overdue, urgent, and upcoming payments
- **Payment Tips**: Helpful tips for managing credit card payments

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Styling**: Custom CSS with modern design principles
- **Data Storage**: Local Storage for user data persistence

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project directory**:
   ```bash
   cd credit-card-tracker
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Usage Guide

### 1. Getting Started
- Start by browsing credit card issuers on the homepage
- Click on any issuer (e.g., "American Express") to view their available cards

### 2. Adding Cards
- Select cards you own or want to track
- Click "Add Selected Cards" to add them to your collection
- View your cards in the "My Cards" section

### 3. Optimizing Rewards
- Go to "Rewards Optimizer"
- Select a spending category (gas, groceries, dining, etc.)
- Enter the amount you plan to spend
- View recommendations ranked by potential rewards

### 4. Managing Payments
- Visit "Payment Reminders" to see upcoming due dates
- Mark payments as paid when completed
- Get alerts for overdue or urgent payments

## Card Database

The app includes a comprehensive database of popular credit cards with:

- **American Express**: Gold Card, Platinum Card, Blue Cash Preferred
- **Chase**: Sapphire Preferred, Freedom Flex, Freedom Unlimited
- **Bank of America**: Customized Cash Rewards, Travel Rewards
- **Capital One**: Venture Rewards, SavorOne Cash Rewards

Each card includes:
- Annual fees
- Reward multipliers for different categories
- Closing dates
- Detailed descriptions

## Data Persistence

Your card collection and payment status are stored locally in your browser using Local Storage. This means:
- Your data persists between sessions
- No account registration required
- Data stays private on your device

## Customization

### Adding New Cards
To add new credit cards, edit the `src/data.ts` file and add new entries to the `CREDIT_CARDS` array:

```typescript
{
  id: 'new-card-id',
  name: 'New Credit Card',
  issuer: 'Card Issuer',
  annualFee: 95,
  closingDate: 15,
  rewards: [
    { id: 'dining', name: 'Dining', multiplier: 3, description: '3x points on dining' },
    { id: 'general', name: 'General', multiplier: 1, description: '1x points on all purchases' }
  ],
  description: 'Card description'
}
```

### Adding New Spending Categories
Add new spending categories in `src/data.ts`:

```typescript
{ id: 'new-category', name: 'New Category', description: 'Category description' }
```

## Browser Support

This application works on all modern browsers including:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

Feel free to contribute to this project by:
- Adding new credit cards to the database
- Improving the UI/UX
- Adding new features
- Fixing bugs
- Improving documentation

## License

This project is open source and available under the MIT License.

## Support

If you encounter any issues or have questions, please check the browser console for error messages and ensure all dependencies are properly installed.

