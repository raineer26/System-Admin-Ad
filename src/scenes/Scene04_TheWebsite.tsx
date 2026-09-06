import React from "react";
import { Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { GlassCard } from "../components/GlassCard";
import { GlitchEffect } from "../components/GlitchEffect";
import { SceneTransitionWrapper } from "../components/SceneTransitionWrapper";
import { ShimmerSweep } from "../components/ShimmerSweep";
import { SpeakerBadge } from "../components/SpeakerBadge";
import { StatCounterBadge } from "../components/StatCounterBadge";
import { TitleCard } from "../components/TitleCard";
import { THEME } from "../styles/theme";
import { ShieldAlert, RefreshCw, Layers, Edit3, ShieldCheck, Lock, BookOpen, Database, Activity, CheckCircle } from "lucide-react";

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
    <SceneTransitionWrapper durationInFrames={2400} transitionType="zoom-push" accentColor={THEME.colors.accentCyan}>
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
                  const floatY = Math.sin((frame + idx * 20) / 18) * 6;

                  return (
                    <div
                      key={idx}
                      style={{
                        transform: `scale(${spr}) translateY(${floatY}px)`,
                        opacity: interpolate(frame - idx * 22, [0, 10], [0, 1], {
                          extrapolateLeft: "clamp",
                          extrapolateRight: "clamp",
                        }),
                        backgroundColor: THEME.colors.bgCard,
                        border: `1px solid ${THEME.colors.borderGlass}`,
                        borderRadius: "24px",
                        padding: "32px 24px",
                        width: "220px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <ShimmerSweep delay={idx * 25} period={100} color={`${item.color}33`} />
                      <div
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "18px",
                          backgroundColor: `${item.color}18`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: "16px",
                        }}
                      >
                        <Icon size={30} color={item.color} />
                      </div>
                      <h4 style={{ fontSize: "16px", fontWeight: 800, color: THEME.colors.textPrimary, margin: "0 0 8px 0" }}>
                        {item.title}
                      </h4>
                      <p style={{ fontSize: "12px", color: THEME.colors.textSecondary, margin: 0, lineHeight: 1.4 }}>
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Phase 2: Security Breach Glitch */}
          {frame >= 550 && frame < 880 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "24px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "30px",
                  backgroundColor: `${THEME.colors.accentRose}22`,
                  border: `2px solid ${THEME.colors.accentRose}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 0 50px ${THEME.colors.accentRose}66`,
                }}
              >
                <ShieldAlert size={52} color={THEME.colors.accentRose} />
              </div>
              <h2
                style={{
                  fontSize: "44px",
                  fontWeight: 900,
                  fontFamily: THEME.fonts.heading,
                  color: THEME.colors.accentRose,
                  margin: 0,
                  textShadow: `0 0 30px ${THEME.colors.accentRose}`,
                }}
              >
                BREACH ATTEMPT DETECTED
              </h2>
              <p
                style={{
                  fontSize: "18px",
                  fontFamily: THEME.fonts.mono,
                  color: THEME.colors.textPrimary,
                  maxWidth: "680px",
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                "One time, my website got hacked... That's when I learned about security, permissions, and database recovery."
              </p>
            </div>
          )}

          {/* Phase 3: Continuous Ecosystem with WordPress, Koha OPAC, and Live Telemetry */}
          {frame >= 880 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "28px",
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

              {/* Dual Core Nodes: WordPress Web + Koha OPAC with dynamic float */}
              <div style={{ display: "flex", alignItems: "center", gap: "50px", marginTop: "20px" }}>
                {/* Node 1: WordPress */}
                <GlassCard
                  borderColor={THEME.colors.accentCyan}
                  glow
                  shimmer
                  style={{
                    width: "370px",
                    padding: "30px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    transform: `translateY(${Math.sin(frame / 20) * 8}px)`,
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
                  <span style={{ fontSize: "13px", color: THEME.colors.textSecondary, marginTop: "6px" }}>
                    WordPress Core · Managed Hosting · Content
                  </span>
                </GlassCard>

                {/* Connecting Bridge with active ping packet */}
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "13px",
                      fontFamily: THEME.fonts.mono,
                      fontWeight: 700,
                      color: THEME.colors.accentCyan,
                      padding: "8px 18px",
                      borderRadius: "999px",
                      backgroundColor: "rgba(56, 189, 248, 0.15)",
                      border: `1px solid ${THEME.colors.accentCyan}44`,
                      boxShadow: `0 0 20px ${THEME.colors.accentCyan}33`,
                    }}
                  >
                    CONNECTED SERVICES
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: THEME.colors.accentEmerald, fontSize: "12px", fontFamily: THEME.fonts.mono }}>
                    <Activity size={14} />
                    <span>SYNCHRONIZED</span>
                  </div>
                </div>

                {/* Node 2: Koha OPAC */}
                <GlassCard
                  borderColor={THEME.colors.accentEmerald}
                  glow
                  shimmer
                  style={{
                    width: "370px",
                    padding: "30px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    transform: `translateY(${Math.sin((frame + 30) / 20) * 8}px)`,
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
                  <span style={{ fontSize: "13px", color: THEME.colors.textSecondary, marginTop: "6px" }}>
                    Library Catalog · Student Accounts · Research
                  </span>
                </GlassCard>
              </div>

              {/* Live Metric Badges */}
              <div style={{ display: "flex", gap: "24px", marginTop: "16px" }}>
                <StatCounterBadge
                  targetValue={99.9}
                  suffix="%"
                  label="Service Availability"
                  sublabel="Proactive health monitoring"
                  accentColor={THEME.colors.accentEmerald}
                  delayInFrames={920}
                />
                <StatCounterBadge
                  targetValue={1420}
                  suffix="+"
                  label="Threats Filtered"
                  sublabel="WAF & brute force blocks"
                  accentColor={THEME.colors.accentCyan}
                  delayInFrames={950}
                />
              </div>
            </div>
          )}
        </GlitchEffect>
      </Background>
    </SceneTransitionWrapper>
  );
};
