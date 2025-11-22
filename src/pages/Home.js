import React, { useState, useMemo } from 'react';
import { featuredProducts } from '../data/products';
import { useCart } from '../context/CartContext';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();

  // Filter products in real-time as user types
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) {
      return featuredProducts;
    }

    const searchLower = searchTerm.toLowerCase();
    return featuredProducts.filter((product) => {
      // Search in name
      const nameMatch = product.name.toLowerCase().includes(searchLower);
      
      // Search in description
      const descriptionMatch = product.description.toLowerCase().includes(searchLower);
      
      // Search in specs
      const specsMatch = product.specs.some(spec => 
        spec.toLowerCase().includes(searchLower)
      );

      return nameMatch || descriptionMatch || specsMatch;
    });
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
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

      <h4>Featured Product{filteredProducts.length !== featuredProducts.length ? ` (${filteredProducts.length} found)` : ''}</h4>

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
          <div key={product.id} className="box" id={
            product.id === 1 ? 'iphone16p' : 
            product.id === 2 ? 's24p' : 
            product.id === 3 ? 'zfold' : 
            product.id === 4 ? 'iphone15' : 
            product.id === 5 ? 'iphone16' :
            product.id === 11 ? 'iphone17pm' :
            product.id === 12 ? 'iphone17air' :
            product.id === 13 ? 's25u' :
            product.id === 14 ? 'awatch11' : ''
          }>
            <img
              src={product.image}
              width="200"
              height="200"
              alt={product.name}
            />
            <h2>{product.name}</h2>
            <p>
              {product.description}
              <ul>
                {product.specs.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            </p>
            <button className="add-to-cart" onClick={() => handleAddToCart(product)}>
              <a href={product.infoUrl} target="_blank" rel="noopener noreferrer">
                More Info
              </a>
            </button>
          </div>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
            <p>No products found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

