import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import usePageMotion from '../../hooks/usePageMotion';
import Footer from './components/Footer';
import Header from './components/Header';
import Panels from './components/Panels';
import { findProduct } from './data';
import Collection from './pages/Collection';
import Home from './pages/Home';
import Product from './pages/Product';

/** Karafuu Parfums: a demonstration perfume shop inside the portfolio. */
const KarafuuSite = () => {
  const { pathname } = useLocation();
  const [panel, setPanel] = useState(null);
  const motion = usePageMotion();
  const product = findProduct(pathname.split('/products/')[1]);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${product ? `${product.name} · ` : ''}Karafuu Parfums — sample shop by FutureTech Africa`;
    return () => {
      document.title = previousTitle;
    };
  }, [product]);

  return (
    <div ref={motion} className="karafuu bg-white font-parfum text-k-night">
      <Header onPanel={setPanel} />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="collection" element={<Collection />} />
          <Route path="products/:id" element={<Product />} />
          <Route path="*" element={<Collection />} />
        </Routes>
      </main>
      <Footer />
      <Panels panel={panel} onClose={() => setPanel(null)} />
    </div>
  );
};

export default KarafuuSite;
