import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { QuoteBlock } from "../components/QuoteBlock";
import { TitleCard } from "../components/TitleCard";
import { THEME } from "../styles/theme";
import { Globe, Palette, LifeBuoy, Code, Layout, Terminal } from "lucide-react";

export const Scene02_WhoIsJansen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showQuote = frame < 540;

  // Continuous cinematic pan across digital workspace
  const panX = interpolate(frame, [0, 1200], [80, -120], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cameraScale = interpolate(frame, [0, 1200], [1.02, 1.09]);

  const roles = [
    { title: "WEBMASTER", desc: "Website design, infrastructure & uptime", icon: Globe, color: THEME.colors.accentCyan },
    { title: "GRAPHIC DESIGNER", desc: "Visual communications & branding", icon: Palette, color: THEME.colors.accentIndigo },
    { title: "TECH SUPPORT", desc: "Office hardware, troubleshooting & users", icon: LifeBuoy, color: THEME.colors.accentEmerald },
  ];

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
      {/* Background B-Roll with continuous slow pan & zoom */}
      <Img
        src={staticFile("images/workstation_broll.jpg")}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "115%",
          height: "115%",
          objectFit: "cover",
          filter: "brightness(0.32) saturate(1.1) contrast(1.1)",
          transform: `scale(${cameraScale}) translateX(${panX * 0.4}px)`,
        }}
      />

      <Background accentColor={THEME.colors.accentBlue} gridOpacity={0.04} glowIntensity={0.25}>
        {showQuote ? (
          <div
            style={{
              transform: `translateX(${panX * 0.6}px)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            <QuoteBlock
              quote="My name is Jansen Lee. I'm a webmaster, quote-unquote, and graphic designer."
              author="Jansen Lee"
              role="Webmaster & Graphic Designer, BSOP"
              accentColor={THEME.colors.accentCyan}
            />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "36px",
              transform: `scale(${cameraScale}) translateX(${panX}px)`,
              willChange: "transform",
            }}
          >
            <TitleCard
              badge="7–8 Years of Stewardship"
              badgeColor={THEME.colors.accentEmerald}
              title="THE DUAL WORLDS OF CODE & DESIGN"
              subtitle="Jansen isn't officially titled 'system administrator', but his responsibilities lie at the heart of BSOP's infrastructure."
              highlightWords={["CODE", "&", "DESIGN"]}
            />

            {/* Floating Glassmorphic Panels */}
            <div style={{ display: "flex", gap: "28px" }}>
              {roles.map((role, idx) => {
                const itemDelay = 560 + idx * 18;
                const spr = spring({
                  frame: frame - itemDelay,
                  fps,
                  config: THEME.springs.smooth,
                });
                const Icon = role.icon;

                // Subtle organic vertical float
                const floatY = Math.sin((frame + idx * 25) / 18) * 8;

                return (
                  <div
                    key={idx}
                    style={{
                      transform: `scale(${interpolate(spr, [0, 1], [0.85, 1])}) translateY(${interpolate(
                        spr,
                        [0, 1],
                        [30, 0]
                      ) + floatY}px)`,
                      opacity: interpolate(frame - itemDelay, [0, 12], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                      }),
                      backgroundColor: "rgba(15, 23, 42, 0.82)",
                      border: `1px solid ${role.color}44`,
                      borderRadius: "24px",
                      padding: "36px 30px",
                      width: "310px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      backdropFilter: "blur(20px)",
                      boxShadow: `0 20px 45px rgba(0,0,0,0.6), 0 0 35px ${role.color}20`,
                    }}
                  >
                    <div
                      style={{
                        width: "68px",
                        height: "68px",
                        borderRadius: "20px",
                        backgroundColor: `${role.color}18`,
                        border: `1.5px solid ${role.color}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "20px",
                        boxShadow: `0 0 25px ${role.color}44`,
                      }}
                    >
                      <Icon size={34} color={role.color} />
                    </div>

                    <h3
                      style={{
                        fontSize: "21px",
                        fontWeight: 800,
                        letterSpacing: "0.04em",
                        color: THEME.colors.textPrimary,
                        marginBottom: "10px",
                      }}
                    >
                      {role.title}
                    </h3>

                    <p
                      style={{
                        fontSize: "14px",
                        color: THEME.colors.textSecondary,
                        margin: 0,
                        lineHeight: 1.45,
                      }}
                    >
                      {role.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Background>
    </div>
  );
};
