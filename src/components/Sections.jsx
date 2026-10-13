import Reveal from './Reveal.jsx';
import SectionHead, { pad } from './SectionHead.jsx';
import { Arrow } from './Icons.jsx';
import {
  about, categories, cleanTiles, facilities, featured, img, links, neorestFeature, products, showroom, support, technologies,
} from '../data.js';

/* Stagger reveals in a row: 0, 80, 160, 240ms */
const stagger = (i, step = 80) => (i % 4) * step || undefined;

export function Featured() {
  return (
    <section className="section" id="featured" aria-labelledby="featured-title">
      <div className="wrap">
        <SectionHead eyebrow="Featured" title="Stories, spaces and the thinking behind them." id="featured-title" />
        <div className="cards">
          {featured.map((c, i) => (
            <Reveal as="a" className="card" delay={stagger(i)} href={c.href} key={c.title}>
              <div className="card-media"><img src={img(c.src)} width={c.width} height={c.height} loading="lazy" decoding="async" alt={c.alt} /></div>
              <div className="card-body">
                <span className="num-sm">{pad(i + 1)}</span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <span className="more">{c.more} <Arrow /></span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="wrap">
        <SectionHead eyebrow="About us" title={about.title} id="about-title" />

        <div className="about-grid">
          <Reveal className="about-aside">
            <div className="founding">
              <span className="jp" lang="ja" aria-hidden="true">東洋陶器</span>
              <small>Tōyō Tōki, TOTO's founding name. Kitakyushu, Japan, 1917.</small>
            </div>
            <p>{about.body}</p>
          </Reveal>

          <ul className="rows">
            {about.rows.map((r, i) => (
              <Reveal as="li" delay={stagger(i)} key={r.title}>
                <a className="row" href={r.href}>
                  <span className="row-media"><img src={img(r.src)} width={r.width} height={r.height} loading="lazy" decoding="async" alt="" /></span>
                  <span className="num-sm">{pad(i + 1)}</span>
                  <div><h3>{r.title}</h3><p>{r.text}</p></div>
                  <Arrow />
                </a>
              </Reveal>
            ))}
          </ul>
        </div>

        <dl className="stats">
          {about.stats.map((s, i) => (
            <Reveal className="stat" delay={stagger(i)} key={s.term}>
              <dt className="sr-only">{s.term}</dt>
              <dd><span className="num">{s.num}</span><span className="cap">{s.cap}</span></dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function Cleanovation() {
  return (
    <section className="section clean on-dark" id="cleanovation" aria-labelledby="clean-title">
      <div className="wrap">
        <SectionHead
          eyebrow="TOTO Cleanovation" title="Clean, built in." id="clean-title"
          intro="Enriching lives with innovative clean technology. Each one works quietly, every time, so the bathroom stays fresh with far less effort."
          link={{ label: 'About Cleanovation', href: links.cleanovation }}
        />

        <div className="ctiles">
          {cleanTiles.map((t, i) => (
            <Reveal as="a" className="ctile" delay={stagger(i)} href={t.href} key={t.title}>
              <img src={img(t.src)} width={t.width} height={t.height} loading="lazy" decoding="async" alt={t.alt} />
              <div className="ctile-body">
                <span className="num-sm">{pad(i + 1)}</span>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
                <Arrow />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="tech-head">
          <p className="label">The technology inside</p>
          <a className="link" href={links.technology}>Explore our technology <Arrow /></a>
        </Reveal>
        <ol className="tech-row">
          {technologies.map((t, i) => (
            <Reveal as="li" delay={stagger(i)} key={t.name}>
              <span className="num-sm">{pad(i + 1)}</span><h3>{t.name}</h3><p>{t.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Products() {
  const n = neorestFeature;
  return (
    <section className="section" id="products" aria-labelledby="products-title">
      <div className="wrap">
        <SectionHead eyebrow="Products" title="Every detail, considered." id="products-title" link={{ label: 'Browse the catalogue', href: links.catalogue }} />

        <Reveal as="a" className="pfeature" href={n.href}>
          <div className="pfeature-media">
            <img src={img(n.src)} width={n.width} height={n.height} loading="lazy" decoding="async" alt={n.alt} />
          </div>
          <div className="pfeature-body">
            <div>
              <span className="num-sm">01</span>
              <h3>NEOREST</h3>
            </div>
            <p>{n.text}</p>
            <div>
              <div className="models"><span className="label">Models</span>{n.models.map((m) => <span key={m}>{m}</span>)}</div>
              <span className="more">Discover NEOREST <Arrow /></span>
            </div>
          </div>
        </Reveal>

        <div className="ptiles">
          {products.map((p, i) => (
            <Reveal as="a" className="ptile" delay={(i % 3) * 80 || undefined} style={p.pos && { '--pos': p.pos }} href={p.href} key={p.title}>
              <div className="ptile-media"><img src={img(p.src)} width={p.width} height={p.height} loading="lazy" decoding="async" alt={p.alt} /></div>
              <div className="ptile-body"><span className="num-sm">{pad(i + 2)}</span><h3>{p.title}</h3><Arrow /><p>{p.text}</p></div>
            </Reveal>
          ))}
        </div>

        <Reveal className="chips">
          <span className="label">Shop by category</span>
          {categories.map((c) => <a className="chip" href={c.href} key={c.label}>{c.label}</a>)}
        </Reveal>
      </div>
    </section>
  );
}

export function Visit() {
  return (
    <section className="section visit" id="showroom" aria-labelledby="showroom-title">
      <div className="wrap">
        <div className="showroom-grid">
          <Reveal className="showroom-media">
            <img src={img('showroom.webp')} width="929" height="805" loading="lazy" decoding="async" alt={showroom.alt} />
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow">TOTO Delhi Showroom</p>
            <h2 className="h2" id="showroom-title">Experience it in person.</h2>
            <p className="lede">{showroom.lede}</p>
            <dl className="facts">
              {showroom.facts.map((f) => <div key={f.term}><dt>{f.term}</dt><dd>{f.value}</dd></div>)}
            </dl>
            <div className="cta-row">
              <a className="btn" href={links.showroom}>Plan your visit</a>
              <a className="btn btn-ghost" href={links.whereToBuy}>Find a dealer</a>
            </div>
          </Reveal>
        </div>

        <div className="facilities">
          <Reveal as="p" className="label">TOTO in Japan</Reveal>
          {facilities.map((f, i) => (
            <Reveal as="a" className="mini" delay={stagger(i)} href={f.href} key={f.title}>
              <span className="mini-media"><img src={img(f.src)} width={f.width} height={f.height} loading="lazy" decoding="async" alt={f.alt} /></span>
              <div>
                <h3>{f.title} <Arrow /></h3>
                <p>{f.text}</p>
                {f.credit && <small>{f.credit}</small>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Support() {
  return (
    <section className="section" id="support" aria-labelledby="support-title">
      <div className="wrap">
        <SectionHead eyebrow="Here to help" title="Long after installation." id="support-title" />
        <div className="support-grid">
          {support.map((t, i) => (
            <Reveal as="a" className="tile" delay={stagger(i)} href={t.href} key={t.title}>
              <span className="num-sm">{pad(i + 1)}</span><h3>{t.title}</h3><p>{t.text}</p>
              <Arrow />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
