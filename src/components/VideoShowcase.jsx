import { useRef, useState, useCallback, useMemo, memo } from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";

const VIDEOS = [
  {
    src: "/asserts/Videos/video-1-of-someone-using-the-product.mp4",
    title: "Product Application",
    poster: "/asserts/images/All-products-together.webp",
  },
  {
    src: "/asserts/Videos/Happy-Client-using-dwali-hand-cream.mp4",
    title: "Happy Client Experience",
    poster: "/asserts/images/dwaki-customer-showcase.webp",
  },
  {
    src: "/asserts/Videos/Dwali-body-lotion-video-display.mp4",
    title: "Body Lotion Showcase",
    poster: "/asserts/images/D-wali-body-lotion.webp",
  },
  {
    src: "/asserts/Videos/Happy-male-client-vedio.mp4",
    title: "Client Testimonial",
    poster: "/asserts/images/Dwali-hand-cream.webp",
  },
  {
    src: "/asserts/Videos/Multiple-Clients-display-vedio.mp4",
    title: "Client Showcase",
    poster: "/asserts/images/All-products.webp",
  },
  {
    src: "/asserts/Videos/dwali-vedio-display-2.mp4",
    title: "Product Display",
    poster: "/asserts/images/dwali-b&h-product-display.webp",
  },
  {
    src: "/asserts/Videos/video-2.mp4",
    title: "D-Wali in Action",
    poster: "/asserts/images/D-wali-anti-aging-hand-cream.webp",
  },
];

const VideoShowcase = memo(() => {
  const videoRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const activeVideo = useMemo(() => VIDEOS[activeIndex], [activeIndex]);

  const handlePlayClick = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
      setShowControls(true);
    }
  }, [isPlaying]);

  const handleVideoSelect = useCallback(
    (index) => {
      if (index === activeIndex) return;

      // Pause current video
      if (videoRef.current) {
        videoRef.current.pause();
      }

      setActiveIndex(index);
      setIsPlaying(false);
      setShowControls(false);
    },
    [activeIndex]
  );

  const handlePrev = useCallback(() => {
    handleVideoSelect(
      (activeIndex - 1 + VIDEOS.length) % VIDEOS.length
    );
  }, [activeIndex, handleVideoSelect]);

  const handleNext = useCallback(() => {
    handleVideoSelect((activeIndex + 1) % VIDEOS.length);
  }, [activeIndex, handleVideoSelect]);

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
          className="video-carousel"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Main Video Player */}
          <div className="video-frame">
            <div className="video-container">
              <AnimatePresence mode="wait">
                <motion.video
                  key={activeIndex}
                  ref={videoRef}
                  controls={showControls}
                  controlsList="nodownload"
                  playsInline
                  poster={activeVideo.poster}
                  onPlay={() => {
                    setIsPlaying(true);
                    setShowControls(true);
                  }}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => {
                    setIsPlaying(false);
                    setShowControls(false);
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <source src={activeVideo.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </motion.video>
              </AnimatePresence>

              {!showControls && (
                <div className="video-overlay" onClick={handlePlayClick}>
                  <button className="play-btn" aria-label="Play video">
                    <i className="fas fa-play"></i>
                  </button>
                </div>
              )}

              {/* Nav arrows */}
              <button
                className="video-nav video-nav-prev"
                onClick={handlePrev}
                aria-label="Previous video"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <button
                className="video-nav video-nav-next"
                onClick={handleNext}
                aria-label="Next video"
              >
                <i className="fas fa-chevron-right"></i>
              </button>

              {/* Video counter */}
              <div className="video-counter">
                {activeIndex + 1} / {VIDEOS.length}
              </div>
            </div>
          </div>

          {/* Video Title */}
          <div className="video-active-title">
            <i className="fas fa-film"></i>
            <span>{activeVideo.title}</span>
          </div>

          {/* Thumbnail Strip */}
          <div className="video-thumbnails">
            {VIDEOS.map((video, index) => (
              <button
                key={index}
                className={`video-thumb ${
                  index === activeIndex ? "active" : ""
                }`}
                onClick={() => handleVideoSelect(index)}
                aria-label={`Play ${video.title}`}
              >
                <img src={video.poster} alt={video.title} loading="lazy" />
                <div className="video-thumb-overlay">
                  <i className="fas fa-play"></i>
                </div>
                <span className="video-thumb-title">{video.title}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
});

VideoShowcase.displayName = "VideoShowcase";

export default VideoShowcase;
