import type { NextApiRequest, NextApiResponse } from 'next';
import { callClaude } from '../../../lib/anthropic/anthropicClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { prompt, model, max_tokens } = req.body;
    if (typeof prompt !== 'string') {
      return res.status(400).json({ error: 'prompt (string) is required' });
    }
    const result = await callClaude(prompt, { model, max_tokens });
    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(500).json({ error: err?.message ?? 'Unknown error' });
  }
}