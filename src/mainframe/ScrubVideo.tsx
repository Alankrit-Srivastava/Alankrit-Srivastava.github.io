import { useRef } from 'react';
import { MAINFRAME_FILM } from '../shared/media';
import { SCRUB_SENSITIVITY, useVideoScrub } from '../shared/useVideoScrub';

/** Full-screen background video. Never autoplays: horizontal mouse movement scrubs it. */
export default function ScrubVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useVideoScrub(videoRef, { sensitivity: SCRUB_SENSITIVITY, source: 'window' });

  return (
    <video
      ref={videoRef}
      src={MAINFRAME_FILM}
      muted
      playsInline
      preload="auto"
      disablePictureInPicture
      aria-hidden="true"
      tabIndex={-1}
      // The rabbit stands mid-frame on flat kraft that matches the page ground, so the film can shrink without a visible edge:
      // upper part of the screen on phones (copy sits below), bottom-right on wider screens (clear of the nav and the copy).
      className="[object-position:50%_center] origin-[50%_0%] scale-[.6] md:origin-[88%_100%] md:scale-[.8] [mask-image:linear-gradient(90deg,transparent,#000_16%,#000_84%,transparent),linear-gradient(180deg,transparent,#000_4%,#000_90%,transparent)] [mask-composite:intersect] [-webkit-mask-composite:source-in]"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}
    />
  );
}
