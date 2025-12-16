/**
 * Trading Dashboard Page - Main AI Trading Competition Dashboard
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, BarChart3, Globe, Settings2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Leaderboard,
  PortfolioView,
  TradeHistory,
  EquityChart,
  ForexPanel,
  ControlPanel,
} from '@/components/trading';

export default function TradingDashboard() {
  const [selectedModel, setSelectedModel] = useState<string | undefined>();
  const [activeTab, setActiveTab] = useState('nasdaq');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">AI Trading Dashboard</h1>
                <p className="text-sm text-white/50">
                  Autonomous AI Trading Competition
                </p>
              </div>
            </div>

            {/* Tab Navigation */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-white/5">
                <TabsTrigger
                  value="nasdaq"
                  className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-300"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  NASDAQ 100
                </TabsTrigger>
                <TabsTrigger
                  value="forex"
                  className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-300"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Forex / 4X
                </TabsTrigger>
                <TabsTrigger
                  value="control"
                  className="data-[state=active]:bg-violet-500/20 data-[state=active]:text-violet-300"
                >
                  <Settings2 className="w-4 h-4 mr-2" />
                  Control Panel
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* NASDAQ Tab */}
          <TabsContent value="nasdaq" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid gap-6 lg:grid-cols-2"
            >
              {/* Leaderboard */}
              <Leaderboard
                onSelectModel={setSelectedModel}
                selectedModel={selectedModel}
              />

              {/* Portfolio View */}
              {selectedModel ? (
                <PortfolioView signature={selectedModel} />
              ) : (
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-8 flex items-center justify-center">
                  <div className="text-center text-white/40">
                    <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Select an AI model to view portfolio</p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Equity Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <EquityChart />
            </motion.div>

            {/* Trade History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <TradeHistory signature={selectedModel} maxItems={50} />
            </motion.div>
          </TabsContent>

          {/* Forex Tab */}
          <TabsContent value="forex" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ForexPanel />
            </motion.div>

            {/* Coming Soon: Forex AI Trading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-8"
            >
              <div className="text-center">
                <Globe className="w-12 h-12 mx-auto mb-4 text-amber-400" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Forex AI Trading - Coming Soon
                </h3>
                <p className="text-white/60 max-w-md mx-auto">
                  AI-powered forex trading is in development. The infrastructure is ready
                  for integration with OANDA, MetaTrader, and other forex brokers.
                </p>
              </div>
            </motion.div>
          </TabsContent>

          {/* Control Panel Tab */}
          <TabsContent value="control" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid gap-6 lg:grid-cols-2"
            >
              <ControlPanel />

              {/* Instructions */}
              <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-6 space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Bot className="w-5 h-5 text-emerald-400" />
                  Quick Start Guide
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="rounded-xl bg-white/5 p-4">
                    <p className="font-medium text-white mb-2">1. Start MCP Services</p>
                    <code className="block text-xs bg-black/30 p-2 rounded text-emerald-300">
                      ./scripts/start-mcp-services.bat
                    </code>
                  </div>

                  <div className="rounded-xl bg-white/5 p-4">
                    <p className="font-medium text-white mb-2">2. Configure API Keys</p>
                    <p className="text-white/60">
                      Add your OpenAI, Alpha Vantage, and Jina API keys to{' '}
                      <code className="bg-black/30 px-1 rounded">.env</code>
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/5 p-4">
                    <p className="font-medium text-white mb-2">3. Run Simulation</p>
                    <p className="text-white/60">
                      Select a model and click "Start Simulation" to begin AI trading.
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/5 p-4">
                    <p className="font-medium text-white mb-2">4. Monitor Performance</p>
                    <p className="text-white/60">
                      Watch real-time rankings on the NASDAQ 100 tab as AIs compete.
                    </p>
                  </div>
                </div>

                {/* Python Command */}
                <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-4">
                  <p className="text-xs text-white/50 mb-2">
                    Or run simulations directly with Python:
                  </p>
                  <code className="block text-xs text-emerald-300 font-mono">
                    python main.py configs/default_config.json
                  </code>
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 mt-12">
        <div className="container mx-auto px-6 text-center text-sm text-white/40">
          <p>
            AI-Trader Bench — 5 AIs battle for NASDAQ 100 supremacy with zero human input
          </p>
        </div>
      </footer>
    </div>
  );
}
