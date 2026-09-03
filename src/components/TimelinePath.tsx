import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../styles/theme";
import { GraduationCap, HeartHandshake, Globe, Briefcase } from "lucide-react";

export const TimelinePath: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const steps = [
    {
      title: "MULTIMEDIA ARTS",
      subtitle: "College of St. Benilde",
      icon: GraduationCap,
      delay: 10,
      color: THEME.colors.accentIndigo,
      x: 140,
    },
    {
      title: "FELLOWSHIP",
      subtitle: "Volunteer Opportunity",
      icon: HeartHandshake,
      delay: 45,
      color: THEME.colors.accentCyan,
      x: 440,
    },
    {
      title: "WEBSITE REDESIGN",
      subtitle: "The Turning Point",
      icon: Globe,
      delay: 80,
      color: THEME.colors.accentBlue,
      x: 740,
    },
    {
      title: "BSOP SYSTEM & DESIGN",
      subtitle: "7–8 Years of Stewardship",
      icon: Briefcase,
      delay: 115,
      color: THEME.colors.accentEmerald,
      x: 1040,
    },
  ];

  // SVG Line drawing with strokeDashoffset
  const pathLength = 900;
  const lineProgress = interpolate(frame, [0, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const strokeDashoffset = pathLength * (1 - lineProgress);

  return (
    <div
      style={{
        position: "relative",
        width: "1200px",
        height: "280px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      {/* SVG Connecting Line with dynamic strokeDashoffset */}
      <svg
        style={{
          position: "absolute",
          top: "140px",
          left: "60px",
          width: "1080px",
          height: "20px",
          overflow: "visible",
          pointerEvents: "none",
        }}
      >
        <defs>
          <linearGradient id="timelineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={THEME.colors.accentIndigo} />
            <stop offset="35%" stopColor={THEME.colors.accentCyan} />
            <stop offset="70%" stopColor={THEME.colors.accentBlue} />
            <stop offset="100%" stopColor={THEME.colors.accentEmerald} />
          </linearGradient>
        </defs>

        {/* Base background line */}
        <line
          x1="80"
          y1="10"
          x2="980"
          y2="10"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="3"
        />

        {/* Animated dynamic line */}
        <line
          x1="80"
          y1="10"
          x2="980"
          y2="10"
          stroke="url(#timelineGrad)"
          strokeWidth="4"
          strokeDasharray={pathLength}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          filter="drop-shadow(0 0 8px rgba(56, 189, 248, 0.6))"
        />
      </svg>

      {/* Bouncing Nodes on the line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          padding: "0 60px",
          alignItems: "center",
        }}
      >
        {steps.map((step, idx) => {
          const spr = spring({
            frame: frame - step.delay,
            fps,
            config: { damping: 9, mass: 0.8, stiffness: 120 }, // Satisfying spring bounce
          });

          const opacity = interpolate(frame - step.delay, [0, 8], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          const scale = interpolate(spr, [0, 1], [0.3, 1]);
          const Icon = step.icon;

          return (
            <div
              key={idx}
              style={{
                opacity,
                transform: `scale(${scale})`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                width: "230px",
                zIndex: 2,
              }}
            >
              <div
                style={{
                  width: "68px",
                  height: "68px",
                  borderRadius: "20px",
                  backgroundColor: "rgba(15, 23, 42, 0.95)",
                  border: `2px solid ${step.color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "14px",
                  boxShadow: `0 0 30px ${step.color}55, 0 10px 20px rgba(0,0,0,0.6)`,
                }}
              >
                <Icon size={32} color={step.color} />
              </div>

              <span
                style={{
                  fontSize: "12px",
                  fontFamily: THEME.fonts.mono,
                  color: step.color,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  marginBottom: "4px",
                }}
              >
                MILESTONE 0{idx + 1}
              </span>

              <h4
                style={{
                  fontSize: "16px",
                  fontWeight: 800,
                  color: THEME.colors.textPrimary,
                  margin: "0 0 4px 0",
                  lineHeight: 1.2,
                }}
              >
                {step.title}
              </h4>

              <p
                style={{
                  fontSize: "13px",
                  color: THEME.colors.textSecondary,
                  margin: 0,
                }}
              >
                {step.subtitle}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
