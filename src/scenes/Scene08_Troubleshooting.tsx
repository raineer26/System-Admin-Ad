import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { GlassCard } from "../components/GlassCard";
import { QuoteBlock } from "../components/QuoteBlock";
import { TitleCard } from "../components/TitleCard";
import { THEME } from "../styles/theme";
import { Search, BookOpen, Wrench, CheckCircle2 } from "lucide-react";

export const Scene08_Troubleshooting: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 0 - 280: Quote about assisting mates & Google / W3Schools
  // 280 - 780: Kinetic flow "SEARCH. LEARN. TEST. FIX."
  const showQuote = frame < 280;

  const cycleSteps = [
    { word: "SEARCH", subtitle: "Google & Documentation", icon: Search, color: THEME.colors.accentCyan },
    { word: "LEARN", subtitle: "WordPress & W3Schools", icon: BookOpen, color: THEME.colors.accentBlue },
    { word: "TEST", subtitle: "Staging & Debugging", icon: Wrench, color: THEME.colors.accentAmber },
    { word: "FIX", subtitle: "Deployment & Resolution", icon: CheckCircle2, color: THEME.colors.accentEmerald },
  ];

  return (
    <Background accentColor={THEME.colors.accentAmber}>
      {showQuote ? (
        <QuoteBlock
          quote="Sometimes, I assist my office mates when they have problems with their computer. Usually, I just look into Google... and if there are technical stuff I can't find, I look at W3Schools."
          author="Jansen Lee"
          role="The Art of Troubleshooting"
          accentColor={THEME.colors.accentAmber}
        />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "40px",
            width: "100%",
          }}
        >
          <TitleCard
            badge="05 — The Reality of Troubleshooting"
            badgeColor={THEME.colors.accentAmber}
            title="NO ONE HAS ALL THE ANSWERS. THE BEST ADMINS KNOW HOW TO FIND THEM."
            subtitle="The problem solving loop that keeps every digital institution alive."
            highlightWords={["BEST", "ADMINS", "FIND", "THEM."]}
          />

          {/* 4 Loop Steps */}
          <div style={{ display: "flex", gap: "24px" }}>
            {cycleSteps.map((step, idx) => {
              const stepDelay = 300 + idx * 16;
              const spr = spring({
                frame: frame - stepDelay,
                fps,
                config: THEME.springs.bouncy,
              });
              const Icon = step.icon;

              return (
                <div
                  key={idx}
                  style={{
                    transform: `scale(${interpolate(spr, [0, 1], [0.8, 1])})`,
                    opacity: interpolate(frame - stepDelay, [0, 12], [0, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }),
                    backgroundColor: "rgba(18, 24, 38, 0.9)",
                    border: `1.5px solid ${step.color}55`,
                    borderRadius: "24px",
                    padding: "36px 32px",
                    width: "240px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    boxShadow: `0 20px 40px rgba(0,0,0,0.6), 0 0 30px ${step.color}22`,
                  }}
                >
                  <div
                    style={{
                      width: "68px",
                      height: "68px",
                      borderRadius: "20px",
                      backgroundColor: `${step.color}20`,
                      border: `1px solid ${step.color}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "18px",
                      boxShadow: `0 0 20px ${step.color}44`,
                    }}
                  >
                    <Icon size={34} color={step.color} />
                  </div>

                  <h2
                    style={{
                      fontSize: "30px",
                      fontWeight: 900,
                      letterSpacing: "0.05em",
                      color: THEME.colors.textPrimary,
                      margin: "0 0 8px 0",
                    }}
                  >
                    {step.word}.
                  </h2>

                  <p
                    style={{
                      fontSize: "14px",
                      color: THEME.colors.textSecondary,
                      margin: 0,
                    }}
                  >
                    {step.subtitle}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Background>
  );
};
