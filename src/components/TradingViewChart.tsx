import React, { useEffect, useRef, useState } from 'react';
import {
  createChart,
  ColorType,
  Time,
  IChartApi,
  ISeriesApi,
  CandlestickData,
} from 'lightweight-charts';
import { useTradingStore } from '@/stores/tradingStore';

interface TradingViewChartProps {
  symbol: string;
  height?: number;
  className?: string;
}

interface OHLCV {
  time: Time;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export const TradingViewChart: React.FC<TradingViewChartProps> = ({
  symbol,
  height = 400,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<'Histogram'> | null>(null);
  const [isReady, setIsReady] = useState(false);

  const aiPredictions = useTradingStore((state) => state.aiPredictions[symbol]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create chart
    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: '#ffffff' },
        textColor: '#333',
      },
      width: containerRef.current.clientWidth,
      height,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    chartRef.current = chart;

    // Create candlestick series
    const candleSeries = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    candleSeriesRef.current = candleSeries;

    // Create volume histogram
    const volumeSeries = chart.addHistogramSeries({
      color: '#26a69a',
      priceFormat: { type: 'volume' },
    });

    volumeSeriesRef.current = volumeSeries;

    setIsReady(true);

    return () => {
      chart.remove();
    };
  }, [height]);

  // Add sample OHLCV data (replace with real API)
  useEffect(() => {
    if (!isReady || !candleSeriesRef.current || !volumeSeriesRef.current) return;

    // Generate sample candlestick data
    const generateSampleData = (days: number = 30): OHLCV[] => {
      const data: OHLCV[] = [];
      const now = Math.floor(Date.now() / 1000);
      let price = 100;

      for (let i = days; i >= 0; i--) {
        const time = (now - i * 86400) as Time;
        const change = (Math.random() - 0.5) * 5;
        const open = price;
        const close = price + change;
        const high = Math.max(open, close) + Math.random() * 2;
        const low = Math.min(open, close) - Math.random() * 2;
        const volume = Math.floor(Math.random() * 1000000);

        data.push({
          time,
          open,
          high,
          low,
          close,
          volume,
        });

        price = close;
      }

      return data;
    };

    const candleData = generateSampleData();

    candleSeriesRef.current.setData(candleData as CandlestickData[]);

    const volumeData = candleData.map((d) => ({
      time: d.time,
      value: d.volume,
      color: d.close >= d.open ? '#26a69a80' : '#ef535080',
    }));

    volumeSeriesRef.current.setData(volumeData);

    if (chartRef.current) {
      chartRef.current.timeScale().fitContent();
    }
  }, [isReady]);

  // Add AI prediction markers
  useEffect(() => {
    if (!isReady || !candleSeriesRef.current || !aiPredictions) return;

    const now = Math.floor(Date.now() / 1000);
    const prediction = aiPredictions.prediction;
    const confidence = aiPredictions.confidence;

    const marker: any = {
      time: now as Time,
      position: prediction > 0 ? 'belowBar' : 'aboveBar',
      color: prediction > 0 ? '#26a69a' : '#ef5350',
      shape: 'arrowUp' as const,
      text: `AI: ${(confidence * 100).toFixed(0)}% ${prediction > 0 ? '↑' : '↓'}`,
    };

    candleSeriesRef.current.setMarkers([marker]);
  }, [aiPredictions, isReady]);

  return (
    <div className={className}>
      <div
        ref={containerRef}
        style={{ width: '100%', height: `${height}px` }}
        className="rounded-lg border border-gray-200 bg-white"
      />
    </div>
  );
};
