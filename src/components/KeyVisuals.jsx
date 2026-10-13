import { Fragment, useEffect, useRef, useState } from 'react';
import { Icon } from './Icons.jsx';
import { pad } from './SectionHead.jsx';
import { img, links, slides } from '../data.js';

/* Hero, after Carysil's diptych: a full-bleed photograph with the copy on a frosted panel at the left.
   The hero is pinned for one screen of scroll; over it the panel slides off to the left and the photo eases in 4%
   (Carysil: xPercent -110 with power2.in, scale 1.04, scrub .55). Hand-written, no GSAP.
   The four key visuals advance on their own (requested): the active tab's progress line is a CSS animation and its
   animationend moves to the next slide, so pausing is just animation-play-state. A pause button is always there
   (WCAG 2.2.2); hovering or focusing the panel holds it; reduced motion turns autoplay off. Tabs, arrows, arrow keys
   and swipes still work, and loop. */
export default function KeyVisuals() {
  const [current, setCurrent] = useState(0);
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [playing, setPlaying] = useState(true);
  const [held, setHeld] = useState(false);
  const touch = useRef(null);
  const sectionRef = useRef(null);
  const glassRef = useRef(null);
  const mediaRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const glass = glassRef.current;
    const media = mediaRef.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let shown = 0;

    /* 0 when the hero is at the top, 1 once its pinned runway has been scrolled */
    const progress = () => {
      const run = section.offsetHeight - window.innerHeight;
      if (reduce.matches || run <= 0) return 0;
      return Math.min(1, Math.max(0, -section.getBoundingClientRect().top / run));
    };
    const paint = (p) => {
      glass.style.transform = p ? `translate3d(${-110 * p * p}%, 0, 0)` : '';
      media.style.transform = p ? `scale(${1 + 0.04 * p})` : '';
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
  const goTo = (i) => setCurrent((i + slides.length) % slides.length);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  const autoplay = playing && !reduced;

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
      ref={sectionRef} className={`hero${autoplay ? ' is-autoplay' : ''}${held ? ' is-held' : ''}`} id="top" aria-roledescription="carousel" aria-label="Highlights"
      onKeyDown={onKeyDown} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
    >
      <div className="hero-stage">
        <div className="hero-media" ref={mediaRef}>
          {slides.map((s, i) => (
            <img
              key={s.src}
              className={`hero-img${i === current ? ' is-current' : ''}`}
              src={img(s.src)} width={s.width} height={s.height} alt={s.alt} decoding="async"
              aria-hidden={i !== current || undefined}
              style={{ '--pos': s.pos, '--pos-sm': s.posSm }}
              {...(i === 0 ? { fetchPriority: 'high' } : { loading: 'lazy' })}
            />
          ))}
        </div>

        <div
          className="hero-glass" ref={glassRef}
          onMouseEnter={() => setHeld(true)} onMouseLeave={() => setHeld(false)}
          onFocus={() => setHeld(true)} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setHeld(false); }}
        >
          {/* Every slide's copy sits in the same grid cell, so the panel never jumps in height between slides */}
          <div className="hero-copies">
            {slides.map((s, i) => {
              const Title = i === 0 ? 'h1' : 'h2';
              const on = i === current;
              return (
                <div
                  key={s.src}
                  className={`hero-copy${on ? ' is-current' : ''}`}
                  id={`kv-${i + 1}`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${slides.length}`}
                  aria-hidden={!on || undefined}
                  inert={!on || undefined}
                >
                  <p className="eyebrow">{s.eyebrow}</p>
                  <Title className={`hero-title${s.long ? ' is-long' : ''}`}>
                    {s.title.map((line, n) => <Fragment key={line}>{n > 0 && <br />}{line}</Fragment>)}
                  </Title>
                  {s.lede && <p className="hero-lede">{s.lede}</p>}
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
                    type="button" data-go={i} aria-controls={`kv-${i + 1}`} aria-label={`Slide ${i + 1}: ${s.tabLabel}`}
                    aria-current={i === current ? 'true' : undefined} onClick={() => goTo(i)}
                    onAnimationEnd={(e) => { if (e.animationName === 'kvProgress') goTo(i + 1); }}
                  >
                    {pad(i + 1)}
                  </button>
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
      </div>
    </section>
  );
}
