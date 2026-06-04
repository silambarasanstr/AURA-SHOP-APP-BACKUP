import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// ➕ Add to cart
export const addToCart = async (req, res) => {
  const { productId } = req.body;

  try {
    let cart = await Cart.findOne();

    const product = await Product.findById(productId);

    if (!cart) {
      cart = new Cart({
        items: [{ product: productId, quantity: 1 }],
        totalPrice: product.price,
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items.push({ product: productId, quantity: 1 });
      }

      cart.totalPrice += product.price;
    }

    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📥 Get Cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.find().populate("items.product");
    res.json(cart[0] || { items: [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ❌ Remove from cart
export const removeFromCart = async (req, res) => {
  const { productId } = req.params;

  try {
    let cart = await Cart.findOne();

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};