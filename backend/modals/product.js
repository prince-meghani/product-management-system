const mongoose = require('mongoose');

// Define the product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // URL to the image
  price: { type: Number, required: true },
  category: { type: String, required: true }, // e.g., espresso, latte
  rating: { type: Number, required: true, default: 0 },
  stock: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
