import { createContext, useContext, useState } from 'react';

// Hardcoded admin account
const ADMIN = {
  id: 'admin',
  name: 'Shadan Khan',
  email: 'admin@sociosphere.ai',
  password: 'admin123',
  role: 'admin',
};

// --- helpers ---
const STORAGE_KEY = 'sociosphere_users';
const SESSION_KEY = 'sociosphere_session';
const API_URL = import.meta.env.MODE === 'production'
  ? 'https://sociosphere-ai.onrender.com/api/auth'
  : 'http://localhost:5002/api/auth';

function getSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY)) || null; }
  catch { return null; }
}
function saveSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return user;
}
function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

// --- context ---
export const AuthContext = createContext(null);
export function useAuth() { return useContext(AuthContext); }

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getSession());

  // Returns { error, role }
  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      
      if (!res.ok) {
        return { error: data.message || 'Invalid email or password.', role: null };
      }
      
      const session = saveSession(data);
      setUser(session);
      return { error: null, role: data.role, user: session };
    } catch (error) {
      return { error: 'Server error. Please try again later.', role: null, user: null };
    }
  };

  // Returns { error }
  const signup = async ({ name, email, phone, password }) => {
    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password })
      });
      const data = await res.json();
      
      if (!res.ok) {
        return { error: data.message || 'Signup failed.' };
      }
      
      const session = saveSession(data);
      setUser(session);
      return { error: null };
    } catch (error) {
      return { error: 'Server error. Please try again later.' };
    }
  };

  const logout = () => {
    clearSession();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}
