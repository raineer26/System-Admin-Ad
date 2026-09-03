import React from "react";
import { Background } from "../components/Background";
import { QuoteBlock } from "../components/QuoteBlock";
import { TitleCard } from "../components/TitleCard";
import { THEME } from "../styles/theme";
import { useCurrentFrame } from "remotion";

export const Scene11_WorkLife: React.FC = () => {
  const frame = useCurrentFrame();

  const showQuote = frame < 280;

  return (
    <Background accentColor={THEME.colors.accentIndigo}>
      {showQuote ? (
        <QuoteBlock
          quote="Before, when I just started, I also worked after work hours. After that, I avoid working after work hours."
          author="Jansen Lee"
          role="Work-Life Balance & Sustainable Engineering"
          accentColor={THEME.colors.accentIndigo}
        />
      ) : (
        <TitleCard
          badge="Sustainable Stewardship"
          badgeColor={THEME.colors.accentCyan}
          title="NOT TO CONSTANTLY FIX THINGS. BUT TO BUILD SYSTEMS PEOPLE CAN RELY ON."
          subtitle="True reliability isn't answering emergency calls at midnight. It's engineering the system so it never breaks in the first place."
          highlightWords={["BUILD", "SYSTEMS", "RELY", "ON."]}
        />
      )}
    </Background>
  );
};
