---
name: createur-de-competences
description: Guide l'IA pour concevoir et générer de nouvelles compétences structurées et cohérentes en français, en respectant les standards Antigravity.
---

# Créateur de compétences

## When to use this skill
- Lorsqu'il est nécessaire de concevoir une nouvelle compétence (Skill) pour automatiser ou structurer une tâche récurrente.
- Lorsque l'utilisateur demande de formaliser une nouvelle aptitude ou un workflow complexe sous forme de "compétence globale".
- Pour s'assurer que toute nouvelle compétence créée respecte scrupuleusement les standards de formatage Markdown, le schéma YAML et la langue française.

## How to use it

### 1. Analyse et Planification
Avant de coder, analysez les besoins :
- Quel est l'objectif principal de la compétence ?
- Dans quelle catégorie s'inscrit-elle (développement, design, documentation, etc.) ?
- Quelles sont les étapes clés du workflow qu'elle doit automatiser ?

### 2. Structure du Dossier
Toute compétence doit être organisée dans son propre dossier nommé en `kebab-case` dans le répertoire des compétences :
- Chemin Typique : `~/.gemini/antigravity/skills/[nom-de-la-competence]/`
- Fichier Principal : `SKILL.md` (Obligatoire)
- Dossiers Optionnels : `resources/`, `examples/`, `tests/`

### 3. Rédaction du fichier SKILL.md
Le fichier doit suivre cette structure exacte, **exclusivement en français** :

#### Frontmatter YAML
```yaml
---
name: [identifiant-kebab-case]
description: [Description concise à la 3ème personne, décrivant ce que fait la compétence]
---
```

#### Corps Markdown
- **Titre H1** : Nom complet de la compétence (ex: `# Assistant WordPress`).
- **Section H2 "When to use this skill"** : Liste à puces décrivant les conditions de déclenchement.
- **Section H2 "How to use it"** : 
    - Instructions pas-à-pas.
    - Règles strictes à suivre (Best Practices).
    - Exemples de commandes ou de formats de sortie si nécessaire.

### 4. Bonnes Pratiques (Best Practices)
- **Langue unique** : Tout le contenu utilisateur et les instructions doivent être en français.
- **Précision** : Les instructions doivent être impératives et claires.
- **Contextualisation** : Utilisez des références aux chemins de fichiers réels (utilisez des placeholders si nécessaire).
- **Validation** : Vérifiez que le fichier Markdown est valide et que le frontmatter ne contient pas d'erreurs de syntaxe YAML.

### 5. Intégration Finale
Une fois la compétence rédigée, confirmez à l'utilisateur son emplacement et effectuez un test rapide en simulant un cas d'usage.
