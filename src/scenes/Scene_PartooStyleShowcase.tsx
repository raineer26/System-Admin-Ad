import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  AiAgentCard,
  Background,
  MultiChannelGrid,
  SceneTransitionWrapper,
  SimulatedCursor,
  StatCounterBadge,
} from "../components";
import { THEME } from "../styles/theme";

export const Scene_PartooStyleShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Act 1: Headline Entrance (Frames 0 - 60)
  const titleSpring = spring({
    frame,
    fps,
    config: THEME.springs.snappy,
  });

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Header position shift when Act 2 starts (Frame 60+)
  const headerMoveProgress = interpolate(frame, [60, 85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headerScale = interpolate(headerMoveProgress, [0, 1], [1, 0.78]);
  const headerY = interpolate(headerMoveProgress, [0, 1], [0, -380]);

  // Act 2: Interactive AI Demo (Frames 60 - 240)
  const showDemo = frame >= 50;

  // Act 3: Multi-Channel & Metrics Grid (Frames 220 - 360)
  const act3Progress = interpolate(frame, [220, 245], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const demoShiftX = interpolate(act3Progress, [0, 1], [0, -420]);

  // Act 4: Outro CTA (Frames 360 - 450)
  const showOutro = frame >= 360;
  const outroSpring = isFinite(frame) && showOutro
    ? spring({
        frame: frame - 360,
        fps,
        config: THEME.springs.bouncy,
      })
    : 0;
  const outroOpacity = interpolate(frame, [360, 380], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneTransitionWrapper durationInFrames={450} accentColor={THEME.colors.accentCyan}>
      <Background accentColor={THEME.colors.accentCyan} gridOpacity={0.08}>
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Kinetic Header Section */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            transform: `translate(-50%, calc(-50% + ${headerY}px)) scale(${headerScale})`,
            left: "50%",
            textAlign: "center",
            opacity: titleOpacity,
            zIndex: 10,
            width: "1100px",
          }}
        >
          {/* Top Pill Highlight */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 18px",
              borderRadius: "30px",
              backgroundColor: "rgba(56, 189, 248, 0.12)",
              border: `1px solid ${THEME.colors.accentCyan}55`,
              color: THEME.colors.accentCyan,
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "1px",
              textTransform: "uppercase",
              marginBottom: "16px",
              boxShadow: `0 0 20px ${THEME.colors.accentCyan}33`,
              transform: `scale(${titleSpring})`,
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: THEME.colors.accentCyan,
                boxShadow: `0 0 10px ${THEME.colors.accentCyan}`,
              }}
            />
            Meet Jim — Partoo's All-in-One AI Agent
          </div>

          {/* Main Title */}
          <h1
            style={{
              fontSize: "58px",
              fontWeight: 900,
              fontFamily: THEME.fonts.heading,
              color: THEME.colors.textPrimary,
              lineHeight: "1.15",
              margin: 0,
              letterSpacing: "-1.5px",
            }}
          >
            Automate Local Marketing & Customer Operations{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${THEME.colors.accentCyan}, ${THEME.colors.accentIndigo})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              24/7
            </span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "20px",
              color: THEME.colors.textSecondary,
              fontFamily: THEME.fonts.body,
              marginTop: "14px",
              marginBottom: 0,
              maxWidth: "800px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Seamlessly capture leads, manage Google reviews, answer messages, and streamline workflows.
          </p>
        </div>

        {/* Demo Stage (Act 2 & 3) */}
        {showDemo && !showOutro && (
          <div
            style={{
              position: "absolute",
              top: "52%",
              left: "50%",
              transform: `translate(calc(-50% + ${demoShiftX}px), -45%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "40px",
              zIndex: 5,
            }}
          >
            {/* Left AI Agent Live Card */}
            <AiAgentCard delayInFrames={55} triggerApproveFrame={135} />

            {/* Right Multi-Channel & Metrics Side Panel (Enters in Act 3) */}
            {frame >= 220 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                }}
              >
                {/* Metric Counter Row */}
                <div style={{ display: "flex", gap: "16px" }}>
                  <StatCounterBadge
                    targetValue={80}
                    suffix="%"
                    label="Automated Messages"
                    sublabel="No manual labor"
                    accentColor={THEME.colors.accentCyan}
                    delayInFrames={230}
                  />
                  <StatCounterBadge
                    targetValue={97}
                    suffix="%"
                    label="AI Tone Match"
                    sublabel="High satisfaction"
                    accentColor={THEME.colors.accentEmerald}
                    delayInFrames={245}
                  />
                </div>

                {/* Multi Channel Cards */}
                <MultiChannelGrid delayInFrames={250} />
              </div>
            )}
          </div>
        )}

        {/* Simulated Cursor (Act 2 Mouse Hover & Click) */}
        {frame >= 70 && frame <= 180 && !showOutro && (
          <SimulatedCursor
            startX={1450}
            startY={850}
            endX={1220}
            endY={620}
            moveStartFrame={75}
            moveDuration={45}
            clickFrame={135}
            label="Approve & Send"
          />
        )}

        {/* Act 4: Outro Branding & CTA */}
        {showOutro && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) scale(${outroSpring})`,
              opacity: outroOpacity,
              textAlign: "center",
              zIndex: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
            }}
          >
            <div
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "24px",
                background: `linear-gradient(135deg, ${THEME.colors.accentCyan}, ${THEME.colors.accentIndigo})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 0 50px ${THEME.colors.accentCyan}aa`,
              }}
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                  fill="#FFFFFF"
                />
              </svg>
            </div>

            <h2
              style={{
                fontSize: "52px",
                fontWeight: 900,
                color: THEME.colors.textPrimary,
                fontFamily: THEME.fonts.heading,
                margin: 0,
              }}
            >
              Transform Your Local Marketing with Jim
            </h2>

            <p
              style={{
                fontSize: "22px",
                color: THEME.colors.textSecondary,
                fontFamily: THEME.fonts.body,
                margin: 0,
                maxWidth: "700px",
              }}
            >
              Turn every online interaction into an opportunity. Start automating today.
            </p>

            <button
              style={{
                marginTop: "12px",
                padding: "16px 40px",
                borderRadius: "16px",
                border: "none",
                background: `linear-gradient(135deg, ${THEME.colors.accentCyan}, ${THEME.colors.accentBlue})`,
                color: "#08090C",
                fontSize: "18px",
                fontWeight: 800,
                fontFamily: THEME.fonts.heading,
                boxShadow: `0 0 35px ${THEME.colors.accentCyan}88`,
                cursor: "pointer",
              }}
            >
              Meet Jim — Get Started Free
            </button>
          </div>
        )}
      </AbsoluteFill>
      </Background>
    </SceneTransitionWrapper>
  );
};
