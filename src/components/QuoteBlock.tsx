import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../styles/theme";
import { GlassCard } from "./GlassCard";

interface QuoteBlockProps {
  quote: string;
  author?: string;
  role?: string;
  delay?: number;
  accentColor?: string;
}

export const QuoteBlock: React.FC<QuoteBlockProps> = ({
  quote,
  author = "Jansen Lee",
  role = "Webmaster & Graphic Designer, BSOP",
  delay = 0,
  accentColor = THEME.colors.accentCyan,
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

  return (
    <div
      style={{
        opacity,
        transform: `scale(${interpolate(entrance, [0, 1], [0.95, 1])}) translateY(${interpolate(
          entrance,
          [0, 1],
          [20, 0]
        )}px)`,
        maxWidth: "960px",
        margin: "0 auto",
      }}
    >
      <GlassCard
        borderColor={`${accentColor}44`}
        glow
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          padding: "48px 56px",
        }}
      >
        {/* Audio / Interview indicator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              height: "20px",
            }}
          >
            {[0, 1, 2, 3, 4].map((i) => {
              const waveHeight = interpolate(
                Math.sin((frame + i * 8) / 6),
                [-1, 1],
                [6, 22]
              );
              return (
                <div
                  key={i}
                  style={{
                    width: "4px",
                    height: `${waveHeight}px`,
                    backgroundColor: accentColor,
                    borderRadius: "2px",
                  }}
                />
              );
            })}
          </div>
          <span
            style={{
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: accentColor,
            }}
          >
            Interview Excerpt
          </span>
        </div>

        {/* Quote text */}
        <div
          style={{
            fontSize: "36px",
            fontWeight: 500,
            lineHeight: 1.35,
            color: THEME.colors.textPrimary,
            letterSpacing: "-0.02em",
            fontStyle: "italic",
          }}
        >
          &ldquo;{quote}&rdquo;
        </div>

        {/* Author info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginTop: "8px",
            paddingTop: "20px",
            borderTop: `1px solid ${THEME.colors.borderGlass}`,
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${accentColor}, ${THEME.colors.accentBlue})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: "20px",
              color: "#FFF",
              boxShadow: `0 0 20px ${accentColor}66`,
            }}
          >
            JL
          </div>
          <div>
            <div
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: THEME.colors.textPrimary,
              }}
            >
              {author}
            </div>
            <div
              style={{
                fontSize: "15px",
                color: THEME.colors.textSecondary,
              }}
            >
              {role}
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
