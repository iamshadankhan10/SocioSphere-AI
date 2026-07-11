import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect, createContext, useContext } from 'react';

// Auth
import { AuthProvider, useAuth } from './auth/AuthContext.jsx';

// Pages
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import DashboardLayout from './components/dashboard/DashboardLayout.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ResidentsPage from './pages/ResidentsPage.jsx';
import ResidentDetailPage from './pages/ResidentDetailPage.jsx';
import VisitorsPage from './pages/VisitorsPage.jsx';
import ComplaintsPage from './pages/ComplaintsPage.jsx';
import MaintenancePage from './pages/MaintenancePage.jsx';
import PaymentsPage from './pages/PaymentsPage.jsx';
import NoticeBoardPage from './pages/NoticeBoardPage.jsx';
import EventsPage from './pages/EventsPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import ResidentPortal from './pages/ResidentPortal.jsx';

// Theme Context
export const ThemeContext = createContext(null);
export function useTheme() { return useContext(ThemeContext); }

// ---- Route guards ----
function RequireAuth({ children, role }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (role === 'admin' && user.role !== 'admin') return <Navigate to="/resident" replace />;
  if (role === 'resident' && user.role !== 'resident') return <Navigate to="/dashboard" replace />;
  return children;
}

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', next);
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* Resident portal — requires resident login */}
            <Route path="/resident" element={
              <RequireAuth role="resident"><ResidentPortal /></RequireAuth>
            } />

            {/* Admin dashboard — requires admin login */}
            <Route path="/dashboard" element={
              <RequireAuth role="admin"><DashboardLayout /></RequireAuth>
            }>
              <Route index element={<DashboardPage />} />
              <Route path="residents" element={<ResidentsPage />} />
              <Route path="residents/:id" element={<ResidentDetailPage />} />
              <Route path="visitors" element={<VisitorsPage />} />
              <Route path="complaints" element={<ComplaintsPage />} />
              <Route path="maintenance" element={<MaintenancePage />} />
              <Route path="payments" element={<PaymentsPage />} />
              <Route path="notice-board" element={<NoticeBoardPage />} />
              <Route path="events" element={<EventsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeContext.Provider>
  );
}
