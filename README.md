# Blog API

Une API REST pour gérer un blog simple, développée avec Node.js, Express et SQLite.

## Installation

1. Cloner le projet :
git clone https://github.com/Manou-dev/Blog-API-.git
cd Blog-API-

2. Installer les dépendances :
npm install

3. Démarrer le serveur :
node index.js

Le serveur démarre sur http://localhost:3000

## Endpoints

### Créer un article
POST /api/articles
Body: { "titre": "Mon article", "contenu": "Contenu...", "auteur": "Manuela", "categorie": "Tech", "tags": "node,api" }

Exemple :
curl -X POST http://localhost:3000/api/articles \
-H "Content-Type: application/json" \
-d '{"titre":"Mon article","contenu":"Contenu...","auteur":"Manuela","categorie":"Tech","tags":"node,api"}'

### Lire tous les articles
GET /api/articles

Exemple :
curl http://localhost:3000/api/articles

### Filtrer les articles
GET /api/articles?categorie=Tech&auteur=Manuela&date=2026-03-23

Exemple :
curl "http://localhost:3000/api/articles?categorie=Tech"

### Lire un article par ID
GET /api/articles/:id

Exemple :
curl http://localhost:3000/api/articles/1

### Modifier un article
PUT /api/articles/:id
Body: { "titre": "Nouveau titre", "contenu": "Nouveau contenu", "categorie": "Tech", "tags": "node" }

Exemple :
curl -X PUT http://localhost:3000/api/articles/1 \
-H "Content-Type: application/json" \
-d '{"titre":"Nouveau titre","contenu":"Nouveau contenu","categorie":"Tech","tags":"node"}'

### Supprimer un article
DELETE /api/articles/:id

Exemple :
curl -X DELETE http://localhost:3000/api/articles/1

### Rechercher un article
GET /api/articles/search?query=texte

Exemple :
curl "http://localhost:3000/api/articles/search?query=Node"

## Technologies
- Node.js v18.19.1
- Express.js
- SQLite3

## Codes HTTP utilisés
- 200 : Succès
- 201 : Création réussie
- 400 : Requête mal formée
- 404 : Article non trouvé
- 500 : Erreur serveur
