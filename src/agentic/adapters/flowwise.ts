import { runFlow } from '@/services/flowwise';

export async function proposeFixes(flowId: string, input: Record<string, unknown>) {
  try {
    return await runFlow(flowId, input);
  } catch (error) {
    console.error('[Flowise Adapter] Error running flow', error);
    throw error;
  }
}
