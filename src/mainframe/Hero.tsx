import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '../shared/usePrefersReducedMotion';
import { useTypewriter } from '../shared/useTypewriter';

const TYPED_TEXT = 'Glad you stopped in. Good taste tends to find us. Now, what are we building?';
// Mainframe is a concept: every contact action reaches the portfolio owner, never the real mainframe.co domain.
const EMAIL = 'alankritsrivastava26@gmail.com';

const PILLS = [
  { label: 'Pitch us an idea', subject: 'An idea (via the Mainframe concept page)' },
  { label: 'Come work here', subject: 'Working together (via the Mainframe concept page)' },
  { label: 'Send a brief hello', subject: 'Hello (via the Mainframe concept page)' },
  { label: 'See how we operate', subject: 'How you work (via the Mainframe concept page)' },
] as const;

const PILL_SIZE =
  'inline-flex items-center justify-center rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap transition-colors duration-200';

const TEXT_STYLE = { fontSize: 'clamp(18px, 4vw, 26px)', fontWeight: 400 } as const;

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Clipboard API needs a secure context; fall back for plain-http previews.
    const field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.opacity = '0';
    document.body.appendChild(field);
    field.select();
    const ok = document.execCommand('copy');
    field.remove();
    return ok;
  }
}

function CopyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8.5 1H2a1 1 0 0 0-1 1v6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M1.5 6.5 4.5 9.5 10.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Hero() {
  const reducedMotion = usePrefersReducedMotion();
  const { displayed, done } = useTypewriter(TYPED_TEXT, 38, 600, reducedMotion);
  const [pillsVisible, setPillsVisible] = useState(false);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const copied = copyState === 'copied';

  // Pills arrive 400ms after load, independent of the typewriter.
  useEffect(() => {
    const timer = window.setTimeout(() => setPillsVisible(true), 400);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (copyState === 'idle') return;
    const timer = window.setTimeout(() => setCopyState('idle'), 2400);
    return () => window.clearTimeout(timer);
  }, [copyState]);

  const onCopy = async () => {
    setCopyState((await copyText(EMAIL)) ? 'copied' : 'failed');
  };

  return (
    <section className="relative z-[1] h-screen flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden">
      <div className="max-w-xl relative z-10">
        {/* 1. Blurred intro label */}
        <p
          className="pointer-events-none select-none mb-5 sm:mb-6"
          style={{ ...TEXT_STYLE, lineHeight: 1.3, color: '#000', filter: 'blur(4px)' }}
        >
          Hey there, meet A.R.I.A,
          <br />
          Mainframe&apos;s Adaptive Response Interface Agent
        </p>

        {/* 2. Typewriter */}
        <p className="text-black mb-5 sm:mb-6" style={{ ...TEXT_STYLE, lineHeight: 1.35, minHeight: 54 }}>
          <span className="sr-only">{TYPED_TEXT}</span>
          <span aria-hidden="true">
            {displayed}
            {!done && (
              <span className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px] animate-[blink_1s_step-end_infinite]" />
            )}
          </span>
        </p>

        {/* 3. Action pills */}
        <div
          className="flex flex-wrap gap-y-1"
          style={{
            opacity: pillsVisible ? 1 : 0,
            transform: pillsVisible ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          {PILLS.map(({ label, subject }) => (
            <a
              key={label}
              href={`mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`}
              className={`${PILL_SIZE} bg-white text-black border border-black/10 hover:bg-black hover:text-white`}
            >
              {label}
            </a>
          ))}

          <button
            type="button"
            onClick={onCopy}
            className={`${PILL_SIZE} gap-2 sm:gap-3 text-white bg-transparent border border-white hover:bg-white hover:text-black cursor-pointer`}
            aria-label={`Copy email address ${EMAIL}`}
            title={copyState === 'failed' ? `Copy blocked. Select the address: ${EMAIL}` : undefined}
          >
            <span>
              Reach us: <span className="underline underline-offset-1">{EMAIL}</span>
            </span>
            {copied ? <CheckIcon /> : <CopyIcon />}
          </button>
          <span className="sr-only" role="status" aria-live="polite">
            {copyState === 'copied' ? 'Email address copied' : copyState === 'failed' ? `Your browser blocked copying. The address is ${EMAIL}` : ''}
          </span>
        </div>
      </div>
    </section>
  );
}
