import React, { useState } from 'react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login - in a real app, this would connect to a backend
    alert('Login functionality - This is a frontend-only demo');
    console.log('Login:', { email: loginEmail, password: loginPassword });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // Mock signup - in a real app, this would connect to a backend
    alert('Signup functionality - This is a frontend-only demo');
    console.log('Signup:', { email: signupEmail, password: signupPassword });
  };

  return (
    <div className="login-page">
      <div className="container">
        {isLogin ? (
          <div className="form-container login-container">
            <form id="login-form" onSubmit={handleLogin}>
              <h2>Login</h2>
              <label htmlFor="login-email">Email</label>
              <input
                type="email"
                id="login-email"
                name="login-email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
              <label htmlFor="login-password">Password</label>
              <input
                type="password"
                id="login-password"
                name="login-password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
              <button type="submit">Login</button>
              <p>
                Don't have an account?{' '}
                <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(false); }}>
                  Sign Up
                </a>
              </p>
            </form>
          </div>
        ) : (
          <div className="form-container signup-container">
            <form id="signup-form" onSubmit={handleSignup}>
              <h2>Sign Up</h2>
              <label htmlFor="signup-email">Email</label>
              <input
                type="email"
                id="signup-email"
                name="signup-email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
              />
              <label htmlFor="signup-password">Password</label>
              <input
                type="password"
                id="signup-password"
                name="signup-password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
              />
              <button type="submit">Sign Up</button>
              <p>
                Already have an account?{' '}
                <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(true); }}>
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

