import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface ShimmerSweepProps {
  delay?: number;
  period?: number;
  color?: string;
  width?: string;
}

export const ShimmerSweep: React.FC<ShimmerSweepProps> = ({
  delay = 0,
  period = 90,
  color = "rgba(255, 255, 255, 0.25)",
  width = "100%",
}) => {
  const frame = useCurrentFrame();

  const cycleFrame = Math.max(0, frame - delay) % period;
  const sweepProgress = interpolate(cycleFrame, [0, 45], [-120, 220], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: `${sweepProgress}%`,
        width: "60%",
        background: `linear-gradient(105deg, transparent 20%, ${color} 50%, transparent 80%)`,
        transform: "skewX(-20deg)",
        pointerEvents: "none",
        zIndex: 5,
      }}
    />
  );
};
