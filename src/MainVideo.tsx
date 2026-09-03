import React from "react";
import { Series } from "remotion";
import { Scene01_Opening } from "./scenes/Scene01_Opening";
import { Scene02_WhoIsJansen } from "./scenes/Scene02_WhoIsJansen";
import { Scene03_HowItStarted } from "./scenes/Scene03_HowItStarted";
import { Scene04_TheWebsite } from "./scenes/Scene04_TheWebsite";
import { Scene05_TheNetwork } from "./scenes/Scene05_TheNetwork";
import { Scene06_UserManagement } from "./scenes/Scene06_UserManagement";
import { Scene07_TheHardware } from "./scenes/Scene07_TheHardware";
import { Scene08_Troubleshooting } from "./scenes/Scene08_Troubleshooting";
import { Scene09_DayInTheLife } from "./scenes/Scene09_DayInTheLife";
import { Scene10_InvisibleWork } from "./scenes/Scene10_InvisibleWork";
import { Scene11_WorkLife } from "./scenes/Scene11_WorkLife";
import { Scene12_SystemAdminDefinition } from "./scenes/Scene12_SystemAdminDefinition";
import { Scene13_Closing } from "./scenes/Scene13_Closing";

export const SCENE_DURATIONS = {
  Scene01: 900,  // 00:00–00:30 (30s) Opening: The Glitch
  Scene02: 1200, // 00:30–01:10 (40s) Who is Jansen?
  Scene03: 1200, // 01:10–01:50 (40s) How It Started
  Scene04: 1500, // 01:50–02:40 (50s) 01 — The Website & Koha OPAC
  Scene05: 1350, // 02:40–03:25 (45s) 02 — The Network
  Scene06: 1200, // 03:25–04:05 (40s) 03 — User Management
  Scene07: 1500, // 04:05–04:55 (50s) 04 — The Hardware
  Scene08: 1350, // 04:55–05:40 (45s) 05 — Troubleshooting
  Scene09: 1200, // 05:40–06:20 (40s) 06 — A Day in the Life
  Scene10: 750,  // 06:20–06:45 (25s) The Part People Don't See
  Scene11: 900,  // 06:45–07:15 (30s) Work-Life & Reality
  Scene12: 900,  // 07:15–07:45 (30s) What a System Admin Really Does
  Scene13: 450,  // 07:45–08:00 (15s) Closing Tribute
};


export const TOTAL_DURATION = Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0);

export const MainVideo: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={SCENE_DURATIONS.Scene01}>
        <Scene01_Opening />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_DURATIONS.Scene02}>
        <Scene02_WhoIsJansen />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_DURATIONS.Scene03}>
        <Scene03_HowItStarted />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_DURATIONS.Scene04}>
        <Scene04_TheWebsite />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_DURATIONS.Scene05}>
        <Scene05_TheNetwork />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_DURATIONS.Scene06}>
        <Scene06_UserManagement />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_DURATIONS.Scene07}>
        <Scene07_TheHardware />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_DURATIONS.Scene08}>
        <Scene08_Troubleshooting />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_DURATIONS.Scene09}>
        <Scene09_DayInTheLife />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_DURATIONS.Scene10}>
        <Scene10_InvisibleWork />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_DURATIONS.Scene11}>
        <Scene11_WorkLife />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_DURATIONS.Scene12}>
        <Scene12_SystemAdminDefinition />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_DURATIONS.Scene13}>
        <Scene13_Closing />
      </Series.Sequence>
    </Series>
  );
};
