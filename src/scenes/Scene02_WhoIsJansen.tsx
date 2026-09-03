import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { QuoteBlock } from "../components/QuoteBlock";
import { TitleCard } from "../components/TitleCard";
import { THEME } from "../styles/theme";
import { Globe, Palette, LifeBuoy, Clock } from "lucide-react";

export const Scene02_WhoIsJansen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showQuote = frame < 360;

  const roles = [
    { title: "WEBMASTER", desc: "Website design, infrastructure & uptime", icon: Globe, color: THEME.colors.accentCyan },
    { title: "GRAPHIC DESIGNER", desc: "Visual communications & branding", icon: Palette, color: THEME.colors.accentIndigo },
    { title: "TECH SUPPORT", desc: "Office hardware, troubleshooting & users", icon: LifeBuoy, color: THEME.colors.accentEmerald },
  ];

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
      {/* Background B-Roll with dark film overlay */}
      <Img
        src={staticFile("images/workstation_broll.jpg")}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(0.35) saturate(1.1) contrast(1.1)",
          transform: `scale(${interpolate(frame, [0, 720], [1.02, 1.08])})`,
        }}
      />

      <Background accentColor={THEME.colors.accentBlue} gridOpacity={0.04} glowIntensity={0.25}>
        {showQuote ? (
          <QuoteBlock
            quote="My name is Jansen Lee. I'm a webmaster, quote-unquote, and graphic designer."
            author="Jansen Lee"
            role="Webmaster & Graphic Designer, BSOP"
            accentColor={THEME.colors.accentCyan}
          />
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "36px",
            }}
          >
            <TitleCard
              badge="7–8 Years at BSOP"
              badgeColor={THEME.colors.accentEmerald}
              title="ONE TITLE. THREE WORLDS."
              subtitle="While not titled 'system administrator', his daily work lives at the heart of BSOP's infrastructure."
              highlightWords={["THREE", "WORLDS."]}
            />

            {/* 3 Pillars */}
            <div style={{ display: "flex", gap: "24px" }}>
              {roles.map((role, idx) => {
                const itemDelay = 380 + idx * 15;
                const spr = spring({
                  frame: frame - itemDelay,
                  fps,
                  config: THEME.springs.smooth,
                });
                const Icon = role.icon;

                return (
                  <div
                    key={idx}
                    style={{
                      transform: `scale(${interpolate(spr, [0, 1], [0.85, 1])}) translateY(${interpolate(
                        spr,
                        [0, 1],
                        [30, 0]
                      )}px)`,
                      opacity: interpolate(frame - itemDelay, [0, 12], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                      }),
                      backgroundColor: "rgba(15, 23, 42, 0.85)",
                      border: `1px solid ${role.color}44`,
                      borderRadius: "24px",
                      padding: "32px 28px",
                      width: "300px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      backdropFilter: "blur(16px)",
                      boxShadow: `0 20px 40px rgba(0,0,0,0.6), 0 0 30px ${role.color}22`,
                    }}
                  >
                    <div
                      style={{
                        width: "64px",
                        height: "64px",
                        borderRadius: "18px",
                        backgroundColor: `${role.color}20`,
                        border: `1.5px solid ${role.color}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "18px",
                        boxShadow: `0 0 20px ${role.color}44`,
                      }}
                    >
                      <Icon size={32} color={role.color} />
                    </div>

                    <h3
                      style={{
                        fontSize: "20px",
                        fontWeight: 800,
                        color: THEME.colors.textPrimary,
                        marginBottom: "8px",
                      }}
                    >
                      {role.title}
                    </h3>

                    <p
                      style={{
                        fontSize: "14px",
                        color: THEME.colors.textSecondary,
                        margin: 0,
                        lineHeight: 1.4,
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
