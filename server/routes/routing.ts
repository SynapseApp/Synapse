// IMPORT
const express = require('express');
const app = express();

// ROUTING
app.get('/', (req, res) => {
    res.send("hello world");
})

// EXPORTS
module.exports = app;