import { useEffect, useRef, useState } from 'react';

/* One shared IntersectionObserver for every .reveal element: a quiet 16px fade-up, once. */
const pending = new Map();
let io = null;
let observed = false;

function observer() {
  if (io || typeof IntersectionObserver === 'undefined') return io;
  io = new IntersectionObserver((entries) => {
    observed = true;
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      pending.get(entry.target)?.();
      pending.delete(entry.target);
      io.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  /* Safety net: if the observer never reports (throttled renderer, odd embeds), never leave content hidden */
  setTimeout(() => {
    if (observed) return;
    io.disconnect();
    pending.forEach((show) => show());
    pending.clear();
  }, 1500);
  return io;
}

export function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    const obs = observer();
    if (!el) return undefined;
    if (!obs) { setShown(true); return undefined; }
    pending.set(el, () => setShown(true));
    obs.observe(el);
    return () => { pending.delete(el); obs.unobserve(el); };
  }, []);
  return [ref, shown];
}

/* <Reveal as="a" className="card" delay={80} href="…"> renders <a class="card reveal"> with --d:80ms */
export default function Reveal({ as: Tag = 'div', className, delay, style, children, ...props }) {
  const [ref, shown] = useReveal();
  const cls = [className, 'reveal', shown && 'in'].filter(Boolean).join(' ');
  const css = delay ? { ...style, '--d': `${delay}ms` } : style;
  return <Tag ref={ref} className={cls} style={css} {...props}>{children}</Tag>;
}
