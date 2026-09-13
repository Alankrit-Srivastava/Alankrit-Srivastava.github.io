import { useRef } from 'react';
import { MAINFRAME_FILM } from '../shared/media';
import { MAINFRAME_HREF } from '../shared/routes';
import { useVideoScrub } from '../shared/useVideoScrub';
import { useNearViewport } from './hooks';

/**
 * Featured work card for the Mainframe landing page.
 * The cover runs the same scrub engine as the live page, so the card is a working sample, not a screenshot.
 */
export default function MainframeFeature() {
  const coverRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const near = useNearViewport(coverRef);

  useVideoScrub(videoRef, { source: coverRef });

  return (
    <article className="card featured paper" aria-labelledby="mainframe-title">
      <div className="cover scrub" ref={coverRef}>
        <video
          ref={videoRef}
          src={near ? MAINFRAME_FILM : undefined}
          muted
          playsInline
          preload={near ? 'auto' : 'none'}
          disablePictureInPicture
          aria-hidden="true"
          tabIndex={-1}
        />
        <div className="tone" />
        <div className="lines" />
        <span className="glyph" aria-hidden="true">
          枠
        </span>
        <span className="tag">Concept build · 2026</span>
        <span className="metric">
          Scrub
          <small>
            <span className="hint-hover">Move your cursor across the frame</span>
            <span className="hint-touch">Drag sideways across the frame</span>
          </small>
        </span>
      </div>

      <div className="card-body">
        <div className="meta">
          <span>Frontend · solo build</span>
          <span>Creative agency</span>
        </div>
        <h3 id="mainframe-title">Mainframe® landing page</h3>
        <p>
          A full-screen hero for a creative agency. The background film never plays on its own: it follows the visitor&apos;s
          cursor frame by frame, while an assistant types its greeting and the next steps fade in underneath.
        </p>
        <ul className="points">
          <li>
            <b>Seek queue</b>, so fast mouse movement never floods the video decoder. The same queue turns the avatar&apos;s head
            at the top of this page.
          </li>
          <li>
            <b>useTypewriter hook</b> with a blinking cursor, and action pills that arrive 400&nbsp;ms after load.
          </li>
          <li>
            <b>Animated hamburger</b> and a blurred full-screen menu below 768&nbsp;px, plus one-click email copy.
          </li>
        </ul>
        <div className="card-cta">
          <a className="btn primary" href={MAINFRAME_HREF}>
            Open live demo →
          </a>
        </div>
        <p className="stack">React · TypeScript · Vite · Tailwind CSS</p>
      </div>
    </article>
  );
}
