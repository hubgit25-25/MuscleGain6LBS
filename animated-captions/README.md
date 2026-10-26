# AnimatedCaptions — Remotion

Composant réutilisable de sous-titres mot par mot, typographie forte, blanc / jaune #FFD600 / rouge #FF3B30, pop spring, ombre et bordure facultative. Groupes de 2 à 4 mots.

## Utilisation

```bash
cd animated-captions
bun i
bun run build
bun run render
bun run dev
```

Composition : `CaptionsPreview`, 1080×1920, 30 FPS, **6 secondes de démonstration**. Sortie : `out/CaptionsPreview.mp4`.

Le fichier `captions.json` contient **uniquement des timestamps de démonstration**. Ils ne proviennent pas de l'audio fourni et ne doivent pas être présentés comme synchronisés. Remplacez chaque `start` et `end` par les timestamps réels, en secondes, d'une transcription mot par mot.

## Vidéo fournie

La vidéo envoyée dans le chat mesure environ **140,4 secondes**, 512×910, 30 FPS, avec piste audio. Elle n'est **pas** intégrée au dépôt : le connecteur GitHub ne permet pas de transférer automatiquement ce fichier volumineux. Pour l'utiliser, importer le MP4 dans `animated-captions/public/source.mp4`, puis renseigner `video:'source.mp4'` dans `src/media.ts`. Adapter la durée de la composition dans `src/root.tsx` à `Math.ceil(140.4*30)` (ou à la durée exacte du média).

## Intégration dans une composition existante

Copier `src/AnimatedCaptions.tsx` dans votre projet, puis importer :

```tsx
import {AnimatedCaptions} from './AnimatedCaptions';
import captions from '../captions.json';

// À l'intérieur de votre composition :
<AnimatedCaptions words={captions.words} style={{maxWords:3,bottom:340}}/>
```

Chaque mot utilise `{text,start,end,emphasis?,outline?}`. `start` et `end` sont exprimés en secondes, relativement au début de la composition. Ajuster les timestamps si le rush commence avec un décalage. Aucun faux alignement audio n'est généré.

## Workflow

GitHub Actions construit la démo et publie `CaptionsPreview-MP4` dans les artifacts. Après intégration de la vidéo et de la transcription, le même workflow rendra la composition mise à jour.
