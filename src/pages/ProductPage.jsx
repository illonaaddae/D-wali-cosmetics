import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CustomCursor from "../components/CustomCursor";
import Navbar from "../components/Navbar";
import ErrorBoundary from "../components/ErrorBoundary";
import { getProductBySlug, PRODUCTS } from "../constants/products";

const ProductPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = useMemo(() => getProductBySlug(slug), [slug]);
  const [activeImage, setActiveImage] = useState(0);
  const [cursorVariant, setCursorVariant] = useState("default");

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  const handleThumbnailClick = useCallback((index) => {
    setActiveImage(index);
  }, []);

  const handleNextImage = useCallback(() => {
    if (!product) return;
    setActiveImage((prev) => (prev + 1) % product.gallery.length);
  }, [product]);

  const handlePrevImage = useCallback(() => {
    if (!product) return;
    setActiveImage(
      (prev) => (prev - 1 + product.gallery.length) % product.gallery.length
    );
  }, [product]);

  // Get other individual products for the "More Products" section (exclude collections)
  const otherProducts = useMemo(
    () => PRODUCTS.filter((p) => p.slug !== slug && !p.isCollection),
    [slug]
  );

  if (!product) {
    return (
      <>
        <CustomCursor variant={cursorVariant} />
        <Navbar />
        <div className="product-not-found">
          <div className="container">
            <i className="fas fa-search"></i>
            <h2>Product Not Found</h2>
            <p>The product you're looking for doesn't exist.</p>
            <Link to="/" className="btn btn-primary">
              <span>Back to Home</span>
              <i className="fas fa-arrow-left"></i>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <CustomCursor variant={cursorVariant} />
      <Navbar />
      <ErrorBoundary>
        <main className="product-page">
          {/* Breadcrumb */}
          <section className="product-breadcrumb">
            <div className="container">
              <Link to="/" className="breadcrumb-link">
                <i className="fas fa-home"></i> Home
              </Link>
              <i className="fas fa-chevron-right breadcrumb-separator"></i>
              <Link
                to="/"
                className="breadcrumb-link"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/");
                  setTimeout(() => {
                    document
                      .getElementById("products")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }, 300);
                }}
              >
                Products
              </Link>
              <i className="fas fa-chevron-right breadcrumb-separator"></i>
              <span className="breadcrumb-current">{product.name}</span>
            </div>
          </section>

          {/* Product Hero */}
          <section className="product-detail-hero">
            <div className="product-detail-hero-bg"></div>
            <div className="container">
              <div className="product-detail-layout">
                {/* Product Gallery */}
                <motion.div
                  className="product-detail-gallery"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="product-main-image">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={activeImage}
                        src={product.gallery[activeImage]}
                        alt={product.name}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                      />
                    </AnimatePresence>
                    <button
                      className="gallery-nav gallery-nav-prev"
                      onClick={handlePrevImage}
                      aria-label="Previous image"
                    >
                      <i className="fas fa-chevron-left"></i>
                    </button>
                    <button
                      className="gallery-nav gallery-nav-next"
                      onClick={handleNextImage}
                      aria-label="Next image"
                    >
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </div>
                  <div className="product-thumbnails">
                    {product.gallery.map((img, index) => (
                      <button
                        key={index}
                        className={`product-thumb ${
                          index === activeImage ? "active" : ""
                        }`}
                        onClick={() => handleThumbnailClick(index)}
                      >
                        <img
                          src={img}
                          alt={`${product.name} view ${index + 1}`}
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* Product Info */}
                <motion.div
                  className="product-detail-info"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <span className="product-detail-badge">D-Wali Premium</span>
                  <h1 className="product-detail-name">{product.name}</h1>
                  <p className="product-detail-tagline">{product.tagline}</p>
                  <p className="product-detail-description">
                    {product.fullDescription}
                  </p>

                  <div className="product-detail-cta">
                    <a href="/#contact" className="btn btn-primary">
                      <span>Inquire Now</span>
                      <i className="fas fa-arrow-right"></i>
                    </a>
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        navigate("/");
                        setTimeout(() => {
                          document
                            .getElementById("products")
                            ?.scrollIntoView({ behavior: "smooth" });
                        }, 300);
                      }}
                    >
                      <span>All Products</span>
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Ingredients Section */}
          <section className="product-ingredients">
            <div className="container">
              <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="section-subtitle">What's Inside</span>
                <h2 className="section-title">Ingredients</h2>
              </motion.div>

              <motion.div
                className="ingredients-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="ingredients-icon">
                  <i className="fas fa-flask"></i>
                </div>
                <p className="ingredients-text">{product.ingredients}</p>
              </motion.div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="product-benefits-detail">
            <div className="container">
              <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="section-subtitle">Why You'll Love It</span>
                <h2 className="section-title">Key Benefits</h2>
              </motion.div>

              <div className="product-benefits-grid">
                {product.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="product-benefit-card"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div
                      className="product-benefit-icon"
                      style={{ color: product.color }}
                    >
                      <i className={`fas ${benefit.icon}`}></i>
                    </div>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* More Products */}
          <section className="more-products">
            <div className="container">
              <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="section-subtitle">Explore More</span>
                <h2 className="section-title">Other Products</h2>
              </motion.div>

              <div className="more-products-grid">
                {otherProducts.map((p, index) => (
                  <motion.div
                    key={p.id}
                    className="more-product-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    whileHover={{ y: -8 }}
                  >
                    <div className="more-product-image">
                      <img src={p.heroImage} alt={p.name} loading="lazy" />
                    </div>
                    <div className="more-product-info">
                      <h3>{p.name}</h3>
                      <p>{p.shortDescription}</p>
                      <Link
                        to={`/products/${p.slug}`}
                        className="btn btn-primary"
                      >
                        <span>View Details</span>
                        <i className="fas fa-arrow-right"></i>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="product-cta-section">
            <div className="container">
              <motion.div
                className="product-cta-card"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2>Ready to Partner With Us?</h2>
                <p>
                  We offer competitive bulk pricing for businesses worldwide.
                  Let's discuss how D-Wali can enhance your product line.
                </p>
                <a href="/#contact" className="btn btn-primary">
                  <span>Get in Touch</span>
                  <i className="fas fa-arrow-right"></i>
                </a>
              </motion.div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-wave">
            <svg
              viewBox="0 0 1440 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V120Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className="container">
            <div className="footer-bottom">
              <p>&copy; 2025 D-Wali Cosmetics. All Rights Reserved.</p>
              <p>
                Designed with <i className="fas fa-heart"></i> for Beautiful Skin
              </p>
            </div>
          </div>
        </footer>
      </ErrorBoundary>
    </>
  );
};

export default ProductPage;
