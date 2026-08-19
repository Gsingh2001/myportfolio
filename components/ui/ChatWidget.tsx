'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { nanoid } from 'nanoid';
import ReactMarkdown from 'react-markdown';
import { MessageCircle, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { cn } from '@/lib/cn';

type ChatMessage = {
  id: string;
  role: 'user' | 'model';
  text: string;
};

type Topic = {
  id: string;
  label: string;
  /** Pre-written answer shown instantly, no Gemini call — free and immediate. */
  answer: string;
};

const GREETING: ChatMessage = {
  id: 'greeting',
  role: 'model',
  text: "Hi, I'm the 24xDev assistant 👋 Pick a topic below, or ask me anything else and I'll bring in our AI.",
};

// Pre-written quick replies — answered instantly and for free, straight from
// the same facts the AI is grounded in (lib/siteContext.ts). Keeps common
// questions off the Gemini bill entirely and gives visitors something to
// click immediately instead of a blank input box.
const TOPICS: Topic[] = [
  {
    id: 'about',
    label: '👋 What do you do?',
    answer:
      "We're a Sheffield-based web development & AI automation studio — custom Next.js sites, AI/LLM integrations, custom dashboards and e-commerce builds, all on **fixed-scope pricing** with no hourly billing surprises.",
  },
  {
    id: 'pricing',
    label: '💰 Pricing',
    answer:
      '**Launch** — from £1,500: up to 5 pages, mobile-first, basic SEO.\n\n**Growth** — from £4,500: web app or e-commerce build, CMS, payments, technical SEO.\n\n**Scale** — custom quote: AI integration, custom dashboards, ongoing support.\n\nPrices exclude VAT — every project gets a tailored fixed-scope quote after a free discovery call.',
  },
  {
    id: 'timeline',
    label: '⏱️ Timeline & process',
    answer:
      'Marketing sites usually ship in **1–3 weeks**; web apps, dashboards and AI builds take **3–8 weeks**. Fixed-scope pricing is agreed upfront, you get direct access to the engineer building it, and you own the code and infrastructure — no lock-in.',
  },
  {
    id: 'location',
    label: '📍 Location',
    answer:
      "We're based in Sheffield, South Yorkshire, and work remotely with clients across London, Birmingham, Manchester, Leeds and the rest of the UK.",
  },
];

const ASK_AI_ID = 'ask-ai';

// After this many pre-written topics have been opened, the visitor has
// clearly got a real question that isn't covered by the quick replies — so
// the free-text AI input unlocks automatically as well as via the explicit
// "Ask me anything else" chip.
const AUTO_UNLOCK_AFTER = 2;

const markdownClass =
  '[&_a]:text-accent [&_a]:underline [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_strong]:font-semibold [&>*+*]:mt-2';

/**
 * Floating Gemini-powered chat widget. Bottom-right, stacked above
 * FloatingCTA's "Get a Free Quote" button (also bottom-right, bottom-6) so
 * the two never overlap. Opens into a pre-written quick-reply menu first —
 * only once a visitor picks "Ask me anything else" or has opened a couple
 * of topics does the free-text box (backed by /api/chat, streamed from
 * Gemini) unlock.
 */
export default function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [aiUnlocked, setAiUnlocked] = useState(false);
  const [topicsOpened, setTopicsOpened] = useState(0);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, sending]);

  function openTopic(topic: Topic) {
    if (topic.id === ASK_AI_ID) {
      setMessages((prev) => [
        ...prev,
        {
          id: nanoid(),
          role: 'model',
          text: "Sure — ask away, I'm connected to our AI assistant now.",
        },
      ]);
      setAiUnlocked(true);
      return;
    }

    setMessages((prev) => [
      ...prev,
      { id: nanoid(), role: 'user', text: topic.label.replace(/^\S+\s/, '') },
      { id: nanoid(), role: 'model', text: topic.answer },
    ]);

    setTopicsOpened((count) => {
      const next = count + 1;
      if (next >= AUTO_UNLOCK_AFTER) setAiUnlocked(true);
      return next;
    });
  }

  async function sendMessage(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || sending) return;

    const userMessage: ChatMessage = { id: nanoid(), role: 'user', text: trimmed };
    const modelMessageId = nanoid();

    const history = messages
      .filter((m) => m.id !== 'greeting')
      .map((m) => ({ role: m.role, text: m.text }));

    setMessages((prev) => [...prev, userMessage, { id: modelMessageId, role: 'model', text: '' }]);
    setInput('');
    setSending(true);
    setError(null);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? 'The AI assistant is unavailable right now.');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        const next = accumulated;
        setMessages((prev) => prev.map((m) => (m.id === modelMessageId ? { ...m, text: next } : m)));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setMessages((prev) => prev.filter((m) => m.id !== modelMessageId));
    } finally {
      setSending(false);
    }
  }

  // /singh is Gurmanpreet's separate, unlinked personal portfolio — it must
  // never surface the 24xDev AI assistant. Checked after all hooks above.
  if (pathname?.startsWith('/singh')) return null;

  const visibleTopics = aiUnlocked ? TOPICS : [...TOPICS, { id: ASK_AI_ID, label: '💬 Ask me anything else', answer: '' }];

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="stamp-shadow mb-4 flex h-[28rem] w-[calc(100vw-3rem)] flex-col border border-ink bg-surface sm:w-96"
          >
            <div className="flex items-center justify-between border-b border-line bg-surface-alt px-4 py-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent" />
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-ink">24xDev AI</span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="text-ink-secondary transition-colors hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              {messages.map((m) => (
                <div key={m.id} className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
                  <div
                    className={cn(
                      'max-w-[85%] rounded px-3 py-2 text-sm leading-relaxed',
                      m.role === 'user' ? 'bg-accent text-accent-ink' : 'border border-line bg-surface text-ink',
                    )}
                  >
                    {m.role === 'model' && m.text === '' && sending ? (
                      <Loader2 className="h-4 w-4 animate-spin text-ink-secondary" />
                    ) : m.role === 'model' ? (
                      <div className={markdownClass}>
                        <ReactMarkdown>{m.text}</ReactMarkdown>
                      </div>
                    ) : (
                      m.text
                    )}
                  </div>
                </div>
              ))}
              {error && <p className="border border-accent bg-surface-alt px-3 py-2 text-xs text-accent">{error}</p>}

              {!sending && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {visibleTopics.map((topic) => (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => openTopic(topic)}
                      className="border border-line bg-surface px-3 py-1.5 font-mono text-xs text-ink transition-colors hover:border-accent hover:text-accent"
                    >
                      {topic.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {aiUnlocked ? (
              <form onSubmit={sendMessage} className="flex items-center gap-2 border-t border-line p-3">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about pricing, timelines..."
                  aria-label="Message"
                  className="flex-1 border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink-secondary outline-none focus:border-accent"
                />
                <button
                  type="submit"
                  disabled={sending || !input.trim()}
                  className="flex h-9 w-9 shrink-0 items-center justify-center bg-accent text-accent-ink transition-colors hover:bg-accent-hover disabled:opacity-50"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            ) : (
              <p className="border-t border-line px-4 py-3 text-center font-mono text-[11px] uppercase tracking-wide text-ink-secondary">
                Pick a topic above, or choose &ldquo;Ask me anything else&rdquo; to chat with our AI
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="stamp-shadow flex h-14 w-14 items-center justify-center border border-ink bg-accent text-accent-ink transition-colors hover:bg-accent-hover"
        aria-label={open ? 'Close AI chat' : 'Open AI chat'}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>
    </div>
  );
}
