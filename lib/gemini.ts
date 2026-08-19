import { GoogleGenAI } from '@google/genai';
import pRetry from 'p-retry';
import pTimeout from 'p-timeout';

/**
 * Shared Gemini client for the AI chat widget and the quote-analysis
 * drafter, backed by Google's official `@google/genai` SDK.
 *
 * `genAI` is `null` until GEMINI_API_KEY is set in the environment — every
 * call site checks `isGeminiConfigured` first and degrades gracefully
 * (a clear 503, or the feature quietly not rendering) instead of crashing,
 * matching the pattern already used for the database connection in
 * lib/db.ts.
 *
 * Get a key from Google AI Studio (aistudio.google.com/apikey) — the free
 * tier is generous enough for a small business site's chat widget.
 */
const apiKey = process.env.GEMINI_API_KEY;

export const isGeminiConfigured = Boolean(apiKey);

export const genAI = apiKey ? new GoogleGenAI({ apiKey }) : null;

// The whole Gemini 2.5 family (including 2.5-flash-lite, which is cheaper
// on paper) has been reported returning 404s for API keys created after
// Google's cutover to the 3.x line, regardless of what the pricing docs
// still show — so we pin to the cheapest model actually confirmed working
// for new keys: gemini-3.1-flash-lite ($0.25 / $1.50 per 1M tokens,
// cheaper than 3.5-flash-lite and the general-purpose 3.x flash models).
// If Google deprecates this too, swap both constants below.
export const CHAT_MODEL = 'gemini-3.1-flash-lite';
export const ANALYSIS_MODEL = 'gemini-3.1-flash-lite';

export type ChatTurn = { role: 'user' | 'model'; text: string };

const RETRY_OPTIONS = { retries: 2, minTimeout: 400 };
const CHAT_TIMEOUT_MS = 15_000;
const ANALYSIS_TIMEOUT_MS = 12_000;

/**
 * Streams a chat reply from Gemini for the visitor-facing widget, given the
 * running conversation history plus the new user message. The initial call
 * that opens the stream is wrapped in a timeout + a couple of retries
 * (p-timeout / p-retry) so a single flaky upstream request doesn't surface
 * as a broken chat widget — once the stream itself starts, chunks are
 * yielded as they arrive.
 */
export async function* streamChatReply(
  history: ChatTurn[],
  message: string,
  systemInstruction: string,
): AsyncGenerator<string> {
  if (!genAI) throw new Error('Gemini is not configured.');
  const client = genAI;

  const contents = [
    ...history.map((turn) => ({ role: turn.role, parts: [{ text: turn.text }] })),
    { role: 'user' as const, parts: [{ text: message }] },
  ];

  const stream = await pRetry(
    () =>
      pTimeout(
        client.models.generateContentStream({
          model: CHAT_MODEL,
          contents,
          config: { systemInstruction, maxOutputTokens: 800, temperature: 0.5 },
        }),
        { milliseconds: CHAT_TIMEOUT_MS },
      ),
    RETRY_OPTIONS,
  );

  for await (const chunk of stream) {
    const text = chunk.text;
    if (text) yield text;
  }
}

/**
 * One-shot (non-streaming) generation used for the quote-analysis draft —
 * short output, so a single blocking call is simpler than streaming.
 */
export async function generateDraft(prompt: string, systemInstruction: string): Promise<string> {
  if (!genAI) throw new Error('Gemini is not configured.');
  const client = genAI;

  const response = await pRetry(
    () =>
      pTimeout(
        client.models.generateContent({
          model: ANALYSIS_MODEL,
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          config: { systemInstruction, maxOutputTokens: 500, temperature: 0.4 },
        }),
        { milliseconds: ANALYSIS_TIMEOUT_MS },
      ),
    RETRY_OPTIONS,
  );

  return response.text ?? '';
}
