const express = require('express');
const router = express.Router();
const { cart, products } = require('../data/mockData'); 

// Helper function to calculate cart total
const calculateTotal = (cartItems) => {
  return cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
};

// POST /api/cart: Add {productId, qty}
router.post('/cart', (req, res) => {
  const { productId, qty } = req.body;
  const product = products.find(p => p.id === productId);

  if (!product || !qty || qty <= 0) {
    return res.status(400).json({ message: 'Invalid product or quantity' });
  }

  const existingItemIndex = cart.findIndex(item => item.productId === productId);

  if (existingItemIndex > -1) {
    // Update quantity
    cart[existingItemIndex].qty += qty;
  } else {
    // Add new item
    cart.push({ productId, qty, name: product.name, price: product.price, id: Date.now().toString() });
  }

  res.status(201).json(cart);
});

// GET /api/cart: Get cart + total
router.get('/cart', (req, res) => {
  const total = calculateTotal(cart);
  res.json({ items: cart, total: total.toFixed(2) });
});

// DELETE /api/cart/:id: Remove item (id is the unique cart item id)
router.delete('/cart/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = cart.length;
  // Remove item by filtering
  const updatedCart = cart.filter(item => item.id !== id);
  // Important: In a real DB, you'd use a DELETE query.
  cart.length = 0; // Clear existing array
  cart.push(...updatedCart); // Re-populate with updated list

  if (cart.length === initialLength) {
    return res.status(404).json({ message: 'Cart item not found' });
  }

  res.status(200).json({ message: 'Item removed', items: cart });
});

// POST /api/checkout: {cartItems} -> mock receipt
router.post('/checkout', (req, res) => {
  const total = calculateTotal(req.body.cartItems);
  
  // Clear the mock cart after checkout (replace with DB logic)
  cart.length = 0; 

  res.status(200).json({
    message: 'Checkout successful! Thank you for your Vibe Commerce order.',
    receipt: {
      orderId: `VIBE-${Date.now()}`,
      total: total.toFixed(2),
      timestamp: new Date().toISOString(),
      customer: req.body.customerInfo || 'Guest',
    },
  });
});

module.exports = router;
