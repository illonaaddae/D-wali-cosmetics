import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const Story = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="story" id="story" ref={ref}>
      <div className="container">
        <div className="story-content">
          <motion.div
            className="story-text"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="section-subtitle">Our Story</span>
            <h2 className="section-title">Meet the Visionary</h2>
            <p className="story-quote">
              Meet Mr. Dickson Wali, the CEO of D-Wali Cosmetics Worldwide. He
              is a highly skilled, service-oriented person who provides
              well-rounded cosmetic services to enhance customers' appearance
              and boost their confidence.
            </p>
            <div className="ceo-info">
              <h4>Dickson Wali</h4>
              <span>Founder & CEO, D-Wali Cosmetics Worldwide</span>
            </div>
            <p>
              He is very passionate about what he does, and with over a decade
              of experience in the beauty industry, he has established D-Wali
              Cosmetics as a trusted name in premium skincare solutions. His
              expertise and dedication have helped countless businesses
              worldwide provide exceptional products to their customers.
            </p>
            <p>
              He is also passionate about life and likes to inspire the
              uninspired, motivate the unmotivated to strike gold. Through
              D-Wali Cosmetics, he doesn't just create products – he creates
              confidence, beauty, and opportunities for people around the world.
            </p>
            <div className="story-stats">
              <StatCounter
                target={500}
                label="Business Partners"
                inView={inView}
              />
              <StatCounter target={10} label="Countries" inView={inView} />
              <StatCounter
                target={1000000}
                label="Happy Customers"
                suffix="M"
                inView={inView}
              />
            </div>
          </motion.div>

          <motion.div
            className="story-images"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="ceo-image-wrapper">
              <img
                src="/asserts/images/Dickson-Wali-CEO -img.JPG"
                alt="Dickson Wali - CEO"
                className="ceo-main-img"
              />
              <div className="ceo-image-frame"></div>
              <div className="ceo-inset-img">
                <img src="/asserts/images/CEO-image-2.JPG" alt="Dickson Wali" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const StatCounter = ({ target, label, suffix = "", inView }) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (inView && !hasAnimated.current) {
      hasAnimated.current = true;
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [inView, target]);

  const formatNumber = (num) => {
    if (suffix === "M") {
      return (num / 1000000).toFixed(num >= 1000000 ? 0 : 1);
    }
    return num.toLocaleString();
  };

  return (
    <div className="stat-item">
      <span className="stat-number">{formatNumber(count)}</span>
      <span className="stat-plus">{suffix || "+"}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
};

export default Story;
