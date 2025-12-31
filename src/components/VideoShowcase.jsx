import { useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const VideoShowcase = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        videoRef.current.muted = true;
      } else {
        videoRef.current.muted = false;
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="video-showcase" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-subtitle">Experience</span>
          <h2 className="section-title">See the Magic in Action</h2>
          <p className="section-description">
            Watch how D-Wali transforms your skincare routine
          </p>
        </motion.div>

        <motion.div
          className="video-frame"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="video-container">
            <video ref={videoRef} muted loop playsInline>
              <source
                src="/asserts/Videos/video-1-of-someone-using-the-product.mp4"
                type="video/mp4"
              />
            </video>
            <div className={`video-overlay ${isPlaying ? "playing" : ""}`}>
              <motion.button
                className="play-btn"
                onClick={handlePlayClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className={`fas ${isPlaying ? "fa-pause" : "fa-play"}`}></i>
              </motion.button>
            </div>
          </div>
          <div className="video-frame-border"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoShowcase;
