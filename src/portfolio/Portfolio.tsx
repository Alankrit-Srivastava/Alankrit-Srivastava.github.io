import { Fragment, useEffect, useMemo, useRef, type ReactNode, type RefObject } from 'react';
import { CHARACTER, RABBIT, type Film } from '../shared/media';
import { usePrefersReducedMotion } from '../shared/usePrefersReducedMotion';
import { useTypewriter } from '../shared/useTypewriter';
import { usePortraitStart, useVideoGaze } from '../shared/useVideoGaze';
import {
  CAPABILITIES,
  CERTIFICATIONS,
  EDUCATION,
  EPISODES,
  PROFILE,
  PROJECTS,
  RECORDS,
  SKILLS,
  STATEMENT,
  STATEMENT_HOT,
  WORKED_WITH,
} from './data';
import { useIstClock, useScrolled, useTopBarOnPaper, useWordReveal } from './hooks';
import MainframeFeature from './MainframeFeature';
import Petals from './Petals';
import './portfolio.css';

const NAV = [
  { href: '#work', label: 'Work' },
  { href: '#episodes', label: 'Episodes' },
  { href: '#sheet', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

function External({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

function SectionHead({ eyebrow, kana, title, sub }: { eyebrow: string; kana: string; title: string; sub: string }) {
  return (
    <div className="head">
      <div>
        <span className="eyebrow">
          {eyebrow} <span className="kana">{kana}</span>
        </span>
        <h2>{title}</h2>
      </div>
      <p className="sub">{sub}</p>
    </div>
  );
}

function TopBar() {
  const scrolled = useScrolled();
  const onPaper = useTopBarOnPaper();
  return (
    <header className={`top${scrolled ? ' scrolled' : ''}${onPaper ? ' on-paper' : ''}`}>
      <a className="brand" href="#hero" aria-label={`${PROFILE.name}, back to top`}>
        <span className="mark" aria-hidden="true">
          AS
        </span>
        <span>
          <span className="name">
            Alankrit<span className="sur"> Srivastava</span>
          </span>
          <span className="kana" aria-hidden="true">
            {PROFILE.kana}
          </span>
        </span>
      </a>
      <nav aria-label="Sections">
        <ul>
          {NAV.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      <a className="pill" href="#contact">
        <i aria-hidden="true" />
        Available now
      </a>
    </header>
  );
}

/** A head-turn avatar on kraft paper. Poses and hints shared by the hero and the contact reprise. */
function Avatar({
  film = CHARACTER,
  areaRef,
  animate,
  className,
  children,
}: {
  film?: Film;
  areaRef: RefObject<HTMLElement | null>;
  animate: boolean;
  className?: string;
  children?: ReactNode;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  usePortraitStart(videoRef, { front: film.gaze.front, animate });
  useVideoGaze(videoRef, areaRef, film.gaze);

  return (
    <div className={`avatar${className ? ` ${className}` : ''}`}>
      <div className="avatar-media">
        <video
          ref={videoRef}
          src={film.src}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden="true"
          tabIndex={-1}
        />
        <div className="focus" />
      </div>
      {children}
    </div>
  );
}

const GREETING = "Hi, I'm Alankrit.";

/** Character introduction on kraft paper: the file on the left, the avatar turning to meet the visitor on the right. */
function Hero() {
  const clock = useIstClock();
  const reduced = usePrefersReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { displayed, done } = useTypewriter(GREETING, 60, 1500, reduced);

  return (
    <section className="hero paper" data-ground="paper" id="hero" ref={heroRef} aria-label="Introduction">
      <div className="hero-head">
        <span className="eyebrow rise">
          Character profile <span className="kana">キャラクター紹介</span>
        </span>
        <h1 className="hero-name rise d1">
          <span>Alankrit</span>
          <span className="inked">Srivastava</span>
        </h1>
      </div>

      <div className="hero-body">
        <p className="hero-role rise d1">
          <b>{PROFILE.role}</b>
          Spring Boot microservices · Angular &amp; React · Document AI
        </p>
        <p className="hero-line rise d2">
          At your <em>service.</em>
          <br />
          Backend that holds.
          <br />
          Front ends that move.
        </p>
        <p className="hero-intro rise d2">
          Four-plus years shipping Spring Boot microservices and Angular interfaces for Toyota Europe, YesMadam and Thomson
          Digital. Most recently a PDF-to-XML engine on GROBID and Java-based RAG that cut conversion time by over 70%.
        </p>
        <div className="cta rise d3">
          <a className="btn primary" href="#work">
            Explore the work
          </a>
          <a className="btn" href={`mailto:${PROFILE.email}`}>
            Email me
          </a>
        </div>
      </div>

      <figure className="character">
        <Avatar areaRef={heroRef} animate={!reduced}>
          <div className="bubble" aria-hidden="true">
            <span className="bubble-text">
              {displayed}
              {!done && <i className="caret" />}
            </span>
            <span className="bubble-hint">
              <span className="hint-hover">Move your cursor. I&apos;ll look.</span>
              <span className="hint-touch">Drag sideways. I&apos;ll look.</span>
            </span>
          </div>
          <span className="vkana" aria-hidden="true">
            アランクリット
          </span>
          <span className="hud" aria-hidden="true">
            File No.01
            <b>Noida · IST {clock}</b>
          </span>
        </Avatar>
        <figcaption className="sr-only">
          Illustrated anime avatar of Alankrit: messy black hair, square glasses, a dark tee and mustard overalls. It turns its
          head to follow the pointer.
        </figcaption>
      </figure>
    </section>
  );
}

function Band() {
  const names = WORKED_WITH.map((company) => (
    <Fragment key={company}>
      <span>{company}</span>
      <span className="star">★</span>
    </Fragment>
  ));
  return (
    <div className="band" aria-label={`Worked with ${WORKED_WITH.join(', ')}`}>
      <span className="label">Worked with</span>
      <div className="strip">
        <div className="track" aria-hidden="true">
          {names}
          {names}
        </div>
      </div>
    </div>
  );
}

function Capabilities() {
  return (
    <section className="caps" id="capabilities">
      <SectionHead
        eyebrow="Explore my capabilities"
        kana="能力"
        title="What I ship"
        sub="Four things I would pick first on a new build, and the exact tools behind each."
      />
      <div className="caps-list">
        {CAPABILITIES.map((cap) => (
          <div className="cap" key={cap.title}>
            <h3>
              {cap.title}
              <span className="kana" aria-hidden="true">
                {cap.kana}
              </span>
            </h3>
            <p>{cap.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Statement() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const words = useMemo(() => STATEMENT.split(/\s+/).filter(Boolean), []);
  const lit = useWordReveal(ref, words.length, reduced);

  return (
    <section className="statement paper" data-ground="paper" aria-label="Statement">
      <p ref={ref}>
        <span className="sr-only">{STATEMENT}</span>
        {words.map((word, index) => (
          <Fragment key={index}>
            <span
              aria-hidden="true"
              className={`w${STATEMENT_HOT.includes(word) ? ' hot' : ''}${index < lit ? ' on' : ''}`}
            >
              {word}
            </span>
            {index < words.length - 1 ? ' ' : ''}
          </Fragment>
        ))}
      </p>
      <p className="cite">Alankrit · 4+ years · Java, Spring Boot, Angular, AWS</p>
    </section>
  );
}

function Work() {
  return (
    <section className="work" id="work">
      <SectionHead
        eyebrow="Projects"
        kana="プロジェクト"
        title="Selected work"
        sub="Production systems, a frontend concept and personal builds. Every number is from a real deployment."
      />
      <div className="works">
        <MainframeFeature />
        {PROJECTS.map((project) => (
          <article className={`card paper ${project.accent}`} key={project.title}>
            <div className="cover">
              <div className="tone" />
              <div className="lines" />
              <span className="glyph" aria-hidden="true">
                {project.glyph}
              </span>
              <span className={`tag${project.live ? ' live' : ''}`}>{project.tag}</span>
              <span className="metric">
                {project.metric}
                <small>{project.metricNote}</small>
              </span>
            </div>
            <div className="card-body">
              <h3>{project.title}</h3>
              <div className="meta">
                <span>{project.role}</span>
                <span>{project.domain}</span>
              </div>
              <p>{project.summary}</p>
              <p className="stack">{project.stack}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Episodes() {
  return (
    <section className="episodes paper" data-ground="paper" id="episodes">
      <SectionHead eyebrow="Experience" kana="経歴" title="The story so far" sub="Three arcs, in order. Each one shipped to production." />
      <div className="list">
        {EPISODES.map((ep) => (
          <article className="ep" key={ep.num}>
            <div className="num">
              {ep.num}
              <small>{ep.start}</small>
            </div>
            <div>
              <h3>{ep.title}</h3>
              <p className="arc">
                {ep.arc}
                <span className="kana" aria-hidden="true">
                  {ep.arcKana}
                </span>
              </p>
              <ul>
                {ep.points.map((point, index) => (
                  <li key={index}>
                    {point.lead && <b>{point.lead}</b>}
                    {point.text}
                  </li>
                ))}
              </ul>
            </div>
            <p className="when">
              <b>{ep.range}</b>
              {ep.duration}
              <br />
              Noida, India
            </p>
          </article>
        ))}

        <article className="ep next">
          <div className="num">
            EP.04<small>Next</small>
          </div>
          <div>
            <h3>Your project</h3>
            <p className="arc">
              Open to full-time and contract work
              <span className="kana" aria-hidden="true">
                次回予告
              </span>
            </p>
            <ul>
              <li>
                Immediate joiner. On-site in Delhi NCR or remote. <a href="#contact">Send the brief.</a>
              </li>
            </ul>
          </div>
          <p className="when">
            <b>Available now</b>IST · UTC+5:30
          </p>
        </article>
      </div>
    </section>
  );
}

function Sheet() {
  return (
    <section className="sheet" id="sheet">
      <SectionHead
        eyebrow="Character sheet"
        kana="スキル"
        title="Stats & skills"
        sub="Highlighted chips are daily drivers. Everything else shipped in production or in a finished build."
      />
      <div className="sheet-grid">
        <aside className="panel" aria-label="Profile">
          <div className="panel-head">
            <span>Profile</span>
            <span className="kana">プロフィール</span>
          </div>
          <div className="portrait">
            <div className="tone" />
            <div className="lines" />
            <span className="corner">
              Class<b>Java Full Stack</b>
            </span>
            <span className="mono-mark" aria-hidden="true">
              AS
            </span>
          </div>
          <div className="rows">
            <div className="row">
              <span className="k">Name</span>
              <span className="v">{PROFILE.name}</span>
            </div>
            <div className="row">
              <span className="k">Level</span>
              <span className="v">
                4+ years<small>2+ years on Angular front ends</small>
              </span>
            </div>
            <div className="row">
              <span className="k">Base</span>
              <span className="v">
                Noida, India<small>IST · UTC+5:30</small>
              </span>
            </div>
            <div className="row">
              <span className="k">Status</span>
              <span className="v">Available · immediate joiner</span>
            </div>
            <div className="row">
              <span className="k">Degree</span>
              <span className="v">
                B.Tech, Electrical &amp; Electronics
                <small>JSS Academy of Technical Education, Noida · 2016–2020 · 75.6%</small>
              </span>
            </div>
            <div className="row">
              <span className="k">Links</span>
              <span className="v links">
                {PROFILE.links.map((link, index) => (
                  <Fragment key={link.label}>
                    <External href={link.href}>{link.label}</External>
                    {index < PROFILE.links.length - 1 ? ' · ' : ''}
                  </Fragment>
                ))}
              </span>
            </div>
          </div>
        </aside>

        <div>
          <div className="skills">
            {SKILLS.map((group) => (
              <div className="sk" key={group.group}>
                <h4>{group.group}</h4>
                <div className="chips">
                  {group.items.map((item) => (
                    <span className={`chip${item.core ? ' core' : ''}`} key={item.name}>
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="records" aria-label="Records">
            {RECORDS.map((record) => (
              <div className="rec" key={record.label}>
                <b>
                  {record.value}
                  <sup>{record.sup}</sup>
                </b>
                <span>{record.label}</span>
                <small>{record.note}</small>
              </div>
            ))}
          </div>

          <div className="certs">
            <div>
              <h4>Certifications</h4>
              <ul>
                {CERTIFICATIONS.map((cert) => (
                  <li key={cert.name}>
                    {cert.name}
                    {'by' in cert && <span>{cert.by}</span>}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Education</h4>
              <ul>
                {EDUCATION.map((item) => (
                  <li key={item.name}>
                    {item.name}
                    <span>{item.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const contactRef = useRef<HTMLElement>(null);
  return (
    <section className="contact paper" data-ground="paper" id="contact" ref={contactRef}>
      <div className="contact-copy">
        <span className="eyebrow">
          Contact <span className="kana">連絡</span>
        </span>
        <h2>
          Let&apos;s build<span className="inked accent">the next one.</span>
        </h2>
        <a className="mail" href={`mailto:${PROFILE.email}`}>
          {PROFILE.email}
        </a>
        <div className="row2">
          {PROFILE.links.map((link) => (
            <External key={link.label} href={link.href} className="btn">
              {link.label}
            </External>
          ))}
        </div>
        <p className="note">
          One good email is enough. Tell me what you are building, the stack, and when you need it. Based in Noida, open to
          full-time and contract work, on-site in Delhi NCR or remote. Immediate joiner.
          <span className="kana" aria-hidden="true">
            メールを一通ください
          </span>
        </p>
      </div>
      <div className="crew" aria-hidden="true">
        <Avatar areaRef={contactRef} animate={false} className="crew-boy">
          <div className="bubble small">
            <span className="bubble-text">Your turn.</span>
          </div>
        </Avatar>
        <Avatar film={RABBIT} areaRef={contactRef} animate={false} className="crew-rabbit" />
      </div>
    </section>
  );
}

export default function Portfolio() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    document.title = PROFILE.name;
  }, []);

  return (
    <div className="pf">
      {!reduced && <Petals />}
      <TopBar />
      <main>
        <Hero />
        <Band />
        <Capabilities />
        <Statement />
        <Work />
        <Episodes />
        <Sheet />
        <Contact />
      </main>
      <footer>
        <span className="tbc">
          <span className="kana" aria-hidden="true">
            つづく
          </span>
          To be continued
        </span>
        <span>© {new Date().getFullYear()} Alankrit Srivastava · React, TypeScript, Vite and Tailwind CSS</span>
      </footer>
    </div>
  );
}
