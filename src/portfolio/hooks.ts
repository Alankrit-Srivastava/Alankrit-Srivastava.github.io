import { useEffect, useState, type RefObject } from 'react';

const IST = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false });

/** Current time in Noida, refreshed every 30 seconds. */
export function useIstClock(): string {
  const [time, setTime] = useState(() => IST.format(new Date()));
  useEffect(() => {
    const timer = window.setInterval(() => setTime(IST.format(new Date())), 30_000);
    return () => window.clearInterval(timer);
  }, []);
  return time;
}

/** True once the page has scrolled past `threshold` px. */
export function useScrolled(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(() => window.scrollY > threshold);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}

/** How many of `total` words should be lit, based on how far `ref` has scrolled through the viewport. */
export function useWordReveal(ref: RefObject<HTMLElement | null>, total: number, disabled: boolean): number {
  const [lit, setLit] = useState(disabled ? total : 0);

  useEffect(() => {
    if (disabled) {
      setLit(total);
      return;
    }
    let frame = 0;
    const measure = () => {
      frame = 0;
      const element = ref.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (viewport * 0.8 - rect.top) / (rect.height + viewport * 0.3)));
      setLit(Math.round(progress * total));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [ref, total, disabled]);

  return lit;
}

/** Becomes true once `ref` comes within `margin` of the viewport, then stays true. */
export function useNearViewport(ref: RefObject<HTMLElement | null>, margin = '400px'): boolean {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element || near) return;
    if (!('IntersectionObserver' in window)) {
      setNear(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, margin, near]);
  return near;
}

/**
 * True while a `[data-ground="paper"]` section sits under the fixed top bar,
 * so the bar can switch from light-on-night to ink-on-paper.
 */
export function useTopBarOnPaper(): boolean {
  const [onPaper, setOnPaper] = useState(false);
  useEffect(() => {
    const grounds = Array.from(document.querySelectorAll<HTMLElement>('.pf [data-ground="paper"]'));
    if (!grounds.length || !('IntersectionObserver' in window)) return;
    const under = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => (entry.isIntersecting ? under.add(entry.target) : under.delete(entry.target)));
        setOnPaper(under.size > 0);
      },
      // A thin line through the middle of the bar (4-5% down the viewport), so a section that merely touches
      // the bar's edge does not count as being under it.
      { rootMargin: '-4% 0px -95% 0px' },
    );
    grounds.forEach((ground) => observer.observe(ground));
    return () => observer.disconnect();
  }, []);
  return onPaper;
}
