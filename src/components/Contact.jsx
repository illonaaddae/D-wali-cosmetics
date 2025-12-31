import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    quantity: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(false);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "YOUR_ACCESS_KEY_HERE", // Replace with your Web3Forms access key
          subject: `New D-Wali Order Inquiry from ${formData.name}`,
          from_name: "D-Wali Website",
          ...formData,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          company: "",
          quantity: "",
          message: "",
        });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(true);
        setTimeout(() => setError(false), 5000);
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setError(true);
      setTimeout(() => setError(false), 5000);
    }

    setIsSubmitting(false);
  };

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="contact-bg"></div>
      <div className="container">
        <motion.div
          className="section-header light"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-subtitle">Get In Touch</span>
          <h2 className="section-title">Start Your Partnership</h2>
          <p className="section-description">
            Ready to bring D-Wali products to your customers? Let's discuss how
            we can work together.
          </p>
        </motion.div>

        <div className="contact-content">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="contact-text">
                <h4>Email Us</h4>
                <p>info@dwalicosmetics.com</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-phone"></i>
              </div>
              <div className="contact-text">
                <h4>Call Us</h4>
                <p>+1 (234) 567-8900</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="contact-text">
                <h4>Visit Us</h4>
                <p>123 Beauty Lane, Cosmetic City</p>
              </div>
            </div>
            <div className="social-links">
              <a href="#" className="social-link">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </motion.div>

          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {submitted && (
              <motion.div
                className="form-message success"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <i className="fas fa-check-circle"></i>
                <p>Thank you! Your message has been sent successfully.</p>
              </motion.div>
            )}

            {error && (
              <motion.div
                className="form-message error"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <i className="fas fa-exclamation-circle"></i>
                <p>Oops! Something went wrong. Please try again.</p>
              </motion.div>
            )}

            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <span className="form-highlight"></span>
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <span className="form-highlight"></span>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="company"
                placeholder="Company Name"
                value={formData.company}
                onChange={handleChange}
              />
              <span className="form-highlight"></span>
            </div>
            <div className="form-group">
              <select
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Order Quantity
                </option>
                <option value="100-500">100 - 500 units</option>
                <option value="500-1000">500 - 1,000 units</option>
                <option value="1000-5000">1,000 - 5,000 units</option>
                <option value="5000+">5,000+ units</option>
              </select>
              <span className="form-highlight"></span>
            </div>
            <div className="form-group full-width">
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <span className="form-highlight"></span>
            </div>
            <motion.button
              type="submit"
              className="btn btn-primary btn-submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <span>Sending...</span>
                  <i className="fas fa-spinner fa-spin"></i>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <i className="fas fa-paper-plane"></i>
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
