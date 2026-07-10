import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Mail, ArrowLeft, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="auth-page">
      <div className="auth-glow" />
      <div className="auth-card">
        <Link to="/" className="auth-logo">
          <div className="auth-logo-icon"><Building2 size={22} /></div>
          <span className="auth-logo-text">SocioSphere <span>AI</span></span>
        </Link>

        {!sent ? (
          <>
            <h1 className="auth-title">Reset your password</h1>
            <p className="auth-sub">Enter your email and we'll send you a reset link.</p>
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="input-wrapper">
                  <Mail size={15} className="input-icon" />
                  <input className="input" type="email" required placeholder="admin@sociosphere.ai"
                    value={email} onChange={e => setEmail(e.target.value)} />
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-lg w-full">Send Reset Link</button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <CheckCircle size={52} style={{ color: 'var(--success)', margin: '0 auto 16px' }} />
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Check your email</h2>
            <p style={{ color: 'var(--fg-muted)', fontSize: 14, lineHeight: 1.6 }}>
              We sent a password reset link to <strong style={{ color: 'var(--fg)' }}>{email}</strong>.
              Check your inbox.
            </p>
          </div>
        )}

        <p className="auth-footer" style={{ marginTop: 20 }}>
          <Link to="/login" className="auth-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <ArrowLeft size={14} /> Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}
