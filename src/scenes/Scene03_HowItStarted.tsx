import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { QuoteBlock } from "../components/QuoteBlock";
import { TimelinePath } from "../components/TimelinePath";
import { TitleCard } from "../components/TitleCard";
import { THEME } from "../styles/theme";

export const Scene03_HowItStarted: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 0 - 300: Interview Quote
  // 300 - 660: Timeline + "ONE WEBSITE. MANY RESPONSIBILITIES."
  const showQuote = frame < 280;

  return (
    <Background accentColor={THEME.colors.accentIndigo}>
      {showQuote ? (
        <QuoteBlock
          quote="I'm a graduate of College of St. Benilde, Multimedia Arts. Actually, it was only during a fellowship... A previous supervisor of ours was looking for someone to redesign the website."
          author="Jansen Lee"
          role="Reflecting on his beginnings"
          accentColor={THEME.colors.accentIndigo}
        />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <TitleCard
            badge="The Origin Story"
            badgeColor={THEME.colors.accentCyan}
            title="ONE WEBSITE. MANY RESPONSIBILITIES."
            subtitle="What started as a volunteer redesign evolved into stewardship of an entire institution's digital backbone."
            highlightWords={["ONE", "WEBSITE."]}
          />

          <TimelinePath />
        </div>
      )}
    </Background>
  );
};
