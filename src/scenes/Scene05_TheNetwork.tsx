import React from "react";
import { Audio, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Background } from "../components/Background";
import { NetworkGraph } from "../components/NetworkGraph";
import { SpeakerBadge } from "../components/SpeakerBadge";
import { TitleCard } from "../components/TitleCard";
import { THEME } from "../styles/theme";

export interface Scene05Props {
  audioSrc?: string;
  speaker?: string;
  emotion?: string;
}

export const Scene05_TheNetwork: React.FC<Scene05Props> = ({
  audioSrc = staticFile("audio/dubbing/scene_05_the_network_deign.wav"),
  speaker = "Deign Lazaro",
  emotion = "Authoritative & Technical",
}) => {
  const frame = useCurrentFrame();

  // 0 - 450: Network overview & scanning
  // 450 - 900: Red node attempts connection & repelled (Access Denied)
  // 900 - 1200: Blue node connects smoothly (Authorized Access)
  // 1200 - 1350: Camera flies rapidly along glowing network line plunging into Google Admin (scale: 1.0 -> 4.5)

  let networkPhase: "scanning" | "denied" | "authorized" | "active" = "scanning";
  if (frame >= 450 && frame < 900) {
    networkPhase = "denied";
  } else if (frame >= 900) {
    networkPhase = "authorized";
  }

  // Camera fly-through zoom along the glowing line
  const flyZoom = interpolate(frame, [1200, 1350], [1.0, 4.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const flyX = interpolate(frame, [1200, 1350], [0, 400], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const flyY = interpolate(frame, [1200, 1350], [0, 250], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [1300, 1350], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Background
      accentColor={
        networkPhase === "denied"
          ? THEME.colors.accentRose
          : THEME.colors.accentEmerald
      }
    >
      {audioSrc && <Audio src={audioSrc} />}
      <SpeakerBadge speaker={speaker} role={emotion} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          width: "100%",
          transform: `scale(${flyZoom}) translate(${flyX}px, ${flyY}px)`,
          opacity: fadeOut,
          transformOrigin: "center center",
          willChange: "transform, opacity",
        }}
      >
        <TitleCard
          badge="02 — The Network Infrastructure"
          badgeColor={
            networkPhase === "denied"
              ? THEME.colors.accentRose
              : THEME.colors.accentCyan
          }
          title={
            networkPhase === "denied"
              ? "REGISTERED DEVICES ONLY"
              : "AUTHORIZED ACCESS"
          }
          subtitle={
            networkPhase === "denied"
              ? "Unauthorized connection attempt blocked by 802.1X security policy"
              : "For users, connecting takes seconds. Behind it are configurations, access control, and monitoring."
          }
          highlightWords={
            networkPhase === "denied"
              ? ["REGISTERED", "DEVICES", "ONLY"]
              : ["AUTHORIZED", "ACCESS"]
          }
        />

        <NetworkGraph phase={networkPhase} />
      </div>
    </Background>
  );
};
