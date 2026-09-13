import { useEffect, type RefObject } from 'react';
import { createSeekQueue } from './seekQueue';

/** Times (seconds) in a head-turn clip: looking left, facing the viewer, looking right. */
export type GazeTimes = { start: number; front: number; end: number };

/**
 * Makes a head-turn video look toward the pointer.
 * The pointer's horizontal position across the window maps to a frame: left edge = `start`, centre = `front`,
 * right edge = `end`. Leaving the window turns the face back to the viewer.
 * Only runs while `activeRef` is on screen, so an avatar far down the page never seeks in the background.
 */
export function useVideoGaze(
  videoRef: RefObject<HTMLVideoElement | null>,
  activeRef: RefObject<HTMLElement | null>,
  { start, front, end }: GazeTimes,
) {
  useEffect(() => {
    const video = videoRef.current;
    const area = activeRef.current;
    if (!video || !area) return;

    const queue = createSeekQueue(video);
    let active = true;

    const observer =
      'IntersectionObserver' in window
        ? new IntersectionObserver(([entry]) => {
            active = entry.isIntersecting;
          })
        : null;
    observer?.observe(area);

    const timeFor = (clientX: number) => {
      const f = Math.min(1, Math.max(0, clientX / (window.innerWidth || 1)));
      return f < 0.5 ? start + (front - start) * (f / 0.5) : front + (end - front) * ((f - 0.5) / 0.5);
    };

    const onMove = (event: PointerEvent) => {
      if (!active) return;
      queue.takeOver();
      queue.seek(timeFor(event.clientX));
    };

    const onLeaveWindow = (event: MouseEvent) => {
      if (!active || event.relatedTarget) return;
      queue.takeOver();
      queue.seek(front);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeaveWindow);

    return () => {
      queue.dispose();
      observer?.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeaveWindow);
    };
  }, [videoRef, activeRef, start, front, end]);
}

/**
 * Brings a head-turn avatar to its resting pose.
 * With `animate`, it plays from the first frame and stops on `front`, so the character turns to greet the visitor.
 * Without it (reduced motion, avatars further down the page), it simply shows the front-facing frame.
 * Pointer movement during the intro takes over at once (useVideoGaze pauses the film).
 */
export function usePortraitStart(
  videoRef: RefObject<HTMLVideoElement | null>,
  { front, animate, rate = 1.2 }: { front: number; animate: boolean; rate?: number },
) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let frame = 0;
    let cancelled = false;

    const settle = () => {
      if (cancelled || !video.paused) return;
      if (Math.abs(video.currentTime - front) > 0.02) video.currentTime = front;
    };

    const begin = () => {
      if (cancelled) return;
      if (!animate || document.hidden || window.scrollY > 200) {
        settle();
        return;
      }
      video.playbackRate = rate;
      video
        .play()
        .then(() => {
          const watch = () => {
            if (cancelled || video.paused) return; // finished, or the visitor took over
            if (video.currentTime >= front) {
              video.pause();
              video.currentTime = front;
              return;
            }
            frame = window.requestAnimationFrame(watch);
          };
          frame = window.requestAnimationFrame(watch);
        })
        .catch(settle);
    };

    if (video.readyState >= 2) begin();
    else video.addEventListener('loadeddata', begin, { once: true });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      video.removeEventListener('loadeddata', begin);
      if (!video.paused) video.pause();
    };
  }, [videoRef, front, animate, rate]);
}
