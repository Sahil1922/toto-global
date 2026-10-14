import { useState } from 'react';
import { Arrow, Logo } from './Icons.jsx';
import Reveal from './Reveal.jsx';
import ScrollWords from './ScrollWords.jsx';
import { primaryNav, productRange, regions } from '../data.js';

/* Footer: toto.com/en's content (notes, Web Accessibility, © TOTO LTD., an OPEN site map) in this site's own theme:
   a night band that signs off with TOTO's brand purpose lit word by word, hairline-divided notes, a square OPEN
   toggle and a site map with the blue accent rule. */
const company = [...primaryNav.before.filter((l) => !l.current), ...primaryNav.after];

/* "WEB site" opens the header's Global network list, like toto.com's js-GlobalNetwork button */
const openNetwork = () => window.dispatchEvent(new CustomEvent('toto:open-network'));

export default function Footer() {
  const [open, setOpen] = useState(false);
  return (
    <footer className={`site-footer${open ? ' is-open' : ''}`}>
      <div className="wrap">
        <div className="foot-hero">
          <div>
            <Reveal><p className="eyebrow">TOTO brand purpose</p></Reveal>
            {/* near the end of the page the line never rises far, so it finishes lighting lower down */}
            <ScrollWords as="p" className="foot-purpose" from={0.95} to={0.75} text="Create an enriched and more comfortable lifestyle and culture." />
          </div>
          <a className="foot-top-btn" href="#top">Back to top <Arrow /></a>
        </div>

        <div className="notes">
          <Reveal as="p">WASHLET and “WASHLET logo” are registered trademark of TOTO LTD.</Reveal>
          <Reveal as="p" delay={100}>
            Product availability will depend on regional market. Please check the{' '}
            <button type="button" className="notes-link" onClick={openNetwork}>WEB site</button> of each region.
          </Reveal>
          <Reveal as="p" className="concept-note" delay={200}>Homepage design concept. Not an official TOTO website.</Reveal>
        </div>

        <div className="foot-bar">
          <a className="foot-logo" href="#top" aria-label="TOTO, back to top"><Logo /></a>
          <a className="foot-link" href="https://www.toto.com/en/web-accessibility/">Web Accessibility</a>
          <span className="foot-copy">© TOTO LTD.</span>
          <button className="foot-toggle" type="button" aria-expanded={open} aria-controls="footer-map" onClick={() => setOpen(!open)}>
            <span className="foot-plus" aria-hidden="true" />{open ? 'Close' : 'Open'}
          </button>
        </div>

        <div className="foot-map" id="footer-map" inert={!open || undefined}>
          <div>
            <nav className="foot-cols" aria-label="Site map">
              <div>
                <h3>Product</h3>
                <ul>{productRange.map((p) => <li key={p.name}><a href={p.href}>{p.name}</a></li>)}</ul>
              </div>
              <div>
                <h3>Company</h3>
                <ul>{company.map((l) => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}</ul>
              </div>
              <div className="foot-regions">
                <h3>Global network</h3>
                <ul>{regions.map((r) => <li key={r.label}><a href={r.href}>{r.label}</a></li>)}</ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
