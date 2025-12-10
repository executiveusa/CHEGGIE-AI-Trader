import { useEffect, useMemo, useRef, useState } from 'react';
import { startListener, ack, fail, AlwaysOnJob } from '@packages/always-on';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useAdminAuth } from '@/context/AdminAuthContext';

const MAX_JOBS = 12;

const statusColors: Record<string, string> = {
  low: 'bg-slate-600/40 text-slate-100',
  medium: 'bg-amber-500/20 text-amber-200',
  high: 'bg-rose-500/20 text-rose-200',
};

const queueName = 'cheggie-admin-always-on';

const AssistantTab = () => {
  const { user } = useAdminAuth();
  const [listening, setListening] = useState(false);
  const [jobs, setJobs] = useState<AlwaysOnJob[]>([]);
  const [processingJob, setProcessingJob] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const generatorRef = useRef<AsyncGenerator<AlwaysOnJob> | null>(null);

  useEffect(() => {
    if (!listening) {
      return () => undefined;
    }

    let cancelled = false;

    const runListener = async () => {
      try {
        const generator = startListener({ queue: queueName, pollIntervalMs: 2500 });
        generatorRef.current = generator;

        for await (const job of generator) {
          if (cancelled) {
            break;
          }

          setJobs((prev) => [job, ...prev].slice(0, MAX_JOBS));
        }
      } catch (err) {
        console.error(err);
        setError('Listener error — check Always-On adapter configuration.');
        setListening(false);
      }
    };

    runListener();

    return () => {
      cancelled = true;
      generatorRef.current?.return?.(undefined);
    };
  }, [listening]);

  const handleStart = () => {
    setError(null);
    setListening(true);
  };

  const handleStop = () => {
    setListening(false);
    generatorRef.current?.return?.(undefined);
  };

  const escalateToComputerUse = async (job: AlwaysOnJob) => {
    setProcessingJob(job.id);
    await ack(job.id, { escalated: true });
    setJobs((prev) => prev.filter((item) => item.id !== job.id));
    setProcessingJob(null);
  };

  const queueStats = useMemo(() => {
    const total = jobs.length;
    const high = jobs.filter((job) => job.priority === 'high').length;
    return { total, high };
  }, [jobs]);

  return (
    <div className="space-y-6">
      <Card className="border-white/10 bg-slate-950/40">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Always-On Listener</CardTitle>
            <CardDescription className="text-white/60">
              Stream jobs from the Always-On AI Assistant and escalate complex work to the Gemini Computer-Use agent.
            </CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <span className={`h-2 w-2 rounded-full ${listening ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
              <span className="text-sm text-white/70">{listening ? 'Listening' : 'Paused'}</span>
            </div>
            <Switch checked={listening} onCheckedChange={(value) => (value ? handleStart() : handleStop())} />
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">Queue</p>
            <p className="mt-1 text-lg font-semibold text-white">{queueName}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">Total jobs captured</p>
            <p className="mt-1 text-lg font-semibold text-white">{queueStats.total}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">High priority</p>
            <p className="mt-1 text-lg font-semibold text-white">{queueStats.high}</p>
          </div>
        </CardContent>
      </Card>

      <Separator className="border-white/10" />

      <Card className="border-white/10 bg-slate-950/40">
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Pending Jobs</CardTitle>
            <CardDescription className="text-white/60">
              Highest-priority requests from {user?.email ?? 'operators'} appear first.
            </CardDescription>
          </div>
          <Badge variant="outline" className="border-emerald-400/40 text-emerald-200">
            {jobs.length ? `${jobs.length} in queue` : 'Idle'}
          </Badge>
        </CardHeader>
        <CardContent>
          {error && <p className="mb-4 text-sm text-rose-300">{error}</p>}
          <ScrollArea className="max-h-[420px] pr-4">
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/40 transition hover:border-emerald-400/40"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-sm text-white/60">Job ID</p>
                      <p className="font-semibold text-white">{job.id}</p>
                    </div>
                    <Badge className={statusColors[job.priority ?? 'medium']}>Priority: {job.priority ?? 'medium'}</Badge>
                  </div>
                  <p className="mt-3 text-lg font-medium text-white">{job.goal}</p>
                  <p className="mt-2 text-sm text-white/70">
                    Payload: {JSON.stringify(job.payload)}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Button
                      variant="secondary"
                      onClick={() => escalateToComputerUse(job)}
                      disabled={processingJob === job.id}
                    >
                      {processingJob === job.id ? 'Escalating…' : 'Escalate to Big-3 Computer-Use'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={async () => {
                        setProcessingJob(job.id);
                        await ack(job.id, { resolved: true });
                        setJobs((prev) => prev.filter((item) => item.id !== job.id));
                        setProcessingJob(null);
                      }}
                      disabled={processingJob === job.id}
                    >
                      Mark Complete
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={async () => {
                        setProcessingJob(job.id);
                        await fail(job.id, { reason: 'operator-rejected' });
                        setJobs((prev) => prev.filter((item) => item.id !== job.id));
                        setProcessingJob(null);
                      }}
                      disabled={processingJob === job.id}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
              {!jobs.length && <p className="text-sm text-white/60">No pending jobs — the assistant is standing by.</p>}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssistantTab;
