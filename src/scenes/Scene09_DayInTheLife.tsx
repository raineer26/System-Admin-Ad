import React from "react";
import { Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { QuoteBlock } from "../components/QuoteBlock";
import { SpeakerBadge } from "../components/SpeakerBadge";
import { TitleCard } from "../components/TitleCard";
import { THEME } from "../styles/theme";
import { CheckCircle2, Video, Projector, Mic, Wifi } from "lucide-react";

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

  const showQuote = frame < 440;

  // 3D Isometric camera pan & float
  const isoPanX = interpolate(frame, [440, 1200], [-40, 40], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const isoPanY = interpolate(frame, [440, 1200], [20, -20], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const isoScale = interpolate(frame, [440, 1200], [0.95, 1.05]);

  const campusRooms = [
    { name: "Hybrid Hall A", gear: "PTZ + Projector", delay: 480, icon: Projector },
    { name: "Lecture Hall B", gear: "Dual Screens + Audio", delay: 570, icon: Video },
    { name: "Seminar Room 101", gear: "Conference Mic Grid", delay: 660, icon: Mic },
    { name: "Main Computer Lab", gear: "VLAN & Switchboard", delay: 750, icon: Wifi },
    { name: "Faculty Commons", gear: "Wi-Fi 6 Gateway", delay: 840, icon: Wifi },
    { name: "Admin Studio", gear: "Web & Graphics Hub", delay: 930, icon: Projector },
  ];

  return (
    <Background accentColor={THEME.colors.accentCyan}>
      {audioSrc && <Audio src={audioSrc} />}
      <SpeakerBadge speaker={speaker} role={emotion} />
      {showQuote ? (
        <QuoteBlock
          quote="Mostly, I'm just in front of my laptop. Sometimes, I go out to the classrooms that are hybrid to check if they are doing okay."
          author="Jansen Lee"
          role="Daily Routine & Proactive Campus Checks"
          accentColor={THEME.colors.accentCyan}
        />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            gap: "20px",
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
              width: "900px",
              height: "440px",
              perspective: "1200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                width: "680px",
                height: "380px",
                transform: `scale(${isoScale}) rotateX(55deg) rotateZ(-35deg) translate(${isoPanX}px, ${isoPanY}px)`,
                transformStyle: "preserve-3d",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "24px",
                padding: "24px",
                backgroundColor: "rgba(11, 17, 30, 0.75)",
                borderRadius: "28px",
                border: `2px solid ${THEME.colors.accentCyan}44`,
                boxShadow: "0 30px 70px rgba(0,0,0,0.8), 0 0 50px rgba(56, 189, 248, 0.2)",
              }}
            >
              {campusRooms.map((room, idx) => {
                const isChecked = frame >= room.delay;
                const checkSpr = spring({
                  frame: frame - room.delay,
                  fps,
                  config: THEME.springs.bouncy,
                });

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
                      transition: "background-color 0.3s ease, border-color 0.3s ease",
                    }}
                  >
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "12px",
                        backgroundColor: isChecked
                          ? "rgba(16, 185, 129, 0.3)"
                          : "rgba(255, 255, 255, 0.05)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <Icon
                        size={22}
                        color={isChecked ? THEME.colors.accentEmerald : THEME.colors.textMuted}
                      />
                    </div>

                    <h4
                      style={{
                        fontSize: "14px",
                        fontWeight: 800,
                        color: THEME.colors.textPrimary,
                        margin: "0 0 4px 0",
                      }}
                    >
                      {room.name}
                    </h4>

                    <span
                      style={{
                        fontSize: "11px",
                        color: isChecked
                          ? THEME.colors.accentEmerald
                          : THEME.colors.textMuted,
                        fontFamily: THEME.fonts.mono,
                        fontWeight: 700,
                      }}
                    >
                      {isChecked ? "● VERIFIED OK" : "○ SCANNING"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </Background>
  );
};
