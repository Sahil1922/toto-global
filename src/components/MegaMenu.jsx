import { useEffect, useRef, useState } from 'react';
import { Arrow, Icon } from './Icons.jsx';
import { img, links, megaMenu } from '../data.js';

/* Products mega menu, after Carysil: Browse → Categories → Series → Preview, in TOTO's colours.
   Hover (or focus) a Browse item to switch groups; hover a category to list its series. */
export default function MegaMenu({ open }) {
  const [active, setActive] = useState(0);
  const [catIndex, setCatIndex] = useState(null);
  /* Preview images only load once the menu has been opened, so they never cost the first page load */
  const [armed, setArmed] = useState(false);
  const intent = useRef();

  useEffect(() => { if (open) setArmed(true); }, [open]);
  useEffect(() => () => clearTimeout(intent.current), []);

  const group = megaMenu[active];
  const cat = catIndex === null ? null : group.categories[catIndex];
  const target = cat || group;

  /* A short hover delay, so moving diagonally towards the categories doesn't switch groups on the way */
  const choose = (i, delay) => {
    clearTimeout(intent.current);
    const go = () => { setActive(i); setCatIndex(null); };
    if (delay) intent.current = setTimeout(go, 90); else go();
  };

  return (
    <div className={`panel mega${open ? ' is-open' : ''}`} id="panel-products" role="region" aria-label="Products">
      <div className="wrap">
        <form className="mega-search" action="https://in.toto.com/" method="get" role="search">
          <Icon name="i-search" />
          <input type="search" name="s" placeholder="Search products, series and categories" aria-label="Search TOTO India products" />
          <a className="link" href={links.catalogue}>Catalogue <Arrow /></a>
        </form>

        <div className="mega-grid">
          <div className="mega-col mega-rule">
            <p className="mega-eyebrow">Browse</p>
            <ul className="mega-l1-list">
              {megaMenu.map((g, i) => (
                <li key={g.label}>
                  <a
                    className={`mega-l1${i === active ? ' is-active' : ''}`}
                    href={g.href}
                    aria-current={i === active ? 'true' : undefined}
                    onMouseEnter={() => choose(i, true)}
                    onMouseLeave={() => clearTimeout(intent.current)}
                    onFocus={() => { if (i !== active) choose(i); }}
                  >
                    <span>{g.label}</span>
                    <Icon name="i-chev" className="mega-chev" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mega-col mega-rule">
            <div className="mega-head">
              <p className="mega-eyebrow">Categories</p>
              <span className="mega-current">{group.label}</span>
            </div>
            <ul className="mega-l2-list" key={group.label}>
              {group.categories.map((c, i) => (
                <li key={c.label}>
                  <a
                    className={`mega-l2${i === catIndex ? ' is-active' : ''}`}
                    href={c.href}
                    onMouseEnter={() => setCatIndex(i)}
                    onFocus={() => setCatIndex(i)}
                  >
                    <span>
                      {c.label}
                      {c.series && <small>{c.series.length} {c.unit}</small>}
                    </span>
                    {c.series && <Icon name="i-chev" className="mega-chev" />}
                  </a>
                </li>
              ))}
            </ul>
            <a className="mega-viewall" href={group.href}>View all {group.label} <Arrow /></a>
          </div>

          <div className="mega-col mega-series">
            <div className="mega-head">
              <p className="mega-eyebrow">Series</p>
              {cat?.series && <span className="mega-current">{cat.label}</span>}
            </div>
            {cat?.series ? (
              <ul className="mega-scroll" key={cat.label}>
                {cat.series.map((s) => <li key={s.label}><a href={s.href}>{s.label} <Arrow /></a></li>)}
              </ul>
            ) : (
              <p className="mega-empty" key={cat ? cat.label : 'none'}>
                {cat
                  ? cat.note || `Browse every ${cat.label} product on TOTO India.`
                  : 'Choose a category to see its series.'}
              </p>
            )}
          </div>

          <a className="mega-preview" href={target.href}>
            {armed && megaMenu.map((g, i) => (
              <img
                key={g.preview} src={img(g.preview)} alt="" decoding="async"
                className={i === active ? 'is-shown' : undefined} style={{ objectPosition: g.pos }}
              />
            ))}
            <span className="mega-caption">
              <span className="mega-eyebrow">Explore</span>
              <span className="mega-title">{target.label} <Arrow /></span>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
