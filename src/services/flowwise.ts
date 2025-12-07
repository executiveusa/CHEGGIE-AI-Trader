export async function runFlow(flowId: string, input: unknown) {
  const baseUrl = import.meta.env.VITE_FLOWWISE_URL;
  const apiKey = import.meta.env.VITE_FLOWWISE_KEY;

  if (!baseUrl) {
    throw new Error('Missing VITE_FLOWWISE_URL environment variable.');
  }

  const response = await fetch(`${baseUrl}/api/v1/prediction/${flowId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: apiKey ? `Bearer ${apiKey}` : '',
    },
    body: JSON.stringify(input ?? {}),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Flowise error: ${response.status} ${detail}`);
  }

  return response.json();
}

export interface FlowiseWebhookResult {
  success: boolean;
  email?: string;
  metadata?: Record<string, unknown>;
}

export async function validateAdminCredentials(username: string, password: string): Promise<FlowiseWebhookResult> {
  const endpoint = import.meta.env.VITE_FLOWWISE_URL;
  const apiKey = import.meta.env.VITE_FLOWWISE_KEY;

  if (!endpoint) {
    return {
      success: username === 'admin' && password.length > 7,
      email: username,
      metadata: { mocked: true },
    };
  }

  const response = await fetch(`${endpoint}/api/v1/webhook/admin-login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: apiKey ? `Bearer ${apiKey}` : '',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    return {
      success: false,
      metadata: { status: response.status },
    };
  }

  const data = (await response.json()) as FlowiseWebhookResult;
  return data;
}
