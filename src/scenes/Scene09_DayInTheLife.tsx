import React from "react";
import { Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { QuoteBlock } from "../components/QuoteBlock";
import { SceneTransitionWrapper } from "../components/SceneTransitionWrapper";
import { ShimmerSweep } from "../components/ShimmerSweep";
import { SpeakerBadge } from "../components/SpeakerBadge";
import { StatCounterBadge } from "../components/StatCounterBadge";
import { TitleCard } from "../components/TitleCard";
import { THEME } from "../styles/theme";
import { CheckCircle2, Video, Projector, Mic, Wifi, Check, Activity } from "lucide-react";

export interface Scene09Props {
  audioSrc?: string;
  speaker?: string;
  emotion?: string;
}

export const Scene09_DayInTheLife: React.FC<Scene09Props> = ({
  audioSrc = staticFile("audio/dubbing/scene_09_day_in_the_life_deign.wav"),
  speaker = "Deign Lazaro",
  emotion = "Observational & Dynamic",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth cross-transition around frame 410-450
  const quoteExitProgress = interpolate(frame, [410, 445], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const quoteOpacity = 1 - quoteExitProgress;

  // 3D Isometric camera pan & float throughout full 1710 frames (NO freeze!)
  const isoPanX = interpolate(frame, [440, 1710], [-40, 45], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const isoPanY = interpolate(frame, [440, 1710], [20, -25], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const isoScale = interpolate(frame, [440, 1710], [0.95, 1.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const campusRooms = [
    { name: "Hybrid Hall A", gear: "PTZ + Projector", delay: 480, icon: Projector },
    { name: "Lecture Hall B", gear: "Dual Screens + Audio", delay: 570, icon: Video },
    { name: "Seminar Room 101", gear: "Conference Mic Grid", delay: 660, icon: Mic },
    { name: "Main Computer Lab", gear: "VLAN & Switchboard", delay: 750, icon: Wifi },
    { name: "Faculty Commons", gear: "Wi-Fi 6 Gateway", delay: 840, icon: Wifi },
    { name: "Admin Studio", gear: "Web & Graphics Hub", delay: 930, icon: Projector },
  ];

  return (
    <SceneTransitionWrapper durationInFrames={1710} transitionType="slide-up" accentColor={THEME.colors.accentCyan}>
      <Background accentColor={THEME.colors.accentCyan}>
        {audioSrc && <Audio src={audioSrc} />}
        <SpeakerBadge speaker={speaker} role={emotion} />

        {/* Phase 1: Quote Block */}
        {frame < 450 && (
          <div
            style={{
              opacity: quoteOpacity,
              transform: `scale(${interpolate(quoteExitProgress, [0, 1], [1, 0.93])})`,
              willChange: "transform, opacity",
            }}
          >
            <QuoteBlock
              quote="Mostly, I'm just in front of my laptop. Sometimes, I go out to the classrooms that are hybrid to check if they are doing okay."
              author="Jansen Lee"
              role="Daily Routine & Proactive Campus Checks"
              accentColor={THEME.colors.accentCyan}
            />
          </div>
        )}

        {/* Phase 2: Isometric Campus Monitoring Grid */}
        {frame >= 430 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              gap: "20px",
              opacity: interpolate(frame, [430, 460], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <TitleCard
              badge="06 — Proactive Field Checks"
              badgeColor={THEME.colors.accentCyan}
              title="CHECKING SYSTEMS BEFORE PROBLEMS OCCUR"
              subtitle="Walking into hybrid classrooms before students arrive so faculty never experience downtime."
              highlightWords={["BEFORE", "PROBLEMS", "OCCUR"]}
            />

            {/* 3D Isometric Campus Grid Container */}
            <div
              style={{
                width: "920px",
                height: "430px",
                perspective: "1200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "16px",
              }}
            >
              <div
                style={{
                  width: "700px",
                  height: "380px",
                  transform: `scale(${isoScale}) rotateX(55deg) rotateZ(-35deg) translate(${isoPanX}px, ${isoPanY}px)`,
                  transformStyle: "preserve-3d",
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "24px",
                  padding: "24px",
                  backgroundColor: "rgba(11, 17, 30, 0.85)",
                  borderRadius: "28px",
                  border: `2px solid ${THEME.colors.accentCyan}44`,
                  boxShadow: "0 30px 70px rgba(0,0,0,0.8), 0 0 50px rgba(56, 189, 248, 0.2)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <ShimmerSweep period={110} color="rgba(56, 189, 248, 0.25)" />

                {campusRooms.map((room, idx) => {
                  const isChecked = frame >= room.delay;
                  const checkSpr = isChecked
                    ? spring({
                        frame: frame - room.delay,
                        fps,
                        config: THEME.springs.bouncy,
                      })
                    : 0;

                  const Icon = room.icon;

                  return (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: isChecked
                          ? "rgba(16, 185, 129, 0.25)"
                          : "rgba(18, 24, 38, 0.9)",
                        border: `1.5px solid ${
                          isChecked ? THEME.colors.accentEmerald : THEME.colors.borderGlass
                        }`,
                        borderRadius: "18px",
                        padding: "20px 16px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        boxShadow: isChecked
                          ? `0 0 30px ${THEME.colors.accentEmerald}55`
                          : "none",
                        transform: isChecked
                          ? `translateZ(${interpolate(checkSpr, [0, 1], [0, 24])}px)`
                          : "translateZ(0px)",
                      }}
                    >
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "14px",
                          backgroundColor: isChecked
                            ? "rgba(16, 185, 129, 0.3)"
                            : "rgba(255, 255, 255, 0.05)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: "10px",
                        }}
                      >
                        {isChecked ? (
                          <Check size={26} color={THEME.colors.accentEmerald} strokeWidth={3} />
                        ) : (
                          <Icon size={24} color={THEME.colors.textSecondary} />
                        )}
                      </div>

                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color: THEME.colors.textPrimary,
                        }}
                      >
                        {room.name}
                      </div>
                      <div
                        style={{
                          fontSize: "11px",
                          color: isChecked ? THEME.colors.accentEmerald : THEME.colors.textMuted,
                          marginTop: "2px",
                          fontWeight: isChecked ? 600 : 400,
                        }}
                      >
                        {isChecked ? "READY FOR CLASS" : room.gear}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Continuous Campus Readiness Badges (Frames 1000+) */}
            {frame >= 980 && (
              <div style={{ display: "flex", gap: "24px", marginTop: "8px" }}>
                <StatCounterBadge
                  targetValue={6}
                  suffix=" Rooms"
                  label="Hybrid Classrooms Verified"
                  sublabel="Zero start-of-class delays"
                  accentColor={THEME.colors.accentEmerald}
                  delayInFrames={990}
                />
                <StatCounterBadge
                  targetValue={100}
                  suffix="%"
                  label="Lecturer Readiness"
                  sublabel="Proactive A/V verification"
                  accentColor={THEME.colors.accentCyan}
                  delayInFrames={1010}
                />
              </div>
            )}
          </div>
        )}
      </Background>
    </SceneTransitionWrapper>
  );
};
