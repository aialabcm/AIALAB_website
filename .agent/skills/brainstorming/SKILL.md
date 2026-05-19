---
name: brainstorming
description: Guide l'IA pour explorer l'intention, les exigences et le design d'un projet de manière conversationnelle avant d'écrire le moindre code.
---

# Brainstorming et Idéation

Cette compétence aide à transformer des idées en spécifications de conception complètes grâce à un dialogue collaboratif naturel.

## When to use this skill
- Avant tout travail d'implémentation (création de fonctionnalités, ajout de composants, modification de comportement).
- Lorsqu'il est nécessaire de clarifier un projet, même s'il semble très simple (une todo list, un changement de configuration, un script, etc.).

## How to use it

### Règles Strictes (HARD-GATE)
**N'invoquez AUCUNE compétence d'implémentation, n'écrivez aucun code et ne mettez en place aucun projet avant d'avoir présenté un design et obtenu l'approbation de l'utilisateur.** Ceci s'applique à CHAQUE projet. Ignorer cette règle mène à un travail basé sur des hypothèses erronées.

### Le Processus étape par étape
Vous DEVEZ accomplir ces tâches dans l'ordre :

1. **Explorer le contexte du projet** : Lisez les fichiers existants, la documentation et les commits récents pour comprendre la base de code avant de lancer l'idéation.
2. **Poser des questions de clarification** : 
   - Poussez à clarifier le but, les contraintes et les critères de réussite.
   - NE posez qu'UNE seule question par message pour ne pas surcharger l'utilisateur.
   - Privilégiez les questions à choix multiples si possible, elles sont plus simples à répondre.
3. **Proposer des alternatives** : Ne sautez pas sur la première idée. Proposez toujours 2 ou 3 approches techniques ou de design, expliquez les compromis de chacune et donnez votre recommandation motivée.
4. **Présenter le design** : Une fois le besoin bien compris, présentez l'architecture, les composants, le flux de données ou la logique d'erreur. Découpez cette présentation si nécessaire et demandez l'approbation de l'utilisateur.
5. **Rédiger le document de spécification (Spec)** : 
   - Enregistrez la conception validée au format markdown. 
   - Privilégiez un dossier documentaire comme `docs/specs/YYYY-MM-DD-<sujet>-design.md` à la racine (créez le dossier s'il n'existe pas, ou suivez les règles du projet).
6. **Auto-révision de la Spécification** : 
   - Cherchez les "TBD", "TODO", ou éléments incomplets dans le fichier que vous venez d'écrire. S'il y en a, remplacez-les par de vraies instructions.
   - Vérifiez l'absence de contradictions ou d'ambiguïtés et corrigez-les immédiatement.
7. **Demander la revue utilisateur** : Demandez à l'utilisateur de lire le fichier markdown généré et de valider avant de passer à l'étape suivante.
8. **Transition vers l'implémentation** : Une fois la spec validée, passez UNIQUEMENT à la compétence `planification` (writing-plans) pour concevoir l'implémentation. 

### 💡 Aide Visuelle & Mermaid
Si vous pensez que des concepts d'architecture seraient plus évidents à comprendre visuellement, utilisez des diagrammes `mermaid` dans vos réponses (Graphes, Séquences, Classes) plutôt que de grands blocs de texte.

### Isolation et Clarté
- Divisez le système de façon claire. Pour chaque unité, vous devez pouvoir répondre : Que fait l'unité ? Comment l'utilise-t-on ? Quelles sont ses dépendances ?
- Si un projet comporte trop de variables non liées, aidez l'utilisateur à le découper en plusieurs sous-projets, puis brainstormez sur le premier.
