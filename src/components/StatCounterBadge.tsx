import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { GlassCard } from "./GlassCard";
import { THEME } from "../styles/theme";

interface StatCounterBadgeProps {
  targetValue: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sublabel?: string;
  accentColor?: string;
  delayInFrames?: number;
}

export const StatCounterBadge: React.FC<StatCounterBadgeProps> = ({
  targetValue,
  suffix = "",
  prefix = "",
  label,
  sublabel,
  accentColor = THEME.colors.accentCyan,
  delayInFrames = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delayInFrames);

  // Entrance spring animation
  const scale = spring({
    frame: adjustedFrame,
    fps,
    config: THEME.springs.snappy,
  });

  const opacity = interpolate(adjustedFrame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Numerical counter interpolation
  const countProgress = interpolate(adjustedFrame, [10, 45], [0, targetValue], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const displayValue = Math.round(countProgress);

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        opacity,
        transformOrigin: "center center",
      }}
    >
      <GlassCard
        borderColor={accentColor}
        glow
        style={{
          padding: "24px 32px",
          minWidth: "260px",
          background: "rgba(15, 23, 42, 0.75)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Glow Accent Top Pill Bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "20%",
            right: "20%",
            height: "3px",
            background: accentColor,
            borderRadius: "0 0 4px 4px",
            boxShadow: `0 0 12px ${accentColor}`,
          }}
        />

        <div
          style={{
            fontSize: "48px",
            fontWeight: 800,
            color: THEME.colors.textPrimary,
            fontFamily: THEME.fonts.heading,
            letterSpacing: "-1px",
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
            gap: "2px",
            background: `linear-gradient(135deg, #FFFFFF 30%, ${accentColor} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          <span>{prefix}</span>
          <span>{displayValue}</span>
          <span>{suffix}</span>
        </div>

        <div
          style={{
            fontSize: "15px",
            fontWeight: 700,
            color: THEME.colors.textPrimary,
            fontFamily: THEME.fonts.heading,
            marginTop: "6px",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          {label}
        </div>

        {sublabel && (
          <div
            style={{
              fontSize: "12px",
              color: THEME.colors.textSecondary,
              fontFamily: THEME.fonts.body,
              marginTop: "4px",
            }}
          >
            {sublabel}
          </div>
        )}
      </GlassCard>
    </div>
  );
};
