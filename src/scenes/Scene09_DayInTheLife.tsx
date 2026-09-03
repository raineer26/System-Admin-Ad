import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { QuoteBlock } from "../components/QuoteBlock";
import { TitleCard } from "../components/TitleCard";
import { THEME } from "../styles/theme";
import { Laptop, Video, ShieldCheck, Sparkles } from "lucide-react";

export const Scene09_DayInTheLife: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showQuote = frame < 280;

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
      {/* Background Hybrid Classroom B-Roll */}
      <Img
        src={staticFile("images/hybrid_classroom_broll.jpg")}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(0.28) saturate(1.1)",
          transform: `scale(${interpolate(frame, [0, 720], [1.02, 1.07])})`,
        }}
      />

      <Background accentColor={THEME.colors.accentCyan} gridOpacity={0.05}>
        {showQuote ? (
          <QuoteBlock
            quote="Mostly, I'm just in front of my laptop. Sometimes, I go out to the classrooms that are hybrid to check if they are doing okay."
            author="Jansen Lee"
            role="Daily Rhythm & Proactive Checks"
            accentColor={THEME.colors.accentCyan}
          />
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "36px",
            }}
          >
            <TitleCard
              badge="06 — A Day in the Life"
              badgeColor={THEME.colors.accentCyan}
              title="FIXING PROBLEMS BEFORE USERS NOTICE"
              subtitle="Walking into a lecture hall before class starts to make sure hybrid streams, projectors, and audio never skip a beat."
              highlightWords={["BEFORE", "USERS", "NOTICE"]}
            />

            <div style={{ display: "flex", gap: "28px" }}>
              {/* Pillar 1: Workstation */}
              <div
                style={{
                  backgroundColor: "rgba(15, 23, 42, 0.85)",
                  border: `1px solid ${THEME.colors.accentBlue}55`,
                  borderRadius: "24px",
                  padding: "36px 32px",
                  width: "420px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  backdropFilter: "blur(16px)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "16px",
                      backgroundColor: `${THEME.colors.accentBlue}22`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Laptop size={28} color={THEME.colors.accentBlue} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "20px", fontWeight: 800 }}>The Workstation</h3>
                    <span style={{ fontSize: "13px", color: THEME.colors.textMuted }}>Digital Hub</span>
                  </div>
                </div>
                <p style={{ fontSize: "15px", color: THEME.colors.textSecondary, lineHeight: 1.5, margin: 0 }}>
                  Website development, Photoshop graphics, institutional Google Admin directory, and remote ticket queues.
                </p>
              </div>

              {/* Pillar 2: Hybrid Classrooms */}
              <div
                style={{
                  backgroundColor: "rgba(15, 23, 42, 0.85)",
                  border: `1px solid ${THEME.colors.accentEmerald}55`,
                  borderRadius: "24px",
                  padding: "36px 32px",
                  width: "420px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  backdropFilter: "blur(16px)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "16px",
                      backgroundColor: `${THEME.colors.accentEmerald}22`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Video size={28} color={THEME.colors.accentEmerald} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "20px", fontWeight: 800 }}>Hybrid Classrooms</h3>
                    <span style={{ fontSize: "13px", color: THEME.colors.textMuted }}>Physical Reality</span>
                  </div>
                </div>
                <p style={{ fontSize: "15px", color: THEME.colors.textSecondary, lineHeight: 1.5, margin: 0 }}>
                  Checking projector calibrations, PTZ cameras, mic inputs, and network latency so faculty can teach uninterrupted.
                </p>
              </div>
            </div>
          </div>
        )}
      </Background>
    </div>
  );
};
