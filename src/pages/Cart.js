import React from 'react';
import { useCart } from '../context/CartContext';
import { catalogProducts } from '../data/products';

const Cart = () => {
  const { cart, addToCart, removeFromCart, getCartTotal } = useCart();
  const total = getCartTotal();

  const handleAddToCart = (product) => {
    addToCart(product);
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
          <p id="count">{cart.length}</p>
        </div>
      </div>

      <div className="container">
        <div id="root" className="products-grid">
          {catalogProducts.map((product) => (
            <div key={product.id} className="box">
              <div className="img-box">
                <img className="images" src={product.image} alt={product.name} />
              </div>
              <div className="bottom">
                <p>{product.name}</p>
                <h2>${product.price}.00</h2>
                <button onClick={() => handleAddToCart(product)}>Add to cart</button>
              </div>
            </div>
          ))}
        </div>
        <div className="sidebar">
          <div className="head">Cart</div>
          <div id="cartItem">
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              cart.map((item, index) => (
                <div key={item.id || index} className="cart-item">
                  <div className="row-img">
                    <img className="rowimg" src={item.image} alt={item.name || item.title} />
                  </div>
                  <p style={{ fontSize: '12px' }}>{item.name || item.title}</p>
                  <h2 style={{ fontSize: '15px' }}>${item.price || 0}.00</h2>
                  <i
                    className="fa-solid fa-trash"
                    onClick={() => handleRemoveFromCart(item.id)}
                    style={{ cursor: 'pointer' }}
                  ></i>
                </div>
              ))
            )}
          </div>
          <div className="foot">
            <div>Total: <span id="total">${total.toFixed(2)}</span></div>
            <div>Items in cart: <span id="count">{cart.length}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

