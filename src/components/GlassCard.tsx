import React from "react";
import { THEME } from "../styles/theme";

interface GlassCardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  borderColor?: string;
  glow?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  borderColor = THEME.colors.borderGlass,
  glow = false,
}) => {
  return (
    <div
      style={{
        backgroundColor: THEME.colors.bgCard,
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        border: `1px solid ${borderColor}`,
        borderRadius: "24px",
        boxShadow: glow
          ? `0 20px 50px rgba(0, 0, 0, 0.6), 0 0 40px ${borderColor}33`
          : "0 20px 50px rgba(0, 0, 0, 0.5)",
        padding: "32px",
        overflow: "hidden",
        position: "relative",
        ...style,
      }}
    >
      {/* Subtle top glare edge */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
          pointerEvents: "none",
        }}
      />
      {children}
    </div>
  );
};
