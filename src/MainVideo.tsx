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
  Scene01: 1050, // (35.0s) Deign Lazaro [Dramatic & Intriguing] - audio: 33.15s
  Scene02: 960,  // (32.0s) Faijah Nonoy [Warm & Conversational] - audio: 28.66s
  Scene03: 1170, // (39.0s) Sean Vasquez [Reflective Storyteller] - audio: 35.73s
  Scene04: 2400, // (80.0s) Raineer Rosado [Urgent & Resilient] - audio: 76.88s
  Scene05: 1560, // (52.0s) Deign Lazaro [Authoritative & Technical] - audio: 48.39s
  Scene06: 1560, // (52.0s) Faijah Nonoy [Crisp & Professional] - audio: 48.05s
  Scene07: 1950, // (65.0s) Sean Vasquez [Grounded & Pragmatic] - audio: 61.54s
  Scene08: 2670, // (89.0s) Raineer Rosado [Wry & Resourceful] - audio: 85.40s
  Scene09: 1710, // (57.0s) Deign Lazaro [Observational & Dynamic] - audio: 53.17s
  Scene10: 1560, // (52.0s) Faijah Nonoy [Philosophical & Reflective] - audio: 48.05s
  Scene11: 1560, // (52.0s) Sean Vasquez [Introspective & Sincere] - audio: 48.76s
  Scene12: 2100, // (70.0s) Raineer Rosado [Passionate & Empowering] - audio: 66.51s
  Scene13: 1290, // (43.0s) Deign Lazaro [Poignant Tribute] - audio: 39.72s
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
