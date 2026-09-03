import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { THEME } from "../styles/theme";

interface BackgroundProps {
  accentColor?: string;
  gridOpacity?: number;
  glowIntensity?: number;
  children?: React.ReactNode;
}

export const Background: React.FC<BackgroundProps> = ({
  accentColor = THEME.colors.accentBlue,
  gridOpacity = 0.08,
  glowIntensity = 0.15,
  children,
}) => {
  const frame = useCurrentFrame();

  const pulse = interpolate(
    Math.sin(frame / 30),
    [-1, 1],
    [glowIntensity * 0.8, glowIntensity * 1.2]
  );

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: THEME.colors.bgDark,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Ambient glowing radial gradient */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          width: "1200px",
          height: "800px",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(ellipse at center, ${accentColor} 0%, rgba(15, 23, 42, 0.4) 45%, transparent 75%)`,
          opacity: pulse,
          pointerEvents: "none",
          filter: "blur(60px)",
        }}
      />

      {/* Grid Pattern */}
      {gridOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, ${gridOpacity}) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, ${gridOpacity}) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
            opacity: 0.8,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(circle at center, transparent 40%, rgba(4, 5, 8, 0.8) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Foreground Content */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        {children}
      </div>
    </div>
  );
};
