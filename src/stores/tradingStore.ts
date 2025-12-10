import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface TradingSignal {
  id: string;
  symbol: string;
  action: 'BUY' | 'SELL' | 'HOLD';
  price: number;
  confidence: number;
  timestamp: Date;
  reason: string;
  aiModel: string;
}

export interface PortfolioPosition {
  symbol: string;
  quantity: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
  aiRecommendation?: string;
}

export interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: number;
  timestamp: Date;
}

interface TradingStore {
  // Trading Signals
  signals: TradingSignal[];
  addSignal: (signal: TradingSignal) => void;
  removeSignal: (id: string) => void;
  clearSignals: () => void;

  // Portfolio
  positions: PortfolioPosition[];
  addPosition: (position: PortfolioPosition) => void;
  updatePosition: (symbol: string, updates: Partial<PortfolioPosition>) => void;
  removePosition: (symbol: string) => void;

  // Market Data
  marketData: Record<string, MarketData>;
  updateMarketData: (symbol: string, data: MarketData) => void;

  // AI Analytics
  aiPredictions: Record<string, { prediction: number; confidence: number; timestamp: Date }>;
  updateAIPrediction: (symbol: string, prediction: number, confidence: number) => void;

  // Portfolio Stats
  totalValue: number;
  totalPnL: number;
  totalPnLPercent: number;
  calculatePortfolioStats: () => void;
}

export const useTradingStore = create<TradingStore>()(
  devtools(
    persist(
      (set, get) => ({
        signals: [],
        positions: [],
        marketData: {},
        aiPredictions: {},
        totalValue: 0,
        totalPnL: 0,
        totalPnLPercent: 0,

        addSignal: (signal) =>
          set((state) => ({
            signals: [signal, ...state.signals].slice(0, 50), // Keep last 50
          })),

        removeSignal: (id) =>
          set((state) => ({
            signals: state.signals.filter((s) => s.id !== id),
          })),

        clearSignals: () => set({ signals: [] }),

        addPosition: (position) =>
          set((state) => ({
            positions: [...state.positions, position],
          })),

        updatePosition: (symbol, updates) =>
          set((state) => ({
            positions: state.positions.map((p) =>
              p.symbol === symbol ? { ...p, ...updates } : p
            ),
          })),

        removePosition: (symbol) =>
          set((state) => ({
            positions: state.positions.filter((p) => p.symbol !== symbol),
          })),

        updateMarketData: (symbol, data) =>
          set((state) => ({
            marketData: {
              ...state.marketData,
              [symbol]: data,
            },
          })),

        updateAIPrediction: (symbol, prediction, confidence) =>
          set((state) => ({
            aiPredictions: {
              ...state.aiPredictions,
              [symbol]: {
                prediction,
                confidence,
                timestamp: new Date(),
              },
            },
          })),

        calculatePortfolioStats: () => {
          const state = get();
          const totalValue = state.positions.reduce(
            (sum, pos) => sum + pos.currentPrice * pos.quantity,
            0
          );
          const totalPnL = state.positions.reduce((sum, pos) => sum + pos.pnl, 0);
          const totalPnLPercent = totalValue > 0 ? (totalPnL / (totalValue - totalPnL)) * 100 : 0;

          set({
            totalValue,
            totalPnL,
            totalPnLPercent,
          });
        },
      }),
      {
        name: 'cheggie-trading-store',
      }
    )
  )
);
