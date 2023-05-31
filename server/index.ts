// EXPORTS
const express = require('express');
const app = express();
let router = require('./routes/routing.ts');

// ROUTING
app.use('/', router);

// PORT
app.listen(3000);