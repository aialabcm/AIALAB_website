# Spécification de Conception : Page Lancer un Projet

**Projet :** Portfolio AIA LAB  
**Composant/Route :** `/lancer-un-projet` (`src/app/lancer-un-projet/page.tsx`)  
**Date :** 2026-06-22  
**Auteur :** Antigravity

---

## 1. Vision Graphique & Inspiration

L'objectif de cette page est de fournir un portail d'onboarding haut de gamme pour les clients potentiels d'AIA LAB, inspiré directement de la mise en page de la capture de référence (`page_4.png`). 

Le design respecte la palette officielle d'AIA LAB sur fond clair `#FAFAFA`, en utilisant la couleur cyan primaire `#08C1DC` et le noir profond `#0B0B0B` pour créer des contrastes saisissants et une esthétique éditoriale épurée.

```
+-----------------------------------------------------------------------+
|  [Header AIA LAB]                                                     |
|                                                                       |
|  Lancer un projet (H1)                                                |
|                                                                       |
|  +--------------------------------+   +----------------------------+  |
|  | Parlez-nous de votre projet    |   | Appelez-nous               |  |
|  | [ Nom ]          [ Email ]     |   | +237 6XX XXX XXX           |  |
|  | [ Téléphone ]    [ Services ]  |   |                            |  |
|  | [ Message ]                    |   | Passez au Lab              |  |
|  |                                |   | Douala/Yaoundé - Nlongkak  |  |
|  |                 [-> Envoyer]   |   |                            |  |
|  +--------------------------------+   | Chat direct (WhatsApp/TG)  |  |
|                                       +----------------------------+  |
|                                                                       |
|  +-----------------------------------------------------------------+  |
|  |                      [ Carte Interactive ]                      |  |
|  +-----------------------------------------------------------------+  |
|                                                                       |
|  FAQ / Questions Fréquentes                                           |
|  +-----------------------------------------------------------------+  |
|  | > Comment se passe le premier appel de cadrage ?                |  |
|  | > Quels sont les livrables d'une phase de branding ?            |  |
|  +-----------------------------------------------------------------+  |
|                                                                       |
|  [Footer AIA LAB]                                                     |
+-----------------------------------------------------------------------+
```

### Fondations Visuelles
*   **Arrière-plan** : `#FAFAFA` (Fond Principal d'AIA LAB).
*   **Bouton d'action (Submit)** : Bouton noir profond (`#0B0B0B`) devenant cyan (`#08C1DC`) au survol, avec une micro-interaction de translation d'icône.
*   **Typographie** : Montserrat pour les titres, Roboto pour les paragraphes et labels, et Space Grotesk pour les éléments techniques (ex: numéros de téléphone, badges).

---

## 2. Structure de la Page & Composants

### A. Section d'Entête & Formulaire (Deux Colonnes)
*   **Colonne Gauche (Formulaire)** :
    *   *Titre* : "Parlez-nous de votre projet" avec un sous-titre de marque.
    *   *Champs* :
        1.  **Nom complet** (Obligatoire)
        2.  **Adresse email** (Obligatoire)
        3.  **Numéro de téléphone** (Optionnel - Format international)
        4.  **Type de service / Intérêt** (Menu déroulant : Branding Élite, Digital Experience, Motion Design, Contenu Stratégique, Architecture Web, IA Générative)
        5.  **Votre message / Description du besoin** (Obligatoire)
    *   *Intégration technique* : Validation des champs, envoi asynchrone via l'API Web3Forms (réutilisation de la clé et logique de `ContactCTA.tsx`), gestion des états (Idle, Loading, Success, Error).
*   **Colonne Droite (Coordonnées Rapides)** :
    *   Trois cartes avec effet de survol dynamique :
        *   **Appelez-nous** : Numéro officiel d'AIA LAB (`+237 690 00 00 00` ou similaire) avec un bouton d'action `tel:`.
        *   **Passez au Lab** : Adresse physique (Vallée Nlongkak, Yaoundé / Douala) avec un lien externe vers Google Maps.
        *   **Chat en direct** : Lien direct WhatsApp Business pour engager la conversation instantanément.

### B. Section Carte Interactive (Pleine Largeur)
*   Une carte stylisée en pleine largeur.
*   *Solution retenue* : Intégration d'une carte OpenStreetMap via un iframe Leaflet personnalisé ou un composant Leaflet sans surcharge, stylisé aux couleurs de la marque, ou un iframe Google Maps stylisé avec un filtre monochrome haut de gamme pour s'intégrer harmonieusement.

### C. Section FAQ (Questions Fréquentes Spécifiques)
*   Section accordéon interactive dédiée aux questions courantes lors du lancement d'un projet :
    *   *Q1 : Comment se passe notre premier échange ?* (Appel de cadrage gratuit de 30 min)
    *   *Q2 : Quels sont les modes de paiement acceptés ?* (Acompte 30%, jalons, solde)
    *   *Q3 : Intégrez-vous l'intelligence artificielle dans vos livrables ?* (Oui, pour optimiser nos processus et générer des assets uniques)
    *   *Q4 : Quel est le délai typique de démarrage après signature ?* (Sous 7 à 10 jours ouvrés)

---

## 3. Navigation et Redirection

*   Les boutons "Lancer le projet" et "Lancer un projet" situés dans le **Header**, le **HeroSection**, et les sections de call-to-action des pages internes (`AboutHero`, etc.) seront modifiés pour pointer vers la route `/lancer-un-projet` au lieu de l'ancre locale `#cta-contact`.
*   La section `ContactCTA` sur la page d'accueil restera fonctionnelle comme formulaire de fin de page (comme souhaité par l'utilisateur).

---

## 4. Comportement Responsif

*   **Desktop (`lg` et plus)** : Mise en page stricte en deux colonnes (60% formulaire / 40% coordonnées rapides). Carte et FAQ centrées en pleine largeur.
*   **Tablette/Mobile (`<lg`)** : Empilement vertical. Le formulaire apparaît en premier, suivi des coordonnées rapides, de la carte, puis de la FAQ.
*   **Zones tactiles** : Tous les champs de formulaire, boutons et boutons d'accordéons respectent la taille minimale recommandée de 44x44px.

---

## 5. Animations & Micro-interactions

*   **Focus des inputs** : Bordure passant au cyan `#08C1DC` avec un léger halo lumineux subtil (`transition-all duration-300`).
*   **Cartes de coordonnées** : Effet de soulèvement discret et lueur cyan au survol (`hover:-translate-y-1 hover:shadow-premium`).
*   **Bouton d'accordéon FAQ** : Rotation douce de l'icône chevron à 180° et ouverture de l'accordéon via Framer Motion.
*   **Transition globale** : Fondu d'apparition de la page au chargement.
