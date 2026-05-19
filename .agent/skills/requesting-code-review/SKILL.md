---
name: requesting-code-review
description: À utiliser lors de la réalisation de tâches, l'implémentation de fonctionnalités majeures ou avant une fusion pour vérifier que le travail répond aux exigences.
---

# Demande de Revue de Code

Déployez un sous-agent `superpowers:code-reviewer` pour détecter les problèmes avant qu'ils ne se propagent. Le réviseur reçoit un contexte précisément élaboré — jamais l'historique complet de votre session. Cela permet au réviseur de rester concentré sur le produit du travail et non sur votre processus de réflexion, tout en préservant votre propre contexte.

**Principe de base :** Réviser tôt, réviser souvent.

## Quand utiliser cette compétence

**Obligatoire :**
- Après chaque tâche dans un développement piloté par sous-agents.
- Après avoir terminé une fonctionnalité majeure.
- Avant de merger vers la branche principale (`main`).

**Optionnel mais précieux :**
- Lorsque vous êtes bloqué (perspective fraîche).
- Avant un refactoring (vérification de la base de référence).
- Après avoir corrigé un bug complexe.

## Comment l'utiliser

**1. Récupérer les SHAs git :**
```bash
BASE_SHA=$(git rev-parse HEAD~1)  # ou origin/main
HEAD_SHA=$(git rev-parse HEAD)
```

**2. Déployer le sous-agent code-reviewer :**

Utilisez l'outil de tâche avec le type `superpowers:code-reviewer` et remplissez le template situé dans `code-reviewer.md`.

**Variables à renseigner :**
- `{WHAT_WAS_IMPLEMENTED}` - Ce que vous venez de construire.
- `{PLAN_OR_REQUIREMENTS}` - Ce que cela est censé faire.
- `{BASE_SHA}` - Commit de départ.
- `{HEAD_SHA}` - Commit de fin.
- `{DESCRIPTION}` - Bref résumé des changements.

**3. Agir selon les retours :**
- Corrigez immédiatement les problèmes **Critiques (Critical)**.
- Corrigez les problèmes **Importants (Important)** avant de continuer.
- Notez les problèmes **Mineurs (Minor)** pour plus tard.
- Argumentez si le réviseur se trompe (avec un raisonnement technique).

## Exemple

```
[Tâche 2 terminée : Ajout de la fonction de vérification]

Moi : Je vais demander une revue de code avant de continuer.

BASE_SHA=$(git log --oneline | grep "Task 1" | head -1 | awk '{print $1}')
HEAD_SHA=$(git rev-parse HEAD)

[Déploiement du sous-agent superpowers:code-reviewer]
  WHAT_WAS_IMPLEMENTED: Fonctions de vérification et de réparation pour l'index de conversation
  PLAN_OR_REQUIREMENTS: Tâche 2 du fichier docs/superpowers/plans/deployment-plan.md
  BASE_SHA: a7981ec
  HEAD_SHA: 3df7661
  DESCRIPTION: Ajout de verifyIndex() et repairIndex() avec 4 types d'erreurs gérés

[Retour du sous-agent] :
  Forces : Architecture propre, tests réels.
  Problèmes :
    Important : Indicateurs de progression manquants.
    Minor : Nombre magique (100) pour l'intervalle de rapport.
  Évaluation : Prêt à continuer.

Moi : [Correction des indicateurs de progression]
[Passage à la Tâche 3]
```

## Intégration aux Workflows

**Développement Piloté par Sous-Agents :**
- Revue après CHAQUE tâche.
- Détecter les problèmes avant qu'ils ne s'accumulent.
- Corriger avant de passer à la tâche suivante.

**Exécution de Plans :**
- Revue après chaque lot (ex: 3 tâches).
- Obtenir des retours, appliquer, continuer.

## Signaux d'alerte (Red Flags)

**Ne jamais :**
- Sauter une revue parce que "c'est simple".
- Ignorer les problèmes Critiques.
- Continuer avec des problèmes Importants non résolus.
- Se disputer avec un retour technique valide sans preuve.

Template disponible dans : `requesting-code-review/code-reviewer.md`
