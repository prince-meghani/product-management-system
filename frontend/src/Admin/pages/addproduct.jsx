import React, { useState } from 'react';
import axiosInstance from '../../utils/axios';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    image: '',
    price: '',
    category: '',
    rating: 0,
    stock: '',
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in as admin to add a product');
        return;
      }

      const productToSend = {
        ...product,
        price: Number(product.price),
        rating: Number(product.rating),
        stock: Number(product.stock),
      };

      const response = await axiosInstance.post('product', productToSend, { headers: { Authorization: `Bearer ${token}` } });



      alert('Product added successfully!');
      setProduct({
        name: '',
        description: '',
        image: '',
        price: '',
        category: '',
        rating: 0,
        stock: '',
      });
    } catch (error) {
      console.error('Error adding product:', error.response?.data || error.message);
      alert('Failed to add product');
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10 col-sm-12">
          <h2 className="mb-4 text-center">Add New Product</h2>
          <form onSubmit={handleSubmit}>
            <div className="row">
              {[
                { label: 'Name', name: 'name', type: 'text' },
                { label: 'Description', name: 'description', type: 'text' },
                { label: 'Image URL', name: 'image', type: 'text' },
                { label: 'Price (₹)', name: 'price', type: 'number' },
                { label: 'Category', name: 'category', type: 'text' },
                { label: 'Rating (0-5)', name: 'rating', type: 'number' },
                { label: 'Stock', name: 'stock', type: 'number' },
              ].map((field) => (
                <div className="col-md-6 mb-3" key={field.name}>
                  <label className="form-label fw-semibold">{field.label}</label>
                  <input
                    type={field.type}
                    className="form-control"
                    name={field.name}
                    value={product[field.name]}
                    onChange={handleChange}
                    required
                    min={field.name === 'rating' ? 0 : undefined}
                    max={field.name === 'rating' ? 5 : undefined}
                  />
                </div>
              ))}
            </div>
            <button type="submit" className="btn btn-success w-100 mt-3">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
