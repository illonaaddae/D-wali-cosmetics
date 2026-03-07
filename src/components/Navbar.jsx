import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import useScrollPosition from "../hooks/useScrollPosition";
import { NAV_SECTIONS } from "../constants";

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { scrolled, activeSection } = useScrollPosition(NAV_SECTIONS);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  const handleNavClick = useCallback(
    (e, sectionId) => {
      e.preventDefault();

      // Close menu first
      setMenuOpen(false);
      document.body.classList.remove("menu-open");

      // If on home page, scroll directly
      if (location.pathname === "/") {
        setTimeout(() => scrollToSection(sectionId), 100);
      } else {
        // Navigate to home first, then scroll to section
        navigate("/");
        setTimeout(() => scrollToSection(sectionId), 400);
      }
    },
    [location.pathname, navigate, scrollToSection]
  );

  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div
        className={`nav-overlay ${menuOpen ? "active" : ""}`}
        onClick={closeMenu}
      ></div>

      <div className="nav-container">
        <a
          href="#hero"
          className="nav-logo"
          onClick={(e) => handleNavClick(e, "hero")}
        >
          <img
            src="/asserts/images/D-wali-logo-removebg-preview.svg"
            alt="D-Wali Logo"
          />
        </a>

        <div className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <a
            href="#hero"
            className={`nav-link ${activeSection === "hero" ? "active" : ""}`}
            onClick={(e) => handleNavClick(e, "hero")}
          >
            Home
          </a>
          <a
            href="#about"
            className={`nav-link ${activeSection === "about" ? "active" : ""}`}
            onClick={(e) => handleNavClick(e, "about")}
          >
            About
          </a>
          <a
            href="#products"
            className={`nav-link ${
              activeSection === "products" ? "active" : ""
            }`}
            onClick={(e) => handleNavClick(e, "products")}
          >
            Products
          </a>
          <a
            href="#benefits"
            className={`nav-link ${
              activeSection === "benefits" ? "active" : ""
            }`}
            onClick={(e) => handleNavClick(e, "benefits")}
          >
            Benefits
          </a>
          <a
            href="#story"
            className={`nav-link ${activeSection === "story" ? "active" : ""}`}
            onClick={(e) => handleNavClick(e, "story")}
          >
            Our Story
          </a>
          <a
            href="#contact"
            className={`nav-link ${
              activeSection === "contact" ? "active" : ""
            }`}
            onClick={(e) => handleNavClick(e, "contact")}
          >
            Contact
          </a>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <i className={`fas ${isDark ? "fa-sun" : "fa-moon"}`}></i>
          </button>
        </div>

        <button
          className={`nav-toggle ${menuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
