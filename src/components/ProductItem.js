import React from 'react';

const ProductItem = ({ product, onEditProduct }) => {
  return (
    <li>
      <div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>${product.price}</p>
        <img src={product.imageUrl} alt={product.name} style={{ width: '100px' }} />
      </div>
      <div>
        <button onClick={() => onEditProduct(product)}>Edit</button>
      </div>
    </li>
  );
};

export default ProductItem;
