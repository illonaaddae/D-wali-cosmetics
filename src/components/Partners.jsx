import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const Partners = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const partnerBenefits = [
    {
      icon: "fa-boxes",
      title: "Bulk Orders",
      description: "Competitive pricing for wholesale quantities",
    },
    {
      icon: "fa-truck",
      title: "Global Shipping",
      description: "Reliable delivery to destinations worldwide",
    },
    {
      icon: "fa-handshake",
      title: "Business Support",
      description: "Dedicated account management and marketing materials",
    },
    {
      icon: "fa-certificate",
      title: "Quality Guaranteed",
      description: "Premium products backed by our satisfaction guarantee",
    },
  ];

  return (
    <section className="partners" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-subtitle">Wholesale & Distribution</span>
          <h2 className="section-title">Partner With Us</h2>
          <p className="section-description">
            We offer bulk purchasing options for businesses looking to provide
            premium skincare products to their customers.
          </p>
        </motion.div>

        <motion.div
          className="partner-benefits"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {partnerBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="partner-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -5, boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}
            >
              <div className="partner-icon">
                <i className={`fas ${benefit.icon}`}></i>
              </div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;
