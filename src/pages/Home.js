import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { productsAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, cart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productsAPI.getAll();
      // Ensure prices are numbers
      const productsWithNumbers = data.map(product => ({
        ...product,
        price: typeof product.price === 'string' ? parseFloat(product.price) : (product.price || 0)
      }));
      setProducts(productsWithNumbers);
    } catch (error) {
      console.error('Error fetching products:', error);
      console.error('Error details:', error.message);
      setProducts([]);
      // Show user-friendly error
      alert('Failed to load products. Make sure the backend server is running on http://localhost:5000');
    } finally {
      setLoading(false);
    }
  };

  // Filter products in real-time as user types
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) {
      return products;
    }

    const searchLower = searchTerm.toLowerCase();
    return products.filter((product) => {
      // Search in name
      const nameMatch = product.name.toLowerCase().includes(searchLower);
      
      // Search in description
      const descriptionMatch = product.description.toLowerCase().includes(searchLower);
      
      return nameMatch || descriptionMatch;
    });
  }, [searchTerm, products]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddToCart = (product) => {
    if (!isAuthenticated || user?.role !== 'user') {
      alert('Please login as a user to add items to cart');
      navigate('/login');
      return;
    }
    addToCart({
      ...product,
      price: typeof product.price === 'number' ? product.price : parseFloat(product.price || 0)
    });
    // Check if item was already in cart
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      alert(`${product.name} quantity increased to ${(existingItem.quantity || 1) + 1}!`);
    } else {
      alert(`${product.name} added to cart!`);
    }
  };

  return (
    <div className="home-container">
      <div className="welcome-section" id="welcome_section">
        <h1><b>Welcome to Zero 3 Mobile Store</b></h1>
        <section id="intro">
          <h3>Discover Our Store</h3>
          <ul>
            <li>
              <i>We are thrilled to welcome you to our phone store, where we offer the latest and greatest mobile
                phones and accessories on the market. Whether you are a tech enthusiast or simply seeking a
                reliable and stylish phone to suit your needs, we have got you covered.</i>
            </li>
            <li>
              Our store is dedicated to providing top-notch products and outstanding customer service. Our
              knowledgeable staff members are always available to answer any questions you may have and provide
              guidance to help you make the right purchase decisions.
            </li>
          </ul>
        </section>

        <h3>Our Product</h3>
        <ul>
          <li id="i1">
            We believe that having the best technology at our fingertips is crucial to our everyday lives,
            whether it's for work or play. That's why we constantly strive to offer the latest and most innovative
            products from the industry's leading brands.
          </li>
          <li id="i2">
            We understand that purchasing a new phone can be a significant investment, which is why we offer
            competitive prices and financing options to help you find the perfect phone within your budget.
          </li>
          <li id="i3">
            In addition to our selection of phones, we also offer a wide range of accessories to enhance
            your phone's functionality and style, including cases, chargers, screen protectors, and more.
          </li>
        </ul>

        <h3>Our Commitment</h3>
        <ul>
          <li id="i4">
            We value your trust and loyalty, and we are committed to providing an excellent shopping
            experience that exceeds your expectations. So, come visit us at our phone store today and let us help
            you find the phone of your dreams.
          </li>
        </ul>
      </div>

      <form id="searchform" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          id="search-input"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <input type="submit" id="search-button" value="Search" />
      </form>

      <h4>Featured Products{filteredProducts.length !== products.length ? ` (${filteredProducts.length} found)` : ` (${products.length} total)`}</h4>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Loading products...</p>
        </div>
      ) : (
      <div className="products-grid">
        {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              // Fix image path - handle both relative and absolute paths
              // Also handle spaces in filenames by encoding them properly (but NOT for external URLs)
              let imagePath = product.image 
                ? (product.image.startsWith('http') 
                    ? product.image  // External URLs - don't modify
                    : product.image.startsWith('/') 
                      ? product.image 
                      : `/${product.image}`)
                : '/images/phone_img.jpg';
              
              // Replace spaces with %20 for proper URL encoding (only for local paths, not external URLs)
              // Also decode any existing %20 that might be in the database, then re-encode
              if (!imagePath.startsWith('http')) {
                // First decode any existing encoding
                imagePath = decodeURIComponent(imagePath);
                // Then re-encode spaces properly
                imagePath = imagePath.replace(/ /g, '%20');
              }
              
              return (
                <div key={product.id} className="box">
                  <img
                    src={imagePath}
                    width="200"
                    height="200"
                    alt={product.name}
                    onError={(e) => {
                      console.error(`Failed to load image for ${product.name}:`, imagePath);
                      e.target.src = '/images/phone_img.jpg';
                    }}
                    onLoad={() => {
                      console.log(`Successfully loaded image for ${product.name}:`, imagePath);
                    }}
                  />
            <h2>{product.name}</h2>
                  <div>
                    <p>{product.description}</p>
                    <p style={{ fontWeight: 'bold', fontSize: '1.2em', color: '#4CAF50' }}>
                      ${(typeof product.price === 'number' ? product.price : parseFloat(product.price || 0)).toFixed(2)}
                    </p>
                  </div>
                  <button className="add-to-cart" onClick={() => handleAddToCart({
                    ...product,
                    price: typeof product.price === 'number' ? product.price : parseFloat(product.price || 0)
                  })}>
                    Add to Cart
                  </button>
                  {product.infoUrl && (
                    <a 
                      href={product.infoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ display: 'block', marginTop: '10px', color: '#2196F3' }}
                    >
                More Info
              </a>
                  )}
          </div>
              );
            })
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
            <p>No products found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
      )}
    </div>
  );
};

export default Home;

