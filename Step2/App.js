const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const {writeFileSync} = require('fs');



// Middleware per processare i dati JSON inviati nei POST
app.use(express.json());

// 1. SERVIRE FILE STATICI
// Questo rende accessibile tutto ciò che è dentro la cartella "public"
// Se vai su http://localhost:3000/ vedrai index.html in automatico
app.use(express.static('public'));


app.post('/post', (req, res) => {
    const dati = req.body; // I dati inviati dal client
    writeFileSync('post.json', JSON.stringify(dati));
    res.json({message: 'Dati ricevuti e salvati!'});
});

app.listen(PORT, () => {
    console.log(`Server in esecuzione su http://localhost:${PORT}`);
});