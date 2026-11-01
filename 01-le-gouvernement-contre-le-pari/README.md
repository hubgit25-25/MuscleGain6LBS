# 01 — Le gouvernement contre le pari

Projet Remotion 4.0.370 — 12 secondes — 60 FPS.

## Compositions
- `GovernmentVsBet01`: 1920×1080, horizontal 16:9.
- `GovernmentVsBet01Short`: 1080×1920, vertical 9:16.

## Séquences
- I1 (0–4,2 s): les deux camps, séparation verticale dorée et entrées décalées.
- I2 (4,2–7,2 s): compteur animé ≈ 10 Md$ et bloc en expansion.
- I3 (7,2–9,6 s): calendrier et date du 16 septembre 1992. La formulation « 15 % annoncé pour le lendemain » reste groupée.
- I4 (9,6–12 s): gain estimé puis question. La dernière seconde est un silence visuel.

## Audio
Le projet accepte un fichier voix et un fond sonore facultatifs :
1. Ajouter `public/audio/sequence-01.mp3` et/ou `public/audio/ambience.mp3`.
2. Dans `src/index.tsx`, définir `AUDIO_SRC = 'audio/sequence-01.mp3'` et/ou `MUSIC_SRC = 'audio/ambience.mp3'`.
3. La durée de la composition est alors calculée avec `getAudioDurationInSeconds`. Sans voix fournie, la durée de secours est de 12 secondes.
4. Le fond sonore est mixé à 8 % avec fondu d'entrée et de sortie.

## Commandes
```bash
bun install
bun run build
bun run render
```

Les deux MP4 sont exportés dans `out/`.
