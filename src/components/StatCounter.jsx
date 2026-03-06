import { useEffect, useState, useRef, memo, useCallback } from "react";

const StatCounter = memo(({ target, label, suffix = "", inView }) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  const formatNumber = useCallback(
    (num) => {
      if (suffix === "M") {
        return (num / 1000000).toFixed(num >= 1000000 ? 0 : 1);
      }
      return num.toLocaleString();
    },
    [suffix]
  );

  useEffect(() => {
    if (inView && !hasAnimated.current) {
      hasAnimated.current = true;
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [inView, target]);

  return (
    <div className="stat-item">
      <span className="stat-value">
        <span className="stat-number">{formatNumber(count)}</span>
        <span className="stat-plus">{suffix || "+"}</span>
      </span>
      <span className="stat-label">{label}</span>
    </div>
  );
});

StatCounter.displayName = "StatCounter";

export default StatCounter;
