const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../public/html/index.html'));
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
});

// CLICKER
app.use("/Clicker", express.static(path.join(__dirname, '../public/html/Clicker')));
app.use("/Clicker/Shop", express.static(path.join(__dirname, '../public/html/Clicker/Shop')));

app.use("/KMAIL", express.static(path.join(__dirname, '../public/html/EMAIL')));
app.use("/2048", express.static(path.join(__dirname, '../public/html/2048')));
app.use("/Login", express.static(path.join(__dirname, '../public/html/Login')));
app.use("/Gaming", express.static(path.join(__dirname, '../public/html/Gaming')));

// BAKERY URLS
app.use("/Bakery", express.static(path.join(__dirname, '../public/html/bakery')));
app.use("/Bakery/Images", express.static(path.join(__dirname, '../public/html/bakery')));

// LOGGER
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next(); // Pass control to the next handler
});

app.listen(port, () => {
    console.log('Server is running on port ${port}');
    console.log('Waiting For Requests...');
});
