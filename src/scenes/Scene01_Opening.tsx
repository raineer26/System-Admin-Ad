import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { GlitchEffect } from "../components/GlitchEffect";
import { TitleCard } from "../components/TitleCard";
import { THEME } from "../styles/theme";
import { Wifi, Globe, Mail, Projector, Printer, Terminal, MousePointer2, CheckCircle } from "lucide-react";

export const Scene01_Opening: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 0 - 280: Camera slowly scales up on dashboard (1.0 -> 1.15)
  // 180 - 260: Cursor moves to button and clicks at frame 260
  // 260 - 340: Sudden red glitch and UI fracture
  // 340 - 420: Massive Z-axis zoom pushing through into pure black void (scale 1.15 -> 6.0, opacity 1 -> 0)
  // 420 - 580: "WHO KEEPS IT RUNNING?"
  // 580 - 740: "THE PERSON BEHIND THE SYSTEM."
  // 740 - 900: "MEET JANSEN LEE"

  const pushInScale = interpolate(frame, [0, 280], [1.0, 1.15], {
    extrapolateRight: "clamp",
  });

  const cursorX = interpolate(frame, [140, 255], [200, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cursorY = interpolate(frame, [140, 255], [180, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const isClicked = frame >= 258;

  const isGlitch = frame >= 260 && frame <= 340;
  
  // Z-Axis punch-through zoom into black void
  const zZoom = interpolate(frame, [340, 415], [1.15, 6.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const uiOpacity = interpolate(frame, [360, 415], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const normalItems = [
    { label: "Wi-Fi Connected", icon: Wifi, color: THEME.colors.accentCyan },
    { label: "Website Online", icon: Globe, color: THEME.colors.accentBlue },
    { label: "Email Sent", icon: Mail, color: THEME.colors.accentIndigo },
    { label: "Projector Active", icon: Projector, color: THEME.colors.accentEmerald },
    { label: "Printer Ready", icon: Printer, color: THEME.colors.accentAmber },
  ];

  return (
    <Background accentColor={frame > 150 && frame < 370 ? THEME.colors.glitchRed : THEME.colors.accentCyan}>
      {/* Pristine Dashboard UI with push-in, cursor click, and Z-axis punch-through */}
      {frame < 420 && (
        <div
          style={{
            transform: `scale(${frame >= 340 ? zZoom : pushInScale})`,
            opacity: uiOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "32px",
            transformOrigin: "center center",
            willChange: "transform, opacity",
          }}
        >
          <GlitchEffect active={isGlitch} intensity={2.2}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "36px",
              }}
            >
              {/* Terminal status bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "10px 24px",
                  borderRadius: "999px",
                  backgroundColor: "rgba(18, 24, 38, 0.9)",
                  border: `1px solid ${isGlitch ? THEME.colors.glitchRed : THEME.colors.borderGlass}`,
                  fontFamily: THEME.fonts.mono,
                  fontSize: "14px",
                  color: isGlitch ? THEME.colors.glitchRed : THEME.colors.accentCyan,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                }}
              >
                <Terminal size={18} />
                <span>bsop-systems.local --status check</span>
                <span
                  style={{
                    display: "inline-block",
                    width: "8px",
                    height: "16px",
                    backgroundColor: isGlitch ? THEME.colors.glitchRed : THEME.colors.accentCyan,
                    opacity: Math.sin(frame / 4) > 0 ? 1 : 0,
                  }}
                />
              </div>

              {/* Functional Dashboard items */}
              <div style={{ display: "flex", gap: "22px" }}>
                {normalItems.map((item, idx) => {
                  const itemDelay = idx * 10;
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
                        backgroundColor: "rgba(18, 24, 38, 0.85)",
                        border: `1px solid ${isGlitch ? THEME.colors.glitchRed : item.color}44`,
                        borderRadius: "20px",
                        padding: "26px 22px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "14px",
                        width: "165px",
                        backdropFilter: "blur(12px)",
                      }}
                    >
                      <div
                        style={{
                          width: "52px",
                          height: "52px",
                          borderRadius: "16px",
                          backgroundColor: `${item.color}15`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Icon size={28} color={item.color} />
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

              {/* Status Action Button with animated SVG cursor click */}
              <div
                style={{
                  position: "relative",
                  marginTop: "8px",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "12px 28px",
                    borderRadius: "14px",
                    backgroundColor: isClicked ? THEME.colors.accentRose : THEME.colors.accentEmerald,
                    color: "#FFF",
                    fontSize: "15px",
                    fontWeight: 700,
                    boxShadow: isClicked
                      ? `0 0 40px ${THEME.colors.glitchRed}`
                      : `0 0 25px ${THEME.colors.accentEmerald}55`,
                    transform: isClicked ? "scale(0.95)" : "scale(1)",
                  }}
                >
                  <CheckCircle size={18} />
                  <span>{isGlitch ? "SYSTEM FAULT" : "All Systems Verified"}</span>
                </div>

                {/* Animated Mouse Cursor */}
                {frame < 300 && (
                  <div
                    style={{
                      position: "absolute",
                      right: `${-20 + cursorX}px`,
                      bottom: `${-20 + cursorY}px`,
                      pointerEvents: "none",
                      filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.7))",
                      transform: isClicked ? "scale(0.85)" : "scale(1)",
                      transition: "transform 0.1s ease",
                      zIndex: 30,
                    }}
                  >
                    <MousePointer2 size={32} color="#FFF" fill="#38BDF8" />
                  </div>
                )}
              </div>

              {isGlitch && (
                <div
                  style={{
                    color: THEME.colors.glitchRed,
                    fontSize: "26px",
                    fontFamily: THEME.fonts.mono,
                    fontWeight: 900,
                    letterSpacing: "0.2em",
                    textShadow: `0 0 25px ${THEME.colors.glitchRed}`,
                  }}
                >
                  ⚠ CRITICAL SYSTEM FRACTURE
                </div>
              )}
            </div>
          </GlitchEffect>
        </div>
      )}

      {/* Kinetic Typography Phase */}
      {frame >= 420 && frame < 580 && (
        <TitleCard
          badge="The Question"
          badgeColor={THEME.colors.accentRose}
          title="WHO KEEPS IT RUNNING?"
          subtitle="Every organization depends on technology. Most of the time, we simply expect everything to work."
          highlightWords={["WHO", "RUNNING?"]}
        />
      )}

      {frame >= 580 && frame < 740 && (
        <TitleCard
          badge="The Reality"
          badgeColor={THEME.colors.accentCyan}
          title="THE PERSON BEHIND THE SYSTEM."
          subtitle="Behind those systems is someone making sure they do, every single hour of every single day."
          highlightWords={["PERSON", "BEHIND", "SYSTEM."]}
        />
      )}

      {frame >= 740 && (
        <TitleCard
          badge="Documentary Spotlight"
          badgeColor={THEME.colors.accentEmerald}
          title="MEET JANSEN LEE"
          subtitle="Webmaster · Graphic Designer · IT Support"
          highlightWords={["JANSEN", "LEE"]}
        />
      )}
    </Background>
  );
};
