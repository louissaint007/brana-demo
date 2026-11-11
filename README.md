# BRANA — Expérience produits

Maquette indépendante en HTML, CSS et JavaScript natifs. Aucun contenu de ce site n’est publié au nom de BRANA ou des marques affichées.

## Lancer en local
Ouvrir `dist/index.html` dans un navigateur, ou lancer un serveur statique depuis le dossier `dist`.

## Reconstruire
Exécuter `node scripts/build.mjs`. Le script prépare le dossier `dist/` et copie les sources ainsi que les photos sélectionnées.

## Photos
Les images restent des photographies de référence; aucun logo ni texte d’étiquette n’est recréé. Les photos de référence originales sont conservées dans `reference-photos/`. Une image HEIC peut dépendre du support du navigateur; le composant d’aperçu fournit une alternative neutre lorsque le décodage échoue.
