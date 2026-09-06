import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../styles/theme";
import { LightStreakWhip } from "./LightStreakWhip";

interface SceneTransitionWrapperProps {
  children: React.ReactNode;
  durationInFrames: number;
  transitionType?: "zoom-push" | "slide-left" | "slide-up" | "fade-glow" | "hyperframes-whip";
  accentColor?: string;
  enableWhipStreak?: boolean;
}

/**
 * SceneTransitionWrapper with HyperFrames Kinetic Transitions
 * - Velocity motion blur at cut points
 * - Light-Streak whip cut effect
 * - Organic camera drift and snappy spring entrances
 */
export const SceneTransitionWrapper: React.FC<SceneTransitionWrapperProps> = ({
  children,
  durationInFrames,
  transitionType = "hyperframes-whip",
  accentColor = THEME.colors.accentCyan,
  enableWhipStreak = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Snappy Intro Spring (frames 0 - 24)
  const introSpring = spring({
    frame,
    fps,
    config: THEME.springs.snappy,
  });

  const introOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // HyperFrames cut-the-curve velocity motion blur on incoming beat (frames 0 -> 10)
  const introBlur = interpolate(frame, [0, 10], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Intro scale & transforms
  let introScale = interpolate(introSpring, [0, 1], [0.92, 1.0]);
  let introTranslateX = 0;
  let introTranslateY = interpolate(introSpring, [0, 1], [30, 0]);

  if (transitionType === "slide-left") {
    introTranslateX = interpolate(introSpring, [0, 1], [70, 0]);
    introTranslateY = 0;
  } else if (transitionType === "slide-up" || transitionType === "hyperframes-whip") {
    introTranslateY = interpolate(introSpring, [0, 1], [40, 0]);
  }

  // 2. Continuous Organic Camera Drift across the entire scene
  const continuousZoom = interpolate(
    frame,
    [0, durationInFrames],
    [1.0, 1.03],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const subtlePanY = interpolate(
    frame,
    [0, durationInFrames],
    [0, -12],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // 3. Dynamic Outro Camera Acceleration & Motion Blur (last 12 frames)
  const outroFrames = 12;
  const outroStart = Math.max(0, durationInFrames - outroFrames);

  const outroZoom = interpolate(
    frame,
    [outroStart, durationInFrames],
    [1.0, 1.10],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const outroBlur = interpolate(
    frame,
    [outroStart, durationInFrames],
    [0, 18],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const outroOpacity = interpolate(
    frame,
    [durationInFrames - 5, durationInFrames],
    [1, 0.7],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Optical Light Leak Flash at Scene Cut Points
  const introFlash = interpolate(frame, [0, 3, 14], [0, 0.65, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const outroFlash = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [0, 0.6],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const combinedFlash = Math.max(introFlash, outroFlash);
  const totalBlur = Math.max(introBlur, outroBlur);

  // Combined scale & pan
  const totalScale = introScale * continuousZoom * outroZoom;
  const totalTranslateY = introTranslateY + subtlePanY;

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: THEME.colors.bgDark }}>
      {/* Animated Scene Content with directional motion blur */}
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: `scale(${totalScale}) translate(${introTranslateX}px, ${totalTranslateY}px)`,
          opacity: introOpacity * outroOpacity,
          filter: totalBlur > 0.5 ? `blur(${totalBlur}px)` : "none",
          transformOrigin: "center center",
          willChange: "transform, opacity, filter",
        }}
      >
        {children}
      </div>

      {/* Optical Light Leak Flash */}
      {combinedFlash > 0.01 && (
        <AbsoluteFill
          style={{
            pointerEvents: "none",
            opacity: combinedFlash,
            background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${accentColor}99 0%, rgba(255,255,255,0.5) 30%, transparent 75%)`,
            mixBlendMode: "screen",
            zIndex: 980,
          }}
        />
      )}

      {/* Signature HyperFrames Light-Streak Whip Transition */}
      {enableWhipStreak && (
        <>
          {/* Intro Whip Streak */}
          <LightStreakWhip
            startFrame={0}
            durationInFrames={10}
            color={accentColor}
            direction="left-to-right"
          />
          {/* Outro Whip Streak */}
          <LightStreakWhip
            startFrame={Math.max(0, durationInFrames - 10)}
            durationInFrames={10}
            color={accentColor}
            direction="left-to-right"
          />
        </>
      )}
    </AbsoluteFill>
  );
};
