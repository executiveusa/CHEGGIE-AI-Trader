import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileNav } from './MobileNav';
import { Button } from './ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

const navItems = [
  { key: 'dashboard', href: '/dashboard', isRoute: true },
  { key: 'tracking', href: '#tracking', isRoute: false },
  { key: 'insights', href: '#insights', isRoute: false },
  { key: 'about', href: '#about', isRoute: false },
] as const;

export const Navigation = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  // Transform scroll position to background opacity
  const backgroundOpacity = useTransform(scrollY, [0, 100], [0, 0.95]);
  const backdropBlur = useTransform(scrollY, [0, 100], [0, 16]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: typeof navItems[number]) => {
    if (item.isRoute) {
      // Regular route navigation
      return;
    }
    
    e.preventDefault();
    const sectionId = item.href.replace('#', '');
    
    if (location.pathname !== '/') {
      // Navigate to home with scroll target
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      // Already on home, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Handle scroll-to on navigation from other pages
  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo && location.pathname === '/') {
      setTimeout(() => {
        const element = document.getElementById(state.scrollTo!);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      // Clear the state
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const isActive = (href: string) => {
    if (href.startsWith('#')) {
      return false; // Scroll sections don't have active state
    }
    return location.pathname === href || location.pathname.startsWith(href);
  };

  return (
    <motion.nav
      role="navigation"
      aria-label="Primary navigation"
      data-agid="nav-primary"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(15, 23, 42, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'blur(0px)',
        borderColor: scrolled ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 font-bold text-xl transition-all hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg px-1 group" 
            aria-label="Cheggie AI home"
            data-agid="nav-logo"
          >
            <motion.div 
              className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-lg shadow-lg shadow-emerald-500/20"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <TrendingUp className="h-6 w-6 text-white" />
            </motion.div>
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Cheggie AI
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <motion.a
                  key={item.key}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`relative text-sm font-medium transition-all rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${
                    active
                      ? 'text-emerald-400'
                      : 'text-slate-300 hover:text-white'
                  }`}
                  data-agid={`nav-item-${item.key}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t(`nav.${item.key}`)}
                  {active && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
                    />
                  )}
                </motion.a>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Button 
              variant="ghost" 
              size="sm" 
              asChild
              className="h-10 px-4 text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
              data-agid="nav-login"
            >
              <Link to="/auth" aria-label={t('nav.login')}>
                {t('nav.login')}
              </Link>
            </Button>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all h-10 px-6 focus:outline-none focus:ring-2 focus:ring-primary text-white font-medium" 
                asChild
                data-agid="nav-signup"
              >
                <Link to="/auth" aria-label={t('nav.signup')}>
                  {t('nav.signup')}
                </Link>
              </Button>
            </motion.div>
            <MobileNav />
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
