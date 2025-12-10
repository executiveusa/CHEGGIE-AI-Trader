import type { ScheduleOptions } from 'node-cron';
import { AgentOrchestrator } from '@/agentic/orchestrator';

export async function initializeCronRunner(options?: ScheduleOptions) {
  const orchestrator = new AgentOrchestrator();
  await orchestrator.startSchedules(options);
  return orchestrator;
}
