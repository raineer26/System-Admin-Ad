import React from "react";
import { Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { GlassCard } from "../components/GlassCard";
import { GlitchEffect } from "../components/GlitchEffect";
import { SpeakerBadge } from "../components/SpeakerBadge";
import { TitleCard } from "../components/TitleCard";
import { THEME } from "../styles/theme";
import { ShieldAlert, RefreshCw, Layers, Edit3, ShieldCheck, Lock, BookOpen, Database } from "lucide-react";

export interface Scene04Props {
  audioSrc?: string;
  speaker?: string;
  emotion?: string;
}

export const Scene04_TheWebsite: React.FC<Scene04Props> = ({
  audioSrc = staticFile("audio/dubbing/scene_04_the_website_raineer.wav"),
  speaker = "Raineer Rosado",
  emotion = "Urgent & Resilient",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 0 - 550: WordPress dashboard UI built component-by-component
  // 550 - 880: Rapid red flash & shattered padlock security alert ("One time, my website got hacked")
  // 880 - 1500: Continuous zoom-out revealing WordPress + Koha OPAC library system node

  const isGlitch = frame >= 560 && frame <= 720;
  const isRedFlash = (frame >= 560 && frame <= 565) || (frame >= 600 && frame <= 604);

  // Continuous zoom out in phase 3
  const zoomOut = interpolate(frame, [880, 1500], [1.0, 0.72], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const websitePillars = [
    { title: "MAINTENANCE", desc: "Core stability, automated backups & MySQL health", icon: RefreshCw, color: THEME.colors.accentCyan },
    { title: "UPDATES", desc: "WordPress engine, plugins & security patches", icon: Layers, color: THEME.colors.accentBlue },
    { title: "SECURITY", desc: "Firewall rules, brute-force mitigation & SSL", icon: ShieldCheck, color: THEME.colors.accentEmerald },
    { title: "CONTENT", desc: "Academic announcements, faculty directory & forms", icon: Edit3, color: THEME.colors.accentAmber },
  ];

  return (
    <Background accentColor={isGlitch ? THEME.colors.accentRose : THEME.colors.accentBlue}>
      {audioSrc && <Audio src={audioSrc} />}
      <SpeakerBadge speaker={speaker} role={emotion} />
      {/* Red screen flash overlay on hack mention */}
      {isRedFlash && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 0, 85, 0.45)",
            mixBlendMode: "screen",
            zIndex: 50,
            pointerEvents: "none",
          }}
        />
      )}

      <GlitchEffect active={isGlitch} intensity={2.0}>
        {/* Phase 1: WordPress Dashboard Components */}
        {frame < 550 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "36px",
              transform: `scale(${interpolate(frame, [0, 550], [0.98, 1.05])})`,
            }}
          >
            <TitleCard
              badge="01 — The Website & Services"
              badgeColor={THEME.colors.accentCyan}
              title="MORE THAN JUST PAGES ON A SCREEN"
              subtitle="A website isn't simply something you build and forget. It requires active stewardship."
              highlightWords={["MORE", "JUST", "PAGES"]}
            />

            {/* 4 Pillars built component by component */}
            <div style={{ display: "flex", gap: "20px" }}>
              {websitePillars.map((item, idx) => {
                const spr = spring({
                  frame: frame - idx * 22,
                  fps,
                  config: THEME.springs.smooth,
                });
                const Icon = item.icon;

                return (
                  <div
                    key={idx}
                    style={{
                      transform: `scale(${interpolate(spr, [0, 1], [0.8, 1])}) translateY(${interpolate(
                        spr,
                        [0, 1],
                        [30, 0]
                      )}px)`,
                      opacity: interpolate(frame - idx * 22, [0, 12], [0, 1], {
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
                      backdropFilter: "blur(12px)",
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

        {/* Phase 2: Security Alert & Shattered Padlock */}
        {frame >= 550 && frame < 880 && (
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
                maxWidth: "840px",
              }}
            >
              {/* Shattered padlock icon */}
              <div
                style={{
                  position: "relative",
                  width: "90px",
                  height: "90px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    width: "84px",
                    height: "84px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(244, 63, 94, 0.25)",
                    border: `2px solid ${THEME.colors.accentRose}`,
                    boxShadow: `0 0 40px ${THEME.colors.accentRose}77`,
                  }}
                />
                <ShieldAlert size={50} color={THEME.colors.accentRose} style={{ zIndex: 2 }} />
              </div>

              <div
                style={{
                  fontSize: "15px",
                  fontFamily: THEME.fonts.mono,
                  fontWeight: 800,
                  color: THEME.colors.accentRose,
                  letterSpacing: "0.15em",
                  marginBottom: "12px",
                }}
              >
                SECURITY INCIDENT DETECTED
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

              <div style={{ fontSize: "15px", color: THEME.colors.textSecondary }}>
                — Jansen Lee on website maintenance & threat recovery
              </div>
            </GlassCard>
          </div>
        )}

        {/* Phase 3: Continuous Zoom-Out revealing Koha OPAC & Network Hub */}
        {frame >= 880 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transform: `scale(${zoomOut})`,
              transformOrigin: "center center",
              willChange: "transform",
            }}
          >
            <TitleCard
              badge="Integrated Digital Ecosystem"
              badgeColor={THEME.colors.accentCyan}
              title="WHEN THE WEBSITE GOES DOWN, THE WORK DOESN'T STOP."
              subtitle="Beyond public websites, Jansen helps maintain the BSOP Koha OPAC library system for faculty and student research."
              highlightWords={["GOES", "DOWN,", "DOESN'T", "STOP."]}
            />

            {/* Dual Core Nodes: WordPress Web + Koha OPAC */}
            <div style={{ display: "flex", alignItems: "center", gap: "60px", marginTop: "40px" }}>
              {/* Node 1: WordPress */}
              <GlassCard
                borderColor={THEME.colors.accentCyan}
                glow
                style={{
                  width: "380px",
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "18px",
                    backgroundColor: `${THEME.colors.accentCyan}20`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "16px",
                  }}
                >
                  <RefreshCw size={32} color={THEME.colors.accentCyan} />
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: 800, color: THEME.colors.textPrimary }}>
                  BSOP Main Website
                </h3>
                <span style={{ fontSize: "14px", color: THEME.colors.textSecondary, marginTop: "6px" }}>
                  WordPress Core · Managed Hosting · Content
                </span>
              </GlassCard>

              {/* Connecting Bridge */}
              <div
                style={{
                  fontSize: "14px",
                  fontFamily: THEME.fonts.mono,
                  fontWeight: 700,
                  color: THEME.colors.accentCyan,
                  padding: "8px 16px",
                  borderRadius: "999px",
                  backgroundColor: "rgba(56, 189, 248, 0.15)",
                  border: `1px solid ${THEME.colors.accentCyan}44`,
                }}
              >
                CONNECTED SERVICES
              </div>

              {/* Node 2: Koha OPAC (New in Script v2!) */}
              <GlassCard
                borderColor={THEME.colors.accentEmerald}
                glow
                style={{
                  width: "380px",
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "18px",
                    backgroundColor: `${THEME.colors.accentEmerald}20`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "16px",
                  }}
                >
                  <BookOpen size={32} color={THEME.colors.accentEmerald} />
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: 800, color: THEME.colors.textPrimary }}>
                  Koha OPAC Library System
                </h3>
                <span style={{ fontSize: "14px", color: THEME.colors.textSecondary, marginTop: "6px" }}>
                  Library Catalog · Student Accounts · Resource Access
                </span>
              </GlassCard>
            </div>
          </div>
        )}
      </GlitchEffect>
    </Background>
  );
};
