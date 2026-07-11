import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';
import { useTheme } from '../App.jsx';
import {
  Building2, Bell, LogOut, Sun, Moon, ChevronDown,
  Home, IndianRupee, Megaphone, MessageSquareWarning,
  CalendarDays, X, Send, User
} from 'lucide-react';
import { initialNotices } from '../data/noticeBoardData.js';
import { initialPayments } from '../data/paymentsData.js';

// ---- Status badge ----
function PayBadge({ s }) {
  const map = { Paid: 'badge-success', Pending: 'badge-warning', Overdue: 'badge-danger' };
  return <span className={`badge ${map[s]}`}>{s}</span>;
}

// ---- Complaint form ----
function ComplaintForm() {
  const empty = { title: '', category: 'Plumbing', description: '' };
  const [form, setForm] = useState(empty);
  const [submitted, setSubmitted] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  if (submitted) return (
    <div style={{ textAlign: 'center', padding: '24px 0' }}>
      <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--success-light)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
        <Send size={22} />
      </div>
      <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>Complaint Submitted!</h3>
      <p style={{ fontSize: 13, color: 'var(--fg-muted)', marginBottom: 16 }}>Your complaint has been registered. Our team will look into it.</p>
      <button className="btn btn-outline btn-sm" onClick={() => setSubmitted(false)}>Raise Another</button>
    </div>
  );

  return (
    <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div className="form-group">
        <label className="form-label">Title</label>
        <input className="input" required placeholder="Brief description of issue" value={form.title} onChange={e => set('title', e.target.value)} />
      </div>
      <div className="form-group">
        <label className="form-label">Category</label>
        <select className="select" value={form.category} onChange={e => set('category', e.target.value)}>
          {['Plumbing', 'Electrical', 'Cleanliness', 'Parking', 'Security', 'Other'].map(c => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea className="textarea" required placeholder="Describe the issue in detail…" value={form.description} onChange={e => set('description', e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-end' }}>
        <Send size={15} /> Submit Complaint
      </button>
    </form>
  );
}

// ---- Main portal ----
export default function ResidentPortal() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Show last 3 notices (pinned first)
  const notices = [...initialNotices]
    .sort((a, b) => b.pinned - a.pinned)
    .slice(0, 3);

  // Show payments for this user's flat — fallback to first 3 for demo
  const payments = initialPayments.slice(0, 4);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>

      {/* Top Navbar */}
      <header style={{
        height: 60, display: 'flex', alignItems: 'center', gap: 12, padding: '0 24px',
        borderBottom: '1px solid var(--border)', background: 'var(--bg-card)',
        position: 'sticky', top: 0, zIndex: 50, flexShrink: 0,
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginRight: 'auto' }}>
          <div style={{ width: 32, height: 32, borderRadius: 'var(--radius)', background: 'linear-gradient(135deg, var(--primary), #818cf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <Building2 size={16} />
          </div>
          <span style={{ fontWeight: 800, fontSize: 16, color: 'var(--fg)' }}>SocioSphere <span style={{ color: 'var(--primary)' }}>AI</span></span>
        </Link>

        <button className="btn btn-ghost btn-icon" onClick={toggleTheme} title="Toggle theme">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* User dropdown */}
        <div className="dropdown">
          <button className="navbar-user" onClick={() => setDropdownOpen(p => !p)}>
            <div className="avatar avatar-sm">{user?.name?.[0] || 'U'}</div>
            <span className="navbar-user-name">{user?.name || 'Resident'}</span>
            <ChevronDown size={14} />
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu" style={{ minWidth: 200 }} onClick={() => setDropdownOpen(false)}>
              <div className="dropdown-label">
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--fg)' }}>{user?.name}</div>
                <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginTop: 2 }}>{user?.email}</div>
              </div>
              <div className="dropdown-separator" />
              <button className="dropdown-item danger" onClick={handleLogout}>
                <LogOut size={15} /> Log out
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <main style={{ flex: 1, padding: '28px', maxWidth: 900, margin: '0 auto', width: '100%' }} onClick={() => setDropdownOpen(false)}>

        {/* Welcome */}
        <div className="page-header">
          <h1 className="page-title">Welcome, {user?.name?.split(' ')[0]}! 👋</h1>
          <p className="page-subtitle">Here's a summary of your society updates.</p>
        </div>

        {/* Quick Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 28 }}>
          {[
            { label: 'Flat', value: user?.flatNumber || 'Not assigned', icon: Home, color: 'var(--primary)', bg: 'var(--primary-light)' },
            { label: 'Tower', value: user?.tower ? `Tower ${user.tower}` : '—', icon: Building2, color: 'var(--info)', bg: 'var(--info-light)' },
            { label: 'Active Notices', value: notices.length, icon: Megaphone, color: 'var(--warning)', bg: 'var(--warning-light)' },
            { label: 'Pending Dues', value: payments.filter(p => p.status !== 'Paid').length, icon: IndianRupee, color: 'var(--danger)', bg: 'var(--danger-light)' },
          ].map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="stat-card">
                <div className="stat-icon" style={{ background: s.bg }}><Icon size={20} color={s.color} /></div>
                <div className="stat-info">
                  <div className="stat-label">{s.label}</div>
                  <div className="stat-value" style={{ fontSize: 20 }}>{s.value}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Two-column layout */}
        <div className="resident-grid" style={{ marginBottom: 24 }}>

          {/* Recent Notices */}
          <div className="card">
            <div className="card-header">
              <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Megaphone size={16} color="var(--primary)" /> Recent Notices
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {notices.map(n => (
                <div key={n.id} style={{ paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg)' }}>{n.title}</span>
                    {n.pinned && <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--primary)', background: 'var(--primary-light)', padding: '2px 6px', borderRadius: 99, flexShrink: 0 }}>Pinned</span>}
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--fg-muted)', marginTop: 4, lineHeight: 1.5 }}>
                    {n.body.length > 100 ? n.body.slice(0, 100) + '…' : n.body}
                  </p>
                  <span style={{ fontSize: 11, color: 'var(--fg-subtle)', marginTop: 4, display: 'block' }}>{n.createdAt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* My Payments */}
          <div className="card">
            <div className="card-header">
              <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <IndianRupee size={16} color="var(--primary)" /> My Payments
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {payments.map(p => (
                <div key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg)' }}>{p.type}</div>
                    <div style={{ fontSize: 12, color: 'var(--fg-muted)' }}>{p.month} · Due {p.dueDate}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary)' }}>₹{p.amount.toLocaleString()}</span>
                    <PayBadge s={p.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Raise a Complaint */}
        <div className="card">
          <div className="card-header">
            <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <MessageSquareWarning size={16} color="var(--primary)" /> Raise a Complaint
            </div>
          </div>
          <ComplaintForm />
        </div>

      </main>
    </div>
  );
}
