import { Sprite } from './components/Icons.jsx';
import Header from './components/Header.jsx';
import KeyVisuals from './components/KeyVisuals.jsx';
import { About, Cleanovation, Featured, Products, Support, Visit } from './components/Sections.jsx';
import Footer from './components/Footer.jsx';

/* Section order follows the TOTO Global homepage (toto.com/en/index.htm) */
export default function App() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Sprite />
      <Header />
      <main id="main">
        <KeyVisuals />
        <Featured />
        <About />
        <Cleanovation />
        <Products />
        <Visit />
        <Support />
      </main>
      <Footer />
    </>
  );
}
