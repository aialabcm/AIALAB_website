# Spécification Technique et de Design : Menu Mobile Premium AIA LAB

Ce document spécifie les modifications d'architecture et de design pour le menu mobile responsive d'AIA LAB afin d'en améliorer l'ergonomie, la fluidité des animations et de corriger le bug de superposition lié au contexte de transformation CSS.

---

## 1. Contexte & Problématique
Sur mobile, l'overlay du menu était imbriqué dans la balise `<header>` qui possède une transition de translation (`translate-y-0` / `-translate-y-full`). En CSS, l'application d'une propriété `transform` modifie le contenant de référence pour les éléments positionnés en `position: fixed`. De ce fait, le menu `fixed inset-0` restait confiné à la hauteur dynamique du header (~120px) au lieu d'occuper 100% de la hauteur d'écran, rendant l'arrière-plan transparent et superposant les liens au contenu de la page.

---

## 2. Architecture Technique (Option A validée)
Nous réorganisons le composant [Header.tsx](file:///c:/Users/User/Desktop/aialab_portfolio/rr/aia-lab-website/src/components/Header.tsx) sous forme de fragment React (`<>...</>`) pour séparer les flux d'affichage :

```mermaid
graph TD
    App[Layout/Page] --> Fragment[React Fragment]
    Fragment --> Header[Header fixed z-50]
    Header --> NavPill[Navigation Pill & Logo]
    Header --> ToggleBtn[Bouton Hamburger]
    Fragment --> Overlay[Mobile Menu Overlay fixed z-[45]]
    Overlay --> Glows[Orbes Lumineux Animés]
    Overlay --> NavLinks[Liens Principaux Staggered]
    Overlay --> Accordion[Accordéon Services Glassmorphic]
    Overlay --> Footer[Footer, Réseaux & CTA]
```

* **Z-Index Layering** :
  * La barre de navigation (`<header>`) conserve un `z-50` pour rester toujours au-dessus.
  * L'overlay du menu mobile possède un `z-[45]` pour se positionner directement sous le bouton de fermeture, tout en masquant complètement le contenu de la page (`z-0` à `z-10`).

---

## 3. Direction Artistique & Améliorations UI

### A. Fond & Effets d'Atmosphère
* **Occultation Complete** : Fond opaque `#0B0B0B` (Noir Profond) avec un filtre de flou d'arrière-plan (`backdrop-blur-2xl`) pour une transition douce.
* **Orbes Lumineux Holographiques** : Deux éléments circulaires animés avec Framer Motion oscillant doucement en arrière-plan :
  * Orbe 1 (Cyan `#08C1DC`) : En haut à droite.
  * Orbe 2 (Teal `#259EB1`) : En bas à gauche.
* **Texture** : Surcouche de bruit numérique subtile (`opacity-[0.02]`) pour un look technologique premium.

### B. Bouton Hamburger Rénové
* Le bouton de commutation utilise un fond en verre dépoli (`bg-white/[0.04] backdrop-blur-md border border-white/10`) lorsqu'il est fermé, réactif au toucher (`scale-95`).
* Lorsqu'il est ouvert, il conserve sa structure de verre mais acquiert une bordure fine couleur cyan (`border-primary/40`) avec des barres internes formant une croix parfaite.

### C. Accordéon des Services Immersif
Les sous-services ne sont plus une simple liste textuelle brute, mais sont structurés dans un bloc de verre noir dépoli (`bg-white/[0.02] border border-white/5 rounded-2xl p-4`) comprenant :
* Des en-têtes de catégorie avec icônes de la librairie Lucide :
  * **Branding Élite** : Icône `Sparkles` (Cyan)
  * **Web & Tech** : Icône `Monitor` (Bleu/Cyan)
  * **IA & Stratégie** : Icône `Zap` (Orange)
* Des micro-puces de sélection au survol.

---

## 4. Design de Mouvement (Framer Motion)

### A. Entrée/Sortie de l'Overlay (AnimatePresence)
```typescript
const overlayVariants = {
  hidden: { 
    y: "-100%",
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1] // Courbe d'atténuation classique pour fermeture rapide
    }
  },
  visible: { 
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] // Ressort amorti pour entrée progressive
    }
  }
};
```

### B. Effet Cascade (Stagger) pour les Liens
* Lors de l'ouverture : Les liens enfants glissent verticalement (`y: [20, 0]`) et apparaissent en fondu (`opacity: [0, 1]`) avec un décalage progressif (`staggerChildren: 0.08`, `delayChildren: 0.2`).
* Lors de la fermeture : Disparition immédiate ou cascade inverse ultra-rapide (`staggerChildren: 0.04`, `staggerDirection: -1`).

---

## 5. Plan de Validation
1. **Compilation** : Lancement de `npm run build` pour vérifier la validité des types TypeScript.
2. **Ergonomie tactile** : Validation de la hauteur tactile du bouton (>44px) et de l'interactivité sur écran mobile.
3. **Comportement Scroll** : Vérification du fait que le défilement de la page principale est bloqué lorsque le menu mobile est actif.
