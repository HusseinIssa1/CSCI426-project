import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI, userAPI } from '../services/api';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if coming from admin route
  React.useEffect(() => {
    if (location.pathname.includes('admin') || location.search.includes('admin')) {
      setIsAdmin(true);
    }
  }, [location]);

  const handleUserLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await userAPI.login(username, password);
      login(response.token, response.user, false);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleUserRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const response = await userAPI.register(username, email, password);
      setSuccess('Registration successful! Logging you in...');
      login(response.token, response.user, false);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login(username, password);
      login(response.token, { username: response.username }, true);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  if (isAdmin) {
    return (
      <div className="login-page">
        <div className="container">
          <div className="form-container login-container">
            <form id="login-form" onSubmit={handleAdminLogin}>
              <h2>Admin Login</h2>
              {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
              <label htmlFor="login-username">Username</label>
              <input
                type="text"
                id="login-username"
                name="login-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter username"
              />
              <label htmlFor="login-password">Password</label>
              <input
                type="password"
                id="login-password"
                name="login-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
              />
              <button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
              <p style={{ marginTop: '10px', textAlign: 'center' }}>
                <a href="/login" onClick={(e) => { e.preventDefault(); setIsAdmin(false); }} style={{ color: '#2196F3' }}>
                  User Login Instead
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="container">
        {isLogin ? (
          <div className="form-container login-container">
            <form id="login-form" onSubmit={handleUserLogin}>
              <h2>User Login</h2>
              {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
              {success && <div className="success-message" style={{ color: 'green', marginBottom: '10px' }}>{success}</div>}
              <label htmlFor="login-username">Username or Email</label>
              <input
                type="text"
                id="login-username"
                name="login-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter username or email"
              />
              <label htmlFor="login-password">Password</label>
              <input
                type="password"
                id="login-password"
                name="login-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
              />
              <button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
              <p style={{ marginTop: '10px', textAlign: 'center' }}>
                Don't have an account?{' '}
                <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(false); }} style={{ color: '#2196F3' }}>
                  Sign Up
                </a>
              </p>
              <p style={{ marginTop: '10px', textAlign: 'center', fontSize: '12px' }}>
                <a href="/login?admin=true" style={{ color: '#666' }}>Admin Login</a>
              </p>
            </form>
          </div>
        ) : (
          <div className="form-container signup-container">
            <form id="signup-form" onSubmit={handleUserRegister}>
              <h2>Sign Up</h2>
              {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
              {success && <div className="success-message" style={{ color: 'green', marginBottom: '10px' }}>{success}</div>}
              <label htmlFor="signup-username">Username</label>
              <input
                type="text"
                id="signup-username"
                name="signup-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter username"
              />
              <label htmlFor="signup-email">Email</label>
              <input
                type="email"
                id="signup-email"
                name="signup-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter email"
              />
              <label htmlFor="signup-password">Password</label>
              <input
                type="password"
                id="signup-password"
                name="signup-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="At least 6 characters"
                minLength="6"
              />
              <button type="submit" disabled={loading}>
                {loading ? 'Creating account...' : 'Sign Up'}
              </button>
              <p style={{ marginTop: '10px', textAlign: 'center' }}>
                Already have an account?{' '}
                <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(true); }} style={{ color: '#2196F3' }}>
                  Login
                </a>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;

