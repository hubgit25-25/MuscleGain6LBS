# WomanWeightLoss20LBS — Independent Version 2

New independent project, separate from `woman-weight-loss-20lbs` and prior woman references. Composition `WomanWeightLoss20LBS`: 5 s / 150 frames / 30 FPS / 1080×1920 / H.264.

Uses two NEW photorealistic matched images of an adult woman standing on a digital scale. `public/before.jpg` and `public/after.jpg` are required, not included. Crossfades before/after, 0 to -20 LBS white counter at right, red glow, deterministic particles, impact and camera shake, zoom. No additional text or voice. The 5-second visual symbolically represents weight loss over a longer period, not a real-time physical change.

```bash
cd woman-weight-loss-20lbs-v2
bun i
bun run build
bun run render
```

Output `out/WomanWeightLoss20LBS.mp4`; artifact `WomanWeightLoss20LBS-V2-MP4`.
