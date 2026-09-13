import characterVideo from '../assets/character.mp4';
import rabbitVideo from '../assets/rabbit.mp4';

export type Film = {
  src: string;
  /** Head-turn times in seconds: looking left, facing the viewer, looking right. */
  gaze: { start: number; front: number; end: number };
};

/*
 * Both clips are re-encoded from the originals in Downloads: keyframe every 4 frames (seeks land in ~10 ms),
 * no audio, and a flat kraft backdrop measured in Chromium at ~#CAA683 so it disappears into .paper grounds.
 */

/** Alankrit's anime avatar: 4.0 s head turn. */
export const CHARACTER: Film = {
  src: characterVideo,
  gaze: { start: 0.7, front: 2.2, end: 3.3 },
};

/**
 * The rabbit in sunglasses: the source's two turns (1.8-3.8 s and 6.6-9.1 s) joined at the front-facing frame,
 * so there is no dead hold while scrubbing. 4.46 s.
 */
export const RABBIT: Film = {
  src: rabbitVideo,
  gaze: { start: 0.1, front: 2.0, end: 4.0 },
};

/** Film behind the Mainframe landing page and on its work card. */
export const MAINFRAME_FILM = RABBIT.src;
