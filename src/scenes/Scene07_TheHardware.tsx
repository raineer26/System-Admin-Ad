import React from "react";
import { Background } from "../components/Background";
import { DeviceBadge } from "../components/DeviceBadge";
import { TitleCard } from "../components/TitleCard";
import { THEME } from "../styles/theme";
import { Laptop, Projector, Tv, Printer, Camera, Cable, MonitorCheck } from "lucide-react";
import { useCurrentFrame } from "remotion";

export const Scene07_TheHardware: React.FC = () => {
  const frame = useCurrentFrame();

  const hardwareItems = [
    { name: "Staff Computers", category: "Laptops & Desktops", status: "MAINTAINED" as const, icon: Laptop, delay: 0 },
    { name: "Laser Projectors", category: "Lecture Halls", status: "MONITORED" as const, icon: Projector, delay: 8 },
    { name: "Conference Displays", category: "Meeting Rooms", status: "TRACKED" as const, icon: Tv, delay: 16 },
    { name: "Network Printers", category: "Administrative Offices", status: "MONITORED" as const, icon: Printer, delay: 24 },
    { name: "PTZ Stream Cameras", category: "Hybrid Classrooms", status: "MAINTAINED" as const, icon: Camera, delay: 32 },
    { name: "Cabling & Fiber", category: "Infrastructure Backbone", status: "TRACKED" as const, icon: Cable, delay: 40 },
  ];

  return (
    <Background accentColor={THEME.colors.accentEmerald}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "36px",
          width: "100%",
        }}
      >
        <TitleCard
          badge="04 — The Physical Infrastructure"
          badgeColor={THEME.colors.accentEmerald}
          title="IF IT'S PART OF THE SYSTEM, IT NEEDS TO WORK."
          subtitle="Technology doesn't just live in the cloud. Every cable, projector, printer, and screen must be accounted for."
          highlightWords={["PART", "SYSTEM,", "NEEDS", "WORK."]}
        />

        {/* 2x3 Hardware Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
            maxWidth: "960px",
          }}
        >
          {hardwareItems.map((item, idx) => (
            <DeviceBadge
              key={idx}
              name={item.name}
              category={item.category}
              status={item.status}
              icon={item.icon}
              delay={item.delay}
            />
          ))}
        </div>
      </div>
    </Background>
  );
};
