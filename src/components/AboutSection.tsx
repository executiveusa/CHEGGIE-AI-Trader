import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MapPin, Languages, Target, Calendar, Linkedin, Twitter } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <section 
      id="about" 
      data-agid="section-about"
      className="relative py-24 bg-slate-950"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(20,184,166,0.05),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <Reveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t('about.title')}
          </h2>
          <p className="text-lg text-slate-400">
            {t('about.subtitle')}
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left: Photo & Social */}
          <Reveal direction="left" delay={0.2}>
            <div className="flex flex-col items-center lg:items-start space-y-6">
              {/* Profile Photo */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                <div className="w-64 h-64 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl shadow-emerald-500/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20" />
                  <img
                    src="/stitch_language_selection/stitch_language_selection/user_dashboard/screen.png"
                    alt="Profile"
                    className="w-full h-full object-cover opacity-90"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=cheggie&backgroundColor=0f172a';
                    }}
                  />
                </div>
                {/* Decorative ring */}
                <div className="absolute -inset-2 rounded-2xl border border-emerald-500/20 -z-10" />
              </motion.div>

              {/* Language Badges */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-400">{t('about.languages')}:</span>
                <div className="flex gap-2">
                  <Badge variant="secondary" className="bg-white/5 border-white/10 text-lg px-3">🇷🇸</Badge>
                  <Badge variant="secondary" className="bg-white/5 border-white/10 text-lg px-3">🇬🇧</Badge>
                  <Badge variant="secondary" className="bg-white/5 border-white/10 text-lg px-3">🇲🇽</Badge>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="border-white/10 hover:bg-white/5 hover:border-white/20"
                  asChild
                >
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5 text-slate-400" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-white/10 hover:bg-white/5 hover:border-white/20"
                  asChild
                >
                  <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-5 w-5 text-slate-400" />
                  </a>
                </Button>
              </div>
            </div>
          </Reveal>

          {/* Right: Bio & Details */}
          <Reveal direction="right" delay={0.3}>
            <div className="space-y-6">
              {/* Bio */}
              <GlassCard padding="lg">
                <p className="text-lg text-slate-300 leading-relaxed">
                  {t('about.bio')}
                </p>
              </GlassCard>

              {/* Details Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <GlassCard className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">{t('about.location')}</p>
                    <p className="text-white font-medium">Belgrade, Serbia</p>
                  </div>
                </GlassCard>

                <GlassCard className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400">
                    <Target className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">{t('about.focus')}</p>
                    <p className="text-white font-medium">AI + Finance</p>
                  </div>
                </GlassCard>
              </div>

              {/* Schedule CTA */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  className="w-full h-14 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-shadow"
                  asChild
                  data-agid="about-schedule"
                >
                  <a href="https://cal.com" target="_blank" rel="noopener noreferrer">
                    <Calendar className="mr-2 h-5 w-5" />
                    {t('about.schedule')}
                  </a>
                </Button>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
