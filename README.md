# Site Lyon Tech

Site web de l'association technique Lyon Tech du campus de Lyon de l'ECE.

## Structure du projet

```
├── index.html          # Page d'accueil (à la racine)
├── main.css            # CSS compilé (généré automatiquement)
├── main.js             # JavaScript
├── pages/              # Pages internes
│   ├── projets.html    # Page des projets
│   ├── equipe.html     # Page de l'équipe
│   ├── rejoindre.html  # Page "Nous rejoindre"
│   └── contact.html    # Page de contact
├── partials/           # Partials de référence (pour copier-coller)
│   ├── header.html     # Header commun (version de référence)
│   └── footer.html     # Footer commun (version de référence)
├── style/              # Fichiers SCSS sources
│   ├── main.scss       # Fichier principal SCSS
│   ├── abstracts/      # Variables, mixins, functions
│   ├── base/           # Reset, typography
│   ├── components/     # Boutons, cartes, formulaires
│   ├── layout/         # Header, footer
│   ├── pages/          # Styles spécifiques aux pages
│   └── utilities/      # Responsive, etc.
└── package.json        # Dépendances npm
```

## Développement

### Installation des dépendances

```bash
npm install
```

### Compilation du SCSS

Pour compiler le SCSS en CSS une fois :

```bash
npm run build:css
```

Pour compiler automatiquement à chaque modification :

```bash
npm run watch:css
```

## Structure SCSS

Le projet utilise une architecture SCSS modulaire organisée selon le pattern 7-1 :

- **abstracts/** : Variables, mixins et fonctions réutilisables
- **base/** : Styles de base (reset, typographie)
- **components/** : Composants réutilisables (boutons, cartes, formulaires)
- **layout/** : Structure de la page (header, footer)
- **pages/** : Styles spécifiques à chaque page
- **utilities/** : Utilitaires (responsive, helpers)

## Modification des styles

Pour modifier les styles :

1. Édite les fichiers SCSS dans le dossier `style/`
2. Compile avec `npm run build:css` ou utilise `npm run watch:css` pour la compilation automatique
3. Le fichier `main.css` sera régénéré automatiquement

## Structure HTML

Le projet utilise une organisation simple des fichiers HTML :

- **`index.html`** : Page d'accueil à la racine (servie directement)
- **`pages/`** : Toutes les autres pages HTML sont dans ce dossier
- **`partials/`** : Fichiers de référence pour le header et footer communs
  - Ces fichiers servent de **source unique** pour copier-coller les modifications
  - Comme on reste en HTML statique, ils ne sont pas inclus automatiquement
  - Quand tu modifies le header/footer, copie-le depuis `partials/` vers toutes les pages

### Chemins relatifs

- Depuis `index.html` : les liens vers les pages utilisent `pages/nom-page.html`
- Depuis `pages/*.html` : 
  - Les liens vers l'accueil utilisent `../index.html`
  - Les liens vers les autres pages utilisent `nom-page.html` (même dossier)
  - Les ressources (`main.css`, `main.js`) utilisent `../main.css` et `../main.js`

## Notes

- Les fichiers HTML pointent vers `main.css` (le fichier compilé)
- Ne modifie pas directement `main.css`, il sera écrasé lors de la compilation
- Modifie uniquement les fichiers `.scss` dans le dossier `style/`
- Pour modifier le header/footer, édite d'abord les fichiers dans `partials/`, puis copie-les dans toutes les pages HTML

