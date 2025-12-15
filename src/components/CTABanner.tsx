import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal, ScaleReveal } from '@/components/ui/reveal';
import { MagneticWrapper } from '@/components/ui/magnetic-button';

export const CTABanner = () => {
  const { t } = useTranslation();

  return (
    <section 
      id="cta"
      data-agid="section-cta"
      className="relative py-24 overflow-hidden"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/90 via-teal-600/90 to-emerald-600/90" />
      
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-white/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-white/10 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <ScaleReveal>
          <div className="max-w-3xl mx-auto text-center">
            {/* Icon */}
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-6"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles className="h-8 w-8 text-white" />
            </motion.div>
            
            {/* Headline */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {t('cta.title')}
            </h2>
            
            {/* Subtitle */}
            <p className="text-xl text-white/80 mb-8">
              {t('cta.subtitle')}
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <MagneticWrapper strength={0.15}>
                <Button
                  asChild
                  size="lg"
                  className="h-14 px-10 bg-white text-emerald-600 font-bold text-lg hover:bg-white/90 shadow-xl shadow-black/20 transition-shadow"
                  data-agid="cta-primary-banner"
                >
                  <Link to="/auth">
                    {t('cta.primary')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </MagneticWrapper>
              
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 px-8 border-2 border-white/30 text-white font-semibold hover:bg-white/10 hover:border-white/50 backdrop-blur-sm"
                data-agid="cta-secondary-banner"
              >
                <a href="#insights">
                  {t('cta.secondary')}
                </a>
              </Button>
            </div>
          </div>
        </ScaleReveal>
      </div>
    </section>
  );
};

export default CTABanner;
