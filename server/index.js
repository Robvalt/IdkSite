const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/index.html'));
});

app.use("/Clicker", express.static(path.join(__dirname, '../public/Clicker')));
app.use("/KMAIL", express.static(path.join(__dirname, '../public/EMAIL')));
app.use("/2048", express.static(path.join(__dirname, '../public/2048')));
app.use("/Login", express.static(path.join(__dirname, '../public/Login')));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});