const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/index.html'));
});

app.get('/Clicker', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/Clicker/Clicker.html'));
});

app.get('/KMAIL', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/EMAIL/index.html'));
});

app.get('/2048', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/2048/index.html'));
});

app.get('/Login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/Login/page.html'));
});

app.get('/Gaming', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/Login/gaming.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});