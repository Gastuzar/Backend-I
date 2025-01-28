const express = require('express');
const ProductManager = require('../managers/ProductManager');

const router = express.Router();
const productManager = new ProductManager('./src/data/products.json');

router.get('/', async (req, res) => {
  const products = await productManager.getProducts();
  res.json(products);
});

router.get('/:pid', async (req, res) => {
  const product = await productManager.getProductById(req.params.pid);
  product ? res.json(product) : res.status(404).send('Producto no encontrado');
});

router.post('/', async (req, res) => {
  const newProduct = req.body;
  const product = await productManager.addProduct(newProduct);
  res.status(201).json(product);
});

router.put('/:pid', async (req, res) => {
  const updatedProduct = req.body;
  const result = await productManager.updateProduct(req.params.pid, updatedProduct);
  result ? res.json(result) : res.status(404).send('Producto no encontrado');
});

router.delete('/:pid', async (req, res) => {
  const result = await productManager.deleteProduct(req.params.pid);
  result ? res.status(204).send("producto eliminado") : res.status(404).send('Producto no encontrado');
});

module.exports = router;
