import React from "react";
import { THEME } from "../styles/theme";

interface TerminalLine {
  text: string;
  type?: "command" | "output" | "error" | "success" | "warn";
}

interface TerminalWindowProps {
  title?: string;
  lines: TerminalLine[];
  width?: string | number;
  height?: string | number;
  showCursor?: boolean;
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({
  title = "zsh — admin@bsop-gateway",
  lines,
  width = 720,
  height = 420,
  showCursor = true,
}) => {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: "rgba(11, 15, 23, 0.92)",
        borderRadius: "16px",
        border: `1px solid ${THEME.colors.borderGlass}`,
        boxShadow: "0 25px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(56, 189, 248, 0.15)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        fontFamily: THEME.fonts.mono,
        fontSize: "15px",
      }}
    >
      {/* Window Header */}
      <div
        style={{
          height: "44px",
          backgroundColor: "rgba(20, 26, 38, 0.9)",
          borderBottom: `1px solid ${THEME.colors.borderGlass}`,
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          position: "relative",
        }}
      >
        {/* macOS Traffic Lights */}
        <div style={{ display: "flex", gap: "8px" }}>
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#EF4444",
            }}
          />
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#F59E0B",
            }}
          />
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#10B981",
            }}
          />
        </div>

        {/* Window Title */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            textAlign: "center",
            fontSize: "13px",
            color: THEME.colors.textMuted,
            fontWeight: 500,
            pointerEvents: "none",
          }}
        >
          {title}
        </div>
      </div>

      {/* Terminal Content */}
      <div
        style={{
          padding: "20px 24px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          overflowY: "auto",
        }}
      >
        {lines.map((line, index) => {
          let color = THEME.colors.textPrimary;
          let prefix = "";

          if (line.type === "command") {
            color = THEME.colors.accentCyan;
            prefix = "➜  ";
          } else if (line.type === "error") {
            color = THEME.colors.accentRose;
          } else if (line.type === "success") {
            color = THEME.colors.accentEmerald;
          } else if (line.type === "warn") {
            color = THEME.colors.accentAmber;
          } else {
            color = THEME.colors.textSecondary;
          }

          return (
            <div key={index} style={{ color, lineHeight: 1.5 }}>
              <span style={{ color: THEME.colors.accentBlue }}>{prefix}</span>
              {line.text}
            </div>
          );
        })}

        {showCursor && (
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ color: THEME.colors.accentBlue }}>➜  </span>
            <span
              style={{
                display: "inline-block",
                width: "9px",
                height: "18px",
                backgroundColor: THEME.colors.accentCyan,
                animation: "none",
                boxShadow: `0 0 8px ${THEME.colors.accentCyan}`,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
