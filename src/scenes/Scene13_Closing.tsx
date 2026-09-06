import React from "react";
import { Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { SceneTransitionWrapper } from "../components/SceneTransitionWrapper";
import { ShimmerSweep } from "../components/ShimmerSweep";
import { SpeakerBadge } from "../components/SpeakerBadge";
import { TitleCard } from "../components/TitleCard";
import { THEME } from "../styles/theme";
import { Wifi, Globe, Settings, Heart, Award, Sparkles } from "lucide-react";

export interface Scene13Props {
  audioSrc?: string;
  speaker?: string;
  emotion?: string;
}

export const Scene13_Closing: React.FC<Scene13Props> = ({
  audioSrc = staticFile("audio/dubbing/scene_13_closing_deign.wav"),
  speaker = "Deign Lazaro",
  emotion = "Poignant Tribute",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase timings across the full 1290 frames:
  // 0 - 240: Minimal UI icons
  // 240 - 650: Jansen Lee Tribute Card
  // 650 - 1290: Final Master Title & Credits
  // Fade out to black only at the VERY END: [1230, 1290]

  const fadeOutEnd = interpolate(frame, [1230, 1290], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cameraScale = interpolate(frame, [0, 1290], [0.98, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneTransitionWrapper durationInFrames={1290} transitionType="zoom-push" accentColor={THEME.colors.accentCyan}>
      <div style={{ width: "100%", height: "100%", opacity: fadeOutEnd }}>
        {audioSrc && <Audio src={audioSrc} />}
        <SpeakerBadge speaker={speaker} role={emotion} />
        <Background accentColor={THEME.colors.accentCyan} gridOpacity={0.04}>
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
            {/* Phase 1: Minimalist UI Icons */}
            {frame < 240 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "36px",
                  opacity: interpolate(frame, [0, 20, 220, 240], [0, 1, 1, 0], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
                  {[
                    { icon: Wifi, color: THEME.colors.accentCyan, label: "Connected" },
                    { icon: Globe, color: THEME.colors.accentBlue, label: "Online" },
                    { icon: Settings, color: THEME.colors.accentEmerald, label: "Maintained" },
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    const floatY = Math.sin((frame + idx * 25) / 16) * 6;

                    return (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "12px",
                          transform: `translateY(${floatY}px)`,
                        }}
                      >
                        <div
                          style={{
                            width: "84px",
                            height: "84px",
                            borderRadius: "26px",
                            backgroundColor: "rgba(18, 24, 38, 0.9)",
                            border: `1.5px solid ${item.color}66`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: `0 0 35px ${item.color}33`,
                          }}
                        >
                          <Icon size={40} color={item.color} />
                        </div>
                        <span style={{ fontSize: "13px", fontFamily: THEME.fonts.mono, color: item.color, fontWeight: 700 }}>
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Phase 2: Jansen Lee Tribute Card */}
            {frame >= 240 && frame < 650 && (
              <div
                style={{
                  opacity: interpolate(frame, [240, 265, 625, 650], [0, 1, 1, 0], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                  transform: `scale(${interpolate(frame, [240, 270], [0.92, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  })})`,
                }}
              >
                <TitleCard
                  badge="In Recognition Of"
                  badgeColor={THEME.colors.accentEmerald}
                  title="JANSEN LEE"
                  subtitle="Webmaster · Graphic Designer · IT Systems Support"
                  highlightWords={["JANSEN", "LEE"]}
                />

                <div
                  style={{
                    marginTop: "28px",
                    padding: "18px 36px",
                    borderRadius: "20px",
                    backgroundColor: "rgba(16, 185, 129, 0.12)",
                    border: `1px solid ${THEME.colors.accentEmerald}55`,
                    color: THEME.colors.textPrimary,
                    fontSize: "22px",
                    fontWeight: 700,
                    fontStyle: "italic",
                    textAlign: "center",
                    boxShadow: `0 0 30px ${THEME.colors.accentEmerald}22`,
                  }}
                >
                  “The work is often invisible. But the impact isn't.”
                </div>
              </div>
            )}

            {/* Phase 3: Final Branded Sign-Off */}
            {frame >= 650 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "28px",
                  opacity: interpolate(frame, [650, 680], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                  transform: `scale(${interpolate(frame, [650, 685], [0.93, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  })})`,
                }}
              >
                <TitleCard
                  badge="Behind The System"
                  badgeColor={THEME.colors.accentCyan}
                  title="SYSTEM ADMINISTRATION"
                  subtitle="Keeping people, technology, and systems connected every single day."
                  highlightWords={["SYSTEM", "ADMINISTRATION"]}
                />

                {/* Final Tribute Stamp */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "14px 32px",
                    borderRadius: "999px",
                    backgroundColor: "rgba(56, 189, 248, 0.12)",
                    border: `1.5px solid ${THEME.colors.accentCyan}55`,
                    boxShadow: `0 0 30px ${THEME.colors.accentCyan}33`,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <ShimmerSweep period={85} color="rgba(56, 189, 248, 0.35)" />
                  <Sparkles size={20} color={THEME.colors.accentCyan} />
                  <span style={{ fontSize: "15px", fontFamily: THEME.fonts.mono, fontWeight: 800, color: THEME.colors.textPrimary, letterSpacing: "1px" }}>
                    BSOP DIGITAL INFRASTRUCTURE · 2026
                  </span>
                </div>
              </div>
            )}
          </div>
        </Background>
      </div>
    </SceneTransitionWrapper>
  );
};
