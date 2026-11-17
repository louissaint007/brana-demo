# Objectif du projet — BRANA, expérience produits 3D

## Résultat attendu
Construire et publier une maquette vitrine responsive et indépendante présentant trois bouteilles réellement modélisées en 3D : Prestige, Guinness Foreign Extra Stout et Malta H. L’expérience s’inspire de la mise en scène cinématique des références vidéo (trajectoire de caméra, profondeur, lumière et présentation immersive), en l’adaptant à un studio produit sombre.

La page n’est ni le site officiel de BRANA, ni une communication commandée par BRANA ou les marques.

## Critère central d’acceptation
Chaque boisson possède une géométrie 3D de bouteille construite à partir de profils adaptés (corps, épaules, col, lèvre, base et bouchon), et non une photo plane avec une parallaxe CSS. Les étiquettes proviennent des photos fournies et sont appliquées comme textures au modèle; aucun logo, nom ou texte de marque n’est re-dessiné ou réécrit. On peut faire tourner la bouteille avec le pointeur ou le toucher et la sélectionner depuis des commandes accessibles. Le produit sélectionné devient le point focal et sa fiche suit la sélection.

## Critères de livraison observables
1. En-tête BRANA — Expérience produits, navigation Accueil / Produits / À propos et mention visible « Projet de démonstration indépendant ».
2. Bannière éditoriale et bouton « Découvrir les produits », sans parler au nom des marques.
3. Trois bouteilles 3D séparées, chacune avec proportions, couleur de verre, silhouette et bouchon adaptés aux photos disponibles.
4. Textures de marque issues exclusivement des références photographiques; une photo de repli nette reste disponible si WebGL ne fonctionne pas.
5. Sélection au clic/clavier/tactile; mise au point et fiche synchronisées pour Prestige, Guinness et Malta H.
6. Rotation lente, commande Pause/Reprendre, lumière chaude, reflets subtils et peu de bulles; préférence prefers-reduced-motion respectée.
7. Mise en page utilisable sur téléphone, tablette et ordinateur, boutons clavier, focus visible, textes contrastés et descriptions alternatives.
8. Informations de produits limitées aux mentions lisibles sur les emballages. Prestige : bière lager, 341 ml, 5,6 % vol. Guinness Foreign Extra Stout : 341 ml, 7,5 % vol. Malta H : 341 ml, non alcoolisée, mention « avec vitamines ». Si la référence ne permet pas une lecture sûre, omettre la donnée.
9. Section À propos factuelle et neutre. Pas d’histoire institutionnelle non vérifiée, de contact inventé, de panier ni de paiement.
10. Contrôle d’âge avant les contenus concernant les produits alcoolisés, rappel de consommation responsable et aucune publicité destinée aux mineurs.
11. Build autonome, dépendances limitées, site publié en conservant l’accès privé actuel.
12. Vérifier le build, le rendu sans WebGL et les principaux parcours de sélection, pause et contrôle d’âge avant livraison.

## Direction visuelle
Studio anthracite, fond profond, lumière ambrée, rehauts dorés discrets, verre brun réaliste, ombres douces et scène centrale. La caméra suit une trajectoire courte et lente; les commandes restent visibles et ne couvrent jamais la bouteille ni les informations.

## Méthode technique
Utiliser la meilleure option déjà disponible dans le projet. Si Three.js n’est pas installable dans l’environnement, produire les modèles avec une scène WebGL autonome et des maillages générés depuis des profils de révolution; ne pas remplacer la vraie géométrie par des photos avec effets CSS. Garder une image photo de secours, tenir compte de la réduction de mouvement et des limites mobiles.

## Informations à confirmer avant toute version commerciale
Les photos montrent une bouteille Prestige portant « 341 ml » et « ALC. 5,6% VOL », une Guinness Foreign Extra Stout « 341 ml » et « ALC. 7.5% VOL », et une Malta H « 341 ml » avec les mentions « AVEC VITAMINES » / « NON-ALCOOLISÉE ». Ces détails appartiennent aux emballages photographiés et ne sont pas garantis pour d’autres formats ou versions. Toute diffusion commerciale nécessiterait validation des droits d’utilisation des marques et des images.

## État de réalisation
- Références vidéo analysées : une vitrine avec visite caméra de restaurant; une méthode avec blocage de scène 3D, planification d’un trajet caméra et références visuelles.
- Projet local existant : C:/Users/louis/Documents/BRANA-Experience.
- Première version précédente : scène photo/parallaxe; elle ne satisfait pas le critère central et doit être remplacée par la scène 3D.
- Prochaine phase : inspecter les photos exploitables, construire les modèles et contrôles WebGL, mettre à jour la page, lancer le build et publier une nouvelle version privée du même site.
