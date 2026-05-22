# Spécification Design : Expertise Section AIA LAB (Laboratory Showcase)

## Vision du Projet
Transformer la section "Expertises" en une expérience interactive minimaliste et haut de gamme. Contrairement à une grille classique, nous utilisons un **Accordéon Interactif Vertical** qui reflète l'aspect "Laboratoire d'Art" (AIA LAB). Cette section doit offrir une clarté absolue et un sentiment de précision.

## Objectifs UX/UI
- **Minimalisme Radical** : Moins de distractions visuelles, focus sur la typographie et le mouvement.
- **Hiérarchie Claire** : 5 domaines d'expertise présentés de manière séquentielle.
- **Interactivité Cinétique** : Transition fluide entre les états "repos" et "actif" (hover) pour engager l'utilisateur.
- **Contraste de Layout** : Utiliser un alignement linéaire pour contraster avec le Bento Grid de la section suivante.

## Structure du Composant (`ExpertiseSection.tsx`)

### 1. Layout (Mise en page)
- **Container** : `max-w-container mx-auto px-10 md:px-20 py-24`.
- **Header** : Titre "Nos Expertises" centré ou aligné à gauche avec une description courte et élégante.
- **Expertise List** : Une colonne verticale d'items (`ExpertiseItem`).
- **Expertise Item** :
    - **Ligne de base** : Une ligne horizontale fine (`border-t border-strict`) séparant chaque expertise.
    - **Contenu visible au repos** : Numéro d'index (01, 02...), Titre principal (Montserrat Bold), et une icône minimaliste (Lucide-react).
    - **Contenu révélé au hover** : Description détaillée, sous-domaine (sur-titre), et éventuellement un lien "En savoir plus".

### 2. Interactions & Animations (Framer Motion)
- **Hover Expansion** : L'item s'agrandit verticalement de manière fluide (AnimatePresence / height auto).
- **Fade & Shift** : La description apparaît avec un effet de fondu et un léger décalage vers le haut.
- **Icon Rotation/Scale** : L'icône subit une micro-animation lors de l'activation de la ligne.
- **Staggered Parent** : Les lignes apparaissent les unes après les autres lors du scroll initial.

### 3. Palette & Typographie
- **Couleurs** : 
    - Fond : `#FAFAFA` (Fond principal).
    - Texte : `#0B0B0B` (Noir Profond) pour les titres, `#32565C` pour les descriptions.
    - Accents : `#08C1DC` (Accent Primaire) pour les numéros ou les icônes actives.
- **Typographie** : Montserrat pour les titres (700), Roboto pour les descriptions (400), Space Grotesk pour les numéros d'index.

## Contenu (Issu de la Présentation Officielle)

1.  **01 / Branding & Identité visuelle**
    - Sub: Stratégie de marque
    - Desc: Donnez à votre marque une personnalité forte et mémorable. Nous créons un univers visuel cohérent qui vous différencie.
2.  **02 / Design Graphique & Digital**
    - Sub: Création visuelle
    - Desc: Des créations qui captivent et engagent. Nous concevons des visuels percutants, optimisés pour renforcer votre présence sur tous vos supports.
3.  **03 / Web Design & Développement**
    - Sub: Performance & Esthétique
    - Desc: Alliez beauté et performance. Nous créons des sites web élégants, intuitifs et techniquement irréprochables pour convertir vos visiteurs.
4.  **04 / Solutions Print & Impression**
    - Sub: Supports Tangibles
    - Desc: Donnez du poids à votre communication. Nous maîtrisons chaque étape, de la création à l'impression, pour des supports qui marquent les esprits.
5.  **05 / Marketing Digital & Communication**
    - Sub: Stratégie de Croissance
    - Desc: Nous développons des plans de communication sur mesure et déployons des campagnes percutantes pour accroître votre visibilité.

## Vérification & Tests
- Vérifier la fluidité de l'animation d'expansion sur mobile (passage d'un layout vertical à un layout empilé).
- S'assurer que le contraste respecte les standards WCAG (4.5:1 min).
- Tester l'interactivité avec le clavier (focus-visible sur les lignes cliquables/hoverables).
