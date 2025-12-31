import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="about" id="about" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-subtitle">Who We Are</span>
          <h2 className="section-title">The D-Wali Promise</h2>
        </motion.div>

        <div className="about-content">
          <motion.div
            className="about-image"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="image-wrapper">
              <img
                src="/asserts/images/picture-of-a-model-posing-with-the-dwali-body-cream.JPG"
                alt="Model with D-Wali Product"
              />
              <div className="image-frame"></div>
            </div>
            <div className="floating-badge">
              <span className="badge-number">100%</span>
              <span className="badge-text">Premium Quality</span>
            </div>
          </motion.div>

          <motion.div
            className="about-text"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.h3 variants={itemVariants}>
              Crafted for Excellence
            </motion.h3>
            <motion.p variants={itemVariants}>
              D-Wali Cosmetics represents the pinnacle of skincare innovation.
              Our Anti-Aging Hand & Body Cream is meticulously formulated with
              powerful antioxidants and nourishing ingredients that heal,
              moisturize, and protect your skin.
            </motion.p>
            <motion.p variants={itemVariants}>
              Perfect for winter protection or as a water-based daily
              moisturizer, our products deliver visible results that speak for
              themselves. We partner with businesses worldwide to bring premium
              skincare to discerning customers.
            </motion.p>

            <motion.div className="about-features" variants={itemVariants}>
              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fas fa-leaf"></i>
                </div>
                <div className="feature-text">
                  <h4>Natural Ingredients</h4>
                  <p>Carefully selected botanicals</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <div className="feature-text">
                  <h4>Dermatologist Tested</h4>
                  <p>Safe for all skin types</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fas fa-hand-holding-heart"></i>
                </div>
                <div className="feature-text">
                  <h4>Cruelty Free</h4>
                  <p>Never tested on animals</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
