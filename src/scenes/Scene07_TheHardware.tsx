import React from "react";
import { Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { SpeakerBadge } from "../components/SpeakerBadge";
import { TitleCard } from "../components/TitleCard";
import { THEME } from "../styles/theme";
import { Laptop, Projector, Tv, Printer, Camera, Cable, Check } from "lucide-react";

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

  // 0 - 1350: 3D floating hardware cards with circle checkmarks
  // 1350 - 1500: Camera scales up 300% (scale: 1.0 -> 3.8) zooming directly into the central hardware icon (transition into search bar)

  const cameraScale = interpolate(frame, [1350, 1500], [1.0, 3.8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cameraOpacity = interpolate(frame, [1440, 1500], [1, 0], {
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
    <Background accentColor={THEME.colors.accentEmerald}>
      {audioSrc && <Audio src={audioSrc} />}
      <SpeakerBadge speaker={speaker} role={emotion} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "32px",
          width: "100%",
          transform: `scale(${cameraScale})`,
          opacity: cameraOpacity,
          transformOrigin: "center 60%",
          willChange: "transform, opacity",
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
            maxWidth: "980px",
            perspective: "1000px",
          }}
        >
          {hardwareItems.map((item, idx) => {
            const spr = spring({
              frame: frame - item.delay,
              fps,
              config: THEME.springs.smooth,
            });

            // 3D subtle rotation mapped to frames
            const rotX = Math.sin((frame + idx * 30) / 25) * 6;
            const rotY = Math.cos((frame + idx * 20) / 25) * 8;

            const checkProgress = interpolate(
              frame - (item.delay + 20),
              [0, 15],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            const Icon = item.icon;

            return (
              <div
                key={idx}
                style={{
                  transform: `scale(${interpolate(spr, [0, 1], [0.8, 1])}) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
                  opacity: interpolate(frame - item.delay, [0, 10], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                  backgroundColor: "rgba(18, 24, 38, 0.88)",
                  border: `1px solid ${THEME.colors.accentEmerald}44`,
                  borderRadius: "22px",
                  padding: "26px 22px",
                  width: "260px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  boxShadow: `0 20px 40px rgba(0,0,0,0.6), 0 0 25px ${THEME.colors.accentEmerald}18`,
                  backdropFilter: "blur(14px)",
                  position: "relative",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* 3D Icon Container */}
                <div
                  style={{
                    position: "relative",
                    width: "60px",
                    height: "60px",
                    borderRadius: "18px",
                    backgroundColor: "rgba(16, 185, 129, 0.15)",
                    border: `1.5px solid ${THEME.colors.accentEmerald}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "14px",
                    boxShadow: `0 0 20px ${THEME.colors.accentEmerald}33`,
                  }}
                >
                  <Icon size={30} color={THEME.colors.accentEmerald} />

                  {/* SVG Animated Circle Checkmark */}
                  {checkProgress > 0 && (
                    <svg
                      style={{
                        position: "absolute",
                        top: "-6px",
                        right: "-6px",
                        width: "26px",
                        height: "26px",
                      }}
                    >
                      <circle
                        cx="13"
                        cy="13"
                        r="10"
                        fill="#10B981"
                        stroke="#FFF"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M8 13 L11 16 L18 9"
                        fill="none"
                        stroke="#FFF"
                        strokeWidth="2"
                        strokeDasharray="20"
                        strokeDashoffset={20 * (1 - checkProgress)}
                      />
                    </svg>
                  )}
                </div>

                <h4
                  style={{
                    fontSize: "17px",
                    fontWeight: 800,
                    color: THEME.colors.textPrimary,
                    margin: "0 0 4px 0",
                    textAlign: "center",
                  }}
                >
                  {item.name}
                </h4>

                <span
                  style={{
                    fontSize: "12px",
                    color: THEME.colors.textMuted,
                    marginBottom: "12px",
                  }}
                >
                  {item.category}
                </span>

                <div
                  style={{
                    padding: "4px 14px",
                    borderRadius: "999px",
                    backgroundColor: "rgba(16, 185, 129, 0.15)",
                    border: `1px solid ${THEME.colors.accentEmerald}55`,
                    fontSize: "11px",
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    color: THEME.colors.accentEmerald,
                  }}
                >
                  {item.status}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Background>
  );
};
