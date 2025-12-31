import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    setEmail("");
    alert("Thank you for subscribing!");
  };

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-wave">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V120Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <img
              src="/asserts/images/D-wali-logo-removebg-preview.svg"
              alt="D-Wali Logo"
              className="footer-logo"
            />
            <p>
              Premium skincare solutions for businesses worldwide. Partner with
              D-Wali for quality products that your customers will love.
            </p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <a href="#hero" onClick={(e) => handleNavClick(e, "hero")}>
              Home
            </a>
            <a href="#about" onClick={(e) => handleNavClick(e, "about")}>
              About Us
            </a>
            <a href="#products" onClick={(e) => handleNavClick(e, "products")}>
              Products
            </a>
            <a href="#contact" onClick={(e) => handleNavClick(e, "contact")}>
              Contact
            </a>
          </div>

          <div className="footer-links">
            <h4>Products</h4>
            <a href="#products" onClick={(e) => handleNavClick(e, "products")}>
              Anti-Aging Cream
            </a>
            <a href="#products" onClick={(e) => handleNavClick(e, "products")}>
              Body Lotion
            </a>
            <a href="#products" onClick={(e) => handleNavClick(e, "products")}>
              Hand Cream
            </a>
            <a href="#products" onClick={(e) => handleNavClick(e, "products")}>
              Full Collection
            </a>
          </div>

          <div className="footer-newsletter">
            <h4>Stay Updated</h4>
            <p>Subscribe for product updates and business opportunities.</p>
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">
                <i className="fas fa-arrow-right"></i>
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 D-Wali Cosmetics. All Rights Reserved.</p>
          <p>
            Designed with <i className="fas fa-heart"></i> for Beautiful Skin
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
