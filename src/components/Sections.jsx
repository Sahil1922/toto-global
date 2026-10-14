import { Fragment, useEffect, useRef, useState } from 'react';
import Reveal from './Reveal.jsx';
import ScrollWords from './ScrollWords.jsx';
import SectionHead from './SectionHead.jsx';
import { Arrow, Icon } from './Icons.jsx';
import {
  about, cleanTiles, facilities, featured, img, links, productRange, productRows, technologies,
} from '../data.js';

/* Stagger reveals in a row: 0, 80, 160, 240ms */
const stagger = (i, step = 80) => (i % 4) * step || undefined;

/* Featured, after Carysil's "In Motion" film strip: four panels in a row, one open at 3.2× the width of the others.
   Hovering (after a 90ms intent delay), focusing or tapping a panel opens it; clicking the open panel follows its link.
   TOTO touches: square corners, night scrim, a brand-blue rule drawn across the open panel. Below 1024px they stack. */
export function Featured() {
  const [open, setOpen] = useState(0);
  const intent = useRef();
  useEffect(() => () => clearTimeout(intent.current), []);
  const stacked = () => window.matchMedia('(max-width: 1023px)').matches;
  const openSoon = (i) => { clearTimeout(intent.current); intent.current = setTimeout(() => setOpen(i), 90); };

  return (
    <section className="section" id="featured" aria-labelledby="featured-title">
      <div className="wrap">
        <SectionHead eyebrow="Featured" title="Stories, spaces and the thinking behind them." id="featured-title" note="Hover or tap a panel to open it." />
        <div className="strip" onMouseLeave={() => clearTimeout(intent.current)}>
          {featured.map((c, i) => {
            const on = i === open;
            return (
              <Reveal
                as="a" key={c.title} className={`strip-panel${on ? ' is-open' : ''}`} delay={stagger(i, 120)} href={c.href}
                style={{ '--pos': c.pos }}
                onMouseEnter={() => openSoon(i)}
                onFocus={() => setOpen(i)}
                onClick={(e) => { if (!on && !stacked()) { e.preventDefault(); setOpen(i); } }}
              >
                <div className="strip-media"><img src={img(c.src)} width={c.width} height={c.height} loading="lazy" decoding="async" alt={c.alt} /></div>
                <span className="strip-more">{c.more} <Arrow /></span>
                <span className="strip-label" aria-hidden="true">{c.title}</span>
                <div className="strip-caption">
                  <span className="strip-kicker">{c.kicker}</span>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* About us: toto.com/en's four tiles, with motion in the family of the hero and Featured.
   The statement lights up word by word on scroll; 東洋陶器 brushes in character by character; the photos open
   like curtains (clip-path wipe + zoom-out) and bloom from TOTO monochrome to colour on hover; the milestone timeline draws itself. */
export function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="wrap">
        <div className="about-head">
          <Reveal><p className="eyebrow">About us</p></Reveal>
          <ScrollWords as="h2" className="h2 about-statement" id="about-title" text={about.title} />
        </div>

        <div className="about-intro">
          {/* Ink-and-seal reveal: a blue guide line draws down, each character is brushed in top to bottom,
              a 1917 seal is stamped beneath, then the caption slides in */}
          <Reveal className="founding">
            <div className="jp-col" aria-hidden="true">
              <span className="jp-mark">
                <span className="jp" lang="ja">
                  {[...'東洋陶器'].map((c, i) => <span key={c} style={{ '--i': i }}>{c}</span>)}
                </span>
                <span className="jp-rule" />
              </span>
              <span className="jp-seal">1917</span>
            </div>
            <small>Tōyō Tōki, TOTO's founding name. Kitakyushu, Japan, 1917.</small>
          </Reveal>
          <Reveal as="p" className="about-body-text" delay={120}>{about.body}</Reveal>
        </div>

        <ul className="about-tiles">
          {about.rows.map((r, i) => (
            <Reveal as="li" className="about-tile" delay={stagger(i, 140)} key={r.title}>
              <a className="about-link" href={r.href}>
                <div className="about-media"><img src={img(r.src)} width={r.width} height={r.height} loading="lazy" decoding="async" alt="" /></div>
                <div className="about-body">
                  <h3>{r.title}</h3>
                  <Arrow />
                  <p>{r.text}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </ul>

        {/* Milestones: a hairline draws, a TOTO-blue line sweeps 1917 → 2025, each dot fills as it is reached and its
            figure rolls up digit by digit (a typographic reveal, not a count-up) */}
        <Reveal as="ol" className="timeline" aria-label="TOTO milestones">
          {about.milestones.map((m, i) => (
            <li className="tl-item" key={m.figure} style={{ '--i': i }}>
              <span className="tl-dot" aria-hidden="true" />
              <span className="tl-tag">{m.tag}</span>
              <p className="tl-num">
                <span className="sr-only">{m.figure}</span>
                <span className="tl-digits" aria-hidden="true">
                  {[...m.figure].map((c, n) => <span key={n} style={{ '--c': n }}>{c}</span>)}
                </span>
              </p>
              <p className="tl-cap">{m.cap}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* TOTO Cleanovation, after Carysil's "Signature" section: the title's words rise from behind a mask; below, one
   full-width photograph with four columns over it. Hovering or focusing a column cross-fades the photo to its own,
   brightens its title, unfolds its text and draws a TOTO-blue rule. Below 1024px the columns become photo cards. */
export function Cleanovation() {
  const [active, setActive] = useState(0);
  const title = ['Four', 'innovations.', 'One', 'standard', 'of', 'clean.'];
  return (
    <section className="section clean on-dark" id="cleanovation" aria-labelledby="clean-title">
      <div className="wrap">
        <div className="section-head">
          <Reveal>
            <p className="eyebrow">TOTO Cleanovation</p>
            <h2 className="h2 mask-title" id="clean-title">
              {title.map((w, i) => (
                <Fragment key={w}>{i > 0 && ' '}<span className="mw"><span className={w === 'One' ? 'accent' : undefined} style={{ '--w': i }}>{w}</span></span></Fragment>
              ))}
            </h2>
            <p className="intro">Enriching lives with innovative clean technology. Each one works quietly, every time, so the bathroom stays fresh with far less effort.</p>
          </Reveal>
          <Reveal as="a" className="link" href={links.cleanovation}>About Cleanovation <Arrow /></Reveal>
        </div>
      </div>

      <Reveal className="band">
        {cleanTiles.map((t, i) => (
          <img
            key={t.src} className={`band-img${i === active ? ' is-current' : ''}`} src={img(t.src)} width={t.width} height={t.height}
            loading="lazy" decoding="async" alt={i === active ? t.alt : ''} aria-hidden={i !== active || undefined} style={{ objectPosition: t.pos }}
          />
        ))}
        <div className="band-cols">
          {cleanTiles.map((t, i) => (
            <a
              key={t.title} className={`band-col${i === active ? ' is-active' : ''}`} href={t.href}
              onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}
            >
              <h3>{t.title}</h3>
              <div className="band-more"><div>
                <p>{t.text}</p>
                <span className="band-explore">Explore <Arrow /></span>
              </div></div>
              <span className="band-rule" aria-hidden="true" />
            </a>
          ))}
        </div>
      </Reveal>

      <div className="band-cards wrap">
        {cleanTiles.map((t, i) => (
          <Reveal as="a" className="band-card" delay={stagger(i)} href={t.href} key={t.title}>
            <img src={img(t.src)} width={t.width} height={t.height} loading="lazy" decoding="async" alt={t.alt} style={{ objectPosition: t.pos }} />
            <div className="band-card-body">
              <h3>{t.title}</h3>
              <p>{t.text}</p>
              <span className="band-explore">Explore <Arrow /></span>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="wrap">
        <Reveal className="tech-head">
          <p className="label">The technology inside</p>
          <a className="link" href={links.technology}>Explore our technology <Arrow /></a>
        </Reveal>
        <ol className="tech-row">
          {technologies.map((t, i) => (
            <Reveal as="li" delay={stagger(i)} key={t.name}>
              <h3>{t.name}</h3><p>{t.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* Products: toto.com/en's nine, as a bento grid with NEOREST as the hero tile. Each tile opens like an iris as it
   scrolls in (the frame widens from an inset window while the photo settles from a zoom); on hover/focus the photo
   zooms, the description and "Explore" unfold and a TOTO-blue rule draws along the bottom. */
/* Products: toto.com/en's nine, every photo shown whole. NEOREST has a row to itself at its panoramic proportions;
   the other eight sit in two justified rows, each tile as wide as its photo's aspect ratio needs, so a row shares one
   height and nothing is cropped. Text stays light (requested): just the name over the photo. Tiles open like an iris as
   they scroll in; on hover/focus the photo zooms, "Explore" unfolds and a TOTO-blue rule draws along the bottom. */
export function Products() {
  return (
    <section className="section" id="products" aria-labelledby="products-title">
      <div className="wrap">
        <SectionHead eyebrow="Product" title="Every detail, considered." id="products-title" intro="Nine product families, one standard of clean comfort." />
        <div className="bento">
          {productRows.map((row) => (
            <ul className="bento-row" key={row.join('-')}>
              {row.map((i) => {
                const p = productRange[i];
                return (
                  <Reveal
                    as="li" className={`bento-item${p.span ? ' is-hero' : ''}`} delay={(i % 5) * 90 || undefined} key={p.name}
                    style={{ '--ar': (p.width / p.height).toFixed(4) }}
                  >
                    <a className="bento-tile" href={p.href}>
                      <div className="bento-media"><img src={img(p.src)} width={p.width} height={p.height} loading="lazy" decoding="async" alt={p.alt} /></div>
                      <div className="bento-body">
                        <h3>{p.name}</h3>
                        <div className="bento-more"><div><span className="bento-explore">Explore <Arrow /></span></div></div>
                      </div>
                    </a>
                  </Reveal>
                );
              })}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Facilities() {
  return (
    <section className="section visit" id="facilities" aria-labelledby="facilities-title">
      <div className="wrap">
        <SectionHead eyebrow="Facility information" title="See TOTO for yourself." id="facilities-title" intro="Places where TOTO's history, design thinking and technology can be experienced first-hand." />
        <ul className="fac">
          {facilities.map((f, i) => (
            <Reveal as="li" className="fac-item" delay={stagger(i, 160)} key={f.title}>
              <a className="fac-link" href={f.href}>
                <div className="fac-media">
                  <img src={img(f.src)} width={f.width} height={f.height} loading="lazy" decoding="async" alt={f.alt} />
                  {f.badge && <span className="fac-badge"><Icon name="i-cube" />{f.badge}</span>}
                </div>
                <div className="fac-body">
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                  {f.credit && <small>{f.credit}</small>}
                  <span className="fac-visit">Visit <Arrow /></span>
                </div>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
