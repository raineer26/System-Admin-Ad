import React from "react";
import { Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
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

  // Words sliding in one by one from the bottom, stacking into a structural block of text
  // Stacking words:
  // 1. WEBSITE
  // 2. SECURITY
  // 3. NETWORK
  // 4. USER ACCOUNTS
  // 5. EQUIPMENT
  // 6. TROUBLESHOOTING
  // 7. CLASSROOM TECHNOLOGY
  // Frames 380+: Rapid crossfade into glowing "SYSTEM ADMINISTRATION"

  const stackedWords = [
    { text: "WEBSITE", delay: 30, color: THEME.colors.accentCyan },
    { text: "SECURITY", delay: 80, color: THEME.colors.accentRose },
    { text: "NETWORK", delay: 130, color: THEME.colors.accentBlue },
    { text: "USER ACCOUNTS", delay: 180, color: THEME.colors.accentIndigo },
    { text: "EQUIPMENT", delay: 230, color: THEME.colors.accentEmerald },
    { text: "TROUBLESHOOTING", delay: 280, color: THEME.colors.accentAmber },
    { text: "CLASSROOM TECHNOLOGY", delay: 330, color: THEME.colors.accentCyan },
  ];

  const showFinalBlock = frame >= 450;

  return (
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
              gap: "28px",
              animation: "none",
            }}
          >
            <TitleCard
              badge="The Convergence"
              badgeColor={THEME.colors.accentCyan}
              title="SYSTEM ADMINISTRATION"
              subtitle="It is not always about having the title. It is about total responsibility."
              highlightWords={["SYSTEM", "ADMINISTRATION"]}
            />

            {/* Glowing quote punchline */}
            <div
              style={{
                fontSize: "32px",
                fontWeight: 800,
                color: THEME.colors.textPrimary,
                letterSpacing: "0.02em",
                textAlign: "center",
                maxWidth: "900px",
                padding: "20px 40px",
                borderRadius: "20px",
                backgroundColor: "rgba(56, 189, 248, 0.12)",
                border: `1.5px solid ${THEME.colors.accentCyan}66`,
                boxShadow: `0 0 40px ${THEME.colors.accentCyan}33`,
              }}
            >
              “IT WORKS BECAUSE SOMEONE MAKES SURE IT DOES.”
            </div>
          </div>
        )}
      </div>
    </Background>
  );
};
