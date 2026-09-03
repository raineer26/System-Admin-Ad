import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { GlitchEffect } from "../components/GlitchEffect";
import { TitleCard } from "../components/TitleCard";
import { THEME } from "../styles/theme";
import { Wifi, Globe, Mail, Projector, Printer, Terminal } from "lucide-react";

export const Scene01_Opening: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Normal operations (frames 0 - 180)
  // Phase 2: Glitch and freeze (frames 180 - 240)
  // Phase 3: "WHO KEEPS IT RUNNING?" (frames 240 - 360)
  // Phase 4: "THE SYSTEM ADMINISTRATOR." (frames 360 - 480)
  // Phase 5: "MEET JANSEN LEE" (frames 480 - 600)

  const isGlitch = frame >= 170 && frame <= 235;
  const isFrozen = frame > 235 && frame < 250;

  const normalItems = [
    { label: "Wi-Fi Connected", icon: Wifi, color: THEME.colors.accentCyan },
    { label: "Website Online", icon: Globe, color: THEME.colors.accentBlue },
    { label: "Email Sent", icon: Mail, color: THEME.colors.accentIndigo },
    { label: "Projector Active", icon: Projector, color: THEME.colors.accentEmerald },
    { label: "Printer Ready", icon: Printer, color: THEME.colors.accentAmber },
  ];

  return (
    <Background accentColor={frame > 180 && frame < 360 ? THEME.colors.glitchRed : THEME.colors.accentCyan}>
      <GlitchEffect active={isGlitch} intensity={1.5}>
        {/* Phase 1: Operational Grid */}
        {frame < 240 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "40px",
              opacity: isFrozen ? 0.4 : 1,
            }}
          >
            {/* Blinking cursor prompt */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "8px 20px",
                borderRadius: "999px",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: `1px solid ${THEME.colors.borderGlass}`,
                fontFamily: THEME.fonts.mono,
                fontSize: "14px",
                color: THEME.colors.accentCyan,
              }}
            >
              <Terminal size={18} />
              <span>bsop-systems.local --status check</span>
              <span
                style={{
                  display: "inline-block",
                  width: "8px",
                  height: "16px",
                  backgroundColor: THEME.colors.accentCyan,
                  opacity: Math.sin(frame / 4) > 0 ? 1 : 0,
                }}
              />
            </div>

            {/* Daily tech icons working normally */}
            <div style={{ display: "flex", gap: "24px" }}>
              {normalItems.map((item, idx) => {
                const itemDelay = idx * 12;
                const enter = spring({
                  frame: frame - itemDelay,
                  fps,
                  config: THEME.springs.smooth,
                });
                const Icon = item.icon;

                return (
                  <div
                    key={idx}
                    style={{
                      transform: `scale(${interpolate(enter, [0, 1], [0.8, 1])})`,
                      opacity: interpolate(frame - itemDelay, [0, 10], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                      }),
                      backgroundColor: "rgba(18, 24, 38, 0.8)",
                      border: `1px solid ${item.color}33`,
                      borderRadius: "18px",
                      padding: "24px 20px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "14px",
                      width: "160px",
                    }}
                  >
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "14px",
                        backgroundColor: `${item.color}15`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon size={26} color={item.color} />
                    </div>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: THEME.colors.textPrimary,
                        textAlign: "center",
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {isGlitch && (
              <div
                style={{
                  color: THEME.colors.glitchRed,
                  fontSize: "24px",
                  fontFamily: THEME.fonts.mono,
                  fontWeight: 900,
                  letterSpacing: "0.2em",
                }}
              >
                ⚠ CRITICAL SYSTEM HALT DETECTED
              </div>
            )}
          </div>
        )}

        {/* Phase 2: "WHO KEEPS IT RUNNING?" */}
        {frame >= 240 && frame < 360 && (
          <TitleCard
            badge="The Question"
            badgeColor={THEME.colors.accentRose}
            title="WHO KEEPS IT RUNNING?"
            subtitle="Every organization depends on technology. But behind it all is someone ensuring it works."
            highlightWords={["WHO", "RUNNING?"]}
          />
        )}

        {/* Phase 3: "THE SYSTEM ADMINISTRATOR" */}
        {frame >= 360 && frame < 480 && (
          <TitleCard
            badge="The Foundation"
            badgeColor={THEME.colors.accentCyan}
            title="THE SYSTEM ADMINISTRATOR."
            subtitle="Keeping the invisible gears turning, 24 hours a day, 7 days a week."
            highlightWords={["SYSTEM", "ADMINISTRATOR."]}
          />
        )}

        {/* Phase 4: "MEET JANSEN LEE" */}
        {frame >= 480 && (
          <TitleCard
            badge="Documentary Spotlight"
            badgeColor={THEME.colors.accentEmerald}
            title="MEET JANSEN LEE"
            subtitle="Webmaster · Graphic Designer · IT Support at BSOP"
            highlightWords={["JANSEN", "LEE"]}
          />
        )}
      </GlitchEffect>
    </Background>
  );
};
