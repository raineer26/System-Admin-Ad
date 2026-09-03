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
      delay: 0,
      color: THEME.colors.accentIndigo,
    },
    {
      title: "FELLOWSHIP",
      subtitle: "Volunteer Opportunity",
      icon: HeartHandshake,
      delay: 20,
      color: THEME.colors.accentCyan,
    },
    {
      title: "WEBSITE REDESIGN",
      subtitle: "The Turning Point",
      icon: Globe,
      delay: 40,
      color: THEME.colors.accentBlue,
    },
    {
      title: "BSOP SYSTEM & DESIGN",
      subtitle: "7–8 Years of Stewardship",
      icon: Briefcase,
      delay: 60,
      color: THEME.colors.accentEmerald,
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "28px",
        width: "1280px",
        marginTop: "40px",
      }}
    >
      {steps.map((step, idx) => {
        const spr = spring({
          frame: frame - step.delay,
          fps,
          config: THEME.springs.smooth,
        });

        const opacity = interpolate(frame - step.delay, [0, 15], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        const scale = interpolate(spr, [0, 1], [0.85, 1]);
        const IconComponent = step.icon;

        return (
          <React.Fragment key={idx}>
            {/* Step Card */}
            <div
              style={{
                opacity,
                transform: `scale(${scale})`,
                flex: 1,
                backgroundColor: "rgba(18, 24, 38, 0.8)",
                border: `1px solid ${step.color}55`,
                borderRadius: "20px",
                padding: "28px 24px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                boxShadow: `0 15px 35px rgba(0,0,0,0.5), 0 0 25px ${step.color}22`,
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "18px",
                  backgroundColor: `${step.color}22`,
                  border: `1.5px solid ${step.color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                  boxShadow: `0 0 20px ${step.color}44`,
                }}
              >
                <IconComponent size={32} color={step.color} />
              </div>

              <span
                style={{
                  fontSize: "13px",
                  fontFamily: THEME.fonts.mono,
                  color: step.color,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  marginBottom: "6px",
                }}
              >
                STEP 0{idx + 1}
              </span>

              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  color: THEME.colors.textPrimary,
                  lineHeight: 1.2,
                  marginBottom: "8px",
                }}
              >
                {step.title}
              </h3>

              <p
                style={{
                  fontSize: "14px",
                  color: THEME.colors.textSecondary,
                  margin: 0,
                }}
              >
                {step.subtitle}
              </p>
            </div>

            {/* Connecting Arrow */}
            {idx < steps.length - 1 && (
              <div
                style={{
                  opacity: interpolate(
                    frame - (step.delay + 10),
                    [0, 10],
                    [0, 1],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                  ),
                  color: THEME.colors.accentCyan,
                  fontSize: "24px",
                  fontWeight: 900,
                }}
              >
                →
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
