const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();
// Parses incoming JSON requests
app.use(bodyParser.json());
// Attaches userRoutes under the '/api' path
app.use('/api', userRoutes);
module.exports = app;