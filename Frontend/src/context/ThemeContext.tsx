import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeType = 'light' | 'dark';

type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as ThemeType) || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'dark') {
      root.style.setProperty('--background', '#121212');
      root.style.setProperty('--background-secondary', '#1e1e1e');
      root.style.setProperty('--text-primary', '#f2f2f2');
      root.style.setProperty('--text-secondary', '#b3b3b3');
      root.style.setProperty('--surface', '#252525');
      root.style.setProperty('--surface-hover', '#353535');
      root.style.setProperty('--border-color', '#333333');
      document.body.classList.add('dark-theme');
    } else {
      root.style.setProperty('--background', '#ffffff');
      root.style.setProperty('--background-secondary', '#f5f5f5');
      root.style.setProperty('--text-primary', '#333333');
      root.style.setProperty('--text-secondary', '#666666');
      root.style.setProperty('--surface', '#ffffff');
      root.style.setProperty('--surface-hover', '#f0f0f0');
      root.style.setProperty('--border-color', '#e0e0e0');
      document.body.classList.remove('dark-theme');
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};