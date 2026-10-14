import { Fragment, useEffect, useRef, useState } from 'react';
import { Icon } from './Icons.jsx';
import { heroIntro, img, links, slides } from '../data.js';

const ART_W = 880;
const ART_H = 560;

/* Hero, after Carysil's diptych: a frosted copy panel on the left, and TOTO Global's six key visuals shown untouched
   as a framed card on the right, over a blurred, darkened copy of the current one that fills the screen.
   (The artworks are 880×560 with their titles baked in, so they are never stretched full-bleed.)
   Pinned for one screen of scroll: the panel slides off left (Carysil: xPercent -110, power2.in, scrub .55) while
   the card glides to the centre. Hand-written, no GSAP.
   Autoplay (requested): the active tab's progress line is a CSS animation whose animationend moves to the next slide,
   so pausing is just animation-play-state. Pause button always present (WCAG 2.2.2); hovering or focusing the panel
   or the card holds it; reduced motion turns it off. Tabs, arrows, arrow keys and swipes still work, and loop. */
export default function KeyVisuals() {
  const [current, setCurrent] = useState(0);
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [playing, setPlaying] = useState(true);
  const [held, setHeld] = useState(false);
  const touch = useRef(null);
  const sectionRef = useRef(null);
  const glassRef = useRef(null);
  const mediaRef = useRef(null);
  const artRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const glass = glassRef.current;
    const media = mediaRef.current;
    const art = artRef.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const stacked = window.matchMedia('(max-width: 860px)');
    let frame = 0;
    let shown = 0;

    /* 0 when the hero is at the top, 1 once its pinned runway has been scrolled */
    const progress = () => {
      const run = section.offsetHeight - window.innerHeight;
      if (reduce.matches || run <= 0) return 0;
      return Math.min(1, Math.max(0, -section.getBoundingClientRect().top / run));
    };
    const paint = (p) => {
      const e = p * p; /* power2.in */
      glass.style.transform = p ? `translate3d(${-110 * e}%, 0, 0)` : '';
      media.style.transform = p ? `scale(${1 + 0.04 * p})` : '';
      /* The card moves into the space the panel leaves: sideways on desktop, down on the stacked layout */
      const shift = stacked.matches ? `0, ${(glass.offsetHeight / 2) * e}px` : `${(-glass.offsetWidth / 2) * e}px, 0`;
      art.style.transform = p ? `translate3d(${shift}, 0) scale(${1 + 0.08 * e})` : '';
    };
    /* Ease towards the scroll position instead of jumping to it, like a .55s scrub */
    const tick = () => {
      frame = 0;
      const goal = progress();
      shown += (goal - shown) * 0.18;
      if (Math.abs(goal - shown) < 0.001) shown = goal;
      paint(shown);
      if (shown !== goal) frame = requestAnimationFrame(tick);
    };
    const request = () => { if (!frame) frame = requestAnimationFrame(tick); };
    /* Tabbing into the panel while it is off-screen brings it back */
    const onFocusIn = () => { if (shown > 0.02) window.scrollTo({ top: section.offsetTop }); };

    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    reduce.addEventListener('change', request);
    glass.addEventListener('focusin', onFocusIn);
    request();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', request);
      reduce.removeEventListener('change', request);
      glass.removeEventListener('focusin', onFocusIn);
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const goTo = (i) => setCurrent((i + slides.length) % slides.length);
  const autoplay = playing && !reduced;
  const slide = slides[current];
  const hold = {
    onMouseEnter: () => setHeld(true),
    onMouseLeave: () => setHeld(false),
    onFocus: () => setHeld(true),
    onBlur: (e) => { if (!e.currentTarget.contains(e.relatedTarget)) setHeld(false); },
  };

  const onKeyDown = (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    goTo(current + (e.key === 'ArrowRight' ? 1 : -1));
  };
  const onTouchStart = (e) => { touch.current = [e.touches[0].clientX, e.touches[0].clientY]; };
  const onTouchEnd = (e) => {
    if (!touch.current) return;
    const dx = e.changedTouches[0].clientX - touch.current[0];
    const dy = e.changedTouches[0].clientY - touch.current[1];
    touch.current = null;
    /* Only a mostly-horizontal swipe changes slide; vertical swipes are page scroll */
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) goTo(current + (dx < 0 ? 1 : -1));
  };

  return (
    <section
      ref={sectionRef} className={`hero${autoplay ? ' is-autoplay' : ''}${held ? ' is-held' : ''}`} id="top"
      aria-roledescription="carousel" aria-label="Highlights"
      onKeyDown={onKeyDown} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
    >
      <div className="hero-stage">
        {/* Blurred, darkened copies of the artworks fill the screen behind everything */}
        <div className="hero-media" ref={mediaRef} aria-hidden="true">
          {slides.map((s, i) => (
            <img
              key={s.src} className={`hero-img${i === current ? ' is-current' : ''}`}
              src={img(s.src)} width={ART_W} height={ART_H} alt="" decoding="async"
            />
          ))}
        </div>

        <div className="hero-glass" ref={glassRef} {...hold}>
          <div className="hero-intro">
            <p className="eyebrow">{heroIntro.eyebrow}</p>
            <h1 className="hero-title">
              {heroIntro.title.map((line, n) => <Fragment key={line}>{n > 0 && <br />}{line}</Fragment>)}
            </h1>
            <p className="hero-lede">{heroIntro.lede}</p>
          </div>

          {/* Each slide's label and button share one grid cell, so the panel never jumps between slides */}
          <div className="hero-copies">
            {slides.map((s, i) => {
              const on = i === current;
              return (
                <div
                  key={s.src}
                  className={`hero-copy${on ? ' is-current' : ''}`}
                  id={`kv-${i + 1}`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${slides.length}: ${s.label}`}
                  aria-hidden={!on || undefined}
                  inert={!on || undefined}
                >
                  <p className="hero-label">{s.label}</p>
                  <div className="hero-cta">
                    <a className="btn btn-light" href={s.href}>{s.cta}</a>
                    <a className="btn btn-ghost-light" href={links.showroom}>Visit the showroom</a>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="hero-bar">
            <ol className="kv-tabs">
              {slides.map((s, i) => (
                <li key={s.src}>
                  <button
                    type="button" data-go={i} aria-controls={`kv-${i + 1}`} aria-label={`Slide ${i + 1}: ${s.label}`}
                    aria-current={i === current ? 'true' : undefined} onClick={() => goTo(i)}
                    onAnimationEnd={(e) => { if (e.animationName === 'kvProgress') goTo(i + 1); }}
                  />
                </li>
              ))}
            </ol>
            <div className="kv-nav">
              {!reduced && (
                <button
                  className="kv-btn kv-play" type="button" data-play
                  aria-label={playing ? 'Pause slideshow' : 'Play slideshow'} onClick={() => setPlaying(!playing)}
                >
                  <Icon name={playing ? 'i-pause' : 'i-play'} />
                </button>
              )}
              <button className="kv-btn prev" type="button" data-prev aria-label="Previous slide" onClick={() => goTo(current - 1)}><Icon name="i-arrow" /></button>
              <button className="kv-btn next" type="button" data-next aria-label="Next slide" onClick={() => goTo(current + 1)}><Icon name="i-arrow" /></button>
            </div>
          </div>
        </div>

        {/* The artwork itself: shown at or below its real size so it stays sharp; the card links to the slide */}
        <div className="hero-art">
          <a className="hero-card" href={slide.href} ref={artRef} {...hold}>
            {slides.map((s, i) => (
              <img
                key={s.src} className={`hero-card-img${i === current ? ' is-current' : ''}`}
                src={img(s.src)} width={ART_W} height={ART_H} decoding="async"
                alt={i === current ? s.alt : ''} aria-hidden={i !== current || undefined}
                {...(i === 0 ? { fetchPriority: 'high' } : { loading: 'lazy' })}
              />
            ))}
          </a>
        </div>
      </div>
    </section>
  );
}
