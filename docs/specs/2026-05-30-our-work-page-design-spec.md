# Spécification de Design : Page "Our Work" (Nos Réalisations) — AIA LAB

Ce document définit l'architecture, l'esthétique, l'UX et le plan d'implémentation de la page **Our Work** (`/work`) d'AIA LAB. Elle s'inspire du workflow dense et interactif de Penji tout en conservant l'ADN visuel d'AIA LAB : fond blanc/clair (`#FAFAFA`), accents cyan et turquoise (`#08C1DC`, `#259EB1`), typographies haut de gamme et micro-interactions fluides.

---

## 1. Composition de la Page

La page est découpée en 5 zones clés respectant un équilibre parfait entre esthétique artistique et conversion business :

### A. Le Hero "Art Gallery" Interactif
* **Background** : Blanc crème pur (`bg-bg-main` soit `#FAFAFA`). Intégration de 2 halos de lumière colorée animés en arrière-plan à opacité très faible (`opacity-5`) : un blob cyan en haut à gauche, un blob turquoise en bas à droite pour donner vie à la page sans charger le CPU.
* **Typographie** : Un titre monumental en Montserrat (`font-heading`) :
  > "Une galerie dédiée à l'art *digital.*"
  * Le mot *digital.* utilise la classe `.accent-italic` et la couleur primaire (`text-primary` soit `#08C1DC`).
* **Vignettes Volantes (Floating Gallery)** :
  * 4 à 6 petites vignettes d'images de nos projets phares flottent gracieusement autour du titre.
  * Elles apparaissent avec une animation d'entrée décalée (`staggered fade-in + spring lift`) de Framer Motion.
  * Au survol de la souris, chaque vignette réagit par un micro-décalage (effet parallaxe doux) qui suit le pointeur de l'utilisateur.

### B. La Barre de Filtre "Floating Glass"
* **Position** : Placer sous le Hero de manière centrée. Elle devient adhésive au défilement (`sticky top-20`) pour rester à portée de main.
* **Esthétique** : Un pill en verre dépoli clair (`bg-white/70 backdrop-blur-md border border-black/[0.05] shadow-[0_8px_30px_rgba(0,0,0,0.02)]`).
* **Micro-interactions** :
  * Catégories : *Tous, Web Design, Branding, Digital Experience*.
  * Une bulle active noire avec texte blanc glisse sous l'élément cliqué via Framer Motion (`layoutId="activeCategory"`), créant une sensation physique de sélection fluide.

### C. La Grille de Projets Masonry Premium
* **Layout** : Grille asymétrique modulaire (style Bento léger/Masonry) sur 2 ou 3 colonnes selon l'écran. 
* **Cartes Projets** :
  * Fond blanc pur (`bg-white`), bordure fine et discrète (`border-black/[0.04]`), bords généreusement arrondis (`rounded-[2rem]`).
  * Grand aspect visuel en image d'introduction avec zoom fluide (`hover:scale-[1.02] duration-700`).
  * Les métadonnées (catégorie, localisation, client) s'affichent de façon aérée.
  * Chaque carte intègre `data-cursor="explore"` pour transformer le curseur global en un cercle blanc inversé affichant "Voir" (grâce à notre `CustomCursor`).
  * Clic sur une carte ouvrant le `ProjectModal.tsx` classique.

### D. Le "Wall of Fame" (Témoignages & Preuves d'Exécution)
* **Concept** : Section combinant des avis clients textuels avec les livrables associés de manière visuelle et rythmée, augmentant considérablement la preuve sociale.
* **Visuel** : Cartes avec des notes étoilées dorées, témoignages en italique accentué, et un profil client soigné (avatar, nom, rôle).

### E. Le Double CTA Immersif de Conversion
Deux grands blocs côte à côte en bas de page (`grid grid-cols-1 md:grid-cols-2 gap-8`) :
1. **Bloc Gauche : "Watch our Demo"** (Découvrir notre processus) :
   * Fond blanc crème avec une illustration/mockup technologique fine.
   * CTA amenant à une vidéo explicative ou décrivant le workflow d'AIA LAB.
2. **Bloc Droite : "Schedule a project"** (Lancer l'aventure) :
   * Fond coloré en dégradé subtil blanc/turquoise avec boutons de contact principaux.
   * CTA direct vers la section `#cta-contact` avec bouton magnétique.

---

## 2. Intégration Technique (Next.js & Tailwind CSS)

### A. Remplacement de la Route de Redirection
Le fichier `src/app/work/page.tsx` sera nettoyé de sa redirection temporaire et contiendra le layout complet :
```tsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WorkHero from "@/components/WorkHero";
import WorkGrid from "@/components/WorkGrid";
import WallOfFame from "@/components/WallOfFame";
import WorkCTA from "@/components/WorkCTA";
import ContactCTA from "@/components/ContactCTA";

export default function WorkPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-[#FAFAFA]">
        <WorkHero />
        <WorkGrid />
        <WallOfFame />
        <WorkCTA />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
```

### B. Création des Nouveaux Composants
1. `src/components/WorkHero.tsx` : Contient le titre Montserrat, le grain de fond subtil et le système d'images volantes interactives.
2. `src/components/WorkGrid.tsx` : Gère le filtrage dynamique des projets avec le floating glass filter bar et la galerie masonry.
3. `src/components/WallOfFame.tsx` : Contient le module d'avis clients premium.
4. `src/components/WorkCTA.tsx` : Affiche le double bloc de conversion.

---

## 3. Plan de Validation

* **Responsive Design** : Test sur Viewports Mobiles (375px), Tablettes (768px) et Desktops (1440px+).
* **Framer Motion Accessibility** : Respect de la préférence système `prefers-reduced-motion` sur toutes les transitions des vignettes et de la grille.
* **Intégration du Curseur** : Vérification que le curseur interactif `"Voir"` se déclenche proprement sur chaque projet.
