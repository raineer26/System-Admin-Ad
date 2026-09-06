import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { GlassCard } from "./GlassCard";
import { THEME } from "../styles/theme";

interface MultiChannelGridProps {
  delayInFrames?: number;
}

const CHANNELS = [
  {
    title: "Google & Meta Reviews",
    stat: "100% Automated",
    desc: "Drafts and posts AI personalized replies across Google, Instagram & FB",
    iconColor: THEME.colors.accentCyan,
    icon: "🌐",
  },
  {
    title: "WhatsApp & SMS Marketing",
    stat: "24/7 Availability",
    desc: "Instant conversational responses for local customer inquiries",
    iconColor: THEME.colors.accentEmerald,
    icon: "💬",
  },
  {
    title: "Lead Qualification & CRM",
    stat: "Automated Entry",
    desc: "Captures intent, collects contacts & syncs directly into CRM",
    iconColor: THEME.colors.accentAmber,
    icon: "⚡",
  },
  {
    title: "Spam & Distraction Filter",
    stat: "90% Filtered",
    desc: "Blocks invalid solicitations so teams focus on high-value leads",
    iconColor: THEME.colors.accentRose,
    icon: "🛡️",
  },
];

export const MultiChannelGrid: React.FC<MultiChannelGridProps> = ({
  delayInFrames = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delayInFrames);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "20px",
        width: "820px",
      }}
    >
      {CHANNELS.map((item, index) => {
        const itemDelay = index * 8;
        const itemFrame = Math.max(0, adjustedFrame - itemDelay);

        const cardSpring = spring({
          frame: itemFrame,
          fps,
          config: THEME.springs.snappy,
        });

        const cardOpacity = interpolate(itemFrame, [0, 10], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <div
            key={index}
            style={{
              transform: `scale(${cardSpring}) translateY(${interpolate(
                cardSpring,
                [0, 1],
                [30, 0]
              )}px)`,
              opacity: cardOpacity,
              transformOrigin: "center center",
            }}
          >
            <GlassCard
              borderColor={item.iconColor}
              glow
              style={{
                padding: "20px 24px",
                background: "rgba(15, 23, 42, 0.8)",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span style={{ fontSize: "22px" }}>{item.icon}</span>
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: THEME.colors.textPrimary,
                      fontFamily: THEME.fonts.heading,
                    }}
                  >
                    {item.title}
                  </span>
                </div>

                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderRadius: "20px",
                    backgroundColor: `${item.iconColor}22`,
                    color: item.iconColor,
                    border: `1px solid ${item.iconColor}44`,
                  }}
                >
                  {item.stat}
                </span>
              </div>

              <div
                style={{
                  fontSize: "13px",
                  color: THEME.colors.textSecondary,
                  fontFamily: THEME.fonts.body,
                  lineHeight: "1.4",
                }}
              >
                {item.desc}
              </div>
            </GlassCard>
          </div>
        );
      })}
    </div>
  );
};
