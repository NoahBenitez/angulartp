# My Shop - Angular Application

Une application e-commerce avec authentification, gestion de produits et système de notation.

## Démarrage rapide

### Prérequis

- Node.js v22.12+ (requis pour Angular CLI 20+)
- npm 10+

### Installation

```bash
npm install
```

### Lancer l'application

```bash
npm start
```

L'app sera accessible sur `http://localhost:4200`

### Lancer Storybook

```bash
npm run storybook
```

Storybook sera accessible sur `http://localhost:6006`

## Architecture

### État (NgRx)

- **Auth slice** : Gestion des tokens (access/refresh), loading, erreurs
- **Products slice** : Liste des produits avec pagination, filtres, et notations

Les reducers, actions, selectors et effects sont dans `src/app/state/`

### Pages

- **Login** (`/login`) : Authentification avec demo/demo
- **Products** (`/shop/products`) : Liste avec filtres (page, pageSize, minRating, ordering)
- **Rating** (`/shop/rating`) : Notation d'un produit par ID

### Composants Storybook

- `ProductCard` : Carte produit présentationnelle
- `ProductsList` : Grille de produits
- `LoginForm` : Formulaire de connexion

## API Mock (MSW)

L'API est mockée via Mock Service Worker, activée automatiquement en dev.

Endpoints disponibles :

- `POST /api/auth/token/` - Login
- `POST /api/auth/token/refresh/` - Refresh token
- `GET /api/products/` - Liste produits (pagination, filtres)
- `GET /api/products/:id/rating/` - Notation d'un produit

## Technologies

- Angular 20+ avec Standalone Components
- NgRx (Store, Effects, DevTools)
- Angular Material
- Storybook 8+
- MSW pour le mock API
