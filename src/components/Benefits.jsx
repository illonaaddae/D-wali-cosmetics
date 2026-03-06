import { memo } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { BENEFITS } from "../constants";

const Benefits = memo(() => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="benefits" id="benefits" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-subtitle">Why Choose Us</span>
          <h2 className="section-title">The D-Wali Difference</h2>
        </motion.div>

        <div className="benefits-grid">
          {BENEFITS.map((benefit, index) => (
            <motion.div
              key={index}
              className="benefit-card"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="benefit-icon">
                <div className="icon-bg"></div>
                <i className={`fas ${benefit.icon}`}></i>
              </div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

Benefits.displayName = "Benefits";

export default Benefits;
