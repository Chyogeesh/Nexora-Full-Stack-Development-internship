import React, { useState } from 'react';
import { addToCart } from '../services/api';

const ProductCard = ({ product, onCartUpdate }) => {
  const [qty, setQty] = useState(1);

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id, qty);
      onCartUpdate(); // Trigger a refetch of the cart data in the parent
      alert(`${qty} x ${product.name} added!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item. See console for details.');
    }
  };

  return (
    <div className="product-card">
      <h4>{product.name}</h4>
      <p>${product.price.toFixed(2)}</p>
      <input 
        type="number" 
        min="1" 
        value={qty} 
        onChange={(e) => setQty(Math.max(1, parseInt(e.target.value)))}
      />
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
