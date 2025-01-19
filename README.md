# DartKeeper 🎯

Application web pour gérer les scores de parties de fléchettes.

## Fonctionnalités

- 🎮 Plusieurs modes de jeu (301, 501, 701, Around the Clock)
- 👥 Gestion des joueurs avec avatars personnalisés
- 📊 Statistiques des joueurs (parties jouées, victoires, meilleurs scores)
- 💾 Sauvegarde automatique des parties
- 🌓 Mode sombre/clair
- 🎨 Interface moderne et responsive

## Technologies utilisées

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- DiceBear API (avatars)

## Installation

```bash
# Cloner le projet
git clone https://github.com/votre-username/dartkeeper.git

# Installer les dépendances
cd dartkeeper
npm install

# Lancer en développement
npm run dev

# Construire pour la production
npm run build
```

## Utilisation

1. Créer une nouvelle partie ou continuer une partie sauvegardée
2. Sélectionner le mode de jeu
3. Ajouter/sélectionner les joueurs
4. Jouer !

## Structure du projet

```
src/
  ├── app/              # Pages de l'application
  ├── components/       # Composants réutilisables
  ├── hooks/           # Hooks personnalisés
  ├── styles/          # Styles globaux et thème
  └── types/           # Types TypeScript
```

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## Licence

MIT
