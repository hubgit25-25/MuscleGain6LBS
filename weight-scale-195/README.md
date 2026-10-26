# WeightScale195

Animation fitness de 4 secondes, 1080×1920, 30 FPS (120 frames), MP4 H.264. Personnage athlétique en SVG montant sur une balance, compteur 0 à 195 LBS à droite, impact, particules, ligne de liaison et zoom final. Aucun dialogue ni voix.

Sans rush vidéo fourni, le rendu est **vectoriel stylisé et non photoréaliste**. Pour remplacer le SVG, placer une vidéo réelle de la personne sur la balance dans `public/` et définir `personVideo:'athlete-on-scale.mp4'` dans `src/assets.ts`. Le montage numérique reste superposé.

```bash
bun i
bun run build
bun run render
```

MP4 : `out/WeightScale195.mp4`. Artifact GitHub Actions : `WeightScale195-MP4`.
