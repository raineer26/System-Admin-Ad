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
  chromeGradient?: boolean;
  haloGlow?: boolean;
  kineticWords?: boolean;
  wordStaggerFrames?: number;
}

/**
 * TitleCard with HyperFrames Kinetic Chrome Typography
 * - Multi-stop metallic chrome gradient
 * - Word-by-word kinetic staggered spring entrance
 * - Luminous halo glow on keyword accents
 */
export const TitleCard: React.FC<TitleCardProps> = ({
  badge,
  badgeColor = THEME.colors.accentCyan,
  title,
  subtitle,
  highlightWords = [],
  delay = 0,
  align = "center",
  chromeGradient = true,
  haloGlow = true,
  kineticWords = false,
  wordStaggerFrames = 4,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: THEME.springs.smooth,
  });

  const opacity = interpolate(frame - delay, [0, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(entrance, [0, 1], [40, 0]);
  const scale = interpolate(entrance, [0, 1], [0.95, 1]);

  // Render title with either kinetic word reveals or full-sentence chrome formatting
  const renderTitle = () => {
    const words = title.split(" ");

    if (kineticWords) {
      return (
        <span style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: align === "center" ? "center" : "flex-start", gap: "14px" }}>
          {words.map((word, index) => {
            const wordDelay = delay + index * wordStaggerFrames;
            const wordSpring = spring({
              frame: frame - wordDelay,
              fps,
              config: THEME.springs.snappy,
            });

            const wordOpacity = interpolate(frame - wordDelay, [0, 8], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            const wordY = interpolate(wordSpring, [0, 1], [25, 0]);
            const wordScale = interpolate(wordSpring, [0, 1], [0.85, 1]);

            const cleanWord = word.replace(/[^a-zA-Z0-9]/g, "");
            const isHighlighted = highlightWords.some(
              (w) => w.toLowerCase() === cleanWord.toLowerCase()
            );

            return (
              <span
                key={index}
                style={{
                  display: "inline-block",
                  opacity: wordOpacity,
                  transform: `translateY(${wordY}px) scale(${wordScale})`,
                  color: isHighlighted
                    ? badgeColor
                    : chromeGradient
                    ? "transparent"
                    : THEME.colors.textPrimary,
                  background: isHighlighted
                    ? undefined
                    : chromeGradient
                    ? "linear-gradient(180deg, #FFFFFF 0%, #A0AEC0 55%, #E2E8F0 100%)"
                    : undefined,
                  WebkitBackgroundClip: !isHighlighted && chromeGradient ? "text" : undefined,
                  WebkitTextFillColor: !isHighlighted && chromeGradient ? "transparent" : undefined,
                  textShadow: isHighlighted && haloGlow
                    ? `0 0 35px ${badgeColor}aa, 0 0 70px ${badgeColor}55`
                    : haloGlow
                    ? "0 0 25px rgba(255, 255, 255, 0.45)"
                    : undefined,
                }}
              >
                {word}
              </span>
            );
          })}
        </span>
      );
    }

    if (!highlightWords.length) {
      return (
        <span
          style={{
            background: chromeGradient
              ? "linear-gradient(180deg, #FFFFFF 0%, #A0AEC0 55%, #E2E8F0 100%)"
              : undefined,
            WebkitBackgroundClip: chromeGradient ? "text" : undefined,
            WebkitTextFillColor: chromeGradient ? "transparent" : undefined,
            textShadow: haloGlow ? "0 0 30px rgba(255, 255, 255, 0.35)" : undefined,
          }}
        >
          {title}
        </span>
      );
    }

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
            color: isHighlighted ? badgeColor : undefined,
            background: isHighlighted
              ? undefined
              : chromeGradient
              ? "linear-gradient(180deg, #FFFFFF 0%, #A0AEC0 55%, #E2E8F0 100%)"
              : undefined,
            WebkitBackgroundClip: !isHighlighted && chromeGradient ? "text" : undefined,
            WebkitTextFillColor: !isHighlighted && chromeGradient ? "transparent" : undefined,
            textShadow: isHighlighted && haloGlow
              ? `0 0 35px ${badgeColor}aa, 0 0 70px ${badgeColor}55`
              : haloGlow
              ? "0 0 25px rgba(255, 255, 255, 0.3)"
              : "none",
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
            padding: "8px 22px",
            borderRadius: "9999px",
            backgroundColor: `${badgeColor}18`,
            border: `1px solid ${badgeColor}55`,
            color: badgeColor,
            fontSize: "15px",
            fontWeight: 800,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: "24px",
            backdropFilter: "blur(12px)",
            boxShadow: `0 0 25px ${badgeColor}33`,
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
          lineHeight: 1.12,
          margin: 0,
          textWrap: "balance",
        }}
      >
        {renderTitle()}
      </h1>

      {subtitle && (
        <p
          style={{
            fontSize: "26px",
            fontWeight: 400,
            lineHeight: 1.45,
            color: THEME.colors.textSecondary,
            marginTop: "24px",
            maxWidth: "920px",
            letterSpacing: "-0.01em",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
