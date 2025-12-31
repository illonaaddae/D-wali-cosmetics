import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ["hero", "about", "products", "benefits", "story", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className={`nav-overlay ${menuOpen ? "active" : ""}`} onClick={closeMenu}></div>
      
      <div className="nav-container">
        <a href="#hero" className="nav-logo" onClick={(e) => handleNavClick(e, "hero")}>
          <img src="/asserts/images/D-wali-logo-removebg-preview.svg" alt="D-Wali Logo" />
        </a>
        
        <div className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <a href="#hero" className={`nav-link ${activeSection === "hero" ? "active" : ""}`} onClick={(e) => handleNavClick(e, "hero")}>Home</a>
          <a href="#about" className={`nav-link ${activeSection === "about" ? "active" : ""}`} onClick={(e) => handleNavClick(e, "about")}>About</a>
          <a href="#products" className={`nav-link ${activeSection === "products" ? "active" : ""}`} onClick={(e) => handleNavClick(e, "products")}>Products</a>
          <a href="#benefits" className={`nav-link ${activeSection === "benefits" ? "active" : ""}`} onClick={(e) => handleNavClick(e, "benefits")}>Benefits</a>
          <a href="#story" className={`nav-link ${activeSection === "story" ? "active" : ""}`} onClick={(e) => handleNavClick(e, "story")}>Our Story</a>
          <a href="#contact" className={`nav-link ${activeSection === "contact" ? "active" : ""}`} onClick={(e) => handleNavClick(e, "contact")}>Contact</a>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            <i className={`fas ${isDark ? "fa-sun" : "fa-moon"}`}></i>
          </button>
        </div>
        
        <button className={`nav-toggle ${menuOpen ? "active" : ""}`} onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={menuOpen}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
