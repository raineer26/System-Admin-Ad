import React from "react";
import { Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { QuoteBlock } from "../components/QuoteBlock";
import { SceneTransitionWrapper } from "../components/SceneTransitionWrapper";
import { ShimmerSweep } from "../components/ShimmerSweep";
import { SpeakerBadge } from "../components/SpeakerBadge";
import { StatCounterBadge } from "../components/StatCounterBadge";
import { TitleCard } from "../components/TitleCard";
import { THEME } from "../styles/theme";
import { UserPlus, Mail, Shield, Check } from "lucide-react";

export interface Scene06Props {
  audioSrc?: string;
  speaker?: string;
  emotion?: string;
}

export const Scene06_UserManagement: React.FC<Scene06Props> = ({
  audioSrc = staticFile("audio/dubbing/scene_06_user_management_faijah.wav"),
  speaker = "Faijah Nonoy",
  emotion = "Crisp & Professional",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth cross-transition around frame 420-460
  const quoteExitProgress = interpolate(frame, [420, 455], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const quoteOpacity = 1 - quoteExitProgress;

  // Camera pan across the user directory throughout full 1560 frames
  const panX = interpolate(frame, [450, 1560], [50, -50], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cameraZoom = interpolate(frame, [450, 1560], [0.98, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const adminTasks = [
    { title: "CREATE ACCOUNT", desc: "Identity provisioning for incoming students & staff", icon: UserPlus, color: THEME.colors.accentCyan, delay: 0 },
    { title: "INSTITUTIONAL EMAIL", desc: "Configuring institutional Google Workspace accounts", icon: Mail, color: THEME.colors.accentBlue, delay: 20 },
    { title: "USER ACCESS", desc: "Role-based permissions & two-factor authenticators", icon: Shield, color: THEME.colors.accentEmerald, delay: 40 },
  ];

  // User dots merging into neat avatars
  const totalDots = 18;
  const dotsMergeProgress = interpolate(frame, [460, 540], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneTransitionWrapper durationInFrames={1560} transitionType="slide-left" accentColor={THEME.colors.accentBlue}>
      <Background accentColor={THEME.colors.accentBlue}>
        {audioSrc && <Audio src={audioSrc} />}
        <SpeakerBadge speaker={speaker} role={emotion} />

        {/* Phase 1: Quote Block */}
        {frame < 460 && (
          <div
            style={{
              opacity: quoteOpacity,
              transform: `scale(${interpolate(quoteExitProgress, [0, 1], [1, 0.93])})`,
              willChange: "transform, opacity",
            }}
          >
            <QuoteBlock
              quote="Through Google Admin... I manage accounts and ensure every user has the credentials they need."
              author="Jansen Lee"
              role="Identity & Directory Management"
              accentColor={THEME.colors.accentBlue}
            />
          </div>
        )}

        {/* Phase 2: Directory Management & Active Telemetry */}
        {frame >= 440 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "30px",
              transform: `scale(${cameraZoom}) translateX(${panX}px)`,
              opacity: interpolate(frame, [440, 470], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              willChange: "transform, opacity",
            }}
          >
            <TitleCard
              badge="03 — User Management"
              badgeColor={THEME.colors.accentCyan}
              title="FOR THE USER, IT'S AN EMAIL. FOR THE ADMIN, IT'S A SYSTEM."
              subtitle="Hundreds of accounts, security permissions, and institutional credentials orchestrated seamlessly."
              highlightWords={["EMAIL.", "SYSTEM."]}
            />

            {/* User dots merging into avatars animation strip */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: interpolate(dotsMergeProgress, [0, 1], [35, 14]),
                padding: "16px 28px",
                borderRadius: "999px",
                backgroundColor: "rgba(18, 24, 38, 0.7)",
                border: `1px solid ${THEME.colors.borderGlass}`,
              }}
            >
              {Array.from({ length: totalDots }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: interpolate(dotsMergeProgress, [0, 1], [8, 28]),
                    height: interpolate(dotsMergeProgress, [0, 1], [8, 28]),
                    borderRadius: "50%",
                    backgroundColor:
                      i % 3 === 0
                        ? THEME.colors.accentCyan
                        : i % 3 === 1
                        ? THEME.colors.accentBlue
                        : THEME.colors.accentEmerald,
                    boxShadow: `0 0 10px rgba(56, 189, 248, 0.5)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    color: "#FFF",
                    fontWeight: 700,
                  }}
                >
                  {dotsMergeProgress > 0.8 && "✓"}
                </div>
              ))}
            </div>

            {/* Admin workflow cards with permission checkmarks & floating motion */}
            <div style={{ display: "flex", gap: "24px" }}>
              {adminTasks.map((task, idx) => {
                const spr = spring({
                  frame: frame - (520 + task.delay),
                  fps,
                  config: THEME.springs.smooth,
                });
                const Icon = task.icon;

                const checkSpr = spring({
                  frame: frame - (580 + task.delay),
                  fps,
                  config: THEME.springs.bouncy,
                });

                const floatY = Math.sin((frame + idx * 25) / 18) * 8;

                return (
                  <div
                    key={idx}
                    style={{
                      transform: `scale(${interpolate(spr, [0, 1], [0.85, 1])}) translateY(${interpolate(
                        spr,
                        [0, 1],
                        [25, 0]
                      ) + floatY}px)`,
                      opacity: interpolate(frame - (520 + task.delay), [0, 10], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                      }),
                      backgroundColor: "rgba(18, 24, 38, 0.85)",
                      border: `1px solid ${task.color}44`,
                      borderRadius: "24px",
                      padding: "32px 26px",
                      width: "300px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      boxShadow: `0 20px 40px rgba(0,0,0,0.5), 0 0 30px ${task.color}15`,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <ShimmerSweep delay={idx * 25} period={95} color={`${task.color}33`} />
                    <div
                      style={{
                        position: "absolute",
                        top: "16px",
                        right: "16px",
                        transform: `scale(${checkSpr})`,
                      }}
                    >
                      <div
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "50%",
                          backgroundColor: THEME.colors.accentEmerald,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Check size={14} color="#FFF" />
                      </div>
                    </div>

                    <div
                      style={{
                        width: "64px",
                        height: "64px",
                        borderRadius: "20px",
                        backgroundColor: `${task.color}18`,
                        border: `1.5px solid ${task.color}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "16px",
                      }}
                    >
                      <Icon size={32} color={task.color} />
                    </div>

                    <h3
                      style={{
                        fontSize: "19px",
                        fontWeight: 800,
                        color: THEME.colors.textPrimary,
                        marginBottom: "8px",
                      }}
                    >
                      {task.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "13px",
                        color: THEME.colors.textSecondary,
                        margin: 0,
                        lineHeight: 1.45,
                      }}
                    >
                      {task.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Continuous Live Directory Telemetry (Frames 700+) */}
            {frame >= 700 && (
              <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
                <StatCounterBadge
                  targetValue={100}
                  suffix="%"
                  label="Google Workspace Sync"
                  sublabel="Automated role provisioning"
                  accentColor={THEME.colors.accentCyan}
                  delayInFrames={710}
                />
                <StatCounterBadge
                  targetValue={2}
                  suffix="FA"
                  label="Enforced MFA Security"
                  sublabel="Campus-wide compliance"
                  accentColor={THEME.colors.accentEmerald}
                  delayInFrames={730}
                />
              </div>
            )}
          </div>
        )}
      </Background>
    </SceneTransitionWrapper>
  );
};
