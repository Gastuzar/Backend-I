const express = require('express');
const productsRoutes = require('./src/routes/products_routes');
const cartsRoutes = require('./src/routes/carts_routes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);

module.exports = app;
