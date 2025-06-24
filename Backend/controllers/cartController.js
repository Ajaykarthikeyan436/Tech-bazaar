const Cart = require('../models/cartModel');
const Product = require("../models/productModel");

// Add Products to User Cart
const addToCart = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { productId, quantity } = req.body;

    if (!productId || typeof quantity !== 'number') {
      return res.status(400).json({ success: false, message: 'Invalid productId or quantity' });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        products: [{ productId, quantity }],
      });
    } else {
      const existingProduct = cart.products.find(p => p.productId === productId);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
    }

    await cart.save();
    res.json({ success: true, message: 'Added to Cart', cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//Get the user Cart 
const getUserCart = async (req, res) => {
  try {
    const userId = req.user.uid; // 🟢 get userId from Firebase decoded token

    const cart = await Cart.findOne({ userId }).populate("products.productId", "name image price description");

    console.log(cart)

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    res.json({ success: true, cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update product quantity in cart

const updateCart = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    const product = cart.products.find(p => p.productId.toString() === productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found in cart' });
    }

    product.quantity = quantity;
    await cart.save();

    res.json({ success: true, message: 'Cart updated', cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//Delete Product from cart
const deleteFromCart = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { productId } = req.body;

    // 🟢 Find and update the cart by pulling the productId
    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { products: { productId } } },
      { new: true } // 🟢 return the updated document
    ).populate("products.productId", "name image price description"); // optional: populate for fresh view

    if (!updatedCart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    res.json({ success: true, message: "Product removed from cart", cart: updatedCart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = {
  addToCart,
  getUserCart,
  updateCart,
  deleteFromCart,
};
