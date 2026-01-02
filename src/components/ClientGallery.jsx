import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";

// Client gallery images
const galleryImages = [
  "/asserts/images/Clint-with-product-1.webp",
  "/asserts/images/Clint-with-product-2.webp",
  "/asserts/images/Clint-with-product-3.webp",
  "/asserts/images/Clint-with-product-4.webp",
  "/asserts/images/Clint-with-product-5.webp",
  "/asserts/images/Clint-with-product-6.webp",
  "/asserts/images/Clint-with-product-7.webp",
  "/asserts/images/Clint-with-product-8.webp",
];

const ClientGallery = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance carousel
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  return (
    <section className="client-gallery" id="gallery" ref={ref}>
      <div className="client-gallery-bg"></div>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-subtitle">Client Love</span>
          <h2 className="section-title">Happy Customers</h2>
          <p className="section-description">
            Real people sharing their D-Wali moments. Join our community of
            glowing skin enthusiasts.
          </p>
        </motion.div>

        <motion.div
          className="gallery-showcase"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main Image Display */}
          <div className="gallery-main">
            <button
              className="gallery-nav gallery-nav-prev"
              onClick={prevSlide}
              aria-label="Previous"
            >
              <i className="fas fa-chevron-left"></i>
            </button>

            <div className="gallery-image-container">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={galleryImages[currentIndex]}
                  alt={`Happy customer ${currentIndex + 1} with D-Wali product`}
                  className="gallery-main-image"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>

              {/* Decorative frame */}
              <div className="gallery-frame"></div>

              {/* Counter badge */}
              <div className="gallery-counter">
                <span>{currentIndex + 1}</span>
                <span>/</span>
                <span>{galleryImages.length}</span>
              </div>
            </div>

            <button
              className="gallery-nav gallery-nav-next"
              onClick={nextSlide}
              aria-label="Next"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>

          {/* Thumbnail Strip */}
          <div className="gallery-thumbnails">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                className={`gallery-thumb ${
                  index === currentIndex ? "active" : ""
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`View image ${index + 1}`}
              >
                <img src={image} alt={`Thumbnail ${index + 1}`} />
              </button>
            ))}
          </div>

          {/* Progress dots for mobile */}
          <div className="gallery-dots">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                className={`gallery-dot ${
                  index === currentIndex ? "active" : ""
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientGallery;
