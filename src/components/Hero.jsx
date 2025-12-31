import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const Hero = ({ setCursorVariant }) => {
  const particlesRef = useRef(null);

  useEffect(() => {
    // Create floating particles
    const particlesContainer = particlesRef.current;
    if (particlesContainer) {
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 15}s`;
        particle.style.animationDuration = `${15 + Math.random() * 10}s`;
        particlesContainer.appendChild(particle);
      }
    }
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="hero-bg-video">
        <video autoPlay muted loop playsInline>
          <source src="/asserts/Videos/video-2.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
      </div>
      <div className="hero-particles" ref={particlesRef}></div>

      <div className="hero-content">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.span
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Premium Skincare Collection
          </motion.span>
          <h1 className="hero-title">
            <motion.span
              className="title-line"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              Timeless
            </motion.span>
            <motion.span
              className="title-line highlight"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              Beauty
            </motion.span>
            <motion.span
              className="title-line"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
            >
              Redefined
            </motion.span>
          </h1>
          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            Experience the revolutionary D-Wali Anti-Aging Hand & Body Cream.
            Healing, moisturizing, and protective care for radiant skin all year
            round.
          </motion.p>
          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.7 }}
          >
            <a href="#products" className="btn btn-primary">
              <span>Explore Products</span>
              <i className="fas fa-arrow-right"></i>
            </a>
            <a href="#story" className="btn btn-secondary">
              <span>Our Story</span>
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-product"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="floating-product">
            <img
              src="/asserts/images/D-wali-anti-aging-hand-cream.webp"
              alt="D-Wali Anti-Aging Cream"
              loading="eager"
            />
            <div className="product-glow"></div>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        onClick={(e) => {
          e.preventDefault();
          document
            .getElementById("about")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <div className="scroll-indicator-inner">
          <span className="scroll-label">Discover More</span>
          <div className="scroll-icon-wrapper">
            <svg className="scroll-chevrons" viewBox="0 0 24 24" fill="none">
              <path
                className="chevron chevron-1"
                d="M7 10L12 15L17 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                className="chevron chevron-2"
                d="M7 6L12 11L17 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </motion.a>
    </section>
  );
};

export default Hero;
