// Use environment variable for API URL, fallback to localhost for development
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Get token from localStorage (admin or user)
const getToken = () => {
  return localStorage.getItem('adminToken') || localStorage.getItem('userToken');
};

// API request helper
const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      throw new Error(`Server returned non-JSON response. Make sure backend is running on port 5000. Response: ${text.substring(0, 100)}`);
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }

    return data;
  } catch (error) {
    if (error.message.includes('fetch')) {
      throw new Error('Cannot connect to backend server. Make sure it is running on http://localhost:5000');
    }
    throw error;
  }
};

// Auth API (Admin)
export const authAPI = {
  login: async (username, password) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  },
};

// User API
export const userAPI = {
  register: async (username, email, password) => {
    return apiRequest('/users/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });
  },
  login: async (username, password) => {
    return apiRequest('/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  },
};

// Products API
export const productsAPI = {
  getAll: async () => {
    return apiRequest('/products');
  },

  getById: async (id) => {
    return apiRequest(`/products/${id}`);
  },

  create: async (product, imageFile) => {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('infoUrl', product.infoUrl || '');
    
    if (imageFile) {
      formData.append('image', imageFile);
    } else if (product.image) {
      formData.append('image', product.image);
    }

    const token = getToken();
    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers,
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }
    return data;
  },

  update: async (id, product, imageFile) => {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('infoUrl', product.infoUrl || '');
    
    if (imageFile) {
      formData.append('image', imageFile);
    } else if (product.image) {
      formData.append('image', product.image);
    }

    const token = getToken();
    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers,
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }
    return data;
  },

  delete: async (id) => {
    return apiRequest(`/products/${id}`, {
      method: 'DELETE',
    });
  },
};

