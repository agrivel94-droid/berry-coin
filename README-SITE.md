# Site Berry Coin (prototype statique)

Site vitrine responsive : accueil, whitepaper, communauté/quêtes et mentions.

## Aperçu en local
Ouvrir `index.html` dans Chrome, Firefox ou Edge.

## Déploiement GitHub Pages
Le dépôt `agrivel94-droid/berry-coin` contient déjà un logo et des métadonnées sur `main`. Pour conserver ces fichiers :

```bash
git clone https://github.com/agrivel94-droid/berry-coin.git
cd berry-coin
# Copier ici index.html, whitepaper.html, communaute.html, mentions.html, style.css, script.js et le dossier assets/
git add index.html whitepaper.html communaute.html mentions.html style.css script.js assets/
git commit -m "Ajouter le site vitrine Berry Coin"
git push origin main
```

Puis Settings > Pages > Build and deployment > Deploy from a branch > main / (root) > Save.
L'URL prévue sera `https://agrivel94-droid.github.io/berry-coin/` une fois Pages publié.

## Informations importantes
- Token sur Solana Devnet : `76wrTeTdNZxMendfhNT9Baw53wXPz1GMeWDyLdXrU6R4`
- Le site ne se connecte pas à un portefeuille et ne distribue pas de jetons.
- Les quêtes sont des exemples, pas des récompenses activées.
- Les catégories de la tokenomics sont des allocations envisagées, pas des réserves on-chain vérifiées.
- Le logo est inclus localement dans `assets/berry-coin.png` pour éviter toute dépendance à GitHub Raw.
- Ne pas ajouter de fichier clé `*.json` Solana ni phrase de récupération au dépôt.
- Avant une diffusion publique, compléter l'identité de l'éditeur et les informations légales.
