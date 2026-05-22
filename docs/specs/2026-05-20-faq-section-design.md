# Spécification : Section FAQ "More Questions" – AIA LAB

Une section immersive et contrastée pour répondre aux interrogations des prospects avec élégance.

## 1. Direction Artistique
- **Couleur de Fond** : Noir profond (`#0B0B0B` / `black-deep`) pour créer une rupture visuelle forte avec les sections claires précédentes.
- **Illustration (Gauche)** : Image verticale d'architecture minimaliste ou de design d'intérieur épuré.
- **Contenu (Droite)** : 10 items d'accordéon.

## 2. Structure Technique
- **Layout** : Grid 2 colonnes (`lg:grid-cols-12`). 
    - Illustration : `lg:col-span-4`.
    - Accordéons : `lg:col-span-8`.
- **Composant Accordéon** : 
    - État local `isOpen`.
    - Animation de contenu via `AnimatePresence` et `motion.div` (hauteur).
    - Icône de rotation (+) qui devient (-).

## 3. Liste des Questions (Exemples)
1. Quel est le délai moyen pour un projet de branding complet ?
2. Travaillez-vous avec des technologies spécifiques pour le développement ?
3. Comment se déroule la phase de découverte ?
4. Proposez-vous une maintenance après la livraison ?
5. Puis-je suivre l'avancement de mon projet en temps réel ?
6. Les designs sont-ils livrés avec les fichiers sources ?
7. Adaptez-vous votre style graphique à mon secteur d'activité ?
8. Quelle est la taille de votre équipe dédiée par projet ?
9. Pouvez-vous intervenir sur une refonte de site existant ?
10. Comment s'organisent les paiements et la facturation ?

## 4. Animations
- **Entrée** : Fade-in progressif de la section.
- **Accordéon** : Transition de hauteur fluide (0 -> auto) avec un easing de type "circOut".
