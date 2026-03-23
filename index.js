const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const articleRoutes = require('./routes/articles');
app.use('/api/articles', articleRoutes);

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});