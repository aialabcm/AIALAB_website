# Spécification : Portfolio Accordéon Expansif & Marquee Infini

Ce document définit l'implémentation de la section Portfolio dynamique pour AIA LAB.

## 1. Structure du Composant
- **Section Container** : `max-w-container`, hauteur fixe `750px`.
- **Marquee Wrapper** : Gère le défilement horizontal infini des catégories.
- **Category Panel** : Composant individuel capable de s'étendre.

## 2. États & Interactions
- `activeCategory` : Identifiant de la catégorie ouverte (null par défaut).
- **Mode Marquee** (null) : Les panneaux défilent à vitesse constante.
- **Mode Expansion** (active) : 
    - Le marquee s'arrête.
    - Le panneau actif passe à `width: 75%`.
    - Les autres panneaux passent à `width: 8%`.
    - Le contenu interne (projets) s'affiche via un fondu.

## 3. Données
4 catégories principales avec ~3 projets chacune.
- **Digital** : Web design, Mobile apps.
- **Branding** : Logos, Identité visuelle.
- **Content** : Social media, Ads.
- **Strategy** : Design Sprint, Workshops.

## 4. Animations (Framer Motion)
- `layout` : Pour les transitions de largeur fluides.
- `AnimatePresence` : Pour l'apparition/disparition des listes de projets.
- `useAnimation` : Pour contrôler le démarrage/arrêt du marquee.

## 5. Mobile
Sur mobile, passage à une liste verticale simple ou un slider horizontal classique pour éviter les problèmes de performance et de lisibilité.
