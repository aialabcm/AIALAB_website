# Spécification de Design : Ajustement de la Bento Grid de Processus (Version Toucher Mobile)

Ce document détaille les ajustements d'affichage et d'interaction apportés aux cartes de la section Processus (`ProcessSection.tsx`).

---

## 1. Problématiques Identifiées

1. **Espacement & Débordement Textuel** :
   Le titre "PRODUCTION" sur la 3ème carte touche presque les bords gauche et droit du conteneur en raison d'une taille de police trop grande (`text-3xl`) et d'un espacement large (`tracking-wide`) appliqués sur un layout en 4 colonnes sur desktop.

2. **Couleur du Dos des Cartes (Back Face)** :
   Le dos des cartes doit être **blanc** (et non sombre) pour s'harmoniser avec la face avant, tout en utilisant des textes sombres pour garantir une excellente lisibilité.

3. **Interaction Mobile (Toucher exclusif)** :
   Sur mobile, le retournement s'effectue au toucher (clic). Pour offrir une expérience fluide, toucher une carte doit automatiquement retourner la carte précédemment ouverte, sans exiger de l'utilisateur qu'il la referme manuellement en premier.

---

## 2. Solutions Proposées

### A. Correction Spacing & Taille du Titre
* Réduire la taille de police sur le layout multi-colonnes et passer d'un espacement large (`tracking-wide`) à un espacement resserré (`tracking-tight`) pour les titres :
  * Taille de texte dynamique : `text-2xl xs:text-3xl md:text-3xl lg:text-2xl xl:text-[28px]`
  * Lettres resserrées : `tracking-tight`

### B. Dos des Cartes en Blanc (Light Theme Back Face)
* Remplacer le fond sombre du dos des cartes par un fond blanc (`bg-white border border-dark/5 shadow-2xl`).
* Adapter les couleurs de texte internes en sombre (`text-black-deep` pour les titres et sous-titres, `text-dark/80` pour la description) pour préserver le contraste.

### C. Gestion d'État Centralisée (State Lifting)
* Déplacer l'état du flip (`activeCardIndex`) du composant enfant `ProcessCard` vers le composant parent `ProcessSection`.
* **Logique de l'interaction** :
  * Sur Desktop (Hover) :
    * Survol d'une carte `idx` -> `activeCardIndex = idx` (retourne la carte).
    * Sortie du survol -> `activeCardIndex = null` (remet la carte de face).
  * Sur Mobile (Toucher/Clic) :
    * Toucher d'une carte `idx` :
      * Si déjà active -> `activeCardIndex = null`.
      * Si différente -> `activeCardIndex = idx` (ferme la carte active précédente et ouvre la nouvelle instantanément).

---

## 3. Modifications Techniques Proposées dans ProcessSection.tsx

### Signature du Composant ProcessCard
```tsx
function ProcessCard({ 
  step, 
  idx, 
  isFlipped, 
  onHoverStart, 
  onHoverEnd, 
  onClick 
}: { 
  step: typeof steps[0]; 
  idx: number; 
  isFlipped: boolean; 
  onHoverStart: () => void; 
  onHoverEnd: () => void; 
  onClick: () => void; 
})
```

### Rendu du Parent ProcessSection
```tsx
export default function ProcessSection() {
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  // ...
  return (
    // ...
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-16 relative">
      {steps.map((step, idx) => (
        <ProcessCard 
          key={idx} 
          step={step} 
          idx={idx} 
          isFlipped={activeCardIndex === idx}
          onHoverStart={() => setActiveCardIndex(idx)}
          onHoverEnd={() => setActiveCardIndex(null)}
          onClick={() => setActiveCardIndex(prev => prev === idx ? null : idx)}
        />
      ))}
    </div>
  );
}
```
