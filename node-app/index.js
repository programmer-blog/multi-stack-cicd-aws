const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('🚀 Node.js app redeployed successfully via GitHub Actions + Docker (hotfix update applied)');
});

app.listen(port, () => console.log(`App listening on port ${port}`));