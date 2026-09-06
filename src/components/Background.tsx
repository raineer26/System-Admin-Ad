import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { THEME } from "../styles/theme";

interface BackgroundProps {
  accentColor?: string;
  gridOpacity?: number;
  glowIntensity?: number;
  perspective3d?: boolean;
  showCrosshairs?: boolean;
  showParticles?: boolean;
  children?: React.ReactNode;
}

// Deterministic particle positions and seeds (Rule 1: Frame Determinism)
const AMBIENT_CROSSHAIRS = [
  { left: "14%", top: "35%", delay: 0 },
  { left: "28%", top: "72%", delay: 18 },
  { left: "42%", top: "28%", delay: 35 },
  { left: "65%", top: "40%", delay: 12 },
  { left: "78%", top: "75%", delay: 42 },
  { left: "86%", top: "22%", delay: 24 },
  { left: "34%", top: "82%", delay: 50 },
  { left: "55%", top: "68%", delay: 8 },
  { left: "22%", top: "18%", delay: 29 },
  { left: "92%", top: "52%", delay: 15 },
];

export const Background: React.FC<BackgroundProps> = ({
  accentColor = THEME.colors.accentBlue,
  gridOpacity = 0.08,
  glowIntensity = 0.15,
  perspective3d = true,
  showCrosshairs = true,
  showParticles = true,
  children,
}) => {
  const frame = useCurrentFrame();

  // Subtle breathing vignette pulse (HyperFrames Rule 4: Camera never sleeps)
  const vignettePulse = interpolate(
    Math.sin(frame / 45),
    [-1, 1],
    [0.85, 0.95],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Core ambient glow pulse
  const ambientPulse = interpolate(
    Math.sin(frame / 30),
    [-1, 1],
    [glowIntensity * 0.85, glowIntensity * 1.25],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Parallax forward motion for 3D perspective floor (80px repeat grid)
  const floorParallaxY = (frame * 1.4) % 80;

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
      {/* 1. Deep Core Ambient Stage Glow Wash */}
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: "50%",
          width: "1400px",
          height: "850px",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(ellipse at center, ${accentColor} 0%, rgba(15, 23, 42, 0.45) 45%, transparent 75%)`,
          opacity: ambientPulse,
          pointerEvents: "none",
          filter: "blur(75px)",
        }}
      />

      {/* 2. HyperFrames 3D Perspective Grid Floor (Rule 10: Perspective Grid Spine) */}
      {perspective3d && gridOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            bottom: "-15%",
            left: "-25%",
            width: "150%",
            height: "75%",
            transform: "perspective(700px) rotateX(62deg)",
            transformOrigin: "center bottom",
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, ${gridOpacity * 1.3}) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, ${gridOpacity * 1.3}) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
            backgroundPosition: `0px ${floorParallaxY}px`,
            maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,1) 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,1) 100%)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* 2b. Standard Flat Ambient Grid (for clean overhead depth) */}
      {!perspective3d && gridOpacity > 0 && (
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

      {/* 3. Crosshair Registration Coordinates (+) */}
      {showCrosshairs && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          {AMBIENT_CROSSHAIRS.map((item, idx) => {
            const twinkle = interpolate(
              Math.sin((frame + item.delay * 8) / 25),
              [-1, 1],
              [0.2, 0.75],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            return (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  left: item.left,
                  top: item.top,
                  transform: "translate(-50%, -50%)",
                  opacity: twinkle * 0.7,
                  color: "rgba(255, 255, 255, 0.4)",
                  fontFamily: THEME.fonts.mono,
                  fontSize: "14px",
                  userSelect: "none",
                }}
              >
                +
              </div>
            );
          })}
        </div>
      )}

      {/* 4. Ambient Sparkle Particles */}
      {showParticles && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const seed = (i * 137.5) % 100;
            const x = 15 + ((seed * 13) % 70);
            const driftY = ((frame * (0.35 + (i % 3) * 0.15) + seed * 20) % 100);
            const pOpacity = interpolate(
              Math.sin((frame + i * 20) / 20),
              [-1, 1],
              [0.1, 0.6],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: `${x}%`,
                  top: `${100 - driftY}%`,
                  width: "3px",
                  height: "3px",
                  borderRadius: "50%",
                  backgroundColor: accentColor,
                  boxShadow: `0 0 8px ${accentColor}`,
                  opacity: pOpacity,
                }}
              />
            );
          })}
        </div>
      )}

      {/* 5. Breathing Stage Vignette (HyperFrames Rule 2: Black is the canvas) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "radial-gradient(ellipse 75% 70% at center, transparent 35%, rgba(4, 5, 8, 0.94) 100%)",
          opacity: vignettePulse,
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* 6. Foreground Scene Content */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 3,
        }}
      >
        {children}
      </div>
    </div>
  );
};
