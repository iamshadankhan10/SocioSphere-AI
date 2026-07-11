import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../../App.jsx';
import { useAuth } from '../../auth/AuthContext.jsx';
import {
  LayoutDashboard, Users, UserCheck, MessageSquareWarning, Wrench,
  CreditCard, Megaphone, CalendarDays, Settings, Building2,
  Menu, X, Sun, Moon, Bell, Search, ChevronDown, LogOut, User
} from 'lucide-react';
import { sidebarNavItems } from '../../data/dummyData.js';

const iconMap = { LayoutDashboard, Users, UserCheck, MessageSquareWarning, Wrench, CreditCard, Megaphone, CalendarDays, Settings };

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const initials = user?.name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'AD';

  return (
    <div className="layout-dashboard">
      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <a href="/" className="sidebar-logo" onClick={e => { e.preventDefault(); navigate('/'); setSidebarOpen(false); }}>
          <div className="sidebar-logo-icon">
            <Building2 size={20} />
          </div>
          <span className="sidebar-logo-text">SocioSphere <span>AI</span></span>
        </a>

        <nav className="sidebar-nav">
          {sidebarNavItems.map(item => {
            const Icon = iconMap[item.icon];
            return (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === '/dashboard'}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                {Icon && <Icon size={18} />}
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <span className="sidebar-version">SocioSphere AI v1.0</span>
        </div>
      </aside>

      {/* Main Content */}
      <div className="layout-main">
        {/* Top Navbar */}
        <header className="top-navbar">
          <button className="btn btn-ghost btn-icon" onClick={() => setSidebarOpen(true)} style={{ display: 'flex' }}>
            <Menu size={20} />
          </button>

          <div className="navbar-search">
            <Search size={15} className="search-icon" />
            <input type="text" placeholder="Search..." className="input" />
          </div>

          <div className="navbar-actions">
            {/* Theme Toggle */}
            <button className="btn btn-ghost btn-icon" onClick={toggleTheme} title="Toggle theme">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Notifications */}
            <div className="navbar-notification-btn">
              <button className="btn btn-ghost btn-icon">
                <Bell size={18} />
                <span className="notification-dot">3</span>
              </button>
            </div>

            {/* User Dropdown */}
            <div className="dropdown">
              <button className="navbar-user" onClick={() => setDropdownOpen(p => !p)}>
                <div className="avatar avatar-sm">{initials}</div>
                <span className="navbar-user-name">{user?.name || 'Admin'}</span>
                <ChevronDown size={14} />
              </button>
              {dropdownOpen && (
                <div className="dropdown-menu" style={{ minWidth: 200 }}>
                  <div className="dropdown-label">
                    <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--fg)' }}>{user?.name || 'Admin'}</div>
                    <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginTop: 2 }}>{user?.email || ''}</div>
                  </div>
                  <div className="dropdown-separator" />
                  <button className="dropdown-item" onClick={() => { setDropdownOpen(false); navigate('/dashboard/settings'); }}>
                    <User size={15} /> Profile
                  </button>
                  <button className="dropdown-item" onClick={() => { setDropdownOpen(false); navigate('/dashboard/settings'); }}>
                    <Settings size={15} /> Settings
                  </button>
                  <div className="dropdown-separator" />
                  <button className="dropdown-item danger" onClick={() => { setDropdownOpen(false); handleLogout(); }}>
                    <LogOut size={15} /> Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="page-content" onClick={() => setDropdownOpen(false)}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
