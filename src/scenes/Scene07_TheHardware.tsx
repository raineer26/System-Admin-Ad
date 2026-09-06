import React from "react";
import { Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { SceneTransitionWrapper } from "../components/SceneTransitionWrapper";
import { ShimmerSweep } from "../components/ShimmerSweep";
import { SpeakerBadge } from "../components/SpeakerBadge";
import { StatCounterBadge } from "../components/StatCounterBadge";
import { TitleCard } from "../components/TitleCard";
import { THEME } from "../styles/theme";
import { Laptop, Projector, Tv, Printer, Camera, Cable, Check, Activity } from "lucide-react";

export interface Scene07Props {
  audioSrc?: string;
  speaker?: string;
  emotion?: string;
}

export const Scene07_TheHardware: React.FC<Scene07Props> = ({
  audioSrc = staticFile("audio/dubbing/scene_07_the_hardware_sean.wav"),
  speaker = "Sean Vasquez",
  emotion = "Grounded & Pragmatic",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Continuous subtle zoom across full 1950 frames (NO premature black screen!)
  const cameraScale = interpolate(frame, [0, 1950], [0.98, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const hardwareItems = [
    { name: "Staff Computers", category: "Laptops & Desktops", status: "MAINTAINED", icon: Laptop, delay: 0 },
    { name: "Laser Projectors", category: "Lecture Halls", status: "MONITORED", icon: Projector, delay: 10 },
    { name: "Conference Displays", category: "Meeting Rooms", status: "TRACKED", icon: Tv, delay: 20 },
    { name: "Network Printers", category: "Administrative Offices", status: "MONITORED", icon: Printer, delay: 30 },
    { name: "PTZ Stream Cameras", category: "Hybrid Classrooms", status: "MAINTAINED", icon: Camera, delay: 40 },
    { name: "Cabling & Fiber", category: "Infrastructure Backbone", status: "TRACKED", icon: Cable, delay: 50 },
  ];

  return (
    <SceneTransitionWrapper durationInFrames={1950} transitionType="zoom-push" accentColor={THEME.colors.accentEmerald}>
      <Background accentColor={THEME.colors.accentEmerald}>
        {audioSrc && <Audio src={audioSrc} />}
        <SpeakerBadge speaker={speaker} role={emotion} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "28px",
            width: "100%",
            transform: `scale(${cameraScale})`,
            transformOrigin: "center center",
            willChange: "transform",
          }}
        >
          <TitleCard
            badge="04 — The Physical Infrastructure"
            badgeColor={THEME.colors.accentEmerald}
            title="IF IT'S PART OF THE SYSTEM, IT NEEDS TO WORK."
            subtitle="Technology doesn't just live in the cloud. Every cable, projector, printer, and screen must be accounted for."
            highlightWords={["PART", "SYSTEM,", "NEEDS", "WORK."]}
          />

          {/* 2x3 Hardware Grid with 3D Perspective Tilt and Circular Animated Checkmarks */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
              maxWidth: "1040px",
              perspective: "1000px",
            }}
          >
            {hardwareItems.map((item, idx) => {
              const spr = spring({
                frame: frame - item.delay,
                fps,
                config: THEME.springs.smooth,
              });

              // 3D subtle continuous rotation mapped to frames
              const rotX = Math.sin((frame + idx * 30) / 25) * 4;
              const rotY = Math.cos((frame + idx * 20) / 25) * 5;
              const floatY = Math.sin((frame + idx * 15) / 18) * 6;

              const checkProgress = interpolate(
                frame - (item.delay + 30),
                [0, 25],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );

              const Icon = item.icon;

              return (
                <div
                  key={idx}
                  style={{
                    transform: `scale(${interpolate(spr, [0, 1], [0.8, 1])}) translateY(${floatY}px) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
                    opacity: interpolate(frame - item.delay, [0, 8], [0, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }),
                    backgroundColor: "rgba(15, 23, 42, 0.85)",
                    border: `1px solid ${THEME.colors.accentEmerald}33`,
                    borderRadius: "22px",
                    padding: "24px 20px",
                    width: "320px",
                    display: "flex",
                    alignItems: "center",
                    gap: "18px",
                    backdropFilter: "blur(16px)",
                    boxShadow: "0 15px 35px rgba(0,0,0,0.5), 0 0 25px rgba(16, 185, 129, 0.1)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <ShimmerSweep delay={idx * 20} period={90} color="rgba(16, 185, 129, 0.25)" />

                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "16px",
                      backgroundColor: "rgba(16, 185, 129, 0.15)",
                      border: `1.5px solid ${THEME.colors.accentEmerald}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={28} color={THEME.colors.accentEmerald} />
                  </div>

                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: 700,
                        color: THEME.colors.textPrimary,
                        marginBottom: "4px",
                      }}
                    >
                      {item.name}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: THEME.colors.textSecondary,
                        marginBottom: "8px",
                      }}
                    >
                      {item.category}
                    </div>

                    {/* Circular Animated Status Pill */}
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "4px 10px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(16, 185, 129, 0.12)",
                        border: "1px solid rgba(16, 185, 129, 0.3)",
                        fontSize: "11px",
                        fontFamily: THEME.fonts.mono,
                        fontWeight: 700,
                        color: THEME.colors.accentEmerald,
                      }}
                    >
                      <div
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          backgroundColor: THEME.colors.accentEmerald,
                          boxShadow: `0 0 8px ${THEME.colors.accentEmerald}`,
                          transform: `scale(${checkProgress})`,
                        }}
                      />
                      <span>{item.status}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Continuous Asset Health Telemetry (Frames 400+) */}
          {frame >= 350 && (
            <div style={{ display: "flex", gap: "24px", marginTop: "12px" }}>
              <StatCounterBadge
                targetValue={100}
                suffix="%"
                label="Physical Device Coverage"
                sublabel="Routine proactive servicing"
                accentColor={THEME.colors.accentEmerald}
                delayInFrames={380}
              />
              <StatCounterBadge
                targetValue={6}
                suffix=" Critical Hubs"
                label="Infrastructure Clusters"
                sublabel="Zero downtime during classes"
                accentColor={THEME.colors.accentCyan}
                delayInFrames={400}
              />
            </div>
          )}
        </div>
      </Background>
    </SceneTransitionWrapper>
  );
};
