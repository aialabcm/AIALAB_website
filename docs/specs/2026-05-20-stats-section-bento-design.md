# Spécification de Design : Section Stats Bento Grid

Cette spécification détaille la refonte de la section `StatsSection` pour adopter un style **Bento Grid** asymétrique avec des interactions premium.

## Objectifs
- Transformer une liste de stats basique en une grille visuellement riche et artistique.
- Mettre en avant les performances du Lab (stats) tout en intégrant du contenu éditorial (articles, images).
- Créer un effet "Wow" avec des compteurs animés au survol.

## Design Visuel

### Grille de Layout
- **Conteneur** : `max-w-7xl` avec un espacement `gap-6`.
- **Structure** : Grid de 12 colonnes (Desktop) / 1 colonne (Mobile).
- **Asymétrie** : Utilisation de `col-span` et `row-span` pour casser la monotonie.

### Composantes de la Grille
1. **Carte Stat Principale (500+)** : 
   - Taille : `md:col-span-8 md:row-span-2`
   - Fond : Teal (#08C1DC) avec texte Noir Deep.
   - Contenu : Chiffre géant + description détaillée.
2. **Carte Image Lab** :
   - Taille : `md:col-span-4 md:row-span-1`
   - Contenu : Image artistique générée par IA ou photo de projet.
   - Style : `object-cover`, arrondi `rounded-3xl`.
3. **Carte Stat Secondaire (98%)** :
   - Taille : `md:col-span-4 md:row-span-1`
   - Fond : Blanc cassé / Gris très clair.
   - Contenu : Chiffre large + label.
4. **Carte Article IA & Design** :
   - Taille : `md:col-span-5 md:row-span-2`
   - Fond : Anthracite (#172A2E) avec texte Blanc.
   - Contenu : Titre de l'article + "Read More" fléché.
5. **Carte Créativité (Lien)** :
   - Taille : `md:col-span-7 md:row-span-1`
   - Fond : Gradient subtil ou bordure texturée.
   - Contenu : Citation courte ou teaser d'article.

## Interactions & Animations

### Compteurs Animés
- **Déclencheur** : `whileHover` sur la carte ou `whileInView` de la section.
- **Logique** : Le nombre s'incrémente de 0 à sa valeur cible en ~1.5s avec une courbe `easeOut`.
- **Bibliothèque** : `framer-motion` avec `useMotionValue` et `useTransform`.

### Effets de Cartes
- **Levage (Lift)** : `whileHover={{ y: -8, transition: { duration: 0.3 } }}`.
- **Ombre** : L'ombre s'accentue lors du survol pour donner une impression de profondeur.

## Technique
- **Framework** : Next.js + Tailwind CSS.
- **Animation** : Framer Motion.
- **Accessibilité** : Contrastes respectant la norme WCAG 2.1 (Ratio > 4.5:1).

## Éléments de Contenu (Mock)
- **Image** : `![AI Lab Collaboration](https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800)`
- **Article 1** : "L'intelligence artificielle au service de l'émotion visuelle."
- **Article 2** : "Pourquoi la créativité est le dernier rempart de l'humain."

---
*Document généré par AIA LAB Design Engine.*
