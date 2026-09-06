import React from "react";
import { Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { NetworkGraph } from "../components/NetworkGraph";
import { SceneTransitionWrapper } from "../components/SceneTransitionWrapper";
import { SpeakerBadge } from "../components/SpeakerBadge";
import { StatCounterBadge } from "../components/StatCounterBadge";
import { TitleCard } from "../components/TitleCard";
import { THEME } from "../styles/theme";
import { Wifi, ShieldCheck, Activity, Cpu } from "lucide-react";

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
  const { fps } = useVideoConfig();

  // 0 - 450: Network overview & scanning
  // 450 - 900: Red node attempts connection & repelled (Access Denied)
  // 900 - 1300: Blue node connects smoothly (Authorized Access)
  // 1300 - 1560: Active campus topology telemetry with live bandwidth & client counter

  let networkPhase: "scanning" | "denied" | "authorized" | "active" = "scanning";
  if (frame >= 450 && frame < 900) {
    networkPhase = "denied";
  } else if (frame >= 900 && frame < 1300) {
    networkPhase = "authorized";
  } else if (frame >= 1300) {
    networkPhase = "active";
  }

  // Smooth continuous camera movement without premature fade out
  const cameraZoom = interpolate(frame, [0, 1300, 1560], [1.0, 1.04, 1.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneTransitionWrapper durationInFrames={1560} transitionType="zoom-push" accentColor={networkPhase === "denied" ? THEME.colors.accentRose : THEME.colors.accentEmerald}>
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
            transform: `scale(${cameraZoom})`,
            transformOrigin: "center center",
            willChange: "transform",
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
                : networkPhase === "active"
                ? "CAMPUS-WIDE ENTERPRISE WI-FI"
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
                : ["AUTHORIZED", "ACCESS", "ENTERPRISE"]
            }
          />

          <NetworkGraph phase={networkPhase === "active" ? "authorized" : networkPhase} />

          {/* Dynamic Telemetry Badges during Active Phase */}
          {frame >= 1200 && (
            <div style={{ display: "flex", gap: "24px", marginTop: "10px" }}>
              <StatCounterBadge
                targetValue={480}
                suffix=" Devices"
                label="Active 802.1X Sessions"
                sublabel="Zero unauthorized access"
                accentColor={THEME.colors.accentEmerald}
                delayInFrames={1210}
              />
              <StatCounterBadge
                targetValue={1.8}
                suffix=" Gbps"
                label="Backbone Throughput"
                sublabel="VLAN traffic isolation"
                accentColor={THEME.colors.accentCyan}
                delayInFrames={1230}
              />
            </div>
          )}
        </div>
      </Background>
    </SceneTransitionWrapper>
  );
};
