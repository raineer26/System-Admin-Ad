import React from "react";
import { Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { SceneTransitionWrapper } from "../components/SceneTransitionWrapper";
import { ShimmerSweep } from "../components/ShimmerSweep";
import { SpeakerBadge } from "../components/SpeakerBadge";
import { TitleCard } from "../components/TitleCard";
import { THEME } from "../styles/theme";

export interface Scene12Props {
  audioSrc?: string;
  speaker?: string;
  emotion?: string;
}

export const Scene12_SystemAdminDefinition: React.FC<Scene12Props> = ({
  audioSrc = staticFile("audio/dubbing/scene_12_system_admin_definition_raineer.wav"),
  speaker = "Raineer Rosado",
  emotion = "Passionate & Empowering",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stackedWords = [
    { text: "WEBSITE", delay: 25, color: THEME.colors.accentCyan },
    { text: "SECURITY", delay: 70, color: THEME.colors.accentRose },
    { text: "NETWORK", delay: 115, color: THEME.colors.accentBlue },
    { text: "USER ACCOUNTS", delay: 160, color: THEME.colors.accentIndigo },
    { text: "EQUIPMENT", delay: 205, color: THEME.colors.accentEmerald },
    { text: "TROUBLESHOOTING", delay: 250, color: THEME.colors.accentAmber },
    { text: "CLASSROOM TECHNOLOGY", delay: 295, color: THEME.colors.accentCyan },
  ];

  const showFinalBlock = frame >= 430;
  const finalSpring = showFinalBlock
    ? spring({
        frame: frame - 430,
        fps,
        config: THEME.springs.bouncy,
      })
    : 0;

  const cameraScale = interpolate(frame, [0, 2100], [0.98, 1.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pillarPills = [
    { label: "WordPress Core", color: THEME.colors.accentCyan },
    { label: "Koha OPAC Library", color: THEME.colors.accentEmerald },
    { label: "Enterprise Wi-Fi", color: THEME.colors.accentBlue },
    { label: "Google Workspace", color: THEME.colors.accentIndigo },
    { label: "Hybrid Classrooms", color: THEME.colors.accentAmber },
    { label: "Continuous Diagnostics", color: THEME.colors.accentRose },
  ];

  return (
    <SceneTransitionWrapper durationInFrames={2100} transitionType="zoom-push" accentColor={THEME.colors.accentCyan}>
      <Background accentColor={THEME.colors.accentBlue}>
        {audioSrc && <Audio src={audioSrc} />}
        <SpeakerBadge speaker={speaker} role={emotion} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            transform: `scale(${cameraScale})`,
            transformOrigin: "center center",
            willChange: "transform",
          }}
        >
          {!showFinalBlock ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <span
                style={{
                  fontSize: "15px",
                  fontFamily: THEME.fonts.mono,
                  fontWeight: 700,
                  color: THEME.colors.accentCyan,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                The Layers of Responsibility
              </span>

              {stackedWords.map((item, idx) => {
                const spr = spring({
                  frame: frame - item.delay,
                  fps,
                  config: THEME.springs.snappy,
                });

                const opacity = interpolate(frame - item.delay, [0, 8], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                });

                return (
                  <div
                    key={idx}
                    style={{
                      transform: `translateY(${interpolate(spr, [0, 1], [60, 0])}px) scale(${interpolate(
                        spr,
                        [0, 1],
                        [0.9, 1]
                      )})`,
                      opacity,
                      padding: "10px 32px",
                      borderRadius: "14px",
                      backgroundColor: "rgba(18, 24, 38, 0.9)",
                      border: `1.5px solid ${item.color}55`,
                      boxShadow: `0 8px 25px rgba(0,0,0,0.5), 0 0 20px ${item.color}20`,
                      fontSize: "26px",
                      fontWeight: 900,
                      letterSpacing: "0.08em",
                      color: item.color,
                      textAlign: "center",
                      width: "480px",
                    }}
                  >
                    {item.text}
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "32px",
                transform: `scale(${finalSpring})`,
                willChange: "transform",
              }}
            >
              <TitleCard
                badge="The Convergence"
                badgeColor={THEME.colors.accentCyan}
                title="SYSTEM ADMINISTRATION"
                subtitle="It is not always about having the title. It is about total stewardship."
                highlightWords={["SYSTEM", "ADMINISTRATION"]}
              />

              {/* Glowing quote punchline with high-tech ShimmerSweep */}
              <div
                style={{
                  fontSize: "34px",
                  fontWeight: 900,
                  color: THEME.colors.textPrimary,
                  letterSpacing: "0.03em",
                  textAlign: "center",
                  maxWidth: "960px",
                  padding: "24px 48px",
                  borderRadius: "24px",
                  backgroundColor: "rgba(18, 26, 42, 0.95)",
                  border: `2px solid ${THEME.colors.accentCyan}`,
                  boxShadow: `0 20px 60px rgba(0,0,0,0.7), 0 0 50px ${THEME.colors.accentCyan}44`,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <ShimmerSweep period={90} color="rgba(56, 189, 248, 0.4)" />
                “IT WORKS BECAUSE SOMEONE MAKES SURE IT DOES.”
              </div>

              {/* Dynamic Floating Pillar Badges across the rest of the 2100 frames */}
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "14px", maxWidth: "900px" }}>
                {pillarPills.map((pill, pIdx) => {
                  const pillDelay = 470 + pIdx * 15;
                  const spr = spring({
                    frame: frame - pillDelay,
                    fps,
                    config: THEME.springs.bouncy,
                  });
                  const floatY = Math.sin((frame + pIdx * 25) / 18) * 6;

                  return (
                    <div
                      key={pIdx}
                      style={{
                        transform: `scale(${spr}) translateY(${floatY}px)`,
                        opacity: interpolate(frame - pillDelay, [0, 8], [0, 1], {
                          extrapolateLeft: "clamp",
                          extrapolateRight: "clamp",
                        }),
                        padding: "10px 22px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        border: `1px solid ${pill.color}66`,
                        color: pill.color,
                        fontSize: "13px",
                        fontFamily: THEME.fonts.mono,
                        fontWeight: 700,
                        boxShadow: `0 0 15px ${pill.color}22`,
                      }}
                    >
                      ✓ {pill.label}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </Background>
    </SceneTransitionWrapper>
  );
};
