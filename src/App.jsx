import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Preloader from "./components/Preloader";
import { PRELOADER_DURATION_MS } from "./constants";

// Lazy-load pages for code splitting
const HomePage = lazy(() => import("./pages/HomePage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));

const PageLoader = () => (
  <div className="section-loader" style={{ minHeight: "100vh" }}>
    <div className="spinner"></div>
  </div>
);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, PRELOADER_DURATION_MS);

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      {loading && <Preloader />}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:slug" element={<ProductPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
