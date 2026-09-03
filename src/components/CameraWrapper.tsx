import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface CameraWrapperProps {
  children: React.ReactNode;
  zoomStart?: number;
  zoomEnd?: number;
  panXStart?: number;
  panXEnd?: number;
  panYStart?: number;
  panYEnd?: number;
  rotateStart?: number;
  rotateEnd?: number;
  durationInFrames: number;
  style?: React.CSSProperties;
}

export const CameraWrapper: React.FC<CameraWrapperProps> = ({
  children,
  zoomStart = 1.0,
  zoomEnd = 1.08,
  panXStart = 0,
  panXEnd = 0,
  panYStart = 0,
  panYEnd = 0,
  rotateStart = 0,
  rotateEnd = 0,
  durationInFrames,
  style,
}) => {
  const frame = useCurrentFrame();

  const currentScale = interpolate(
    frame,
    [0, durationInFrames],
    [zoomStart, zoomEnd],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const currentPanX = interpolate(
    frame,
    [0, durationInFrames],
    [panXStart, panXEnd],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const currentPanY = interpolate(
    frame,
    [0, durationInFrames],
    [panYStart, panYEnd],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const currentRotate = interpolate(
    frame,
    [0, durationInFrames],
    [rotateStart, rotateEnd],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        transform: `scale(${currentScale}) translate(${currentPanX}px, ${currentPanY}px) rotate(${currentRotate}deg)`,
        transformOrigin: "center center",
        willChange: "transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
