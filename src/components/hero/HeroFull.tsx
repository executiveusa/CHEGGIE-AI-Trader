import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';
import { MagneticWrapper } from '@/components/ui/magnetic-button';

const HERO_IMAGE_URL = '/stitch_language_selection/stitch_language_selection/public_homepage_hero/screen.png';
const FALLBACK_IMAGE_URL = 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=2000&q=80';

const featureHighlights = [
  {
    labelKey: 'Flowwise Agents',
    descriptionKey: 'Adaptive wealth guidance that updates with your data.',
  },
  {
    labelKey: 'Lifestyle Intelligence',
    descriptionKey: 'Design rituals that keep your finances aligned with your goals.',
  },
  {
    labelKey: 'Global Perspective',
    descriptionKey: 'Cypress calm meets skyscraper ambition — your new baseline.',
  },
];

export const HeroFull = () => {
  const { t } = useTranslation();

  const scrollToTracking = () => {
    const element = document.getElementById('tracking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section 
      className="relative min-h-[100svh] w-full overflow-hidden bg-slate-950 text-white" 
      aria-labelledby="hero-heading"
      id="hero"
      data-agid="home-hero"
    >
      {/* Background Image with Overlays */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE_URL}
          alt="Financial lifestyle design"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          onError={(e) => {
            (e.target as HTMLImageElement).src = FALLBACK_IMAGE_URL;
          }}
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/70 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(16,185,129,0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(20,184,166,0.15),transparent_50%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-[100svh] flex-col justify-center px-6 py-24 sm:px-12 lg:px-20">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <Badge 
                  className="px-4 py-2 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 backdrop-blur-sm"
                  data-agid="hero-badge"
                >
                  {t('hero.badge')}
                </Badge>
              </motion.div>

              {/* Headline */}
              <motion.h1 
                id="hero-heading" 
                className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <span className="block bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  {t('hero.title')}
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p 
                className="max-w-xl text-lg text-slate-300 sm:text-xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {t('hero.subtitle')}
              </motion.p>

              {/* CTAs */}
              <motion.div 
                className="flex flex-col gap-4 sm:flex-row sm:items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <MagneticWrapper strength={0.15}>
                  <Button 
                    asChild 
                    size="lg" 
                    className="h-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-8 text-lg font-semibold text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-shadow"
                    data-agid="cta-primary"
                  >
                    <Link to="/auth">
                      {t('hero.cta')}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </MagneticWrapper>

                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 rounded-full border-white/20 bg-white/5 px-8 text-lg text-white backdrop-blur-md hover:bg-white/10 hover:border-white/30 transition-all"
                  onClick={scrollToTracking}
                  data-agid="cta-secondary"
                >
                  {t('hero.secondary')}
                </Button>
              </motion.div>
            </motion.div>

            {/* Right: Feature Highlights */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block"
            >
              <ul className="grid gap-4">
                {featureHighlights.map((item, index) => (
                  <motion.li 
                    key={item.labelKey}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.15, duration: 0.5 }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all"
                  >
                    <p className="text-sm uppercase tracking-[0.2em] text-emerald-300 font-medium">
                      {item.labelKey}
                    </p>
                    <p className="mt-3 text-lg text-white/80">
                      {item.descriptionKey}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.button
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 hover:text-white/90 transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          onClick={scrollToTracking}
          aria-label="Scroll to tracking section"
        >
          <span className="text-sm font-medium">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="h-6 w-6" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
};

export default HeroFull;
