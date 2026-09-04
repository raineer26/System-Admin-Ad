import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../styles/theme";

export interface SpeakerMeta {
  name: string;
  role?: string;
  color: string;
  initials: string;
}

export const KNOWN_SPEAKERS: Record<string, SpeakerMeta> = {
  "Deign Lazaro": {
    name: "Deign Lazaro",
    role: "Opening, Network & Closing",
    color: THEME.colors.accentCyan,
    initials: "DL",
  },
  "Faijah Nonoy": {
    name: "Faijah Nonoy",
    role: "Story, User Mgmt & Invisible Work",
    color: THEME.colors.accentEmerald,
    initials: "FN",
  },
  "Sean Vasquez": {
    name: "Sean Vasquez",
    role: "Hardware & Work-Life Reality",
    color: THEME.colors.accentAmber,
    initials: "SV",
  },
  "Raineer Rosado": {
    name: "Raineer Rosado",
    role: "Website, Troubleshooting & Definition",
    color: THEME.colors.accentIndigo,
    initials: "RR",
  },
};

export interface SpeakerBadgeProps {
  /** Name of the narrator or speaker (e.g. "Deign Lazaro", "Faijah Nonoy", etc.) */
  speaker: string;
  /** Optional custom role or scene context (e.g. "Voiceover Artist") */
  role?: string;
  /** Status badge text, defaults to "VOICEOVER DUBBED" */
  statusText?: string;
  /** Custom accent color override */
  accentColor?: string;
  /** Delay in frames before entrance animation begins (default: 0) */
  delay?: number;
  /** Total duration in frames for this scene/badge. Defaults to composition duration */
  durationInFrames?: number;
  /** Number of frames over which the badge fades out before scene ends (default: 20) */
  exitDuration?: number;
  /** Bottom position (default: 40) */
  bottom?: number | string;
  /** Left position (default: 60) */
  left?: number | string;
  /** Additional custom style overrides */
  style?: React.CSSProperties;
}

export const SpeakerBadge: React.FC<SpeakerBadgeProps> = ({
  speaker,
  role,
  statusText = "VOICEOVER DUBBED",
  accentColor: customColor,
  delay = 0,
  durationInFrames: propDuration,
  exitDuration = 20,
  bottom = 40,
  left = 60,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames: configDuration } = useVideoConfig();

  const totalDuration = propDuration ?? configDuration;

  // Resolve speaker details
  const matchedKey = Object.keys(KNOWN_SPEAKERS).find(
    (key) => key.toLowerCase() === speaker.toLowerCase() || speaker.toLowerCase().includes(key.toLowerCase())
  );
  const speakerMeta = matchedKey ? KNOWN_SPEAKERS[matchedKey] : undefined;

  const accentColor = customColor ?? speakerMeta?.color ?? THEME.colors.accentCyan;
  const displayRole = role ?? speakerMeta?.role;

  // Extract initials if not in preset
  const initials =
    speakerMeta?.initials ??
    speaker
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  // 1. Entrance animation (spring-driven scale & translate + linear opacity clamp)
  const enterSpring = spring({
    frame: frame - delay,
    fps,
    config: THEME.springs.smooth,
  });

  const enterOpacity = interpolate(frame - delay, [0, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const enterY = interpolate(enterSpring, [0, 1], [16, 0]);
  const enterScale = interpolate(enterSpring, [0, 1], [0.94, 1]);

  // 2. Exit animation (smooth fade-out before the end of the scene)
  const exitStart = Math.max(0, totalDuration - exitDuration);
  const exitSpring =
    frame >= exitStart
      ? spring({
          frame: frame - exitStart,
          fps,
          config: THEME.springs.smooth,
        })
      : 0;

  const exitOpacity = interpolate(exitSpring, [0, 1], [1, 0]);
  const exitY = interpolate(exitSpring, [0, 1], [0, 10]);
  const exitScale = interpolate(exitSpring, [0, 1], [1, 0.96]);

  // Combine transforms
  const finalOpacity = Math.max(0, Math.min(1, enterOpacity * exitOpacity));
  const finalTranslateY = enterY + exitY;
  const finalScale = enterScale * exitScale;

  // Hide completely if out of bounds to avoid unnecessary rendering
  if (finalOpacity <= 0.001 || frame < delay) {
    return null;
  }

  // 3. Audio waveform equalizer bars (animated deterministically by useCurrentFrame)
  const bar1 = interpolate(Math.sin(frame * 0.35), [-1, 1], [3, 13]);
  const bar2 = interpolate(Math.sin(frame * 0.48 + 1.2), [-1, 1], [5, 17]);
  const bar3 = interpolate(Math.sin(frame * 0.28 + 2.4), [-1, 1], [4, 11]);
  const bar4 = interpolate(Math.sin(frame * 0.42 + 0.7), [-1, 1], [6, 15]);
  const waveformBars = [bar1, bar2, bar3, bar4];

  // 4. Glowing pulsating LED indicator dot
  const pulse = Math.sin(frame * 0.18);
  const dotScale = interpolate(pulse, [-1, 1], [0.85, 1.25]);
  const dotGlow = interpolate(pulse, [-1, 1], [0.45, 0.95]);

  return (
    <div
      style={{
        position: "absolute",
        bottom,
        left,
        zIndex: 50,
        opacity: finalOpacity,
        transform: `translateY(${finalTranslateY}px) scale(${finalScale})`,
        transformOrigin: "bottom left",
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "10px 18px 10px 12px",
        backgroundColor: "rgba(15, 20, 30, 0.78)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: "16px",
        boxShadow: `0 16px 36px rgba(0, 0, 0, 0.45), 0 0 24px ${accentColor}18`,
        pointerEvents: "none",
        ...style,
      }}
    >
      {/* Subtle top glare edge matching GlassCard */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent)",
          pointerEvents: "none",
        }}
      />

      {/* Speaker Initials & Status Badge */}
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "12px",
          backgroundColor: `${accentColor}18`,
          border: `1px solid ${accentColor}44`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          boxShadow: `0 0 16px ${accentColor}25`,
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: THEME.fonts.mono,
            fontSize: "14px",
            fontWeight: 800,
            color: accentColor,
            letterSpacing: "0.02em",
          }}
        >
          {initials}
        </span>

        {/* Pulsing micro live dot on bottom-right of avatar */}
        <div
          style={{
            position: "absolute",
            bottom: "-2px",
            right: "-2px",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: accentColor,
            transform: `scale(${dotScale})`,
            boxShadow: `0 0 8px ${accentColor}`,
            border: "1.5px solid #08090C",
            opacity: dotGlow,
          }}
        />
      </div>

      {/* Speaker Information & Waveform Header */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "3px",
        }}
      >
        {/* Status Header: Animated Waveform + 'VOICEOVER DUBBED' */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
          }}
        >
          {/* Animated 4-bar audio equalizer */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2px",
              height: "14px",
              padding: "0 1px",
            }}
          >
            {waveformBars.map((h, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  width: "2.5px",
                  height: `${h}px`,
                  borderRadius: "1.5px",
                  backgroundColor: accentColor,
                  opacity: 0.9,
                  transition: "none",
                }}
              />
            ))}
          </div>

          {/* Pill / Subtext */}
          <span
            style={{
              fontFamily: THEME.fonts.mono,
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: accentColor,
              textTransform: "uppercase",
              opacity: 0.92,
            }}
          >
            {statusText}
          </span>
        </div>

        {/* Speaker Name */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontFamily: THEME.fonts.heading,
              fontSize: "15px",
              fontWeight: 700,
              color: THEME.colors.textPrimary,
              letterSpacing: "-0.01em",
              lineHeight: 1.2,
              whiteSpace: "nowrap",
            }}
          >
            {speaker}
          </span>

          {displayRole && (
            <span
              style={{
                fontFamily: THEME.fonts.mono,
                fontSize: "10px",
                fontWeight: 600,
                color: accentColor,
                backgroundColor: `${accentColor}18`,
                border: `1px solid ${accentColor}33`,
                borderRadius: "6px",
                padding: "2px 7px",
                letterSpacing: "0.02em",
                whiteSpace: "nowrap",
              }}
            >
              {displayRole}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
