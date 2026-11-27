import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Header from './components/Header';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Market from './pages/Market';
import Opportunities from './pages/Opportunities';
import Pricing from './pages/Pricing';
import Product from './pages/Product';
import Products from './pages/Products';
import Solution from './pages/Solution';
import Solutions from './pages/Solutions';
import Team from './pages/Team';
import Work from './pages/Work';
import { sampleFor, samples } from './samples/registry';

const pageNames = {
  '': 'Home',
  about: 'About',
  contact: 'Contact',
  kenya: 'Kenya',
  opportunities: 'Opportunities',
  portfolio: 'Work',
  pricing: 'Pricing',
  products: 'Products',
  projects: 'Solutions',
  solutions: 'Solutions',
  team: 'Team',
  uganda: 'Uganda',
  work: 'Work',
};

/** What the transition curtain shows on the way to `to`. */
const curtainFor = (to, from) => {
  const sample = sampleFor(to.pathname);
  if (!sample) {
    return { mark: '/favicon.svg', label: pageNames[to.pathname.split('/')[1]] || '', className: 'bg-ink text-paper' };
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
                  <Route path="/solutions" element={<Solutions />} />
                  <Route path="/solutions/:id" element={<Solution />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<Product />} />
                  <Route path="/work" element={<Work />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/uganda" element={<Market key="ug" code="ug" />} />
                  <Route path="/kenya" element={<Market key="ke" code="ke" />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/opportunities" element={<Opportunities />} />
                  <Route path="/contact" element={<Contact />} />
                  {/* Earlier addresses keep working. */}
                  <Route path="/projects" element={<Solutions />} />
                  <Route path="/portfolio" element={<Work />} />
                  <Route path="*" element={<Home />} />
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
