---
name: design-taste-frontend
description: "À utiliser lors de la construction d'interfaces frontend à haute agence avec un goût de design strict, des couleurs calibrées, des mises en page réactives et des règles de mouvement avancées."
category: frontend
risk: safe
source: community
source_repo: Leonxlnx/taste-skill
date_added: "2026-04-29"
tags: [frontend, design, ui, react, nextjs, tailwind]
---

# Goût du Design Frontend

## When to use this skill
- Lorsque l'utilisateur demande de créer, d'améliorer ou de réviser une interface utilisateur (UI) avec un sens esthétique fort et des contraintes anti-génériques.
- Lorsque React, Next.js, Tailwind, les animations (motion), les états de composants, la typographie, l'espacement ou les couleurs nécessitent un jugement de design senior.
- Pour contrer les biais courants des IA (héros centrés, dégradés violets, abus de cartes, états pauvres, mises en page fragiles).

## How to use it

### 1. CONFIGURATION DE BASE ACTIVE
* DESIGN_VARIANCE : 8 (1=Symétrie parfaite, 10=Chaos artistique)
* MOTION_INTENSITY : 6 (1=Statique, 10=Physique magique/Cinématique)
* VISUAL_DENSITY : 4 (1=Galerie d'art/Aéré, 10=Cockpit/Données denses)

**Note :** Utilisez ces valeurs comme variables globales pour piloter la logique des sections suivantes. Adaptez-les dynamiquement si l'utilisateur le demande explicitement.

### 2. ARCHITECTURE ET CONVENTIONS PAR DÉFAUT
Sauf indication contraire, respectez ces contraintes structurelles :

* **VÉRIFICATION DES DÉPENDANCES [MANDATOIRE] :** Avant d'importer toute bibliothèque tierce (ex: `framer-motion`, `lucide-react`, `zustand`), vérifiez le `package.json`. Si le paquet est manquant, donnez la commande d'installation (`npm install ...`) avant de fournir le code.
* **Framework et Interactivité :** React ou Next.js. Privilégiez les Server Components (`RSC`).
    * **SÉCURITÉ RSC :** L'état global ne fonctionne que dans les Client Components.
    * **ISOLATION DE L'INTERACTIVITÉ :** Si du mouvement ou des effets complexes sont utilisés, extrayez le composant interactif dans un fichier isolé avec `'use client'` au sommet.
* **Gestion d'État :** Utilisez `useState`/`useReducer` local pour l'UI isolée. L'état global est réservé à l'évitement du "prop-drilling" profond.
* **Styling :** Utilisez Tailwind CSS (v3/v4) pour 90% du style.
    * **VERSION TAILWIND :** Vérifiez `package.json` en premier. Ne pas mélanger les syntaxes v3 et v4.
* **POLITIQUE ANTI-EMOJI [CRITIQUE] :** N'utilisez JAMAIS d'emojis dans le code, le balisage ou le texte. Remplacez-les par des icônes de haute qualité (Phosphor, Radix) ou des primitives SVG propres.
* **Réactivité et Espacement :**
    * Breakpoints standard : `sm`, `md`, `lg`, `xl`.
    * Conteneurs : `max-w-[1400px] mx-auto` ou `max-w-7xl`.
    * **STABILITÉ DU VIEWPORT [CRITIQUE] :** N'utilisez JAMAIS `h-screen`. Utilisez TOUJOURS `min-h-[100dvh]` pour éviter les sauts de mise en page sur mobile (iOS Safari).
    * **Grid plutôt que Flex-Math :** Évitez les calculs complexes en flexbox. Utilisez `grid grid-cols-1 md:grid-cols-3 gap-6`.

### 3. DIRECTIVES D'INGÉNIERIE DU DESIGN (Correction de Biais)
Construisez des interfaces premium en suivant ces règles :

**Règle 1 : Typographie Déterministe**
* **Titres :** `text-4xl md:text-6xl tracking-tighter leading-none`.
    * **ANTI-SLOP :** Évitez `Inter`. Utilisez `Geist`, `Outfit`, `Cabinet Grotesk` ou `Satoshi`.
    * **UI TECHNIQUE :** Les polices Serif sont INTERDITES pour les tableaux de bord. Utilisez des duos Sans-Serif haut de gamme.
* **Corps de texte :** `text-base text-gray-600 leading-relaxed max-w-[65ch]`.

**Règle 2 : Calibrage des Couleurs**
* **Contrainte :** Max 1 couleur d'accentuation. Saturation < 80%.
* **BAN DU VIOLET "AI" :** L'esthétique violet/bleu néon est INTERDITE. Utilisez des bases neutres (Zinc/Slate) avec un accent unique contrasté (Émeraude, Bleu Électrique, Rose Profond).

**Règle 3 : Diversification de la Mise en Page**
* **ANTI-CENTRE :** Les héros centrés sont INTERDITS si `LAYOUT_VARIANCE > 4`. Forcez le "Split Screen", l'alignement à gauche ou les structures asymétriques.

**Règle 4 : Matérialité et Anti-Abus de Cartes**
* **DASHBOARD :** Si `VISUAL_DENSITY > 7`, les conteneurs de cartes génériques sont INTERDITS. Utilisez des bordures (`border-t`), des divisions (`divide-y`) ou de l'espace négatif.
* **Exécution :** Utilisez des cartes uniquement pour communiquer une hiérarchie d'élévation. Teintez l'ombre selon la couleur de fond.

**Règle 5 : États de l'Interface Utilisateur**
* **Implémentation Obligatoire :**
  * **Loading :** Skeleton loaders adaptés à la mise en page.
  * **Empty States :** Compositions soignées indiquant comment remplir les données.
  * **Feedback Tactile :** Sur `:active`, utilisez `-translate-y-[1px]` ou `scale-[0.98]` pour simuler une pression physique.

### 4. PROACTIVITÉ CRÉATIVE (Anti-Slop)
* **"Liquid Glass" Refraction :** Pour le glassmorphism, ajoutez une bordure intérieure de 1px (`border-white/10`) et une ombre interne subtile (`shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]`).
* **Physique Magnétique (Si MOTION_INTENSITY > 5) :** Boutons qui s'attirent vers le curseur. Utilisez EXCLUSIVEMENT `useMotionValue` de Framer Motion hors cycle de rendu pour les performances.
* **Micro-Interactions Perpétuelles :** Intégrez des animations infinies subtiles (Pulse, Shimmer, Float) avec une physique Spring (`stiffness: 100, damping: 20`). Pas de "linear easing".
* **Orchestration Staggered :** Ne montez pas les listes instantanément. Utilisez `staggerChildren` pour des révélations en cascade.

### 5. MATRICE DE VALIDATION FINALE
Avant de fournir votre code, vérifiez :
- [ ] L'état global est-il utilisé à bon escient ?
- [ ] La mise en page mobile est-elle garantie (effondrement en colonne unique) ?
- [ ] Utilisez-vous `min-h-[100dvh]` au lieu de `h-screen` ?
- [ ] Les `useEffect` d'animation ont-ils des fonctions de nettoyage (cleanup) ?
- [ ] Avez-vous prévu les états vide, chargement et erreur ?
- [ ] Avez-vous évité les cartes inutiles ?
- [ ] Les animations lourdes sont-elles isolées dans des composants clients mémorisés ?

### 6. BIBLIOTHÈQUE DE CONCEPTS AVANCÉS
Piochez dans ces idées pour rendre l'interface mémorable :
- **Bento Grid :** Groupement asymétrique type Apple Control Center.
- **Magnetic Micro-physics :** Boutons qui "collent" au curseur.
- **Gooey Menu :** Éléments qui se détachent comme un liquide visqueux.
- **Dynamic Island :** Composant pilule qui se métamorphose selon le statut.
- **Spotlight Border :** Bordures qui s'illuminent sous le curseur.
- **Sticky Scroll Stack :** Cartes qui s'empilent au défilement.
