import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const Benefits = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const benefits = [
    {
      icon: "fa-magic",
      title: "Anti-Aging Properties",
      description:
        "Advanced formula that reduces fine lines and wrinkles, revealing youthful, radiant skin.",
    },
    {
      icon: "fa-tint",
      title: "Deep Moisturizing",
      description:
        "Intensive hydration that penetrates deep into the skin layers for lasting softness.",
    },
    {
      icon: "fa-snowflake",
      title: "Winter Protection",
      description:
        "Creates a protective barrier against harsh weather conditions and environmental damage.",
    },
    {
      icon: "fa-heart",
      title: "Healing Formula",
      description:
        "Soothes and repairs damaged skin, promoting natural healing and regeneration.",
    },
    {
      icon: "fa-shield-virus",
      title: "Antioxidant Rich",
      description:
        "Packed with powerful antioxidants that fight free radicals and prevent skin damage.",
    },
    {
      icon: "fa-water",
      title: "Water-Based Formula",
      description:
        "Light, non-greasy texture that absorbs quickly without clogging pores.",
    },
  ];

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
          {benefits.map((benefit, index) => (
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
};

export default Benefits;
