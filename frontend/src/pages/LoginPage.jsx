import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../auth/AuthContext.jsx';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (k, v) => {
    setError('');
    setForm(f => ({ ...f, [k]: v }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error: loginError, role } = await login(form.email, form.password);
    if (loginError) {
      setError(loginError);
    } else {
      if (role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/resident');
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-glow" />
      <div className="auth-card">
        <Link to="/" className="auth-logo">
          <div className="auth-logo-icon"><Building2 size={22} /></div>
          <span className="auth-logo-text">SocioSphere <span>AI</span></span>
        </Link>
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-sub">Sign in to your account to continue.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-wrapper">
              <Mail size={15} className="input-icon" />
              <input className="input" type="email" required placeholder="your@email.com"
                value={form.email} onChange={e => handleChange('email', e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="form-label">Password</label>
              <Link to="/forgot-password" className="auth-link" style={{ fontSize: 13 }}>Forgot password?</Link>
            </div>
            <div className="input-wrapper">
              <Lock size={15} className="input-icon" />
              <input className="input" type={show ? 'text' : 'password'} required placeholder="Enter your password"
                value={form.password} onChange={e => handleChange('password', e.target.value)}
                style={{ paddingRight: 40 }} />
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

          <p style={{ fontSize: 12, color: 'var(--fg-subtle)', textAlign: 'center' }}>
            Admin: <strong>admin@sociosphere.ai</strong> / <strong>admin123</strong>
          </p>

          <button type="submit" className="btn btn-primary btn-lg w-full" style={{ marginTop: 4 }}>
            Sign In
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/signup" className="auth-link">Sign up free</Link>
        </p>
      </div>
    </div>
  );
}
