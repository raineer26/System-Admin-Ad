import React from "react";
import { Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { GlassCard } from "../components/GlassCard";
import { SpeakerBadge } from "../components/SpeakerBadge";
import { TitleCard } from "../components/TitleCard";
import { THEME } from "../styles/theme";
import { Search, BookOpen, Wrench, CheckCircle2, Code, Terminal } from "lucide-react";

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

  // 0 - 320: Massive search bar typing "how to fix projector no signal..." + overlapping popup windows
  // 320 - 1350: Kinetic flow "SEARCH. LEARN. TEST. FIX."

  const searchPrompt = "how to fix projector no signal w3schools...";
  const charsShown = Math.floor(
    interpolate(frame, [30, 260], [0, searchPrompt.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const currentText = searchPrompt.slice(0, charsShown);

  const cycleSteps = [
    { word: "SEARCH", subtitle: "Google & Querying", icon: Search, color: THEME.colors.accentCyan },
    { word: "LEARN", subtitle: "WordPress & W3Schools", icon: BookOpen, color: THEME.colors.accentBlue },
    { word: "TEST", subtitle: "Staging & Diagnostics", icon: Wrench, color: THEME.colors.accentAmber },
    { word: "FIX", subtitle: "Deployment & Verification", icon: CheckCircle2, color: THEME.colors.accentEmerald },
  ];

  return (
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
              width: "820px",
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

          {/* Overlapping Glassmorphism popup windows */}
          <div
            style={{
              position: "relative",
              width: "900px",
              height: "280px",
            }}
          >
            {/* Popup 1: Google Results */}
            {frame > 180 && (
              <GlassCard
                borderColor={THEME.colors.accentBlue}
                glow
                style={{
                  position: "absolute",
                  left: "20px",
                  top: "20px",
                  width: "480px",
                  padding: "24px",
                  transform: `scale(${spring({
                    frame: frame - 180,
                    fps,
                    config: THEME.springs.bouncy,
                  })})`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <Search size={18} color={THEME.colors.accentCyan} />
                  <span style={{ fontSize: "14px", fontWeight: 700, color: THEME.colors.accentCyan }}>
                    Google Search Result
                  </span>
                </div>
                <div style={{ fontSize: "16px", fontWeight: 600, color: THEME.colors.textPrimary }}>
                  EDID Handshake & HDCP troubleshooting guide
                </div>
                <div style={{ fontSize: "13px", color: THEME.colors.textSecondary, marginTop: "4px" }}>
                  Verify HDMI splitters and switch input matrix...
                </div>
              </GlassCard>
            )}

            {/* Popup 2: W3Schools Reference */}
            {frame > 280 && (
              <GlassCard
                borderColor={THEME.colors.accentEmerald}
                glow
                style={{
                  position: "absolute",
                  right: "40px",
                  top: "60px",
                  width: "460px",
                  padding: "24px",
                  zIndex: 2,
                  transform: `scale(${spring({
                    frame: frame - 280,
                    fps,
                    config: THEME.springs.bouncy,
                  })})`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <Code size={18} color={THEME.colors.accentEmerald} />
                  <span style={{ fontSize: "14px", fontWeight: 700, color: THEME.colors.accentEmerald }}>
                    W3Schools & WordPress Docs
                  </span>
                </div>
                <div style={{ fontSize: "15px", fontWeight: 600, color: THEME.colors.textPrimary }}>
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
            gap: "40px",
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

          {/* 4 Loop Steps */}
          <div style={{ display: "flex", gap: "24px" }}>
            {cycleSteps.map((step, idx) => {
              const stepDelay = 340 + idx * 18;
              const spr = spring({
                frame: frame - stepDelay,
                fps,
                config: THEME.springs.bouncy,
              });
              const Icon = step.icon;

              return (
                <div
                  key={idx}
                  style={{
                    transform: `scale(${interpolate(spr, [0, 1], [0.8, 1])})`,
                    opacity: interpolate(frame - stepDelay, [0, 10], [0, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }),
                    backgroundColor: "rgba(18, 24, 38, 0.9)",
                    border: `1.5px solid ${step.color}55`,
                    borderRadius: "24px",
                    padding: "36px 32px",
                    width: "240px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    boxShadow: `0 20px 40px rgba(0,0,0,0.6), 0 0 30px ${step.color}22`,
                  }}
                >
                  <div
                    style={{
                      width: "68px",
                      height: "68px",
                      borderRadius: "20px",
                      backgroundColor: `${step.color}20`,
                      border: `1px solid ${step.color}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "18px",
                      boxShadow: `0 0 20px ${step.color}44`,
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
        </div>
      )}
    </Background>
  );
};
