---
name: ui-ux-pro-max
description: Moteur d'intelligence de design pour créer des interfaces UI/UX professionnelles avec des systèmes de design personnalisés, des palettes de couleurs industrielles et des règles d'ergonomie avancées.
---

# UI UX Pro Max

Cette compétence fournit une intelligence de conception pour construire des interfaces UI/UX de niveau professionnel sur plusieurs plateformes et frameworks. Elle utilise un moteur de raisonnement pour générer des systèmes de design complets basés sur le type de produit et les besoins utilisateur.

## When to use this skill
- **Nouveau projet ou page** : Pour établir une direction visuelle cohérente dès le départ.
- **Création de composants** : Pour concevoir des cartes, des modaux ou des formulaires optimisés.
- **Choix esthétiques** : Pour recommander des styles (Glassmorphisme, Minimalisme, etc.), des couleurs ou des typographies.
- **Audit UI/UX** : Pour vérifier l'accessibilité, les contrastes et le respect des standards mobiles/web.
- **Optimisation et Correction** : Pour corriger des problèmes d'espacement, d'animation ou de hiérarchie visuelle.

## How to use it

### 1. Analyse des Besoins
Identifiez le type de produit (SaaS, E-commerce, Portfolio), l'audience cible et le style souhaité (sombre, minimaliste, vibrant).

### 2. Génération du Système de Design (REQUIS)
Utilisez toujours cette commande en priorité pour obtenir des recommandations complètes basées sur le moteur de raisonnement :

```bash
python3 C:\Users\User\.gemini\antigravity\skills\ui-ux-pro-max\scripts\search.py "<type_de_produit> <industrie> <mots_clés>" --design-system -p "<Nom_du_Projet>"
```

### 3. Recherches détaillées par Domaine
Si vous avez besoin de précisions sur une dimension spécifique, utilisez l'argument `--domain` :

| Besoin | Domaine | Exemple de commande |
|--------|---------|---------------------|
| Styles UI | `style` | `python3 C:\Users\User\.gemini\antigravity\skills\ui-ux-pro-max\scripts\search.py "glassmorphism" --domain style` |
| Typographie | `typography` | `python3 C:\Users\User\.gemini\antigravity\skills\ui-ux-pro-max\scripts\search.py "professional" --domain typography` |
| Palettes Couleur | `color` | `python3 C:\Users\User\.gemini\antigravity\skills\ui-ux-pro-max\scripts\search.py "fintech" --domain color` |
| Graphiques | `chart` | `python3 C:\Users\User\.gemini\antigravity\skills\ui-ux-pro-max\scripts\search.py "dashboard" --domain chart` |
| Bonnes pratiques UX | `ux` | `python3 C:\Users\User\.gemini\antigravity\skills\ui-ux-pro-max\scripts\search.py "accessibility" --domain ux` |

### 4. Règles de Design Professionnelles
- **Pas d'Emojis comme icônes** : Utilisez des bibliothèques vectorielles (Phosphor, Heroicons).
- **Rythme d'espacement de 8dp** : Utilisez des incréments de 4/8dp pour les marges et l'espacement.
- **Contraste de texte** : Respectez le ratio WCAG >= 4.5:1 pour le texte principal.
- **Zones tactiles** : Minimum 44x44pt sur mobile.
- **Animations** : Entre 150ms et 300ms pour les micro-interactions.

### 5. Persistance du Système (Pattern Master + Overrides)
Pour sauvegarder le système de design et assurer la cohérence entre les sessions, ajoutez `--persist` :
```bash
python3 C:\Users\User\.gemini\antigravity\skills\ui-ux-pro-max\scripts\search.py "<query>" --design-system --persist -p "<Projet>" [--page "<Nom_Page>"]
```
Ceci créera un dossier `design-system/` avec un fichier `MASTER.md` et des fichiers par page.

---
**Note technique** : Cette compétence nécessite Python 3. Assurez-vous que le chemin vers les scripts est correct.
