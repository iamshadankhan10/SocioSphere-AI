import { useState } from 'react';
import { Building2, User, Bell, Lock, Save, Check, Eye, EyeOff, Shield, Mail, Phone, MapPin, Hash } from 'lucide-react';

// ---- Simple toggle switch ----
function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      style={{
        width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
        background: checked ? 'var(--primary)' : 'var(--border-strong)',
        position: 'relative', transition: 'background 200ms ease', flexShrink: 0,
      }}
    >
      <span style={{
        position: 'absolute', top: 3, left: checked ? 23 : 3, width: 18, height: 18,
        borderRadius: '50%', background: '#fff',
        transition: 'left 200ms ease', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      }} />
    </button>
  );
}

// ---- Section card wrapper ----
function Section({ icon: Icon, title, children }) {
  return (
    <div className="card">
      <div className="card-header" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 'var(--radius)', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon size={18} />
          </div>
          <span className="card-title">{title}</span>
        </div>
      </div>
      {children}
    </div>
  );
}

// ---- Save button with success flash ----
function SaveButton({ onSave }) {
  const [saved, setSaved] = useState(false);
  const handle = () => {
    onSave?.();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  return (
    <button className={`btn ${saved ? 'btn-success' : 'btn-primary'}`} style={{ minWidth: 120 }} onClick={handle}>
      {saved ? <><Check size={15} /> Saved!</> : <><Save size={15} /> Save Changes</>}
    </button>
  );
}

export default function SettingsPage() {
  // Society profile
  const [society, setSociety] = useState({
    name: 'SocioSphere Residency',
    registrationNo: 'MH/MUM/2018/00142',
    address: 'Sector 12, Andheri West',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400053',
    email: 'office@sociosphere.ai',
    phone: '+91 98765 43210',
  });

  // Admin profile
  const [admin, setAdmin] = useState({
    name: 'Shadan Khan',
    email: 'admin@sociosphere.ai',
    phone: '+91 90000 12345',
  });

  // Change password
  const [pwd, setPwd] = useState({ current: '', newPwd: '', confirm: '' });
  const [showPwd, setShowPwd] = useState({ current: false, newPwd: false, confirm: false });
  const [pwdError, setPwdError] = useState('');

  const handlePwdSave = () => {
    if (!pwd.current) { setPwdError('Enter your current password.'); return; }
    if (pwd.newPwd.length < 6) { setPwdError('New password must be at least 6 characters.'); return; }
    if (pwd.newPwd !== pwd.confirm) { setPwdError('Passwords do not match.'); return; }
    setPwdError('');
    setPwd({ current: '', newPwd: '', confirm: '' });
  };

  // Notifications
  const [notifs, setNotifs] = useState({
    complaints: true,
    payments: true,
    visitors: false,
    maintenance: true,
    events: false,
    notices: true,
  });
  const notifItems = [
    { key: 'complaints', label: 'New Complaints', desc: 'Alert when a resident raises a complaint' },
    { key: 'payments', label: 'Payment Updates', desc: 'Alert on payment received or overdue' },
    { key: 'visitors', label: 'Visitor Check-ins', desc: 'Alert when a visitor is logged at gate' },
    { key: 'maintenance', label: 'Maintenance Tasks', desc: 'Alert on task status changes' },
    { key: 'events', label: 'Upcoming Events', desc: 'Reminder 1 day before an event' },
    { key: 'notices', label: 'New Notices', desc: 'Alert when a notice is published' },
  ];

  return (
    <div className="space-y">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Manage your society profile, account, and notification preferences.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Society Profile */}
        <Section icon={Building2} title="Society Profile">
          <div className="form-grid" style={{ marginBottom: 14 }}>
            <div className="form-group">
              <label className="form-label">Society Name</label>
              <div className="input-wrapper">
                <Building2 size={14} className="input-icon" />
                <input className="input" value={society.name} onChange={e => setSociety(s => ({ ...s, name: e.target.value }))} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Registration No.</label>
              <div className="input-wrapper">
                <Hash size={14} className="input-icon" />
                <input className="input" value={society.registrationNo} onChange={e => setSociety(s => ({ ...s, registrationNo: e.target.value }))} />
              </div>
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">Address</label>
              <div className="input-wrapper">
                <MapPin size={14} className="input-icon" />
                <input className="input" value={society.address} onChange={e => setSociety(s => ({ ...s, address: e.target.value }))} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">City</label>
              <input className="input" value={society.city} onChange={e => setSociety(s => ({ ...s, city: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">State</label>
              <input className="input" value={society.state} onChange={e => setSociety(s => ({ ...s, state: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Pincode</label>
              <input className="input" value={society.pincode} onChange={e => setSociety(s => ({ ...s, pincode: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Contact Email</label>
              <div className="input-wrapper">
                <Mail size={14} className="input-icon" />
                <input className="input" type="email" value={society.email} onChange={e => setSociety(s => ({ ...s, email: e.target.value }))} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Contact Phone</label>
              <div className="input-wrapper">
                <Phone size={14} className="input-icon" />
                <input className="input" value={society.phone} onChange={e => setSociety(s => ({ ...s, phone: e.target.value }))} />
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <SaveButton />
          </div>
        </Section>

        {/* Admin Profile */}
        <Section icon={User} title="Admin Profile">
          <div className="form-grid" style={{ marginBottom: 14 }}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="input-wrapper">
                <User size={14} className="input-icon" />
                <input className="input" value={admin.name} onChange={e => setAdmin(a => ({ ...a, name: e.target.value }))} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-wrapper">
                <Mail size={14} className="input-icon" />
                <input className="input" type="email" value={admin.email} onChange={e => setAdmin(a => ({ ...a, email: e.target.value }))} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <div className="input-wrapper">
                <Phone size={14} className="input-icon" />
                <input className="input" value={admin.phone} onChange={e => setAdmin(a => ({ ...a, phone: e.target.value }))} />
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <SaveButton />
          </div>
        </Section>

        {/* Change Password */}
        <Section icon={Lock} title="Change Password">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 440, marginBottom: 14 }}>
            {[
              { key: 'current', label: 'Current Password' },
              { key: 'newPwd', label: 'New Password' },
              { key: 'confirm', label: 'Confirm New Password' },
            ].map(({ key, label }) => (
              <div className="form-group" key={key}>
                <label className="form-label">{label}</label>
                <div className="input-wrapper">
                  <Lock size={14} className="input-icon" />
                  <input
                    className="input"
                    type={showPwd[key] ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={pwd[key]}
                    onChange={e => { setPwdError(''); setPwd(p => ({ ...p, [key]: e.target.value })); }}
                    style={{ paddingRight: 40 }}
                  />
                  <button type="button" onClick={() => setShowPwd(s => ({ ...s, [key]: !s[key] }))}
                    style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--fg-subtle)', cursor: 'pointer' }}>
                    {showPwd[key] ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
            ))}
            {pwdError && (
              <p style={{ fontSize: 13, color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Shield size={13} /> {pwdError}
              </p>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <SaveButton onSave={handlePwdSave} />
          </div>
        </Section>

        {/* Notifications */}
        <Section icon={Bell} title="Notification Preferences">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {notifItems.map((item, i) => (
              <div key={item.key} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 0',
                borderBottom: i < notifItems.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg)' }}>{item.label}</div>
                  <div style={{ fontSize: 13, color: 'var(--fg-muted)', marginTop: 2 }}>{item.desc}</div>
                </div>
                <Toggle checked={notifs[item.key]} onChange={v => setNotifs(n => ({ ...n, [item.key]: v }))} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
            <SaveButton />
          </div>
        </Section>

      </div>
    </div>
  );
}
