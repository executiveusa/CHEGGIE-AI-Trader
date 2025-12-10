import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { useTradingStore } from '@/stores/tradingStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap } from 'lucide-react';

interface PredictionMetric {
  symbol: string;
  prediction: number;
  confidence: number;
  trend: 'UP' | 'DOWN';
}

export const AIAnalytics: React.FC = () => {
  const aiPredictions = useTradingStore((state) => state.aiPredictions);
  const [metrics, setMetrics] = useState<PredictionMetric[]>([]);

  // Generate sample AI prediction metrics
  useEffect(() => {
    const symbols = ['AAPL', 'GOOGL', 'MSFT', 'TSLA'];
    const newMetrics = symbols.map((symbol) => ({
      symbol,
      prediction: Math.random() * 10 - 5, // -5 to +5% prediction
      confidence: 0.65 + Math.random() * 0.35, // 65-100% confidence
      trend: Math.random() > 0.5 ? 'UP' : 'DOWN' as const,
    }));

    setMetrics(newMetrics);
  }, []);

  const confidenceChartOptions: any = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
    },
    colors: ['#8b5cf6'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: metrics.map((m) => m.symbol),
      labels: {
        style: {
          colors: '#999',
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#999',
          fontSize: '12px',
        },
        formatter: (value: number) => `${(value * 100).toFixed(0)}%`,
      },
      min: 0,
      max: 1,
    },
    grid: {
      show: true,
      borderColor: '#e5e7eb',
    },
  };

  const predictionChartOptions: any = {
    chart: {
      type: 'scatter',
      toolbar: { show: false },
    },
    colors: ['#06b6d4'],
    xaxis: {
      type: 'numeric',
      min: -5,
      max: 5,
      labels: {
        formatter: (value: number) => `${value}%`,
      },
    },
    yaxis: {
      min: 0,
      max: 1,
      labels: {
        formatter: (value: number) => `${(value * 100).toFixed(0)}%`,
      },
    },
    grid: {
      show: true,
      borderColor: '#e5e7eb',
    },
  };

  const confidenceSeries = [
    {
      name: 'Model Confidence',
      data: metrics.map((m) => m.confidence),
    },
  ];

  const predictionSeries = [
    {
      name: 'Predictions',
      data: metrics.map((m, i) => ({
        x: m.prediction,
        y: m.confidence,
      })),
    },
  ];

  return (
    <div className="grid grid-cols-full lg:grid-cols-2 gap-4 col-span-full">
      {/* Model Confidence */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Model Confidence
          </CardTitle>
          <CardDescription>AI prediction confidence levels by symbol</CardDescription>
        </CardHeader>
        <CardContent>
          {metrics.length > 0 && (
            <Chart
              options={confidenceChartOptions}
              series={confidenceSeries}
              type="bar"
              height={250}
            />
          )}
        </CardContent>
      </Card>

      {/* Prediction Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Prediction Analysis
          </CardTitle>
          <CardDescription>Price movement predictions vs confidence</CardDescription>
        </CardHeader>
        <CardContent>
          {metrics.length > 0 && (
            <Chart
              options={predictionChartOptions}
              series={predictionSeries}
              type="scatter"
              height={250}
            />
          )}
        </CardContent>
      </Card>

      {/* Detailed Metrics Table */}
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>AI Model Performance Metrics</CardTitle>
          <CardDescription>Detailed breakdown of AI predictions and confidence scores</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Symbol</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Prediction</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Confidence</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Trend</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {metrics.map((metric) => (
                  <tr key={metric.symbol} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{metric.symbol}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`font-medium ${
                          metric.prediction > 0 ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {metric.prediction > 0 ? '+' : ''}
                        {metric.prediction.toFixed(2)}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${metric.confidence * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium">
                          {(metric.confidence * 100).toFixed(0)}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          metric.trend === 'UP'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {metric.trend}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                        Execute
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
