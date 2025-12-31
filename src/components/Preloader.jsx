import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    document.body.classList.add("loading");

    // Staged reveal - show logo first
    const logoTimer = setTimeout(() => setShowLogo(true), 300);

    // Realistic loading simulation with variable speed
    const startTime = Date.now();
    const duration = 2800; // Total loading time

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);

      // Easing function for more natural feel
      const easeProgress =
        rawProgress < 0.5
          ? 4 * rawProgress * rawProgress * rawProgress
          : 1 - Math.pow(-2 * rawProgress + 2, 3) / 2;

      setProgress(Math.round(easeProgress * 100));

      if (rawProgress < 1) {
        requestAnimationFrame(updateProgress);
      } else {
        setIsComplete(true);
      }
    };

    requestAnimationFrame(updateProgress);

    return () => {
      document.body.classList.remove("loading");
      clearTimeout(logoTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          {/* Ambient background gradient */}
          <div className="preloader-ambient">
            <div className="ambient-orb ambient-orb-1"></div>
            <div className="ambient-orb ambient-orb-2"></div>
          </div>

          {/* Main content container */}
          <div className="preloader-content">
            {/* Logo reveal */}
            <motion.div
              className="preloader-logo-container"
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: showLogo ? 1 : 0,
                y: showLogo ? 0 : 30,
              }}
              transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
            >
              <img
                src="/asserts/images/D-wali-logo-removebg-preview.svg"
                alt="D-Wali"
                className="preloader-logo"
              />
            </motion.div>

            {/* Minimal progress indicator */}
            <motion.div
              className="preloader-progress"
              initial={{ opacity: 0 }}
              animate={{ opacity: showLogo ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="progress-track">
                <motion.div
                  className="progress-fill"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: progress / 100 }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>

              <div className="progress-info">
                <span className="progress-label">Loading Experience</span>
                <span className="progress-value">{progress}%</span>
              </div>
            </motion.div>

            {/* Brand tagline */}
            <motion.p
              className="preloader-tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: showLogo ? 0.6 : 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Timeless Beauty, Redefined
            </motion.p>
          </div>

          {/* Corner accents */}
          <div className="preloader-corners">
            <span className="corner corner-tl"></span>
            <span className="corner corner-tr"></span>
            <span className="corner corner-bl"></span>
            <span className="corner corner-br"></span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
