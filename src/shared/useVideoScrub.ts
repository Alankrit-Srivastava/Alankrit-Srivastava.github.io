import { useEffect, type RefObject } from 'react';
import { createSeekQueue } from './seekQueue';

export const SCRUB_SENSITIVITY = 0.8;

type ScrubOptions = {
  /** Fraction of the video's duration covered by moving across the full width. */
  sensitivity?: number;
  /**
   * Where movement is read from.
   * - 'window': `mousemove` on window, width = window.innerWidth (the Mainframe hero).
   * - an element ref: `pointermove` on that element, width = its width (portfolio work card, so touch drags scrub too).
   */
  source?: 'window' | RefObject<HTMLElement | null>;
};

/**
 * Scrubs a paused <video> forward/backward with horizontal pointer movement.
 *
 * delta = currentX - prevX
 * targetTime += (delta / width) * sensitivity * duration, clamped to [0, duration]
 *
 * Seeks go through a one-at-a-time queue (see seekQueue.ts), so fast mouse moves never flood the decoder.
 */
export function useVideoScrub(
  videoRef: RefObject<HTMLVideoElement | null>,
  { sensitivity = SCRUB_SENSITIVITY, source = 'window' }: ScrubOptions = {},
) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const element = source === 'window' ? null : source.current;
    if (source !== 'window' && !element) return;

    const queue = createSeekQueue(video);
    let prevX: number | null = null;

    const width = () => (element ? element.clientWidth : window.innerWidth) || 1;

    const onMove = (event: MouseEvent | PointerEvent) => {
      queue.takeOver();

      const currentX = event.clientX;
      if (prevX === null) {
        prevX = currentX;
        return;
      }
      const delta = currentX - prevX;
      prevX = currentX;

      const duration = video.duration;
      if (!Number.isFinite(duration) || duration <= 0 || delta === 0) return;

      queue.seek(queue.target + (delta / width()) * sensitivity * duration);
    };

    const resetPointer = () => {
      prevX = null;
    };

    if (element) {
      element.addEventListener('pointermove', onMove, { passive: true });
      element.addEventListener('pointerleave', resetPointer);
      element.addEventListener('pointerdown', resetPointer);
    } else {
      window.addEventListener('mousemove', onMove, { passive: true });
    }

    return () => {
      queue.dispose();
      if (element) {
        element.removeEventListener('pointermove', onMove);
        element.removeEventListener('pointerleave', resetPointer);
        element.removeEventListener('pointerdown', resetPointer);
      } else {
        window.removeEventListener('mousemove', onMove);
      }
    };
  }, [videoRef, source, sensitivity]);
}
