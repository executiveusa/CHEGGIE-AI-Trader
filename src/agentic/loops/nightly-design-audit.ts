import { runFlow } from '@/services/flowwise';
import { AuditLog } from '@/agentic/schema/audit';

export const NIGHTLY_LOOP_ID = 'nightly-design-audit';

export async function nightlyDesignAudit(): Promise<AuditLog> {
  const tasks = [
    'collect_dom_snapshots',
    'run_lighthouse',
    'run_axe',
    'run_udec_validator',
    'propose_fixes_via_flowwise',
    'open_pr_lovable_cloud',
  ];

  const executedTasks = await Promise.all(
    tasks.map(async (task) => {
      const base = {
        id: task,
        startedAt: new Date().toISOString(),
      };

      try {
        const metadata = task.includes('flowwise')
          ? await runFlow('design-audit-flow', { task })
          : { note: 'Simulated execution for local development' };

        return {
          ...base,
          status: 'completed' as const,
          completedAt: new Date().toISOString(),
          metadata,
        };
      } catch (error) {
        return {
          ...base,
          status: 'failed' as const,
          error: error instanceof Error ? error.message : 'Unknown Flowise error',
        };
      }
    }),
  );

  return {
    ts: new Date().toISOString(),
    loopId: NIGHTLY_LOOP_ID,
    tasks: executedTasks,
    summary: 'Nightly design audit completed using Flowise orchestration.',
  };
}
