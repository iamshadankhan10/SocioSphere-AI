const API_BASE_URL = import.meta.env.MODE === 'production'
  ? 'https://sociosphere-ai.onrender.com/api'
  : 'http://localhost:5002/api';

const SESSION_KEY = 'sociosphere_session';

function getAuthHeader() {
  const session = JSON.parse(localStorage.getItem(SESSION_KEY));
  if (session && session.token) {
    return { Authorization: `Bearer ${session.token}` };
  }
  return {};
}

/**
 * Custom fetch wrapper that automatically injects the auth token
 * and constructs the full API URL.
 */
export async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data;
}
