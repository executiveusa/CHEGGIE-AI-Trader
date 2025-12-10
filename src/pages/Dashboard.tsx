import { useEffect } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { FinancialDashboard } from '@/components/FinancialDashboard';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Building2,
  CreditCard,
  ExternalLink,
  GraduationCap,
  Network,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { fetchDashboardData, DashboardData } from '@/lib/dashboard-data';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

const formatValue = (value: number, format: 'currency' | 'percentage' | 'count') => {
  if (format === 'currency') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  }
  if (format === 'percentage') {
    return `${value.toFixed(0)}%`;
  }
  return new Intl.NumberFormat('en-US').format(value);
};

const statusBadgeVariant: Record<DashboardData['workflows'][number]['status'], string> = {
  queued: 'secondary',
  running: 'default',
  completed: 'success',
};

const statusCopy: Record<DashboardData['workflows'][number]['status'], string> = {
  queued: 'Queued',
  running: 'In progress',
  completed: 'Completed',
};

const chartConfig = {
  recurring: {
    label: 'Recurring revenue',
    color: 'var(--chart-1)',
  },
  affiliates: {
    label: 'Affiliate revenue',
    color: 'var(--chart-2)',
  },
} as const;

const quickActions = [
  {
    label: 'Launch OpenRouter workflow',
    description: 'Trigger a multi-agent research sprint in OpenRouter.',
    href: 'https://openrouter.ai',
    icon: Bot,
  },
  {
    label: 'Sync Lovable Cloud data',
    description: 'Review latest Lovable Cloud audit and API metrics.',
    href: 'https://docs.lovable.dev/',
    icon: Network,
  },
  {
    label: 'Manage Stripe billing',
    description: 'Update subscriptions and verify payouts in Stripe.',
    href: 'https://dashboard.stripe.com/',
    icon: CreditCard,
  },
];

const referenceLinks = [
  {
    label: 'Bitcoin policy for Serbia (NBS)',
    href: 'https://nbs.rs/sr/finansijske-usluge/kripto-imovina/'
  },
  {
    label: 'European AI compliance playbook',
    href: 'https://digital-strategy.ec.europa.eu/en/policies/eu-ai-act'
  },
  {
    label: 'Global fintech benchmarking by World Bank',
    href: 'https://www.worldbank.org/en/topic/fintech'
  },
];

const DashboardSkeleton = () => (
  <div className="container mx-auto px-4 pt-32 pb-16 space-y-6">
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index} className="border-0 shadow-sm">
          <CardHeader>
            <Skeleton className="h-4 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-10 w-24" />
            <Skeleton className="mt-4 h-4 w-20" />
          </CardContent>
        </Card>
      ))}
    </div>
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <Skeleton className="h-5 w-48" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-64 w-full" />
      </CardContent>
    </Card>
  </div>
);

const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user: adminUser, loading: authLoading } = useAdminAuth();
  const [dashboardMode, setDashboardMode] = useState<'trading' | 'business'>('trading');

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !adminUser) {
      navigate('/auth', { replace: true });
    }
  }, [adminUser, authLoading, navigate]);

  // Show loading state while checking auth
  if (authLoading) {
    return <DashboardSkeleton />;
  }

  // Don't render dashboard if not authenticated
  if (!adminUser) {
    return null;
  }

  const { data, isLoading } = useQuery({
    queryKey: ['dashboard-data'],
    queryFn: fetchDashboardData,
  });

  const totals = useMemo(() => {
    if (!data) return null;
    const bitcoinTransfer = data.transfers.find((transfer) => transfer.network.includes('Bitcoin'));
    return {
      assets: data.metrics.find((metric) => metric.id === 'assets'),
      affiliate: data.metrics.find((metric) => metric.id === 'affiliate'),
      bitcoinTransfer,
    };
  }, [data]);

  return (
    <div className="min-h-screen bg-muted/20">
      <Navigation />
      
      {/* Dashboard Mode Switcher */}
      <div className="fixed top-24 right-4 z-40 flex gap-2">
        <button
          onClick={() => setDashboardMode('trading')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            dashboardMode === 'trading'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Trading Dashboard
        </button>
        <button
          onClick={() => setDashboardMode('business')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            dashboardMode === 'business'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Business Dashboard
        </button>
      </div>

      {/* Trading Dashboard */}
      {dashboardMode === 'trading' && (
        <div className="container mx-auto px-4 pt-32 pb-16">
          <FinancialDashboard />
        </div>
      )}

      {/* Business Dashboard */}
      {dashboardMode === 'business' && (
        <>
          {isLoading && <DashboardSkeleton />}
          {!isLoading && data && (
            <div className="container mx-auto px-4 pt-32 pb-16 space-y-10">
          <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <Badge variant="outline" className="w-fit border-primary text-primary">
                {t('dashboard.welcome')} · {data.user.name}
              </Badge>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {t('dashboard.title')}
              </h1>
              <p className="max-w-2xl text-muted-foreground">
                Track assets, affiliate momentum, Bitcoin transfers, and multilingual workflows in one trusted dashboard.
                Every module follows Steve Krug's “don’t make me think” principle with clear next steps.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="bg-gradient-primary shadow-glow" asChild>
                  <a href="https://lovable.dev" target="_blank" rel="noreferrer">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Launch Lovable Cloud Console
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="border-primary/40" asChild>
                  <a href="https://portal.openrouter.ai" target="_blank" rel="noreferrer">
                    OpenRouter Tasks
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Last synchronized: {data.user.lastLogin} ({data.user.locale})
              </p>
            </div>
            <Card className="border-0 bg-gradient-to-br from-primary/90 to-primary/60 text-primary-foreground shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base font-medium">
                  <ShieldCheck className="h-5 w-5" /> Compliance snapshot
                </CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  Real-time sync with Lovable Cloud audit center
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {data.compliance.map((event) => (
                  <a
                    key={event.id}
                    href={event.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-start gap-3 rounded-lg bg-primary/20 p-3 transition hover:bg-primary/30"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-background/80">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-tight text-primary-foreground">
                        {event.label}
                      </p>
                      <p className="text-xs text-primary-foreground/80">{event.timestamp}</p>
                    </div>
                    <ExternalLink className="ml-auto h-4 w-4 text-primary-foreground/70" />
                  </a>
                ))}
              </CardContent>
            </Card>
          </header>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {data.metrics.map((metric) => {
              const isPositive = metric.delta >= 0;
              const Icon = isPositive ? ArrowUpRight : ArrowDownRight;
              return (
                <Card key={metric.id} className="border-0 shadow-md">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {metric.label}
                    </CardTitle>
                    <Badge variant="secondary" className="gap-1">
                      <Icon className={`h-4 w-4 ${isPositive ? 'text-emerald-500' : 'text-red-500'}`} />
                      <span className={isPositive ? 'text-emerald-600' : 'text-red-600'}>
                        {isPositive ? '+' : ''}
                        {metric.delta}%
                      </span>
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-semibold text-foreground">
                      {formatValue(metric.value, metric.format)}
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Rolling 30-day trend powered by Cheggie AI playbooks.
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </section>

          <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <Card className="border-0 shadow-md">
              <CardHeader className="space-y-1">
                <CardTitle className="text-lg font-semibold">Revenue momentum</CardTitle>
                <CardDescription>Recurring and affiliate revenue across the last six months.</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[320px]">
                  <AreaChart data={data.revenue}>
                    <defs>
                      <linearGradient id="fill-recurring" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.05} />
                      </linearGradient>
                      <linearGradient id="fill-affiliates" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="4 4" strokeOpacity={0.2} />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${value / 1000}k`} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="recurring"
                      stroke="var(--chart-1)"
                      fill="url(#fill-recurring)"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="affiliates"
                      stroke="var(--chart-2)"
                      fill="url(#fill-affiliates)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">AI trade signals</CardTitle>
                <CardDescription>Generated by OpenRouter agents with Lovable Cloud validation.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.signals.map((signal) => (
                  <div key={signal.asset} className="rounded-lg border bg-card p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{signal.asset}</p>
                        <p className="text-lg font-semibold text-foreground">{signal.action}</p>
                      </div>
                      <Badge className="bg-primary/10 text-primary">
                        {signal.horizon}
                      </Badge>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Confidence</span>
                        <span>{signal.confidence}%</span>
                      </div>
                      <Progress value={signal.confidence} className="h-2" />
                    </div>
                  </div>
                ))}
                {totals?.bitcoinTransfer && (
                  <Button variant="outline" className="w-full" asChild>
                    <a href={totals.bitcoinTransfer.link} target="_blank" rel="noreferrer">
                      <Network className="mr-2 h-4 w-4" />
                      View Bitcoin transfer proof
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
            <Card className="border-0 shadow-md">
              <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">Active workflows</CardTitle>
                  <CardDescription>Focus on the next best action with status-aware AI automations.</CardDescription>
                </div>
                <Button variant="outline" asChild>
                  <a href="https://portal.openrouter.ai/workflows" target="_blank" rel="noreferrer">
                    <Bot className="mr-2 h-4 w-4" /> View orchestrations
                  </a>
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.workflows.map((workflow) => (
                  <div
                    key={workflow.id}
                    className="flex flex-col gap-4 rounded-lg border bg-card/60 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-foreground">{workflow.name}</p>
                      <p className="text-xs text-muted-foreground">{workflow.owner}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <Badge className={statusBadgeVariant[workflow.status]}>{statusCopy[workflow.status]}</Badge>
                      <span className="text-muted-foreground">Due {workflow.due}</span>
                      <Button size="sm" variant="ghost" asChild>
                        <a href={`https://lovable.dev/templates?filter=${workflow.type}`} target="_blank" rel="noreferrer">
                          Manage flow
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Quick actions</CardTitle>
                <CardDescription>One click to your most frequent operations.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {quickActions.map(({ label, description, href, icon: Icon }) => (
                  <Button key={label} variant="outline" className="w-full justify-start gap-3" asChild>
                    <a href={href} target="_blank" rel="noreferrer">
                      <Icon className="h-4 w-4" />
                      <span className="flex-1 text-left">
                        <span className="block text-sm font-semibold text-foreground">{label}</span>
                        <span className="block text-xs text-muted-foreground">{description}</span>
                      </span>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </a>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-6 2xl:grid-cols-[2fr_1.2fr]">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Affiliate performance</CardTitle>
                <CardDescription>
                  Referrals and commissions with payout forecast for {data.affiliates.totals.payoutDate}.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-lg border bg-card/60 p-4">
                    <p className="text-xs text-muted-foreground">Total referrals</p>
                    <p className="mt-2 text-2xl font-semibold">{data.affiliates.totals.referrals}</p>
                  </div>
                  <div className="rounded-lg border bg-card/60 p-4">
                    <p className="text-xs text-muted-foreground">Projected payout</p>
                    <p className="mt-2 text-2xl font-semibold">
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(
                        data.affiliates.totals.earnings,
                      )}
                    </p>
                  </div>
                  <div className="rounded-lg border bg-card/60 p-4">
                    <p className="text-xs text-muted-foreground">Next payment</p>
                    <p className="mt-2 text-2xl font-semibold">{data.affiliates.totals.payoutDate}</p>
                  </div>
                </div>
                <Table className="mt-6">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Partner</TableHead>
                      <TableHead className="hidden sm:table-cell">Referrals</TableHead>
                      <TableHead className="hidden sm:table-cell">Conversion</TableHead>
                      <TableHead>Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.affiliates.leaderboard.map((entry) => (
                      <TableRow key={entry.name}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            <span>{entry.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">{entry.referrals}</TableCell>
                        <TableCell className="hidden sm:table-cell">{entry.conversion}%</TableCell>
                        <TableCell>
                          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(
                            entry.revenue,
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Portfolio & transfers</CardTitle>
                <CardDescription>Real accounts managed across brokerage, FX, and crypto holdings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs defaultValue="accounts" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="accounts">Accounts</TabsTrigger>
                    <TabsTrigger value="currencies">Holdings</TabsTrigger>
                    <TabsTrigger value="transfers">Transfers</TabsTrigger>
                  </TabsList>
                  <TabsContent value="accounts" className="space-y-3">
                    {data.accounts.map((account) => (
                      <div key={account.name} className="flex items-center justify-between rounded-lg border bg-card/60 p-4">
                        <div>
                          <p className="text-sm font-semibold text-foreground">{account.name}</p>
                          <p className="text-xs text-muted-foreground">{account.type}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">
                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(
                              account.balance,
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {account.delta > 0 ? '+' : ''}
                            {account.delta}% this month
                          </p>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                  <TabsContent value="currencies" className="space-y-3">
                    {data.currencies.map((currency) => (
                      <div key={currency.code} className="rounded-lg border bg-card/60 p-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-semibold">{currency.code}</span>
                          <span>{currency.allocation}% allocation</span>
                        </div>
                        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                          <span>Growth</span>
                          <span>{currency.growth}%</span>
                        </div>
                        <Progress value={currency.growth} className="mt-2 h-2" />
                      </div>
                    ))}
                  </TabsContent>
                  <TabsContent value="transfers" className="space-y-3">
                    {data.transfers.map((transfer) => (
                      <div key={transfer.hash} className="rounded-lg border bg-card/60 p-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-semibold">{transfer.network}</span>
                          <Badge className={transfer.status === 'confirmed' ? 'bg-emerald-500 text-white' : 'bg-amber-400 text-black'}>
                            {transfer.status}
                          </Badge>
                        </div>
                        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                          <span>Amount</span>
                          <span>
                            {transfer.network.includes('Bitcoin')
                              ? `${transfer.amount} BTC`
                              : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(
                                  transfer.amount,
                                )}
                          </span>
                        </div>
                        <Button variant="ghost" size="sm" className="mt-3 gap-2" asChild>
                          <a href={transfer.link} target="_blank" rel="noreferrer">
                            Inspect transfer
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
                <div className="rounded-lg border bg-muted/40 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Billing status</p>
                  <div className="mt-3 grid grid-cols-3 gap-3 text-center text-sm">
                    <div>
                      <p className="text-2xl font-semibold text-foreground">{data.invoices.paid}</p>
                      <p className="text-xs text-muted-foreground">Paid</p>
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-foreground">{data.invoices.upcoming}</p>
                      <p className="text-xs text-muted-foreground">Upcoming</p>
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-foreground">{data.invoices.overdue}</p>
                      <p className="text-xs text-muted-foreground">Overdue</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Learning spotlight</CardTitle>
                <CardDescription>Keep your Serbian finance community ahead with curated resources.</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[260px]">
                  <div className="space-y-4 pr-4">
                    {data.learning.map((resource) => (
                      <div key={resource.id} className="rounded-lg border bg-card/60 p-4">
                        <div className="flex items-center gap-2 text-xs text-primary">
                          <GraduationCap className="h-4 w-4" />
                          <span className="uppercase tracking-wide">{resource.category}</span>
                        </div>
                        <h3 className="mt-2 text-base font-semibold text-foreground">{resource.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{resource.summary}</p>
                        <Button size="sm" variant="link" className="mt-2 px-0" asChild>
                          <a href={resource.link} target="_blank" rel="noreferrer">
                            Explore material
                            <ExternalLink className="ml-1 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Reference center</CardTitle>
                <CardDescription>Trusted institutions, ready for legal review.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {referenceLinks.map((item) => (
                  <Button key={item.label} variant="outline" className="w-full justify-between" asChild>
                    <a href={item.href} target="_blank" rel="noreferrer">
                      <span className="max-w-[80%] text-left text-sm font-medium text-foreground">{item.label}</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                ))}
                <div className="rounded-lg border border-dashed border-primary/40 bg-primary/5 p-4 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">Need a human? Schedule a compliance call.</p>
                  <Button size="sm" className="mt-3 bg-primary text-primary-foreground shadow-glow" asChild>
                    <a href="https://cal.com" target="_blank" rel="noreferrer">
                      Book 30 min with Cheggie team
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {totals?.assets && totals?.affiliate && (
            <Card className="border-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 shadow-inner">
              <CardContent className="flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-wide text-muted-foreground">Strategic summary</p>
                  <h2 className="mt-2 text-2xl font-semibold text-foreground">
                    Assets under guidance now at {formatValue(totals.assets.value, totals.assets.format)} with
                    {` ${totals.assets.delta}%`} growth.
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                    Affiliate momentum adds {formatValue(totals.affiliate.value, totals.affiliate.format)} in the last month.
                    Keep campaigns aligned with BMAD — Belief, Motivation, Ability, Data — to keep Serbian youth confident in
                    international finance tools.
                  </p>
                </div>
                <Button size="lg" className="bg-primary text-primary-foreground shadow-lg" asChild>
                  <a href="https://stripe.com/issuing" target="_blank" rel="noreferrer">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Scale payouts securely
                  </a>
                </Button>
              </CardContent>
            </Card>
          )}

          <footer className="pt-6 text-sm text-muted-foreground">
            <p className="text-center">
              Built for Cheggie AI on Lovable Cloud · Secure AI, Bitcoin, and FX automation ready for Serbia.
            </p>
          </footer>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
