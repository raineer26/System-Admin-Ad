import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { THEME } from "../styles/theme";

interface LightStreakWhipProps {
  startFrame?: number;
  durationInFrames?: number;
  color?: string;
  angleDeg?: number;
  thickness?: number;
  direction?: "left-to-right" | "right-to-left";
}

/**
 * Signature HyperFrames Light-Streak Whip Transition
 * A high-speed glowing light beam zipping across the frame in ~8-12 frames
 * with motion trail and chromatic bloom to mask cuts seamlessly.
 */
export const LightStreakWhip: React.FC<LightStreakWhipProps> = ({
  startFrame = 0,
  durationInFrames = 10,
  color = THEME.colors.accentCyan,
  angleDeg = -15,
  thickness = 8,
  direction = "left-to-right",
}) => {
  const frame = useCurrentFrame();

  if (frame < startFrame || frame > startFrame + durationInFrames) {
    return null;
  }

  const progress = interpolate(
    frame,
    [startFrame, startFrame + durationInFrames],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Non-linear power acceleration (starts very fast and streaks through)
  const streakProgress = Math.pow(progress, 1.8);

  const startX = direction === "left-to-right" ? -60 : 160;
  const endX = direction === "left-to-right" ? 160 : -60;

  const currentXPercent = interpolate(streakProgress, [0, 1], [startX, endX]);

  // Flash opacity peaks around 35% through the streak
  const flashOpacity = interpolate(
    progress,
    [0, 0.35, 1],
    [0, 0.85, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 990,
      }}
    >
      {/* Full-screen chromatic wash bloom */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, rgba(255, 255, 255, 0.45) 0%, ${color}44 40%, transparent 80%)`,
          opacity: flashOpacity,
          mixBlendMode: "screen",
          filter: "blur(20px)",
        }}
      />

      {/* High-speed Whip Streak Bar */}
      <div
        style={{
          position: "absolute",
          top: "-30%",
          left: `${currentXPercent}%`,
          width: "350px",
          height: "160%",
          transform: `rotate(${angleDeg}deg)`,
          transformOrigin: "center center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mixBlendMode: "screen",
          opacity: flashOpacity * 1.2,
          filter: "blur(4px)",
        }}
      >
        {/* Core hot white center beam */}
        <div
          style={{
            position: "absolute",
            width: `${thickness}px`,
            height: "100%",
            backgroundColor: "#FFFFFF",
            boxShadow: `0 0 40px #FFFFFF, 0 0 90px ${color}, 0 0 160px ${color}`,
          }}
        />

        {/* Trail wake */}
        <div
          style={{
            position: "absolute",
            width: "300px",
            height: "100%",
            background: direction === "left-to-right"
              ? `linear-gradient(90deg, transparent 0%, ${color}66 70%, #FFFFFF 100%)`
              : `linear-gradient(90deg, #FFFFFF 0%, ${color}66 30%, transparent 100%)`,
            filter: "blur(12px)",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
