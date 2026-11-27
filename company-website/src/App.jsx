import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Header from './components/Header';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import About from './pages/About';
import Opportunities from './pages/Opportunities';
import Portfolio from './pages/Portfolio';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Team from './pages/Team';
import { sampleFor, samples } from './samples/registry';

const pageNames = {
  '/': 'Home',
  '/about': 'About',
  '/team': 'Team',
  '/projects': 'Services',
  '/portfolio': 'Portfolio',
  '/opportunities': 'Opportunities',
  '/contact': 'Contact',
};

/** What the transition curtain shows on the way to `to`. */
const curtainFor = (to, from) => {
  const sample = sampleFor(to.pathname);
  if (!sample) {
    return { mark: '/favicon.svg', label: pageNames[to.pathname] || '', className: 'bg-[#0e0933] text-paper' };
  }
  // Moving around inside one shop gets a quick fade instead of the full curtain.
  return { ...sample.curtain, label: sample.name, isQuick: sampleFor(from.pathname) === sample };
};

const preloadPage = (location) => sampleFor(location.pathname)?.preload(location);

function App() {
  return (
    <Router>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
      >
        Skip to content
      </a>
      <div className="min-h-screen overflow-x-clip bg-paper text-ink">
        {/* Sample websites bring their own header and footer. */}
        <PageTransition
          header={(location) => !sampleFor(location.pathname) && <Header />}
          curtain={curtainFor}
          preload={preloadPage}
        >
          {(location) => (sampleFor(location.pathname) ? (
            <Routes location={location}>
              {samples.map((sample) => (
                <Route key={sample.base} path={`${sample.base}/*`} element={<sample.Page />} />
              ))}
            </Routes>
          ) : (
            <>
              <main id="main" tabIndex={-1} className="pt-[72px]">
                <Routes location={location}>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/opportunities" element={<Opportunities />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/team" element={<Team />} />
                </Routes>
              </main>
              <Footer />
            </>
          ))}
        </PageTransition>
      </div>
      <Analytics />
    </Router>
  );
}

export default App;
