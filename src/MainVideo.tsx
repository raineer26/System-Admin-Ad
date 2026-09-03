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
  Scene01: 600,
  Scene02: 720,
  Scene03: 660,
  Scene04: 780,
  Scene05: 780,
  Scene06: 720,
  Scene07: 750,
  Scene08: 780,
  Scene09: 720,
  Scene10: 600,
  Scene11: 600,
  Scene12: 720,
  Scene13: 600,
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
