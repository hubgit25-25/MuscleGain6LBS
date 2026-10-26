# HealthyDiabetesMeal

Vidéo de 5 secondes, 1080×1920, 30 FPS (150 images), H.264 MP4. Sans dialogues, voix, sous-titres, texte ni audio. Gros plan sur une assiette équilibrée (légumes, protéine maigre, céréales complètes, fruit), puis personne mangeant calmement.

**Important :** en l'absence de rushs réels, le rendu par défaut est une animation SVG stylisée et **non photoréaliste**. Pour obtenir une vidéo réaliste, placer les fichiers `food.mp4` et `person.mp4` dans `public/` et définir `foodVideo:'food.mp4', personVideo:'person.mp4'` dans `src/assets.ts`. Des images fixes peuvent aussi être utilisées.

```bash
bun i
bun run build
bun run render
```

Fichier final : `out/HealthyDiabetesMeal.mp4`. Les aliments représentés sont illustratifs : les besoins alimentaires individuels en cas de diabète peuvent varier.
