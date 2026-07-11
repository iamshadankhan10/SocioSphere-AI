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

function getStoredUsers() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}
function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}
function getSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY)) || null; }
  catch { return null; }
}
function saveSession(user) {
  // Don't store password in session
  const { password: _, ...safe } = user;
  localStorage.setItem(SESSION_KEY, JSON.stringify(safe));
  return safe;
}
function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

// --- context ---
export const AuthContext = createContext(null);
export function useAuth() { return useContext(AuthContext); }

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getSession());

  // Returns null on success, error string on failure
  const login = (email, password) => {
    // Check admin
    if (email === ADMIN.email && password === ADMIN.password) {
      const session = saveSession(ADMIN);
      setUser(session);
      return null;
    }
    // Check resident accounts in localStorage
    const users = getStoredUsers();
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      const session = saveSession(found);
      setUser(session);
      return null;
    }
    return 'Invalid email or password. Please try again.';
  };

  // Returns null on success, error string on failure
  const signup = ({ name, email, phone, password }) => {
    const users = getStoredUsers();
    if (email === ADMIN.email || users.find(u => u.email === email)) {
      return 'An account with this email already exists.';
    }
    const newUser = {
      id: `user_${Date.now()}`,
      name,
      email,
      phone,
      password,
      role: 'resident',
      flatNumber: '',
      tower: '',
    };
    saveUsers([...users, newUser]);
    const session = saveSession(newUser);
    setUser(session);
    return null;
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
