import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../styles/theme";

interface SimulatedCursorProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  moveStartFrame: number;
  moveDuration?: number;
  clickFrame?: number;
  label?: string;
}

export const SimulatedCursor: React.FC<SimulatedCursorProps> = ({
  startX,
  startY,
  endX,
  endY,
  moveStartFrame,
  moveDuration = 30,
  clickFrame,
  label = "Clicking...",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth position interpolation
  const moveProgress = interpolate(
    frame,
    [moveStartFrame, moveStartFrame + moveDuration],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Easing function for natural mouse deceleration
  const easedProgress = Math.sin((moveProgress * Math.PI) / 2);

  const currentX = startX + (endX - startX) * easedProgress;
  const currentY = startY + (endY - startY) * easedProgress;

  // Click physics
  let clickScale = 1;
  let rippleScale = 0;
  let rippleOpacity = 0;

  if (clickFrame !== undefined && frame >= clickFrame) {
    clickScale = spring({
      frame: frame - clickFrame,
      fps,
      config: { damping: 10, stiffness: 200, mass: 0.4 },
    });
    // scale drops to 0.8 then bounces back to 1
    clickScale = interpolate(clickScale, [0, 1], [0.8, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    rippleScale = interpolate(frame - clickFrame, [0, 20], [0.5, 2.5], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    rippleOpacity = interpolate(frame - clickFrame, [0, 20], [0.8, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  }

  // Hide cursor before move starts
  if (frame < moveStartFrame - 10) {
    return null;
  }

  const cursorOpacity = interpolate(
    frame,
    [moveStartFrame - 10, moveStartFrame],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        left: currentX,
        top: currentY,
        transform: `translate(-4px, -4px) scale(${clickScale})`,
        opacity: cursorOpacity,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      {/* Click Ripple Effect */}
      {rippleOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: THEME.colors.accentCyan,
            transform: `translate(-50%, -50%) scale(${rippleScale})`,
            opacity: rippleOpacity,
          }}
        />
      )}

      {/* SVG Mouse Pointer */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        style={{
          filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.6))",
        }}
      >
        <path
          d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
          fill={THEME.colors.accentCyan}
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>

      {/* Action Tooltip Pill */}
      {label && clickFrame && frame >= clickFrame - 5 && (
        <div
          style={{
            position: "absolute",
            left: "24px",
            top: "16px",
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            border: `1px solid ${THEME.colors.accentCyan}`,
            borderRadius: "8px",
            padding: "4px 10px",
            color: THEME.colors.textPrimary,
            fontSize: "12px",
            fontWeight: 600,
            whiteSpace: "nowrap",
            boxShadow: `0 4px 14px ${THEME.colors.accentCyan}44`,
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};
