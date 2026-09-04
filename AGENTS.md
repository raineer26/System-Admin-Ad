# AGENTS.md — Repository-Wide Remotion Guidelines

## ⚠️ MANDATORY SKILL: Remotion Best Practices (https://remotion.dev)

Whenever operating in this repository, you MUST strictly adhere to the **Remotion Best Practices** defined in `.agents/skills/remotion-best-practices/SKILL.md`.

This applies to **EVERY PROMPT**, task, refactor, or addition performed by any maintainer or AI agent.

---

### Core Rules for All Maintainers & Agents

1. **Frame Determinism (Strict)**:
   - A Remotion composition must be a pure function of `frame`.
   - **NEVER** use `Date.now()`, `Math.random()`, or non-deterministic variables in render markup. Use deterministic pseudo-randomness seeded by frame or index if needed.
   - UI state must look identical whether scrubbed forward, backward, or rendered headless on CI.

2. **No CSS Transitions or `@keyframes`**:
   - **NEVER** write CSS transitions (`transition: all 0.3s`) or CSS `@keyframes`. They run on the wall-clock browser thread and desynchronize during frame rendering.
   - Always drive animations via `interpolate(frame, ...)` or `spring({ frame, fps, config })` imported from `remotion`.

3. **Spring Physics & Interpolations**:
   - Always supply `fps` from `useVideoConfig()` to `spring()`.
   - Always specify `{ extrapolateLeft: "clamp", extrapolateRight: "clamp" }` on `interpolate()` calls to prevent out-of-bounds runaway values.

4. **Media & Assets**:
   - **Audio**: Always use `<Audio src={staticFile("...")} />` from `remotion`.
   - **Images**: Always use `<Img src={staticFile("...")} />` from `remotion` (never standard `<img>`, to ensure asset decoding before frame capture).
   - **Public Assets**: Always resolve assets from the `public/` directory via `staticFile()`.

5. **Sequencing & Composition**:
   - Use `<Series>` and `<Series.Sequence>` for back-to-back scenes without manual cumulative math.
   - When delaying nested animation components, wrap them in `<Sequence from={offset} layout="none">` so local frame coordinate spaces reset properly.

6. **Maintainer Creative Integrity**:
   - Preserve the original visual design, themes (`src/styles/theme.ts`), layouts, and kinetic typography authored by repository maintainer **Raineer** (`raineer26`).
   - Keep integrations modular (e.g., `<SpeakerBadge />` and audio dubbing props).

7. **Verification**:
   - Always verify TypeScript compilation (`npm run typecheck`) after every modification before committing.
