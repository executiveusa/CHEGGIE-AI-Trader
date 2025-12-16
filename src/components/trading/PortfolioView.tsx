/**
 * Portfolio View Component - Detailed position breakdown for an AI model
 */

import { motion } from 'framer-motion';
import { PieChart, Wallet, TrendingUp, TrendingDown, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { usePortfolio } from '@/hooks/useTradingData';
import { formatCurrency, formatPercent, formatModelName } from '@/lib/trading-parser';
import type { PortfolioPosition } from '@/types/trading';

interface PortfolioViewProps {
  signature: string;
}

const PositionCard = ({
  position,
  index,
}: {
  position: PortfolioPosition;
  index: number;
}) => {
  const isCash = position.symbol === 'CASH';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            isCash ? 'bg-emerald-500/20' : 'bg-blue-500/20'
          }`}
        >
          {isCash ? (
            <Wallet className="w-5 h-5 text-emerald-400" />
          ) : (
            <span className="text-sm font-bold text-blue-400">
              {position.symbol.slice(0, 2)}
            </span>
          )}
        </div>
        <div>
          <p className="font-medium text-white">{position.symbol}</p>
          {!isCash && (
            <p className="text-sm text-white/50">
              {position.quantity} shares
              {position.currentPrice && ` @ ${formatCurrency(position.currentPrice)}`}
            </p>
          )}
        </div>
      </div>

      <div className="text-right">
        <p className="font-semibold text-white">
          {formatCurrency(position.currentValue || 0)}
        </p>
        <div className="flex items-center gap-1 justify-end">
          <Progress
            value={position.percentOfPortfolio || 0}
            className="w-16 h-1.5"
          />
          <span className="text-xs text-white/50 w-10 text-right">
            {(position.percentOfPortfolio || 0).toFixed(1)}%
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export function PortfolioView({ signature }: PortfolioViewProps) {
  const { portfolio, loading, error } = usePortfolio(signature);

  if (loading) {
    return (
      <Card className="border-white/10 bg-slate-950/40">
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !portfolio) {
    return (
      <Card className="border-white/10 bg-slate-950/40">
        <CardContent className="p-6">
          <div className="text-center py-8 text-white/40">
            <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No portfolio data available</p>
            {signature && (
              <p className="text-sm mt-2">Model: {formatModelName(signature)}</p>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalValue = portfolio.reduce((sum, p) => sum + (p.currentValue || 0), 0);
  const cashPosition = portfolio.find((p) => p.symbol === 'CASH');
  const stockPositions = portfolio.filter((p) => p.symbol !== 'CASH' && p.quantity > 0);
  const cashPercent = cashPosition ? (cashPosition.percentOfPortfolio || 0) : 0;

  return (
    <Card className="border-white/10 bg-slate-950/40">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <PieChart className="w-5 h-5 text-blue-400" />
          Portfolio: {formatModelName(signature)}
        </CardTitle>
        <CardDescription className="text-white/60">
          Current positions and allocation breakdown
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="rounded-xl bg-white/5 p-4 text-center">
            <p className="text-sm text-white/50 mb-1">Total Value</p>
            <p className="text-xl font-bold text-white">{formatCurrency(totalValue)}</p>
          </div>
          <div className="rounded-xl bg-white/5 p-4 text-center">
            <p className="text-sm text-white/50 mb-1">Cash</p>
            <p className="text-xl font-bold text-emerald-400">
              {cashPercent.toFixed(1)}%
            </p>
          </div>
          <div className="rounded-xl bg-white/5 p-4 text-center">
            <p className="text-sm text-white/50 mb-1">Positions</p>
            <p className="text-xl font-bold text-blue-400">{stockPositions.length}</p>
          </div>
        </div>

        {/* Position List */}
        <div className="rounded-xl bg-white/5 p-4">
          <h4 className="text-sm font-medium text-white/70 mb-3 uppercase tracking-wider">
            Holdings
          </h4>
          <div className="space-y-1">
            {portfolio.map((position, index) => (
              <PositionCard key={position.symbol} position={position} index={index} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PortfolioView;
