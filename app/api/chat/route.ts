import { NextResponse } from 'next/server';
import { z } from 'zod';
import { streamChatReply, isGeminiConfigured } from '@/lib/gemini';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';
import { CHAT_SYSTEM_PROMPT } from '@/lib/siteContext';

const ChatSchema = z.object({
  message: z.string().trim().min(1, 'message is required').max(1000, 'message is too long'),
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'model']),
        text: z.string().max(2000),
      }),
    )
    .max(16)
    .default([]),
});

/**
 * POST /api/chat — streams a Gemini-powered reply for the site's AI chat
 * widget as plain text chunks. The client reads the response body with a
 * ReadableStream reader, so no SSE parsing is needed on either side.
 */
export async function POST(request: Request) {
  if (!isGeminiConfigured) {
    return NextResponse.json(
      { error: 'The AI assistant is not configured yet. Set GEMINI_API_KEY in your environment variables.' },
      { status: 503 },
    );
  }

  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(`chat:${ip}`, 15, 60_000);
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many messages — please wait a moment and try again.' },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const parsed = ChatSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid request.', issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const { message, history } = parsed.data;

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of streamChatReply(history, message, CHAT_SYSTEM_PROMPT)) {
          controller.enqueue(encoder.encode(chunk));
        }
      } catch (err) {
        console.error('Gemini chat stream failed:', err);
        controller.enqueue(
          encoder.encode(
            "\n\nSorry — I had trouble reaching the AI assistant just now. Please try again, or use the quote form below.",
          ),
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
