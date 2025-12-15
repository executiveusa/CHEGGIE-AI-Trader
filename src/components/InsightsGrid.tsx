import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Tag } from 'lucide-react';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/ui/reveal';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Featured insights/projects data
const insights = [
  {
    id: 'flowwise-agents',
    type: 'project',
    featured: true,
    title: 'Building Flowwise Agents for Serbian Youth',
    description: 'An AI-powered financial education platform designed to help young investors navigate markets with confidence and culturally-relevant guidance.',
    image: '/stitch_language_selection/stitch_language_selection/advisor_client_dashboard/screen.png',
    tags: ['AI', 'Finance', 'Education'],
    link: '#',
  },
  {
    id: 'bitcoin-policy',
    type: 'insight',
    featured: false,
    title: 'Bitcoin Policy Navigation for NBS Compliance',
    description: 'Understanding the regulatory landscape for cryptocurrency in Serbia.',
    tags: ['Crypto', 'Compliance'],
    link: '#',
  },
  {
    id: 'lifestyle-framework',
    type: 'project',
    featured: false,
    title: 'Lifestyle Design Framework v2',
    description: 'A system for aligning daily rituals with long-term financial goals.',
    tags: ['Lifestyle', 'Productivity'],
    link: '#',
  },
  {
    id: 'market-analysis',
    type: 'insight',
    featured: false,
    title: 'Q4 2024 Market Outlook: Emerging Opportunities',
    description: 'Key trends and opportunities for the upcoming quarter.',
    tags: ['Markets', 'Analysis'],
    link: '#',
  },
  {
    id: 'multilingual-fintech',
    type: 'project',
    featured: false,
    title: 'Multilingual FinTech: Bridging Language Gaps',
    description: 'Building financial tools that speak your language.',
    tags: ['FinTech', 'i18n'],
    link: '#',
  },
];

export const InsightsGrid = () => {
  const { t } = useTranslation();

  const featuredInsight = insights.find(i => i.featured);
  const otherInsights = insights.filter(i => !i.featured);

  return (
    <section 
      id="insights" 
      data-agid="section-insights"
      className="relative py-24 bg-slate-900"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(20,184,166,0.08),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <Reveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t('insights.title')}
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {t('insights.subtitle')}
          </p>
        </Reveal>

        {/* Bento Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Featured Project (Large) */}
          {featuredInsight && (
            <Reveal className="lg:col-span-2 lg:row-span-2" delay={0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <GlassCard 
                  className="h-full overflow-hidden p-0"
                  data-agid={`insight-${featuredInsight.id}`}
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={featuredInsight.image}
                      alt={featuredInsight.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/6771609/pexels-photo-6771609.jpeg?auto=compress&cs=tinysrgb&w=1200';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                    <Badge className="absolute top-4 left-4 bg-emerald-500/90 text-white">
                      Featured
                    </Badge>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {featuredInsight.tags.map(tag => (
                        <Badge 
                          key={tag} 
                          variant="secondary"
                          className="bg-white/5 text-slate-300 border-white/10"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white">
                      {featuredInsight.title}
                    </h3>
                    
                    <p className="text-slate-400">
                      {featuredInsight.description}
                    </p>
                    
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-emerald-400 hover:text-emerald-300"
                    >
                      {t('insights.viewProject')}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            </Reveal>
          )}

          {/* Other Insights (Small Cards) */}
          {otherInsights.slice(0, 4).map((insight, index) => (
            <Reveal key={insight.id} delay={0.2 + index * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <GlassCard 
                  className="h-full flex flex-col"
                  data-agid={`insight-${insight.id}`}
                >
                  <div className="flex flex-wrap gap-2 mb-3">
                    {insight.tags.map(tag => (
                      <Badge 
                        key={tag} 
                        variant="secondary"
                        className="bg-white/5 text-slate-400 border-white/10 text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-2 flex-grow">
                    {insight.title}
                  </h3>
                  
                  <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                    {insight.description}
                  </p>
                  
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-emerald-400 hover:text-emerald-300 self-start"
                  >
                    {t('insights.readMore')}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </GlassCard>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsightsGrid;
