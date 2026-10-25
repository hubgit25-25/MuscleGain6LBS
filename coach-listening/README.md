# CoachListening

Vidéo verticale **5 s**, **1080 × 1920**, **30 FPS**, composition `CoachListening`, export **MP4 H.264**.

Scène muette, **sans texte, sans sous-titres, sans voix off, sans dialogue et sans musique**. Un élève gesticule naturellement pendant que son coach l'écoute, maintient le regard et acquiesce. Éclairage et zooms cinématiques. Personnages SVG stylisés (non photoréalistes).

## Installation et rendu

```bash
cd coach-listening
bun i
bun run build
bun run render
```

Le résultat est `out/CoachListening.mp4`. Prévisualisation : `bun run dev`.

## Remplacer les personnages

Ajouter des images ou vidéos dans `public/` et renseigner les noms dans `src/assets.ts`. Avec des médias réels, le mouvement propre aux vidéos sources dépend des prises de vue. Les SVG restent la solution de repli.

## GitHub Actions

Actions → **Render CoachListening** → **Run workflow**. Télécharger `CoachListening-MP4` après réussite. Le workflow s'exécute aussi lors d'une modification du dossier.
