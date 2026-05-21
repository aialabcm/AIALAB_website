# Spécification de Conception : Composants de la Page d'Accueil (AIA LAB)

**Date :** 2026-05-19
**Auteur :** Antigravity
**Statut :** En cours de revue (Brainstorming)

Ce document décrit en détail l'ensemble des sections et composants de la page d'accueil d'AIA LAB en s'appuyant sur les wireframes fournis et la charte graphique.

---

## 1. Structure Globale de la Page & Layout
La page d'accueil respecte les contraintes du design system :
- **Largeur Max** : `1440px` (`max-w-[1440px] mx-auto`)
- **Marges Latérales** : `px-10 md:px-20` (80px fixe sur desktop)
- **Espace entre les Sections** : `py-20 md:py-[80px]` (80px fixe)
- **Bordures** : `border border-strict border-dark/20` (ou `border-black-deep/10`)
- **Fonds** : Alternance entre `bg-[#F0FAFB]` (Fond Principal) et `bg-[#FAFAFA]` (Fond Alternatif) pour rythmer la page.

---

## 2. Revue des Sections et Composants à Créer

### A. Navigation & Header
Positionné en haut, fixe ou autocollant (sticky), en verre dépoli (glassmorphism) pour un aspect premium.
- **Composant `Header`** (`src/components/Header.tsx`) :
  - **Logo** : Marque nominative SVG "AIA LAB" en `text-black-deep` (Montserrat).
  - **Liens de navigation** : Accueil, Expertises, Portfolio, À Propos. Style brut : soulignement minimaliste au survol.
  - **Menu Mobile** : Bouton burger SVG se transformant en tiroir plein écran.

### B. Section Hero
Le premier point de contact visuel avec l'utilisateur.
- **Composant `HeroSection`** (`src/components/HeroSection.tsx`) :
  - **Titre (H1)** : *"Votre entreprise mérite une image qui porte vos ambitions."* (Montserrat Bold, `text-4xl md:text-6xl tracking-tighter leading-none text-black-deep`).
  - **Sous-titre** : *"Nous transformons les idées en expériences visuelles et digitales qui marquent les esprits."* (Roboto Regular, `text-base md:text-lg text-dark max-w-[65ch] mt-4`).
  - **Actions (Boutons)** :
    - *"Contact"* : Bouton plein en `#0B0B0B` (Noir Profond), texte blanc, effet `:active` et hover (couleur primaire `#08C1DC`).
    - *"Voir le portfolio"* : Bouton contour `#32565C` (Texte/Fond foncé), fond transparent.

### C. Marquee Ticker
Bandeau de défilement infini pour dynamiser la mise en page.
- **Composant `MarqueeTicker`** (`src/components/MarqueeTicker.tsx`) :
  - Défilement infini linéaire de gauche à droite.
  - Répétition de 6 à 8 items contenant le logo SVG de AIA LAB + le texte "AIA LAB" + le slogan "Au-delà du possible".
  - **Interactivité** : Pause au survol du curseur.

### D. Section "Pourquoi nous choisir ?"
Mise en page asymétrique de type Bento ou grille à 3 colonnes avec le visuel central interactif.
- **Composant `WhyChooseUs`** (`src/components/WhyChooseUs.tsx`) :
  - **Titre (H2)** : *"pourquoi nous choisir ?"* en lettres minuscules/brut (Montserrat Bold).
  - **Structure** : Grille avec 3 colonnes sur desktop :
    - *Gauches (2 Blocs)* : Superposés verticalement.
    - *Milieu* : Composant `InteractiveCanvas` (Option A).
    - *Droites (2 Blocs)* : Superposés verticalement.
  - **Composant `InteractiveCanvas`** (`src/components/InteractiveCanvas.tsx`) :
    - Canvas HTML5 natif.
    - Animation de nœuds connectés (particules) représentant un réseau neuronal artistique (liaison IA et Art).
    - Les nœuds s'attirent/se repoussent au mouvement de la souris de l'utilisateur.
  - **Composant `TextCard`** (4 instances) :
    - Bloc minimaliste brut avec titre (Space Grotesk) et paragraphe descriptif.

### E. Section "Nos expertises"
Grille d'expertises de l'agence.
- **Composant `ExpertiseSection`** (`src/components/ExpertiseSection.tsx`) :
  - **Sous-titre** : *"Une approche créative, digitale et architecturale pour construire votre puissance."*
  - **Boutons** : "Parler à un expert" et "Demander un devis".
  - **Grille (2x2)** :
    - **Composant `ExpertiseCard`** (4 instances) :
      - Titre, description de l'expertise (Identité, Web, Motion, Stratégie) et icônes d'accompagnement.

### F. Section "Chiffres"
Statistiques clés de l'agence.
- **Composant `StatsSection`** (`src/components/StatsSection.tsx`) :
  - **Titre** : *"AIA LAB en chiffres"*
  - **Bento Grid asymétrique** :
    - Carte 1 : *98%* - Lorem ipsum (Fond gris clair, texte foncé).
    - Carte 2 : *500+* - Lorem ipsum (Fond cyan `#08C1DC`, texte noir).

### G. Section "Portfolio - Sélection"
Une sélection de projets représentatifs de l'agence.
- **Composant `PortfolioSection`** (`src/components/PortfolioSection.tsx`) :
  - **Titre (H2)** : *"Portfolio — Sélection"* (Montserrat Bold).
  - **Sous-titre** : *"Quelques projets représentatifs de notre style : structuré, audacieux, et efficace."* (Roboto).
  - **Actions** : Boutons "Contact" et "Explorer plus".
  - **Grille de cartes (Bento Grid 2x3)** :
    - **Composant `ProjectCard`** (6 instances) :
      - Tag de catégorie (ex: "Identité", "Digital", "Expérience").
      - Zone image avec mockup monochrome et minimaliste.
      - Titre du projet + Description des livrables (ex: "Direction artistique • Logo • Guidelines").
      - Icônes d'outils/compétences utilisées en bas.
      - **Effet Hover-lift** : Élévation et ombre subtile sans modifier l'arrondi (angles vifs style brut).

### H. Section "Le Processus Métier"
Workflow étape par étape du projet.
- **Composant `ProcessSection`** (`src/components/ProcessSection.tsx`) :
  - **Titre** : *"Le Processus Métier (Étape par étape)"*
  - **Sous-titre** : *"Un workflow clair, structuré et suivi du brief à la livraison."*
  - **Grille horizontale (1x4)** :
    - **Composant `ProcessStep`** (4 étapes : Brief, Stratégie, Production, Livraison) :
      - Numéro géant (ex: *01*, *02*).
      - Titre en gras (Montserrat).
      - Paragraphe d'explications (Roboto).

### I. Section "Témoignages"
Retours et avis clients.
- **Composant `TestimonialsSection`** (`src/components/TestimonialsSection.tsx`) :
  - **Titre** : *"Ce que nos clients disent"*
  - **Sous-titre** : *"Des retours concrets sur le design, la clarté du processus et l'impact produit."*
  - **Grille (2x2) de cartes** :
    - **Composant `TestimonialCard`** (4 instances) :
      - Nom du client, note en étoiles, texte du témoignage.

### J. Section "CTA (nous contacter)"
Appel à l'action principal avant le footer.
- **Composant `ContactCTA`** (`src/components/ContactCTA.tsx`) :
  - **Titre** : *"Parce qu'ils recherchent plus qu'une agence."* (Montserrat Bold, `text-3xl md:text-5xl`).
  - **Description** : *"Ils veulent un partenaire créatif capable d'écouter, de comprendre et de transformer leurs idées en projets concrets. Au-delà du possible."* (Roboto Regular, max-w-[60ch]).
  - **Boutons** : "Parler à un expert" (primary/filled) et "Nous écrire" (outline).

### K. Footer
Le pied de page de l'application.
- **Composant `Footer`** (`src/components/Footer.tsx`) :
  - **Informations de Contact** (issues du PDF) : Téléphones (+237 678 653 119, +237 658 579 635), adresses physiques (Vallée Nlongkak, Ancienne Mairie Tsinga), email (contact@aialab.com).
  - **Copyright** & mentions légales minimalistes.
  - Slogan de clôture : *"Au-delà du possible"*.

---

## 3. Comparatif des Approches Techniques pour l'Élément Interactif Central (Option A)

| Approche | Avantages | Inconvénients | Recommandation |
| :--- | :--- | :--- | :--- |
| **Canvas HTML5 2D (Particules)** | - Très léger (0 dépendance).<br>- Performance fluide sur mobile.<br>- Personnalisable à l'infini (vecteurs, vélocité). | - Pas de 3D complexe réelle. | **Oui (Recommandé)**. Idéal pour représenter un réseau interconnecté "IA + Art" interactif. |
| **Three.js / WebGL (Spline/R3F)** | - Rendu 3D haut de gamme, immersif.<br>- Rendu professionnel. | - Plus lourd à charger (+100kb bundle).<br>- Nécessite d'installer des paquets tiers. | non (trop lourd pour une simple homepage). |
| **SVG interactif avec Framer Motion** | - Ultra propre en vecteur.<br>- 100% responsive par défaut. | - Limité en nombre d'éléments animés simultanés. | Non (moins organique et interactif). |

---

## 4. Plan de Création des Composants
Pour structurer notre code et maximiser la maintenabilité, chaque section aura son propre fichier de composant indépendant sous `src/components/` :
- `src/components/Header.tsx` (Menu / Navigation)
- `src/components/HeroSection.tsx` (Bandeau de présentation principal)
- `src/components/MarqueeTicker.tsx` (Défilement infini de marques/logos)
- `src/components/WhyChooseUs.tsx` (Section Pourquoi Nous Choisir)
- `src/components/InteractiveCanvas.tsx` (Canvas de particules interactives)
- `src/components/ExpertiseSection.tsx` (Grille de compétences et boutons de devis)
- `src/components/StatsSection.tsx` (Grille Bento des statistiques en chiffres)
- `src/components/PortfolioSection.tsx` (Grille de projets sélection)
- `src/components/ProcessSection.tsx` (Ligne de temps du processus en 4 étapes)
- `src/components/TestimonialsSection.tsx` (Témoignages et avis clients)
- `src/components/ContactCTA.tsx` (Appel à l'action / Nous contacter)
- `src/components/Footer.tsx` (Informations de contact et footer)

---

## 5. Directives de Finition & Qualité (Copywriting, Transitions, Performance & Accessibilité)

### A. Micro-Copywriting
Tous les boutons et liens utilisent des verbes d'action percutants et professionnels au lieu de formulations génériques :
- *HeroSection* : "Explorer l'impact" (au lieu de "Voir le portfolio"), "Lancer le projet" (au lieu de "Contact").
- *ExpertiseSection* : "Bâtir ma stratégie", "Estimer le projet".
- *PortfolioSection* : "Explorer nos réalisations", "Lancer un projet".
- *TestimonialsSection* : "Explorer l'impact", "Démarrer une collaboration".
- *ContactCTA* : "Discuter du projet", "Envoyer un brief".

### B. Transitions Visuelles ("Le Flow")
Pour éviter l'effet "saucisson" et lier organiquement les sections :
- Un connecteur visuel vertical de 1px (`w-[1px] h-12 bg-dark/15 mx-auto`) sera positionné entre chaque section pour guider l'œil.
- Utilisation de bordures partielles ou en pointillés pour estomper les transitions entre les fonds `bg-[#F0FAFB]` (fond principal) et `bg-[#FAFAFA]` (fond alternatif).

### C. Performance & Dégradation Gracieuse
Pour le composant `InteractiveCanvas` :
- Détection du support HTML5 Canvas et des préférences utilisateur (`prefers-reduced-motion`).
- En cas d'incompatibilité, d'échec ou d'appareil lent, le Canvas basculera immédiatement sur un plan arrière-plan vectoriel SVG statique élégant (sans aucun blocage d'exécution ou écran blanc).

### D. Accessibilité & Contrastes WCAG
- La couleur primaire accentuée `#08C1DC` (Cyan) ayant une luminance élevée, tout texte superposé sur cette couleur sera impérativement rendu en noir profond `#0B0B0B` (et non en blanc) pour obtenir un ratio de contraste supérieur à 4.5:1 (conforme WCAG AA).
- Les états de focus clavier (`focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none`) seront activement implémentés sur tous les éléments interactifs.
