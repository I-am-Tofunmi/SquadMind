const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

// --- 1. TOKEN HELPERS ---
export const getToken = () => localStorage.getItem('token');
export const setToken = (token) => localStorage.setItem('token', token);
export const removeToken = () => localStorage.removeItem('token');

// --- 2. BASE FETCH HELPER ---
export const authFetch = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      removeToken();
      throw new Error('Session expired. Please login again.');
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.detail?.[0]?.msg || data.detail || 'API request failed');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// --- 3. AUTH FUNCTIONS ---
export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.detail?.[0]?.msg || data.detail || 'Login failed');
    }

    if (data.access_token) {
      setToken(data.access_token);
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const register = async (businessName, email, password) => {
  try {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        business_name: businessName, 
        email, 
        password
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.detail?.[0]?.msg || data.detail || 'Registration failed');
    }

    if (data.access_token) {
      setToken(data.access_token);
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const getMe = async () => {
  return await authFetch('/auth/me');
};

export const saveSquadCredentials = async (secretKey, publicKey) => {
  const token = getToken();
  const response = await fetch(`${API_BASE}/auth/squad-credentials`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      squad_secret_key: secretKey,
      squad_public_key: publicKey,
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || data.detail?.[0]?.msg || data.detail || 'Invalid credentials');
  }
  return data;
};

// --- 4. DASHBOARD FUNCTIONS ---
export const getDashboard = async (period = "last_30_days") => {
  return await authFetch(`/dashboard/?period=${period}`);
};

// --- 5. TRANSACTION FUNCTIONS ---
export const getTransactions = async () => {
  return await authFetch('/transactions/');
};

export const getTransactionSummary = async () => {
  return await authFetch('/transactions/summary');
};

export const syncTransactions = async () => {
  return await authFetch('/transactions/sync', { method: 'POST' });
};

// --- 6. FRAUD FUNCTIONS ---
export const getFraudAlerts = async () => {
  return await authFetch('/fraud/');
};

export const scanTransaction = async (txId) => {
  return await authFetch(`/fraud/scan/${txId}`, { method: 'POST' });
};

export const resolveFraud = async (flagId, resolution) => {
  return await authFetch(`/fraud/${flagId}/resolve`, {
    method: 'PATCH',
    body: JSON.stringify({ resolution }),
  });
};

// --- 7. FORECAST FUNCTIONS ---
export const generateForecast = async () => {
  return await authFetch('/forecasts/generate', { method: 'POST' });
};

export const getLatestForecast = async () => {
  return await authFetch('/forecasts/latest');
};

// --- 8. ALERT FUNCTIONS ---
export const getAlerts = async () => {
  return await authFetch('/alerts/');
};

export const sendTestAlert = async () => {
  return await authFetch('/alerts/test', { method: 'POST' });
};

// --- 9. TRUSTSCORE FUNCTIONS ---
export const getTrustScore = async () => {
  return await authFetch('/trust-score');
};

export const getTrustScoreReport = async () => {
  return await authFetch('/trust-score/report');
};
