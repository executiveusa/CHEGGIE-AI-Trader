import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
}

const paddingClasses = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
};

export const GlassCard = ({
  children,
  className = '',
  hover = true,
  glow = false,
  padding = 'md',
}: GlassCardProps) => {
  return (
    <motion.div
      className={cn(
        'relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden',
        paddingClasses[padding],
        hover && 'transition-all duration-300',
        glow && 'shadow-lg shadow-emerald-500/5',
        className
      )}
      whileHover={hover ? {
        y: -4,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2), 0 0 30px rgba(16, 185, 129, 0.1)',
        borderColor: 'rgba(255, 255, 255, 0.15)',
      } : undefined}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

// Glass card with gradient border
interface GradientGlassCardProps {
  children: ReactNode;
  className?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

export const GradientGlassCard = ({
  children,
  className = '',
  gradientFrom = 'from-emerald-500/20',
  gradientTo = 'to-teal-500/20',
}: GradientGlassCardProps) => {
  return (
    <div className={cn('relative rounded-2xl p-[1px] overflow-hidden', className)}>
      {/* Gradient border */}
      <div className={cn('absolute inset-0 bg-gradient-to-br', gradientFrom, gradientTo)} />
      
      {/* Content */}
      <div className="relative rounded-2xl bg-slate-900/90 backdrop-blur-xl p-6">
        {children}
      </div>
    </div>
  );
};

// Stats card variant
interface StatsCardProps {
  icon?: ReactNode;
  title: string;
  value: string | ReactNode;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

export const StatsCard = ({
  icon,
  title,
  value,
  subtitle,
  trend,
  className = '',
}: StatsCardProps) => {
  return (
    <GlassCard className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-400">{title}</span>
        {icon && (
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
            {icon}
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      {subtitle && (
        <div className={cn(
          'text-sm',
          trend === 'up' && 'text-emerald-400',
          trend === 'down' && 'text-red-400',
          trend === 'neutral' && 'text-slate-400',
          !trend && 'text-slate-500'
        )}>
          {subtitle}
        </div>
      )}
    </GlassCard>
  );
};

export default GlassCard;
