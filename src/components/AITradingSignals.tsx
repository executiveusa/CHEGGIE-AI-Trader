import React, { useEffect } from 'react';
import { useTradingStore } from '@/stores/tradingStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Brain } from 'lucide-react';

export const AITradingSignals: React.FC = () => {
  const { signals, addSignal } = useTradingStore();

  // Simulate AI signal generation (replace with real AI backend)
  useEffect(() => {
    const interval = setInterval(() => {
      const symbols = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN'];
      const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
      const confidence = 0.7 + Math.random() * 0.3;
      const action = Math.random() > 0.5 ? 'BUY' : 'SELL';

      const signal = {
        id: Date.now().toString(),
        symbol: randomSymbol,
        action: action as 'BUY' | 'SELL' | 'HOLD',
        price: 100 + Math.random() * 50,
        confidence,
        timestamp: new Date(),
        reason: `AI model detected ${action === 'BUY' ? 'bullish' : 'bearish'} momentum pattern`,
        aiModel: 'Gemini 2.0 Financial Analyst',
      };

      addSignal(signal);
    }, 15000); // Generate signal every 15 seconds

    return () => clearInterval(interval);
  }, [addSignal]);

  return (
    <Card className="col-span-full lg:col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-blue-600" />
          AI Trading Signals
        </CardTitle>
        <CardDescription>Real-time AI-generated trading recommendations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {signals.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No signals yet. Waiting for AI analysis...</p>
            </div>
          ) : (
            signals.slice(0, 10).map((signal) => (
              <div
                key={signal.id}
                className="flex items-start justify-between p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm">{signal.symbol}</span>
                    <Badge
                      variant={signal.action === 'BUY' ? 'default' : 'destructive'}
                      className="text-xs"
                    >
                      {signal.action}
                    </Badge>
                    <span className="text-xs font-semibold text-blue-600">
                      {(signal.confidence * 100).toFixed(0)}% confidence
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{signal.reason}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span>Price: ${signal.price.toFixed(2)}</span>
                    <span>{signal.timestamp.toLocaleTimeString()}</span>
                  </div>
                </div>
                <div className="ml-2">
                  {signal.action === 'BUY' ? (
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-600" />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
