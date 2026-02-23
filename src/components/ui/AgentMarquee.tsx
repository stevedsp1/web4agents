"use client";

const AGENT_NAMES = [
  "ChatGPT",
  "Gemini",
  "Claude",
  "Mistral",
  "Perplexity",
  "DeepSeek",
  "OpenAI",
  "Anthropic",
  "Google AI",
  "Meta AI",
  "Llama",
  "Groq",
  "Cohere",
  "xAI",
  "OpenClaw",
];

export function AgentMarquee() {
  const list = [...AGENT_NAMES, ...AGENT_NAMES];

  return (
    <section
      className="group relative overflow-hidden border-t border-gray-100 bg-gray-50 py-8 dark:border-gray-800 dark:bg-gray-900/50"
      aria-hidden
    >
      <div className="flex w-max animate-marquee gap-12 px-4 group-hover:[animation-play-state:paused]">
        {list.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="shrink-0 text-lg font-semibold tracking-tight text-gray-400 dark:text-gray-500"
          >
            {name}
          </span>
        ))}
      </div>
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-900/50" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-50 to-transparent dark:from-gray-900/50" />
    </section>
  );
}
