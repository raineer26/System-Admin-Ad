import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { GlassCard } from "../components/GlassCard";
import { GlitchEffect } from "../components/GlitchEffect";
import { TitleCard } from "../components/TitleCard";
import { THEME } from "../styles/theme";
import { ShieldAlert, RefreshCw, Layers, Edit3, ShieldCheck } from "lucide-react";

export const Scene04_TheWebsite: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 0 - 320: 4 Website pillars
  // 320 - 520: Security breach / glitch alert
  // 520 - 780: Resolution & "WHEN THE WEBSITE GOES DOWN, THE WORK DOESN'T STOP."

  const isGlitch = frame >= 320 && frame <= 440;
  const isSecurityAlert = frame >= 330 && frame <= 500;

  const websitePillars = [
    { title: "MAINTENANCE", desc: "Server health, backups & database integrity", icon: RefreshCw, color: THEME.colors.accentCyan },
    { title: "UPDATES", desc: "WordPress core, PHP versions & security patches", icon: Layers, color: THEME.colors.accentBlue },
    { title: "SECURITY", desc: "Firewall rules, brute-force mitigation & SSL", icon: ShieldCheck, color: THEME.colors.accentEmerald },
    { title: "CONTENT", desc: "Publishing announcements, forms & faculty pages", icon: Edit3, color: THEME.colors.accentAmber },
  ];

  return (
    <Background accentColor={isSecurityAlert ? THEME.colors.accentRose : THEME.colors.accentBlue}>
      <GlitchEffect active={isGlitch} intensity={1.8}>
        {frame < 320 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "36px",
            }}
          >
            <TitleCard
              badge="01 — The Website"
              badgeColor={THEME.colors.accentCyan}
              title="MORE THAN JUST PAGES ON A SCREEN"
              subtitle="A website isn't built and forgotten. It lives, breathes, and demands relentless stewardship."
              highlightWords={["MORE", "JUST", "PAGES"]}
            />

            {/* 4 Pillars */}
            <div style={{ display: "flex", gap: "20px" }}>
              {websitePillars.map((item, idx) => {
                const spr = spring({
                  frame: frame - idx * 15,
                  fps,
                  config: THEME.springs.smooth,
                });
                const Icon = item.icon;

                return (
                  <div
                    key={idx}
                    style={{
                      transform: `scale(${interpolate(spr, [0, 1], [0.85, 1])})`,
                      opacity: interpolate(frame - idx * 15, [0, 12], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                      }),
                      backgroundColor: "rgba(18, 24, 38, 0.85)",
                      border: `1px solid ${item.color}44`,
                      borderRadius: "20px",
                      padding: "28px 24px",
                      width: "260px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      boxShadow: `0 15px 35px rgba(0,0,0,0.5), 0 0 20px ${item.color}15`,
                    }}
                  >
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "16px",
                        backgroundColor: `${item.color}20`,
                        border: `1.5px solid ${item.color}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "16px",
                      }}
                    >
                      <Icon size={28} color={item.color} />
                    </div>
                    <h3
                      style={{
                        fontSize: "18px",
                        fontWeight: 800,
                        color: THEME.colors.textPrimary,
                        marginBottom: "6px",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p style={{ fontSize: "13px", color: THEME.colors.textSecondary, margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Security Incident phase */}
        {frame >= 320 && frame < 520 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "28px",
            }}
          >
            <GlassCard
              borderColor={THEME.colors.accentRose}
              glow
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "48px 64px",
                textAlign: "center",
                maxWidth: "800px",
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(244, 63, 94, 0.2)",
                  border: `2px solid ${THEME.colors.accentRose}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                  boxShadow: `0 0 30px ${THEME.colors.accentRose}66`,
                }}
              >
                <ShieldAlert size={48} color={THEME.colors.accentRose} />
              </div>

              <div
                style={{
                  fontSize: "15px",
                  fontFamily: THEME.fonts.mono,
                  fontWeight: 800,
                  color: THEME.colors.accentRose,
                  letterSpacing: "0.15em",
                  marginBottom: "8px",
                }}
              >
                SECURITY THREAT DETECTED
              </div>

              <div
                style={{
                  fontSize: "36px",
                  fontWeight: 600,
                  fontStyle: "italic",
                  color: THEME.colors.textPrimary,
                  lineHeight: 1.3,
                  marginBottom: "20px",
                }}
              >
                &ldquo;One time, my website got hacked.&rdquo;
              </div>

              <div
                style={{
                  fontSize: "15px",
                  color: THEME.colors.textSecondary,
                }}
              >
                — Jansen Lee on the reality of public-facing web infrastructure
              </div>
            </GlassCard>
          </div>
        )}

        {/* Resolution & Statement */}
        {frame >= 520 && (
          <TitleCard
            badge="The Reality"
            badgeColor={THEME.colors.accentCyan}
            title="WHEN THE WEBSITE GOES DOWN, THE WORK DOESN'T STOP."
            subtitle="Security audits, database restores, vulnerability patching, and constant monitoring keep the institution protected."
            highlightWords={["GOES", "DOWN,", "DOESN'T", "STOP."]}
          />
        )}
      </GlitchEffect>
    </Background>
  );
};
