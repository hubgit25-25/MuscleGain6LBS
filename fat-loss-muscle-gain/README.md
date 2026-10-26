# FatLossMuscleGain

Remotion + React + TypeScript, 4 s, 1080×1920, 30 FPS (120 frames), MP4 H.264. Sans texte, sous-titres ni audio.

Par défaut, le projet montre une **illustration anatomique SVG détaillée** du même homme avec transformation continue : ventre plus fin (1–2 s), épaules/bras/pectoraux/abdominaux plus définis (2–3 s), finition lumineuse (3–4 s). **Cette prévisualisation n'est pas photoréaliste.** Pour un véritable visage et des textures de peau réalistes, fournir un seul plan vidéo généré par IA, d'au moins quatre secondes, dans `public/transformation.mp4` et modifier `src/assets.ts` : `transformationVideo:'transformation.mp4'`.

```bash
bun i
bun run build
bun run render
```

Sortie : `out/FatLossMuscleGain.mp4`. Artifact GitHub Actions : `FatLossMuscleGain-MP4`.

La transformation en quatre secondes est une représentation artistique accélérée d'une évolution physique normalement longue.
