import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { productsAPI } from '../services/api';

const Cart = () => {
  const { cart, addToCart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const total = typeof getCartTotal() === 'number' ? getCartTotal() : 0;

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'user') {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await productsAPI.getAll();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    if (!isAuthenticated || user?.role !== 'user') {
      alert('Please login to add items to cart');
      navigate('/login');
      return;
    }
    const price = typeof product.price === 'number' ? product.price : parseFloat(product.price || 0);
    addToCart({
      ...product,
      price: price
    });
    // Check if item was already in cart
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      alert(`${product.name} quantity increased to ${(existingItem.quantity || 1) + 1}!`);
    } else {
      alert(`${product.name} added to cart!`);
    }
  };

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
  };

  return (
    <div className="cart-page">
      <div className="header">
        <div className="logo">Shop</div>
        <div className="cart">
          <i className="fa-solid fa-cart-shopping"></i>
          <p id="count">{cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}</p>
        </div>
      </div>

      <div className="container">
        <div id="root" className="products-grid">
          {loading ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
              <p>Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
              <p>No products available</p>
            </div>
          ) : (
            products.map((product) => {
              let imagePath = product.image 
                ? (product.image.startsWith('http') 
                    ? product.image  // External URLs - don't modify
                    : product.image.startsWith('/') 
                      ? product.image 
                      : `/${product.image}`)
                : '/images/phone_img.jpg';
              
              // Replace spaces with %20 for proper URL encoding (only for local paths, not external URLs)
              if (!imagePath.startsWith('http')) {
                imagePath = imagePath.replace(/ /g, '%20');
              }
              const price = typeof product.price === 'number' ? product.price : parseFloat(product.price || 0);
              
              return (
            <div key={product.id} className="box">
              <div className="img-box">
                    <img 
                      className="images" 
                      src={imagePath} 
                      alt={product.name}
                      onError={(e) => {
                        e.target.src = '/images/phone_img.jpg';
                      }}
                    />
              </div>
              <div className="bottom">
                <p>{product.name}</p>
                    <h2>${price.toFixed(2)}</h2>
                    <button onClick={() => handleAddToCart({
                      ...product,
                      price: price
                    })}>Add to cart</button>
              </div>
            </div>
              );
            })
          )}
        </div>
        <div className="sidebar">
          <div className="head">Cart</div>
          <div id="cartItem">
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              cart.map((item, index) => {
                const quantity = item.quantity || 1;
                const itemPrice = typeof item.price === 'number' ? item.price : parseFloat(item.price || 0);
                const itemTotal = itemPrice * quantity;
                
                return (
                <div key={item.id || index} className="cart-item">
                  <div className="row-img">
                    <img 
                      className="rowimg" 
                      src={(() => {
                        if (!item.image) return '/images/phone_img.jpg';
                        let imgPath = item.image.startsWith('http') 
                          ? item.image 
                          : item.image.startsWith('/') 
                            ? item.image 
                            : `/${item.image}`;
                        // Only encode spaces for local paths, not external URLs
                        if (!imgPath.startsWith('http')) {
                          imgPath = imgPath.replace(/ /g, '%20');
                        }
                        return imgPath;
                      })()}
                      alt={item.name || item.title}
                      onError={(e) => {
                        e.target.src = '/images/phone_img.jpg';
                      }}
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: '12px', margin: '0 0 5px 0' }}>{item.name || item.title}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                      <button
                        onClick={() => updateQuantity(item.id, quantity - 1)}
                        style={{
                          width: '24px',
                          height: '24px',
                          border: '1px solid #ddd',
                          background: 'white',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#000',
                          fontWeight: 'bold'
                        }}
                      >
                        -
                      </button>
                      <span style={{ fontSize: '14px', fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, quantity + 1)}
                        style={{
                          width: '24px',
                          height: '24px',
                          border: '1px solid #ddd',
                          background: 'white',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#000',
                          fontWeight: 'bold'
                        }}
                      >
                        +
                      </button>
                    </div>
                    <h2 style={{ fontSize: '15px', margin: 0 }}>
                      ${itemTotal.toFixed(2)}
                      {quantity > 1 && (
                        <span style={{ fontSize: '11px', color: '#666', marginLeft: '5px' }}>
                          (${itemPrice.toFixed(2)} each)
                        </span>
                      )}
                    </h2>
                  </div>
                  <i
                    className="fa-solid fa-trash"
                    onClick={() => handleRemoveFromCart(item.id)}
                    style={{ cursor: 'pointer', color: '#f44336', marginLeft: '10px' }}
                    title="Remove from cart"
                  ></i>
                </div>
              )})
            )}
          </div>
          <div className="foot">
            <div>Total: <span id="total">${(total || 0).toFixed(2)}</span></div>
            <div>Items in cart: <span id="count">{cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}</span></div>
            <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
              {cart.length} unique {cart.length === 1 ? 'product' : 'products'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

