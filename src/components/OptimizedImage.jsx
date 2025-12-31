import { useState, useRef, useEffect } from "react";

/**
 * OptimizedImage component with WebP support, lazy loading, and fallback
 * @param {string} src - Image source path (without extension for auto WebP)
 * @param {string} alt - Alt text for accessibility
 * @param {string} className - CSS classes
 * @param {object} style - Inline styles
 * @param {boolean} eager - If true, loads immediately without lazy loading
 */
const OptimizedImage = ({
  src,
  alt,
  className = "",
  style = {},
  eager = false,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  // Generate WebP and fallback paths
  const getImagePaths = (imageSrc) => {
    if (!imageSrc) return { webp: "", fallback: "" };

    // If already a webp, use as is
    if (imageSrc.toLowerCase().endsWith(".webp")) {
      return { webp: imageSrc, fallback: imageSrc.replace(/\.webp$/i, ".jpg") };
    }

    // Convert jpg/jpeg/png to webp
    const webpSrc = imageSrc.replace(
      /\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i,
      ".webp"
    );
    return { webp: webpSrc, fallback: imageSrc };
  };

  const { webp, fallback } = getImagePaths(src);

  useEffect(() => {
    if (eager && imgRef.current) {
      imgRef.current.loading = "eager";
    }
  }, [eager]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
    }
  };

  return (
    <picture
      className={`optimized-image-wrapper ${isLoaded ? "loaded" : "loading"}`}
    >
      {!hasError && <source srcSet={webp} type="image/webp" />}
      <img
        ref={imgRef}
        src={hasError ? fallback : webp}
        alt={alt}
        className={`${className} ${
          isLoaded ? "image-loaded" : "image-loading"
        }`}
        style={{
          ...style,
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
        }}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </picture>
  );
};

export default OptimizedImage;
