const express = require('express');
const router = express.Router();
const { products } = require('../data/mockData'); // Get mock data

// GET /api/products: 5-10 mock items
router.get('/', (req, res) => {
  // In a real app, this would be: Product.find()
  res.json(products);
});

module.exports = router;
