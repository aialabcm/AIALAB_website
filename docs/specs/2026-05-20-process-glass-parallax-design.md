# Spécification : Processus "Glass Parallax" – AIA LAB

Refonte de la `ProcessSection` pour intégrer un design narratif, aérien et hautement qualitatif.

## 1. Vision Visuelle
- **Fond Architectural** : Utilisation d'une image fixe (`background-attachment: fixed`) représentant un espace de création lumineux et minimaliste.
- **Glassmorphism** : Les cartes d'étapes utilisent la transparence et le flou pour s'intégrer harmonieusement au fond.
- **Linéarité Technique** : Une ligne de temps discrète connecte les étapes pour symboliser la continuité du workflow.

## 2. Propriétés Design
- **Background** : `url('/images/process_bg.jpg')`, `bg-fixed`, `bg-cover`.
- **Overlay** : Gradient léger pour assurer le contraste.
- **Cards** : 
    - `background: rgba(255, 255, 255, 0.4)`
    - `backdrop-filter: blur(20px)`
    - `border: 1px solid rgba(255, 255, 255, 0.3)`
    - `box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07)`

## 3. Typographie & Icônes
- **Nombres** : Montserrat Bold, Taille 6XL, Opacité 5% (effet de filigrane).
- **Titres** : Montserrat SemiBold.
- **Labels** : Space Grotesk pour l'aspect technique.

## 4. Animations
- **Sync Scroll** : La ligne de temps se remplit en fonction du défilement.
- **Hover** : Augmentation subtile du flou et de la luminosité de la carte.
