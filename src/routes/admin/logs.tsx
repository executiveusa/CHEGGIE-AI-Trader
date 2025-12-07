import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AgentLogEntry {
  ts: string;
  loopId: string;
  task: string;
  status: string;
  severity?: 'info' | 'warn' | 'error';
  durationMs?: number;
  message?: string;
}

const fallbackLogs: AgentLogEntry[] = [
  {
    ts: new Date().toISOString(),
    loopId: 'nightly-design-audit',
    task: 'run_lighthouse',
    status: 'completed',
    durationMs: 1850,
    severity: 'info',
    message: 'LCP 2.1s, CLS 0.05, TTI 2.9s',
  },
  {
    ts: new Date().toISOString(),
    loopId: 'weekly-bundle-trim',
    task: 'suggest_dynamic_imports',
    status: 'awaiting-approval',
    severity: 'warn',
    message: 'Proposed lazy imports for Testimonials and Pricing sections.',
  },
];

const severityColors: Record<string, string> = {
  info: 'bg-emerald-500/20 text-emerald-200',
  warn: 'bg-amber-500/20 text-amber-200',
  error: 'bg-rose-500/20 text-rose-200',
};

const LogsTab = () => {
  const [entries, setEntries] = useState<AgentLogEntry[]>(fallbackLogs);
  const [search, setSearch] = useState('');
  const [loopFilter, setLoopFilter] = useState('all');

  useEffect(() => {
    const loadLogs = async () => {
      try {
        const response = await fetch('/logs/agent-loop.jsonl');
        if (!response.ok) return;
        const text = await response.text();
        const parsed = text
          .split('\n')
          .filter(Boolean)
          .map((line) => JSON.parse(line) as AgentLogEntry);
        if (parsed.length) {
          setEntries(parsed.reverse());
        }
      } catch (error) {
        console.warn('[LogsTab] Falling back to seeded logs', error);
      }
    };

    loadLogs();
  }, []);

  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
      const matchesLoop = loopFilter === 'all' || entry.loopId === loopFilter;
      const matchesSearch = search
        ? entry.task.toLowerCase().includes(search.toLowerCase()) ||
          entry.message?.toLowerCase().includes(search.toLowerCase())
        : true;
      return matchesLoop && matchesSearch;
    });
  }, [entries, loopFilter, search]);

  return (
    <Card className="border-white/10 bg-slate-950/40">
      <CardHeader className="space-y-4">
        <div>
          <CardTitle className="text-2xl">Agent logs</CardTitle>
          <CardDescription className="text-white/60">
            Tail the JSONL stream emitted by Flowise orchestrator and Auto-PR agents.
          </CardDescription>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            placeholder="Search by task or message"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <Select value={loopFilter} onValueChange={setLoopFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter loop" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All loops</SelectItem>
              <SelectItem value="nightly-design-audit">Nightly design audit</SelectItem>
              <SelectItem value="weekly-bundle-trim">Weekly bundle trim</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="max-h-[520px] pr-4">
          <div className="space-y-3 text-sm text-white/70">
            {filteredEntries.map((entry, index) => (
              <div key={`${entry.ts}-${index}`} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/40">{entry.loopId}</p>
                    <p className="text-sm text-white/80">{entry.task}</p>
                  </div>
                  <Badge className={severityColors[entry.severity ?? 'info']}>{entry.status}</Badge>
                </div>
                <p className="mt-2 text-xs text-white/60">{new Date(entry.ts).toLocaleString()}</p>
                {entry.message && <p className="mt-3 text-sm text-white/70">{entry.message}</p>}
                {entry.durationMs && (
                  <p className="mt-2 text-xs text-white/50">Duration: {entry.durationMs} ms</p>
                )}
              </div>
            ))}
            {!filteredEntries.length && <p>No log entries match your filter.</p>}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default LogsTab;
