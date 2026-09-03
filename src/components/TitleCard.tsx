import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../styles/theme";

interface TitleCardProps {
  badge?: string;
  badgeColor?: string;
  title: string;
  subtitle?: string;
  highlightWords?: string[];
  delay?: number;
  align?: "center" | "left";
}

export const TitleCard: React.FC<TitleCardProps> = ({
  badge,
  badgeColor = THEME.colors.accentCyan,
  title,
  subtitle,
  highlightWords = [],
  delay = 0,
  align = "center",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: THEME.springs.smooth,
  });

  const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(entrance, [0, 1], [40, 0]);
  const scale = interpolate(entrance, [0, 1], [0.95, 1]);

  // Highlight words in title
  const renderTitle = () => {
    if (!highlightWords.length) return title;

    const parts = title.split(
      new RegExp(`(${highlightWords.map((w) => `\\b${w}\\b`).join("|")})`, "gi")
    );

    return parts.map((part, i) => {
      const isHighlighted = highlightWords.some(
        (w) => w.toLowerCase() === part.toLowerCase()
      );
      return (
        <span
          key={i}
          style={{
            color: isHighlighted ? badgeColor : THEME.colors.textPrimary,
            textShadow: isHighlighted ? `0 0 30px ${badgeColor}66` : "none",
          }}
        >
          {part}
        </span>
      );
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: align === "center" ? "center" : "flex-start",
        textAlign: align,
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        maxWidth: "1400px",
        padding: "0 40px",
      }}
    >
      {badge && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "8px 20px",
            borderRadius: "9999px",
            backgroundColor: `${badgeColor}18`,
            border: `1px solid ${badgeColor}44`,
            color: badgeColor,
            fontSize: "16px",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "24px",
            backdropFilter: "blur(8px)",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: badgeColor,
              marginRight: "10px",
              boxShadow: `0 0 10px ${badgeColor}`,
            }}
          />
          {badge}
        </div>
      )}

      <h1
        style={{
          fontSize: "76px",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          color: THEME.colors.textPrimary,
          margin: 0,
          textWrap: "balance",
        }}
      >
        {renderTitle()}
      </h1>

      {subtitle && (
        <p
          style={{
            fontSize: "28px",
            fontWeight: 400,
            lineHeight: 1.4,
            color: THEME.colors.textSecondary,
            marginTop: "24px",
            maxWidth: "900px",
            letterSpacing: "-0.01em",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
