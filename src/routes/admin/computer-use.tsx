import { FormEvent, useState } from 'react';
import { runComputerUse, CUOptions } from '@packages/big3';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

const defaultOptions: CUOptions = {
  url: 'https://cheggie-lifestyle-finance.lovable.app',
  goal: 'Audit landing page hero performance and capture metrics',
  maxSteps: 6,
  filters: ['avoid-login', 'respect-robots'],
};

const guardrailOptions = [
  { id: 'blocklist', label: 'Enforce domain allow-list', description: 'Restrict navigation to approved domains only.' },
  { id: 'click-rate', label: 'Click rate limiter', description: 'Throttle outbound clicks to 10 per minute.' },
  { id: 'form-confirm', label: 'Form submit confirmation', description: 'Require manual approval before submitting forms.' },
];

const ComputerUseTab = () => {
  const [options, setOptions] = useState<CUOptions>(defaultOptions);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Awaited<ReturnType<typeof runComputerUse>> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [guards, setGuards] = useState<Record<string, boolean>>({
    blocklist: true,
    'click-rate': true,
    'form-confirm': true,
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload = {
        ...options,
        filters: [
          ...(options.filters ?? []),
          ...Object.entries(guards)
            .filter(([, enabled]) => enabled)
            .map(([guardId]) => guardId),
        ],
      };
      const execution = await runComputerUse(payload);
      setResult(execution);
    } catch (err) {
      console.error(err);
      setError('Computer-Use run failed — check Big-3 adapter configuration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-white/10 bg-slate-950/40">
        <CardHeader>
          <CardTitle className="text-2xl">Gemini Computer-Use</CardTitle>
          <CardDescription className="text-white/60">
            Dispatch the Big-3 agent to execute complex browser automation with safety guardrails and trace logging.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cu-url">Target URL</Label>
                <Input
                  id="cu-url"
                  type="url"
                  value={options.url}
                  onChange={(event) => setOptions((prev) => ({ ...prev, url: event.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cu-steps">Max steps</Label>
                <Input
                  id="cu-steps"
                  type="number"
                  min={1}
                  max={30}
                  value={options.maxSteps}
                  onChange={(event) => setOptions((prev) => ({ ...prev, maxSteps: Number(event.target.value) }))}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cu-goal">Goal</Label>
              <Textarea
                id="cu-goal"
                rows={3}
                value={options.goal}
                onChange={(event) => setOptions((prev) => ({ ...prev, goal: event.target.value }))}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {guardrailOptions.map((guard) => (
                <div key={guard.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium text-white">{guard.label}</p>
                      <p className="text-xs text-white/60">{guard.description}</p>
                    </div>
                    <Switch
                      checked={guards[guard.id]}
                      onCheckedChange={(checked) => setGuards((prev) => ({ ...prev, [guard.id]: checked }))}
                    />
                  </div>
                </div>
              ))}
            </div>
            <Button type="submit" disabled={loading} className="justify-self-start">
              {loading ? 'Running Gemini Computer-Use…' : 'Launch Automation'}
            </Button>
          </form>
          {error && <p className="mt-4 text-sm text-rose-300">{error}</p>}
        </CardContent>
      </Card>

      {result && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-white/10 bg-slate-950/40">
            <CardHeader>
              <CardTitle className="text-xl">Execution Trace</CardTitle>
              <CardDescription className="text-white/60">
                Step-by-step actions performed by the Gemini agent. Screenshots saved to Lovable Cloud storage.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="max-h-[360px] pr-4">
                <ol className="list-decimal space-y-3 pl-6 text-sm text-white/70">
                  {result.trace.map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ol>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-slate-950/40">
            <CardHeader className="flex flex-col gap-2">
              <CardTitle className="text-xl">Artifacts & Screens</CardTitle>
              <CardDescription className="text-white/60">
                Review captured screenshots and downloadable evidence.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-3">
                {result.screenshots.map((screenshot, index) => (
                  <a
                    key={screenshot}
                    href={screenshot}
                    target="_blank"
                    rel="noreferrer"
                    className="group overflow-hidden rounded-2xl border border-white/10"
                  >
                    <img
                      src={screenshot}
                      alt={`Screenshot ${index + 1}`}
                      className="h-32 w-48 object-cover transition duration-300 group-hover:scale-105"
                    />
                  </a>
                ))}
              </div>
              <Separator className="border-white/10" />
              <div className="space-y-2">
                {result.artifacts.map((artifact) => (
                  <a
                    key={artifact}
                    href={artifact}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 transition hover:border-emerald-400/40"
                  >
                    <span>{artifact}</span>
                    <Badge variant="outline" className="border-emerald-400/40 text-emerald-200">
                      Download
                    </Badge>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ComputerUseTab;
