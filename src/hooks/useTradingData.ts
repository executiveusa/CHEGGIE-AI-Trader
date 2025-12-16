/**
 * Trading Data Hooks - React hooks for fetching and managing trading data
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import type {
  AIPerformanceMetrics,
  PositionRecord,
  TradeHistoryEntry,
  EquityCurve,
  PortfolioPosition,
  TradingConfig,
  MCPServiceStatus,
  SimulationState,
  ForexRate,
  ForexCandle,
  ForexPair,
} from '@/types/trading';
import {
  parsePositionRecords,
  extractTrades,
  calculatePerformanceMetrics,
  buildEquityCurve,
  getPortfolioPositions,
  AI_MODELS,
} from '@/lib/trading-parser';
import {
  getExchangeRate,
  getForexDaily,
  getMockForexRates,
  getMockForexCandles,
  isDemoMode,
  FOREX_PAIRS,
} from '@/api/forex';

// ============================================================================
// Static Data Hooks (reads from public folder / bundled data)
// ============================================================================

/**
 * Hook to load position data for all AI models
 */
export function useAIPositions() {
  const [positions, setPositions] = useState<Record<string, PositionRecord[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPositions() {
      try {
        const modelPositions: Record<string, PositionRecord[]> = {};

        for (const model of AI_MODELS) {
          try {
            // Try to fetch from public folder
            const response = await fetch(
              `/data/agent_data/${model.signature}/position/position.jsonl`
            );
            if (response.ok) {
              const text = await response.text();
              modelPositions[model.signature] = parsePositionRecords(text);
            }
          } catch {
            // Model data not available
            modelPositions[model.signature] = [];
          }
        }

        setPositions(modelPositions);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load positions');
        setLoading(false);
      }
    }

    loadPositions();
  }, []);

  return { positions, loading, error };
}

/**
 * Hook to calculate leaderboard from position data
 */
export function useLeaderboard() {
  const { positions, loading, error } = useAIPositions();

  const leaderboard = useMemo(() => {
    const metrics: AIPerformanceMetrics[] = [];

    for (const model of AI_MODELS) {
      const records = positions[model.signature] || [];
      const modelMetrics = calculatePerformanceMetrics(model.signature, records);
      metrics.push(modelMetrics);
    }

    // Sort by total return descending
    metrics.sort((a, b) => b.totalReturn - a.totalReturn);

    // Assign ranks
    return metrics.map((m, i) => ({ ...m, rank: i + 1 }));
  }, [positions]);

  return { leaderboard, loading, error };
}

/**
 * Hook to get portfolio details for a specific AI model
 */
export function usePortfolio(signature: string) {
  const { positions, loading, error } = useAIPositions();

  const portfolio = useMemo(() => {
    const records = positions[signature] || [];
    if (records.length === 0) return null;

    const latestRecord = records[records.length - 1];
    return getPortfolioPositions(latestRecord.positions);
  }, [positions, signature]);

  return { portfolio, loading, error };
}

/**
 * Hook to get trade history for a specific AI model
 */
export function useTradeHistory(signature?: string) {
  const { positions, loading, error } = useAIPositions();

  const trades = useMemo(() => {
    if (signature) {
      const records = positions[signature] || [];
      return extractTrades(records).reverse(); // Most recent first
    }

    // All trades from all models
    const allTrades: (TradeHistoryEntry & { model: string })[] = [];
    for (const [sig, records] of Object.entries(positions)) {
      const modelTrades = extractTrades(records);
      allTrades.push(...modelTrades.map((t) => ({ ...t, model: sig })));
    }
    return allTrades.sort((a, b) => b.date.localeCompare(a.date));
  }, [positions, signature]);

  return { trades, loading, error };
}

/**
 * Hook to get equity curves for charting
 */
export function useEquityCurves() {
  const { positions, loading, error } = useAIPositions();

  const curves = useMemo(() => {
    const result: EquityCurve[] = [];

    for (const model of AI_MODELS) {
      const records = positions[model.signature] || [];
      if (records.length === 0) continue;

      const points = buildEquityCurve(records);
      result.push({
        modelName: model.name,
        signature: model.signature,
        points,
      });
    }

    return result;
  }, [positions]);

  return { curves, loading, error };
}

// ============================================================================
// Forex Hooks
// ============================================================================

/**
 * Hook to get forex rates
 */
export function useForexRates(pairs: ForexPair[] = FOREX_PAIRS.slice(0, 4)) {
  const [rates, setRates] = useState<ForexRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (isDemoMode()) {
        // Use mock data in demo mode
        const mockRates = getMockForexRates().filter((r) => pairs.includes(r.pair));
        setRates(mockRates);
      } else {
        // Fetch real rates
        const fetchedRates: ForexRate[] = [];
        for (const pair of pairs) {
          try {
            const rate = await getExchangeRate(pair);
            fetchedRates.push(rate);
            await new Promise((r) => setTimeout(r, 250)); // Rate limiting
          } catch {
            // Skip failed pairs
          }
        }
        setRates(fetchedRates);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch forex rates');
    } finally {
      setLoading(false);
    }
  }, [pairs]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { rates, loading, error, refresh };
}

/**
 * Hook to get forex chart data
 */
export function useForexChart(pair: ForexPair) {
  const [candles, setCandles] = useState<ForexCandle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadChart() {
      setLoading(true);
      setError(null);

      try {
        if (isDemoMode()) {
          setCandles(getMockForexCandles(pair));
        } else {
          const data = await getForexDaily(pair);
          setCandles(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load chart');
      } finally {
        setLoading(false);
      }
    }

    loadChart();
  }, [pair]);

  return { candles, loading, error };
}

// ============================================================================
// Configuration Hooks
// ============================================================================

/**
 * Hook to load trading configuration
 */
export function useTradingConfig() {
  const [config, setConfig] = useState<TradingConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadConfig() {
      try {
        const response = await fetch('/configs/default_config.json');
        if (response.ok) {
          const data = await response.json();
          setConfig(data);
        } else {
          throw new Error('Config not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load config');
      } finally {
        setLoading(false);
      }
    }

    loadConfig();
  }, []);

  return { config, loading, error };
}

// ============================================================================
// MCP Service Hooks
// ============================================================================

const MCP_SERVICES = [
  { name: 'math', port: 8000 },
  { name: 'search', port: 8001 },
  { name: 'trade', port: 8002 },
  { name: 'stock_local', port: 8003 },
];

/**
 * Hook to check MCP service status
 */
export function useMCPStatus() {
  const [services, setServices] = useState<MCPServiceStatus[]>([]);
  const [loading, setLoading] = useState(true);

  const checkServices = useCallback(async () => {
    const statuses: MCPServiceStatus[] = [];

    for (const service of MCP_SERVICES) {
      try {
        const response = await fetch(`http://localhost:${service.port}/mcp`, {
          method: 'OPTIONS',
          signal: AbortSignal.timeout(2000),
        });

        statuses.push({
          name: service.name,
          port: service.port,
          status: response.ok ? 'running' : 'error',
          lastCheck: new Date().toISOString(),
        });
      } catch {
        statuses.push({
          name: service.name,
          port: service.port,
          status: 'stopped',
          lastCheck: new Date().toISOString(),
        });
      }
    }

    setServices(statuses);
    setLoading(false);
  }, []);

  useEffect(() => {
    checkServices();
    const interval = setInterval(checkServices, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, [checkServices]);

  return { services, loading, refresh: checkServices };
}

// ============================================================================
// Simulation Control Hook
// ============================================================================

/**
 * Hook for simulation control
 */
export function useSimulationControl() {
  const [state, setState] = useState<SimulationState>({
    isRunning: false,
    progress: 0,
  });

  const start = useCallback(async (modelSignature: string) => {
    setState({
      isRunning: true,
      currentModel: modelSignature,
      currentDate: undefined,
      progress: 0,
      startedAt: new Date().toISOString(),
    });

    // This would connect to the Python backend
    // For now, just simulate progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((r) => setTimeout(r, 500));
      setState((prev) => ({ ...prev, progress: i }));
    }

    setState((prev) => ({ ...prev, isRunning: false, progress: 100 }));
  }, []);

  const stop = useCallback(() => {
    setState((prev) => ({ ...prev, isRunning: false }));
  }, []);

  return { state, start, stop };
}
