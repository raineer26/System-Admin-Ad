import React from "react";
import { Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { QuoteBlock } from "../components/QuoteBlock";
import { SpeakerBadge } from "../components/SpeakerBadge";
import { TitleCard } from "../components/TitleCard";
import { THEME } from "../styles/theme";
import { UserPlus, Mail, Shield, CheckCircle, Users, Check } from "lucide-react";

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

  const showQuote = frame < 460;

  // Camera pan across the user directory
  const panX = interpolate(frame, [460, 1200], [60, -60], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cameraZoom = interpolate(frame, [460, 1200], [0.98, 1.05]);

  const adminTasks = [
    { title: "CREATE ACCOUNT", desc: "Identity provisioning for incoming students & staff", icon: UserPlus, color: THEME.colors.accentCyan, delay: 0 },
    { title: "INSTITUTIONAL EMAIL", desc: "Configuring institutional Google Workspace accounts", icon: Mail, color: THEME.colors.accentBlue, delay: 30 },
    { title: "USER ACCESS", desc: "Role-based permissions & two-factor authenticators", icon: Shield, color: THEME.colors.accentEmerald, delay: 60 },
  ];

  // User dots merging into neat avatars
  const totalDots = 18;
  const dotsMergeProgress = interpolate(frame, [460, 540], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Background accentColor={THEME.colors.accentBlue}>
      {audioSrc && <Audio src={audioSrc} />}
      <SpeakerBadge speaker={speaker} role={emotion} />
      {showQuote ? (
        <QuoteBlock
          quote="Through Google Admin... I manage accounts and ensure every user has the credentials they need."
          author="Jansen Lee"
          role="Identity & Directory Management"
          accentColor={THEME.colors.accentBlue}
        />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "30px",
            transform: `scale(${cameraZoom}) translateX(${panX}px)`,
            willChange: "transform",
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

          {/* Admin workflow cards with permission checkmarks */}
          <div style={{ display: "flex", gap: "24px" }}>
            {adminTasks.map((task, idx) => {
              const spr = spring({
                frame: frame - (540 + task.delay),
                fps,
                config: THEME.springs.smooth,
              });
              const Icon = task.icon;

              const checkSpr = spring({
                frame: frame - (600 + task.delay),
                fps,
                config: THEME.springs.bouncy,
              });

              return (
                <div
                  key={idx}
                  style={{
                    transform: `scale(${interpolate(spr, [0, 1], [0.85, 1])}) translateY(${interpolate(
                      spr,
                      [0, 1],
                      [25, 0]
                    )}px)`,
                    opacity: interpolate(frame - (540 + task.delay), [0, 10], [0, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }),
                    backgroundColor: "rgba(18, 24, 38, 0.85)",
                    border: `1px solid ${task.color}44`,
                    borderRadius: "22px",
                    padding: "32px 28px",
                    width: "310px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    boxShadow: `0 20px 45px rgba(0,0,0,0.5), 0 0 25px ${task.color}20`,
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "18px",
                      backgroundColor: `${task.color}20`,
                      border: `1.5px solid ${task.color}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "18px",
                      boxShadow: `0 0 20px ${task.color}33`,
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
                      fontSize: "14px",
                      color: THEME.colors.textSecondary,
                      margin: "0 0 18px 0",
                      lineHeight: 1.4,
                    }}
                  >
                    {task.desc}
                  </p>

                  {/* Dynamic Permission Checkmark */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "6px 16px",
                      borderRadius: "999px",
                      backgroundColor: "rgba(16, 185, 129, 0.15)",
                      border: `1px solid ${THEME.colors.accentEmerald}55`,
                      color: THEME.colors.accentEmerald,
                      fontSize: "13px",
                      fontFamily: THEME.fonts.mono,
                      fontWeight: 700,
                      transform: `scale(${interpolate(checkSpr, [0, 1], [0.6, 1])})`,
                      opacity: interpolate(frame - (600 + task.delay), [0, 8], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                      }),
                    }}
                  >
                    <Check size={16} strokeWidth={3} />
                    <span>PERMISSION GRANTED</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Background>
  );
};
