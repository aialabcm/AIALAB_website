Assistant au brainstorming
Toutes mes excuses pour cette confusion. Je rectifie immédiatement le tir avec ta palette officielle. Voici ton fichier design-system.md mis à jour avec les codes couleurs exacts que tu as spécifiés, pour une configuration parfaite de ton tailwind.config.ts.

AIA LAB - Design System (Version Officielle)
Ce document régit les fondations visuelles de l'application Next.js.

1. Palette de Couleurs (Officielle)
Ces couleurs forment l'ADN visuel d'AIA LAB.

Rôle	Couleur Hex	Usage
Fond Principal	#F0FAFB (Blanc cassé)	Fond global de la page
Fond Principal	#FAFAFA	couleur de section alternative 
Accent Primaire	#08C1DC	Boutons principaux, éléments d'appel (CTA)
Accent Secondaire	#259EB1	Éléments de survol, gradients, accents
Texte/Fond Foncé	#32565C	Titres secondaires, blocs de texte structurants
Noir Profond	#0B0B0B	Texte principal (H1, H2) et Footer
2. Typographie
Hiérarchie stricte pour une lisibilité optimale.

Titres : Montserrat (Google Font)

Bold (700) : Titres H1, H2, H3 (Impact fort).

Semi-Bold (600) : Sous-titres et éléments d'interface.

Corps de texte : Roboto (Google Font)

Regular (400) : Paragraphes, descriptions.

Medium (500) : Éléments interactifs ou labels.

Police Alternative (Accents/Logos) : Space Grotesk (pour un aspect plus technique et moderne dans les éléments de dataviz ou les petits labels).
3. Gestions des Espaces & Mise en page
Le respect de ces règles garantit la cohérence du wireframe.

Container : Max-width 1440px, centré.

Marges Latérales (Padding) : 80px (fixe sur desktop).

Grid System : Gouttière (Gap) de 24px minimum entre les éléments Bento Grid.

Borders : border-width: 1px (strictement).
 espace entre les section : 80px

4. Animations & Interactivité
Utilisation de Framer Motion pour des interactions fluides.

Typographie (Apparition) : Animation de type "Fade-up" (opacité 0 → 1, Y 20px → 0px) sur le scroll pour les titres.

Animation de mots clés : Utiliser une animation de type staggerChildren sur les lettres des titres H1 pour un effet de typing léger ou de glissement.

Bento Grid : Effet "Hover-lift" (légère ombre portée sans arrondis) au survol des cartes pour signaler l'interactivité.

Marquee Ticker : Défilement linéaire infini en boucle.

