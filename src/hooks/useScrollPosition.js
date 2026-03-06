import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook to track scroll position and active section.
 * @param {string[]} sectionIds - Array of section IDs to observe
 * @param {number} offset - Pixels from top to consider a section "active" (default: 100)
 * @returns {{ scrolled: boolean, activeSection: string }}
 */
const useScrollPosition = (sectionIds = [], offset = 100) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(sectionIds[0] || "");

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);

    for (const section of sectionIds) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= offset && rect.bottom >= offset) {
          setActiveSection(section);
          break;
        }
      }
    }
  }, [sectionIds, offset]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return { scrolled, activeSection };
};

export default useScrollPosition;
