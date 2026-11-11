# Objectif — BRANA — Expérience produits

## Mission
Créer une maquette vitrine responsive, immersive et interactive, indépendante de BRANA et des marques présentées. La page met en scène Prestige, Guinness Foreign Extra Stout et Malta H avec une galerie photo à profondeur 3D légère, des fiches modifiables et une expérience accessible sur mobile.

## Public et limites
- Public adulte pour les contenus liés aux boissons alcoolisées.
- Présentation neutre, sans panier, paiement, adresse de contact ou affirmation au nom des marques.
- Afficher clairement « Projet de démonstration indépendant ».
- Décrire uniquement les informations lisibles sur les emballages fournis.
- Ne pas viser les mineurs et rappeler la consommation responsable.

## Critères de réussite
1. Le site contient un accueil, une sélection interactive de trois produits, une section « À propos » et un pied de page.
2. Sélectionner un produit met à jour son image de référence, sa fiche et ses informations.
3. Une commande accessible au clavier met en pause les animations.
4. Les photos restent proportionnelles et ne sont pas redessinées ni déformées pour reconstruire les étiquettes.
5. Une alternative visuelle s’affiche si une image ne peut pas être chargée.
6. L’affichage s’adapte aux téléphones, tablettes et ordinateurs.
7. La préférence « réduire les animations » du navigateur est respectée.
8. Les contenus liés aux boissons alcoolisées sont précédés d’une confirmation d’âge et les rappels de consommation responsable sont visibles.
9. Aucune information illisible n’est présentée comme un fait.

## Décisions de réalisation
- Les dépendances Three.js et React Three Fiber ne sont pas présentes dans l’environnement vérifié. La scène utilise donc une présentation photo à profondeur et parallaxe CSS, sans fabriquer de texture ni modifier les logos.
- Le site reste autonome et sans dépendance réseau externe.
- Les photos HEIC peuvent ne pas être décodées par certains navigateurs; une silhouette d’aperçu neutre est prévue pour ce cas.

## Informations visibles reprises
- Prestige : « Lager Beer », 341 ml et 5,6 % vol. sur la bouteille fournie.
- Guinness Foreign Extra Stout : 341 ml et 7,5 % vol. sur l’étiquette fournie.
- Malta H : boisson maltée non alcoolisée, 341 ml et « avec vitamines » sur l’emballage fourni.
