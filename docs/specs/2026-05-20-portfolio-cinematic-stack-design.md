# Spécification de Conception : Portfolio Cinematic Stack – AIA LAB

Ce document détaille la refonte de la `PortfolioSection` pour transformer la grille standard en une expérience immersive d'empilement de cartes cinématiques.

## 1. Vision UX/UI
L'objectif est de créer une rupture visuelle avec les sections précédentes (souvent basées sur des grilles) en proposant un défilement vertical où chaque projet est célébré individuellement. 

### Principes Clés :
- **Focus Absolu** : Un seul projet occupe l'espace visuel principal à la fois.
- **Profondeur** : Utilisation de l'empilement (Stacking) pour symboliser l'accumulation d'expertises.
- **Luxe Minimaliste** : Grand format, typographie généreuse, et micro-interactions fluides.

## 2. Structure Technique

### Composants :
- `PortfolioSection.tsx` : Conteneur principal gérant la liste des projets et le scroll global.
- `ProjectStackCard.tsx` : (Nouveau) Composant individuel pour chaque projet avec logique sticky et animations de transformation.

### Logique d'Animation (Framer Motion) :
- **Sticky Positioning** : Les cartes utilisent `sticky top-24` (pour laisser de la place au header).
- **Scale Down Effect** : À mesure qu'une carte est recouverte par la suivante, elle réduit son échelle à `0.95` et son opacité à `0.6` via `useTransform`.
- **Text Reveal** : Les titres et descriptions s'animent avec un léger délai une fois que la carte devient stable.

## 3. Design Système Appliqué

### Couleurs :
- Fond de section : `#FAFAFA` (Neutre pour laisser vibrer les images).
- Bordures : `1px strict #32565C/10`.
- Éléments flottants : Fond `bg-main/80` avec `backdrop-blur-md`.

### Typographie :
- Titres : Montserrat Bold, Taille XL/2XL.
- Labels : Space Grotesk (Mono), Taille XS, Majuscules.

## 4. Actifs Visuels
Chaque projet sera illustré par une image haute définition générée spécifiquement pour refléter l'expertise associée (Branding, Digital, Product, etc.).

## 5. Plan de Vérification
- [ ] Vérifier la fluidité du scroll sur mobile (passage à une grille simple si nécessaire ou adaptation du sticky).
- [ ] S'assurer que le header ne masque pas le haut des cartes.
- [ ] Tester les contrastes texte/image (utilisation d'un overlay sombre progressif).
