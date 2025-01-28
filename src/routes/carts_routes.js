const express = require('express');
const CartManager = require('../managers/CartManager');

const router = express.Router();
const cartManager = new CartManager('./src/data/carts.json');

router.post('/', async (req, res) => {
  const newCart = await cartManager.createCart();
  res.status(201).json(newCart);
});

router.get('/:cid', async (req, res) => {
  const cart = await cartManager.getCartById(req.params.cid);
  cart ? res.json(cart) : res.status(404).send('Carrito no encontrado');
});

router.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const result = await cartManager.addProductToCart(cid, pid);
  result ? res.status(200).json(result) : res.status(404).send('Carrito o producto no encontrado');
});

module.exports = router;
