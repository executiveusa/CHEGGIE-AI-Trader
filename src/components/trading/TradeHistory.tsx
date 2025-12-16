/**
 * Trade History Component - Log of all trades made by AI models
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { History, ArrowUpRight, ArrowDownRight, Filter, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTradeHistory } from '@/hooks/useTradingData';
import { formatCurrency, formatDate, formatModelName, AI_MODELS } from '@/lib/trading-parser';
import type { TradeHistoryEntry } from '@/types/trading';

interface TradeHistoryProps {
  signature?: string; // If provided, filter to single model
  maxItems?: number;
}

const TradeRow = ({
  trade,
  index,
  showModel,
}: {
  trade: TradeHistoryEntry & { model?: string };
  index: number;
  showModel?: boolean;
}) => {
  const isBuy = trade.action === 'buy';
  const modelColor = trade.model
    ? AI_MODELS.find((m) => m.signature === trade.model)?.color
    : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
      className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0"
    >
      {/* Action Icon */}
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          isBuy ? 'bg-emerald-500/20' : 'bg-rose-500/20'
        }`}
      >
        {isBuy ? (
          <ArrowUpRight className="w-5 h-5 text-emerald-400" />
        ) : (
          <ArrowDownRight className="w-5 h-5 text-rose-400" />
        )}
      </div>

      {/* Trade Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white">{trade.symbol}</span>
          <Badge
            className={
              isBuy
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
            }
          >
            {trade.action.toUpperCase()}
          </Badge>
          {showModel && trade.model && (
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: `${modelColor}20`,
                color: modelColor,
              }}
            >
              {formatModelName(trade.model)}
            </span>
          )}
        </div>
        <p className="text-sm text-white/50">
          {trade.amount} shares
          {trade.price && ` @ ${formatCurrency(trade.price)}`}
        </p>
      </div>

      {/* Date & Value */}
      <div className="text-right">
        <p className="text-sm font-medium text-white">{formatDate(trade.date)}</p>
        {trade.totalValue && (
          <p className="text-sm text-white/50">{formatCurrency(trade.totalValue)}</p>
        )}
      </div>
    </motion.div>
  );
};

export function TradeHistory({ signature, maxItems }: TradeHistoryProps) {
  const { trades, loading, error } = useTradeHistory(signature);
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState<'all' | 'buy' | 'sell'>('all');

  const filteredTrades = trades
    .filter((trade) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          trade.symbol.toLowerCase().includes(query) ||
          trade.action.toLowerCase().includes(query) ||
          (trade as any).model?.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .filter((trade) => {
      if (actionFilter === 'all') return true;
      return trade.action === actionFilter;
    })
    .slice(0, maxItems || 100);

  if (loading) {
    return (
      <Card className="border-white/10 bg-slate-950/40">
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" />
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
              <History className="w-5 h-5 text-purple-400" />
              Trade History
              {signature && (
                <span className="text-white/40 font-normal">
                  — {formatModelName(signature)}
                </span>
              )}
            </CardTitle>
            <CardDescription className="text-white/60">
              {filteredTrades.length} trades recorded
            </CardDescription>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input
              placeholder="Search symbol or model..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/10"
            />
          </div>
          <div className="flex gap-1">
            {(['all', 'buy', 'sell'] as const).map((filter) => (
              <Button
                key={filter}
                size="sm"
                variant={actionFilter === filter ? 'default' : 'outline'}
                onClick={() => setActionFilter(filter)}
                className={
                  actionFilter === filter
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                    : 'bg-white/5 border-white/10 text-white/60'
                }
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {filteredTrades.length > 0 ? (
            <div className="space-y-1">
              {filteredTrades.map((trade, index) => (
                <TradeRow
                  key={`${trade.date}-${trade.id}-${trade.symbol}`}
                  trade={trade}
                  index={index}
                  showModel={!signature}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-white/40">
              <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No trades found</p>
              {searchQuery && (
                <p className="text-sm mt-2">Try a different search term</p>
              )}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default TradeHistory;
