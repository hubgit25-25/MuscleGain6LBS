# WomanMuscleGrowth

Independent Remotion/React/TypeScript composition. 5 seconds, 150 frames, 30fps, 1080x1920, H.264. No text, dialogue or subtitles.

**Required media**: `public/woman-muscle-growth.mp4` — a genuine 5-second AI-generated photorealistic continuous transformation video. Remotion handles camera push-in, red rim-light overlay, vignette and export. It does not fake anatomical growth with a static image or SVG. The five-second transformation symbolically represents months of training.

Run:

```sh
bun i
bun run build
bun run render
```

Output `out/WomanMuscleGrowth.mp4`. Workflow uploads artifact `WomanMuscleGrowth-MP4` after the media is added. The workflow intentionally fails early if the required media is missing.
