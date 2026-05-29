# Spécification de Design : Ajustement du Portfolio et Réagencement de la Section Expertises

Ce document décrit les ajustements visuels et de disposition à apporter aux sections **Portfolio** et **Expertises**.

---

## 1. Changements Visuels Proposés

### A. Couleur de Fond (Portfolio & Expertises)
* **Section Portfolio** :
  * Déplacer la couleur de fond `bg-anthracite` (qui est `#172A2E`, un bleu-vert foncé haut de gamme) depuis la section Expertises vers la section Portfolio.
  * Mettre à jour l'overlay de fond de `bg-black-deep` à `bg-anthracite`.
  * Remplacer la couleur de l'outline focus par `focus-visible:ring-offset-anthracite` pour plus d'harmonie.
* **Section Expertises** :
  * Adopter la couleur de fond `bg-black-deep` (noir profond) comme base.
  * Ajouter une **image de fond** de studio technologique/créatif avec une faible opacité (`opacity-15`).
  * Appliquer un **effet de fondu double** (gradients linéaires et radiaux) pour que l'image s'estompe parfaitement sur les bords supérieur/inférieur et latéraux, offrant un effet de profondeur tout en restant très subtil.

### B. Normalisation de la Taille des Cartes d'Expertise
* Actuellement, les cartes "Solutions Print" et "Marketing Digital" occupent une largeur plus importante (`lg:col-span-3`) que les autres cartes (`lg:col-span-2`).
* Supprimer cette variation et attribuer la **même taille** à toutes les cartes en les intégrant dans une grille standard uniforme où chaque carte a les mêmes proportions (`w-full` et `h-[380px] sm:h-[400px]`).

### C. Réagencement Layout Deux Colonnes (Titre à côté des Cartes)
* Diviser la section en un agencement sur deux colonnes principales (`grid-cols-1 lg:grid-cols-12`) :
  * **Colonne de Gauche (`lg:col-span-4`)** : Contient le titre de la section (`SectionHeader`) et le bouton d'appel à l'action (CTA) principal. Pour améliorer le confort de lecture sur desktop, cette colonne sera positionnée de manière collante (`lg:sticky lg:top-32 lg:h-fit`), restant visible pendant que l'utilisateur fait défiler les expertises.
  * **Colonne de Droite (`lg:col-span-8`)** : Contient la grille de cartes d'expertises sur deux colonnes de tailles égales (`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8`).

---

## 2. Modifications Techniques Proposées

### Fichier `src/components/PortfolioSection.tsx`
* Remplacer la classe de fond `bg-black-deep` par `bg-anthracite`.
* Adapter le dégradé et le focus au nouveau fond.

### Fichier `src/components/ExpertiseSection.tsx`
* **Layout structurel** :
  ```tsx
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
    <div className="lg:col-span-4 lg:sticky lg:top-32 lg:h-fit">
      <SectionHeader title="Nos" highlight="expertises." ... />
    </div>
    <div className="lg:col-span-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Expertise Cards */}
      </div>
    </div>
  </div>
  ```
* **Image de fond** :
  ```tsx
  <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-15">
    <Image src="..." fill className="object-cover" />
    <div className="absolute inset-0 bg-gradient-to-b from-black-deep via-transparent to-black-deep" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0B0B0B_100%)]" />
  </div>
  ```
