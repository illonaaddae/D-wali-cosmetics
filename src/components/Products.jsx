import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import GalleryItem from "./GalleryItem";
import { PRODUCTS } from "../constants/products";

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

  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    setAutoRotate(false);
    lastPos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!lastPos.current) return;
    setIsDragging((dragging) => {
      if (!dragging) return false;
      const deltaX = e.clientX - lastPos.current.x;
      const deltaY = e.clientY - lastPos.current.y;

      setRotation((prev) => ({
        x: prev.x + deltaY * 0.5,
        y: prev.y + deltaX * 0.5,
      }));

      lastPos.current = { x: e.clientX, y: e.clientY };
      return true;
    });
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    // Resume auto-rotate after 3 seconds of inactivity
    setTimeout(() => setAutoRotate(true), 3000);
  }, []);

  const handleTouchStart = useCallback((e) => {
    setIsDragging(true);
    setAutoRotate(false);
    const touch = e.touches[0];
    lastPos.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!lastPos.current) return;
    setIsDragging((dragging) => {
      if (!dragging) return false;
      const touch = e.touches[0];
      const deltaX = touch.clientX - lastPos.current.x;
      const deltaY = touch.clientY - lastPos.current.y;

      setRotation((prev) => ({
        x: prev.x + deltaY * 0.5,
        y: prev.y + deltaX * 0.5,
      }));

      lastPos.current = { x: touch.clientX, y: touch.clientY };
      return true;
    });
  }, []);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    setTimeout(() => setAutoRotate(true), 3000);
  }, []);

  const rotationStyle = useMemo(
    () => ({
      transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
    }),
    [rotation.x, rotation.y]
  );

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
                style={rotationStyle}
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

        {/* Product Collection */}
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
              link="/products/full-collection"
            />
            <GalleryItem
              src="/asserts/images/All-products.webp"
              alt="Product Range"
              label="Product Range"
              link="/products/full-collection"
            />
            <GalleryItem
              src="/asserts/images/D-wali-anti-aging-hand-cream.webp"
              alt="Anti-Aging Hand & Body Cream"
              label="Anti-Aging Cream"
              link="/products/anti-aging-hand-body-cream"
            />
            <GalleryItem
              src="/asserts/images/D-wali-body-lotion.webp"
              alt="D-Wali Body Lotion"
              label="Body Lotion"
              link="/products/anti-aging-hand-body-cream"
            />
            <GalleryItem
              src="/asserts/images/dwali-oil.webp"
              alt="Anti-Fungal Cuticle & Body Oil"
              label="Cuticle & Body Oil"
              link="/products/anti-fungal-cuticle-body-oil"
            />
            <GalleryItem
              src="/asserts/images/dwali-shower-gel.webp"
              alt="Liquid Gold Shower Gel"
              label="Shower Gel"
              link="/products/liquid-gold-shower-gel"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Products;
