import React from "react";
import { Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { SceneTransitionWrapper } from "../components/SceneTransitionWrapper";
import { ShimmerSweep } from "../components/ShimmerSweep";
import { SpeakerBadge } from "../components/SpeakerBadge";
import { StatCounterBadge } from "../components/StatCounterBadge";
import { TitleCard } from "../components/TitleCard";
import { THEME } from "../styles/theme";
import { Globe, Wifi, Users, Server, BookOpen, Activity, CheckCheck, ShieldCheck } from "lucide-react";

export interface Scene10Props {
  audioSrc?: string;
  speaker?: string;
  emotion?: string;
}

export const Scene10_InvisibleWork: React.FC<Scene10Props> = ({
  audioSrc = staticFile("audio/dubbing/scene_10_invisible_work_faijah.wav"),
  speaker = "Faijah Nonoy",
  emotion = "Philosophical & Reflective",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Long, continuous, slow zoom out pulling back across the entire digital ecosystem (0 to 1560)
  const pullBackZoom = interpolate(frame, [0, 1560], [1.12, 0.94], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const showPoint = frame >= 460;
  const pointSpring = showPoint
    ? spring({
        frame: frame - 460,
        fps,
        config: THEME.springs.bouncy,
      })
    : 0;

  const ecosystemNodes = [
    { title: "Website & CMS", icon: Globe, color: THEME.colors.accentCyan },
    { title: "Koha OPAC Library", icon: BookOpen, color: THEME.colors.accentEmerald },
    { title: "Campus Network", icon: Wifi, color: THEME.colors.accentBlue },
    { title: "Directory Accounts", icon: Users, color: THEME.colors.accentIndigo },
    { title: "Classroom Hardware", icon: Server, color: THEME.colors.accentAmber },
  ];

  return (
    <SceneTransitionWrapper durationInFrames={1560} transitionType="zoom-push" accentColor={showPoint ? THEME.colors.accentEmerald : THEME.colors.accentCyan}>
      <Background accentColor={showPoint ? THEME.colors.accentEmerald : THEME.colors.accentCyan} gridOpacity={0.06}>
        {audioSrc && <Audio src={audioSrc} />}
        <SpeakerBadge speaker={speaker} role={emotion} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            transform: `scale(${pullBackZoom})`,
            transformOrigin: "center center",
            willChange: "transform",
            gap: "28px",
          }}
        >
          {!showPoint ? (
            <TitleCard
              badge="The Unseen Foundation"
              badgeColor={THEME.colors.accentCyan}
              title="TECHNOLOGY IS INVISIBLE WHEN IT WORKS."
              subtitle="People don't think about the network, accounts, or equipment. They just expect everything to work."
              highlightWords={["INVISIBLE", "WHEN", "IT", "WORKS."]}
            />
          ) : (
            <div style={{ transform: `scale(${pointSpring})` }}>
              <TitleCard
                badge="The Ultimate Mission"
                badgeColor={THEME.colors.accentEmerald}
                title="AND THAT'S THE POINT."
                subtitle="Great system administration means making complex technology feel completely seamless to everyone else."
                highlightWords={["THAT'S", "THE", "POINT."]}
              />
            </div>
          )}

          {/* Connected Pulsing Ecosystem Cards (Active and Floating Across the FULL 1560 Frames) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              position: "relative",
            }}
          >
            {ecosystemNodes.map((node, idx) => {
              const Icon = node.icon;
              const pulse = Math.sin((frame + idx * 25) / 18) * 8;
              const isAccent = showPoint;

              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: isAccent ? "rgba(16, 28, 35, 0.92)" : "rgba(18, 24, 38, 0.9)",
                    border: `1.5px solid ${isAccent ? THEME.colors.accentEmerald : node.color}55`,
                    borderRadius: "22px",
                    padding: "26px 20px",
                    width: "190px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    boxShadow: isAccent
                      ? `0 15px 35px rgba(0,0,0,0.6), 0 0 30px ${THEME.colors.accentEmerald}25`
                      : `0 15px 35px rgba(0,0,0,0.6), 0 0 25px ${node.color}20`,
                    transform: `translateY(${pulse}px)`,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <ShimmerSweep delay={idx * 20} period={90} color="rgba(16, 185, 129, 0.25)" />
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "16px",
                      backgroundColor: `${isAccent ? THEME.colors.accentEmerald : node.color}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "12px",
                      boxShadow: `0 0 20px ${isAccent ? THEME.colors.accentEmerald : node.color}33`,
                    }}
                  >
                    <Icon size={26} color={isAccent ? THEME.colors.accentEmerald : node.color} />
                  </div>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 800,
                      color: THEME.colors.textPrimary,
                      marginBottom: "6px",
                    }}
                  >
                    {node.title}
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      color: THEME.colors.accentEmerald,
                      fontFamily: THEME.fonts.mono,
                      fontWeight: 700,
                    }}
                  >
                    ● 99.98% UP
                  </span>
                </div>
              );
            })}
          </div>

          {/* Continuous Telemetry Metric Badge during Phase 2 */}
          {showPoint && (
            <div style={{ display: "flex", gap: "24px", marginTop: "12px" }}>
              <StatCounterBadge
                targetValue={100}
                suffix="%"
                label="Frictionless Operation"
                sublabel="Completely transparent to users"
                accentColor={THEME.colors.accentEmerald}
                delayInFrames={480}
              />
              <StatCounterBadge
                targetValue={0}
                suffix=" Interruptions"
                label="Unscheduled Classroom Down-time"
                sublabel="Silent proactive maintenance"
                accentColor={THEME.colors.accentCyan}
                delayInFrames={500}
              />
            </div>
          )}
        </div>
      </Background>
    </SceneTransitionWrapper>
  );
};
