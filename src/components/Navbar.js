import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { getCartCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const cartCount = getCartCount();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    window.location.href = '/';
  };

  return (
    <header className="header">
      <nav className="navbar">
        <ul>
          <li>
            <a href="https://wa.me/96181791202" target="_blank" rel="noopener noreferrer">
              <i className="fa fa-compress" aria-hidden="true"></i> Contact
            </a>
          </li>
          <li>
            <Link to="/">
              <i className="fa fa-home" aria-hidden="true"></i> Home
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <i className="fa fa-compress" aria-hidden="true"></i> More Items
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </li>
          <li>
            <Link to="/about">
              <i className="fa-solid fa-circle-info"></i> About
            </Link>
          </li>
          <li>
            <Link to="/services">
              <i className="fa fa-cogs" aria-hidden="true"></i> Services
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              {user?.role === 'admin' && (
                <li>
                  <Link to="/admin">
                    <i className="fa fa-shield" aria-hidden="true"></i> Admin
                  </Link>
                </li>
              )}
              <li>
                <span style={{ color: '#4CAF50' }}>
                  <i className="fa fa-user" aria-hidden="true"></i> {user?.username}
                </span>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={handleLogout}
                  style={{ cursor: 'pointer' }}
                >
                  <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
                </a>
              </li>
            </>
          ) : (
          <li>
            <Link to="/login">
              <i className="fa fa-user" aria-hidden="true"></i> Login
            </Link>
          </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;

