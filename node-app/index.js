const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Node.js app is live 🚀 (Docker + GitHub Actions deployment successful)'));

app.listen(port, () => console.log(`App listening on port ${port}`));