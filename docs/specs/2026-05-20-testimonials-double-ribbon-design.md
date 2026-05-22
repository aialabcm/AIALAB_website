# Spécification : Témoignages "Vertical Ribbons" – AIA LAB

Redéfinition de la `TestimonialsSection` pour une présentation cinétique et massive des retours clients.

## 1. Structure du Layout
- **Colonne Gauche (Fixe)** : Titre de section + Description + 2 boutons d'action.
- **Colonne Droite (Animée)** : Deux sous-colonnes (rubans) verticales occupant environ 60% de la largeur.

## 2. Système de Mouvement
- **Ribbon 1** : Défilement infini de bas en haut (Top-to-Bottom loop).
- **Ribbon 2** : Défilement infini de haut en bas (Bottom-to-Top loop).
- **Vitesse** : Déplacement lent et fluide.
- **Interaction** : Pause de l'animation au survol (`hover pause`).

## 3. Design des Cartes
- **Fond** : Blanc pur (`bg-white`) ou Gris très clair (`bg-[#F9F9F9]`).
- **Bordure** : 1px strict (`border-dark/10`).
- **Éléments** : 
    - 5 étoiles (colorées en `primary`).
    - Texte du témoignage (Montserrat Italic).
    - Avatar discret ou initiales élégantes.
    - Nom et Rôle (`font-mono` pour le rôle).

## 4. Données
- 12 témoignages répartis équitablement (6 par ruban).
