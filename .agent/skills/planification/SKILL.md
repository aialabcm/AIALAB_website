---
name: planification
description: Rédige des plans d'implémentation exhaustifs, testables et découpés en micro-tâches, à partir de spécifications validées.
---

# Planification de l'Implémentation

Concevoir des plans techniques détaillés comme si le développeur qui allait les appliquer n'avait aucun contexte sur la base de code, mais qu'il était expérimenté. 
Donnez l'ensemble du plan sous forme de tâches de petite taille à exécuter. Appliquez les principes DRY, YAGNI, des commits fréquents et le TDD (Test-Driven Development).

## When to use this skill
- Après avoir obtenu une spécification validée grâce à la compétence `brainstorming`.
- Lorsque vous disposez d'exigences techniques pour accomplir une tâche en plusieurs étapes.
- Toujours AVANT de commencer à toucher au moindre code pour une nouvelle fonctionnalité.

## How to use it

### Format et Sauvegarde d'un Plan
Les plans doivent être sauvegardés dans des fichiers lisibles. 
- Emplacement recommandé : `docs/plans/YYYY-MM-DD-<nom-fonctionnalite>.md` (adaptez si un standard de projet est existant).

### L'En-tête de Plan Obligatoire
Tout plan DOIT commencer par ce bloc :

```markdown
# Plan d'Implémentation : [Nom de la Fonctionnalité]

**Objectif :** [Une phrase décrivant ce qui va être construit]

**Architecture :** [2 à 3 phrases justifiant l'approche]

**Technologies clés :** [Liste des langages, frameworks, dépendances techniques qui seront employés]

---
```

### Granularité "Bite-Sized" et Approche TDD
Chaque tâche doit être décomposée en petites étapes d'actions très courtes (2 à 5 minutes). L'implémentation doit suivre la logique TDD :
1. Écrire le test en échec
2. Vérifier l'échec
3. Implémenter le minimum vital
4. Vérifier la réussite
5. Commiter

### Structure détaillée d'une tâche

```markdown
### Tâche N : [Nom du Composant / Action]

**Fichiers ciblés :**
- Créer : `chemin/exact/vers/nouveau_fichier.py`
- Modifier : `chemin/exact/vers/fichier_existant.py:123-145`
- Test : `tests/chemin/pour/test_nom_fichier.py`

- [ ] **Étape 1 : Écrire le test en échec**
(Insérer le code exact du test ici)

- [ ] **Étape 2 : Lancer le test (Il doit échouer)**
Exécuter : `commande test exact`
Attente : ÉCHEC sur "fonction non définie" ou équivalent.

- [ ] **Étape 3 : Implémentation Minimale**
(Insérer le code complet de l'implémentation permettant de valider le test)

- [ ] **Étape 4 : Lancer le test (Il doit réussir)**
Exécuter : `commande test exact`
Attente : PASS

- [ ] **Étape 5 : Commit**
Exécuter : `git add ... && git commit -m "feat: ajout du comportement cible"`
```

### 🚫 STRICTEMENT INTERDIT : Les Placeholders
Aucune étape ne doit contenir de placeholders ou d'instructions vagues.
Les formulations suivantes constituent un **ECHEC DE PLANIFICATION** :
- "TBD", "TODO", "à implémenter plus tard", "remplir les détails plus tard"
- "Ajouter la gestion d'erreur appropriée" / "Styler la page pour qu'elle soit jolie" sans donner le code.
- "Écrire les tests pour le code ci-dessus" (sans fournir le code réel du test).
- "Faire comme pour la Tâche 1" (le plan doit être lisible indépendamment, le code doit être réécrit).
- Se référer à des variables, types ou méthodes non définis préalablement.

**LE PLAN DOIT CONTENIR LE CODE EXACT À MODIFIER OU À CRÉER.**

### Auto-Évaluation du Plan
Avant de le considérer comme final, scannez mentalement votre propre plan fraîchement généré :
1. **Couverture des points** : Tous les éléments de la spec initiale ont-ils été assignés à une tâche de votre plan ?
2. **Recherche de Placeholders** : Avez-vous laissé accidentellement un TODO pour ignorer un détail embêtant ? Si oui, remplacez le immédiatement par la vraie solution technique.
3. **Cohérence sémantique** : Les noms de variables, classes et fonctions restent-ils exacts de la tâche 1 à la tâche 10 ? (Une fonction nommée `init() ` devenue `initialize()` au milieu ruine le plan).

Assurez-vous de la qualité et soumettez-le pour approbation avant son exécution.
