# WomanWeightLoss20LBS

5 s, 1080×1920, 30 FPS, 150 frames, MP4 H.264. Cinematic camera, two photorealistic stills of the same woman standing on a scale, soft transition, animated 0 to -20 LBS counter with spring impact and deterministic particles. No dialogue, voice-over or subtitles.

**Media required:** Place `before.jpg` and `after.jpg` in `public/`. These images must show the same adult woman with a clear visible face, same clothes and camera angle. The after shot should be a realistic slight slimming, not a distortion. No black silhouette, cartoon, SVG character, or generic stand-in is used. The assets are NOT included, so rendering cannot succeed until you upload them. See `public/README.md`.

```bash
cd woman-weight-loss-20lbs
bun i
bun run build
bun run dev
bun run render
```

Output: `out/WomanWeightLoss20LBS.mp4`. GitHub Actions artifact `WomanWeightLoss20LBS-MP4`.
