import React from "react";
import { Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { GlassCard } from "../components/GlassCard";
import { SceneTransitionWrapper } from "../components/SceneTransitionWrapper";
import { ShimmerSweep } from "../components/ShimmerSweep";
import { SimulatedCursor } from "../components/SimulatedCursor";
import { SpeakerBadge } from "../components/SpeakerBadge";
import { StatCounterBadge } from "../components/StatCounterBadge";
import { TitleCard } from "../components/TitleCard";
import { THEME } from "../styles/theme";
import { Search, BookOpen, Wrench, CheckCircle2, Code, Terminal, Sparkles } from "lucide-react";

export interface Scene08Props {
  audioSrc?: string;
  speaker?: string;
  emotion?: string;
}

export const Scene08_Troubleshooting: React.FC<Scene08Props> = ({
  audioSrc = staticFile("audio/dubbing/scene_08_troubleshooting_raineer.wav"),
  speaker = "Raineer Rosado",
  emotion = "Wry & Resourceful",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 0 - 320: Search bar typing & popup windows
  // 320 - 2670: Dynamic problem-solving loop with cycling active stages & live diagnostic telemetry

  const searchPrompt = "how to fix projector no signal w3schools...";
  const charsShown = Math.floor(
    interpolate(frame, [30, 260], [0, searchPrompt.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const currentText = searchPrompt.slice(0, charsShown);

  const cycleSteps = [
    { word: "SEARCH", subtitle: "Google & Querying", icon: Search, color: THEME.colors.accentCyan, log: "[QUERY] searching official documentation & repos..." },
    { word: "LEARN", subtitle: "WordPress & W3Schools", icon: BookOpen, color: THEME.colors.accentBlue, log: "[ANALYSIS] examining codex hooks & stack traces..." },
    { word: "TEST", subtitle: "Staging & Diagnostics", icon: Wrench, color: THEME.colors.accentAmber, log: "[STAGING] isolating hardware port & driver handshake..." },
    { word: "FIX", subtitle: "Deployment & Verification", icon: CheckCircle2, color: THEME.colors.accentEmerald, log: "[SUCCESS] signal restored, verified 100% operational!" },
  ];

  // Cycling active step every 120 frames in the second phase
  const cycleIndex = frame >= 340 ? Math.floor((frame - 340) / 130) % 4 : 0;
  const currentActiveStep = cycleSteps[cycleIndex];

  return (
    <SceneTransitionWrapper durationInFrames={2670} transitionType="slide-left" accentColor={THEME.colors.accentAmber}>
      <Background accentColor={THEME.colors.accentAmber}>
        {audioSrc && <Audio src={audioSrc} />}
        <SpeakerBadge speaker={speaker} role={emotion} />

        {frame < 320 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "36px",
              position: "relative",
              width: "100%",
            }}
          >
            {/* Massive Minimalist Search Bar */}
            <div
              style={{
                width: "840px",
                height: "76px",
                borderRadius: "24px",
                backgroundColor: "rgba(18, 24, 38, 0.95)",
                border: `2px solid ${THEME.colors.accentAmber}66`,
                boxShadow: `0 20px 50px rgba(0,0,0,0.6), 0 0 35px ${THEME.colors.accentAmber}33`,
                display: "flex",
                alignItems: "center",
                padding: "0 28px",
                gap: "20px",
                zIndex: 10,
              }}
            >
              <Search size={32} color={THEME.colors.accentAmber} />
              <div
                style={{
                  fontSize: "24px",
                  fontFamily: THEME.fonts.mono,
                  color: THEME.colors.textPrimary,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span>{currentText}</span>
                <span
                  style={{
                    display: "inline-block",
                    width: "10px",
                    height: "28px",
                    backgroundColor: THEME.colors.accentAmber,
                    marginLeft: "6px",
                    opacity: Math.sin(frame / 4) > 0 ? 1 : 0,
                  }}
                />
              </div>
            </div>

            {/* Partoo Style Deterministic Cursor */}
            {frame < 300 && (
              <SimulatedCursor
                startX={1300}
                startY={650}
                endX={1280}
                endY={450}
                moveStartFrame={20}
                moveDuration={50}
                clickFrame={250}
                label="Querying Fix..."
              />
            )}

            {/* Overlapping Glassmorphism popup windows */}
            <div
              style={{
                position: "relative",
                width: "900px",
                height: "280px",
              }}
            >
              {frame > 160 && (
                <GlassCard
                  borderColor={THEME.colors.accentBlue}
                  glow
                  shimmer
                  style={{
                    position: "absolute",
                    left: "20px",
                    top: "20px",
                    width: "480px",
                    padding: "24px",
                    transform: `scale(${spring({
                      frame: frame - 160,
                      fps,
                      config: THEME.springs.bouncy,
                    })})`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                    <Search size={18} color={THEME.colors.accentCyan} />
                    <span style={{ fontSize: "14px", fontWeight: 700, color: THEME.colors.accentCyan }}>
                      StackOverflow & Forum Knowledgebase
                    </span>
                  </div>
                  <div style={{ fontSize: "16px", fontWeight: 600, color: THEME.colors.textPrimary }}>
                    "HDMI Handshake Failure Resolution on Optoma Laser Projectors"
                  </div>
                  <div style={{ fontSize: "13px", color: THEME.colors.textSecondary, marginTop: "4px" }}>
                    Verified answer by 84 Network Engineers
                  </div>
                </GlassCard>
              )}

              {frame > 220 && (
                <GlassCard
                  borderColor={THEME.colors.accentEmerald}
                  glow
                  shimmer
                  style={{
                    position: "absolute",
                    right: "20px",
                    top: "90px",
                    width: "460px",
                    padding: "24px",
                    transform: `scale(${spring({
                      frame: frame - 220,
                      fps,
                      config: THEME.springs.bouncy,
                    })})`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                    <Code size={18} color={THEME.colors.accentEmerald} />
                    <span style={{ fontSize: "14px", fontWeight: 700, color: THEME.colors.accentEmerald }}>
                      W3Schools & WordPress Codex
                    </span>
                  </div>
                  <div style={{ fontSize: "15px", fontFamily: THEME.fonts.mono, color: THEME.colors.textPrimary }}>
                    function update_option( $option, $value )
                  </div>
                  <div style={{ fontSize: "13px", color: THEME.colors.textSecondary, marginTop: "4px" }}>
                    Sanitizing hooks and refreshing permalink cache
                  </div>
                </GlassCard>
              )}
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "36px",
              width: "100%",
            }}
          >
            <TitleCard
              badge="05 — The Reality of Troubleshooting"
              badgeColor={THEME.colors.accentAmber}
              title="NO ONE HAS ALL THE ANSWERS. THE BEST ADMINS KNOW HOW TO FIND THEM."
              subtitle="The relentless problem solving loop: searching documentation, learning solutions, testing fixes."
              highlightWords={["BEST", "ADMINS", "FIND", "THEM."]}
            />

            {/* 4 Loop Steps with Cycling Active Stage Highlight & Floating Physics */}
            <div style={{ display: "flex", gap: "24px" }}>
              {cycleSteps.map((step, idx) => {
                const stepDelay = 340 + idx * 16;
                const spr = spring({
                  frame: frame - stepDelay,
                  fps,
                  config: THEME.springs.bouncy,
                });
                const Icon = step.icon;
                const isActive = idx === cycleIndex;
                const floatY = Math.sin((frame + idx * 30) / 20) * 8;

                return (
                  <div
                    key={idx}
                    style={{
                      transform: `scale(${interpolate(spr, [0, 1], [0.8, isActive ? 1.05 : 1.0])}) translateY(${floatY}px)`,
                      opacity: interpolate(frame - stepDelay, [0, 10], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                      }),
                      backgroundColor: isActive ? "rgba(22, 30, 48, 0.95)" : "rgba(15, 22, 35, 0.85)",
                      border: `1.5px solid ${isActive ? step.color : `${step.color}44`}`,
                      borderRadius: "24px",
                      padding: "36px 30px",
                      width: "250px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      boxShadow: isActive
                        ? `0 20px 50px rgba(0,0,0,0.7), 0 0 45px ${step.color}55`
                        : `0 15px 35px rgba(0,0,0,0.5), 0 0 20px ${step.color}15`,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <ShimmerSweep delay={idx * 20} period={85} color={`${step.color}44`} />

                    {isActive && (
                      <div
                        style={{
                          position: "absolute",
                          top: "12px",
                          right: "12px",
                          padding: "4px 10px",
                          borderRadius: "12px",
                          backgroundColor: `${step.color}22`,
                          border: `1px solid ${step.color}`,
                          color: step.color,
                          fontSize: "10px",
                          fontFamily: THEME.fonts.mono,
                          fontWeight: 800,
                          letterSpacing: "0.5px",
                        }}
                      >
                        ACTIVE
                      </div>
                    )}

                    <div
                      style={{
                        width: "68px",
                        height: "68px",
                        borderRadius: "20px",
                        backgroundColor: `${step.color}20`,
                        border: `1.5px solid ${step.color}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "18px",
                        boxShadow: `0 0 25px ${step.color}44`,
                      }}
                    >
                      <Icon size={34} color={step.color} />
                    </div>

                    <h2
                      style={{
                        fontSize: "30px",
                        fontWeight: 900,
                        letterSpacing: "0.05em",
                        color: THEME.colors.textPrimary,
                        margin: "0 0 8px 0",
                      }}
                    >
                      {step.word}.
                    </h2>

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
                );
              })}
            </div>

            {/* Live Streaming Diagnostic Console (Active across the remaining frames) */}
            <div
              style={{
                width: "1050px",
                padding: "16px 24px",
                borderRadius: "16px",
                backgroundColor: "rgba(10, 14, 23, 0.9)",
                border: `1px solid ${THEME.colors.accentAmber}44`,
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontFamily: THEME.fonts.mono,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Terminal size={18} color={THEME.colors.accentAmber} />
                <span style={{ fontSize: "14px", color: THEME.colors.accentAmber, fontWeight: 700 }}>
                  DIAGNOSTIC_PIPELINE:
                </span>
                <span style={{ fontSize: "14px", color: THEME.colors.textPrimary }}>
                  {currentActiveStep.log}
                </span>
              </div>
              <div style={{ fontSize: "12px", color: THEME.colors.textMuted }}>
                LOOP STEP {cycleIndex + 1}/4
              </div>
            </div>
          </div>
        )}
      </Background>
    </SceneTransitionWrapper>
  );
};
