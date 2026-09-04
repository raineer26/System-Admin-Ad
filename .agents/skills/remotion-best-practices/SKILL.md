---
name: remotion-best-practices
description: Official Remotion Agent Skill defining best practices for writing React video markup, spring physics, interpolations, transitions, media handling, and rendering pipelines for https://remotion.dev.
---

# Remotion Best Practices for AI Agents

This skill contains the comprehensive, authoritative guidelines for generating and maintaining Remotion video projects based on the official [Remotion AI Documentation](https://www.remotion.dev/docs/ai/skills).

---

## 1. Core Principles of Programmatic Video

- **Determinism**: A Remotion video is a pure function of `frame`. At any given frame, the UI must look identical regardless of playback speed or whether rendered forward or backward.
- **Never use `Date.now()`, `Math.random()` during render**: If randomness is needed, use deterministic PRNG seeded by frame or index.
- **Never use CSS `@keyframes` or CSS transitions**: CSS transitions and `@keyframes` run in wall-clock time on the browser thread and desynchronize during headless frame-by-frame rendering. Use `interpolate()` or `spring()` driven by `useCurrentFrame()`.
- **Prefer `AbsoluteFill`**: Instead of manually setting `position: absolute; inset: 0; width: 100%; height: 100%`, use `<AbsoluteFill>` from `remotion`.

---

## 2. Animation Fundamentals

### Interpolate
Map frame numbers directly to CSS values with clamping:
```tsx
import { interpolate, useCurrentFrame } from 'remotion';

const frame = useCurrentFrame();
const opacity = interpolate(frame, [0, 30], [0, 1], {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
});
```

### Springs
Always provide `fps` from `useVideoConfig()` to `spring()`:
```tsx
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';

const frame = useCurrentFrame();
const { fps } = useVideoConfig();

const scale = spring({
  frame,
  fps,
  config: {
    damping: 12,
    mass: 0.6,
    stiffness: 120,
  },
});
```

---

## 3. Media Elements & Assets

- **Images**: Always use `<Img src={staticFile('...')} />` from `remotion` instead of `<img>`. `<Img>` pauses rendering until the image asset has fully decoded.
- **Audio**: Use `<Audio src={staticFile('...')} />` from `@remotion/media` or `remotion`. Supports `volume`, `trimBefore`, `trimAfter`.
- **Video**: Use `<Video src={staticFile('...')} />` from `@remotion/media`.
- **Public Assets**: Always use `staticFile('path/to/asset.png')` to load assets from the project's `public/` directory.

---

## 4. Sequencing & Transitions

### `<Sequence>`
Places components at specific absolute frame intervals:
```tsx
<Sequence from={90} durationInFrames={150} name="Scene2">
  <Scene2 />
</Sequence>
```

### `<Series>`
Sequences scenes back-to-back without manually calculating cumulative frame offsets:
```tsx
<Series>
  <Series.Sequence durationInFrames={90}>
    <Scene1 />
  </Series.Sequence>
  <Series.Sequence durationInFrames={150}>
    <Scene2 />
  </Series.Sequence>
</Series>
```

### `<TransitionSeries>`
For crossfades, wipes, and slides between consecutive scenes:
```tsx
import { TransitionSeries, springTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';

<TransitionSeries>
  <TransitionSeries.Sequence durationInFrames={90}>
    <Scene1 />
  </TransitionSeries.Sequence>
  <TransitionSeries.Transition
    presentation={fade()}
    timing={springTiming({ config: { damping: 15 } })}
  />
  <TransitionSeries.Sequence durationInFrames={150}>
    <Scene2 />
  </TransitionSeries.Sequence>
</TransitionSeries>
```

---

## 5. Captions & Kinetic Typography

- For short-form mobile videos (TikTok, Reels, Shorts), place captions centered between `bottom: 120px` and `bottom: 180px` to avoid UI chrome overlap.
- Pre-compute timed subtitle arrays and map active captions based on `frame >= caption.from && frame < caption.from + caption.duration`.
- Animate entrances with a subtle scale pop using `spring()`.

---

## 6. Rendering & CLI

- **Preview Studio**: `npx remotion studio`
- **Render MP4**: `npx remotion render <CompositionId> out/<filename>.mp4`
- **Tuning quality**: Use `--crf 18` and `--pixel-format yuv420p` for maximum mobile compatibility.
