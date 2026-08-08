const express = require('express');
const { addToCart, getUserCart, updateCart, deleteFromCart} = require("../controllers/cartController");
const verifyFirebaseToken = require("../middleware/authMiddleware");

const cartRouter = express.Router();

cartRouter.get('/get', verifyFirebaseToken, getUserCart);

cartRouter.post('/add', verifyFirebaseToken, addToCart);

cartRouter.put('/update', verifyFirebaseToken, updateCart);

cartRouter.post('/delete', verifyFirebaseToken, deleteFromCart)

module.exports = cartRouter;
