import React from "react";
import { Composition } from "remotion";
import { MainVideo, SCENE_DURATIONS, TOTAL_DURATION } from "./MainVideo";
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
import "./styles/global.css";

export const Root: React.FC = () => {
  return (
    <>
      {/* Complete Master Video Composition */}
      <Composition
        id="MainVideo"
        component={MainVideo}
        durationInFrames={TOTAL_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Standalone Scene Compositions for Fast Previewing & Scrubbing in Remotion Studio */}
      <Composition
        id="Scene01-Opening"
        component={Scene01_Opening}
        durationInFrames={SCENE_DURATIONS.Scene01}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene02-WhoIsJansen"
        component={Scene02_WhoIsJansen}
        durationInFrames={SCENE_DURATIONS.Scene02}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene03-HowItStarted"
        component={Scene03_HowItStarted}
        durationInFrames={SCENE_DURATIONS.Scene03}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene04-TheWebsite"
        component={Scene04_TheWebsite}
        durationInFrames={SCENE_DURATIONS.Scene04}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene05-TheNetwork"
        component={Scene05_TheNetwork}
        durationInFrames={SCENE_DURATIONS.Scene05}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene06-UserManagement"
        component={Scene06_UserManagement}
        durationInFrames={SCENE_DURATIONS.Scene06}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene07-TheHardware"
        component={Scene07_TheHardware}
        durationInFrames={SCENE_DURATIONS.Scene07}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene08-Troubleshooting"
        component={Scene08_Troubleshooting}
        durationInFrames={SCENE_DURATIONS.Scene08}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene09-DayInTheLife"
        component={Scene09_DayInTheLife}
        durationInFrames={SCENE_DURATIONS.Scene09}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene10-InvisibleWork"
        component={Scene10_InvisibleWork}
        durationInFrames={SCENE_DURATIONS.Scene10}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene11-WorkLife"
        component={Scene11_WorkLife}
        durationInFrames={SCENE_DURATIONS.Scene11}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene12-SystemAdminDefinition"
        component={Scene12_SystemAdminDefinition}
        durationInFrames={SCENE_DURATIONS.Scene12}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene13-Closing"
        component={Scene13_Closing}
        durationInFrames={SCENE_DURATIONS.Scene13}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
