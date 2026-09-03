import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { THEME } from "../styles/theme";

interface GlitchEffectProps {
  active: boolean;
  intensity?: number;
  children: React.ReactNode;
}

export const GlitchEffect: React.FC<GlitchEffectProps> = ({
  active,
  intensity = 1,
  children,
}) => {
  const frame = useCurrentFrame();

  if (!active) {
    return <>{children}</>;
  }

  // Pseudo-random jitter based on frame
  const jitterX = Math.sin(frame * 17) * 8 * intensity;
  const jitterY = Math.cos(frame * 29) * 4 * intensity;
  const skew = Math.sin(frame * 11) * 3 * intensity;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Cyan split channel */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `translate(${jitterX * 1.5}px, ${jitterY}px)`,
          filter: "drop-shadow(-3px 0px 0px rgba(0, 229, 255, 0.7))",
          opacity: 0.8,
          pointerEvents: "none",
        }}
      >
        {children}
      </div>

      {/* Magenta/Red split channel */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `translate(${-jitterX * 1.5}px, ${-jitterY}px) skewX(${skew}deg)`,
          filter: "drop-shadow(3px 0px 0px rgba(255, 0, 85, 0.7))",
          opacity: 0.8,
          pointerEvents: "none",
        }}
      >
        {children}
      </div>

      {/* Main Base Layer */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>

      {/* Horizontal Glitch Scanlines */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage:
            "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%)",
          backgroundSize: "100% 4px",
          zIndex: 10,
          pointerEvents: "none",
          opacity: 0.6 * intensity,
        }}
      />

      {/* Random Slice Bar */}
      <div
        style={{
          position: "absolute",
          top: `${(Math.sin(frame * 7) * 40 + 50).toFixed(0)}%`,
          left: 0,
          width: "100%",
          height: `${12 * intensity}px`,
          backgroundColor: THEME.colors.glitchRed,
          opacity: Math.sin(frame * 13) > 0.2 ? 0.35 : 0,
          zIndex: 11,
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
