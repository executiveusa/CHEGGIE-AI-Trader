import type { ScheduleOptions } from 'node-cron';
import { AuditLog, AgentLoopStatus, AgentLoopStatusSchema } from '@/agentic/schema/audit';
import { nightlyDesignAudit, NIGHTLY_LOOP_ID } from '@/agentic/loops/nightly-design-audit';
import { weeklyBundleTrim, WEEKLY_LOOP_ID } from '@/agentic/loops/weekly-bundle-trim';

export interface AgentLoopDefinition {
  id: string;
  title: string;
  schedule: string;
  tasks: string[];
  approvals: {
    required: boolean;
    route: string;
  };
}

export const agentLoops: AgentLoopDefinition[] = [
  {
    id: NIGHTLY_LOOP_ID,
    title: 'Nightly Design Audit',
    schedule: '0 3 * * *',
    tasks: ['collect_dom_snapshots', 'run_lighthouse', 'run_axe', 'run_udec_validator', 'propose_fixes_via_flowwise', 'open_pr_lovable_cloud'],
    approvals: {
      required: true,
      route: '/admin/reviews',
    },
  },
  {
    id: WEEKLY_LOOP_ID,
    title: 'Weekly Bundle Trim',
    schedule: '0 4 * * 1',
    tasks: ['analyze_bundles', 'suggest_dynamic_imports', 'verify_lcp_cls', 'open_pr_lovable_cloud'],
    approvals: {
      required: true,
      route: '/admin/reviews',
    },
  },
];

type LoopHandler = () => Promise<AuditLog>;

const loopHandlers: Record<string, LoopHandler> = {
  [NIGHTLY_LOOP_ID]: nightlyDesignAudit,
  [WEEKLY_LOOP_ID]: weeklyBundleTrim,
};

export class AgentOrchestrator {
  private statuses = new Map<string, AgentLoopStatus>();
  private cronJobs: Array<{ stop: () => void }> = [];
  private listeners: Array<(log: AuditLog) => void> = [];

  constructor(private handlers: Record<string, LoopHandler> = loopHandlers) {
    const now = new Date().toISOString();
    agentLoops.forEach((loop) => {
      this.statuses.set(loop.id, {
        id: loop.id,
        title: loop.title,
        schedule: loop.schedule,
        status: 'idle',
        approvalsRequired: loop.approvals.required,
        approvalsRoute: loop.approvals.route,
        nextRun: now,
      });
    });
  }

  subscribe(listener: (log: AuditLog) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  getStatuses(): AgentLoopStatus[] {
    return Array.from(this.statuses.values()).map((status) => AgentLoopStatusSchema.parse(status));
  }

  async runLoop(loopId: string): Promise<AuditLog> {
    const handler = this.handlers[loopId];
    if (!handler) {
      throw new Error(`No handler registered for loop ${loopId}`);
    }

    const status = this.statuses.get(loopId);
    if (status) {
      this.statuses.set(loopId, { ...status, status: 'running', lastRun: new Date().toISOString() });
    }

    try {
      const log = await handler();
      this.listeners.forEach((listener) => listener(log));
      this.statuses.set(loopId, {
        ...(status ?? { id: loopId, title: loopId, schedule: '* * * * *', approvalsRequired: false }),
        status: log.tasks.some((task) => task.status === 'failed') ? 'error' : 'idle',
        lastRun: log.ts,
        nextRun: this.calculateNextRun(loopId),
      });
      return log;
    } catch (error) {
      console.error(`[AgentOrchestrator] Loop ${loopId} failed`, error);
      this.statuses.set(loopId, {
        ...(status ?? { id: loopId, title: loopId, schedule: '* * * * *', approvalsRequired: false }),
        status: 'error',
        lastRun: new Date().toISOString(),
        nextRun: this.calculateNextRun(loopId),
      });
      throw error;
    }
  }

  async startSchedules(options?: ScheduleOptions) {
    if (typeof window !== 'undefined') {
      console.info('[AgentOrchestrator] Cron schedules disabled in browser runtime.');
      return;
    }

    const cron = await import('node-cron');

    agentLoops.forEach((loop) => {
      const job = cron.schedule(
        loop.schedule,
        async () => {
          await this.runLoop(loop.id);
        },
        options,
      );
      this.cronJobs.push(job);
    });
  }

  stopSchedules() {
    this.cronJobs.forEach((job) => job.stop());
    this.cronJobs = [];
  }

  private calculateNextRun(loopId: string) {
    const loop = agentLoops.find((item) => item.id === loopId);
    if (!loop) return undefined;
    return new Date(Date.now() + 60 * 60 * 1000).toISOString();
  }
}
