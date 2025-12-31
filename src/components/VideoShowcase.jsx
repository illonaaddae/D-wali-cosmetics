import { useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const VideoShowcase = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
      setShowControls(true);
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
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="video-container">
            <video
              ref={videoRef}
              controls={showControls}
              controlsList="nodownload"
              playsInline
              poster="/asserts/images/All-products-together.webp"
              onPlay={() => {
                setIsPlaying(true);
                setShowControls(true);
              }}
              onPause={() => setIsPlaying(false)}
            >
              <source
                src="/asserts/Videos/video-1-of-someone-using-the-product.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            {!showControls && (
              <div className="video-overlay" onClick={handlePlayClick}>
                <button className="play-btn" aria-label="Play video">
                  <i className="fas fa-play"></i>
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoShowcase;
