# WeightScale195 — version réaliste

Remotion / React / TypeScript, 4 secondes, 1080 × 1920, 30 FPS (120 images), H.264.

**Vidéo réelle ou générée par IA obligatoire.** Le projet n'utilise plus aucun avatar SVG. Aucun média MP4 n'a été fourni : le rendu ne peut pas aboutir tant que la source n'est pas ajoutée.

## Ajouter la vidéo
1. Fournir un MP4 de **4 secondes minimum** montrant un homme adulte athlétique (t-shirt noir, short gris) qui monte sur une balance puis reste immobile et regarde son poids.
2. Placer le fichier dans `weight-scale-195/public/athlete-on-scale.mp4`.
3. Le sujet doit rester dans la **partie gauche** du cadre vertical, pour réserver la droite au compteur.
4. Si le fichier porte un autre nom, modifier `src/assets.ts`.

## Montage
0–1 s : montée sur la balance (mouvement provenant du rush).
1–2 s : station debout et regard vers la balance (mouvement provenant du rush).
2–3 s : compteur Remotion de 0 à 195, impact et glow.
3–4 s : **195 LBS** maintenu à droite, ligne vers la balance et zoom final.

La vidéo est muette. Pas de sous-titres.

## Vérification et rendu
```bash
bun i
bun run build
bun run render
```
Sortie : `out/WeightScale195.mp4`. Le workflow GitHub Actions existant exporte l'artifact `WeightScale195-MP4`. Il échouera volontairement avec un message explicite tant que la vidéo source manque.
