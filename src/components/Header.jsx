import { useEffect, useRef, useState } from 'react';
import { Arrow, Icon, Logo } from './Icons.jsx';
import MegaMenu from './MegaMenu.jsx';
import { links, mobileNav, primaryNav, regions } from '../data.js';

export default function Header() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [netOpen, setNetOpen] = useState(false);
  const netRef = useRef(null);
  const netTriggerRef = useRef(null);
  const itemRef = useRef(null);
  const triggerRef = useRef(null);
  const toggleRef = useRef(null);
  const closeTimer = useRef();
  const headerRef = useRef(null);
  const [hidden, setHidden] = useState(false);
  const openRef = useRef(false);
  openRef.current = panelOpen || menuOpen || netOpen;

  /* After Carysil: the bar slides up when scrolling down and comes back on any scroll up.
     It always shows near the top (88px), while a menu is open, and when keyboard focus enters it. */
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = Math.max(0, window.scrollY);
        if (openRef.current || y < 88) setHidden(false);
        else if (y - last > 14) setHidden(true);
        else if (y - last < -10) setHidden(false);
        last = y;
      });
    };
    const onFocusIn = () => setHidden(false);
    const header = headerRef.current;
    window.addEventListener('scroll', onScroll, { passive: true });
    header.addEventListener('focusin', onFocusIn);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      header.removeEventListener('focusin', onFocusIn);
    };
  }, []);
  useEffect(() => { if (panelOpen || menuOpen || netOpen) setHidden(false); }, [panelOpen, menuOpen, netOpen]);

  /* Global network: a small region list under its cell, as on toto.com. Click to open; one dropdown at a time. */
  const toggleNet = () => { setPanel(false); setNetOpen(!netOpen); };
  /* The footer's "WEB site" link (as on toto.com) opens this list from anywhere on the page */
  useEffect(() => {
    const open = () => { setHidden(false); setPanelOpen(false); setNetOpen(true); netTriggerRef.current?.focus({ preventScroll: true }); };
    window.addEventListener('toto:open-network', open);
    return () => window.removeEventListener('toto:open-network', open);
  }, []);
  useEffect(() => {
    if (!netOpen) return undefined;
    const onDocClick = (e) => { if (!netRef.current.contains(e.target)) setNetOpen(false); };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, [netOpen]);

  /* Products panel: hover on desktop, click or keyboard anywhere */
  const setPanel = (open) => { clearTimeout(closeTimer.current); setPanelOpen(open); if (open) setNetOpen(false); };
  const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const onTriggerClick = (e) => {
    /* With a mouse, hover already opened it, so a click keeps it open; keyboard (detail 0) and touch toggle */
    if (finePointer() && e.detail > 0) { setPanel(true); return; }
    setPanel(!panelOpen);
  };
  useEffect(() => {
    if (!panelOpen) return undefined;
    const onDocClick = (e) => { if (!itemRef.current.contains(e.target)) setPanel(false); };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, [panelOpen]);

  /* Mobile menu: the open state lives on <html> so the CSS can restyle the header and lock scroll */
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('menu-open', menuOpen);
    root.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);
  useEffect(() => {
    const wide = window.matchMedia('(min-width: 1280px)');
    const onChange = (e) => { if (e.matches) setMenuOpen(false); };
    wide.addEventListener('change', onChange);
    return () => wide.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!panelOpen && !menuOpen && !netOpen) return undefined;
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (panelOpen) { setPanel(false); triggerRef.current.focus(); }
      if (netOpen) { setNetOpen(false); netTriggerRef.current.focus(); }
      if (menuOpen) { setMenuOpen(false); toggleRef.current.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [panelOpen, menuOpen, netOpen]);

  return (
    <>
      {/* Always the frosted porcelain bar, from the very top of the page */}
      <header ref={headerRef} className={`site-header is-solid${panelOpen ? ' has-panel' : ''}${hidden ? ' is-hidden' : ''}`} id="header">
        {/* After toto.com: logo block flush left, Global network + Language cells, then the nav as divided cells */}
        <div className="bar">
          <a className="logo" href="#top" aria-label="TOTO India, home"><Logo /></a>

          <ul className="utility">
            <li
              className="util-net" ref={netRef}
              onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setNetOpen(false); }}
            >
              <button
                ref={netTriggerRef} className="util-link" type="button" data-net
                aria-expanded={netOpen} aria-controls="panel-network" onClick={toggleNet}
              >
                <Icon name="i-globe" /><span className="util-text">Global network</span>
              </button>
              <div className={`net-panel${netOpen ? ' is-open' : ''}`} id="panel-network" role="region" aria-label="TOTO websites">
                <p className="net-title">TOTO websites</p>
                <ul>
                  <li><span className="net-here" aria-current="true">India <small>You are here</small></span></li>
                  {regions.map((r) => <li key={r.label}><a href={r.href}>{r.label}</a></li>)}
                </ul>
              </div>
            </li>
            <li className="util-lang">
              {/* TOTO India is English only, so this is a label, not a switcher */}
              <span className="util-link" title="TOTO India is available in English">
                <span className="util-text">Language</span><span className="lang-pill">EN</span>
              </span>
            </li>
          </ul>

          <nav className="primary" aria-label="Primary">
            <ul>
              {primaryNav.before.map((l) => (
                <li key={l.label}>
                  <a className={`nav-link${l.current ? ' is-current' : ''}`} href={l.href} aria-current={l.current ? 'page' : undefined}>{l.label}</a>
                </li>
              ))}
              <li
                ref={itemRef}
                onMouseEnter={() => { if (finePointer()) setPanel(true); }}
                onMouseLeave={() => { if (finePointer()) closeTimer.current = setTimeout(() => setPanelOpen(false), 160); }}
                onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setPanel(false); }}
              >
                <button ref={triggerRef} className="nav-link" type="button" data-panel aria-expanded={panelOpen} aria-controls="panel-products" onClick={onTriggerClick}>
                  Product <Icon name="i-chev" className="chev" />
                </button>
                <MegaMenu open={panelOpen} />
              </li>
              {primaryNav.after.map((l) => <li key={l.label}><a className="nav-link" href={l.href}>{l.label}</a></li>)}
            </ul>
          </nav>

          <div className="actions">
            <a className="icon-btn" href={links.search} aria-label="Search TOTO India"><Icon name="i-search" /></a>
            <button ref={toggleRef} className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>
              <span className="label-text">{menuOpen ? 'Close' : 'Menu'}</span><span className="bars" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <nav className="mobile-menu" id="mobile-menu" aria-label="Mobile" onClick={(e) => { if (e.target.closest('a')) setMenuOpen(false); }}>
        <ul className="big">
          {mobileNav.big.map((l) => <li key={l.label}><a href={l.href}>{l.label} <Arrow /></a></li>)}
        </ul>
        <ul className="small">
          {mobileNav.small.map((l) => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}
        </ul>
        <a className="btn" href={links.whereToBuy}>Where to buy</a>
      </nav>
    </>
  );
}
