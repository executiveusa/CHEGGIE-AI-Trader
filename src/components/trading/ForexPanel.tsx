/**
 * Forex Panel Component - Real-time forex rates and charts
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, RefreshCw, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForexRates, useForexChart } from '@/hooks/useTradingData';
import { formatForexRate, isDemoMode, FOREX_PAIRS, calculatePips } from '@/api/forex';
import type { ForexPair, ForexRate } from '@/types/trading';

const ForexRateCard = ({
  rate,
  index,
  onClick,
  isSelected,
}: {
  rate: ForexRate;
  index: number;
  onClick: () => void;
  isSelected: boolean;
}) => {
  // Calculate change (mock for demo)
  const change = Math.random() > 0.5 ? 0.0012 : -0.0008;
  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className={`
        p-4 rounded-xl cursor-pointer transition-all
        ${isSelected 
          ? 'bg-amber-500/20 border-2 border-amber-500/50' 
          : 'bg-white/5 border border-white/10 hover:bg-white/10'
        }
      `}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-white">{rate.pair}</span>
        <div className="flex items-center gap-1">
          {isPositive ? (
            <TrendingUp className="w-3 h-3 text-emerald-400" />
          ) : (
            <TrendingDown className="w-3 h-3 text-rose-400" />
          )}
          <span
            className={`text-xs ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}
          >
            {isPositive ? '+' : ''}{(change * 100).toFixed(2)}%
          </span>
        </div>
      </div>
      <div className="text-2xl font-bold text-white">
        {formatForexRate(rate.mid, rate.pair)}
      </div>
      <div className="flex items-center gap-2 mt-2 text-xs text-white/50">
        <span>Bid: {formatForexRate(rate.bid, rate.pair)}</span>
        <span>•</span>
        <span>Ask: {formatForexRate(rate.ask, rate.pair)}</span>
      </div>
    </motion.div>
  );
};

const ForexMiniChart = ({ pair }: { pair: ForexPair }) => {
  const { candles, loading } = useForexChart(pair);

  if (loading || candles.length === 0) {
    return (
      <div className="h-32 flex items-center justify-center text-white/40">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-500" />
      </div>
    );
  }

  // Simple sparkline using SVG
  const prices = candles.slice(-30).map((c) => c.close);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;

  const points = prices
    .map((price, i) => {
      const x = (i / (prices.length - 1)) * 100;
      const y = 100 - ((price - min) / range) * 100;
      return `${x},${y}`;
    })
    .join(' ');

  const isUp = prices[prices.length - 1] >= prices[0];

  return (
    <div className="h-32 w-full">
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`gradient-${pair}`} x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={isUp ? '#10B981' : '#EF4444'}
              stopOpacity="0.3"
            />
            <stop
              offset="100%"
              stopColor={isUp ? '#10B981' : '#EF4444'}
              stopOpacity="0"
            />
          </linearGradient>
        </defs>

        {/* Area fill */}
        <polygon
          points={`0,100 ${points} 100,100`}
          fill={`url(#gradient-${pair})`}
        />

        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke={isUp ? '#10B981' : '#EF4444'}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
};

export function ForexPanel() {
  const { rates, loading, error, refresh } = useForexRates();
  const [selectedPair, setSelectedPair] = useState<ForexPair>('EUR/USD');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refresh();
    setIsRefreshing(false);
  };

  return (
    <Card className="border-white/10 bg-slate-950/40">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Globe className="w-5 h-5 text-amber-400" />
              Forex / 4X Trading
            </CardTitle>
            <CardDescription className="text-white/60">
              Real-time currency exchange rates
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {isDemoMode() && (
              <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                Demo Mode
              </Badge>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="bg-white/5 border-white/10"
            >
              <RefreshCw
                className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`}
              />
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500" />
          </div>
        ) : error ? (
          <div className="text-center py-8 text-rose-400">
            <p>Failed to load forex rates</p>
            <p className="text-sm text-white/40 mt-2">{error}</p>
          </div>
        ) : (
          <>
            {/* Rate Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {rates.map((rate, index) => (
                <ForexRateCard
                  key={rate.pair}
                  rate={rate}
                  index={index}
                  onClick={() => setSelectedPair(rate.pair)}
                  isSelected={selectedPair === rate.pair}
                />
              ))}
            </div>

            {/* Selected Pair Chart */}
            <div className="rounded-xl bg-white/5 p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-white">
                    {selectedPair}
                  </h4>
                  <p className="text-sm text-white/50">30-day price chart</p>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-amber-400" />
                  <span className="text-xl font-bold text-white">
                    {formatForexRate(
                      rates.find((r) => r.pair === selectedPair)?.mid || 0,
                      selectedPair
                    )}
                  </span>
                </div>
              </div>
              <ForexMiniChart pair={selectedPair} />
            </div>

            {/* Info Banner */}
            {isDemoMode() && (
              <div className="mt-4 rounded-xl bg-amber-500/10 border border-amber-500/20 p-4">
                <p className="text-sm text-amber-200">
                  <strong>Demo Mode:</strong> Add{' '}
                  <code className="bg-black/20 px-1 rounded">
                    VITE_ALPHA_VANTAGE_API_KEY
                  </code>{' '}
                  to your environment for live forex rates.
                </p>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default ForexPanel;
