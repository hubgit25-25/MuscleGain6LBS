# GymCoachScene — Remotion

Vidéo verticale de **5 secondes** (150 frames à 30 FPS), **1080 × 1920**, MP4 H.264.

## Démarrage
Depuis le dossier `gym-coach` :

```bash
bun i
bun run build
bun run render
```

Prévisualisation : `bun run dev`. Le MP4 se trouve dans `out/GymCoachScene.mp4`.

## Personnages et voix
Sans médias fournis, les deux personnages sont dessinés en SVG. Ce n'est **pas** une vidéo photoréaliste. Pour utiliser des médias, déposer `student.mp4`, `coach.mp4`, ou les images `student.png`, `coach.png` dans `public/`, puis renseigner les chemins dans `src/assets.ts`.

Pour les voix et bruitages, déposer les vrais fichiers dans `public/` et renseigner `studentVoice`, `coachVoice`, `whoosh` et `impact` dans `src/assets.ts`. Sans fichiers audio, la vidéo est silencieuse. Les sous-titres restent synchronisés sur les 150 frames.

## GitHub Actions
Ouvrir **Actions → Render GymCoachScene → Run workflow**. À la fin, récupérer l'artifact `GymCoachScene-MP4`. Le workflow se lance aussi sur les modifications du dossier `gym-coach/`.

Les effets (zooms, shake, faux motion blur et titres) sont créés avec Remotion, sans reproduction exacte d'un créateur particulier.
