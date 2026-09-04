# GEMINI.md — Workspace Rules for System-Admin-Ad

## ⚠️ MANDATORY SKILL: Remotion Best Practices (https://remotion.dev)

For every prompt and task within this repository, you MUST auto-invoke and strictly follow the **Remotion Best Practices** skill located at `.agents/skills/remotion-best-practices/SKILL.md`.

---

### Key Invariants

- **Determinism**: Every frame must render identically forward and backward. Never use `Date.now()` or `Math.random()`.
- **No CSS Transitions / Keyframes**: All animations must use `interpolate()` or `spring()` driven by `useCurrentFrame()`.
- **Media**: Use `<Audio src={staticFile("...")} />` and `<Img src={staticFile("...")} />`. Never standard `<img>`.
- **Springs**: Always provide `fps` from `useVideoConfig()`.
- **Clamping**: Always clamp bounds with `{ extrapolateLeft: "clamp", extrapolateRight: "clamp" }`.
- **Maintainer Integrity**: Respect and preserve the motion graphics, layouts, and typography created by maintainer **Raineer** (`raineer26`).
- **Verification**: Run `npm run typecheck` to confirm 0 compilation errors.
