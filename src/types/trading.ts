/**
 * Trading Types - TypeScript interfaces for AI-Trader Bench
 */

// ============================================================================
// Core Trading Types (NASDAQ)
// ============================================================================

/** Individual trade action */
export interface TradeAction {
  action: 'buy' | 'sell';
  symbol: string;
  amount: number;
}

/** Position record from position.jsonl */
export interface PositionRecord {
  date: string;
  id: number;
  this_action?: TradeAction;
  positions: Record<string, number>; // symbol -> quantity, includes CASH
}

/** AI Model configuration */
export interface AIModelConfig {
  name: string;
  basemodel: string;
  signature: string;
  enabled: boolean;
}

/** Trading configuration */
export interface TradingConfig {
  agent_type: string;
  date_range: {
    init_date: string;
    end_date: string;
  };
  models: AIModelConfig[];
  agent_config: {
    max_steps: number;
    max_retries: number;
    base_delay: number;
    initial_cash: number;
  };
  log_config: {
    log_path: string;
  };
}

/** Log entry from log.jsonl */
export interface LogEntry {
  timestamp: string;
  signature: string;
  new_messages: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}

/** Computed performance metrics for an AI model */
export interface AIPerformanceMetrics {
  modelName: string;
  signature: string;
  currentEquity: number;
  totalReturn: number; // percentage
  totalReturnDollar: number;
  tradeCount: number;
  winRate: number; // percentage
  cashBalance: number;
  positionsCount: number;
  lastTradeDate: string;
  rank?: number;
}

/** Portfolio position with current value */
export interface PortfolioPosition {
  symbol: string;
  quantity: number;
  currentPrice?: number;
  currentValue?: number;
  percentOfPortfolio?: number;
}

/** Trade history entry for display */
export interface TradeHistoryEntry {
  id: number;
  date: string;
  action: 'buy' | 'sell';
  symbol: string;
  amount: number;
  price?: number;
  totalValue?: number;
  reasoning?: string;
}

/** Daily equity point for charting */
export interface EquityPoint {
  date: string;
  equity: number;
}

/** Equity curve for an AI model */
export interface EquityCurve {
  modelName: string;
  signature: string;
  points: EquityPoint[];
}

// ============================================================================
// Stock Price Types
// ============================================================================

/** Daily price data (OHLCV) */
export interface DailyPrice {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

/** Stock with price history */
export interface StockData {
  symbol: string;
  prices: DailyPrice[];
}

// ============================================================================
// Forex Types
// ============================================================================

/** Forex currency pair */
export type ForexPair = 
  | 'EUR/USD' | 'GBP/USD' | 'USD/JPY' | 'USD/CHF'
  | 'AUD/USD' | 'USD/CAD' | 'NZD/USD' | 'EUR/GBP'
  | 'EUR/JPY' | 'GBP/JPY' | 'AUD/JPY' | 'CAD/JPY';

/** Forex rate data */
export interface ForexRate {
  pair: ForexPair;
  timestamp: string;
  bid: number;
  ask: number;
  mid: number;
}

/** Forex OHLC candle */
export interface ForexCandle {
  pair: ForexPair;
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

/** Forex position */
export interface ForexPosition {
  pair: ForexPair;
  direction: 'long' | 'short';
  size: number; // lots
  entryPrice: number;
  currentPrice?: number;
  unrealizedPnL?: number;
}

/** Forex trade action */
export interface ForexTradeAction {
  action: 'buy' | 'sell';
  pair: ForexPair;
  size: number;
  price: number;
}

// ============================================================================
// MCP Service Types
// ============================================================================

/** MCP service status */
export interface MCPServiceStatus {
  name: string;
  port: number;
  status: 'running' | 'stopped' | 'error';
  lastCheck: string;
  errorMessage?: string;
}

/** Available MCP services */
export type MCPServiceName = 'math' | 'stock_local' | 'search' | 'trade' | 'forex';

/** MCP service configuration */
export interface MCPServiceConfig {
  name: MCPServiceName;
  port: number;
  transport: 'streamable_http';
  url: string;
}

// ============================================================================
// Dashboard State Types
// ============================================================================

/** Active market tab */
export type MarketTab = 'nasdaq' | 'forex';

/** Dashboard filter state */
export interface DashboardFilters {
  selectedModels: string[];
  dateRange: {
    start: string;
    end: string;
  };
  marketTab: MarketTab;
}

/** Simulation control state */
export interface SimulationState {
  isRunning: boolean;
  currentModel?: string;
  currentDate?: string;
  progress: number; // 0-100
  startedAt?: string;
}
