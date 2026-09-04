import React from "react";
import { Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { QuoteBlock } from "../components/QuoteBlock";
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

  // 0 - 480: Interview Quote
  // 480 - 1200: Dynamic SVG timeline + downward camera pan into wireframe grid
  const showQuote = frame < 460;

  // Sharp downward camera pan transition towards the end of the scene (morph into website wireframe)
  const panY = interpolate(frame, [1050, 1200], [0, -380], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cameraZoom = interpolate(frame, [460, 1200], [0.98, 1.06]);

  return (
    <Background accentColor={THEME.colors.accentIndigo}>
      {audioSrc && <Audio src={audioSrc} />}
      <SpeakerBadge speaker={speaker} role={emotion} />
      {showQuote ? (
        <QuoteBlock
          quote="I'm a graduate of College of St. Benilde, Multimedia Arts. Actually, it was only during a fellowship... A previous supervisor of ours was looking for someone to redesign the website."
          author="Jansen Lee"
          role="Reflecting on his beginnings"
          accentColor={THEME.colors.accentIndigo}
        />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            transform: `scale(${cameraZoom}) translateY(${panY}px)`,
            willChange: "transform",
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

          {/* Wireframe grid preview emerging from bottom pan */}
          <div
            style={{
              marginTop: "80px",
              width: "1100px",
              height: "260px",
              borderRadius: "20px",
              border: `2px dashed ${THEME.colors.accentBlue}66`,
              backgroundColor: "rgba(15, 23, 42, 0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
              padding: "24px",
            }}
          >
            <div style={{ flex: 1, height: "100%", border: `1px solid ${THEME.colors.borderGlass}`, borderRadius: "12px" }} />
            <div style={{ flex: 2, height: "100%", border: `1px solid ${THEME.colors.borderGlass}`, borderRadius: "12px" }} />
            <div style={{ flex: 1, height: "100%", border: `1px solid ${THEME.colors.borderGlass}`, borderRadius: "12px" }} />
          </div>
        </div>
      )}
    </Background>
  );
};
