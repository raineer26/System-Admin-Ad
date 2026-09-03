import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { QuoteBlock } from "../components/QuoteBlock";
import { TitleCard } from "../components/TitleCard";
import { THEME } from "../styles/theme";
import { Clock } from "lucide-react";

export const Scene11_WorkLife: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showQuote = frame < 440;

  // Digital clock ticking from 04:59 PM to 05:00 PM (17:00)
  const isAfterHours = frame >= 650;
  const timeString = isAfterHours ? "05:00 PM" : "04:59 PM";

  // Nodes dimming from bright color to soft muted grey
  const nodeSaturation = interpolate(frame, [440, 750], [1, 0.1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const nodeOpacity = interpolate(frame, [440, 750], [0.9, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Background accentColor={THEME.colors.accentIndigo}>
      {showQuote ? (
        <QuoteBlock
          quote="Before, when I just started, I also worked after work hours. After that, I avoid working after work hours."
          author="Jansen Lee"
          role="Work-Life Balance & System Reliability"
          accentColor={THEME.colors.accentIndigo}
        />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "36px",
            width: "100%",
          }}
        >
          <TitleCard
            badge="Sustainable Stewardship"
            badgeColor={THEME.colors.accentCyan}
            title="NOT TO CONSTANTLY FIX THINGS. BUT TO BUILD RELIABLE SYSTEMS."
            subtitle="True reliability isn't answering frantic calls at midnight. It's engineering the infrastructure so it doesn't fail."
            highlightWords={["BUILD", "RELIABLE", "SYSTEMS."]}
          />

          {/* Sleek Digital Clock ticking over */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "16px 36px",
              borderRadius: "20px",
              backgroundColor: "rgba(18, 24, 38, 0.9)",
              border: `1.5px solid ${isAfterHours ? THEME.colors.accentEmerald : THEME.colors.accentCyan}55`,
              boxShadow: `0 15px 40px rgba(0,0,0,0.6), 0 0 30px ${
                isAfterHours ? THEME.colors.accentEmerald : THEME.colors.accentCyan
              }22`,
            }}
          >
            <Clock
              size={28}
              color={isAfterHours ? THEME.colors.accentEmerald : THEME.colors.accentCyan}
            />
            <span
              style={{
                fontSize: "32px",
                fontWeight: 900,
                fontFamily: THEME.fonts.mono,
                letterSpacing: "0.1em",
                color: THEME.colors.textPrimary,
              }}
            >
              {timeString}
            </span>
            <span
              style={{
                padding: "4px 12px",
                borderRadius: "999px",
                backgroundColor: isAfterHours
                  ? "rgba(16, 185, 129, 0.2)"
                  : "rgba(56, 189, 248, 0.2)",
                fontSize: "12px",
                fontFamily: THEME.fonts.mono,
                fontWeight: 700,
                color: isAfterHours
                  ? THEME.colors.accentEmerald
                  : THEME.colors.accentCyan,
              }}
            >
              {isAfterHours ? "END OF SHIFT · SYSTEMS STABLE" : "SHIFT ACTIVE"}
            </span>
          </div>

          {/* Dimmed quiet system indicators */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              filter: `saturate(${nodeSaturation})`,
              opacity: nodeOpacity,
              transition: "filter 0.5s ease",
            }}
          >
            {["WEBSITES ACTIVE", "NETWORK SECURE", "DEVICES MONITORED", "DATA BACKED UP"].map(
              (label, i) => (
                <div
                  key={i}
                  style={{
                    padding: "8px 18px",
                    borderRadius: "12px",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: `1px solid ${THEME.colors.borderGlass}`,
                    fontSize: "12px",
                    fontFamily: THEME.fonts.mono,
                    color: THEME.colors.textSecondary,
                  }}
                >
                  ✓ {label}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </Background>
  );
};
