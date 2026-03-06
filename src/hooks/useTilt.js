import { useState, useCallback } from "react";

/**
 * Custom hook for 3D tilt effect on hover.
 * @param {number} intensity - Tilt intensity multiplier (default: 10)
 * @returns {{ tilt: {x: number, y: number}, handleMouseMove: function, handleMouseLeave: function }}
 */
const useTilt = (intensity = 10) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: y * intensity, y: -x * intensity });
    },
    [intensity]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return { tilt, handleMouseMove, handleMouseLeave };
};

export default useTilt;
