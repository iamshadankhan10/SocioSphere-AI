import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Eye, EyeOff, Mail, Lock, User, Phone, AlertCircle } from 'lucide-react';
import { useAuth } from '../auth/AuthContext.jsx';

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const set = (k, v) => { setError(''); setForm(f => ({ ...f, [k]: v })); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    const err = signup(form);
    if (err) { setError(err); return; }
    navigate('/resident');
  };

  return (
    <div className="auth-page">
      <div className="auth-glow" />
      <div className="auth-card">
        <Link to="/" className="auth-logo">
          <div className="auth-logo-icon"><Building2 size={22} /></div>
          <span className="auth-logo-text">SocioSphere <span>AI</span></span>
        </Link>
        <h1 className="auth-title">Create your account</h1>
        <p className="auth-sub">Get started with SocioSphere AI — it's free.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div className="input-wrapper">
              <User size={15} className="input-icon" />
              <input className="input" type="text" required placeholder="Your full name"
                value={form.name} onChange={e => set('name', e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-wrapper">
              <Mail size={15} className="input-icon" />
              <input className="input" type="email" required placeholder="your@email.com"
                value={form.email} onChange={e => set('email', e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <div className="input-wrapper">
              <Phone size={15} className="input-icon" />
              <input className="input" type="tel" placeholder="+91 98765 43210"
                value={form.phone} onChange={e => set('phone', e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-wrapper">
              <Lock size={15} className="input-icon" />
              <input className="input" type={show ? 'text' : 'password'} required placeholder="Min 6 characters"
                value={form.password} onChange={e => set('password', e.target.value)} style={{ paddingRight: 40 }} />
              <button type="button" onClick={() => setShow(p => !p)}
                style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--fg-subtle)', cursor: 'pointer' }}>
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: 'var(--danger-light)', border: '1px solid var(--danger)', borderRadius: 'var(--radius)', fontSize: 13, color: 'var(--danger-fg)' }}>
              <AlertCircle size={15} style={{ flexShrink: 0 }} />
              {error}
            </div>
          )}

          <button type="submit" className="btn btn-primary btn-lg w-full" style={{ marginTop: 4 }}>
            Create Account
          </button>
        </form>

        <p style={{ fontSize: 12, color: 'var(--fg-subtle)', textAlign: 'center', marginTop: 12 }}>
          By signing up, you agree to our <a href="#" className="auth-link">Terms</a> and <a href="#" className="auth-link">Privacy Policy</a>.
        </p>
        <p className="auth-footer">
          Already have an account? <Link to="/login" className="auth-link">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
