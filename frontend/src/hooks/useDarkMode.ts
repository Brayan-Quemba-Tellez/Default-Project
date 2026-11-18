import { useEffect } from 'react';
import { useThemeStore } from '@/stores/theme.store';

export const useDarkMode = () => {
  const { theme, setTheme, toggleTheme } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return {
    isDarkMode: theme === 'dark',
    theme,
    toggleDarkMode: toggleTheme,
    setDarkMode: (isDark: boolean) => setTheme(isDark ? 'dark' : 'light'),
  };
};
