# Alankrit Srivastava — portfolio

React + TypeScript + Vite + Tailwind CSS. Two pages in one build:

| URL | Page |
|---|---|
| `/` | Portfolio in the anime "Tokyo night" theme |
| `/#/mainframe` | Mainframe® creative-agency landing page (concept build, linked from the portfolio's Work section) |

## Run

```bash
npm install
npm run dev
```

Open http://localhost:5173 for the portfolio and http://localhost:5173/#/mainframe for the landing page.

## Build and deploy

```bash
npm run build
```

Upload the contents of `dist/` to any static host. Asset paths are relative and routing uses the URL hash,
so it works on GitHub Pages (including a sub-folder like `username.github.io/portfolio/`) and Netlify with no extra config.

## Layout

```
src/
  App.tsx                     hash router, restores portfolio scroll when returning from the demo
  index.css                   Tailwind import, Mainframe font variables, blink keyframes
  shared/seekQueue.ts         one-seek-at-a-time controller shared by every video interaction
  shared/useVideoScrub.ts     drag/cursor scrubbing (Mainframe hero, Mainframe work card)
  shared/useVideoGaze.ts      avatar looks toward the pointer; intro turn to face the visitor
  shared/useTypewriter.ts     typing effect (Mainframe hero, avatar speech bubble)
  mainframe/                  Navbar, Hero, ScrubVideo
  portfolio/                  Portfolio page, data.ts (all copy), portfolio.css (scoped under .pf)
```

## Notes

- **Theme isolation.** Every portfolio rule is scoped under `.pf` and uses `--pf-*` font tokens, so it never
  touches the Mainframe page or Tailwind utilities. Avoid naming portfolio classes after Tailwind utilities
  (`grid`, `outline`, `hidden`, `flex`, `block`…): unlayered CSS and utilities would both apply.
- **Fonts.** The Mainframe page uses Inter Tight from Google Fonts (SIL Open Font License) in place of Helvetica Now
  Display, whose free web copies are unlicensed.
- **Mainframe is a concept.** mainframe.co is a real company, so the page carries a concept label and every contact
  action goes to Alankrit's own address.
- **Characters.** `src/assets/character.mp4` (the avatar, 4.0 s) and `src/assets/rabbit.mp4` (4.46 s, the source's two head
  turns joined at the front-facing frame) are re-encoded from the originals: keyframe every 4 frames so seeks land in
  ~10 ms, no audio, backdrop nudged to kraft #CAA683. Paper sections (`.paper`) use that exact colour, so the films' edges
  disappear. Gaze times live in `src/shared/media.ts`. To swap a clip, re-encode it the same way, for example:
  `ffmpeg -i in.mp4 -an -c:v libx264 -pix_fmt yuv420p -crf 21 -g 4 -keyint_min 4 -sc_threshold 0 -movflags +faststart out.mp4`
  then re-sample its backdrop colour in the browser and its look-left / front / look-right times.
- **Palette.** Kraft paper, warm ink #17120E, tomato #EE4B2B (the rabbit's tee), mustard #E9AA3C (the avatar's overalls),
  blush and fur grey. On paper, accents are highlighters and shadows only; text stays ink (pink and tomato fail contrast on kraft).
- **Content.** Edit text, projects, experience and skills in `src/portfolio/data.ts`.
