import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { GlassCard } from "../components/GlassCard";
import { QuoteBlock } from "../components/QuoteBlock";
import { TitleCard } from "../components/TitleCard";
import { THEME } from "../styles/theme";
import { UserPlus, Mail, Shield, CheckCircle, Users } from "lucide-react";

export const Scene06_UserManagement: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showQuote = frame < 280;

  const adminTasks = [
    { title: "CREATE ACCOUNT", desc: "Identity provisioning for incoming students & staff", icon: UserPlus, color: THEME.colors.accentCyan },
    { title: "ASSIGN EMAIL", desc: "Configuring institutional Google Workspace accounts", icon: Mail, color: THEME.colors.accentBlue },
    { title: "USER ACCESS", desc: "Role-based permissions & security authenticators", icon: Shield, color: THEME.colors.accentEmerald },
  ];

  return (
    <Background accentColor={THEME.colors.accentBlue}>
      {showQuote ? (
        <QuoteBlock
          quote="Through Google Admin... I assist with creating and managing institutional accounts."
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
            gap: "36px",
          }}
        >
          <TitleCard
            badge="03 — User Management"
            badgeColor={THEME.colors.accentCyan}
            title="FOR THE USER, IT'S AN EMAIL. FOR THE ADMIN, IT'S A SYSTEM."
            subtitle="Hundreds of accounts, permissions, and institutional credentials orchestrated seamlessly."
            highlightWords={["EMAIL.", "SYSTEM."]}
          />

          {/* Admin workflow cards */}
          <div style={{ display: "flex", gap: "24px" }}>
            {adminTasks.map((task, idx) => {
              const spr = spring({
                frame: frame - (300 + idx * 15),
                fps,
                config: THEME.springs.smooth,
              });
              const Icon = task.icon;

              return (
                <div
                  key={idx}
                  style={{
                    transform: `scale(${interpolate(spr, [0, 1], [0.85, 1])}) translateY(${interpolate(
                      spr,
                      [0, 1],
                      [25, 0]
                    )}px)`,
                    opacity: interpolate(frame - (300 + idx * 15), [0, 12], [0, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }),
                    backgroundColor: "rgba(18, 24, 38, 0.85)",
                    border: `1px solid ${task.color}44`,
                    borderRadius: "20px",
                    padding: "32px 28px",
                    width: "300px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    boxShadow: `0 20px 45px rgba(0,0,0,0.5), 0 0 25px ${task.color}20`,
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
                      margin: "0 0 16px 0",
                      lineHeight: 1.4,
                    }}
                  >
                    {task.desc}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      color: THEME.colors.accentEmerald,
                      fontSize: "12px",
                      fontFamily: THEME.fonts.mono,
                      fontWeight: 600,
                    }}
                  >
                    <CheckCircle size={14} /> Google Admin Sync
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
