import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark' | 'auto';
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
  actualTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('light');
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('appSettings');
    if (savedTheme) {
      const settings = JSON.parse(savedTheme);
      setTheme(settings.theme || 'light');
    }
  }, []);

  useEffect(() => {
    // Determine actual theme based on preference
    let newActualTheme: 'light' | 'dark' = 'light';
    
    if (theme === 'auto') {
      // Check system preference
      newActualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      newActualTheme = theme;
    }
    
    setActualTheme(newActualTheme);
    
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', newActualTheme);
  }, [theme]);

  const handleSetTheme = (newTheme: 'light' | 'dark' | 'auto') => {
    setTheme(newTheme);
    
    // Update localStorage
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      settings.theme = newTheme;
      localStorage.setItem('appSettings', JSON.stringify(settings));
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme, actualTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
