import { Icon, Logo } from './Icons.jsx';
import { footerColumns, regions, socials } from '../data.js';

const socialIcons = {
  Facebook: <path fill="currentColor" d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z" />,
  X: <path fill="currentColor" d="M17.6 3.5h2.9l-6.4 7.3 7.5 9.9h-5.9l-4.6-6-5.3 6H2.9l6.8-7.8-7.2-9.4h6l4.2 5.5 4.9-5.5Zm-1 15.5h1.6L7.5 5.1H5.8L16.6 19Z" />,
  Instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </>
  ),
  LinkedIn: <path fill="currentColor" d="M4.5 9h3v11h-3V9Zm1.5-5a1.75 1.75 0 1 1 0 3.5A1.75 1.75 0 0 1 6 4Zm4 5h2.9v1.5h.04c.4-.76 1.38-1.56 2.85-1.56 3.05 0 3.61 2 3.61 4.6V20h-3v-5.4c0-1.3-.02-2.96-1.8-2.96-1.8 0-2.08 1.4-2.08 2.86V20H10V9Z" />,
  YouTube: <path fill="currentColor" d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10 15V9l5.2 3L10 15Z" />,
};

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-top">
        <div className="footer-brand">
          <a className="logo-f" href="#top" aria-label="TOTO India, back to top"><Logo /></a>
          <p>Japanese bathroom design and clean technology since 1917. Made in India at Halol, Gujarat.</p>
          <div className="social">
            {socials.map((s) => (
              <a key={s.name} href={s.href} aria-label={`TOTO India on ${s.name}`}>
                <svg viewBox="0 0 24 24" aria-hidden="true">{socialIcons[s.name]}</svg>
              </a>
            ))}
          </div>
        </div>

        {footerColumns.map((col) => (
          <div key={col.title}>
            <h3>{col.title}</h3>
            <ul>
              {col.links.map((l) => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}
            </ul>
            {col.title === 'Support' && (
              <details className="region">
                <summary><Icon name="i-globe" width="16" height="16" /> India <Icon name="i-chev" width="10" height="10" /></summary>
                <ul>
                  {regions.map((r) => <li key={r.label}><a href={r.href}>{r.label}</a></li>)}
                </ul>
              </details>
            )}
          </div>
        ))}
      </div>

      <div className="wrap">
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} TOTO LTD. All rights reserved.</span>
          <span className="concept-note">Homepage design concept. Not an official TOTO website.</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
