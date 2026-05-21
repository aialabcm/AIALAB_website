Assistant au brainstorming
Toutes mes excuses pour cette confusion. Je rectifie immédiatement le tir avec ta palette officielle. Voici ton fichier design-system.md mis à jour avec les codes couleurs exacts que tu as spécifiés, pour une configuration parfaite de ton tailwind.config.ts.

AIA LAB - Design System (Version Officielle)
Ce document régit les fondations visuelles de l'application Next.js.

1. Palette de Couleurs (Officielle)
Ces couleurs forment l'ADN visuel d'AIA LAB.

Rôle	Couleur Hex	Usage

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
4. Animations & Interactivité (Laboratory Showcase)
Utilisation de Framer Motion pour des interactions fluides et organiques.

Accordéon (Expertises) : 
- Timing : 400ms - 500ms.
- Courbe : easing cubic-bezier(0.23, 1, 0.32, 1) pour un effet "snap" premium.
- Comportement : Expansion verticale au survol (MD+) ou au clic (SM).

Bento Grid : Effet "Hover-lift" (légère ombre portée sans arrondis) au survol des cartes pour signaler l'interactivité.

Marquee Ticker : Défilement linéaire infini en boucle.

