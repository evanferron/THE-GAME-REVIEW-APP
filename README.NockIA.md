# Tash

Tash is a Trello-style project management system

## Prerequisites

Before you begin, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v20+ recommended)
- npm (comes with Node.js)

## Technologies

- React and TypeScript
- SCSS
- VITE


## Start by :

> Cloning the repository

```
git clone https://github.com/NockIA/nk_ReactTs_example.git
```

> Installing the dependencies
```
npm i
```
> Lauch the server
```
npm run dev
```
 
## Folder and file organization

  
```
├── public/                   # Contains publicly accessible resources (images, scripts, etc.)
│   └── assets/               # Static assets
│       └── images/           # Images used in the project
│           ├── icons/        # Specific icons (SVG, PNG, etc.)
│           └── others/       # Other images (backgrounds, illustrations, etc.)
│
├── src/                      # Main source code
│   ├── components/           # Reusable components
│   │   ├── core/             # Shared, generic components
│   │   │   ├── button/       # "Button" component with related styles and logic
│   │   │   │   ├── button.tsx
│   │   │   │   └── button.module.scss
│   │   │   └── ...
│   │   ├── layout/           # Structural components (Header, Nav, Footer, etc.)
│   │   │   ├── nav/          # "Navigation" component
│   │   │   │   ├── desktop/  # Desktop version of the navigation
│   │   │   │   ├── mobile/   # Mobile version of the navigation
│   │   │   │   ├── nav.module.scss
│   │   │   │   └── nav.tsx
│   │   │   └── ...
│   │   └── pages/            # Page-specific components
│   │       ├── home/         # "Home" view
│   │       │   ├── hero.module.scss
│   │       │   └── hero.tsx
│   │       └── ...
│   │
│   ├── config/               # Application configuration and routing
│   │   ├── private-route.tsx # Component for protecting routes (requires authentication)
│   │   └── ways.tsx          # Configuration for navigation paths
│   │
│   ├── models/               # Data models and types
│   │   ├── auth/             # Models related to authentication
│   │   │   └── auth.ts       # Types and interfaces for user data
│   │   └── ...
│   │
│   ├── constants/            # Application-wide constants
│   │   └── nav-links.ts      # Statically defined navigation links
│   │
│   ├── services/             # Application services (API interactions, global state management)
│   │   ├── auth/             # Services related to authentication
│   │   │   ├── auth-service.ts # Authentication service (API calls)
│   │   │   └── auth-slice.ts   # Redux slice for authentication state
│   │   └── store/            # Global store configuration (e.g., Redux)
│   │       └── store.ts
│   │
│   ├── styles/               # Global and shared styles
│   │   ├── _fonts.scss       # Fonts definitions
│   │   ├── _palette.scss     # Project color palette
│   │   └── global.scss       # Global styles
│   │
│   ├── views/                # Main application pages
│   │   ├── home/             # "Home" page
│   │   │   ├── home.tsx
│   │   │   └── home.css
│   │   └── error/            # "Error" page
│   │       ├── error.tsx
│   │       └── error.css
│   │
│   └── main.tsx              # Main entry point of the application
│
├── tsconfig.json             # TypeScript configuration
├── package.json              # npm dependencies and scripts
└── README.md                 # Project documentation
```

## Nomenclature des Commits et Branches
Dans ce projet, nous suivons une nomenclature précise pour nommer nos commits et nos branches afin d’assurer la cohérence et la lisibilité. Voici les règles à suivre :

### Format des Commits
<*emoji*> | <*type*>-<*numéro*> | <*message*>

**Exemple**:
🎉 | F-001 | Ajout de la page d'accueil

### Format des Branches
<*type*>-<*numéro*>_<*nom_de_la_branch*>

**Exemple**:
F-001_ajout_page_accueil
