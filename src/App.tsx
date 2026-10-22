import { MotionConfig } from 'framer-motion';
import { Footer } from './components/Footer';
import { Nav } from './components/Nav';
import { About } from './components/sections/About';
import { Banner } from './components/sections/Banner';
import { Contact } from './components/sections/Contact';
import { Experience } from './components/sections/Experience';
import { Hero } from './components/sections/Hero';
import { Manifesto } from './components/sections/Manifesto';
import { Skills } from './components/sections/Skills';
import { Work } from './components/sections/Work';
import { ScrollChrome } from './components/ui/ScrollChrome';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollChrome />
      <Nav />
      <main id="main" tabIndex={-1} className="relative focus:outline-none">
        <Hero />
        <Work />
        <About />
        <Skills />
        <Banner />
        <Experience />
        <Manifesto />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
