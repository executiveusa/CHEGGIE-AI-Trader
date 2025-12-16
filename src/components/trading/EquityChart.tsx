/**
 * Equity Chart Component - Performance visualization for AI models
 */

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { LineChart, TrendingUp, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { useEquityCurves } from '@/hooks/useTradingData';
import { formatCurrency, AI_MODELS } from '@/lib/trading-parser';

interface EquityChartProps {
  selectedModels?: string[]; // Filter to specific models
  height?: number;
}

const INITIAL_EQUITY = 10000;

export function EquityChart({ selectedModels, height = 400 }: EquityChartProps) {
  const { curves, loading, error } = useEquityCurves();

  // Transform data for recharts
  const chartData = useMemo(() => {
    if (curves.length === 0) return [];

    // Get all unique dates
    const allDates = new Set<string>();
    for (const curve of curves) {
      for (const point of curve.points) {
        allDates.add(point.date);
      }
    }

    // Sort dates
    const sortedDates = Array.from(allDates).sort();

    // Build data array
    return sortedDates.map((date) => {
      const dataPoint: Record<string, any> = { date };

      for (const curve of curves) {
        if (selectedModels && !selectedModels.includes(curve.signature)) continue;

        const point = curve.points.find((p) => p.date === date);
        if (point) {
          dataPoint[curve.signature] = point.equity;
        }
      }

      return dataPoint;
    });
  }, [curves, selectedModels]);

  // Get active models
  const activeModels = useMemo(() => {
    return AI_MODELS.filter((model) => {
      if (selectedModels) return selectedModels.includes(model.signature);
      return curves.some((c) => c.signature === model.signature);
    });
  }, [curves, selectedModels]);

  if (loading) {
    return (
      <Card className="border-white/10 bg-slate-950/40">
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || chartData.length === 0) {
    return (
      <Card className="border-white/10 bg-slate-950/40">
        <CardContent className="p-6">
          <div className="text-center py-12 text-white/40">
            <LineChart className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No chart data available</p>
            <p className="text-sm mt-2">Run simulations to see performance charts</p>
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
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              Equity Curves
            </CardTitle>
            <CardDescription className="text-white/60">
              Portfolio value over time — starting with $10,000
            </CardDescription>
          </div>
          <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
            <Calendar className="w-3 h-3 mr-1" />
            {chartData.length} days
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ResponsiveContainer width="100%" height={height}>
            <RechartsLineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis
                dataKey="date"
                stroke="#64748B"
                tick={{ fill: '#94A3B8', fontSize: 12 }}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getMonth() + 1}/${date.getDate()}`;
                }}
              />
              <YAxis
                stroke="#64748B"
                tick={{ fill: '#94A3B8', fontSize: 12 }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
                domain={['dataMin - 500', 'dataMax + 500']}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F172A',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '0.5rem',
                }}
                labelStyle={{ color: '#94A3B8' }}
                formatter={(value: number, name: string) => [
                  formatCurrency(value),
                  AI_MODELS.find((m) => m.signature === name)?.name || name,
                ]}
              />
              <Legend
                formatter={(value) =>
                  AI_MODELS.find((m) => m.signature === value)?.name || value
                }
              />
              <ReferenceLine
                y={INITIAL_EQUITY}
                stroke="#64748B"
                strokeDasharray="5 5"
                label={{
                  value: 'Initial $10k',
                  fill: '#64748B',
                  fontSize: 11,
                }}
              />

              {activeModels.map((model) => (
                <Line
                  key={model.signature}
                  type="monotone"
                  dataKey={model.signature}
                  stroke={model.color}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, fill: model.color }}
                />
              ))}
            </RechartsLineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-4 justify-center">
          {activeModels.map((model) => (
            <div key={model.signature} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: model.color }}
              />
              <span className="text-sm text-white/70">{model.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default EquityChart;
