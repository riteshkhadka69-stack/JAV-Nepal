import { BrowserRouter, Route, Routes } from "react-router-dom";
import SiteLayout from "./components/layout/SiteLayout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

/**
 * Route table for the JAV Nepal showcase site.
 *
 * Every route renders inside SiteLayout, which supplies the header, footer,
 * skip link and per-navigation scroll/focus handling.
 *
 * NOTE ON DEPLOYMENT: BrowserRouter uses real paths, so the host must serve
 * index.html for unknown paths (SPA fallback). Otherwise a hard refresh on
 * /products/interactive-flat-panel-65 returns a server 404.
 *   - Netlify:  a `_redirects` file containing  /* /index.html 200
 *   - Vercel:   a rewrite of /(.*) to /index.html
 *   - Apache:   FallbackResource /index.html
 *   - Nginx:    try_files $uri $uri/ /index.html;
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
