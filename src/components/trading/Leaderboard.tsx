/**
 * Leaderboard Component - AI Trading Competition Rankings
 */

import { motion } from 'framer-motion';
import { Trophy, TrendingUp, TrendingDown, Activity, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLeaderboard } from '@/hooks/useTradingData';
import { formatCurrency, formatPercent, AI_MODELS } from '@/lib/trading-parser';
import type { AIPerformanceMetrics } from '@/types/trading';

interface LeaderboardProps {
  onSelectModel?: (signature: string) => void;
  selectedModel?: string;
}

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return '🥇';
    case 2:
      return '🥈';
    case 3:
      return '🥉';
    default:
      return `#${rank}`;
  }
};

const getModelColor = (signature: string): string => {
  return AI_MODELS.find((m) => m.signature === signature)?.color || '#6B7280';
};

const LeaderboardRow = ({
  metrics,
  index,
  onSelect,
  isSelected,
}: {
  metrics: AIPerformanceMetrics;
  index: number;
  onSelect?: () => void;
  isSelected?: boolean;
}) => {
  const isPositive = metrics.totalReturn >= 0;
  const modelColor = getModelColor(metrics.signature);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onSelect}
      className={`
        relative flex items-center gap-4 rounded-xl p-4 transition-all cursor-pointer
        ${isSelected 
          ? 'bg-white/10 border-2 border-emerald-500/50 shadow-lg shadow-emerald-500/10' 
          : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
        }
      `}
    >
      {/* Rank */}
      <div className="flex-shrink-0 w-12 text-center">
        <span className="text-2xl">{getRankIcon(metrics.rank || index + 1)}</span>
      </div>

      {/* Model Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: modelColor }}
          />
          <span className="font-semibold text-white truncate">
            {metrics.modelName}
          </span>
        </div>
        <div className="flex items-center gap-3 mt-1 text-sm text-white/60">
          <span className="flex items-center gap-1">
            <Activity className="w-3 h-3" />
            {metrics.tradeCount} trades
          </span>
          <span className="flex items-center gap-1">
            <DollarSign className="w-3 h-3" />
            {formatCurrency(metrics.cashBalance)} cash
          </span>
        </div>
      </div>

      {/* Performance */}
      <div className="flex-shrink-0 text-right">
        <div className="flex items-center gap-1 justify-end">
          {isPositive ? (
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          ) : (
            <TrendingDown className="w-4 h-4 text-rose-400" />
          )}
          <span
            className={`text-lg font-bold ${
              isPositive ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {formatPercent(metrics.totalReturn)}
          </span>
        </div>
        <div className="text-sm text-white/60">
          {formatCurrency(metrics.currentEquity)}
        </div>
      </div>
    </motion.div>
  );
};

export function Leaderboard({ onSelectModel, selectedModel }: LeaderboardProps) {
  const { leaderboard, loading, error } = useLeaderboard();

  if (loading) {
    return (
      <Card className="border-white/10 bg-slate-950/40">
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-white/10 bg-slate-950/40">
        <CardContent className="p-6">
          <div className="text-center py-12 text-rose-400">
            <p>Failed to load leaderboard</p>
            <p className="text-sm text-white/40 mt-2">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-white/10 bg-slate-950/40">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Trophy className="w-5 h-5 text-amber-400" />
              AI Trading Leaderboard
            </CardTitle>
            <CardDescription className="text-white/60">
              5 AI models competing on NASDAQ 100 with $10,000 each
            </CardDescription>
          </div>
          <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
            Live Rankings
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {leaderboard.map((metrics, index) => (
          <LeaderboardRow
            key={metrics.signature}
            metrics={metrics}
            index={index}
            onSelect={() => onSelectModel?.(metrics.signature)}
            isSelected={selectedModel === metrics.signature}
          />
        ))}

        {leaderboard.length === 0 && (
          <div className="text-center py-8 text-white/40">
            <p>No trading data available yet</p>
            <p className="text-sm mt-2">Run a simulation to see results</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default Leaderboard;
