const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use("/Clicker", express.static(path.join(__dirname, '../public/Clicker/Clicker.html')));
app.use("/KMAIL", express.static(path.join(__dirname, '../public/EMAIL/index.html')));
app.use("/2048", express.static(path.join(__dirname, '../public/2048/index.html')));
app.use("/Login", express.static(path.join(__dirname, '../public/Login/page.html')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});