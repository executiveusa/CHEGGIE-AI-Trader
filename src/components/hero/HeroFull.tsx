import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const HERO_IMAGE_URL = '/stitch_language_selection/stitch_language_selection/public_homepage_hero/screen.png';
const FALLBACK_IMAGE_URL = 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=2000&q=80';

export const HeroFull = () => {
  const scrollToTracking = () => {
    const element = document.getElementById('tracking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section 
      className="relative min-h-[100svh] w-full overflow-hidden" 
      aria-labelledby="hero-heading"
      id="hero"
      data-agid="home-hero"
    >
      {/* Background Image - Full visibility */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE_URL}
          alt="Hero background"
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = FALLBACK_IMAGE_URL;
          }}
          loading="eager"
        />
        {/* Subtle gradient at bottom for scroll indicator readability */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Scroll Indicator */}
      <motion.button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        onClick={scrollToTracking}
        aria-label="Scroll to tracking section"
      >
        <span className="text-sm font-medium drop-shadow-lg">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-6 w-6 drop-shadow-lg" />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default HeroFull;
