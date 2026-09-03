import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../styles/theme";
import { ShieldCheck, ShieldAlert, Laptop, Server, Smartphone, Wifi, Radio } from "lucide-react";

interface NetworkGraphProps {
  phase?: "scanning" | "denied" | "authorized" | "active";
}

export const NetworkGraph: React.FC<NetworkGraphProps> = ({
  phase = "active",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Packet animation
  const packetProgress = (frame % 60) / 60;

  return (
    <div
      style={{
        position: "relative",
        width: "1100px",
        height: "560px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* SVG Connection Lines */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <defs>
          <linearGradient id="cyanLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={THEME.colors.accentCyan} stopOpacity="0.8" />
            <stop offset="100%" stopColor={THEME.colors.accentBlue} stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="redLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={THEME.colors.accentRose} stopOpacity="0.9" />
            <stop offset="100%" stopColor={THEME.colors.accentRose} stopOpacity="0.2" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Central Gateway Lines */}
        {/* Gateway to Staff */}
        <line
          x1="550"
          y1="280"
          x2="220"
          y2="140"
          stroke="url(#cyanLine)"
          strokeWidth="2.5"
          strokeDasharray="6 4"
        />
        {/* Gateway to Students */}
        <line
          x1="550"
          y1="280"
          x2="220"
          y2="420"
          stroke="url(#cyanLine)"
          strokeWidth="2.5"
          strokeDasharray="6 4"
        />
        {/* Gateway to Systems/Servers */}
        <line
          x1="550"
          y1="280"
          x2="880"
          y2="140"
          stroke="url(#cyanLine)"
          strokeWidth="2.5"
          strokeDasharray="6 4"
        />
        {/* Gateway to Rogue Device (Denied) or Authorized */}
        <line
          x1="550"
          y1="280"
          x2="880"
          y2="420"
          stroke={phase === "denied" ? "url(#redLine)" : "url(#cyanLine)"}
          strokeWidth="3"
          filter="url(#glow)"
        />

        {/* Animated packet along rogue line */}
        <circle
          cx={interpolate(packetProgress, [0, 1], [880, 550])}
          cy={interpolate(packetProgress, [0, 1], [420, 280])}
          r="6"
          fill={phase === "denied" ? THEME.colors.accentRose : THEME.colors.accentEmerald}
          filter="url(#glow)"
        />
      </svg>

      {/* Central Node: BSOP Core Network Gateway */}
      <div
        style={{
          position: "absolute",
          left: "550px",
          top: "280px",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        <div
          style={{
            width: "110px",
            height: "110px",
            borderRadius: "50%",
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            border: `3px solid ${THEME.colors.accentCyan}`,
            boxShadow: `0 0 50px ${THEME.colors.accentCyan}55`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Wifi size={48} color={THEME.colors.accentCyan} />
        </div>
        <span
          style={{
            marginTop: "12px",
            fontSize: "17px",
            fontWeight: 800,
            letterSpacing: "0.08em",
            color: THEME.colors.textPrimary,
          }}
        >
          BSOP CORE GATEWAY
        </span>
        <span
          style={{
            fontSize: "13px",
            color: THEME.colors.accentCyan,
            fontFamily: THEME.fonts.mono,
          }}
        >
          10.10.0.1 · 802.1X RADIUS
        </span>
      </div>

      {/* Left Node: Staff Network */}
      <div
        style={{
          position: "absolute",
          left: "220px",
          top: "140px",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "20px",
            backgroundColor: "rgba(18, 24, 38, 0.9)",
            border: `1.5px solid ${THEME.colors.borderGlass}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Laptop size={36} color={THEME.colors.accentBlue} />
        </div>
        <span style={{ marginTop: "10px", fontSize: "15px", fontWeight: 700 }}>
          STAFF VLAN
        </span>
        <span style={{ fontSize: "12px", color: THEME.colors.textMuted }}>
          WPA3 Enterprise
        </span>
      </div>

      {/* Left Node 2: Students Network */}
      <div
        style={{
          position: "absolute",
          left: "220px",
          top: "420px",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "20px",
            backgroundColor: "rgba(18, 24, 38, 0.9)",
            border: `1.5px solid ${THEME.colors.borderGlass}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Smartphone size={36} color={THEME.colors.accentIndigo} />
        </div>
        <span style={{ marginTop: "10px", fontSize: "15px", fontWeight: 700 }}>
          STUDENTS VLAN
        </span>
        <span style={{ fontSize: "12px", color: THEME.colors.textMuted }}>
          Bandwidth Shaped
        </span>
      </div>

      {/* Right Node 1: Institutional Servers */}
      <div
        style={{
          position: "absolute",
          left: "880px",
          top: "140px",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "20px",
            backgroundColor: "rgba(18, 24, 38, 0.9)",
            border: `1.5px solid ${THEME.colors.borderGlass}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Server size={36} color={THEME.colors.accentEmerald} />
        </div>
        <span style={{ marginTop: "10px", fontSize: "15px", fontWeight: 700 }}>
          INTERNAL SYSTEMS
        </span>
        <span style={{ fontSize: "12px", color: THEME.colors.textMuted }}>
          Zero-Trust Firewall
        </span>
      </div>

      {/* Right Node 2: Testing Device (Unregistered vs Registered) */}
      <div
        style={{
          position: "absolute",
          left: "880px",
          top: "420px",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "88px",
            height: "88px",
            borderRadius: "22px",
            backgroundColor: "rgba(18, 24, 38, 0.95)",
            border: `2px solid ${
              phase === "denied"
                ? THEME.colors.accentRose
                : THEME.colors.accentEmerald
            }`,
            boxShadow: `0 0 35px ${
              phase === "denied"
                ? `${THEME.colors.accentRose}55`
                : `${THEME.colors.accentEmerald}55`
            }`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {phase === "denied" ? (
            <ShieldAlert size={42} color={THEME.colors.accentRose} />
          ) : (
            <ShieldCheck size={42} color={THEME.colors.accentEmerald} />
          )}
        </div>

        <div
          style={{
            marginTop: "12px",
            padding: "6px 14px",
            borderRadius: "999px",
            backgroundColor:
              phase === "denied"
                ? "rgba(244, 63, 94, 0.2)"
                : "rgba(16, 185, 129, 0.2)",
            border: `1px solid ${
              phase === "denied"
                ? THEME.colors.accentRose
                : THEME.colors.accentEmerald
            }`,
            fontSize: "14px",
            fontWeight: 800,
            letterSpacing: "0.08em",
            color:
              phase === "denied"
                ? THEME.colors.accentRose
                : THEME.colors.accentEmerald,
          }}
        >
          {phase === "denied" ? "ACCESS DENIED" : "REGISTERED DEVICE"}
        </div>
      </div>
    </div>
  );
};
