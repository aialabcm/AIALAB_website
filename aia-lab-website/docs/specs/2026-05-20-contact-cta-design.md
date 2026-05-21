# Spécification : Contact CTA "L'Héritage Créatif" – AIA LAB

La section finale de conversion, conçue comme un crescendo inspirant et collaboratif.

## 1. Direction Artistique & UX
- **Fond "Aurora"** : Utilisation de cercles de flou (`blur-3xl`) colorés (Primary/Teal) animés discrètement en arrière-plan pour créer une atmosphère vivante et premium.
- **Typographie** : Montserrat Bold très large, avec un balisage `<span>` pour des mots-clés en italique/primary.
- **Boutons Magnétiques** : Boutons "Pill" avec transitions de couleurs fluides et icônes directionnelles.

## 2. Copywriting (Inspirant & Collaboratif)
- **Accroche** : "Votre vision mérite l'exceptionnel."
- **Paragraphe** : "Plus qu'une agence, un partenaire de réflexion. Batissons ensemble une identité qui traverse le temps et marque les esprits."
- **Micro-copy** : "Réponse sous 24h — Places limitées pour 2026."

## 3. Structure Technique
- **Composant** : `ContactCTA.tsx`
- **Animations** : 
    - `framer-motion` : Entrée en "staggered fade up".
    - Fond : Animation de pulsation lente des lumières d'arrière-plan.
- **Interaction** : Effet de survol sur la carte principale pour un léger tilt (inclinaison).

## 4. Call to Action
- **Primaire** : Discuter du projet (Bouton sombre/Plein).
- **Secondaire** : Découvrir le Lab (Bouton contour).
