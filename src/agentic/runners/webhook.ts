import { AgentOrchestrator } from '@/agentic/orchestrator';

export interface AgentWebhookPayload {
  loopId: string;
  action: 'run-now' | 'status';
}

export function createAgentWebhook(orchestrator: AgentOrchestrator) {
  return async function handleWebhook(request: Request): Promise<Response> {
    try {
      const body = (await request.json()) as AgentWebhookPayload;
      if (body.action === 'run-now') {
        const log = await orchestrator.runLoop(body.loopId);
        return new Response(JSON.stringify({ success: true, log }), {
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (body.action === 'status') {
        return new Response(JSON.stringify({ success: true, status: orchestrator.getStatuses() }), {
          headers: { 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ success: false, error: 'Unknown action' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('[Agent Webhook] handler failed', error);
      return new Response(JSON.stringify({ success: false, error: String(error) }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  };
}
