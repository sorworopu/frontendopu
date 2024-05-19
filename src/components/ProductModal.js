import React from 'react';
import Modal from 'react-modal';
import ProductForm from './ProductForm';

Modal.setAppElement('#root'); // For accessibility

const ProductModal = ({ isOpen, onRequestClose, onSaveProduct, product }) => {
  const handleSave = (formData) => {
    if (product) {
      onSaveProduct({ ...product, ...formData });
    } else {
      onSaveProduct(formData);
    }
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className="modal-header">
        <h2>{product ? 'Edit Product' : 'Add Product'}</h2>
        <button onClick={onRequestClose}>Close</button>
      </div>
      <ProductForm product={product} onSave={handleSave} />
    </Modal>
  );
};

export default ProductModal;
