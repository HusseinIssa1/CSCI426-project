import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Services from './pages/Services';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  // Get basename from homepage in package.json for GitHub Pages
  const basename = process.env.PUBLIC_URL || '';
  
  return (
    <AuthProvider>
    <CartProvider>
      <Router basename={basename}>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/services" element={<Services />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
          </Routes>
        </div>
      </Router>
    </CartProvider>
    </AuthProvider>
  );
}

export default App;

