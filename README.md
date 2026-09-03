# Behind the System: The Life of a System Administrator

A cinematic motion graphics documentary built with [Remotion](https://remotion.dev), React, and TypeScript.
Featuring the story, responsibilities, and philosophy of **Jansen Lee** (Webmaster & Graphic Designer, BSOP).

---

## 🎬 Features & Design System

- **Apple-Inspired Aesthetic:** Deep obsidian/midnight stage (`#08090C`), ambient radial lighting, frosted glass surfaces, oversized contrast typography, and smooth spring physics.
- **13 Modular Scene Sequences:**
  1. `Scene01_Opening`: Normal operation, sudden glitch freeze, title hook.
  2. `Scene02_WhoIsJansen`: The 3 core pillars (Webmaster, Graphic Designer, Tech Support).
  3. `Scene03_HowItStarted`: Animated career timeline from St. Benilde to BSOP.
  4. `Scene04_TheWebsite`: The 4 website pillars & simulated security threat.
  5. `Scene05_TheNetwork`: Interactive network topology with access control.
  6. `Scene06_UserManagement`: Google Admin directory & account lifecycle.
  7. `Scene07_TheHardware`: Physical classroom & office equipment grid with status tags.
  8. `Scene08_Troubleshooting`: Search · Learn · Test · Fix methodology.
  9. `Scene09_DayInTheLife`: Workstation deep focus vs. proactive hybrid classroom checks.
  10. `Scene10_InvisibleWork`: The unsung reality of 99.98% uptime — "AND THAT'S THE POINT."
  11. `Scene11_WorkLife`: Sustainable engineering & proactive reliability over firefighting.
  12. `Scene12_SystemAdminDefinition`: Orbital convergence of 7 core responsibilities.
  13. `Scene13_Closing`: Tribute & final branded sign-off.

---

## 🚀 Quick Start & Preview

### 1. Launch Remotion Studio (Interactive Preview)
To view, scrub, and inspect all scenes in real-time with hot-reloading:
```bash
npm start
```
This opens Remotion Studio at `http://localhost:3000`. You can switch between the full `MainVideo` and any individual scene (`Scene01_Opening` through `Scene13_Closing`) directly from the left sidebar.

### 2. Render Full Video
```bash
npm run build
```
This renders the entire sequence to `out/video.mp4`.

### 3. Render a Single Still Frame
```bash
npx remotion still Scene01_Opening out/preview.png --frame=260
```

---

## 🎙️ Adding Voiceover / Interview Audio
When you have Jansen's recorded interview audio clips or voiceover:
1. Drop your audio files into `public/audio/` (e.g. `public/audio/jansen_interview_01.mp3`).
2. Use Remotion's `<Audio />` component inside any scene or the master `MainVideo.tsx`:
```tsx
import { Audio, staticFile } from "remotion";

<Audio src={staticFile("audio/jansen_interview_01.mp3")} volume={1} />
```
