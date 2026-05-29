# Spécification de Design : Amélioration de la Visibilité de la Navbar sur Mobile (Version Corrigée)

Ce document détaille les ajustements apportés à la barre de navigation d'AIA LAB pour améliorer sa visibilité sur mobile, tout en laissant le header desktop à 100% inchangé.

---

## 1. Problématique

Sur mobile, au chargement de la page (non défilée) :
* Le fond du header est transparent.
* Il se superpose directement à l'image du Hero (le visage en noir et blanc, très sombre).
* Le logo (contenant le mot "LAB" en gris foncé/noir) et le bouton hamburger (gris foncé/noir) manquent de contraste et deviennent presque invisibles.

---

## 2. Solution Sélectionnée : Effet Verre Clair (Light Glassmorphism) sur Mobile uniquement

Pour résoudre ce problème de lisibilité sur mobile sans toucher au comportement ni au style de la version desktop.

### A. Comportement du Header
* **Sur Mobile (sous la taille d'écran `md`)** :
  * **Non scrollé (au sommet)** :
    * Application d'un fond blanc translucide à 60% d'opacité (`bg-[#FAFAFA]/60`).
    * Floutage de l'image de fond (`backdrop-blur-md`).
    * Bordure noire extrêmement subtile à 4% d'opacité (`border-black/[0.04]`).
    * *Résultat* : Le logo sombre et le bouton hamburger noir d'origine ressortent parfaitement grâce au contraste du verre dépoli.
  * **Scrollé** :
    * Augmentation de l'opacité à 80% (`bg-[#FAFAFA]/80`) pour assurer une bonne lisibilité lors du défilement au-dessus des sections de contenu.
* **Sur Desktop (à partir de la taille d'écran `md`)** :
  * Le comportement et le style restent **strictement identiques à l'original** :
    * **Non scrollé** : `bg-transparent border-transparent backdrop-blur-none` (100% transparent).
    * **Scrollé** : `bg-[#FAFAFA]/15 backdrop-blur-md border-black/[0.03] shadow-[0_8px_30px_rgba(0,0,0,0.02)]`.

---

## 3. Classes CSS ciblées dans Header.tsx

Les classes du composant `<header>` seront adaptées avec les préfixes Tailwind (`md:`) pour cibler uniquement le mobile :

```tsx
className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] border-b transition-colors duration-500 ${
  isOpen
    ? "bg-transparent border-transparent"
    : isScrolled 
      ? "bg-[#FAFAFA]/80 backdrop-blur-md border-black/[0.03] shadow-[0_8px_30px_rgba(0,0,0,0.02)] md:bg-[#FAFAFA]/15" 
      : "bg-[#FAFAFA]/60 backdrop-blur-md border-black/[0.04] md:bg-transparent md:border-transparent md:backdrop-blur-none"
} ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
```
