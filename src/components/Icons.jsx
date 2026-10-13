/* Inline icon sprite, rendered once. The TOTO wordmark paths are copied from in.toto.com's logo.svg:
   never redraw, stretch or recolour it. It uses currentColor, so it follows the header colour. */
export function Sprite() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M4 12h15M13.5 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.4" /></symbol>
      <symbol id="i-chev" viewBox="0 0 12 12"><path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.3" /></symbol>
      <symbol id="i-search" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.4" /><path d="m15.5 15.5 5 5" stroke="currentColor" strokeWidth="1.4" /></symbol>
      <symbol id="i-globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.3" /><path d="M3.5 12h17M12 3.5c2.4 2.4 3.5 5.3 3.5 8.5s-1.1 6.1-3.5 8.5c-2.4-2.4-3.5-5.3-3.5-8.5s1.1-6.1 3.5-8.5Z" fill="none" stroke="currentColor" strokeWidth="1.3" /></symbol>
      <symbol id="i-pause" viewBox="0 0 24 24"><path d="M9 6.5v11M15 6.5v11" fill="none" stroke="currentColor" strokeWidth="1.6" /></symbol>
      <symbol id="i-play" viewBox="0 0 24 24"><path d="M8.5 6v12l9.5-6-9.5-6Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></symbol>
      <symbol id="logo" viewBox="0 0 58 13">
        <path fill="currentColor" d="M10.7,12.5v-1.5H9c-0.4,0-0.8-0.2-0.8-0.7V2.1h0.9c1.7,0,2.5,1.3,2.5,2.9v0.2h1.7V0.5H0v4.6h1.7V5c0-1.6,0.8-2.9,2.5-2.9h1v8.3c0,0.5-0.4,0.7-0.8,0.7H2.6v1.5H10.7z" />
        <path fill="currentColor" d="M26,1.2C24.8,0.3,22.6,0,21.3,0c-1.3,0-3.4,0.3-4.7,1.2c-1.2,0.9-2.4,2.6-2.4,5.3c0,2.7,1.2,4.3,2.4,5.3c1.2,0.9,3.4,1.2,4.7,1.2c1.3,0,3.4-0.3,4.7-1.2c1.2-0.9,2.5-2.6,2.5-5.3C28.4,3.8,27.2,2.2,26,1.2 M24.1,10.2c-0.6,0.8-1.7,1.3-2.7,1.3c-1,0-2.1-0.4-2.7-1.3c-0.6-0.8-0.9-2.4-0.9-3.7c0-1.3,0.3-2.9,0.9-3.7c0.6-0.8,1.7-1.3,2.7-1.3c1.1,0,2.1,0.4,2.7,1.3C24.7,3.6,25,5.2,25,6.5C25,7.7,24.7,9.4,24.1,10.2" />
        <path fill="currentColor" d="M40.2,12.5v-1.5h-1.7c-0.4,0-0.8-0.2-0.8-0.7V2.1h0.9c1.7,0,2.5,1.3,2.5,2.9v0.2h1.7V0.5H29.6v4.6h1.7V5c0-1.6,0.8-2.9,2.5-2.9h0.9v8.3c0,0.5-0.4,0.7-0.8,0.7h-1.7v1.5H40.2z" />
        <path fill="currentColor" d="M55.6,1.2C54.4,0.3,52.2,0,50.9,0c-1.3,0-3.4,0.3-4.7,1.2c-1.2,0.9-2.4,2.6-2.4,5.3c0,2.7,1.2,4.3,2.4,5.3c1.2,0.9,3.4,1.2,4.7,1.2c1.3,0,3.4-0.3,4.7-1.2c1.2-0.9,2.4-2.6,2.4-5.3C58,3.8,56.8,2.2,55.6,1.2 M53.6,10.2C53,11,52,11.4,50.9,11.4c-1.1,0-2.1-0.4-2.7-1.3c-0.6-0.8-0.9-2.4-0.9-3.7c0-1.3,0.3-2.9,0.9-3.7c0.6-0.8,1.7-1.3,2.7-1.3c1,0,2.1,0.4,2.7,1.3c0.6,0.8,0.9,2.4,0.9,3.7C54.6,7.7,54.3,9.4,53.6,10.2" />
      </symbol>
    </svg>
  );
}

export function Icon({ name, ...props }) {
  return <svg aria-hidden="true" {...props}><use href={`#${name}`} /></svg>;
}

export const Arrow = () => <Icon name="i-arrow" className="arrow" />;

export const Logo = () => <Icon name="logo" viewBox="0 0 58 13" />;
