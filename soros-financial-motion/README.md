# SorosFinancialMotion

Motion design documentaire financier de **8 secondes**, 1920×1080, 30 FPS, 240 images. Composition `SorosFinancialMotion`. Compteur 10 milliards de dollars (position estimée), mercredi noir du 16 septembre 1992, gain estimé d'un milliard de dollars. Les chiffres sont des estimations historiques et ne sont pas des données de marché temps réel.

Style noir #080B10, or #D4AF37, typographie Montserrat avec police de repli. Aucun personnage, aucun audio. Tous les libellés sont modifiables dans `src/copy.ts`; les valeurs numériques et timings sont dans `src/scene.tsx`.

```bash
cd soros-financial-motion
bun i
bun run build
bun run dev
bun run render
```

Export : `out/SorosFinancialMotion.mp4` (H.264). Workflow GitHub Actions : `Render SorosFinancialMotion`, artifact `SorosFinancialMotion-MP4`. Le workflow valide le TypeScript et la liste des compositions avant le rendu.
