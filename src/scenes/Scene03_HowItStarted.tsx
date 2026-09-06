import React from "react";
import { Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { QuoteBlock } from "../components/QuoteBlock";
import { SceneTransitionWrapper } from "../components/SceneTransitionWrapper";
import { ShimmerSweep } from "../components/ShimmerSweep";
import { SpeakerBadge } from "../components/SpeakerBadge";
import { TimelinePath } from "../components/TimelinePath";
import { TitleCard } from "../components/TitleCard";
import { THEME } from "../styles/theme";

export interface Scene03Props {
  audioSrc?: string;
  speaker?: string;
  emotion?: string;
}

export const Scene03_HowItStarted: React.FC<Scene03Props> = ({
  audioSrc = staticFile("audio/dubbing/scene_03_how_it_started_sean.wav"),
  speaker = "Sean Vasquez",
  emotion = "Reflective Storyteller",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth cross-transition around frames 430 - 470
  const quoteExitProgress = interpolate(frame, [430, 465], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const quoteOpacity = 1 - quoteExitProgress;
  const quoteScale = interpolate(quoteExitProgress, [0, 1], [1, 0.93]);
  const quoteTranslateY = interpolate(quoteExitProgress, [0, 1], [0, -40]);

  const timelineEnterProgress = interpolate(frame, [450, 480], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Downward camera pan transition towards the end of the scene (morph into website wireframe)
  const panY = interpolate(frame, [1000, 1170], [0, -320], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cameraZoom = interpolate(frame, [460, 1170], [0.98, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneTransitionWrapper durationInFrames={1170} transitionType="slide-up" accentColor={THEME.colors.accentIndigo}>
      <Background accentColor={THEME.colors.accentIndigo}>
        {audioSrc && <Audio src={audioSrc} />}
        <SpeakerBadge speaker={speaker} role={emotion} />

        {/* Phase 1: Quote with smooth spring entrance & exit */}
        {frame < 470 && (
          <div
            style={{
              transform: `translateY(${quoteTranslateY}px) scale(${quoteScale})`,
              opacity: quoteOpacity,
              willChange: "transform, opacity",
            }}
          >
            <QuoteBlock
              quote="I'm a graduate of College of St. Benilde, Multimedia Arts. Actually, it was only during a fellowship... A previous supervisor of ours was looking for someone to redesign the website."
              author="Jansen Lee"
              role="Reflecting on his beginnings"
              accentColor={THEME.colors.accentIndigo}
            />
          </div>
        )}

        {/* Phase 2: Dynamic SVG Timeline + Blueprint Wireframe */}
        {frame >= 450 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              transform: `scale(${cameraZoom}) translateY(${panY}px)`,
              opacity: timelineEnterProgress,
              willChange: "transform, opacity",
            }}
          >
            <TitleCard
              badge="The Origin Story"
              badgeColor={THEME.colors.accentCyan}
              title="ONE WEBSITE. MANY RESPONSIBILITIES."
              subtitle="What started as a fellowship redesign opened the door to stewardship of an entire digital institution."
              highlightWords={["ONE", "WEBSITE.", "RESPONSIBILITIES."]}
            />

            <Sequence from={460} layout="none">
              <TimelinePath />
            </Sequence>

            {/* Wireframe grid preview emerging from bottom pan with glowing shimmer */}
            <div
              style={{
                marginTop: "60px",
                width: "1100px",
                height: "260px",
                borderRadius: "20px",
                border: `2px dashed ${THEME.colors.accentBlue}88`,
                backgroundColor: "rgba(15, 23, 42, 0.7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
                padding: "24px",
                boxShadow: `0 20px 50px rgba(0,0,0,0.6), 0 0 35px ${THEME.colors.accentIndigo}33`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <ShimmerSweep period={80} color="rgba(56, 189, 248, 0.3)" />
              <div style={{ flex: 1, height: "100%", border: `1px solid ${THEME.colors.borderGlass}`, borderRadius: "12px", backgroundColor: "rgba(255,255,255,0.02)" }} />
              <div style={{ flex: 2, height: "100%", border: `1px solid ${THEME.colors.borderGlass}`, borderRadius: "12px", backgroundColor: "rgba(255,255,255,0.03)" }} />
              <div style={{ flex: 1, height: "100%", border: `1px solid ${THEME.colors.borderGlass}`, borderRadius: "12px", backgroundColor: "rgba(255,255,255,0.02)" }} />
            </div>
          </div>
        )}
      </Background>
    </SceneTransitionWrapper>
  );
};
