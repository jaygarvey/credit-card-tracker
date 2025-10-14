import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Bell, Calendar, Save, RotateCcw } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import './Settings.css';

interface NotificationSettings {
  enabled: boolean;
  daysBefore: number;
  soundEnabled: boolean;
  showOnAllPages: boolean;
}

interface UrgencySettings {
  urgentDays: number;
  criticalDays: number;
  overdueDays: number;
}

interface AppSettings {
  theme: 'light' | 'dark' | 'auto';
  defaultView: 'cards' | 'calendar';
  autoRefresh: boolean;
  showTips: boolean;
}

const Settings: React.FC = () => {
  const { theme, setTheme } = useTheme();
  
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    enabled: true,
    daysBefore: 3,
    soundEnabled: false,
    showOnAllPages: false
  });

  const [urgencySettings, setUrgencySettings] = useState<UrgencySettings>({
    urgentDays: 7,
    criticalDays: 3,
    overdueDays: 0
  });

  const [appSettings, setAppSettings] = useState<AppSettings>({
    theme: theme,
    defaultView: 'cards',
    autoRefresh: true,
    showTips: true
  });

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // Load settings from localStorage
    const savedNotificationSettings = localStorage.getItem('notificationSettings');
    if (savedNotificationSettings) {
      setNotificationSettings(JSON.parse(savedNotificationSettings));
    }

    const savedUrgencySettings = localStorage.getItem('urgencySettings');
    if (savedUrgencySettings) {
      setUrgencySettings(JSON.parse(savedUrgencySettings));
    }

    const savedAppSettings = localStorage.getItem('appSettings');
    if (savedAppSettings) {
      setAppSettings(JSON.parse(savedAppSettings));
    }
  }, []);

  const saveSettings = () => {
    localStorage.setItem('notificationSettings', JSON.stringify(notificationSettings));
    localStorage.setItem('urgencySettings', JSON.stringify(urgencySettings));
    localStorage.setItem('appSettings', JSON.stringify(appSettings));
    setHasChanges(false);
  };

  const resetToDefaults = () => {
    setNotificationSettings({
      enabled: true,
      daysBefore: 3,
      soundEnabled: false,
      showOnAllPages: false
    });
    setUrgencySettings({
      urgentDays: 7,
      criticalDays: 3,
      overdueDays: 0
    });
    setAppSettings({
      theme: 'light',
      defaultView: 'cards',
      autoRefresh: true,
      showTips: true
    });
    setTheme('light');
    setHasChanges(true);
  };

  const handleNotificationChange = (key: keyof NotificationSettings, value: any) => {
    setNotificationSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleUrgencyChange = (key: keyof UrgencySettings, value: number) => {
    setUrgencySettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleAppSettingChange = (key: keyof AppSettings, value: any) => {
    setAppSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
    
    // Handle theme change immediately
    if (key === 'theme') {
      setTheme(value);
    }
  };

  return (
    <div className="settings">
      <div className="container">
        <div className="header">
          <h1>
            <SettingsIcon size={32} />
            Settings
          </h1>
          <p>Customize your credit card tracking experience</p>
        </div>

        <div className="settings-content">
          {/* Notification Settings */}
          <div className="settings-section">
            <div className="section-header">
              <Bell size={24} />
              <h2>Notifications & Alerts</h2>
            </div>
            <div className="settings-grid">
              <div className="setting-item">
                <label className="setting-label">
                  <input
                    type="checkbox"
                    checked={notificationSettings.enabled}
                    onChange={(e) => handleNotificationChange('enabled', e.target.checked)}
                  />
                  <span>Enable dashboard alerts</span>
                </label>
                <p className="setting-description">
                  Show urgent payment alerts at the top of the page
                </p>
              </div>

              <div className="setting-item">
                <label className="setting-label">
                  Alert me
                  <select
                    value={notificationSettings.daysBefore}
                    onChange={(e) => handleNotificationChange('daysBefore', parseInt(e.target.value))}
                    disabled={!notificationSettings.enabled}
                  >
                    <option value={1}>1 day before</option>
                    <option value={2}>2 days before</option>
                    <option value={3}>3 days before</option>
                    <option value={5}>5 days before</option>
                    <option value={7}>1 week before</option>
                  </select>
                </label>
                <p className="setting-description">
                  When to show urgent payment alerts
                </p>
              </div>

              <div className="setting-item">
                <label className="setting-label">
                  <input
                    type="checkbox"
                    checked={notificationSettings.soundEnabled}
                    onChange={(e) => handleNotificationChange('soundEnabled', e.target.checked)}
                    disabled={!notificationSettings.enabled}
                  />
                  <span>Enable sound alerts</span>
                </label>
                <p className="setting-description">
                  Play a sound when urgent alerts appear
                </p>
              </div>

              <div className="setting-item">
                <label className="setting-label">
                  <input
                    type="checkbox"
                    checked={notificationSettings.showOnAllPages}
                    onChange={(e) => handleNotificationChange('showOnAllPages', e.target.checked)}
                    disabled={!notificationSettings.enabled}
                  />
                  <span>Show alerts on all pages</span>
                </label>
                <p className="setting-description">
                  Display urgent payment alerts on every page, not just the tracking page
                </p>
              </div>
            </div>
          </div>

          {/* Urgency Settings */}
          <div className="settings-section">
            <div className="section-header">
              <Calendar size={24} />
              <h2>Payment Urgency Levels</h2>
            </div>
            <div className="settings-grid">
              <div className="setting-item">
                <label className="setting-label">
                  Show as "Due Soon" when payment is due in
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={urgencySettings.urgentDays}
                    onChange={(e) => handleUrgencyChange('urgentDays', parseInt(e.target.value))}
                  />
                  days
                </label>
                <p className="setting-description">
                  Payments within this timeframe will show as "Due Soon"
                </p>
              </div>

              <div className="setting-item">
                <label className="setting-label">
                  Show as "Urgent" when payment is due in
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={urgencySettings.criticalDays}
                    onChange={(e) => handleUrgencyChange('criticalDays', parseInt(e.target.value))}
                  />
                  days
                </label>
                <p className="setting-description">
                  Payments within this timeframe will show urgent messages like "PAY THIS IMMEDIATELY"
                </p>
              </div>

              <div className="setting-item">
                <label className="setting-label">
                  Show as "Overdue" when payment is
                  <input
                    type="number"
                    min="0"
                    max="30"
                    value={urgencySettings.overdueDays}
                    onChange={(e) => handleUrgencyChange('overdueDays', parseInt(e.target.value))}
                  />
                  days past due
                </label>
                <p className="setting-description">
                  Payments past this threshold will show as overdue
                </p>
              </div>
            </div>
          </div>

          {/* App Settings */}
          <div className="settings-section">
            <div className="section-header">
              <SettingsIcon size={24} />
              <h2>App Preferences</h2>
            </div>
            <div className="settings-grid">
              <div className="setting-item">
                <label className="setting-label">
                  Theme
                  <select
                    value={appSettings.theme}
                    onChange={(e) => handleAppSettingChange('theme', e.target.value)}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto (System)</option>
                  </select>
                </label>
                <p className="setting-description">
                  Choose your preferred color theme
                </p>
              </div>

              <div className="setting-item">
                <label className="setting-label">
                  Default view
                  <select
                    value={appSettings.defaultView}
                    onChange={(e) => handleAppSettingChange('defaultView', e.target.value)}
                  >
                    <option value="cards">Cards View</option>
                    <option value="calendar">Calendar View</option>
                  </select>
                </label>
                <p className="setting-description">
                  Which view to show when opening the app
                </p>
              </div>

              <div className="setting-item">
                <label className="setting-label">
                  <input
                    type="checkbox"
                    checked={appSettings.autoRefresh}
                    onChange={(e) => handleAppSettingChange('autoRefresh', e.target.checked)}
                  />
                  <span>Auto-refresh data</span>
                </label>
                <p className="setting-description">
                  Automatically refresh payment data when returning to the app
                </p>
              </div>

              <div className="setting-item">
                <label className="setting-label">
                  <input
                    type="checkbox"
                    checked={appSettings.showTips}
                    onChange={(e) => handleAppSettingChange('showTips', e.target.checked)}
                  />
                  <span>Show helpful tips</span>
                </label>
                <p className="setting-description">
                  Display tips and explanations throughout the app
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="settings-actions">
            <button
              className="reset-btn"
              onClick={resetToDefaults}
              title="Reset all settings to defaults"
            >
              <RotateCcw size={20} />
              Reset to Defaults
            </button>
            <button
              className="save-btn"
              onClick={saveSettings}
              disabled={!hasChanges}
              title="Save all changes"
            >
              <Save size={20} />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
