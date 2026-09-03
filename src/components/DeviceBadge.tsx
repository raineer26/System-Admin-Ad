import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../styles/theme";
import { LucideIcon } from "lucide-react";

interface DeviceBadgeProps {
  name: string;
  category: string;
  status: "MONITORED" | "TRACKED" | "MAINTAINED" | "ONLINE";
  icon: LucideIcon;
  delay?: number;
}

export const DeviceBadge: React.FC<DeviceBadgeProps> = ({
  name,
  category,
  status,
  icon: Icon,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const spr = spring({
    frame: frame - delay,
    fps,
    config: THEME.springs.smooth,
  });

  const opacity = interpolate(frame - delay, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const getStatusColor = () => {
    switch (status) {
      case "MONITORED":
        return THEME.colors.accentCyan;
      case "TRACKED":
        return THEME.colors.accentAmber;
      case "MAINTAINED":
        return THEME.colors.accentEmerald;
      default:
        return THEME.colors.accentBlue;
    }
  };

  const statusColor = getStatusColor();

  return (
    <div
      style={{
        opacity,
        transform: `scale(${interpolate(spr, [0, 1], [0.85, 1])}) translateY(${interpolate(
          spr,
          [0, 1],
          [20, 0]
        )}px)`,
        backgroundColor: "rgba(18, 24, 38, 0.85)",
        border: `1px solid ${statusColor}44`,
        borderRadius: "20px",
        padding: "24px 20px",
        width: "250px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: `0 15px 35px rgba(0,0,0,0.5), 0 0 25px ${statusColor}18`,
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "16px",
          backgroundColor: `${statusColor}18`,
          border: `1px solid ${statusColor}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "14px",
          boxShadow: `0 0 16px ${statusColor}33`,
        }}
      >
        <Icon size={28} color={statusColor} />
      </div>

      <h4
        style={{
          fontSize: "17px",
          fontWeight: 700,
          color: THEME.colors.textPrimary,
          margin: "0 0 4px 0",
          textAlign: "center",
        }}
      >
        {name}
      </h4>

      <span
        style={{
          fontSize: "12px",
          color: THEME.colors.textMuted,
          marginBottom: "14px",
        }}
      >
        {category}
      </span>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "4px 12px",
          borderRadius: "999px",
          backgroundColor: `${statusColor}15`,
          border: `1px solid ${statusColor}55`,
          fontSize: "11px",
          fontWeight: 800,
          letterSpacing: "0.08em",
          color: statusColor,
        }}
      >
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: statusColor,
            boxShadow: `0 0 8px ${statusColor}`,
          }}
        />
        {status}
      </div>
    </div>
  );
};
