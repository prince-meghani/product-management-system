const Product = require('../modals/product');

// Get all products
// GET /api/products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch {
    res.status(500).json({ message: 'Error fetching products' });
  }
};

// Get single product by ID
// GET /api/products/:id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch {
    res.status(500).json({ message: 'Error fetching product' });
  }
};

// Create a new product (Admin only)
// POST /api/products
exports.addProduct = async (req, res) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: 'Admin only' });
  }

  const { name, description, price, image, category, rating, stock } = req.body;

  if (!name || !description || !price || !image || !category || stock === undefined) {
    return res.status(400).json({ message: 'All required fields must be provided' });
  }

  try {
    const product = new Product({ name, description, price, image, category, rating, stock });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error("Add Product Error:", err);
    res.status(500).json({ message: 'Product creation failed', error: err.message });
  }

};

// Update product by ID (Admin only)
// PUT /api/products/:id
exports.updateProduct = async (req, res) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: 'Admin only' });
  }

  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.json(updated);
  } catch {
    res.status(500).json({ message: 'Error updating product' });
  }
};

// Delete product by ID (Admin only)
// DELETE /api/products/:id
exports.deleteProduct = async (req, res) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: 'Admin only' });
  }

  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {  // add 'error' parameter here
    console.error('Delete error:', error); 
    res.status(500).json({ message: 'Error deleting product' });
  }
};


// Search products by keyword
// GET /api/products/search?keyword=...
exports.searchProducts = async (req, res) => {
  const { keyword } = req.query;
  try {
    const products = await Product.find({
      name: { $regex: keyword, $options: 'i' },
    });
    res.json(products);
  } catch {
    res.status(500).json({ message: 'Search failed' });
  }
};
