import { MotionConfig } from 'framer-motion';
import { lazy, Suspense } from 'react';
import { Footer } from './components/Footer';
import { Nav } from './components/Nav';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { Experience } from './components/sections/Experience';
import { Hero } from './components/sections/Hero';
import { Skills } from './components/sections/Skills';
import { Ticker } from './components/sections/Ticker';
import { Work } from './components/sections/Work';
import { Background } from './components/ui/Background';
import { ScrollChrome } from './components/ui/ScrollChrome';
import { usePointerEffects } from './hooks/useMediaQuery';

const CursorLight = lazy(() => import('./components/ui/CursorLight'));

export default function App() {
  const pointerEffects = usePointerEffects();

  return (
    <MotionConfig reducedMotion="user">
      <Background />
      <ScrollChrome />
      {pointerEffects && (
        <Suspense fallback={null}>
          <CursorLight />
        </Suspense>
      )}
      <Nav />
      <main id="main" tabIndex={-1} className="relative focus:outline-none">
        <Hero />
        <Ticker />
        <About />
        <Work />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
