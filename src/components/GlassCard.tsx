import React from "react";
import { THEME } from "../styles/theme";
import { ShimmerSweep } from "./ShimmerSweep";

interface GlassCardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  borderColor?: string;
  glow?: boolean;
  shimmer?: boolean;
  variant?: "liquid" | "standard";
}

/**
 * GlassCard with HyperFrames Liquid-Glass Styling
 * 4-stop diagonal gradient with inner 1px highlight and backdrop blur
 */
export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  borderColor = THEME.colors.borderGlass,
  glow = false,
  shimmer = false,
  variant = "liquid",
}) => {
  const isLiquid = variant === "liquid";

  return (
    <div
      style={{
        background: isLiquid
          ? "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.028) 35%, rgba(255, 255, 255, 0.012) 65%, rgba(255, 255, 255, 0.06) 100%), rgba(10, 14, 23, 0.72)"
          : THEME.colors.bgCard,
        backdropFilter: "blur(20px) saturate(130%)",
        WebkitBackdropFilter: "blur(20px) saturate(130%)",
        border: `1px solid ${borderColor}`,
        borderRadius: "24px",
        boxShadow: glow
          ? `0 24px 60px rgba(0, 0, 0, 0.65), 0 0 45px ${borderColor}44, inset 0 1px 0 rgba(255, 255, 255, 0.24)`
          : "0 24px 60px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.18)",
        padding: "32px",
        overflow: "hidden",
        position: "relative",
        ...style,
      }}
    >
      {/* Subtle top glare edge (Liquid glass specular tell) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "12%",
          right: "12%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
          pointerEvents: "none",
        }}
      />
      {shimmer && <ShimmerSweep color={`${borderColor}44`} />}
      {children}
    </div>
  );
};
