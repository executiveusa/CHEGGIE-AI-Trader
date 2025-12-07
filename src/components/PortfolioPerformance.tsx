import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useTradingStore } from '@/stores/tradingStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';

interface PerformanceData {
  date: string;
  value: number;
}

export const PortfolioPerformance: React.FC = () => {
  const positions = useTradingStore((state) => state.positions);
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);

  // Generate sample performance history
  useEffect(() => {
    const generatePerformanceData = () => {
      const data: PerformanceData[] = [];
      const now = new Date();
      let value = 100000;

      for (let i = 30; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const change = (Math.random() - 0.5) * 2000;
        value += change;

        data.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          value: Math.max(value, 50000), // Prevent negative values
        });
      }

      setPerformanceData(data);
    };

    generatePerformanceData();
  }, [positions]);

  const chartOptions: any = {
    chart: {
      type: 'area',
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: false,
      },
    },
    colors: ['#3b82f6'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100, 100, 100],
      },
    },
    xaxis: {
      categories: performanceData.map((d) => d.date),
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
        formatter: (value: number) => `$${(value / 1000).toFixed(0)}k`,
      },
    },
    grid: {
      show: true,
      borderColor: '#e5e7eb',
      strokeDashArray: 3,
    },
    tooltip: {
      enabled: true,
      theme: 'light',
      x: {
        show: true,
      },
      y: {
        formatter: (value: number) => `$${value.toFixed(2)}`,
      },
    },
  };

  const series = [
    {
      name: 'Portfolio Value',
      data: performanceData.map((d) => d.value),
    },
  ];

  const totalValue = positions.reduce((sum, pos) => sum + pos.currentPrice * pos.quantity, 0);
  const totalPnL = positions.reduce((sum, pos) => sum + pos.pnl, 0);
  const pnlPercent = totalValue > 0 ? (totalPnL / (totalValue - totalPnL)) * 100 : 0;

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-green-600" />
          Portfolio Performance
        </CardTitle>
        <CardDescription>30-day portfolio value and performance metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600">Total Value</p>
            <p className="text-2xl font-bold">${totalValue.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total P&L</p>
            <p className={`text-2xl font-bold ${totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${totalPnL.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">P&L %</p>
            <p className={`text-2xl font-bold ${pnlPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {pnlPercent.toFixed(2)}%
            </p>
          </div>
        </div>

        {performanceData.length > 0 && (
          <Chart options={chartOptions} series={series} type="area" height={300} />
        )}
      </CardContent>
    </Card>
  );
};
