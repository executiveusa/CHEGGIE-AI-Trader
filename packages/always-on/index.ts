export interface AlwaysOnJob {
  id: string;
  goal: string;
  payload: Record<string, unknown>;
  priority?: 'low' | 'medium' | 'high';
  createdAt?: string;
}

export type ListenerOptions = {
  queue: string;
  pollIntervalMs?: number;
};

export async function* startListener({ queue, pollIntervalMs = 2000 }: ListenerOptions): AsyncGenerator<AlwaysOnJob> {
  let counter = 0;
  while (true) {
    await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
    counter += 1;
    yield {
      id: `${queue}-${counter}`,
      goal: 'Sample Always-On job',
      payload: { iteration: counter },
      priority: counter % 3 === 0 ? 'high' : 'medium',
      createdAt: new Date().toISOString(),
    };
  }
}

export async function ack(jobId: string, result: unknown): Promise<void> {
  console.info(`[Always-On] Job ${jobId} acknowledged`, result);
}

export async function fail(jobId: string, err: unknown): Promise<void> {
  console.error(`[Always-On] Job ${jobId} failed`, err);
}
