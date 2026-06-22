# Spécification de Conception : Redesign de la Section Historique (Timeline)

**Projet :** Portfolio AIA LAB  
**Composant :** `AboutHistory.tsx`  
**Date :** 2026-06-22  
**Auteur :** Antigravity

---

## 1. Vision Graphique & Inspiration

L'objectif est d'implémenter un design de timeline horizontale minimaliste et haut de gamme, inspiré de la capture de référence. Ce composant se distingue par sa pureté visuelle, son espacement aéré et ses contrastes subtils.

```
+-----------------------------------------------------------------------+
|  [AIALAB]      Notre Parcours                                         |
|                                                                       |
|  =========+====================+===================+=========         |
|           |  2021              |      2022         |  2023            |
|           |  (Cyan Active)     |                   |                  |
|  =========+====================+===================+=========         |
|                                                                       |
|           L'Origine            Premiers Concepts                      |
|           Description...       Description...                         |
|                                                                       |
|  [05]                                                                 |
+-----------------------------------------------------------------------+
```

### Fondations Visuelles (Option C + Couleur Cyan)
*   **Fond de section** : `#FAFAFA` ou blanc pur pour faire ressortir la bande principale.
*   **Bande de Timeline** : Une bande blanche horizontale (`bg-white`) traversant l'écran, avec des bordures très fines en haut et en bas (`border-y border-black/[0.03]`) et une ombre douce (`shadow-[0_4px_24px_rgba(0,0,0,0.02)]`).
*   **Bouton d'année active** : Un conteneur rectangulaire de couleur cyan primaire (`#08C1DC`) qui englobe entièrement l'année active, avec du texte blanc en gras (`font-bold text-white`) et une ombre portée cyan vibrante.
*   **Années inactives** : Texte noir/gris (`#32565C` ou `#0B0B0B`) simple, réactif au survol avec une transition de couleur douce.
*   **Textes de Jalons (sous la timeline)** : Alignés horizontalement avec les années sur les écrans larges, présentant le titre du jalon et une description épurée.

---

## 2. Structure & Contenu

Nous conservons les données actuelles de l'historique d'AIA LAB (5 étapes de 2021 à 2025) :
*   **2021** : Vision Initiale (Les Origines)
*   **2022** : Recherche Design (Premiers Concepts)
*   **2023** : Genèse du Studio (Fondation & Vision)
*   **2024** : Expansion Mondiale (Expansion & Réalisations)
*   **2025** : Laboratoire d'IA (Le Laboratoire d'IA)

*Note : Conformément à la capture de référence, nous n'afficherons pas d'images pour privilégier une typographie éditoriale claire.*

---

## 3. Comportement Responsif (Option C)

### A. Version Desktop (Large Screens - `md` et plus)
*   **Layout** : Disposition horizontale fixe. La bande de la timeline traverse horizontalement.
*   **Marges Latérales** : Textes verticaux décoratifs sur le côté gauche (similaire à la référence) :
    *   En haut à gauche : `"AIALAB"` tourné à 90° dans une typographie fine et espacée.
    *   En bas à gauche : `"05"` (indiquant le numéro de la section de la page À Propos).
*   **Interaction** : Au clic sur une année inactive, le bloc cyan glisse de manière fluide jusqu'à la nouvelle année (grâce à Framer Motion `layoutId`).
*   **Affichage des textes** : Les descriptions de tous les jalons sont affichées en dessous de la ligne, mais le jalon actif possède une opacité maximale (100%) tandis que les autres jalons sont légèrement atténués (opacité 35%) pour diriger l'attention.

### B. Version Mobile (Small Screens - `<md`)
*   **Layout** : Bascule en disposition verticale. La bande blanche devient une colonne centrale ou latérale verticale.
*   **Interaction** : Défilement vertical standard avec les jalons qui s'illuminent au défilement ou restent cliquables de haut en bas.

---

## 4. Animations & Micro-interactions

*   **Glissement de l'Année Active** : 
    *   *Technologie* : `<motion.div layoutId="activeYearBg" />` de Framer Motion.
    *   *Transition* : `duration: 0.45` avec une courbe de type `ease` premium.
*   **Apparition/Changement de Texte** : Fondu enchaîné subtil (`opacity` et `y` offset de 5px) lors du changement d'étape active.

---

## 5. Spécifications Accessibilité (UX)
*   **Contrastes** : Le texte blanc sur fond cyan `#08C1DC` respecte un ratio de contraste suffisant pour les éléments interactifs.
*   **Zone tactile** : Les boutons d'années sur mobile feront au minimum 44px de hauteur.
