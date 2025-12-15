import { motion, useSpring, useTransform, useInView, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  decimals?: number;
  formatOptions?: Intl.NumberFormatOptions;
}

export const AnimatedNumber = ({
  value,
  suffix = '',
  prefix = '',
  duration = 2,
  className = '',
  decimals = 0,
  formatOptions,
}: AnimatedNumberProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px 0px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplayValue(latest);
      },
    });

    return () => controls.stop();
  }, [isInView, value, duration]);

  const formattedValue = formatOptions 
    ? new Intl.NumberFormat('en-US', formatOptions).format(displayValue)
    : decimals > 0 
      ? displayValue.toFixed(decimals)
      : Math.round(displayValue).toLocaleString();

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}{formattedValue}{suffix}
    </span>
  );
};

// Animated percentage with color coding
interface AnimatedPercentageProps {
  value: number;
  duration?: number;
  className?: string;
  showSign?: boolean;
  colorCode?: boolean;
}

export const AnimatedPercentage = ({
  value,
  duration = 2,
  className = '',
  showSign = true,
  colorCode = true,
}: AnimatedPercentageProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px 0px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplayValue(latest);
      },
    });

    return () => controls.stop();
  }, [isInView, value, duration]);

  const isPositive = displayValue >= 0;
  const formattedValue = `${showSign && isPositive ? '+' : ''}${displayValue.toFixed(1)}%`;

  return (
    <span 
      ref={ref} 
      className={cn(
        'tabular-nums font-medium',
        colorCode && (isPositive ? 'text-emerald-400' : 'text-red-400'),
        className
      )}
    >
      {formattedValue}
    </span>
  );
};

// Animated currency
interface AnimatedCurrencyProps {
  value: number;
  currency?: string;
  duration?: number;
  className?: string;
}

export const AnimatedCurrency = ({
  value,
  currency = 'USD',
  duration = 2,
  className = '',
}: AnimatedCurrencyProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px 0px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplayValue(latest);
      },
    });

    return () => controls.stop();
  }, [isInView, value, duration]);

  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(displayValue);

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {formattedValue}
    </span>
  );
};

export default AnimatedNumber;
