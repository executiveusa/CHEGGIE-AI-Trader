import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, Eye, FileText, BarChart3, ArrowRight, Radio } from 'lucide-react';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/ui/reveal';
import { GlassCard } from '@/components/ui/glass-card';
import { AnimatedNumber, AnimatedPercentage } from '@/components/ui/animated-number';
import { Button } from '@/components/ui/button';

const trackingCards = [
  {
    id: 'market-pulse',
    icon: TrendingUp,
    titleKey: 'tracking.marketPulse',
    value: 3,
    suffix: 'tracking.signals',
    status: 'live',
    updated: '2h ago',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-emerald-400',
  },
  {
    id: 'watchlist',
    icon: Eye,
    titleKey: 'tracking.watchlist',
    value: 12,
    suffix: 'tracking.assets',
    status: 'live',
    updated: 'Live',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-400',
  },
  {
    id: 'daily-brief',
    icon: FileText,
    titleKey: 'tracking.dailyBrief',
    value: null,
    textValue: 'tracking.ready',
    status: 'ready',
    updated: '8:00 AM',
    gradient: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-purple-400',
  },
  {
    id: 'portfolio-delta',
    icon: BarChart3,
    titleKey: 'tracking.portfolioDelta',
    value: 2.4,
    isPercentage: true,
    suffix: 'tracking.thisWeek',
    status: 'positive',
    updated: 'Real-time',
    gradient: 'from-amber-500/20 to-orange-500/20',
    iconColor: 'text-amber-400',
  },
];

export const TrackingSnapshot = () => {
  const { t } = useTranslation();

  return (
    <section 
      id="tracking" 
      data-agid="section-tracking"
      className="relative py-24 bg-slate-950"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.08),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <Reveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t('tracking.title')}
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {t('tracking.subtitle')}
          </p>
        </Reveal>

        {/* Tracking Cards Grid */}
        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {trackingCards.map((card) => (
            <StaggerItem key={card.id}>
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <GlassCard 
                  className={`h-full bg-gradient-to-br ${card.gradient}`}
                  data-agid={`tracking-card-${card.id}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-2.5 rounded-xl bg-white/5 ${card.iconColor}`}>
                      <card.icon className="h-5 w-5" />
                    </div>
                    {card.status === 'live' && (
                      <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                        <Radio className="h-3 w-3 animate-pulse" />
                        {t('tracking.live')}
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-sm font-medium text-slate-400 mb-2">
                    {t(card.titleKey)}
                  </h3>
                  
                  <div className="text-2xl font-bold text-white mb-1">
                    {card.isPercentage ? (
                      <AnimatedPercentage value={card.value!} showSign colorCode />
                    ) : card.value !== null ? (
                      <>
                        <AnimatedNumber value={card.value} />{' '}
                        <span className="text-base font-normal text-slate-400">
                          {t(card.suffix!)}
                        </span>
                      </>
                    ) : (
                      <span className="text-emerald-400">{t(card.textValue!)}</span>
                    )}
                  </div>
                  
                  <p className="text-xs text-slate-500">
                    {t('tracking.updated')}: {card.updated}
                  </p>
                </GlassCard>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA Button */}
        <Reveal delay={0.4} className="text-center">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              asChild
              size="lg"
              className="h-12 px-8 bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 backdrop-blur-sm"
              data-agid="tracking-cta"
            >
              <Link to="/dashboard">
                {t('tracking.viewDashboard')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
};

export default TrackingSnapshot;
