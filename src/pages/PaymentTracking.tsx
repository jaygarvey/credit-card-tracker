import React, { useState, useEffect } from 'react';
import { Bell, Calendar, CheckCircle, AlertCircle, Clock, ChevronLeft, ChevronRight, X, Download } from 'lucide-react';
import { UserCard, PaymentReminder } from '../types';
import { format, addDays, isAfter, isBefore, differenceInDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { GRACE_PERIODS } from '../data';
import './PaymentTracking.css';

const PaymentTracking: React.FC = () => {
  const [userCards, setUserCards] = useState<UserCard[]>([]);
  const [reminders, setReminders] = useState<PaymentReminder[]>([]);
  const [paymentHistory, setPaymentHistory] = useState<{ [cardId: string]: PaymentReminder[] }>({});
  const [expandedCardHistories, setExpandedCardHistories] = useState<{ [cardId: string]: boolean }>({});
  const [currentDate] = useState(new Date());
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedCardIds, setSelectedCardIds] = useState<string[]>([]);
  const [dismissedAlerts, setDismissedAlerts] = useState<{ [key: string]: boolean }>({});
  const [urgencySettings, setUrgencySettings] = useState({
    urgentDays: 7,
    criticalDays: 3,
    overdueDays: 0
  });
  const [exportDuration, setExportDuration] = useState(12); // months

  useEffect(() => {
    const savedCards = localStorage.getItem('userCards');
    if (savedCards) {
      setUserCards(JSON.parse(savedCards));
    }
    
    // Load dismissed alerts
    const savedDismissedAlerts = localStorage.getItem('dismissedAlerts');
    if (savedDismissedAlerts) {
      setDismissedAlerts(JSON.parse(savedDismissedAlerts));
    }

    // Load urgency settings
    const savedUrgencySettings = localStorage.getItem('urgencySettings');
    if (savedUrgencySettings) {
      setUrgencySettings(JSON.parse(savedUrgencySettings));
    }
  }, []);

  useEffect(() => {
    if (userCards.length > 0) {
      generateReminders();
      setPaymentHistory(generatePaymentHistory());
      // Set all active cards as default selection
      if (selectedCardIds.length === 0) {
        const activeCards = userCards.filter(uc => uc.isActive);
        setSelectedCardIds(activeCards.map(uc => uc.cardId));
      }
    }
  }, [userCards, currentDate]);

  // Load saved payment statuses from localStorage
  const getPaymentStatus = (cardId: string, periodKey: string) => {
    const savedStatuses = JSON.parse(localStorage.getItem('paymentStatuses') || '{}');
    return savedStatuses[`${cardId}_${periodKey}`] || false;
  };

  // Generate card-grouped payment history
  const generatePaymentHistory = () => {
    const activeCards = userCards.filter(uc => uc.isActive);
    const cardHistories: { [cardId: string]: PaymentReminder[] } = {};

    activeCards.forEach(userCard => {
      const card = userCard.card;
      const closingDate = card.closingDate;
      const gracePeriodDays = GRACE_PERIODS[card.issuer] || 25;
      
      // Go back 3 months from when card was added (or current date if added recently)
      const cardAddedDate = new Date(userCard.addedDate);
      const monthsToShow = Math.max(3, differenceInDays(currentDate, cardAddedDate) / 30); // At least 3 months
      
      const history: PaymentReminder[] = [];
      
      // Generate statements from (card added date - 3 months) to current
      const startDate = new Date(cardAddedDate.getFullYear(), cardAddedDate.getMonth() - 3, closingDate);
      
      for (let monthOffset = -3; monthOffset <= 1; monthOffset++) {
        const statementClosing = new Date(currentDate.getFullYear(), currentDate.getMonth() + monthOffset, closingDate);
        
        // Skip future statements that haven't closed yet
        if (monthOffset > 0 && currentDate.getDate() < closingDate) {
          continue;
        }
        
        // Skip statements that occurred before the card was added
        if (statementClosing < startDate) {
          continue;
        }
        
        // Calculate statement period
        const prevClosing = new Date(statementClosing.getFullYear(), statementClosing.getMonth() - 1, closingDate);
        const statementStart = new Date(prevClosing.getFullYear(), prevClosing.getMonth(), closingDate);
        statementStart.setDate(statementStart.getDate() + 1);
        const paymentDue = addDays(statementClosing, gracePeriodDays);
        
        // Create period key and check payment status
        const periodKey = `${statementClosing.getFullYear()}_${statementClosing.getMonth()}_${statementClosing.getDate()}`;
        const isPaid = getPaymentStatus(card.id, periodKey);
        
        history.push({
          cardId: card.id,
          cardName: card.name,
          statementStartDate: statementStart,
          closingDate: statementClosing,
          dueDate: paymentDue,
          isPaid: isPaid,
          nextStatementStart: new Date(statementClosing.getFullYear(), statementClosing.getMonth() + 1, closingDate),
          nextStatementEnd: new Date(statementClosing.getFullYear(), statementClosing.getMonth() + 1, closingDate),
          nextDue: addDays(new Date(statementClosing.getFullYear(), statementClosing.getMonth() + 1, closingDate), gracePeriodDays),
          previousStatementStart: prevClosing,
          previousStatementEnd: prevClosing,
          previousDueDate: addDays(prevClosing, gracePeriodDays)
        });
      }
      
      // Sort by due date (most recent first) and group by card
      cardHistories[card.id] = history.sort((a, b) => b.dueDate.getTime() - a.dueDate.getTime());
    });

    return cardHistories;
  };

  const generateReminders = () => {
    const activeCards = userCards.filter(uc => uc.isActive);
    const newReminders: PaymentReminder[] = [];

    activeCards.forEach(userCard => {
      const card = userCard.card;
      const closingDate = card.closingDate;
      
      // Get grace period for this issuer
      const gracePeriodDays = GRACE_PERIODS[card.issuer] || 25; // Default to 25 if issuer not found
      
      // Look for unpaid statements (go back up to 3 months)
      let urgentUnpaid: PaymentReminder | null = null;
      
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
        const paymentDue = addDays(statementClosing, gracePeriodDays);
        
        // Create period key and check payment status
        const periodKey = `${statementClosing.getFullYear()}_${statementClosing.getMonth()}_${statementClosing.getDate()}`;
        const isPaid = getPaymentStatus(card.id, periodKey);
        
        // If unpaid and more urgent than current pick, select this one
        const daysUntilDue = differenceInDays(paymentDue, currentDate);
        if (!isPaid && (urgentUnpaid === null || daysUntilDue < differenceInDays(urgentUnpaid.dueDate, currentDate))) {
          urgentUnpaid = {
            cardId: card.id,
            cardName: card.name,
            statementStartDate: statementStart,
            closingDate: statementClosing,
            dueDate: paymentDue,
            isPaid: false,
            nextStatementStart: new Date(statementClosing.getFullYear(), statementClosing.getMonth() + 1, closingDate),
            nextStatementEnd: new Date(statementClosing.getFullYear(), statementClosing.getMonth() + 1, closingDate),
            nextDue: addDays(new Date(statementClosing.getFullYear(), statementClosing.getMonth() + 1, closingDate), gracePeriodDays),
            previousStatementStart: prevClosing,
            previousStatementEnd: prevClosing,
            previousDueDate: addDays(prevClosing, gracePeriodDays)
          };
        }
      }
      
      // If we found an unpaid statement, use it. Otherwise skip this card (all statements are paid)
      if (urgentUnpaid) {
        newReminders.push(urgentUnpaid);
      }
    });

    // Sort by due date
    newReminders.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
    setReminders(newReminders);
  };

  const getReminderStatus = (reminder: PaymentReminder) => {
    const daysUntilDue = differenceInDays(reminder.dueDate, currentDate);
    
    if (reminder.isPaid) {
      return { status: 'paid', message: 'Payment completed', icon: CheckCircle, className: 'paid' };
    } else if (daysUntilDue < urgencySettings.overdueDays) {
      const daysOverdue = Math.abs(daysUntilDue);
      if (daysOverdue === 1) {
        return { status: 'overdue', message: '1 day overdue', icon: AlertCircle, className: 'overdue' };
      } else {
        return { status: 'overdue', message: `${daysOverdue} days overdue`, icon: AlertCircle, className: 'overdue' };
      }
    } else if (daysUntilDue === 0) {
      return { status: 'urgent', message: 'PAY TODAY!', icon: AlertCircle, className: 'urgent' };
    } else if (daysUntilDue === 1) {
      return { status: 'urgent', message: 'Due tomorrow - PAY NOW!', icon: AlertCircle, className: 'urgent' };
    } else if (daysUntilDue <= urgencySettings.criticalDays) {
      return { status: 'urgent', message: 'PAY THIS IMMEDIATELY', icon: AlertCircle, className: 'urgent' };
    } else if (daysUntilDue <= urgencySettings.urgentDays) {
      return { status: 'soon', message: 'Due this week', icon: Clock, className: 'soon' };
    } else {
      return { status: 'upcoming', message: 'Upcoming payment', icon: Calendar, className: 'upcoming' };
    }
  };

  const togglePaidStatus = (cardId: string, closingDate: Date) => {
    // Create the same period key used in generateReminders
    const periodKey = `${closingDate.getFullYear()}_${closingDate.getMonth()}_${closingDate.getDate()}`;
    
    // Update localStorage
    const savedStatuses = JSON.parse(localStorage.getItem('paymentStatuses') || '{}');
    savedStatuses[`${cardId}_${periodKey}`] = !savedStatuses[`${cardId}_${periodKey}`];
    localStorage.setItem('paymentStatuses', JSON.stringify(savedStatuses));
    
    setReminders(prev => 
      prev.map(reminder => 
        reminder.cardId === cardId && reminder.closingDate.getTime() === closingDate.getTime()
          ? { ...reminder, isPaid: !reminder.isPaid }
          : reminder
      )
    );
    
    // Refresh payment history
    setPaymentHistory(generatePaymentHistory());
    
    // Regenerate reminders (in case this was the last unpaid statement)
    generateReminders();
  };

  // Dismiss alert
  const dismissAlert = (alertKey: string) => {
    const newDismissedAlerts = { ...dismissedAlerts, [alertKey]: true };
    setDismissedAlerts(newDismissedAlerts);
    localStorage.setItem('dismissedAlerts', JSON.stringify(newDismissedAlerts));
  };

  // Export calendar
  const exportCalendar = () => {
    const activeCards = userCards.filter(uc => uc.isActive);
    let icsContent = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Credit Card Tracker//EN\n';
    
    activeCards.forEach(userCard => {
      const card = userCard.card;
      const closingDate = card.closingDate;
      const gracePeriodDays = GRACE_PERIODS[card.issuer] || 25;
      
      // Generate events for the selected duration
      for (let monthOffset = 0; monthOffset < exportDuration; monthOffset++) {
        const statementClosing = new Date(currentDate.getFullYear(), currentDate.getMonth() + monthOffset, closingDate);
        const paymentDue = addDays(statementClosing, gracePeriodDays);
        
        // Create event for payment due date
        const eventId = `${card.id}_${statementClosing.getFullYear()}_${statementClosing.getMonth()}_${statementClosing.getDate()}`;
        const startDate = format(paymentDue, 'yyyyMMdd');
        const endDate = format(addDays(paymentDue, 1), 'yyyyMMdd');
        
        icsContent += `BEGIN:VEVENT\n`;
        icsContent += `UID:${eventId}@creditcardtracker.com\n`;
        icsContent += `DTSTART:${startDate}\n`;
        icsContent += `DTEND:${endDate}\n`;
        icsContent += `SUMMARY:${card.name} Payment Due\n`;
        icsContent += `DESCRIPTION:Payment due for ${card.name} statement ending ${format(statementClosing, 'MMM dd, yyyy')}\n`;
        icsContent += `END:VEVENT\n`;
      }
    });
    
    icsContent += 'END:VCALENDAR';
    
    // Create and download file
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'credit-card-payments.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Mark multiple pre-addition statements as paid
  const markStatementsPrePaid = (cardId: string, upToClosingDate: Date) => {
    const savedStatuses = JSON.parse(localStorage.getItem('paymentStatuses') || '{}');
    
    // Find all statement periods up to (but not including) the specified date
    const userCard = userCards.find(uc => uc.cardId === cardId);
    if (!userCard) return;
    
    const card = userCard.card;
    const closingDate = card.closingDate;
    const cardAddedDate = new Date(userCard.addedDate);
    
    // Go back 3 months from when card was added
    const startDate = new Date(cardAddedDate.getFullYear(), cardAddedDate.getMonth() - 3, closingDate);
    
    for (let monthOffset = -3; monthOffset <= 1; monthOffset++) {
      const statementClosing = new Date(currentDate.getFullYear(), currentDate.getMonth() + monthOffset, closingDate);
      
      // Skip if this is the same statement or newer
      if (statementClosing >= upToClosingDate) {
        continue;
      }
      
      // Skip if before the 3-month window or after card was added
      if (statementClosing < startDate || statementClosing >= cardAddedDate) {
        continue;
      }
      
      const periodKey = `${statementClosing.getFullYear()}_${statementClosing.getMonth()}_${statementClosing.getDate()}`;
      savedStatuses[`${cardId}_${periodKey}`] = true;
    }
    
    localStorage.setItem('paymentStatuses', JSON.stringify(savedStatuses));
    
    // Refresh payment history and reminders
    setPaymentHistory(generatePaymentHistory());
    generateReminders();
  };

  // Toggle card history expansion
  const toggleCardHistory = (cardId: string) => {
    setExpandedCardHistories(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  // Calendar navigation
  const goToPreviousMonth = () => {
    setCalendarMonth(prev => subMonths(prev, 1));
  };

  const goToNextMonth = () => {
    setCalendarMonth(prev => addMonths(prev, 1));
  };

  // Get card color
  const getCardColor = (cardId: string) => {
    const colors = ['#ef4444', '#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#06b6d4', '#84cc16', '#f97316'];
    const cardIndex = userCards.findIndex(uc => uc.cardId === cardId);
    return colors[cardIndex % colors.length];
  };

  // Get statement periods for all selected cards and month
  const getAllStatementPeriods = (month: Date) => {
    const allPeriods: Array<{
      cardId: string;
      cardName: string;
      cardColor: string;
      statementStart: Date;
      statementEnd: Date;
      dueDate: Date;
      isPaid: boolean;
      periodKey: string;
    }> = [];
    
    selectedCardIds.forEach(cardId => {
      const userCard = userCards.find(uc => uc.cardId === cardId);
      if (!userCard) return;

      const card = userCard.card;
      const closingDate = card.closingDate;
      const gracePeriodDays = GRACE_PERIODS[card.issuer] || 25;
      
      // Generate periods for the month and surrounding months
      for (let monthOffset = -1; monthOffset <= 2; monthOffset++) {
        const statementClosing = new Date(month.getFullYear(), month.getMonth() + monthOffset, closingDate);
        const prevClosing = new Date(statementClosing.getFullYear(), statementClosing.getMonth() - 1, closingDate);
        const statementStart = new Date(prevClosing.getFullYear(), prevClosing.getMonth(), closingDate);
        statementStart.setDate(statementStart.getDate() + 1);
        const paymentDue = addDays(statementClosing, gracePeriodDays);
        
        // Create period key and check payment status
        const periodKey = `${statementClosing.getFullYear()}_${statementClosing.getMonth()}_${statementClosing.getDate()}`;
        const isPaid = getPaymentStatus(card.id, periodKey);
        
        allPeriods.push({
          cardId,
          cardName: card.name,
          cardColor: getCardColor(cardId),
          statementStart,
          statementEnd: statementClosing,
          dueDate: paymentDue,
          isPaid,
          periodKey
        });
      }
    });
    
    return allPeriods;
  };

  // Check if a date is within a statement period
  const isDateInStatementPeriod = (date: Date, period: any) => {
    return date >= period.statementStart && date <= period.statementEnd;
  };

  // Check if a date is a due date
  const isDateDueDate = (date: Date, period: any) => {
    return isSameDay(date, period.dueDate);
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const monthStart = startOfMonth(calendarMonth);
    const monthEnd = endOfMonth(calendarMonth);
    
    // Get the first day of the week for the month (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = monthStart.getDay();
    
    // Calculate the start of the calendar (go back to include previous month's days)
    const calendarStart = new Date(monthStart);
    calendarStart.setDate(calendarStart.getDate() - firstDayOfWeek);
    
    // Calculate the end of the calendar (go forward to include next month's days)
    const lastDayOfWeek = monthEnd.getDay();
    const daysToAdd = 6 - lastDayOfWeek; // Days needed to complete the last week
    const calendarEnd = new Date(monthEnd);
    calendarEnd.setDate(calendarEnd.getDate() + daysToAdd);
    
    // Generate all days for the calendar grid (including empty slots)
    return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  };

  const upcomingReminders = reminders.filter(r => !r.isPaid && differenceInDays(r.dueDate, currentDate) >= 0);
  const overdueReminders = reminders.filter(r => !r.isPaid && differenceInDays(r.dueDate, currentDate) < 0);
  const paidReminders = reminders.filter(r => r.isPaid);

  return (
    <div className="payment-tracking">
      <div className="container">
        <div className="header">
          <h1>Payment Tracking</h1>
          <p>Track your credit card payment due dates and billing cycles</p>
          <div className="header-note">
            <strong>Smart Focus:</strong> Only shows UNPAID statements that need attention. Paid statements move to History below.
          </div>
        </div>

        {userCards.length === 0 ? (
          <div className="empty-state">
            <Bell size={64} className="empty-icon" />
            <h2>No cards to track</h2>
            <p>Add some credit cards to your collection to start tracking payment due dates and billing cycles.</p>
          </div>
        ) : (
          <>
            {/* Dashboard Alerts */}
            {(() => {
              // Check if alerts should show on all pages
              const savedNotificationSettings = localStorage.getItem('notificationSettings');
              const notificationSettings = savedNotificationSettings ? JSON.parse(savedNotificationSettings) : { showOnAllPages: false };
              
              // Only show alert here if not set to show on all pages
              if (notificationSettings.showOnAllPages) {
                return null;
              }
              
              const urgentReminders = reminders.filter(r => !r.isPaid && differenceInDays(r.dueDate, currentDate) <= urgencySettings.criticalDays);
              const alertKey = `urgent_${urgentReminders.length}`;
              
              if (urgentReminders.length > 0 && !dismissedAlerts[alertKey]) {
                return (
                  <div className="dashboard-alert urgent">
                    <div className="alert-content">
                      <AlertCircle size={24} />
                      <div className="alert-text">
                        <strong>Urgent Payment Alert!</strong>
                        <span>
                          {urgentReminders.length === 1 
                            ? `Payment due in ${differenceInDays(urgentReminders[0].dueDate, currentDate)} days for ${urgentReminders[0].cardName}`
                            : `${urgentReminders.length} payments due within ${urgencySettings.criticalDays} days`
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
              }
              return null;
            })()}

            {/* Export Calendar Button */}
            <div className="export-section">
              <div className="export-controls">
                <select 
                  className="export-duration-select"
                  value={exportDuration}
                  onChange={(e) => setExportDuration(Number(e.target.value))}
                >
                  <option value={1}>1 Month</option>
                  <option value={3}>3 Months</option>
                  <option value={6}>6 Months</option>
                  <option value={9}>9 Months</option>
                  <option value={12}>12 Months</option>
                </select>
                <button 
                  className="export-calendar-btn"
                  onClick={exportCalendar}
                  title="Export payment due dates to calendar"
                >
                  <Download size={20} />
                  Export to Calendar
                </button>
              </div>
            </div>
            <div className="reminders-summary">
              <div className="summary-card urgent">
                <h3>Overdue</h3>
                <span className="summary-number">{overdueReminders.length}</span>
              </div>
              <div className="summary-card soon">
                <h3>Due Soon</h3>
                <span className="summary-number">{upcomingReminders.filter(r => differenceInDays(r.dueDate, currentDate) <= 7).length}</span>
              </div>
              <div className="summary-card paid">
                <h3>Paid</h3>
                <span className="summary-number">{paidReminders.length}</span>
              </div>
            </div>

            {/* Calendar View Toggle */}
            <div className="calendar-toggle">
              <button 
                className={`toggle-btn ${showCalendar ? 'active' : ''}`}
                onClick={() => setShowCalendar(!showCalendar)}
              >
                <Calendar size={16} />
                {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
              </button>
            </div>

            {/* Payment Calendar */}
            {showCalendar && (
              <div className="payment-calendar">
                <div className="calendar-header">
                  <button className="calendar-nav-btn" onClick={goToPreviousMonth}>
                    <ChevronLeft size={20} />
                  </button>
                  <h2>{format(calendarMonth, 'MMMM yyyy')}</h2>
                  <button className="calendar-nav-btn" onClick={goToNextMonth}>
                    <ChevronRight size={20} />
                  </button>
                </div>
                
                <div className="calendar-grid">
                  <div className="calendar-weekdays">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="weekday">{day}</div>
                    ))}
                  </div>
                  
                  <div className="calendar-days">
                    {generateCalendarDays().map((day, index) => {
                      const isCurrentMonth = isSameMonth(day, calendarMonth);
                      const isToday = isSameDay(day, currentDate);
                      const allStatementPeriods = getAllStatementPeriods(calendarMonth);
                      
                      // Find all relevant periods for this day
                      const statementPeriods = allStatementPeriods.filter(period => 
                        isDateInStatementPeriod(day, period)
                      );
                      const dueDates = allStatementPeriods.filter(period => 
                        isDateDueDate(day, period)
                      );
                      const statementEnds = allStatementPeriods.filter(period => 
                        isSameDay(day, period.statementEnd)
                      );
                      
                      // Calculate required height for this day
                      const totalItems = statementPeriods.length + dueDates.length + statementEnds.length;
                      const minHeight = Math.max(100, 20 + (totalItems * 30));
                      
                      return (
                        <div 
                          key={index} 
                          className={`calendar-day ${!isCurrentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''}`}
                          style={{ minHeight: `${minHeight}px` }}
                        >
                          <span className="day-number">{format(day, 'd')}</span>
                          
                          {/* Only show markers for current month */}
                          {isCurrentMonth && (
                            <>
                              {/* Statement period bars */}
                              {statementPeriods.map((period, idx) => (
                                <div 
                                  key={`${period.cardId}-${idx}`}
                                  className="statement-bar"
                                  style={{ 
                                    backgroundColor: period.cardColor,
                                    top: `${20 + idx * 20}px`
                                  }}
                                  title={`${period.cardName}: ${format(period.statementStart, 'MMM dd')} - ${format(period.statementEnd, 'MMM dd')}`}
                                >
                                  <span className="statement-text">{period.cardName}</span>
                                </div>
                              ))}
                          
                              {/* All important dates - fill remaining space */}
                              {(() => {
                                const statementBarCount = statementPeriods.length;
                                const startTop = 20 + (statementBarCount * 20) + 2;
                                
                                // Combine all important dates
                                const allImportantDates = [
                                  ...dueDates.map(period => ({ ...period, type: 'due' })),
                                  ...statementEnds.map(period => ({ ...period, type: 'close' }))
                                ];
                                
                                // Calculate height for each marker - fixed small height
                                const markerHeight = 28;
                                
                                return allImportantDates.map((period, idx) => {
                                  const topPosition = startTop + idx * (markerHeight + 2);
                                  
                                  if (period.type === 'due') {
                                    return (
                                      <div 
                                        key={`due-${period.cardId}-${idx}`}
                                        className="due-date-marker"
                                        style={{ 
                                          borderColor: period.cardColor,
                                          top: `${topPosition}px`,
                                          height: `${markerHeight}px`
                                        }}
                                        title={`${period.cardName} payment due${period.isPaid ? ' (Paid)' : ''}`}
                                      >
                                        <span className="due-text">{period.cardName} {format(period.statementStart, 'MMM')} Due</span>
                                      </div>
                                    );
                                  } else {
                                    return (
                                      <div 
                                        key={`end-${period.cardId}-${idx}`}
                                        className="statement-end-marker" 
                                        style={{ 
                                          backgroundColor: period.cardColor,
                                          top: `${topPosition}px`,
                                          height: `${markerHeight}px`
                                        }}
                                        title={`${period.cardName} statement closes`}
                                      >
                                        <span className="end-text">{period.cardName} {format(period.statementStart, 'MMM')} Closes</span>
                                      </div>
                                    );
                                  }
                                });
                              })()}
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="calendar-legend">
                  <div className="legend-item">
                    <div className="legend-bar" style={{ backgroundColor: '#6b7280' }}></div>
                    <span>Statement Period</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-due" style={{ borderColor: '#6b7280' }}></div>
                    <span>Payment Due</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-close" style={{ backgroundColor: '#6b7280' }}></div>
                    <span>Statement Closes</span>
                  </div>
                </div>
                
                {/* Inline Card Selection */}
                <div className="inline-card-selection">
                  <span className="selection-label">Cards:</span>
                  {userCards.filter(uc => uc.isActive).map(userCard => (
                    <label key={userCard.cardId} className="inline-card-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedCardIds.includes(userCard.cardId)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCardIds(prev => [...prev, userCard.cardId]);
                          } else {
                            setSelectedCardIds(prev => prev.filter(id => id !== userCard.cardId));
                          }
                        }}
                      />
                      <span 
                        className="inline-card-color"
                        style={{ backgroundColor: getCardColor(userCard.cardId) }}
                      ></span>
                      <span className="inline-card-name">{userCard.card.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {overdueReminders.length > 0 && (
              <div className="reminders-section">
                <h2>
                  <AlertCircle className="section-icon overdue" />
                  Overdue Payments
                </h2>
                <div className="reminders-list">
                  {overdueReminders.map((reminder) => {
                    const status = getReminderStatus(reminder);
                    const StatusIcon = status.icon;
                    
                    return (
                      <div key={reminder.cardId} className={`reminder-item ${status.className}`}>
                        <div className="reminder-content">
                          <h3>{reminder.cardName}</h3>
                          <div className="reminder-details">
                            <div className="current-statement-period">
                              <Calendar size={16} />
                              <strong>Statement to pay:</strong> {format(reminder.statementStartDate, 'MMM dd')} - {format(reminder.closingDate, 'MMM dd')}
                            </div>
                            <div className="due-date">
                              <Calendar size={16} />
                              <strong>PAYMENT DUE:</strong> {format(reminder.dueDate, 'MMM dd, yyyy')}
                            </div>
                            <div className="status">
                              <StatusIcon size={16} />
                              {status.message}
                            </div>
                          </div>
                        </div>
                        <button
                          className="mark-paid-btn"
                          onClick={() => togglePaidStatus(reminder.cardId, reminder.closingDate)}
                        >
                          Mark as Paid
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {upcomingReminders.length > 0 && (
              <div className="reminders-section">
                <h2>
                  <Clock className="section-icon upcoming" />
                  Upcoming Payments
                </h2>
                <div className="reminders-list">
                  {upcomingReminders.map((reminder) => {
                    const status = getReminderStatus(reminder);
                    const StatusIcon = status.icon;
                    
                    return (
                      <div key={reminder.cardId} className={`reminder-item ${status.className}`}>
                        <div className="reminder-content">
                          <h3>{reminder.cardName}</h3>
                          <div className="reminder-details">
                            <div className="current-statement-period">
                              <Calendar size={16} />
                              <strong>Statement to pay:</strong> {format(reminder.statementStartDate, 'MMM dd')} - {format(reminder.closingDate, 'MMM dd')}
                            </div>
                            <div className="due-date">
                              <Calendar size={16} />
                              <strong>PAYMENT DUE:</strong> {format(reminder.dueDate, 'MMM dd, yyyy')}
                            </div>
                            <div className="status">
                              <StatusIcon size={16} />
                              {status.message}
                            </div>
                          </div>
                        </div>
                        <button
                          className={reminder.closingDate > currentDate ? "mark-paid-btn disabled" : "mark-paid-btn"}
                          onClick={reminder.closingDate > currentDate ? undefined : () => togglePaidStatus(reminder.cardId, reminder.closingDate)}
                          title={reminder.closingDate > currentDate ? "Cannot mark statement as paid until it closes" : "Mark as paid"}
                          disabled={reminder.closingDate > currentDate}
                        >
                          {reminder.closingDate > currentDate ? "Statement Active" : "Mark as Paid"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {paidReminders.length > 0 && (
              <div className="reminders-section">
                <h2>
                  <CheckCircle className="section-icon paid" />
                  Recently Paid
                </h2>
                <div className="reminders-list">
                  {paidReminders.map((reminder) => {
                    const status = getReminderStatus(reminder);
                    const StatusIcon = status.icon;
                    
                    return (
                      <div key={reminder.cardId} className={`reminder-item ${status.className}`}>
                        <div className="reminder-content">
                          <h3>{reminder.cardName}</h3>
                          <div className="reminder-details">
                            <div className="current-statement-period">
                              <Calendar size={16} />
                              <strong>Statement to pay:</strong> {format(reminder.statementStartDate, 'MMM dd')} - {format(reminder.closingDate, 'MMM dd')}
                            </div>
                            <div className="due-date">
                              <Calendar size={16} />
                              <strong>PAYMENT DUE:</strong> {format(reminder.dueDate, 'MMM dd, yyyy')}
                            </div>
                            <div className="status">
                              <StatusIcon size={16} />
                              {status.message}
                            </div>
                          </div>
                        </div>
                        <button
                          className="mark-paid-btn"
                          onClick={() => togglePaidStatus(reminder.cardId, reminder.closingDate)}
                        >
                          Mark as Unpaid
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Payment History Section */}
            {Object.values(paymentHistory).length > 0 && (
              <div className="reminders-section">
                <h2>
                  <CheckCircle className="section-icon paid" />
                  Payment History by Card
                </h2>
                <div className="history-description">
                  <p>Payment history for each card, grouped separately. This includes the last 3 months from when each card was added.</p>
                </div>
                
                {Object.entries(paymentHistory).map(([cardId, cardHistory]) => {
                  if (cardHistory.length === 0) return null;
                  
                  const userCard = userCards.find(uc => uc.cardId === cardId);
                  const card = userCard?.card;
                  
                  return (
                    <div key={cardId} className="card-history-group">
                      <div className="card-history-header">
                        <h3>{card?.name}</h3>
                        <div className="card-added-info">
                          Added: {format(new Date(userCard?.addedDate || currentDate), 'MMM dd, yyyy')}
                        </div>
                      </div>
                      
                      <div className="history-list">
                        {/* Smart compression: Always show unpaid statements + recent paid ones (max 3 total) */}
                        {(() => {
                          const unpaidStatements = cardHistory.filter(h => !h.isPaid);
                          const paidStatements = cardHistory.filter(h => h.isPaid);
                          const recentPaid = paidStatements.slice(0, 3 - unpaidStatements.length);
                          const visibleHistory = [...unpaidStatements, ...recentPaid].sort((a, b) => b.dueDate.getTime() - a.dueDate.getTime());
                          return expandedCardHistories[cardId] ? cardHistory : visibleHistory;
                        })().map((historyItem, index) => {
                          // Check if this statement was from before the card was here
                          const cardAddedDate = new Date(userCard?.addedDate || currentDate);
                          const wasPreAddition = historyItem.closingDate < cardAddedDate;
                          
                          return (
                            <div key={`${historyItem.cardId}_${historyItem.closingDate.getTime()}`} className="history-item">
                              <div className="history-content">
                                <div className="history-period">
                                  {format(historyItem.statementStartDate, 'MMM dd')} - {format(historyItem.closingDate, 'MMM dd')}
                                </div>
                                <div className="history-due">
                                  {historyItem.isPaid ? (
                                    <>Paid by {format(historyItem.dueDate, 'MMM dd, yyyy')}</>
                                  ) : (
                                    <>Due {format(historyItem.dueDate, 'MMM dd, yyyy')}</>
                                  )}
                                  {wasPreAddition && historyItem.isPaid && (
                                    <span className="pre-addition-badge">Pre-Addition</span>
                                  )}
                                </div>
                              </div>
                              
                              <div className="history-status">
                                {historyItem.isPaid ? (
                                  <CheckCircle size={20} className="paid-icon" />
                                ) : historyItem.closingDate > currentDate ? (
                                  <Calendar size={20} className="future-icon" />
                                ) : (
                                  <AlertCircle size={20} className="unpaid-icon" />
                                )}
                                <span>
                                  {historyItem.isPaid ? 'Paid' : 
                                   historyItem.closingDate > currentDate ? 'Future' : 'Unpaid'}
                                </span>
                              </div>
                              
                              <div className="history-actions">
                                {historyItem.isPaid ? (
                                  <button 
                                    className="undo-paid-btn"
                                    onClick={() => togglePaidStatus(historyItem.cardId, historyItem.closingDate)}
                                    title="Mark as unpaid"
                                  >
                                    Undo
                                  </button>
                                ) : (
                                  <button 
                                    className={historyItem.closingDate > currentDate ? "mark-paid-btn disabled" : "mark-paid-btn"}
                                    onClick={historyItem.closingDate > currentDate ? undefined : () => togglePaidStatus(historyItem.cardId, historyItem.closingDate)}
                                    title={historyItem.closingDate > currentDate ? "Cannot mark future statement as paid" : "Mark as paid"}
                                    disabled={historyItem.closingDate > currentDate}
                                  >
                                    {historyItem.closingDate > currentDate ? "Future Statement" : "Mark Paid"}
                                  </button>
                                )}
                                
                                {/* Show "Mark All Previous" button for pre-addition unpaid statements (only if not future) */}
                                {!historyItem.isPaid && wasPreAddition && historyItem.closingDate <= currentDate && (
                                  <button 
                                    className="mark-all-previous-btn"
                                    onClick={() => markStatementsPrePaid(historyItem.cardId, historyItem.closingDate)}
                                    title="Mark all previous statements as paid"
                                  >
                                    Mark All Previous Paid
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      {/* Show More/Less History button */}
                      {(() => {
                        const unpaidStatements = cardHistory.filter(h => !h.isPaid);
                        const paidStatements = cardHistory.filter(h => h.isPaid);
                        const recentPaid = paidStatements.slice(0, 3 - unpaidStatements.length);
                        const visibleCount = unpaidStatements.length + recentPaid.length;
                        const totalHidden = Math.max(0, cardHistory.length - visibleCount);
                        
                        return totalHidden > 0 ? (
                          <div className="history-toggle-section">
                            <button 
                              className="toggle-history-btn"
                              onClick={() => toggleCardHistory(cardId)}
                            >
                              {expandedCardHistories[cardId] ? (
                                <>
                                  <span>Show Less History</span>
                                  <span className="expanded-cards-count">({totalHidden} hidden)</span>
                                </>
                              ) : (
                                <>
                                  <span>Show More History</span>
                                  <span className="expanded-cards-count">({totalHidden} more)</span>
                                </>
                              )}
                            </button>
                          </div>
                        ) : null;
                      })()}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Collapsible Billing Cycle Explanation */}
            <div className="billing-cycle-explanation">
              <details>
                <summary>
                  <h2>Understanding Your Billing Cycle</h2>
                </summary>
                <div className="cycle-flow">
                  <div className="cycle-step">
                    <div className="step-icon">📅</div>
                    <h3>Statement Closes</h3>
                    <p>Your billing cycle ends on this date each month. All purchases during this period are included.</p>
                  </div>
                  <div className="cycle-arrow">→</div>
                  <div className="cycle-step">
                    <div className="step-icon">⏰</div>
                    <h3>Grace Period</h3>
                    <p>You have a specific number of days (varies by issuer) after your statement closes to pay without interest.</p>
                  </div>
                  <div className="cycle-arrow">→</div>
                  <div className="cycle-step">
                    <div className="step-icon">💳</div>
                    <h3>Payment Due</h3>
                    <p>Your payment must be made by this date to avoid late fees and interest charges.</p>
                  </div>
                </div>
                <div className="grace-periods-reference">
                  <h4>Grace Periods by Issuer:</h4>
                  <div className="issuer-periods">
                    {Object.entries(GRACE_PERIODS).map(([issuer, days]) => (
                      <div key={issuer} className="period-item">
                        <span className="issuer-name">{issuer}:</span>
                        <span className="period-days">{days} days</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="cycle-note">
                  <strong>Smart Focus:</strong> This only shows UNPAID statements that need immediate attention. Once you mark a statement as paid, it moves to the History section below and won't clutter your current task list.
                  <br /><br />
                  <strong>Example - AmEx Gold (closing date 22nd):</strong> 
                  <br />• September statement closed Sep 22nd → payment due Oct 17th (focus here)
                  <br />• August statement paid → moves to History section
                  <br />• Only shows what needs attention NOW
                </div>
              </details>
            </div>

            <div className="tips-section">
              <h2>Payment Tips</h2>
              <div className="tips-grid">
                <div className="tip-item">
                  <h3>Set Up Autopay</h3>
                  <p>Consider setting up automatic payments for at least the minimum amount to avoid late fees.</p>
                </div>
                <div className="tip-item">
                  <h3>Pay in Full</h3>
                  <p>Pay your full balance each month to avoid interest charges and maximize your rewards.</p>
                </div>
                <div className="tip-item">
                  <h3>Payment Timing</h3>
                  <p>Pay a few days before the due date to ensure your payment is processed on time.</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentTracking;