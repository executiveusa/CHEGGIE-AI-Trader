import { useEffect, useMemo, useState } from 'react';
import { AgentOrchestrator, agentLoops } from '@/agentic/orchestrator';
import { AgentLoopStatus } from '@/agentic/schema/audit';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { JsonView, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

const mask = (value?: string) => (value ? `${value.slice(0, 3)}••••${value.slice(-2)}` : 'not-set');

const AgentsTab = () => {
  const orchestrator = useMemo(() => new AgentOrchestrator(), []);
  const [statuses, setStatuses] = useState<AgentLoopStatus[]>(orchestrator.getStatuses());
  const [logs, setLogs] = useState([] as unknown[]);
  const [runningLoop, setRunningLoop] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = orchestrator.subscribe((log) => {
      setLogs((prev) => [log, ...prev].slice(0, 10));
      setStatuses(orchestrator.getStatuses());
    });
    return unsubscribe;
  }, [orchestrator]);

  const handleRun = async (loopId: string) => {
    try {
      setError(null);
      setRunningLoop(loopId);
      const log = await orchestrator.runLoop(loopId);
      setLogs((prev) => [log, ...prev].slice(0, 10));
      setStatuses(orchestrator.getStatuses());
    } catch (err) {
      console.error(err);
      setError('Failed to execute loop. Verify Flowise and Lovable credentials.');
    } finally {
      setRunningLoop(null);
    }
  };

  const envSecrets = [
    { key: 'VITE_LOVABLE_KEY', value: import.meta.env.VITE_LOVABLE_KEY as string | undefined },
    { key: 'VITE_FLOWWISE_KEY', value: import.meta.env.VITE_FLOWWISE_KEY as string | undefined },
    { key: 'VITE_GEMINI_API_KEY', value: import.meta.env.VITE_GEMINI_API_KEY as string | undefined },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-white/10 bg-slate-950/40">
        <CardHeader>
          <CardTitle className="text-2xl">Agent Loop Overview</CardTitle>
          <CardDescription className="text-white/60">
            Nightly and weekly loops keep Cheggie compliant with One-Shot Meta Prompt V2, UDEC, and Lighthouse budgets.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {statuses.map((status) => (
            <div key={status.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-white">{status.title}</p>
                  <p className="text-xs text-white/60">{status.schedule}</p>
                </div>
                <Badge className="bg-emerald-500/20 text-emerald-200">{status.status}</Badge>
              </div>
              <p className="mt-3 text-xs uppercase tracking-[0.3em] text-white/40">Next run</p>
              <p className="text-sm text-white/70">{status.nextRun ?? 'calculating…'}</p>
              <div className="mt-4 flex gap-2">
                <Button size="sm" onClick={() => handleRun(status.id)} disabled={runningLoop === status.id}>
                  {runningLoop === status.id ? 'Running…' : 'Run now'}
                </Button>
                {status.approvalsRequired && (
                  <Button variant="secondary" size="sm" asChild>
                    <a href={status.approvalsRoute ?? '/admin/reviews'}>View approvals</a>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
        {error && <p className="px-6 pb-4 text-sm text-rose-300">{error}</p>}
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-white/10 bg-slate-950/40">
          <CardHeader>
            <CardTitle className="text-xl">Configuration</CardTitle>
            <CardDescription className="text-white/60">
              Active loops loaded from AGENT_LOOP_CONFIG.yaml. Edit in repository to adjust schedules.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="max-h-[420px] pr-4">
              <JsonView data={{ loops: agentLoops }} shouldExpandNode={() => true} style={defaultStyles} />
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-slate-950/40">
          <CardHeader>
            <CardTitle className="text-xl">Secret inventory</CardTitle>
            <CardDescription className="text-white/60">
              Mirror these secrets in Lovable Cloud’s environment manager.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {envSecrets.map((secret) => (
              <div key={secret.key} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
                <span className="font-medium text-white">{secret.key}</span>
                <span>{mask(secret.value)}</span>
              </div>
            ))}
            <p className="text-xs text-white/50">
              Update secrets via Lovable Cloud → Settings → Environment. Never commit plaintext values to git.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-white/10 bg-slate-950/40">
        <CardHeader>
          <CardTitle className="text-xl">Recent execution logs</CardTitle>
          <CardDescription className="text-white/60">
            Stored locally. Server runners stream JSONL to /logs/agent-loop.jsonl.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="max-h-[360px] pr-4">
            <div className="space-y-3 text-xs text-white/70">
              {logs.map((log, index) => (
                <pre key={index} className="rounded-2xl bg-black/40 p-4">
                  {JSON.stringify(log, null, 2)}
                </pre>
              ))}
              {!logs.length && <p>No executions yet. Trigger a loop to view logs.</p>}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentsTab;
