import Reveal from './Reveal.jsx';
import { Arrow } from './Icons.jsx';

/* Every section opens the same way: eyebrow (blue rule + small caps), h2, optional link on the right */
export default function SectionHead({ eyebrow, title, id, intro, link }) {
  return (
    <div className="section-head">
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="h2" id={id}>{title}</h2>
        {intro && <p className="intro">{intro}</p>}
      </Reveal>
      {link && <Reveal as="a" className="link" href={link.href}>{link.label} <Arrow /></Reveal>}
    </div>
  );
}

/* Two-digit item numbers: 01, 02 … */
export const pad = (n) => String(n).padStart(2, '0');
