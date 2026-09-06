import React from "react";
import { Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { QuoteBlock } from "../components/QuoteBlock";
import { SceneTransitionWrapper } from "../components/SceneTransitionWrapper";
import { ShimmerSweep } from "../components/ShimmerSweep";
import { SpeakerBadge } from "../components/SpeakerBadge";
import { StatCounterBadge } from "../components/StatCounterBadge";
import { TitleCard } from "../components/TitleCard";
import { THEME } from "../styles/theme";
import { Clock, ShieldCheck, Moon } from "lucide-react";

export interface Scene11Props {
  audioSrc?: string;
  speaker?: string;
  emotion?: string;
}

export const Scene11_WorkLife: React.FC<Scene11Props> = ({
  audioSrc = staticFile("audio/dubbing/scene_11_work_life_sean.wav"),
  speaker = "Sean Vasquez",
  emotion = "Introspective & Sincere",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth cross-transition around frame 420-455
  const quoteExitProgress = interpolate(frame, [420, 455], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const quoteOpacity = 1 - quoteExitProgress;

  // Digital clock ticking from 04:59 PM to 05:00 PM (17:00)
  const isAfterHours = frame >= 650;
  const timeString = isAfterHours ? "05:00 PM" : "04:59 PM";

  // Camera drift throughout the entire 1560 frames
  const cameraZoom = interpolate(frame, [450, 1560], [0.98, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Nodes dimming from bright color to calm evening teal
  const nodeSaturation = interpolate(frame, [440, 750], [1, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneTransitionWrapper durationInFrames={1560} transitionType="fade-glow" accentColor={isAfterHours ? THEME.colors.accentEmerald : THEME.colors.accentIndigo}>
      <Background accentColor={isAfterHours ? THEME.colors.accentEmerald : THEME.colors.accentIndigo}>
        {audioSrc && <Audio src={audioSrc} />}
        <SpeakerBadge speaker={speaker} role={emotion} />

        {/* Phase 1: Quote Block */}
        {frame < 460 && (
          <div
            style={{
              opacity: quoteOpacity,
              transform: `scale(${interpolate(quoteExitProgress, [0, 1], [1, 0.93])})`,
              willChange: "transform, opacity",
            }}
          >
            <QuoteBlock
              quote="Before, when I just started, I also worked after work hours. After that, I avoid working after work hours."
              author="Jansen Lee"
              role="Work-Life Balance & System Reliability"
              accentColor={THEME.colors.accentIndigo}
            />
          </div>
        )}

        {/* Phase 2: Sustainable Engineering & Clock Turnover */}
        {frame >= 435 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "32px",
              width: "100%",
              transform: `scale(${cameraZoom})`,
              transformOrigin: "center center",
              opacity: interpolate(frame, [435, 465], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              willChange: "transform, opacity",
            }}
          >
            <TitleCard
              badge="Sustainable Stewardship"
              badgeColor={THEME.colors.accentCyan}
              title="NOT TO CONSTANTLY FIX THINGS. BUT TO BUILD RELIABLE SYSTEMS."
              subtitle="True reliability isn't answering frantic calls at midnight. It's engineering the infrastructure so it doesn't fail."
              highlightWords={["BUILD", "RELIABLE", "SYSTEMS."]}
            />

            {/* Sleek Digital Clock ticking over */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "18px",
                padding: "18px 42px",
                borderRadius: "24px",
                backgroundColor: "rgba(18, 24, 38, 0.92)",
                border: `1.5px solid ${isAfterHours ? THEME.colors.accentEmerald : THEME.colors.accentCyan}55`,
                boxShadow: `0 20px 50px rgba(0,0,0,0.6), 0 0 35px ${
                  isAfterHours ? THEME.colors.accentEmerald : THEME.colors.accentCyan
                }25`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <ShimmerSweep period={100} color={isAfterHours ? "rgba(16, 185, 129, 0.3)" : "rgba(56, 189, 248, 0.3)"} />
              <Clock
                size={32}
                color={isAfterHours ? THEME.colors.accentEmerald : THEME.colors.accentCyan}
              />
              <span
                style={{
                  fontSize: "36px",
                  fontWeight: 900,
                  fontFamily: THEME.fonts.mono,
                  letterSpacing: "0.1em",
                  color: THEME.colors.textPrimary,
                }}
              >
                {timeString}
              </span>
              <span
                style={{
                  padding: "6px 16px",
                  borderRadius: "999px",
                  backgroundColor: isAfterHours
                    ? "rgba(16, 185, 129, 0.2)"
                    : "rgba(56, 189, 248, 0.2)",
                  fontSize: "13px",
                  fontFamily: THEME.fonts.mono,
                  fontWeight: 700,
                  color: isAfterHours
                    ? THEME.colors.accentEmerald
                    : THEME.colors.accentCyan,
                }}
              >
                {isAfterHours ? "END OF SHIFT · SYSTEMS STABLE" : "SHIFT ACTIVE"}
              </span>
            </div>

            {/* Continuous Stable System Status Pills */}
            <div
              style={{
                display: "flex",
                gap: "16px",
                filter: `saturate(${nodeSaturation})`,
              }}
            >
              {["WEBSITES ACTIVE", "NETWORK SECURE", "DEVICES MONITORED", "DATA BACKED UP"].map(
                (label, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "10px 20px",
                      borderRadius: "14px",
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      border: `1px solid ${THEME.colors.borderGlass}`,
                      fontSize: "12px",
                      fontFamily: THEME.fonts.mono,
                      fontWeight: 600,
                      color: isAfterHours ? THEME.colors.accentEmerald : THEME.colors.textSecondary,
                      boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
                    }}
                  >
                    ✓ {label}
                  </div>
                )
              )}
            </div>

            {/* Continuous Telemetry Badges (Frames 720+) */}
            {frame >= 700 && (
              <div style={{ display: "flex", gap: "24px", marginTop: "10px" }}>
                <StatCounterBadge
                  targetValue={0}
                  suffix=" Emergencies"
                  label="After-Hours Incidents"
                  sublabel="Robust preemptive architecture"
                  accentColor={THEME.colors.accentEmerald}
                  delayInFrames={720}
                />
                <StatCounterBadge
                  targetValue={100}
                  suffix="%"
                  label="System Peace of Mind"
                  sublabel="Designed for uncompromised uptime"
                  accentColor={THEME.colors.accentCyan}
                  delayInFrames={740}
                />
              </div>
            )}
          </div>
        )}
      </Background>
    </SceneTransitionWrapper>
  );
};
