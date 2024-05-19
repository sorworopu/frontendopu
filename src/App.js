// App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import ProductList from './components/ProductList';
import ProductModal from './components/ProductModal';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch products from the backend
    axios.get('http://localhost:8081/groproduct')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  const handleSaveProduct = (product) => {
    if (product.id) {
      // Update product
      axios.put(`http://localhost:8081/groproduct/${product.id}`, product)
        .then(response => {
          setProducts(products.map(p => (p.id === product.id ? response.data : p)));
        })
        .catch(error => {
          console.error("There was an error updating the product!", error);
        });
    } else {
      // Create new product
      axios.post('http://localhost:8081/addprod', product)
        .then(response => {
          setProducts([...products, response.data]);
        })
        .catch(error => {
          console.error("There was an error creating the product!", error);
        });
    }
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (id) => {
    axios.delete(`http://localhost:8081/groproduct/${id}`)
      .then(response => {
        setProducts(products.filter(p => p.id !== id));
      })
      .catch(error => {
        console.error("There was an error deleting the product!", error);
      });
  };

  return (
    <Router>
      <div className="container">
        <div className="header">
          <h1>Grocery Store Admin Panel</h1>
        </div>
        <button onClick={handleAddProduct}>Add Product</button>
        <Routes>
          <Route path="/" element={<ProductList products={products} onEditProduct={handleEditProduct} onDeleteProduct={handleDeleteProduct} />} />
        </Routes>
        <ProductModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          onSaveProduct={handleSaveProduct}
          product={selectedProduct}
        />
      </div>
    </Router>
  );
};

export default App;
