# Spécification Design : Hero Section AIA LAB (Édition Cinétique Centrale)

## Vision du Projet
Créer une section Hero à impact maximal avec une typographie centrale forte sur un fond immersif total. L'objectif est d'utiliser l'image `hero-bg.jpg` en plein écran tout en garantissant une aération (whitespace) exceptionnelle, inspirée de l'esthétique Avura.

## Objectifs UX/UI
- **Immersion Totale** : Image de fond occupant 100% de la largeur et de la hauteur (100vh).
- **Aération (Aeration)** : Espacements verticaux importants (min 25vh) entre le header et le contenu pour laisser respirer le design.
- **Focus Typographique** : Contenu centré géométriquement pour une lecture immédiate et puissante.

## Structure du Composant (`HeroSection.tsx`)

### 1. Layout (Mise en page)
- **Container** : `relative w-full h-screen flex flex-col items-center justify-center overflow-hidden`.
- **Background** : 
    - Image `hero-bg.jpg` en `object-cover` sur toute la section.
    - Overlay subtil (gradient radial ou overlay noir à 20%) pour garantir le contraste du texte.
- **Contenu Central (Centered Content)** :
    - **Titre (Impact)** : 
        - "L'Art" (Extra-bold, Montserrat).
        - "de l'Intelligence" (Large, Thin ou Outline, Montserrat).
    - **Sous-titre** : Texte d'accompagnement minimaliste centré en dessous.
    - **CTAs** : Boutons centrés horizontalement, avec un espacement généreux par rapport au titre.

### 2. Interactions & Animations (Framer Motion)
- **Staggered Reveal** : Apparition progressive des mots (Fade + Scale) pour un effet haut de gamme.
- **Parallax** : Effet de parallaxe lent sur l'image de fond lors du scroll.
- **Scroll Indicator** : Mouse icon animée en bas de l'écran, centrée.

### 3. Palette & Typographie
- **Couleurs** : Texte Blanc ou Noir-profond (plus lisible selon les zones sombres de l'image). 
- **Poids** : Contraste de graisse (Font-weight) entre les deux parties du titre.

### 4. Responsivité
- **Mobile** : Ajustement de la taille de police pour éviter les coupures de mots, maintien de l'image en fond.

## Copywriting Validé
- **Headline** : L'Art de l'Intelligence.
- **Subheadline** : Nous fusionnons créativité humaine et puissance algorithmique pour bâtir des identités qui dominent le futur.
- **CTA** : Lancer le projet.

## Ressources
- Image source : `public/images/hero-bg.jpg`
- Animation : Framer Motion
