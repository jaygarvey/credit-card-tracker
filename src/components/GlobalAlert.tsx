import React, { useState, useEffect } from 'react';
import { AlertCircle, X } from 'lucide-react';
import { differenceInDays } from 'date-fns';
import { UserCard, PaymentReminder } from '../types';
import { GRACE_PERIODS } from '../data';
import './GlobalAlert.css';

interface GlobalAlertProps {
  userCards: UserCard[];
  currentDate: Date;
}

const GlobalAlert: React.FC<GlobalAlertProps> = ({ userCards, currentDate }) => {
  const [dismissedAlerts, setDismissedAlerts] = useState<{ [key: string]: boolean }>({});
  const [notificationSettings, setNotificationSettings] = useState({
    enabled: true,
    showOnAllPages: false
  });
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(false);

  useEffect(() => {
    // Load dismissed alerts
    const savedDismissedAlerts = localStorage.getItem('dismissedAlerts');
    if (savedDismissedAlerts) {
      setDismissedAlerts(JSON.parse(savedDismissedAlerts));
    }

    // Load notification settings
    const savedNotificationSettings = localStorage.getItem('notificationSettings');
    if (savedNotificationSettings) {
      setNotificationSettings(JSON.parse(savedNotificationSettings));
    }

    // Check if privacy notice should be shown (first time users)
    const hasSeenPrivacyNotice = localStorage.getItem('hasSeenPrivacyNotice');
    if (!hasSeenPrivacyNotice) {
      setShowPrivacyNotice(true);
    }
  }, []);

  // Generate urgent reminders
  const generateUrgentReminders = () => {
    const activeCards = userCards.filter(uc => uc.isActive);
    const urgentReminders: PaymentReminder[] = [];

    activeCards.forEach(userCard => {
      const card = userCard.card;
      const closingDate = card.closingDate;
      const gracePeriodDays = GRACE_PERIODS[card.issuer] || 25;
      
      // Look for unpaid statements (go back up to 3 months)
      for (let monthOffset = -3; monthOffset <= 1; monthOffset++) {
        const statementClosing = new Date(currentDate.getFullYear(), currentDate.getMonth() + monthOffset, closingDate);
        
        // Skip future statements that haven't closed yet
        if (monthOffset > 0 && currentDate.getDate() < closingDate) {
          continue;
        }
        
        // Calculate statement period
        const prevClosing = new Date(statementClosing.getFullYear(), statementClosing.getMonth() - 1, closingDate);
        const statementStart = new Date(prevClosing.getFullYear(), prevClosing.getMonth(), closingDate);
        statementStart.setDate(statementStart.getDate() + 1);
        const paymentDue = new Date(statementClosing.getFullYear(), statementClosing.getMonth(), closingDate);
        paymentDue.setDate(paymentDue.getDate() + gracePeriodDays);
        
        // Create period key and check payment status
        const periodKey = `${statementClosing.getFullYear()}_${statementClosing.getMonth()}_${statementClosing.getDate()}`;
        const savedStatuses = JSON.parse(localStorage.getItem('paymentStatuses') || '{}');
        const isPaid = savedStatuses[`${card.id}_${periodKey}`] || false;
        
        // Check if this is urgent (within 3 days by default)
        const daysUntilDue = differenceInDays(paymentDue, currentDate);
        if (!isPaid && daysUntilDue <= 3) {
          urgentReminders.push({
            cardId: card.id,
            cardName: card.name,
            statementStartDate: statementStart,
            closingDate: statementClosing,
            dueDate: paymentDue,
            isPaid: false
          });
          break; // Only show the most urgent for each card
        }
      }
    });

    return urgentReminders;
  };

  const dismissAlert = (alertKey: string) => {
    const newDismissedAlerts = { ...dismissedAlerts, [alertKey]: true };
    setDismissedAlerts(newDismissedAlerts);
    localStorage.setItem('dismissedAlerts', JSON.stringify(newDismissedAlerts));
  };

  const dismissPrivacyNotice = () => {
    setShowPrivacyNotice(false);
    localStorage.setItem('hasSeenPrivacyNotice', 'true');
  };

  // Don't show if notifications are disabled or not set to show on all pages
  if (!notificationSettings.enabled || !notificationSettings.showOnAllPages) {
    return null;
  }

  // Show privacy notice for first-time users
  if (showPrivacyNotice) {
    return (
      <div className="global-alert privacy-notice">
        <div className="alert-content">
          <AlertCircle size={24} />
          <div className="alert-text">
            <strong>🔒 Your Data is Private & Secure</strong>
            <span>
              All your data is stored locally in your browser. No information is sent to external servers. 
              Each user's data is completely separate and private.
            </span>
          </div>
        </div>
        <button 
          className="alert-dismiss"
          onClick={dismissPrivacyNotice}
          title="Got it"
        >
          <X size={20} />
        </button>
      </div>
    );
  }

  const urgentReminders = generateUrgentReminders();
  const alertKey = `global_urgent_${urgentReminders.length}`;
  
  if (urgentReminders.length === 0 || dismissedAlerts[alertKey]) {
    return null;
  }

  return (
    <div className="global-alert urgent">
      <div className="alert-content">
        <AlertCircle size={24} />
        <div className="alert-text">
          <strong>Urgent Payment Alert!</strong>
          <span>
            {urgentReminders.length === 1 
              ? `Payment due in ${differenceInDays(urgentReminders[0].dueDate, currentDate)} days for ${urgentReminders[0].cardName}`
              : `${urgentReminders.length} payments due within 3 days`
            }
          </span>
        </div>
      </div>
      <button 
        className="alert-dismiss"
        onClick={() => dismissAlert(alertKey)}
        title="Dismiss alert"
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default GlobalAlert;
