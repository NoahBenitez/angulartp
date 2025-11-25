My Shop - Application E-commerce Angular 🛍️
Application de shopping complète construite avec Angular 17+ et NgRx, incluant panier, checkout, persistance et tests.
📋 Table des matières

Fonctionnalités
Technologies
Installation
Structure du projet
Routes
State Management (NgRx)
Mock API (MSW)
Storybook
Tests
Utilisation

✨ Fonctionnalités
✅ Implémentées

Catalogue de produits

Grille responsive de produits
Indicateur de stock (en stock / rupture)
Images emoji des produits
Prix et descriptions

Page détails produit

Informations complètes
Sélecteur de quantité
Ajout au panier avec quantité
Gestion du stock

Panier d'achat

Badge avec compteur d'articles
Liste des produits avec quantités
Boutons +/- pour modifier quantités
Suppression d'articles
Calcul du total en temps réel
Persistance localStorage

Codes promo

SAVE10 : -10% de réduction
SAVE20 : -20% de réduction
Application dynamique

Processus de checkout (3 étapes)

Étape 1 : Résumé de la commande
Étape 2 : Formulaire d'adresse de livraison
Étape 3 : Confirmation avec numéro de commande

Bonus

Notifications toast
Animations et transitions
Design moderne avec Tailwind
Composants Storybook
Tests unitaires

🛠️ Technologies

Angular 17+ (Standalone Components)
NgRx (State Management)
TypeScript
Tailwind CSS (Styling)
MSW (Mock Service Worker)
Storybook (Component Documentation)
Jasmine/Karma (Testing)
RxJS (Reactive Programming)

📦 Installation
Prérequis

Node.js 18+
npm ou yarn
Angular CLI 17+

Étapes
bash# 1. Cloner le projet
git clone <url-du-repo>
cd my-shop

# 2. Installer les dépendances

npm install

# 3. Installer NgRx

npm install @ngrx/store

# 4. Installer MSW (Mock Service Worker)

npm install msw --save-dev
npx msw init public/ --save

# 5. Installer Storybook

npx storybook@latest init

# 6. Lancer l'application

ng serve

# 7. Ouvrir dans le navigateur

# http://localhost:4200/shop

📁 Structure du projet
src/
├── app/
│ ├── shop/
│ │ ├── cart/
│ │ │ ├── cart-page.component.ts
│ │ │ ├── cart-icon.component.ts
│ │ │ └── cart-item.component.ts
│ │ ├── product-details/
│ │ │ └── product-details-page.component.ts
│ │ ├── checkout/
│ │ │ ├── checkout.component.ts
│ │ │ └── checkout.component.html
│ │ ├── state/cart/
│ │ │ ├── cart.actions.ts
│ │ │ ├── cart.reducer.ts
│ │ │ ├── cart.selectors.ts
│ │ │ └── cart.effects.ts (optionnel)
│ │ └── shop-page.component.ts
│ ├── services/
│ │ └── mock-api.service.ts
│ ├── app.config.ts
│ └── app.routes.ts
├── mocks/
│ ├── handlers.ts
│ └── browser.ts
└── main.ts

🗺️ Routes
RouteComposantDescription/shopShopPageComponentPage principale avec liste de produits/shop/product/:idProductDetailsPageComponentDétails d'un produit/shop/cartCartPageComponentPanier d'achat/shop/checkoutCheckoutComponentProcessus de paiement (3 étapes)

🔄 State Management (NgRx)
Cart State
typescriptinterface CartState {
items: CartItem[]; // Liste des produits dans le panier
totalPrice: number; // Prix total
count: number; // Nombre total d'articles
}
Actions
typescript// Ajouter un produit
addItem({ product, quantity })

// Retirer un produit
removeItem({ productId })

// Modifier la quantité
updateQuantity({ productId, quantity })

// Vider le panier
clearCart()

// Charger depuis localStorage
loadCart()
Selectors
typescript// Récupérer tous les articles
selectCartItems

// Récupérer le total
selectCartTotal

// Récupérer le nombre d'articles
selectCartCount
Exemple d'utilisation
typescript// Dans un composant
constructor(private store: Store) {
this.cartItems$ = this.store.select(selectCartItems);
this.cartTotal$ = this.store.select(selectCartTotal);
}

// Ajouter au panier
addToCart(product: Product) {
this.store.dispatch(addItem({ product, quantity: 1 }));
}

🔌 Mock API (MSW)
Endpoints simulés
GET /api/products/:id
Retourne les détails complets d'un produit.
Réponse:
json{
"id": 1,
"name": "Laptop Pro",
"price": 1299,
"image": "💻",
"description": "Ordinateur portable haute performance",
"stock": 5,
"specs": ["Intel i7", "16GB RAM", "512GB SSD"],
"category": "Computing",
"warranty": "2 ans"
}
POST /api/cart/validate
Valide le panier et retourne un résumé des prix.
Requête:
json{
"items": [...],
"couponCode": "SAVE10"
}
Réponse:
json{
"subtotal": "1299.00",
"tax": "259.80",
"shipping": "0.00",
"discount": "129.90",
"total": "1428.90",
"currency": "EUR"
}
POST /api/order
Crée une commande et retourne la confirmation.
Réponse:
json{
"orderNumber": "ORD-ABC123XYZ",
"status": "confirmed",
"estimatedDelivery": "22/11/2025",
"trackingNumber": "TRK-DEF456GHI"
}

📚 Storybook
Stories disponibles
CartItem Component
bashnpm run storybook

# Stories/Shop/CartItem

Default: Item unique avec quantité 1
Multiple Quantity: Item avec plusieurs unités
Expensive Item: Produit haut de gamme

CartIcon Component
bash# Stories/Shop/CartIcon

Empty Cart: Panier vide
With Items: Panier avec quelques articles
Many Items: Panier plein (10+ articles)

ProductCard Component
bash# Stories/Shop/ProductCard

In Stock: Produit disponible
Low Stock: Stock limité
Out Of Stock: Rupture de stock
Expensive: Produit cher
Affordable: Produit abordable

CheckoutStepIndicator
bash# Stories/Shop/CheckoutStepIndicator

Step 1: Panier
Step 2: Livraison
Step 3: Confirmation

Lancer Storybook
bashnpm run storybook

# Ouvre http://localhost:6006

🧪 Tests
Lancer les tests
bash# Tests unitaires
npm test

# Tests avec couverture

npm run test:coverage

# Tests en mode watch

ng test --watch
Tests implémentés
Cart Reducer Tests
typescript✅ should return the initial state
✅ should add item to cart
✅ should increase quantity when adding existing item
✅ should remove item from cart
✅ should update item quantity
✅ should remove item when quantity is 0
✅ should clear cart
CartPage Component Tests
typescript✅ should create
✅ should display empty cart message when cart is empty
✅ should display cart items when cart has products
✅ should apply coupon code SAVE10
✅ should navigate to checkout
Couverture de code
Après npm run test:coverage, ouvrez coverage/my-shop/index.html

🎮 Utilisation

1. Parcourir les produits
   Visitez /shop pour voir tous les produits disponibles.
2. Voir les détails
   Cliquez sur "Détails" pour voir les informations complètes d'un produit.
3. Ajouter au panier

Cliquez sur "Ajouter" depuis la liste
Ou ajustez la quantité sur la page détails

4. Gérer le panier

Cliquez sur l'icône panier (badge avec compteur)
Modifiez les quantités avec +/-
Supprimez des articles avec 🗑️
Videz tout le panier si besoin

5. Appliquer un code promo
   Dans le panier, entrez:

SAVE10 pour -10%
SAVE20 pour -20%

6. Finaliser la commande

Cliquez sur "Procéder au paiement"
Vérifiez le résumé
Entrez votre adresse de livraison
Confirmez et recevez votre numéro de commande

🎨 Personnalisation
Changer les produits
Modifiez le tableau MOCK_PRODUCTS dans:

shop-page.component.ts
product-details-page.component.ts
mocks/handlers.ts

Ajouter des codes promo
Dans cart-page.component.ts:
typescriptapplyCoupon() {
if (this.couponCode === 'NOUVELLEPROMO') {
this.discount = 0.15; // 15% de réduction
showNotification('Code promo appliqué: -15% 🎉');
}
}
Modifier les couleurs
Le projet utilise Tailwind CSS. Modifiez les classes:
html<!-- Bleu → Vert -->
<button class="bg-blue-600 hover:bg-blue-700">
↓
<button class="bg-green-600 hover:bg-green-700">

🚀 Déploiement
Build de production
bash# Build Angular
ng build --configuration production

# Build Storybook

npm run build-storybook

# Dossiers de sortie:

# - dist/my-shop/ (Angular app)

# - storybook-static/ (Storybook docs)

Déployer sur Netlify/Vercel
bash# netlify.toml
[build]
command = "ng build --configuration production"
publish = "dist/my-shop/browser"

[[redirects]]
from = "/\*"
to = "/index.html"
status = 200

📝 Critères d'acceptation
✅ Complété

Basket State (NgRx)

✅ Slice: cart/
✅ Fields: items[], totalPrice, count
✅ Actions: addItem, removeItem, updateQuantity, clearCart
✅ Selectors: selectCartItems, selectCartTotal, selectCartCount

Basket UI

✅ Cart icon/badge avec compteur
✅ Cart page avec liste de produits
✅ Inputs quantité et boutons supprimer
✅ Subtotal affiché

Checkout Flow (3 steps)

✅ Step 1: Cart Summary
✅ Step 2: User Address Form
✅ Step 3: Final Confirmation Screen

Product Details Page

✅ Informations complètes du produit
✅ Bouton "Add to Cart"
✅ Sélecteur de quantité

Persistence

✅ Cart stocké dans NgRx
✅ Sync avec localStorage
✅ Cart restauré au reload

Storybook

✅ CartItem component
✅ CartIcon component
✅ ProductCard component
✅ CheckoutStepIndicator component

🎁 Bonus implémentés

✅ Toast/snackbar lors de l'ajout d'article
✅ Logique de codes promo (SAVE10, SAVE20)
✅ Indicateur de stock produit
✅ Animations pour transitions panier
✅ Design moderne et responsive
✅ Tests unitaires
✅ Mock API avec MSW

📄 License
MIT

👥 Auteurs
Projet créé dans le cadre de l'exercice "My Shop Extended" - Angular/NgRx

🆘 Support
Pour toute question:

Consultez la documentation dans /docs
Ouvrez une issue sur GitHub
Consultez Storybook pour les composants
