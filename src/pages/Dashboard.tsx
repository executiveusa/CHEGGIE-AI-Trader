import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Eye, 
  FileText, 
  Zap, 
  StickyNote, 
  ExternalLink,
  Plus,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Radio,
  AlertCircle,
  CheckCircle2,
  Clock,
  Rocket,
  CreditCard,
  BrainCircuit
} from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { GlassCard, StatsCard } from '@/components/ui/glass-card';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/ui/reveal';
import { AnimatedNumber, AnimatedPercentage, AnimatedCurrency } from '@/components/ui/animated-number';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { useQuery } from '@tanstack/react-query';
import { RubeAgentPanel } from '@/components/dashboard/RubeAgentPanel';

// Mock data fetcher
const fetchDashboardData = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return {
    marketPulse: {
      signals: [
        { id: 1, asset: 'BTC', signal: 'STRONG BUY', confidence: 87, price: 97245.00, change: 3.2 },
        { id: 2, asset: 'ETH', signal: 'HOLD', confidence: 65, price: 3890.00, change: -0.8 },
        { id: 3, asset: 'SOL', signal: 'BUY', confidence: 72, price: 245.00, change: 5.4 },
      ],
      totalSignals: 3,
    },
    watchlist: [
      { symbol: 'AAPL', name: 'Apple Inc.', price: 195.50, change: 1.2 },
      { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.30, change: -2.1 },
      { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 145.20, change: 4.5 },
      { symbol: 'MSFT', name: 'Microsoft', price: 425.80, change: 0.8 },
      { symbol: 'AMZN', name: 'Amazon', price: 195.20, change: 1.5 },
    ],
    brief: {
      summary: 'Markets showing strength with tech leading gains. Bitcoin continues rally toward $100K. Key earnings this week from major tech companies.',
      events: [
        'Fed rate decision Wednesday',
        'NVDA earnings Thursday',
        'CPI data Friday',
      ],
      generated: '8:00 AM',
    },
    notes: [
      { id: 1, text: 'Research emerging markets ETFs', time: '2h ago' },
      { id: 2, text: 'Update stop-loss on BTC position', time: '5h ago' },
      { id: 3, text: 'Review Q4 portfolio allocation', time: '1d ago' },
    ],
    stats: {
      portfolioValue: 145230,
      weeklyChange: 2.4,
      monthlyChange: 8.7,
      ytdChange: 34.2,
    },
  };
};

const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user: authUser, loading: authLoading } = useAdminAuth();

  // Get user from context or localStorage (for demo mode)
  const storedSession = localStorage.getItem('cheggie-admin-session-v1');
  const user = authUser || (storedSession ? JSON.parse(storedSession) : null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['dashboard-data'],
    queryFn: fetchDashboardData,
    refetchInterval: 60000, // Refetch every minute
  });

  // Show loading state
  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-slate-950">
        <Navigation />
        <div className="container mx-auto px-4 pt-24 pb-16">
          <DashboardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950" data-agid="page-dashboard">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <Reveal className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-slate-400 text-sm mb-1">
                {t('dashboard.welcome')} · {user?.email || 'Demo User'}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {t('dashboard.title')}
              </h1>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-white/10 text-white hover:bg-white/5"
                onClick={() => refetch()}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </Reveal>

        {/* Rube Agent Panel - AI Automation */}
        <Reveal delay={0.1} className="mb-8">
          <RubeAgentPanel />
        </Reveal>

        {/* Stats Row */}
        <Reveal delay={0.15} className="mb-8">
          <div className="grid gap-4 md:grid-cols-4">
            <StatsCard
              icon={<TrendingUp className="h-5 w-5" />}
              title="Portfolio Value"
              value={<AnimatedCurrency value={data?.stats.portfolioValue || 0} />}
              subtitle={<AnimatedPercentage value={data?.stats.weeklyChange || 0} showSign colorCode />}
              trend={data?.stats.weeklyChange && data.stats.weeklyChange > 0 ? 'up' : 'down'}
            />
            <StatsCard
              icon={<Zap className="h-5 w-5" />}
              title="Active Signals"
              value={<AnimatedNumber value={data?.marketPulse.totalSignals || 0} />}
              subtitle="AI-generated"
              trend="neutral"
            />
            <StatsCard
              icon={<Eye className="h-5 w-5" />}
              title="Watchlist"
              value={<AnimatedNumber value={data?.watchlist.length || 0} />}
              subtitle="Assets tracked"
              trend="neutral"
            />
            <StatsCard
              icon={<StickyNote className="h-5 w-5" />}
              title="Notes"
              value={<AnimatedNumber value={data?.notes.length || 0} />}
              subtitle="Active reminders"
              trend="neutral"
            />
          </div>
        </Reveal>

        {/* Bento Grid */}
        <div className="grid gap-6 lg:grid-cols-12" data-agid="dashboard-grid">
          {/* Market Pulse - Large Tile */}
          <Reveal delay={0.2} className="lg:col-span-8 lg:row-span-2">
            <GlassCard className="h-full" data-agid="tile-market-pulse">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold text-white">{t('dashboard.marketPulse')}</h2>
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-400">
                  <Radio className="h-3 w-3 animate-pulse" />
                  Live
                </div>
              </div>
              
              <div className="space-y-4">
                {data?.marketPulse.signals.map((signal, index) => (
                  <motion.div
                    key={signal.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-bold text-white">{signal.asset}</div>
                      <Badge className={
                        signal.signal.includes('BUY') ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                        signal.signal.includes('SELL') ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                        'bg-slate-500/20 text-slate-400 border-slate-500/30'
                      }>
                        {signal.signal}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-white">
                        ${signal.price.toLocaleString()}
                      </div>
                      <div className={`flex items-center gap-1 text-sm ${signal.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {signal.change >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                        {signal.change >= 0 ? '+' : ''}{signal.change}%
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-500">Confidence</div>
                      <div className="text-lg font-semibold text-white">{signal.confidence}%</div>
                      <div className="w-24 h-1.5 bg-slate-700 rounded-full overflow-hidden mt-1">
                        <motion.div
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${signal.confidence}%` }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </Reveal>

          {/* Watchlist - Medium Tile */}
          <Reveal delay={0.3} className="lg:col-span-4">
            <GlassCard data-agid="tile-watchlist">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-blue-400" />
                  <h3 className="font-semibold text-white">{t('dashboard.watchlist')}</h3>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-2">
                {data?.watchlist.slice(0, 4).map((item, index) => (
                  <motion.div
                    key={item.symbol}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                  >
                    <div>
                      <div className="font-medium text-white">{item.symbol}</div>
                      <div className="text-xs text-slate-500">{item.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-white">${item.price}</div>
                      <div className={`text-xs ${item.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {item.change >= 0 ? '+' : ''}{item.change}%
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </Reveal>

          {/* Daily Brief - Medium Tile */}
          <Reveal delay={0.4} className="lg:col-span-4">
            <GlassCard data-agid="tile-brief">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-purple-400" />
                  <h3 className="font-semibold text-white">{t('dashboard.dailyBrief')}</h3>
                </div>
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                  <Clock className="h-3 w-3 mr-1" />
                  {data?.brief.generated}
                </Badge>
              </div>
              
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                {data?.brief.summary}
              </p>
              
              <div className="space-y-2">
                <p className="text-xs text-slate-500 uppercase tracking-wide">Upcoming</p>
                {data?.brief.events.map((event, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-slate-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    {event}
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>

          {/* Notes - Wide Tile */}
          <Reveal delay={0.5} className="lg:col-span-6">
            <GlassCard data-agid="tile-notes">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <StickyNote className="h-5 w-5 text-amber-400" />
                  <h3 className="font-semibold text-white">{t('dashboard.notes')}</h3>
                </div>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Note
                </Button>
              </div>
              
              <div className="space-y-3">
                {data?.notes.map((note, index) => (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5"
                  >
                    <CheckCircle2 className="h-4 w-4 text-slate-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-white">{note.text}</p>
                      <p className="text-xs text-slate-500 mt-1">{note.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </Reveal>

          {/* Quick Actions - Wide Tile */}
          <Reveal delay={0.6} className="lg:col-span-6">
            <GlassCard data-agid="tile-actions">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-5 w-5 text-teal-400" />
                <h3 className="font-semibold text-white">{t('dashboard.quickActions')}</h3>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Rocket, label: 'Lovable', color: 'from-pink-500 to-rose-500', href: 'https://lovable.dev' },
                  { icon: CreditCard, label: 'Stripe', color: 'from-indigo-500 to-purple-500', href: 'https://dashboard.stripe.com' },
                  { icon: BrainCircuit, label: 'OpenRouter', color: 'from-emerald-500 to-teal-500', href: 'https://openrouter.ai' },
                ].map((action, index) => (
                  <motion.a
                    key={action.label}
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br ${action.color} text-white transition-shadow hover:shadow-lg`}
                  >
                    <action.icon className="h-6 w-6 mb-2" />
                    <span className="text-sm font-medium">{action.label}</span>
                    <ExternalLink className="h-3 w-3 mt-1 opacity-60" />
                  </motion.a>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </main>
    </div>
  );
};

// Loading skeleton
const DashboardSkeleton = () => (
  <div className="space-y-8">
    <div className="space-y-2">
      <Skeleton className="h-4 w-32 bg-slate-800" />
      <Skeleton className="h-10 w-64 bg-slate-800" />
    </div>
    <div className="grid gap-4 md:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-32 rounded-2xl bg-slate-800" />
      ))}
    </div>
    <div className="grid gap-6 lg:grid-cols-12">
      <Skeleton className="lg:col-span-8 lg:row-span-2 h-96 rounded-2xl bg-slate-800" />
      <Skeleton className="lg:col-span-4 h-44 rounded-2xl bg-slate-800" />
      <Skeleton className="lg:col-span-4 h-44 rounded-2xl bg-slate-800" />
      <Skeleton className="lg:col-span-6 h-44 rounded-2xl bg-slate-800" />
      <Skeleton className="lg:col-span-6 h-44 rounded-2xl bg-slate-800" />
    </div>
  </div>
);

export default Dashboard;
