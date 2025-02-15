# 📌 Projet [Nom du Projet]

Bienvenue dans le projet **[Nom du Projet]** ! Ce guide est destiné aux développeurs souhaitant collaborer sur ce projet.

---

## 📂 Structure du projet

Voici l'organisation des fichiers et dossiers du projet :

```
├── .env.example          # Exemple du fichier d'environnement
├── .gitignore            # Fichiers à exclure de Git
├── .prettierignore       # Fichiers à ignorer par Prettier
├── .prettierrc           # Configuration de Prettier
├── eslint.config.js      # Configuration ESLint
├── index.html            # Point d'entrée principal
├── package.json          # Dépendances et scripts npm
├── public                # Fichiers statiques accessibles par le navigateur
│   └── assets            # Ressources (images, fonts...)
├── src                   # Code source principal
│   ├── components        # Composants réutilisables
│   │   ├── layout        # Composants de mise en page
│   │   │   ├── footer
│   │   │   └── Nav       # Barre de navigation (Desktop & Mobile)
│   │   ├── shared        # Composants partagés entre plusieurs vues
│   ├── config            # Configuration globale (routes, protections...)
│   ├── constants         # Variables et constantes globales
│   ├── pages             # Pages principales de l'application
│   │   ├── Auth          # Pages d'authentification (Login, Register)
│   │   ├── Error         # Gestion des erreurs
│   │   ├── Home          # Page d'accueil
│   │   ├── Profile       # Page de profil utilisateur
│   ├── services          # Gestion des services et de l'état global
│   │   ├── api           # Requêtes API (ex: auth.ts)
│   │   ├── hooks         # Hooks personnalisés (ex: useAuth.ts)
│   │   ├── store         # Gestion du state global (Redux...)
│   ├── styles           # Fichiers de styles globaux (SCSS)
│   ├── types            # Définition des types TypeScript
│   ├── utils            # Fonctions utilitaires (auth, validation...)
│   ├── main.tsx         # Point d'entrée principal React
│   ├── vite-env.d.ts    # Déclarations TypeScript pour Vite
├── tsconfig.json        # Configuration TypeScript
├── vite.config.ts       # Configuration Vite
```

---

## 🚀 Installation

### 1️⃣ Prérequis
- Node.js (version recommandée : 18.x ou supérieure)
- npm ou yarn

### 2️⃣ Installation des dépendances
```sh
npm install  # ou yarn install
```

### 3️⃣ Configuration de l'environnement
Copiez le fichier `.env.example` et renommez-le en `.env`. Remplissez les valeurs nécessaires.

### 4️⃣ Démarrer le projet
```sh
npm run dev  # ou yarn dev
```

---

## 🛠 Bonnes pratiques

- **Respectez la structure des dossiers** 📂
- **Utilisez TypeScript** 🟦 pour des types forts et éviter les erreurs
- **Évitez d'écrire la logique métier dans les composants** 🏗️, privilégiez les hooks ou services
- **Utilisez Prettier et ESLint** 🎨 pour garder un code propre et homogène
- **Divisez votre code en composants réutilisables** ⚛️
- **Pensez à mettre à jour la documentation** 📝 lorsque vous modifiez des fonctionnalités

---
