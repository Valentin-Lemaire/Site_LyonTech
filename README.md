# Lyon Tech - Site Web Officiel

Site web officiel de l'association technique du campus de Lyon de l'ECE. Vitrine des projets, de l'équipe et point de contact pour les étudiants et partenaires.

## 🌟 Fonctionnalités

### Partie Publique
- **Design Moderne & Responsive** : Glassmorphism, animations fluides, compatible mobile/tablette/desktop (Menu burger robuste).
- **Mode Sombre (Dark Mode)** : Thème persistant (via URL et LocalStorage) même en navigation locale.
- **Pages** : Accueil, Projets, Équipe, Nous Rejoindre, Contact.
- **Formulaire de Contact** : Envoi de messages directement relié à Firestore.

### Panel Administrateur (`/admin`)
- **Tableau de Bord Sécurisé** : Authentification via Firebase Auth.
- **Gestion des Messages** :
  - Liste des messages reçus.
  - Statut Lu/Non lu avec indicateur visuel (Gras + Badge "Nouveau").
  - Traçabilité : "Lu par [Nom]" avec horodatage.
  - Badge de notification (compteur) dans la sidebar.
- **Gestion de contenu (CMS)** :
  - Ajouter/Modifier/Supprimer des **Projets**.
  - Ajouter/Modifier/Supprimer des membres de l'**Équipe**.
- **Interface Super Responsive** : Sidebar rétractable sur mobile, tableaux défilants, formulaires adaptés.

## 🛠 Technologies

- **Frontend** : HTML5, SCSS (Sass), Vanilla JavaScript.
- **Backend (Serverless)** : Firebase (Google).
  - **Authentication** : Gestion des accès admin.
  - **Firestore** : Base de données NoSQL (Projets, Équipe, Messages).
  - **Hosting** : Hébergement statique performant.
- **Outils** : NPM, Sass Compass/Watcher.

## 📂 Structure du Projet

```bash
├── admin/              # Panel Administrateur (Protégé)
│   ├── index.html      # Dashboard Admin (SPA : Messages, Projets, Team)
│   └── login.html      # Page de connexion Admin
├── style/              # Sources SCSS (Architecture 7-1)
│   ├── main.scss       # Point d'entrée
│   ├── abstracts/      # Variables, Mixins
│   ├── layout/         # Header, Footer
│   ├── utilities/      # Responsive, Helpers
│   └── ...
├── pages/              # Pages publiques (Projets, Équipe...)
├── index.html          # Page d'accueil
├── main.js             # Logique JS globale (Menu, Thème...)
├── main.css            # CSS compilé (ne pas modifier directement)
├── firebase.json       # Config déploiement Firebase
├── firestore.rules     # Règles de sécurité Firestore
└── package.json        # Dépendances NPM
```

## 🚀 Installation & Développement

### Pré-requis
- Node.js & NPM installés.
- Firebase CLI (`npm install -g firebase-tools`).

### 1. Installation
```bash
npm install
```

### 2. Développement Local (CSS)
Le site est statique, vous pouvez ouvrir `index.html` directement dans le navigateur.
Pour travailler sur le design, lancez la compilation SCSS en mode "watch" :

```bash
npm run watch:css
```

### 3. Déploiement
Le site est hébergé sur Firebase Hosting.

1. Se connecter à Firebase :
   ```bash
   firebase login
   ```

2. Déployer (Site + Règles de sécurité) :
   ```bash
   firebase deploy
   ```

## 🔐 Sécurité & Admin

- L'accès au dossier `/admin` est protégé par un script de redirection JS vérifiant l'état d'authentification Firebase.
- **Firestore Rules** :
  - **Lecture Publique** : Projets, Équipe.
  - **Écriture Publique** : Création de messages (Contact).
  - **Admin Uniquement** : Lecture des messages, Modification Projets/Équipe.
- **Utilisateurs Admin** : Gérés via la console Firebase Authentication.

---
*Dernière mise à jour : Décembre 2025*
