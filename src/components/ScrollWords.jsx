import { Fragment, useEffect, useRef } from 'react';

/* After Carysil's manifesto: the words of a line light up in reading order as it moves up the screen.
   It follows the scroll position (no pinning). Lit from 16% to 100% opacity; with reduced motion, fully lit.
   `from` / `to` set where in the viewport lighting starts and completes (a line near the page end needs an earlier `to`). */
export default function ScrollWords({ as: Tag = 'p', text, from = 0.88, to = 0.45, ...props }) {
  const ref = useRef(null);
  const words = text.split(' ');

  useEffect(() => {
    const el = ref.current;
    const spans = [...el.querySelectorAll('.sw')];
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const paint = () => {
      frame = 0;
      if (reduce.matches) { spans.forEach((s) => { s.style.opacity = '1'; }); return; }
      /* 0 when the line's top reaches `from` of the viewport height, 1 once its bottom passes `to` */
      const r = el.getBoundingClientRect();
      const start = window.innerHeight * from;
      const end = window.innerHeight * to;
      const p = Math.min(1, Math.max(0, (start - r.top) / (start - end + r.height)));
      const lit = p * (spans.length + 1);
      spans.forEach((s, i) => { s.style.opacity = String(0.16 + 0.84 * Math.min(1, Math.max(0, lit - i))); });
    };
    const request = () => { if (!frame) frame = requestAnimationFrame(paint); };
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    reduce.addEventListener('change', request);
    request();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', request);
      reduce.removeEventListener('change', request);
    };
  }, [text, from, to]);

  return (
    <Tag ref={ref} {...props}>
      {words.map((w, i) => <Fragment key={i}>{i > 0 && ' '}<span className="sw">{w}</span></Fragment>)}
    </Tag>
  );
}
