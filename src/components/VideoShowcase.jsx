import { useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

const VideoShowcase = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
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
        <div className={`section-header ${inView ? "visible" : ""}`}>
          <span className="section-subtitle">Experience</span>
          <h2 className="section-title">See the Magic in Action</h2>
          <p className="section-description">
            Watch how D-Wali transforms your skincare routine
          </p>
        </div>

        <div className={`video-frame ${inView ? "visible" : ""}`}>
          <div className="video-container">
            <video
              ref={videoRef}
              controls={showControls}
              controlsList="nodownload"
              playsInline
              webkit-playsinline="true"
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
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
