export type SeekQueue = {
  /** Where the video should end up once in-flight seeks land. */
  readonly target: number;
  /** Ask for a time. Only one seek runs at a time; the latest target wins when it lands. */
  seek(time: number): void;
  /** If the video is playing (an intro), pause it and continue from the current frame. */
  takeOver(): void;
  dispose(): void;
};

/**
 * One-seek-at-a-time controller for a paused <video>.
 * Fast input never floods the decoder: while a seek is in flight, new targets only update `target`,
 * and `seeked` queues exactly one follow-up seek if the target moved.
 * Seeks it did not start (new source, a scripted jump, the end of an intro) are adopted, not undone.
 */
export function createSeekQueue(video: HTMLVideoElement): SeekQueue {
  let target = video.currentTime;
  let requested = target;
  let seeking = false;

  const adoptCurrent = () => {
    target = requested = video.currentTime;
  };

  const request = () => {
    seeking = true;
    requested = target;
    video.currentTime = target;
  };

  const onSeeked = () => {
    if (!seeking) {
      adoptCurrent();
      return;
    }
    seeking = false;
    if (target !== requested) request();
  };

  const onLoadedMetadata = () => {
    seeking = false;
    adoptCurrent();
  };

  const onPause = () => {
    if (!seeking) adoptCurrent();
  };

  video.addEventListener('seeked', onSeeked);
  video.addEventListener('loadedmetadata', onLoadedMetadata);
  video.addEventListener('pause', onPause);

  return {
    get target() {
      return target;
    },
    seek(time: number) {
      const duration = video.duration;
      if (!Number.isFinite(duration) || duration <= 0) return;
      target = Math.min(duration, Math.max(0, time));
      // A seek is still running: it will pick up the new target when it lands.
      // (If it never reported back, `video.seeking` is false and we ask again.)
      if (seeking && video.seeking) return;
      if (!seeking && Math.abs(target - video.currentTime) < 1e-3) return;
      request();
    },
    takeOver() {
      if (video.paused) return;
      video.pause();
      if (!seeking) adoptCurrent();
    },
    dispose() {
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('pause', onPause);
    },
  };
}
