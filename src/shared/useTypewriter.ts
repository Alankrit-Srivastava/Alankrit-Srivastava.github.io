import { useEffect, useState } from 'react';

/**
 * Reveals `text` one character at a time.
 * After `startDelay` ms, an interval adds one character every `speed` ms.
 * `instant` skips the animation (used for prefers-reduced-motion).
 */
export function useTypewriter(text: string, speed = 38, startDelay = 600, instant = false) {
  const [count, setCount] = useState(instant ? text.length : 0);

  useEffect(() => {
    if (instant) {
      setCount(text.length);
      return;
    }

    setCount(0);
    let revealed = 0;
    let interval: number | undefined;

    const timeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        revealed += 1;
        setCount(revealed);
        if (revealed >= text.length) window.clearInterval(interval);
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(timeout);
      if (interval !== undefined) window.clearInterval(interval);
    };
  }, [text, speed, startDelay, instant]);

  return { displayed: text.slice(0, count), done: count >= text.length };
}
