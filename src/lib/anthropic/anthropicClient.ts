export type ClaudeOptions = { model?: string; max_tokens?: number };

export async function callClaude(prompt: string, opts: ClaudeOptions = {}) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error('ANThROPIC_API_KEY is not set in environment');

  const body = {
    model: opts.model ?? 'claude-4',
    prompt,
    max_tokens_to_sample: opts.max_tokens ?? 300,
  };

  const res = await fetch('https://api.anthropic.com/v1/complete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Anthropic API error ${res.status}: ${text}`);
  }

  return res.json();
}