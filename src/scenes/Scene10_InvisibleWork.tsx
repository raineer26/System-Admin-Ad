import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { TitleCard } from "../components/TitleCard";
import { THEME } from "../styles/theme";
import { Activity, CheckCheck, Server, ShieldCheck } from "lucide-react";

export const Scene10_InvisibleWork: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showMetrics = frame < 320;

  const metrics = [
    { value: "99.98%", label: "System Uptime", icon: Activity, color: THEME.colors.accentEmerald },
    { value: "0", label: "Classroom Outages", icon: CheckCheck, color: THEME.colors.accentCyan },
    { value: "1,200+", label: "Active Directory Users", icon: Server, color: THEME.colors.accentBlue },
    { value: "100%", label: "Threats Blocked", icon: ShieldCheck, color: THEME.colors.accentIndigo },
  ];

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
      {/* Background Server Rack B-Roll */}
      <Img
        src={staticFile("images/server_rack_broll.jpg")}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(0.30) saturate(1.1)",
          transform: `scale(${interpolate(frame, [0, 600], [1.05, 1.0])})`,
        }}
      />

      <Background accentColor={THEME.colors.accentCyan} gridOpacity={0.06}>
        {showMetrics ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "36px",
            }}
          >
            <TitleCard
              badge="The Unseen Foundation"
              badgeColor={THEME.colors.accentCyan}
              title="TECHNOLOGY IS INVISIBLE WHEN IT WORKS."
              subtitle="No one applauds a router that doesn't disconnect. No one notices a server that never goes down."
              highlightWords={["INVISIBLE", "WHEN", "IT", "WORKS."]}
            />

            {/* Metrics Grid */}
            <div style={{ display: "flex", gap: "24px" }}>
              {metrics.map((metric, idx) => {
                const spr = spring({
                  frame: frame - idx * 12,
                  fps,
                  config: THEME.springs.smooth,
                });
                const Icon = metric.icon;

                return (
                  <div
                    key={idx}
                    style={{
                      transform: `scale(${interpolate(spr, [0, 1], [0.85, 1])})`,
                      opacity: interpolate(frame - idx * 12, [0, 10], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                      }),
                      backgroundColor: "rgba(18, 24, 38, 0.85)",
                      border: `1px solid ${metric.color}44`,
                      borderRadius: "20px",
                      padding: "28px 24px",
                      width: "220px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      boxShadow: `0 15px 35px rgba(0,0,0,0.5), 0 0 25px ${metric.color}20`,
                    }}
                  >
                    <Icon size={28} color={metric.color} style={{ marginBottom: "12px" }} />
                    <span
                      style={{
                        fontSize: "36px",
                        fontWeight: 900,
                        color: metric.color,
                        fontFamily: THEME.fonts.mono,
                      }}
                    >
                      {metric.value}
                    </span>
                    <span style={{ fontSize: "14px", color: THEME.colors.textSecondary, marginTop: "6px" }}>
                      {metric.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <TitleCard
            badge="The Ultimate Goal"
            badgeColor={THEME.colors.accentEmerald}
            title="AND THAT'S THE POINT."
            subtitle="True system administration means making complex technology feel completely effortless to everyone else."
            highlightWords={["THAT'S", "THE", "POINT."]}
          />
        )}
      </Background>
    </div>
  );
};
