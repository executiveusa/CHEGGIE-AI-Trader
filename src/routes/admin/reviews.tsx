import { useState } from 'react';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer-continued';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const mockPullRequests = [
  {
    id: 'PR-482',
    title: 'Nightly design audit: hero CLS fix',
    loopId: 'nightly-design-audit',
    lighthouse: { lcp: 2100, cls: 0.05, tti: 2900 },
    udec: { ctx: 0.92, dyn: 0.88, lft: 0.9, acc: 0.95 },
    diffBefore: '<Hero />',
    diffAfter: '<HeroFull />',
  },
  {
    id: 'PR-475',
    title: 'Weekly bundle trim: lazy load analytics',
    loopId: 'weekly-bundle-trim',
    lighthouse: { lcp: 2300, cls: 0.07, tti: 3000 },
    udec: { ctx: 0.88, dyn: 0.9, lft: 0.87, acc: 0.93 },
    diffBefore: "const DashboardShowcase = () => <DashboardShowcase />;",
    diffAfter: "const DashboardShowcase = lazy(() => import('@/components/DashboardShowcase'));",
  },
];

const ReviewsTab = () => {
  const [selected, setSelected] = useState(mockPullRequests[0]);

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <Card className="border-white/10 bg-slate-950/40">
        <CardHeader>
          <CardTitle className="text-xl">Pending approvals</CardTitle>
          <CardDescription className="text-white/60">
            Operator-in-the-loop reviews before Lovable Cloud merge.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="max-h-[480px] pr-4">
            <div className="space-y-3">
              {mockPullRequests.map((pr) => (
                <button
                  key={pr.id}
                  onClick={() => setSelected(pr)}
                  className={`w-full rounded-2xl border p-4 text-left transition ${
                    selected.id === pr.id
                      ? 'border-emerald-400/50 bg-emerald-500/10 text-white'
                      : 'border-white/10 bg-white/5 text-white/70 hover:border-emerald-300/40'
                  }`}
                >
                  <p className="text-sm font-semibold">{pr.title}</p>
                  <p className="text-xs text-white/60">{pr.id}</p>
                  <Badge className="mt-2 bg-white/10 text-xs text-white/70">{pr.loopId}</Badge>
                </button>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="border-white/10 bg-slate-950/40">
        <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="text-2xl">{selected.title}</CardTitle>
            <CardDescription className="text-white/60">Compare diffs, budgets, and UDEC impact before approving.</CardDescription>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary">Request changes</Button>
            <Button>Approve &amp; Merge</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">LCP</p>
              <p className="text-lg font-semibold text-white">{selected.lighthouse.lcp} ms</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">CLS</p>
              <p className="text-lg font-semibold text-white">{selected.lighthouse.cls}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">TTI</p>
              <p className="text-lg font-semibold text-white">{selected.lighthouse.tti} ms</p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {Object.entries(selected.udec).map(([key, value]) => (
              <div key={key} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">{key}</p>
                <p className="text-lg font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <ReactDiffViewer
              leftTitle="Before"
              rightTitle="After"
              oldValue={selected.diffBefore}
              newValue={selected.diffAfter}
              splitView
              useDarkTheme
              compareMethod={DiffMethod.WORDS}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewsTab;
