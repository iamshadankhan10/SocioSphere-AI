import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, createContext, useContext } from 'react';

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
import ComingSoonPage from './pages/ComingSoonPage.jsx';

// Theme Context
export const ThemeContext = createContext(null);
export function useTheme() { return useContext(ThemeContext); }

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', next);
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="residents" element={<ResidentsPage />} />
              <Route path="residents/:id" element={<ResidentDetailPage />} />
              <Route path="visitors" element={<VisitorsPage />} />
              <Route path="complaints" element={<ComplaintsPage />} />
              <Route path="maintenance" element={<MaintenancePage />} />
              <Route path="payments" element={<ComingSoonPage title="Payments" icon="CreditCard" desc="Online payment collection and tracking is coming soon." />} />
              <Route path="notice-board" element={<ComingSoonPage title="Notice Board" icon="Megaphone" desc="Digital notice board for society announcements is coming soon." />} />
              <Route path="events" element={<ComingSoonPage title="Events" icon="CalendarDays" desc="Society events calendar and RSVP management is coming soon." />} />
              <Route path="settings" element={<ComingSoonPage title="Settings" icon="Settings" desc="Account settings and society configuration is coming soon." />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeContext.Provider>
  );
}
