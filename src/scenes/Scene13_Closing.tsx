import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { TitleCard } from "../components/TitleCard";
import { THEME } from "../styles/theme";
import { Wifi, Globe, Settings } from "lucide-react";

export const Scene13_Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 0 - 120: Minimal UI icons (Wi-Fi, Browser, Gear) fade in, hold, then fade out
  // 120 - 280: Jansen Lee Tribute Card ("The work is often invisible. But the impact isn't.")
  // 280 - 450: Final Title "SYSTEM ADMINISTRATION — Keeping people, technology, and systems connected." + fade to black

  const iconsOpacity = interpolate(frame, [0, 25, 95, 120], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOutEnd = interpolate(frame, [390, 450], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ width: "100%", height: "100%", opacity: fadeOutEnd }}>
      <Background accentColor={THEME.colors.accentCyan} gridOpacity={0.03}>
        {/* Phase 1: Minimalist UI Icons Staggered Fade */}
        {frame < 120 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "48px",
              opacity: iconsOpacity,
            }}
          >
            {[
              { icon: Wifi, color: THEME.colors.accentCyan },
              { icon: Globe, color: THEME.colors.accentBlue },
              { icon: Settings, color: THEME.colors.accentEmerald },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "24px",
                    backgroundColor: "rgba(18, 24, 38, 0.9)",
                    border: `1.5px solid ${item.color}55`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 0 35px ${item.color}33`,
                  }}
                >
                  <Icon size={38} color={item.color} />
                </div>
              );
            })}
          </div>
        )}

        {/* Phase 2: Jansen Lee Tribute Card */}
        {frame >= 120 && frame < 280 && (
          <TitleCard
            badge="In Recognition Of"
            badgeColor={THEME.colors.accentEmerald}
            title="JANSEN LEE"
            subtitle="Webmaster · Graphic Designer · IT Support\n\n“The work is often invisible. But the impact isn't.”"
            highlightWords={["JANSEN", "LEE"]}
          />
        )}

        {/* Phase 3: Final Branded Sign-Off */}
        {frame >= 280 && (
          <TitleCard
            badge="Behind The System"
            badgeColor={THEME.colors.accentCyan}
            title="SYSTEM ADMINISTRATION"
            subtitle="Keeping people, technology, and systems connected every single day."
            highlightWords={["SYSTEM", "ADMINISTRATION"]}
          />
        )}
      </Background>
    </div>
  );
};
