const db = require('../config/db');

const getAllProducts = (req, res) => {
  const query = 'SELECT * FROM products ORDER BY id DESC';
  
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching products' });
    }
    res.json(results);
  });
};

const getProductById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM products WHERE id = ?';
  
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching product' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(results[0]);
  });
};

const createProduct = (req, res) => {
  const { name, description, price, infoUrl } = req.body;
  
  // Get image path from uploaded file or use existing image URL
  let imagePath = '';
  if (req.file) {
    // File was uploaded - use the uploaded file
    imagePath = `images/${req.file.filename}`;
  } else if (req.body.image) {
    // Use provided image URL/path (for backward compatibility)
    imagePath = req.body.image;
  }

  if (!name || !description || !price) {
    return res.status(400).json({ error: 'Name, description, and price are required' });
  }

  const query = 'INSERT INTO products (name, description, price, image, infoUrl) VALUES (?, ?, ?, ?, ?)';
  
  db.query(query, [name, description, price, imagePath, infoUrl || ''], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error creating product' });
    }
    res.status(201).json({ id: results.insertId, message: 'Product created successfully', image: imagePath });
  });
};

const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, description, price, infoUrl } = req.body;
  
  // Get image path from uploaded file or use existing image
  let imagePath = req.body.image || '';
  if (req.file) {
    // New file was uploaded - use the uploaded file
    imagePath = `images/${req.file.filename}`;
    
    // Optionally: Delete old image file if it exists and is in our uploads folder
    // (You can implement this if needed)
  }

  const query = 'UPDATE products SET name = ?, description = ?, price = ?, image = ?, infoUrl = ? WHERE id = ?';
  
  db.query(query, [name, description, price, imagePath, infoUrl || '', id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error updating product' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product updated successfully', image: imagePath });
  });
};

const deleteProduct = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM products WHERE id = ?';
  
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error deleting product' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};


