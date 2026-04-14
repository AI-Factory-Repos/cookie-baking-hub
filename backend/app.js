const express = require('express');
const recipeRoutes = require('./routes/recipeRoutes');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

app.use('/api/recipes', recipeRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
