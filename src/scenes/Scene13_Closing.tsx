import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { TitleCard } from "../components/TitleCard";
import { THEME } from "../styles/theme";

export const Scene13_Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 0 - 300: Jansen Lee Tribute & Impact statement
  // 300 - 600: Final Title "SYSTEM ADMINISTRATION" & Fade to black
  const showHero = frame < 300;

  const fadeOut = interpolate(frame, [540, 600], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ width: "100%", height: "100%", opacity: fadeOut }}>
      <Background accentColor={THEME.colors.accentCyan}>
        {showHero ? (
          <TitleCard
            badge="In Recognition Of"
            badgeColor={THEME.colors.accentEmerald}
            title="JANSEN LEE"
            subtitle="Webmaster · Graphic Designer · IT Support\n\n“The work is often invisible. But the impact isn't.”"
            highlightWords={["JANSEN", "LEE"]}
          />
        ) : (
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
