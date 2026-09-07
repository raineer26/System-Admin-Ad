# AGENTS.md — Repository-Wide HyperFrames Guidelines

## ⚠️ MANDATORY FRAMEWORK: HyperFrames (https://hyperframes.heygen.com / https://github.com/heygen-com/hyperframes)

Whenever operating in this repository, all video compositions and motion graphics MUST be authored, previewed, and rendered using **HyperFrames** (HTML, CSS, GSAP, and deterministic web media).

This applies to **EVERY PROMPT**, task, refactor, or addition performed by any maintainer or AI agent.

---

### Core Rules for All Maintainers & Agents

1. **Deterministic Seekable Timelines (Strict)**:
   - Every HyperFrames composition must run on a paused, deterministic GSAP timeline:
     ```javascript
     const tl = gsap.timeline({ paused: true });
     window.__timelines = window.__timelines || {};
     window.__timelines[compositionId] = tl;
     ```
   - **NEVER** use `Date.now()`, `Math.random()`, or non-deterministic timers during render.
   - UI and state must look identical whether scrubbed forward, backward, or rendered headless frame-by-frame.

2. **Transform-Only Motion (Sub-Pixel Precision)**:
   - **ALWAYS** animate CSS transforms (`x`, `y`, `scale`, `opacity`, `rotate`) rather than layout properties (`left`, `top`, `width`, `height`, `margin`).
   - Layout properties snap to device pixels and cause layout reflow / stutter during frame capture; transforms interpolate sub-pixel and remain silky smooth.

3. **Finite Composition Duration & Slot Filling**:
   - Every root composition container must define explicit `data-composition-id`, `data-width`, `data-height`, and `data-duration` attributes on the root element.
   - Timelines must fill their duration slot: `tl.to({}, { duration: TOTAL_DURATION }, 0);`.
   - **NEVER** use `repeat: -1` without bounding the composition duration.

4. **No CSS Transitions or Unseekable `@keyframes`**:
   - Do not use CSS `transition: all ...` or wall-clock CSS `@keyframes` for sequenced animations.
   - Drive all seekable choreography through GSAP timelines registered in `window.__timelines`.

5. **Aesthetics & Maintainer Creative Integrity**:
   - Preserve the visual identity, dark cyber-tactile themes, and kinetic typography authored by repository maintainer **Raineer** (`raineer26`).
   - Use high-fidelity aesthetics: subtle radial glows, perspective grid floors (`perspective(700px) rotateX(62deg)`), glassmorphic panels, and light-streak whip cuts (`#whipStreak`).

6. **Verification & Gates**:
   - Validate compositions using `npx hyperframes lint` and `npx hyperframes check`.
   - Ensure 0 errors and 0 warnings before committing.
