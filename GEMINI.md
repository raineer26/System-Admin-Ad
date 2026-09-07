# GEMINI.md — Workspace Rules for System-Admin-Ad

## ⚠️ MANDATORY FRAMEWORK: HyperFrames (https://hyperframes.heygen.com / https://github.com/heygen-com/hyperframes)

All video compositions, motion graphics, and rendering pipelines in this repository operate exclusively with **HyperFrames**.

---

### Key Invariants

- **Deterministic Timelines**: All animations must use paused GSAP timelines registered in `window.__timelines[compositionId] = tl;`.
- **Transform-Only Motion**: Animate `x`, `y`, `scale`, `opacity`, and `rotate`. Avoid layout properties (`left`, `top`, `width`) to ensure sub-pixel smoothing.
- **Composition Contract**: Ensure `data-composition-id`, `data-width`, `data-height`, and `data-duration` are declared on the root element.
- **Slot Anchoring**: Every timeline must anchor its full duration slot (`tl.to({}, { duration: TOTAL_DURATION }, 0)`).
- **Maintainer Integrity**: Respect and preserve the motion graphics, layouts, and typography created by maintainer **Raineer** (`raineer26`).
- **Verification**: Run `npm run hyperframes:lint` (or `npx hyperframes lint`) to confirm 0 errors.
