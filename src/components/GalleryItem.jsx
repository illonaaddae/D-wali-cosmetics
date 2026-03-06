import { memo } from "react";
import useTilt from "../hooks/useTilt";

const GalleryItem = memo(({ src, alt, label }) => {
  const { tilt, handleMouseMove, handleMouseLeave } = useTilt(10);

  return (
    <div
      className="gallery-item"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
    >
      <img src={src} alt={alt} loading="lazy" decoding="async" />
      <div className="gallery-overlay">
        <span>{label}</span>
      </div>
    </div>
  );
});

GalleryItem.displayName = "GalleryItem";

export default GalleryItem;
