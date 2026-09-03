import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { TitleCard } from "../components/TitleCard";
import { THEME } from "../styles/theme";
import { Globe, Wifi, Users, Server, BookOpen, Activity, CheckCheck } from "lucide-react";

export const Scene10_InvisibleWork: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Long, continuous, slow zoom out pulling back across the entire digital ecosystem
  const pullBackZoom = interpolate(frame, [0, 750], [1.25, 0.75], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const showPoint = frame >= 460;

  const ecosystemNodes = [
    { title: "Website & CMS", icon: Globe, color: THEME.colors.accentCyan },
    { title: "Koha OPAC Library", icon: BookOpen, color: THEME.colors.accentEmerald },
    { title: "Campus Network", icon: Wifi, color: THEME.colors.accentBlue },
    { title: "Directory Accounts", icon: Users, color: THEME.colors.accentIndigo },
    { title: "Classroom Hardware", icon: Server, color: THEME.colors.accentAmber },
  ];

  return (
    <Background accentColor={THEME.colors.accentCyan} gridOpacity={0.06}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          transform: `scale(${pullBackZoom})`,
          transformOrigin: "center center",
          willChange: "transform",
        }}
      >
        {!showPoint ? (
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
              subtitle="People don't think about the network, accounts, or equipment. They just expect everything to work."
              highlightWords={["INVISIBLE", "WHEN", "IT", "WORKS."]}
            />

            {/* Connected Pulsing Ecosystem Cards */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                position: "relative",
              }}
            >
              {ecosystemNodes.map((node, idx) => {
                const Icon = node.icon;
                const pulse = Math.sin((frame + idx * 20) / 15) * 6;

                return (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: "rgba(18, 24, 38, 0.9)",
                      border: `1.5px solid ${node.color}55`,
                      borderRadius: "22px",
                      padding: "28px 22px",
                      width: "185px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      boxShadow: `0 15px 35px rgba(0,0,0,0.6), 0 0 25px ${node.color}25`,
                      transform: `translateY(${pulse}px)`,
                    }}
                  >
                    <div
                      style={{
                        width: "52px",
                        height: "52px",
                        borderRadius: "16px",
                        backgroundColor: `${node.color}20`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "12px",
                      }}
                    >
                      <Icon size={26} color={node.color} />
                    </div>
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: 800,
                        color: THEME.colors.textPrimary,
                        marginBottom: "6px",
                      }}
                    >
                      {node.title}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        color: THEME.colors.accentEmerald,
                        fontFamily: THEME.fonts.mono,
                        fontWeight: 700,
                      }}
                    >
                      ● 99.98% UP
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <TitleCard
            badge="The Ultimate Mission"
            badgeColor={THEME.colors.accentEmerald}
            title="AND THAT'S THE POINT."
            subtitle="Great system administration means making complex technology feel completely seamless to everyone else."
            highlightWords={["THAT'S", "THE", "POINT."]}
          />
        )}
      </div>
    </Background>
  );
};
