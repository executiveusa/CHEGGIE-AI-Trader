/**
 * Control Panel Component - Simulation controls and MCP service status
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  Square,
  Settings,
  Server,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  Terminal,
  Cpu,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useMCPStatus, useSimulationControl, useTradingConfig } from '@/hooks/useTradingData';
import { AI_MODELS, formatModelName } from '@/lib/trading-parser';
import type { MCPServiceStatus } from '@/types/trading';

const ServiceStatusBadge = ({ status }: { status: MCPServiceStatus['status'] }) => {
  switch (status) {
    case 'running':
      return (
        <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
          <CheckCircle className="w-3 h-3 mr-1" />
          Running
        </Badge>
      );
    case 'stopped':
      return (
        <Badge className="bg-slate-500/20 text-slate-300 border-slate-500/30">
          <XCircle className="w-3 h-3 mr-1" />
          Stopped
        </Badge>
      );
    case 'error':
      return (
        <Badge className="bg-rose-500/20 text-rose-300 border-rose-500/30">
          <AlertCircle className="w-3 h-3 mr-1" />
          Error
        </Badge>
      );
  }
};

const ServiceCard = ({
  service,
  index,
}: {
  service: MCPServiceStatus;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10"
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            service.status === 'running'
              ? 'bg-emerald-500/20'
              : service.status === 'error'
              ? 'bg-rose-500/20'
              : 'bg-slate-500/20'
          }`}
        >
          <Server
            className={`w-4 h-4 ${
              service.status === 'running'
                ? 'text-emerald-400'
                : service.status === 'error'
                ? 'text-rose-400'
                : 'text-slate-400'
            }`}
          />
        </div>
        <div>
          <p className="font-medium text-white capitalize">{service.name}</p>
          <p className="text-xs text-white/50">Port {service.port}</p>
        </div>
      </div>
      <ServiceStatusBadge status={service.status} />
    </motion.div>
  );
};

export function ControlPanel() {
  const { services, loading: servicesLoading, refresh: refreshServices } = useMCPStatus();
  const { state: simState, start, stop } = useSimulationControl();
  const { config, loading: configLoading } = useTradingConfig();
  const [selectedModel, setSelectedModel] = useState<string>(AI_MODELS[0].signature);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const allServicesRunning = services.every((s) => s.status === 'running');
  const runningCount = services.filter((s) => s.status === 'running').length;

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshServices();
    setIsRefreshing(false);
  };

  const handleStart = () => {
    start(selectedModel);
  };

  return (
    <Card className="border-white/10 bg-slate-950/40">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Settings className="w-5 h-5 text-violet-400" />
              Control Panel
            </CardTitle>
            <CardDescription className="text-white/60">
              Manage simulations and monitor MCP services
            </CardDescription>
          </div>
          <Badge
            className={
              allServicesRunning
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
            }
          >
            <Cpu className="w-3 h-3 mr-1" />
            {runningCount}/{services.length} Services
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Simulation Controls */}
        <div className="rounded-xl bg-white/5 p-4">
          <h4 className="text-sm font-medium text-white/70 mb-4 uppercase tracking-wider">
            Simulation Control
          </h4>

          <div className="flex items-center gap-4 mb-4">
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-[200px] bg-white/5 border-white/10">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                {AI_MODELS.map((model) => (
                  <SelectItem key={model.signature} value={model.signature}>
                    {model.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {simState.isRunning ? (
              <Button
                onClick={stop}
                variant="destructive"
                className="bg-rose-500/20 text-rose-300 border-rose-500/30 hover:bg-rose-500/30"
              >
                <Square className="w-4 h-4 mr-2" />
                Stop
              </Button>
            ) : (
              <Button
                onClick={handleStart}
                disabled={!allServicesRunning}
                className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30"
              >
                <Play className="w-4 h-4 mr-2" />
                Start Simulation
              </Button>
            )}
          </div>

          {/* Progress */}
          {simState.isRunning && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">
                  Running: {formatModelName(simState.currentModel || '')}
                </span>
                <span className="text-white">{simState.progress}%</span>
              </div>
              <Progress value={simState.progress} className="h-2" />
            </motion.div>
          )}

          {/* Warning if services not running */}
          {!allServicesRunning && !simState.isRunning && (
            <div className="mt-3 rounded-lg bg-amber-500/10 border border-amber-500/20 p-3">
              <p className="text-sm text-amber-200">
                <AlertCircle className="w-4 h-4 inline-block mr-2" />
                Start MCP services before running simulations.
              </p>
            </div>
          )}
        </div>

        {/* MCP Services */}
        <div className="rounded-xl bg-white/5 p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-white/70 uppercase tracking-wider">
              MCP Services
            </h4>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="text-white/60 hover:text-white"
            >
              <RefreshCw
                className={`w-4 h-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`}
              />
              Refresh
            </Button>
          </div>

          {servicesLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-violet-500" />
            </div>
          ) : (
            <div className="space-y-2">
              {services.map((service, index) => (
                <ServiceCard key={service.name} service={service} index={index} />
              ))}
            </div>
          )}

          {/* Start Services Command */}
          <div className="mt-4 rounded-lg bg-black/30 p-3">
            <p className="text-xs text-white/50 mb-2">
              <Terminal className="w-3 h-3 inline-block mr-1" />
              Start services with:
            </p>
            <code className="text-xs text-emerald-300 font-mono">
              ./scripts/start-mcp-services.bat
            </code>
          </div>
        </div>

        {/* Config Info */}
        {config && (
          <div className="rounded-xl bg-white/5 p-4">
            <h4 className="text-sm font-medium text-white/70 mb-3 uppercase tracking-wider">
              Configuration
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-white/50">Date Range</span>
                <span className="text-white">
                  {config.date_range.init_date} → {config.date_range.end_date}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Initial Cash</span>
                <span className="text-white">
                  ${config.agent_config.initial_cash.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Max Steps</span>
                <span className="text-white">{config.agent_config.max_steps}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Max Retries</span>
                <span className="text-white">{config.agent_config.max_retries}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default ControlPanel;
