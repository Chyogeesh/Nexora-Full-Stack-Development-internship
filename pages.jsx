import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

const ProductsPage = ({ onCartUpdate }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div>Loading Vibe Commerce Products...</div>;

  return (
    <div className="product-grid">
      <h2>✨ Vibe Commerce Products</h2>
      <div className="grid">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onCartUpdate={onCartUpdate} 
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
