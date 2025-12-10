import { z } from 'zod';

export const AuditTaskSchema = z.object({
  id: z.string(),
  status: z.enum(['pending', 'running', 'completed', 'failed', 'awaiting-approval']),
  startedAt: z.string().optional(),
  completedAt: z.string().optional(),
  durationMs: z.number().optional(),
  error: z.string().optional(),
  metadata: z.record(z.any()).optional(),
});

export const AuditLogSchema = z.object({
  ts: z.string(),
  loopId: z.string(),
  tasks: z.array(AuditTaskSchema),
  summary: z.string().optional(),
});

export type AuditLog = z.infer<typeof AuditLogSchema>;

export const LighthouseBudgetSchema = z.object({
  lcp: z.number().max(2500),
  cls: z.number().max(0.1),
  tti: z.number().max(3200),
});

export const UdecScoreSchema = z.object({
  ctx: z.number().min(0).max(1),
  dyn: z.number().min(0).max(1),
  lft: z.number().min(0).max(1),
  acc: z.number().min(0).max(1),
});

export const AgentLoopStatusSchema = z.object({
  id: z.string(),
  title: z.string(),
  schedule: z.string(),
  status: z.enum(['idle', 'running', 'error', 'awaiting-approval']),
  nextRun: z.string().optional(),
  lastRun: z.string().optional(),
  approvalsRequired: z.boolean(),
  approvalsRoute: z.string().optional(),
  budgets: LighthouseBudgetSchema.optional(),
  udec: UdecScoreSchema.optional(),
});

export type AgentLoopStatus = z.infer<typeof AgentLoopStatusSchema>;
