import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';

const productLinks = [
  { key: 'overview', href: '/#overview' },
  { key: 'features', href: '/#features' },
  { key: 'workflow', href: '/#workflow' },
  { key: 'pricing', href: '/#pricing' },
] as const;

const resourceLinks = [
  { labelKey: 'footer.docs', href: 'https://docs.cheggie.ai', external: true },
  { labelKey: 'footer.status', href: 'https://status.cheggie.ai', external: true },
  { labelKey: 'footer.api', href: 'https://api.cheggie.ai/docs', external: true },
] as const;

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/cheggie-ai' },
  { label: 'X (Twitter)', href: 'https://x.com/cheggie_ai' },
] as const;

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 md:grid-cols-[1.2fr_repeat(3,minmax(0,1fr))]">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
              <div className="bg-gradient-primary p-2 rounded-lg shadow-glow">
                <TrendingUp className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Cheggie AI
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md">{t('footer.tagline')}</p>
            <p className="text-sm text-muted-foreground">{t('footer.contact')}</p>
            <a
              href="tel:+18335551298"
              className="inline-flex items-center text-sm font-semibold text-primary transition-colors hover:text-accent"
              aria-label={t('footer.phoneCtaAria')}
            >
              {t('footer.phoneCta')}
            </a>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">{t('footer.product')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {productLinks.map((item) => (
                <li key={item.key}>
                  <a href={item.href} className="transition-colors hover:text-primary">
                    {t(`nav.${item.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">{t('footer.resources')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {resourceLinks.map((item) => (
                <li key={item.labelKey}>
                  <a
                    href={item.href}
                    className="transition-colors hover:text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t(item.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">{t('footer.legal')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/privacy" className="transition-colors hover:text-primary">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="transition-colors hover:text-primary">
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link to="/security" className="transition-colors hover:text-primary">
                  {t('footer.security')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>{t('footer.copyright')}</p>
          <div className="flex flex-wrap gap-4 items-center">
            <a href="mailto:hello@cheggie.ai" className="transition-colors hover:text-primary">hello@cheggie.ai</a>
            <a href="https://status.cheggie.ai" className="transition-colors hover:text-primary" target="_blank" rel="noopener noreferrer">
              {t('footer.statusLink')}
            </a>
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-primary"
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
