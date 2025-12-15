import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { key: 'dashboard', href: '/dashboard', isRoute: true },
  { key: 'tracking', href: '#tracking', isRoute: false },
  { key: 'insights', href: '#insights', isRoute: false },
  { key: 'about', href: '#about', isRoute: false },
] as const;

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (item: typeof navItems[number]) => {
    setIsOpen(false);
    
    if (item.isRoute) {
      navigate(item.href);
      return;
    }
    
    const sectionId = item.href.replace('#', '');
    
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <div className="md:hidden" data-agid="nav-mobile">
      {/* Menu Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="text-white hover:bg-white/10"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 z-50 h-full w-80 bg-slate-900/95 backdrop-blur-xl border-l border-white/10 p-6"
            >
              {/* Close Button */}
              <div className="flex justify-end mb-8">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/10"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <button
                      onClick={() => handleNavClick(item)}
                      className="w-full text-left px-4 py-3 text-lg font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      {t(`nav.${item.key}`)}
                    </button>
                  </motion.div>
                ))}
              </nav>

              {/* Auth Buttons */}
              <div className="mt-8 space-y-3">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button
                    variant="outline"
                    className="w-full h-12 border-white/20 text-white hover:bg-white/5"
                    onClick={() => {
                      setIsOpen(false);
                      navigate('/auth');
                    }}
                  >
                    {t('nav.login')}
                  </Button>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    className="w-full h-12 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold"
                    onClick={() => {
                      setIsOpen(false);
                      navigate('/auth');
                    }}
                  >
                    {t('nav.signup')}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;
