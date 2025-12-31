import { useRef, useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const Products = ({ setCursorVariant }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const productRef = useRef(null);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (autoRotate && !isDragging) {
      const interval = setInterval(() => {
        setRotation((prev) => ({ ...prev, y: prev.y + 0.5 }));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [autoRotate, isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setAutoRotate(false);
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastPos.current.x;
    const deltaY = e.clientY - lastPos.current.y;

    setRotation((prev) => ({
      x: prev.x + deltaY * 0.5,
      y: prev.y + deltaX * 0.5,
    }));

    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Resume auto-rotate after 3 seconds of inactivity
    setTimeout(() => setAutoRotate(true), 3000);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setAutoRotate(false);
    const touch = e.touches[0];
    lastPos.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - lastPos.current.x;
    const deltaY = touch.clientY - lastPos.current.y;

    setRotation((prev) => ({
      x: prev.x + deltaY * 0.5,
      y: prev.y + deltaX * 0.5,
    }));

    lastPos.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTimeout(() => setAutoRotate(true), 3000);
  };

  return (
    <section className="products" id="products" ref={ref}>
      <div className="products-bg"></div>
      <div className="container">
        <motion.div
          className="section-header light"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-subtitle">Our Collection</span>
          <h2 className="section-title">Premium Products</h2>
          <p className="section-description">
            Discover our signature collection of anti-aging skincare products
          </p>
        </motion.div>

        {/* 3D Product Viewer */}
        <motion.div
          className="product-showcase"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="product-3d-container">
            <div
              className="product-3d-viewer"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ cursor: isDragging ? "grabbing" : "grab" }}
            >
              <div className="product-rotation-hint">
                <i className="fas fa-hand-pointer"></i>
                <span>Drag to rotate</span>
              </div>
              <div
                className="product-3d-wrapper"
                ref={productRef}
                style={{
                  transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                }}
              >
                <div className="product-3d-face front">
                  <img
                    src="/asserts/images/D-wali-anti-aging-hand-cream.webp"
                    alt="Product Front"
                    loading="lazy"
                  />
                </div>
                <div className="product-3d-face back">
                  <img
                    src="/asserts/images/D-wali-anti-aging-hand-cream.webp"
                    alt="Product Back"
                    loading="lazy"
                  />
                </div>
                <div className="product-3d-face left">
                  <img
                    src="/asserts/images/All-products-together.webp"
                    alt="Product Left"
                    loading="lazy"
                  />
                </div>
                <div className="product-3d-face right">
                  <img
                    src="/asserts/images/All-products.webp"
                    alt="Product Right"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
            <div className="product-spotlight"></div>
          </div>

          <div className="product-info">
            <motion.span
              className="product-tag"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              Bestseller
            </motion.span>
            <motion.h3
              className="product-name"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              D-Wali Anti-Aging Hand & Body Cream
            </motion.h3>
            <motion.p
              className="product-description"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              Our signature formula combines powerful antioxidants with deep
              moisturizing agents to combat signs of aging while providing
              all-day hydration and protection.
            </motion.p>
            <motion.ul
              className="product-highlights"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              <li>
                <i className="fas fa-check"></i> Intensive Moisturizing
              </li>
              <li>
                <i className="fas fa-check"></i> Anti-Aging Formula
              </li>
              <li>
                <i className="fas fa-check"></i> Winter Protection
              </li>
              <li>
                <i className="fas fa-check"></i> Rich in Antioxidants
              </li>
            </motion.ul>
            <motion.a
              href="#contact"
              className="btn btn-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
            >
              <span>Inquire for Bulk Orders</span>
              <i className="fas fa-arrow-right"></i>
            </motion.a>
          </div>
        </motion.div>

        {/* Product Gallery */}
        <motion.div
          className="product-gallery"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="gallery-title">Complete Collection</h3>
          <div className="gallery-grid">
            <GalleryItem
              src="/asserts/images/All-products-together.webp"
              alt="All D-Wali Products"
              label="Full Collection"
            />
            <GalleryItem
              src="/asserts/images/All-products.webp"
              alt="Product Range"
              label="Product Range"
            />
            <GalleryItem
              src="/asserts/images/D-wali-anti-aging-hand-cream.webp"
              alt="Anti-Aging Cream"
              label="Anti-Aging Cream"
            />
            <GalleryItem
              src="/asserts/images/D-wali-body-lotion.webp"
              alt="D-Wali Body Lotion"
              label="Body Lotion"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const GalleryItem = ({ src, alt, label }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * 10, y: -x * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      className="gallery-item"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
    >
      <img src={src} alt={alt} loading="lazy" decoding="async" />
      <div className="gallery-overlay">
        <span>{label}</span>
      </div>
    </div>
  );
};

export default Products;
