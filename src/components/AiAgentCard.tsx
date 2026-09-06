import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { GlassCard } from "./GlassCard";
import { THEME } from "../styles/theme";

interface AiAgentCardProps {
  delayInFrames?: number;
  triggerApproveFrame?: number;
}

export const AiAgentCard: React.FC<AiAgentCardProps> = ({
  delayInFrames = 0,
  triggerApproveFrame = 75,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delayInFrames);

  // Entrance spring animation
  const cardSpring = spring({
    frame: adjustedFrame,
    fps,
    config: THEME.springs.smooth,
  });

  const cardOpacity = interpolate(adjustedFrame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Typing animation state (frames 15 to 40)
  const isTyping = adjustedFrame >= 15 && adjustedFrame < 45;
  const isDraftReady = adjustedFrame >= 45;
  const isApproved = adjustedFrame >= triggerApproveFrame;

  // Typing dots animation
  const dot1Y = Math.sin((adjustedFrame / 4) * Math.PI) * 4;
  const dot2Y = Math.sin(((adjustedFrame + 3) / 4) * Math.PI) * 4;
  const dot3Y = Math.sin(((adjustedFrame + 6) / 4) * Math.PI) * 4;

  // Approval button bounce
  const approveSpring = isApproved
    ? spring({
        frame: adjustedFrame - triggerApproveFrame,
        fps,
        config: THEME.springs.bouncy,
      })
    : 0;

  return (
    <div
      style={{
        transform: `scale(${cardSpring}) translateY(${interpolate(
          cardSpring,
          [0, 1],
          [40, 0]
        )}px)`,
        opacity: cardOpacity,
        transformOrigin: "center center",
        width: "720px",
      }}
    >
      <GlassCard
        borderColor={
          isApproved ? THEME.colors.accentEmerald : THEME.colors.accentCyan
        }
        glow
        style={{
          padding: "24px 30px",
          background: "rgba(12, 16, 26, 0.88)",
        }}
      >
        {/* Header Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "18px",
            borderBottom: `1px solid ${THEME.colors.borderGlass}`,
            marginBottom: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            {/* AI Agent Avatar */}
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: `linear-gradient(135deg, ${THEME.colors.accentCyan}, ${THEME.colors.accentIndigo})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 0 20px ${THEME.colors.accentCyan}66`,
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                  fill="#FFFFFF"
                />
              </svg>
            </div>

            <div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: THEME.colors.textPrimary,
                  fontFamily: THEME.fonts.heading,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                JIM — AI Local Marketing Agent
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    padding: "2px 8px",
                    borderRadius: "20px",
                    backgroundColor: "rgba(56, 189, 248, 0.15)",
                    color: THEME.colors.accentCyan,
                    border: `1px solid ${THEME.colors.accentCyan}44`,
                  }}
                >
                  Partoo AI
                </span>
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: THEME.colors.textSecondary,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginTop: "2px",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: THEME.colors.accentEmerald,
                    boxShadow: `0 0 8px ${THEME.colors.accentEmerald}`,
                  }}
                />
                Active • 24/7 Response Engine
              </div>
            </div>
          </div>

          {/* Integration Badge */}
          <div
            style={{
              padding: "6px 14px",
              borderRadius: "10px",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: `1px solid ${THEME.colors.borderGlass}`,
              fontSize: "12px",
              color: THEME.colors.textSecondary,
              fontFamily: THEME.fonts.mono,
            }}
          >
            Google • WhatsApp • CRM
          </div>
        </div>

        {/* Conversation Stream */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* User Inquiry Bubble */}
          <div
            style={{
              alignSelf: "flex-start",
              maxWidth: "85%",
              backgroundColor: "rgba(30, 41, 59, 0.7)",
              border: `1px solid ${THEME.colors.borderGlass}`,
              borderRadius: "16px 16px 16px 4px",
              padding: "14px 18px",
              fontSize: "14px",
              color: THEME.colors.textPrimary,
              lineHeight: "1.5",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                color: THEME.colors.accentAmber,
                fontWeight: 600,
                marginBottom: "4px",
              }}
            >
              ⭐ New 5-Star Review • Google Business Profile
            </div>
            "Fantastic service! Quick turnaround time on my issue and super friendly team. Will definitely come back!"
          </div>

          {/* AI Response Bubble */}
          <div
            style={{
              alignSelf: "flex-end",
              maxWidth: "88%",
              backgroundColor: isApproved
                ? "rgba(16, 185, 129, 0.12)"
                : "rgba(56, 189, 248, 0.12)",
              border: `1px solid ${
                isApproved
                  ? THEME.colors.accentEmerald
                  : THEME.colors.accentCyan
              }`,
              borderRadius: "16px 16px 4px 16px",
              padding: "14px 18px",
              fontSize: "14px",
              color: THEME.colors.textPrimary,
              lineHeight: "1.5",
              boxShadow: isApproved
                ? `0 0 20px ${THEME.colors.accentEmerald}33`
                : `0 0 20px ${THEME.colors.accentCyan}22`,
              transition: "border-color 0.3s ease",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                color: isApproved
                  ? THEME.colors.accentEmerald
                  : THEME.colors.accentCyan,
                fontWeight: 700,
                marginBottom: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span>{isApproved ? "✓ AI Response Published" : "✨ AI Suggested Reply"}</span>
              <span style={{ opacity: 0.8 }}>97% Match Tone</span>
            </div>

            {/* Typing Dots or Draft Text */}
            {isTyping ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 0",
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: THEME.colors.accentCyan,
                    transform: `translateY(${dot1Y}px)`,
                  }}
                />
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: THEME.colors.accentCyan,
                    transform: `translateY(${dot2Y}px)`,
                  }}
                />
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: THEME.colors.accentCyan,
                    transform: `translateY(${dot3Y}px)`,
                  }}
                />
              </div>
            ) : isDraftReady ? (
              <div>
                "Thank you so much for the glowing review! 🌟 We're thrilled to hear that our team delivered top-notch service for you. We look forward to serving you again soon!"
              </div>
            ) : null}
          </div>
        </div>

        {/* Action Controls Bar */}
        <div
          style={{
            marginTop: "22px",
            paddingTop: "16px",
            borderTop: `1px solid ${THEME.colors.borderGlass}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              color: THEME.colors.textMuted,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: THEME.colors.accentCyan,
              }}
            />
            Automated lead qualification enabled
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              style={{
                padding: "8px 16px",
                borderRadius: "10px",
                border: `1px solid ${THEME.colors.borderGlass}`,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                color: THEME.colors.textSecondary,
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Modify Draft
            </button>
            <button
              id="btn-approve-response"
              style={{
                padding: "8px 20px",
                borderRadius: "10px",
                border: "none",
                backgroundColor: isApproved
                  ? THEME.colors.accentEmerald
                  : THEME.colors.accentCyan,
                color: "#08090C",
                fontSize: "13px",
                fontWeight: 700,
                boxShadow: isApproved
                  ? `0 0 20px ${THEME.colors.accentEmerald}`
                  : `0 0 20px ${THEME.colors.accentCyan}`,
                transform: `scale(${isApproved ? 1 + approveSpring * 0.08 : 1})`,
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              {isApproved ? "✓ Published" : "Approve & Send"}
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
