import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileNav } from './MobileNav';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const navItems = [
  { key: 'dashboard', href: '/dashboard' },
  { key: 'overview', href: '/#overview' },
  { key: 'features', href: '/#features' },
  { key: 'workflow', href: '/#workflow' },
  { key: 'integrations', href: '/#integrations' },
  { key: 'pricing', href: '/#pricing' },
  { key: 'faq', href: '/#faq' },
] as const;

export const Navigation = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const isActive = (href: string) => {
    if (href.startsWith('/#')) {
      return location.pathname === '/';
    }
    return location.pathname === href || location.pathname.startsWith(href);
  };

  return (
    <motion.nav
      role="navigation"
      aria-label="Primary navigation"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-lg"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 font-bold text-xl transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg px-1" 
            aria-label="Cheggie AI home"
          >
            <div className="bg-gradient-primary p-2 rounded-lg shadow-glow">
              <TrendingUp className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Cheggie AI
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <a
                  key={item.key}
                  href={item.href}
                  className={`text-sm font-medium transition-all rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${
                    active
                      ? 'text-primary font-semibold border-b-2 border-primary'
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  {t(`nav.${item.key}`)}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Button 
              variant="ghost" 
              size="sm" 
              asChild
              className="h-12 px-3 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <Link to="/auth" aria-label={t('nav.login')}>
                {t('nav.login')}
              </Link>
            </Button>
            <Button 
              size="sm" 
              className="bg-gradient-primary shadow-glow hover:shadow-lg transition-all h-12 px-6 focus:outline-none focus:ring-2 focus:ring-primary" 
              asChild
            >
              <Link to="/auth" aria-label={t('nav.signup')}>
                {t('nav.signup')}
              </Link>
            </Button>
            <MobileNav />
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
