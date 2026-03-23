const db = require('../models/database');

// Créer un article
exports.createArticle = (req, res) => {
    const { titre, contenu, auteur, categorie, tags } = req.body;
    if (!titre || !contenu || !auteur) {
        return res.status(400).json({ message: 'Titre, contenu et auteur sont obligatoires' });
    }
    const date = new Date().toISOString().split('T')[0];
    db.run(
        `INSERT INTO articles (titre, contenu, auteur, date, categorie, tags) VALUES (?, ?, ?, ?, ?, ?)`,
        [titre, contenu, auteur, date, categorie, tags],
        function(err) {
            if (err) return res.status(500).json({ message: err.message });
            res.status(201).json({ message: 'Article créé', id: this.lastID });
        }
    );
};

// Lire tous les articles
exports.getArticles = (req, res) => {
    const { categorie, auteur, date } = req.query;
    let query = `SELECT * FROM articles WHERE 1=1`;
    const params = [];
    if (categorie) { query += ` AND categorie = ?`; params.push(categorie); }
    if (auteur) { query += ` AND auteur = ?`; params.push(auteur); }
    if (date) { query += ` AND date = ?`; params.push(date); }
    db.all(query, params, (err, rows) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(200).json({ articles: rows });
    });
};

// Lire un article par ID
exports.getArticleById = (req, res) => {
    db.get(`SELECT * FROM articles WHERE id = ?`, [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ message: err.message });
        if (!row) return res.status(404).json({ message: 'Article non trouvé' });
        res.status(200).json(row);
    });
};

// Modifier un article
exports.updateArticle = (req, res) => {
    const { titre, contenu, categorie, tags } = req.body;
    db.run(
        `UPDATE articles SET titre = ?, contenu = ?, categorie = ?, tags = ? WHERE id = ?`,
        [titre, contenu, categorie, tags, req.params.id],
        function(err) {
            if (err) return res.status(500).json({ message: err.message });
            if (this.changes === 0) return res.status(404).json({ message: 'Article non trouvé' });
            res.status(200).json({ message: 'Article modifié' });
        }
    );
};

// Supprimer un article
exports.deleteArticle = (req, res) => {
    db.run(`DELETE FROM articles WHERE id = ?`, [req.params.id], function(err) {
        if (err) return res.status(500).json({ message: err.message });
        if (this.changes === 0) return res.status(404).json({ message: 'Article non trouvé' });
        res.status(200).json({ message: 'Article supprimé' });
    });
};

// Rechercher un article
exports.searchArticles = (req, res) => {
    const { query } = req.query;
    if (!query) return res.status(400).json({ message: 'Paramètre query manquant' });
    db.all(
        `SELECT * FROM articles WHERE titre LIKE ? OR contenu LIKE ?`,
        [`%${query}%`, `%${query}%`],
        (err, rows) => {
            if (err) return res.status(500).json({ message: err.message });
            res.status(200).json({ articles: rows });
        }
    );
};