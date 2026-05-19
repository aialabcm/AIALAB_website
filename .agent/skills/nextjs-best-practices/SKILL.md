---
name: nextjs-best-practices
description: Principes de l'App Router de Next.js. Composants Serveur, récupération de données et modèles de routage.
---

# Meilleures Pratiques Next.js

Cette compétence fournit les principes fondamentaux pour le développement avec l'App Router de Next.js (version 13+).

## When to use this skill
- Lors du démarrage d'un nouveau projet Next.js.
- Pour décider entre l'utilisation de Composants Serveur ou Client.
- Pour structurer les appels de données (Fetching) et la gestion du cache.
- Pour organiser le routage complexe (Groupes, Parallèles, Interceptions).

## How to use it

### 1. Composants Serveur vs Client
**Règle d'or : Utilisez des Composants Serveur par défaut.**

| Caractéristique | Composant Serveur (Défaut) | Composant Client ('use client') |
|-----------------|----------------------------|---------------------------------|
| Récupération de données | Directe (async/await) | Via API ou Hooks |
| Accès backend (DB) | Oui | Non |
| Interactivité (onClick, onChange) | Non | Oui |
| État et Effets (useState, useEffect) | Non | Oui |

### 2. Récupération de Données (Fetching)
- **Côté Serveur** : Utilisez `fetch` directement dans les Composants Serveur.
- **Stratégies de Cache** :
  - **Par défaut** : Statique (mis en cache au moment du build).
  - **Revalidation** : ISR (rafraîchissement basé sur le temps).
  - **No-store** : Dynamique (à chaque requête).

### 3. Principes de Routage
- **Conventions de fichiers** :
  - `page.tsx` : UI de la route.
  - `layout.tsx` : Mise en page partagée.
  - `loading.tsx` : État de chargement.
  - `error.tsx` : Frontière d'erreur.
- **Organisation** :
  - **Groupes de routes `(nom)`** : Organiser sans impacter l'URL.
  - **Routes parallèles `@slot`** : Afficher plusieurs pages au même niveau.
  - **Interception de routes `(.)`** : Créer des overlays comme des modaux de galerie.

### 4. API et Server Actions
- **Route Handlers** : Utilisez `api/route.ts` pour les méthodes GET, POST, PUT, DELETE.
- **Server Actions** : Utilisez `'use server'` pour les soumissions de formulaires et les mutations de données sans API dédiée.

### 5. Optimisation des Performances
- **Images** : Utilisez le composant `next/image` pour l'optimisation automatique.
- **Bundle** : Utilisez des imports dynamiques pour les composants lourds.
- **Métadonnées** : Utilisez `generateMetadata` pour le SEO dynamique.

### 6. Anti-Patterns à Éviter
- ❌ N'utilisez pas `'use client'` pour chaque fichier.
- ❌ Ne récupérez pas de données dans les Composants Client si cela peut être fait sur le serveur.
- ❌ N'ignorez pas les états de chargement (`loading.tsx`).
- ❌ Évitez les énormes bundles clients ; préférez le fractionnement de code.

---
> **Rappel** : Les Composants Serveur favorisent la performance et la sécurité. Commencez toujours sur le serveur, et n'ajoutez du client que lorsque l'interactivité l'exige.
