import { useEffect, useState } from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ThemeOption = 'light' | 'dark' | 'system';

const THEME_STORAGE_KEY = 'cheggie-theme-preference';

const getSystemPreference = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<ThemeOption>('system');

  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeOption | null;
    if (stored) {
      setTheme(stored);
      applyTheme(stored);
    } else {
      applyTheme('system');
    }
  }, []);

  const applyTheme = (nextTheme: ThemeOption) => {
    const root = document.documentElement;
    const resolved = nextTheme === 'system' ? getSystemPreference() : nextTheme;
    root.classList.remove('light', 'dark');
    root.classList.add(resolved);
  };

  const cycleTheme = () => {
    const order: ThemeOption[] = ['light', 'dark', 'system'];
    const currentIndex = order.indexOf(theme);
    const nextTheme = order[(currentIndex + 1) % order.length];
    setTheme(nextTheme);
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
  };

  const icon = theme === 'light' ? <Sun className="h-4 w-4" /> : theme === 'dark' ? <Moon className="h-4 w-4" /> : <Monitor className="h-4 w-4" />;

  return (
    <Button variant="outline" size="icon" className="border-white/40 text-white" onClick={cycleTheme} aria-label="Toggle theme">
      {icon}
    </Button>
  );
};

export default ThemeToggle;
