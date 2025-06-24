const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  userId: { type: String, required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
      quantity: { type: Number, required: true }
    }
  ]
}, { timestamps: true });

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;



