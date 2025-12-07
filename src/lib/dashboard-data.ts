import { addDays, format } from 'date-fns';

type Metric = {
  id: string;
  label: string;
  value: number;
  delta: number;
  format: 'currency' | 'percentage' | 'count';
};

type RevenuePoint = {
  month: string;
  recurring: number;
  affiliates: number;
};

type WorkflowTask = {
  id: string;
  name: string;
  status: 'queued' | 'running' | 'completed';
  owner: string;
  due: string;
  type: 'analysis' | 'content' | 'billing';
};

type Signal = {
  asset: string;
  action: 'Buy' | 'Hold' | 'Hedge';
  confidence: number;
  horizon: string;
};

type AffiliateLeaderboardEntry = {
  name: string;
  referrals: number;
  conversion: number;
  revenue: number;
};

type ComplianceEvent = {
  id: string;
  label: string;
  timestamp: string;
  link: string;
};

type LearningResource = {
  id: string;
  title: string;
  category: string;
  summary: string;
  link: string;
};

type PortfolioAccount = {
  name: string;
  type: 'Brokerage' | 'Crypto Wallet' | 'FX Account';
  balance: number;
  delta: number;
};

type CurrencyHolding = {
  code: string;
  allocation: number;
  growth: number;
};

type Transfer = {
  network: string;
  amount: number;
  status: 'confirmed' | 'pending';
  hash: string;
  link: string;
};

export type DashboardData = {
  user: {
    name: string;
    locale: string;
    lastLogin: string;
  };
  metrics: Metric[];
  revenue: RevenuePoint[];
  workflows: WorkflowTask[];
  signals: Signal[];
  affiliates: {
    totals: {
      referrals: number;
      earnings: number;
      payoutDate: string;
    };
    leaderboard: AffiliateLeaderboardEntry[];
  };
  compliance: ComplianceEvent[];
  learning: LearningResource[];
  accounts: PortfolioAccount[];
  currencies: CurrencyHolding[];
  transfers: Transfer[];
  invoices: {
    upcoming: number;
    paid: number;
    overdue: number;
  };
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchDashboardData(): Promise<DashboardData> {
  await wait(450);

  const baseDate = new Date();

  return {
    user: {
      name: 'Nikola',
      locale: 'sr-RS',
      lastLogin: format(addDays(baseDate, -1), "dd MMM yyyy, HH:mm"),
    },
    metrics: [
      {
        id: 'assets',
        label: 'Assets under guidance',
        value: 1240000,
        delta: 12.4,
        format: 'currency',
      },
      {
        id: 'analysis',
        label: 'AI analyses completed',
        value: 284,
        delta: 18.6,
        format: 'count',
      },
      {
        id: 'affiliate',
        label: 'Affiliate revenue (30d)',
        value: 9620,
        delta: 22.1,
        format: 'currency',
      },
      {
        id: 'retention',
        label: 'Subscriber retention',
        value: 92,
        delta: 4.5,
        format: 'percentage',
      },
    ],
    revenue: Array.from({ length: 6 }).map((_, index) => {
      const date = addDays(baseDate, index * -30);
      return {
        month: format(date, 'MMM yyyy'),
        recurring: 4800 + index * 520,
        affiliates: 1400 + index * 230,
      };
    }).reverse(),
    workflows: [
      {
        id: 'wf-001',
        name: 'Serbia youth FX insights',
        status: 'running',
        owner: 'AI Analyst',
        due: format(addDays(baseDate, 1), 'dd MMM'),
        type: 'analysis',
      },
      {
        id: 'wf-002',
        name: 'BTC remittance compliance brief',
        status: 'queued',
        owner: 'Compliance Bot',
        due: format(addDays(baseDate, 2), 'dd MMM'),
        type: 'billing',
      },
      {
        id: 'wf-003',
        name: 'Spanish investor deck localization',
        status: 'completed',
        owner: 'Content Studio',
        due: format(addDays(baseDate, -3), 'dd MMM'),
        type: 'content',
      },
    ],
    signals: [
      { asset: 'EUR/RSD', action: 'Buy', confidence: 86, horizon: '14 days' },
      { asset: 'BTC', action: 'Hold', confidence: 72, horizon: '30 days' },
      { asset: 'MSFT', action: 'Hedge', confidence: 65, horizon: '21 days' },
    ],
    affiliates: {
      totals: {
        referrals: 412,
        earnings: 18740,
        payoutDate: format(addDays(baseDate, 5), 'dd MMM yyyy'),
      },
      leaderboard: [
        { name: 'Belgrade FinLab', referrals: 128, conversion: 34, revenue: 5420 },
        { name: 'Skopje Ledger', referrals: 92, conversion: 29, revenue: 4210 },
        { name: 'Madrid Quant Club', referrals: 76, conversion: 26, revenue: 3390 },
      ],
    },
    compliance: [
      {
        id: 'cmp-1',
        label: 'KYC auto-approval synced to Lovable Cloud',
        timestamp: format(addDays(baseDate, -2), "dd MMM yyyy, HH:mm"),
        link: 'https://docs.lovable.dev/security/identity-access',
      },
      {
        id: 'cmp-2',
        label: 'Stripe webhook verified (invoice.paid)',
        timestamp: format(addDays(baseDate, -3), "dd MMM yyyy, HH:mm"),
        link: 'https://stripe.com/docs/billing/webhooks',
      },
      {
        id: 'cmp-3',
        label: 'Bitcoin transfer registered on mempool.space',
        timestamp: format(addDays(baseDate, -4), "dd MMM yyyy, HH:mm"),
        link: 'https://mempool.space',
      },
    ],
    learning: [
      {
        id: 'learn-1',
        title: 'BMAD framework for Serbian fintech founders',
        category: 'Playbook',
        summary: 'Step-by-step workbook guiding Belief, Motivation, Ability, and Data for acquisition.',
        link: 'https://www.behavioraleconomics.com/resources/mini-encyclopedia-of-biases/',
      },
      {
        id: 'learn-2',
        title: 'FX hedging strategies for Balkan exporters',
        category: 'Course',
        summary: 'Video lessons and calculators covering EUR/RSD risk management with real market data.',
        link: 'https://www.investopedia.com/terms/c/currency-hedge.asp',
      },
      {
        id: 'learn-3',
        title: 'Self-custody with Lightning compliance',
        category: 'Guide',
        summary: 'Checklist for sending Bitcoin through regulated Serbian partners while staying decentralized.',
        link: 'https://lightning.network/',
      },
    ],
    accounts: [
      { name: 'Lovable Brokerage', type: 'Brokerage', balance: 684200, delta: 8.3 },
      { name: 'On-chain Treasury', type: 'Crypto Wallet', balance: 384500, delta: 5.6 },
      { name: 'FX Reserve', type: 'FX Account', balance: 171300, delta: 2.8 },
    ],
    currencies: [
      { code: 'RSD', allocation: 38, growth: 4.2 },
      { code: 'EUR', allocation: 27, growth: 5.4 },
      { code: 'USD', allocation: 21, growth: 3.1 },
      { code: 'BTC', allocation: 14, growth: 12.8 },
    ],
    transfers: [
      {
        network: 'Bitcoin Lightning',
        amount: 0.85,
        status: 'confirmed',
        hash: 'c7421abcf3',
        link: 'https://mempool.space/lightning',
      },
      {
        network: 'SEPA Instant',
        amount: 2400,
        status: 'pending',
        hash: 'SI938455',
        link: 'https://www.europeanpaymentscouncil.eu/what-we-do/sepa-instant-credit-transfer',
      },
    ],
    invoices: {
      upcoming: 3,
      paid: 28,
      overdue: 1,
    },
  };
}
