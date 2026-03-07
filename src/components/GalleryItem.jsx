import { memo } from "react";
import { Link } from "react-router-dom";
import useTilt from "../hooks/useTilt";

const GalleryItem = memo(({ src, alt, label, link }) => {
  const { tilt, handleMouseMove, handleMouseLeave } = useTilt(10);

  const content = (
    <div
      className={`gallery-item ${link ? "gallery-item-linked" : ""}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
    >
      <img src={src} alt={alt} loading="lazy" decoding="async" />
      <div className="gallery-overlay">
        <span>{label}</span>
        {link && (
          <span className="gallery-view-details">
            View Details <i className="fas fa-arrow-right"></i>
          </span>
        )}
      </div>
    </div>
  );

  if (link) {
    return <Link to={link} className="gallery-item-link">{content}</Link>;
  }

  return content;
});

GalleryItem.displayName = "GalleryItem";

export default GalleryItem;
