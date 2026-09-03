import React from "react";
import { Background } from "../components/Background";
import { NetworkGraph } from "../components/NetworkGraph";
import { TitleCard } from "../components/TitleCard";
import { THEME } from "../styles/theme";
import { useCurrentFrame } from "remotion";

export const Scene05_TheNetwork: React.FC = () => {
  const frame = useCurrentFrame();

  // 0 - 180: Title intro
  // 180 - 450: Network graph showing ACCESS DENIED
  // 450 - 780: Network graph showing SECURE ACCESS & Punchline

  let networkPhase: "scanning" | "denied" | "authorized" | "active" = "scanning";
  if (frame >= 180 && frame < 450) {
    networkPhase = "denied";
  } else if (frame >= 450) {
    networkPhase = "authorized";
  }

  return (
    <Background
      accentColor={
        networkPhase === "denied"
          ? THEME.colors.accentRose
          : THEME.colors.accentCyan
      }
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          width: "100%",
        }}
      >
        <TitleCard
          badge="02 — The Network"
          badgeColor={
            networkPhase === "denied"
              ? THEME.colors.accentRose
              : THEME.colors.accentCyan
          }
          title={
            networkPhase === "denied"
              ? "REGISTERED DEVICES ONLY"
              : "THE INVISIBLE HIGHWAY"
          }
          subtitle={
            networkPhase === "denied"
              ? "Unregistered device detected · Connection blocked by institutional firewall"
              : "BSOP's network keeps authorized users connected while keeping threats out."
          }
          highlightWords={
            networkPhase === "denied"
              ? ["REGISTERED", "DEVICES", "ONLY"]
              : ["INVISIBLE", "HIGHWAY"]
          }
        />

        <NetworkGraph phase={networkPhase} />
      </div>
    </Background>
  );
};
