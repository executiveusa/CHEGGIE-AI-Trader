/**
 * Forex API Client - Alpha Vantage FX Integration
 */

import type { ForexPair, ForexRate, ForexCandle } from '@/types/trading';

// ============================================================================
// Configuration
// ============================================================================

const ALPHA_VANTAGE_BASE_URL = 'https://www.alphavantage.co/query';

/**
 * Get Alpha Vantage API key from environment or demo mode
 */
function getApiKey(): string {
  return import.meta.env.VITE_ALPHA_VANTAGE_API_KEY || 'demo';
}

// ============================================================================
// Popular Forex Pairs
// ============================================================================

export const FOREX_PAIRS: ForexPair[] = [
  'EUR/USD',
  'GBP/USD',
  'USD/JPY',
  'USD/CHF',
  'AUD/USD',
  'USD/CAD',
  'NZD/USD',
  'EUR/GBP',
  'EUR/JPY',
  'GBP/JPY',
  'AUD/JPY',
  'CAD/JPY',
];

/**
 * Convert ForexPair to Alpha Vantage format
 */
function pairToSymbols(pair: ForexPair): { from: string; to: string } {
  const [from, to] = pair.split('/');
  return { from, to };
}

// ============================================================================
// API Functions
// ============================================================================

/**
 * Fetch real-time exchange rate for a currency pair
 */
export async function getExchangeRate(pair: ForexPair): Promise<ForexRate> {
  const { from, to } = pairToSymbols(pair);
  const apiKey = getApiKey();

  const url = new URL(ALPHA_VANTAGE_BASE_URL);
  url.searchParams.set('function', 'CURRENCY_EXCHANGE_RATE');
  url.searchParams.set('from_currency', from);
  url.searchParams.set('to_currency', to);
  url.searchParams.set('apikey', apiKey);

  const response = await fetch(url.toString());
  const data = await response.json();

  if (data['Error Message'] || data['Note']) {
    throw new Error(data['Error Message'] || 'API rate limit reached');
  }

  const rateData = data['Realtime Currency Exchange Rate'];
  if (!rateData) {
    throw new Error('Invalid response from Alpha Vantage');
  }

  const bid = parseFloat(rateData['8. Bid Price'] || rateData['5. Exchange Rate']);
  const ask = parseFloat(rateData['9. Ask Price'] || rateData['5. Exchange Rate']);
  const mid = (bid + ask) / 2;

  return {
    pair,
    timestamp: rateData['6. Last Refreshed'],
    bid,
    ask,
    mid,
  };
}

/**
 * Fetch forex OHLC candle data (intraday)
 */
export async function getForexIntraday(
  pair: ForexPair,
  interval: '1min' | '5min' | '15min' | '30min' | '60min' = '15min'
): Promise<ForexCandle[]> {
  const { from, to } = pairToSymbols(pair);
  const apiKey = getApiKey();

  const url = new URL(ALPHA_VANTAGE_BASE_URL);
  url.searchParams.set('function', 'FX_INTRADAY');
  url.searchParams.set('from_symbol', from);
  url.searchParams.set('to_symbol', to);
  url.searchParams.set('interval', interval);
  url.searchParams.set('outputsize', 'compact');
  url.searchParams.set('apikey', apiKey);

  const response = await fetch(url.toString());
  const data = await response.json();

  if (data['Error Message'] || data['Note']) {
    throw new Error(data['Error Message'] || 'API rate limit reached');
  }

  const timeSeries = data[`Time Series FX (${interval})`];
  if (!timeSeries) {
    throw new Error('Invalid response from Alpha Vantage');
  }

  return Object.entries(timeSeries).map(([timestamp, values]: [string, any]) => ({
    pair,
    timestamp,
    open: parseFloat(values['1. open']),
    high: parseFloat(values['2. high']),
    low: parseFloat(values['3. low']),
    close: parseFloat(values['4. close']),
  }));
}

/**
 * Fetch forex daily OHLC data
 */
export async function getForexDaily(pair: ForexPair): Promise<ForexCandle[]> {
  const { from, to } = pairToSymbols(pair);
  const apiKey = getApiKey();

  const url = new URL(ALPHA_VANTAGE_BASE_URL);
  url.searchParams.set('function', 'FX_DAILY');
  url.searchParams.set('from_symbol', from);
  url.searchParams.set('to_symbol', to);
  url.searchParams.set('outputsize', 'compact');
  url.searchParams.set('apikey', apiKey);

  const response = await fetch(url.toString());
  const data = await response.json();

  if (data['Error Message'] || data['Note']) {
    throw new Error(data['Error Message'] || 'API rate limit reached');
  }

  const timeSeries = data['Time Series FX (Daily)'];
  if (!timeSeries) {
    throw new Error('Invalid response from Alpha Vantage');
  }

  return Object.entries(timeSeries).map(([timestamp, values]: [string, any]) => ({
    pair,
    timestamp,
    open: parseFloat(values['1. open']),
    high: parseFloat(values['2. high']),
    low: parseFloat(values['3. low']),
    close: parseFloat(values['4. close']),
  }));
}

/**
 * Fetch multiple exchange rates at once
 */
export async function getMultipleRates(pairs: ForexPair[]): Promise<ForexRate[]> {
  // Rate limit: fetch sequentially with small delay
  const rates: ForexRate[] = [];
  
  for (const pair of pairs) {
    try {
      const rate = await getExchangeRate(pair);
      rates.push(rate);
      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 250));
    } catch (error) {
      console.warn(`Failed to fetch ${pair}:`, error);
    }
  }

  return rates;
}

// ============================================================================
// Mock Data (for demo mode)
// ============================================================================

/**
 * Generate mock forex rates for demo mode
 */
export function getMockForexRates(): ForexRate[] {
  const now = new Date().toISOString();
  
  return [
    { pair: 'EUR/USD', timestamp: now, bid: 1.0845, ask: 1.0847, mid: 1.0846 },
    { pair: 'GBP/USD', timestamp: now, bid: 1.2650, ask: 1.2652, mid: 1.2651 },
    { pair: 'USD/JPY', timestamp: now, bid: 149.85, ask: 149.87, mid: 149.86 },
    { pair: 'USD/CHF', timestamp: now, bid: 0.8765, ask: 0.8767, mid: 0.8766 },
    { pair: 'AUD/USD', timestamp: now, bid: 0.6525, ask: 0.6527, mid: 0.6526 },
    { pair: 'USD/CAD', timestamp: now, bid: 1.3545, ask: 1.3547, mid: 1.3546 },
    { pair: 'NZD/USD', timestamp: now, bid: 0.6125, ask: 0.6127, mid: 0.6126 },
    { pair: 'EUR/GBP', timestamp: now, bid: 0.8565, ask: 0.8567, mid: 0.8566 },
    { pair: 'EUR/JPY', timestamp: now, bid: 162.45, ask: 162.47, mid: 162.46 },
    { pair: 'GBP/JPY', timestamp: now, bid: 189.65, ask: 189.67, mid: 189.66 },
  ];
}

/**
 * Generate mock forex candles for demo mode
 */
export function getMockForexCandles(pair: ForexPair, days: number = 30): ForexCandle[] {
  const candles: ForexCandle[] = [];
  const basePrice = pair === 'USD/JPY' ? 150 : pair === 'EUR/JPY' ? 162 : 1.1;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const volatility = 0.002;
    const open = basePrice * (1 + (Math.random() - 0.5) * volatility);
    const high = open * (1 + Math.random() * volatility);
    const low = open * (1 - Math.random() * volatility);
    const close = low + Math.random() * (high - low);
    
    candles.push({
      pair,
      timestamp: date.toISOString().split('T')[0],
      open,
      high,
      low,
      close,
    });
  }

  return candles;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Check if in demo mode (no API key)
 */
export function isDemoMode(): boolean {
  return !import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;
}

/**
 * Format forex rate for display
 */
export function formatForexRate(rate: number, pair: ForexPair): string {
  const decimals = pair.includes('JPY') ? 2 : 4;
  return rate.toFixed(decimals);
}

/**
 * Calculate pip value
 */
export function calculatePipValue(pair: ForexPair): number {
  return pair.includes('JPY') ? 0.01 : 0.0001;
}

/**
 * Calculate pip difference
 */
export function calculatePips(pair: ForexPair, price1: number, price2: number): number {
  const pipValue = calculatePipValue(pair);
  return (price2 - price1) / pipValue;
}
