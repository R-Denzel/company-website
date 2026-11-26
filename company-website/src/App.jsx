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
import { loadTechShop } from './shop/load';
import TechShopRoute from './shop/TechShopRoute';

// Sample websites bring their own header and footer.
const isSample = (location) => location.pathname.startsWith('/work/');

const preloadPage = (location) => (isSample(location) ? loadTechShop() : undefined);

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
        <PageTransition header={(location) => !isSample(location) && <Header />} preload={preloadPage}>
          {(location) => (isSample(location) ? (
            <Routes location={location}>
              <Route path="/work/tech-shop" element={<TechShopRoute />} />
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
