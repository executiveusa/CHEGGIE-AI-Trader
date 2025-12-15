import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { TrendingUp, ExternalLink, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const navigationLinks = [
  { key: 'tracking', href: '#tracking' },
  { key: 'insights', href: '#insights' },
  { key: 'about', href: '#about' },
  { key: 'dashboard', href: '/dashboard' },
] as const;

const resourceLinks = [
  { labelKey: 'footer.docs', href: 'https://docs.cheggie.ai', external: true },
  { labelKey: 'footer.status', href: 'https://status.cheggie.ai', external: true },
  { labelKey: 'footer.api', href: 'https://api.cheggie.ai/docs', external: true },
] as const;

const legalLinks = [
  { key: 'privacy', href: '/privacy' },
  { key: 'terms', href: '/terms' },
  { key: 'security', href: '/security' },
] as const;

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/cheggie-ai' },
  { label: 'X', href: 'https://x.com/cheggie_ai' },
] as const;

export const Footer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const sectionId = href.replace('#', '');
      
      if (location.pathname !== '/') {
        navigate('/', { state: { scrollTo: sectionId } });
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  };

  return (
    <footer className="border-t border-white/10 bg-slate-950 py-16" data-agid="footer-main">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 md:grid-cols-[1.5fr_repeat(3,minmax(0,1fr))]">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl group">
              <motion.div 
                className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <TrendingUp className="h-6 w-6 text-white" />
              </motion.div>
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Cheggie AI
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-md">
              {t('footer.tagline')}
            </p>
            <p className="text-sm text-slate-500">
              {t('footer.contact')}
            </p>
            <div className="flex items-center gap-4">
              <a
                href="mailto:hello@cheggie.ai"
                className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-emerald-400 transition-colors"
              >
                <Mail className="h-4 w-4" />
                hello@cheggie.ai
              </a>
            </div>
            <a
              href="tel:+18335551298"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              aria-label={t('footer.phoneCtaAria')}
            >
              <Phone className="h-4 w-4" />
              {t('footer.phoneCta')}
            </a>
          </div>

          {/* Navigation Column */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">{t('footer.product')}</h4>
            <ul className="space-y-3 text-sm">
              {navigationLinks.map((item) => (
                <li key={item.key}>
                  <a 
                    href={item.href} 
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {t(`nav.${item.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">{t('footer.resources')}</h4>
            <ul className="space-y-3 text-sm">
              {resourceLinks.map((item) => (
                <li key={item.labelKey}>
                  <a
                    href={item.href}
                    className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t(item.labelKey)}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">{t('footer.legal')}</h4>
            <ul className="space-y-3 text-sm">
              {legalLinks.map((item) => (
                <li key={item.key}>
                  <Link 
                    to={item.href} 
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {t(`footer.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm md:flex-row md:items-center md:justify-between">
          <p className="text-slate-500">{t('footer.copyright')}</p>
          <div className="flex flex-wrap gap-6 items-center">
            <a 
              href="https://status.cheggie.ai" 
              className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {t('footer.statusLink')}
            </a>
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-slate-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
