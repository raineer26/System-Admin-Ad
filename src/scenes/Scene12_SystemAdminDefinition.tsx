import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { TitleCard } from "../components/TitleCard";
import { THEME } from "../styles/theme";
import { Globe, Shield, Users, Server, Wrench, Video, Lock } from "lucide-react";

export const Scene12_SystemAdminDefinition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showConverged = frame >= 340;

  const responsibilities = [
    { title: "Website Infrastructure", icon: Globe, angle: 0, color: THEME.colors.accentCyan },
    { title: "Network Security", icon: Shield, angle: 51, color: THEME.colors.accentBlue },
    { title: "User Accounts", icon: Users, angle: 102, color: THEME.colors.accentIndigo },
    { title: "Physical Hardware", icon: Server, angle: 154, color: THEME.colors.accentEmerald },
    { title: "Troubleshooting", icon: Wrench, angle: 205, color: THEME.colors.accentAmber },
    { title: "Classroom Tech", icon: Video, angle: 257, color: THEME.colors.accentCyan },
    { title: "Data Protection", icon: Lock, angle: 308, color: THEME.colors.accentRose },
  ];

  return (
    <Background accentColor={THEME.colors.accentBlue}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        {!showConverged ? (
          <div
            style={{
              position: "relative",
              width: "800px",
              height: "600px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Center Core */}
            <div
              style={{
                width: "160px",
                height: "160px",
                borderRadius: "50%",
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                border: `2px solid ${THEME.colors.accentCyan}`,
                boxShadow: `0 0 60px ${THEME.colors.accentCyan}66`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                zIndex: 10,
              }}
            >
              <span style={{ fontSize: "12px", color: THEME.colors.accentCyan, letterSpacing: "0.1em", fontWeight: 700 }}>
                THE STEWARD
              </span>
              <span style={{ fontSize: "20px", fontWeight: 900, color: THEME.colors.textPrimary }}>
                JANSEN LEE
              </span>
            </div>

            {/* Orbiting Responsibilities */}
            {responsibilities.map((resp, idx) => {
              const radius = 280;
              const angleRad = ((resp.angle + frame * 0.4) * Math.PI) / 180;
              const x = Math.cos(angleRad) * radius;
              const y = Math.sin(angleRad) * radius;

              const Icon = resp.icon;

              return (
                <div
                  key={idx}
                  style={{
                    position: "absolute",
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 18px",
                    borderRadius: "999px",
                    backgroundColor: "rgba(18, 24, 38, 0.9)",
                    border: `1px solid ${resp.color}66`,
                    boxShadow: `0 10px 25px rgba(0,0,0,0.5), 0 0 20px ${resp.color}22`,
                  }}
                >
                  <Icon size={18} color={resp.color} />
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: THEME.colors.textPrimary,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {resp.title}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <TitleCard
            badge="The True Meaning"
            badgeColor={THEME.colors.accentCyan}
            title="SYSTEM ADMINISTRATION IS NOT A TITLE. IT IS A RESPONSIBILITY."
            subtitle="Keeping systems available. Keeping users connected. Protecting information. Maintaining technology."
            highlightWords={["NOT", "A", "TITLE.", "RESPONSIBILITY."]}
          />
        )}
      </div>
    </Background>
  );
};
