# Blog API

Une API REST pour gérer un blog simple, développée avec Node.js, Express et SQLite.

## Installation

1. Cloner le projet
2. Installer les dépendances :
npm install
3. Démarrer le serveur :
node index.js

Le serveur démarre sur http://localhost:3000

## Endpoints

### Créer un article
POST /api/articles
Body: { "titre": "...", "contenu": "...", "auteur": "...", "categorie": "...", "tags": "..." }

### Lire tous les articles
GET /api/articles

### Filtrer les articles
GET /api/articles?categorie=Tech&auteur=Manuela&date=2026-03-23

### Lire un article par ID
GET /api/articles/:id

### Modifier un article
PUT /api/articles/:id
Body: { "titre": "...", "contenu": "...", "categorie": "...", "tags": "..." }

### Supprimer un article
DELETE /api/articles/:id

### Rechercher un article
GET /api/articles/search?query=texte

## Technologies
- Node.js
- Express.js
- SQLite3