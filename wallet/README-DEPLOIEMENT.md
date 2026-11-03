# Berry Wallet — PWA Solana Devnet

## Publication GitHub Pages (sans remplacer le site existant)

1. Décompressez l'archive.
2. Ouvrez le dépôt GitHub `agrivel94-droid/berry-coin`.
3. Créez un dossier `wallet` dans le dépôt (via **Add file > Create new file**, nom `wallet/.gitkeep`, puis commit), si nécessaire.
4. Importez **tout le contenu** du dossier `wallet/` livré dans ce ZIP **dans le dossier `wallet/` du dépôt** : `index.html`, `style.css`, `app.js`, `transfer.js`, `manifest.webmanifest`, `sw.js`, `icon-192.png`, `icon-512.png`, ainsi que `assets/berry-coin.png`.
5. Conservez à la racine les fichiers existants : `index.html`, `metadata.json`, `berry-coin.png`, `whitepaper.html`... Ne les remplacez pas.
6. Le site apparaîtra à `https://agrivel94-droid.github.io/berry-coin/wallet/` après le déploiement Pages.

## Fonctionnalités
- Connexion via portefeuille injecté Phantom/Solflare (extension navigateur ordinateur, navigateur intégré sur téléphone).
- Lecture du solde du token **BERRY uniquement** via RPC Solana Devnet, ou consultation publique en lecture seule.
- QR code de l'adresse, copie de l'adresse publique.
- Transfert Token-2022 `TransferChecked` avec création idempotente du compte associé destinataire si nécessaire, préparé côté application puis confirmé dans le portefeuille de l'utilisateur.
- PWA installable et cache d'interface (transactions et soldes nécessitent Internet).

## Limites et sécurité
- **Prototype Devnet uniquement** : les tokens n'ont aucune valeur réelle.
- L'application ne demande et ne stocke jamais la seed phrase ni la clé privée.
- Phantom mobile recommande son navigateur intégré pour les dApps ; Safari/Chrome mobile ne détectent pas forcément le portefeuille.
- L'envoi nécessite un portefeuille supportant `signAndSendTransaction` et disposant de SOL Devnet pour les frais et, éventuellement, la création du compte destinataire.
- `@solana/web3.js` est chargé en module externe depuis `esm.sh` au premier transfert, et `qrcodejs` depuis jsDelivr : connexion Internet nécessaire pour ces deux dépendances. En environnement de production, figer et auditer ces dépendances en local.
- L'accès au RPC public est soumis à des limitations ; certains navigateurs ou réseaux peuvent bloquer le RPC ou les modules CDN.
- Aucune fonctionnalité de récupération de portefeuille, stockage de clés, valeur en euros ou partenariat commercial réel n'est incluse.
- Cette version n'a pas été testée en conditions réelles dans Phantom mobile ; tester attentivement avec de très petites sommes fictives avant de partager publiquement la fonctionnalité d'envoi.

## Identité technique
- Mint Token-2022 : `76wrTeTdNZxMendfhNT9Baw53wXPz1GMeWDyLdXrU6R4`
- RPC : `https://api.devnet.solana.com`
- Décimales : 6
- Offre théorique fixe : 1 029 458 BERRY

## À terme
Audit de sécurité et de compatibilité Phantom/Solflare, intégration Wallet Standard/mobile adapter, RPC dédié, tests automatisés de transferts, infrastructure durable pour les quêtes et récompenses.
