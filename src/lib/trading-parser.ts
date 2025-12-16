/**
 * Trading Data Parser - Utilities for parsing JSONL trading data
 */

import type {
  PositionRecord,
  LogEntry,
  AIPerformanceMetrics,
  TradeHistoryEntry,
  EquityPoint,
  EquityCurve,
  PortfolioPosition,
  DailyPrice,
} from '@/types/trading';

// ============================================================================
// JSONL Parsing
// ============================================================================

/**
 * Parse JSONL string into array of records
 */
export function parseJSONL<T>(jsonlString: string): T[] {
  return jsonlString
    .trim()
    .split('\n')
    .filter((line) => line.trim())
    .map((line) => JSON.parse(line) as T);
}

/**
 * Load position records from JSONL file content
 */
export function parsePositionRecords(jsonlContent: string): PositionRecord[] {
  return parseJSONL<PositionRecord>(jsonlContent);
}

/**
 * Load log entries from JSONL file content
 */
export function parseLogEntries(jsonlContent: string): LogEntry[] {
  return parseJSONL<LogEntry>(jsonlContent);
}

// ============================================================================
// Performance Calculations
// ============================================================================

/** Initial cash amount */
const INITIAL_CASH = 10000;

/**
 * Calculate total equity from positions
 * Note: Without live prices, this uses last known prices or estimates
 */
export function calculateEquity(
  positions: Record<string, number>,
  prices?: Record<string, number>
): number {
  let equity = positions.CASH || 0;

  for (const [symbol, quantity] of Object.entries(positions)) {
    if (symbol === 'CASH' || quantity === 0) continue;
    const price = prices?.[symbol] ?? 100; // Fallback to $100 if no price
    equity += quantity * price;
  }

  return equity;
}

/**
 * Calculate return percentage
 */
export function calculateReturn(currentEquity: number, initialCash: number = INITIAL_CASH): number {
  return ((currentEquity - initialCash) / initialCash) * 100;
}

/**
 * Extract trades from position records
 */
export function extractTrades(records: PositionRecord[]): TradeHistoryEntry[] {
  return records
    .filter((record) => record.this_action)
    .map((record) => ({
      id: record.id,
      date: record.date,
      action: record.this_action!.action,
      symbol: record.this_action!.symbol,
      amount: record.this_action!.amount,
    }));
}

/**
 * Calculate win rate from trades
 * A "win" is when the position was closed at a profit
 */
export function calculateWinRate(trades: TradeHistoryEntry[]): number {
  // Simplified: count sells as wins if they happened (proper P&L tracking would need entry prices)
  const sells = trades.filter((t) => t.action === 'sell');
  if (sells.length === 0) return 0;
  // For now, return 50% as placeholder - proper implementation needs price tracking
  return 50;
}

/**
 * Build equity curve from position records
 */
export function buildEquityCurve(
  records: PositionRecord[],
  priceHistory?: Record<string, Record<string, number>> // symbol -> date -> price
): EquityPoint[] {
  const points: EquityPoint[] = [];
  const processedDates = new Set<string>();

  for (const record of records) {
    // Skip duplicate dates (take last entry for each date)
    if (processedDates.has(record.date)) {
      // Remove previous point for this date
      const idx = points.findIndex((p) => p.date === record.date);
      if (idx !== -1) points.splice(idx, 1);
    }
    processedDates.add(record.date);

    // Get prices for this date
    const datePrices: Record<string, number> = {};
    if (priceHistory) {
      for (const [symbol, prices] of Object.entries(priceHistory)) {
        if (prices[record.date]) {
          datePrices[symbol] = prices[record.date];
        }
      }
    }

    const equity = calculateEquity(record.positions, datePrices);
    points.push({ date: record.date, equity });
  }

  // Sort by date
  return points.sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * Calculate performance metrics for an AI model
 */
export function calculatePerformanceMetrics(
  signature: string,
  records: PositionRecord[],
  priceHistory?: Record<string, Record<string, number>>
): AIPerformanceMetrics {
  if (records.length === 0) {
    return {
      modelName: signature,
      signature,
      currentEquity: INITIAL_CASH,
      totalReturn: 0,
      totalReturnDollar: 0,
      tradeCount: 0,
      winRate: 0,
      cashBalance: INITIAL_CASH,
      positionsCount: 0,
      lastTradeDate: 'N/A',
    };
  }

  const latestRecord = records[records.length - 1];
  const trades = extractTrades(records);

  // Get latest prices for equity calculation
  const latestDate = latestRecord.date;
  const latestPrices: Record<string, number> = {};
  if (priceHistory) {
    for (const [symbol, prices] of Object.entries(priceHistory)) {
      if (prices[latestDate]) {
        latestPrices[symbol] = prices[latestDate];
      }
    }
  }

  const currentEquity = calculateEquity(latestRecord.positions, latestPrices);
  const totalReturn = calculateReturn(currentEquity);
  const cashBalance = latestRecord.positions.CASH || 0;
  const positionsCount = Object.entries(latestRecord.positions).filter(
    ([symbol, qty]) => symbol !== 'CASH' && qty > 0
  ).length;

  const lastTrade = trades[trades.length - 1];

  return {
    modelName: formatModelName(signature),
    signature,
    currentEquity,
    totalReturn,
    totalReturnDollar: currentEquity - INITIAL_CASH,
    tradeCount: trades.length,
    winRate: calculateWinRate(trades),
    cashBalance,
    positionsCount,
    lastTradeDate: lastTrade?.date || latestRecord.date,
  };
}

/**
 * Get portfolio positions with details
 */
export function getPortfolioPositions(
  positions: Record<string, number>,
  prices?: Record<string, number>
): PortfolioPosition[] {
  const totalEquity = calculateEquity(positions, prices);
  const result: PortfolioPosition[] = [];

  for (const [symbol, quantity] of Object.entries(positions)) {
    if (quantity === 0) continue;

    const currentPrice = symbol === 'CASH' ? 1 : (prices?.[symbol] ?? 100);
    const currentValue = symbol === 'CASH' ? quantity : quantity * currentPrice;
    const percentOfPortfolio = (currentValue / totalEquity) * 100;

    result.push({
      symbol,
      quantity,
      currentPrice: symbol === 'CASH' ? undefined : currentPrice,
      currentValue,
      percentOfPortfolio,
    });
  }

  // Sort by value descending
  return result.sort((a, b) => (b.currentValue ?? 0) - (a.currentValue ?? 0));
}

// ============================================================================
// Formatting Utilities
// ============================================================================

/**
 * Format model signature to display name
 */
export function formatModelName(signature: string): string {
  const nameMap: Record<string, string> = {
    'gpt-5': 'GPT-5',
    'claude-3.7-sonnet': 'Claude 3.7 Sonnet',
    'deepseek-chat-v3.1': 'DeepSeek v3.1',
    'qwen3-max': 'Qwen3 Max',
    'gemini-2.5-flash': 'Gemini 2.5 Flash',
  };
  return nameMap[signature] || signature;
}

/**
 * Format currency value
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format percentage
 */
export function formatPercent(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

/**
 * Format date for display
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

// ============================================================================
// Daily Price Parsing
// ============================================================================

/**
 * Parse daily prices JSON file
 * Format: { "Time Series (Daily)": { "2025-01-01": { open, high, low, close, volume } } }
 */
export function parseDailyPrices(jsonContent: string): DailyPrice[] {
  const data = JSON.parse(jsonContent);
  const timeSeries = data['Time Series (Daily)'] || data;

  return Object.entries(timeSeries).map(([date, values]: [string, any]) => ({
    date,
    open: parseFloat(values['1. open'] || values.open || 0),
    high: parseFloat(values['2. high'] || values.high || 0),
    low: parseFloat(values['3. low'] || values.low || 0),
    close: parseFloat(values['4. close'] || values.close || 0),
    volume: parseInt(values['5. volume'] || values.volume || 0),
  }));
}

/**
 * Build price lookup map from daily prices
 */
export function buildPriceLookup(
  symbol: string,
  prices: DailyPrice[]
): Record<string, number> {
  const lookup: Record<string, number> = {};
  for (const price of prices) {
    lookup[price.date] = price.close;
  }
  return lookup;
}

// ============================================================================
// AI Model Registry
// ============================================================================

/** All available AI models */
export const AI_MODELS = [
  { signature: 'gpt-5', name: 'GPT-5', color: '#10B981' },
  { signature: 'claude-3.7-sonnet', name: 'Claude 3.7 Sonnet', color: '#8B5CF6' },
  { signature: 'deepseek-chat-v3.1', name: 'DeepSeek v3.1', color: '#3B82F6' },
  { signature: 'qwen3-max', name: 'Qwen3 Max', color: '#F59E0B' },
  { signature: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', color: '#EF4444' },
] as const;

export type AIModelSignature = (typeof AI_MODELS)[number]['signature'];
