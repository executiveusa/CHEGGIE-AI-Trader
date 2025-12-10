import React, { useState } from 'react';
import { TradingViewChart } from '@/components/TradingViewChart';
import { AITradingSignals } from '@/components/AITradingSignals';
import { PortfolioPerformance } from '@/components/PortfolioPerformance';
import { AIAnalytics } from '@/components/AIAnalytics';
import { useTradingStore } from '@/stores/tradingStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  AlertCircle,
  RefreshCw,
  Download,
} from 'lucide-react';

type TimeRange = '1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL';

export const FinancialDashboard: React.FC = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL');
  const [timeRange, setTimeRange] = useState<TimeRange>('1M');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const symbols = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN', 'NVDA', 'META', 'AMD'];
  const positions = useTradingStore((state) => state.positions);
  const signals = useTradingStore((state) => state.signals);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const totalValue = positions.reduce((sum, pos) => sum + pos.currentPrice * pos.quantity, 0);
  const totalPnL = positions.reduce((sum, pos) => sum + pos.pnl, 0);
  const pnlPercent = totalValue > 0 ? (totalPnL / (totalValue - totalPnL)) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Financial Dashboard</h1>
          <p className="text-gray-600 mt-1">AI-Powered Trading Platform</p>
        </div>
        <Button
          onClick={handleRefresh}
          variant="outline"
          size="sm"
          disabled={isRefreshing}
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${totalValue.toFixed(2)}</p>
            <p className="text-xs text-gray-500 mt-1">
              {positions.length} position{positions.length !== 1 ? 's' : ''}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total P&L</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${totalPnL.toFixed(2)}
            </p>
            <p className={`text-xs mt-1 ${totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {pnlPercent.toFixed(2)}% {totalPnL >= 0 ? '↑' : '↓'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Signals</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{signals.length}</p>
            <p className="text-xs text-gray-500 mt-1">AI-generated recommendations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">AI Health</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge className="bg-green-100 text-green-800">Optimal</Badge>
            <p className="text-xs text-gray-500 mt-2">All systems operational</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart Section */}
      <Card className="col-span-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>Market Analysis</CardTitle>
            <CardDescription>TradingView professional charting with AI predictions</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select value={selectedSymbol} onValueChange={setSelectedSymbol}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {symbols.map((sym) => (
                  <SelectItem key={sym} value={sym}>
                    {sym}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={timeRange} onValueChange={(v) => setTimeRange(v as TimeRange)}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1D">1D</SelectItem>
                <SelectItem value="1W">1W</SelectItem>
                <SelectItem value="1M">1M</SelectItem>
                <SelectItem value="3M">3M</SelectItem>
                <SelectItem value="1Y">1Y</SelectItem>
                <SelectItem value="ALL">ALL</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <TradingViewChart symbol={selectedSymbol} height={450} />
        </CardContent>
      </Card>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Portfolio Performance */}
        <PortfolioPerformance />

        {/* AI Trading Signals */}
        <AITradingSignals />
      </div>

      {/* AI Analytics */}
      <AIAnalytics />

      {/* Risk Management & Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-500" />
            Risk Management & Alerts
          </CardTitle>
          <CardDescription>Real-time monitoring and risk warnings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
              <div className="flex-1">
                <p className="font-medium text-sm text-yellow-900">High Volatility Alert</p>
                <p className="text-xs text-yellow-800 mt-1">
                  TSLA showing 15% intraday volatility. Consider adjusting stop losses.
                </p>
              </div>
              <Button size="sm" variant="ghost" className="text-yellow-700">
                Review
              </Button>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex-1">
                <p className="font-medium text-sm text-blue-900">Portfolio Rebalancing</p>
                <p className="text-xs text-blue-800 mt-1">
                  AI suggests rebalancing to maintain target allocation. Review recommendation.
                </p>
              </div>
              <Button size="sm" variant="ghost" className="text-blue-700">
                View
              </Button>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
              <div className="flex-1">
                <p className="font-medium text-sm text-green-900">Profitable Opportunity</p>
                <p className="text-xs text-green-800 mt-1">
                  AAPL forming bullish pattern. AI confidence: 87%
                </p>
              </div>
              <Button size="sm" variant="ghost" className="text-green-700">
                Execute
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export & Download */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleTimeString()}
        </p>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>
    </div>
  );
};
