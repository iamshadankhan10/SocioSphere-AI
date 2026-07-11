import { useState, useMemo } from 'react';
import { initialVisitors, generatePassCode } from '../data/visitorsData.js';
import { Plus, Search, X, UserCheck, LogOut, Eye, Trash2, Shield } from 'lucide-react';

function StatusBadge({ status }) {
  const map = { Inside: 'badge-success', 'Checked Out': 'badge-muted', 'Pre-Authorized': 'badge-info' };
  return <span className={`badge ${map[status]}`}>{status}</span>;
}
function PurposeBadge({ purpose }) {
  const map = { Guest: 'badge-primary', Delivery: 'badge-warning', Service: 'badge-info', Other: 'badge-muted' };
  return <span className={`badge ${map[purpose]}`}>{purpose}</span>;
}

function formatTime(iso) {
  if (!iso) return '—';
  try { return new Date(iso).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }); }
  catch { return iso; }
}
function formatDate(iso) {
  if (!iso) return '—';
  try { return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }); }
  catch { return iso; }
}

// ---- Pass Dialog ----
function PassDialog({ open, onClose, visitor }) {
  if (!open || !visitor) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Gate Pass</span>
          <button className="btn btn-ghost btn-icon-sm" onClick={onClose}><X size={16} /></button>
        </div>
        <div className="modal-body">
          <div className="pass-card">
            <div className="pass-label">🏢 SocioSphere AI — Entry Pass</div>
            <div className="pass-code">{visitor.passCode}</div>
            <div className="pass-label">Digital Gate Pass Code</div>
            <div className="pass-info" style={{ marginTop: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, textAlign: 'left' }}>
                <div><div style={{ fontSize: 11, opacity: 0.7 }}>Visitor</div><div style={{ fontWeight: 700 }}>{visitor.fullName}</div></div>
                <div><div style={{ fontSize: 11, opacity: 0.7 }}>Flat</div><div style={{ fontWeight: 700 }}>{visitor.flatNumber}</div></div>
                <div><div style={{ fontSize: 11, opacity: 0.7 }}>Host</div><div style={{ fontWeight: 700 }}>{visitor.hostName}</div></div>
                <div><div style={{ fontSize: 11, opacity: 0.7 }}>Purpose</div><div style={{ fontWeight: 700 }}>{visitor.purpose}</div></div>
              </div>
            </div>
          </div>
          <p style={{ fontSize: 13, color: 'var(--fg-muted)', textAlign: 'center', marginTop: 12 }}>
            Show this code to the security guard at the gate.
          </p>
        </div>
      </div>
    </div>
  );
}

// ---- Form Dialog ----
function VisitorFormDialog({ open, onClose, onSave }) {
  const empty = { fullName: '', phone: '', flatNumber: '', tower: 'A', hostName: '', purpose: 'Guest', status: 'Inside', vehicleNumber: '' };
  const [form, setForm] = useState(empty);
  if (!open) return null;
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const handleSubmit = (e) => { e.preventDefault(); onSave(form); setForm(empty); onClose(); };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-lg" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Check-In / Pre-Authorize Visitor</span>
          <button className="btn btn-ghost btn-icon-sm" onClick={onClose}><X size={16} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Visitor Name *</label>
                <input className="input" required value={form.fullName} onChange={e => set('fullName', e.target.value)} placeholder="Full name" />
              </div>
              <div className="form-group">
                <label className="form-label">Phone *</label>
                <input className="input" required value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 98765 43210" />
              </div>
              <div className="form-group">
                <label className="form-label">Flat Number *</label>
                <input className="input" required value={form.flatNumber} onChange={e => set('flatNumber', e.target.value)} placeholder="e.g. A-401" />
              </div>
              <div className="form-group">
                <label className="form-label">Tower</label>
                <select className="select" value={form.tower} onChange={e => set('tower', e.target.value)}>
                  {['A','B','C','D'].map(t => <option key={t} value={t}>Tower {t}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Host Name *</label>
                <input className="input" required value={form.hostName} onChange={e => set('hostName', e.target.value)} placeholder="Resident name" />
              </div>
              <div className="form-group">
                <label className="form-label">Purpose</label>
                <select className="select" value={form.purpose} onChange={e => set('purpose', e.target.value)}>
                  {['Guest','Delivery','Service','Other'].map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select className="select" value={form.status} onChange={e => set('status', e.target.value)}>
                  <option value="Inside">Check In Now</option>
                  <option value="Pre-Authorized">Pre-Authorize</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Vehicle Number</label>
                <input className="input" value={form.vehicleNumber} onChange={e => set('vehicleNumber', e.target.value)} placeholder="Optional" />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">{form.status === 'Inside' ? 'Check In' : 'Pre-Authorize'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ---- Delete Dialog ----
function DeleteDialog({ open, onClose, onConfirm, name }) {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 380 }} onClick={e => e.stopPropagation()}>
        <div className="modal-header"><span className="modal-title">Remove Visitor</span><button className="btn btn-ghost btn-icon-sm" onClick={onClose}><X size={16} /></button></div>
        <div className="modal-body"><p style={{ fontSize: 14, color: 'var(--fg-muted)' }}>Remove visitor record for <strong style={{ color: 'var(--fg)' }}>{name}</strong>?</p></div>
        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn btn-danger" onClick={() => { onConfirm(); onClose(); }}>Remove</button>
        </div>
      </div>
    </div>
  );
}

export default function VisitorsPage() {
  const [visitors, setVisitors] = useState(initialVisitors);
  const [search, setSearch] = useState('');
  const [purpose, setPurpose] = useState('all');
  const [status, setStatus] = useState('all');
  const [formOpen, setFormOpen] = useState(false);
  const [passOpen, setPassOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => visitors.filter(v => {
    const q = search.toLowerCase();
    const matchSearch = !q || v.fullName.toLowerCase().includes(q) || v.hostName.toLowerCase().includes(q) || v.flatNumber.toLowerCase().includes(q);
    const matchPurpose = purpose === 'all' || v.purpose === purpose;
    const matchStatus = status === 'all' || v.status === status;
    return matchSearch && matchPurpose && matchStatus;
  }), [visitors, search, purpose, status]);

  const stats = {
    total: visitors.length,
    inside: visitors.filter(v => v.status === 'Inside').length,
    preAuth: visitors.filter(v => v.status === 'Pre-Authorized').length,
    checkedOut: visitors.filter(v => v.status === 'Checked Out').length,
  };

  const handleCheckOut = (v) => setVisitors(prev => prev.map(vv => vv.id === v.id ? { ...vv, status: 'Checked Out', outTime: new Date().toISOString() } : vv));

  const handleSave = (form) => {
    const isInside = form.status === 'Inside';
    const newV = {
      id: `VIS-${String(visitors.length + 1).padStart(3, '0')}`,
      ...form, inTime: isInside ? new Date().toISOString() : '', outTime: null, passCode: generatePassCode(),
    };
    setVisitors(prev => [newV, ...prev]);
    if (form.status === 'Pre-Authorized') { setSelected(newV); setPassOpen(true); }
  };

  const statsCards = [
    { label: 'Total Visitors', value: stats.total, color: '#4f46e5', bg: '#eef2ff' },
    { label: 'Currently Inside', value: stats.inside, color: '#10b981', bg: '#d1fae5' },
    { label: 'Pre-Authorized', value: stats.preAuth, color: '#3b82f6', bg: '#dbeafe' },
    { label: 'Checked Out', value: stats.checkedOut, color: '#6b7280', bg: 'var(--bg-muted)' },
  ];

  return (
    <div className="space-y">
      <div className="page-header">
        <h1 className="page-title">Visitors Log</h1>
        <p className="page-subtitle">Monitor society check-ins, guest approvals, and generate gate pass codes.</p>
      </div>

      <div className="stats-grid">
        {statsCards.map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-icon" style={{ background: s.bg }}><UserCheck size={22} color={s.color} /></div>
            <div className="stat-info"><div className="stat-label">{s.label}</div><div className="stat-value">{s.value}</div></div>
          </div>
        ))}
      </div>

      <div className="filter-bar">
        <div className="input-wrapper" style={{ flex: 1, maxWidth: 360 }}>
          <Search size={15} className="input-icon" />
          <input className="input" placeholder="Search visitor, host, flat…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="select" style={{ width: 'auto', minWidth: 130 }} value={purpose} onChange={e => setPurpose(e.target.value)}>
          <option value="all">All Purposes</option>
          {['Guest','Delivery','Service','Other'].map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <select className="select" style={{ width: 'auto', minWidth: 130 }} value={status} onChange={e => setStatus(e.target.value)}>
          <option value="all">All Status</option>
          {['Inside','Checked Out','Pre-Authorized'].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <div className="filter-actions">
          <button className="btn btn-primary" onClick={() => setFormOpen(true)}><Plus size={16} /> Check-In Visitor</button>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr><th>Visitor</th><th>Flat / Host</th><th>Purpose</th><th>Status</th><th>In Time</th><th>Pass Code</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={7}><div className="empty-state"><UserCheck size={36} /><h3>No visitors found</h3></div></td></tr>
            ) : filtered.map(v => (
              <tr key={v.id}>
                <td>
                  <div style={{ fontWeight: 600 }}>{v.fullName}</div>
                  <div style={{ fontSize: 12, color: 'var(--fg-muted)' }}>{v.phone}</div>
                </td>
                <td>
                  <div style={{ fontWeight: 600 }}>{v.flatNumber}</div>
                  <div style={{ fontSize: 12, color: 'var(--fg-muted)' }}>{v.hostName}</div>
                </td>
                <td><PurposeBadge purpose={v.purpose} /></td>
                <td><StatusBadge status={v.status} /></td>
                <td style={{ fontSize: 13, color: 'var(--fg-muted)' }}>
                  {v.inTime ? <><div>{formatDate(v.inTime)}</div><div>{formatTime(v.inTime)}</div></> : '—'}
                </td>
                <td>
                  <span style={{ fontFamily: 'monospace', fontSize: 16, fontWeight: 800, color: 'var(--primary)', letterSpacing: 3 }}>
                    {v.passCode}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button className="btn btn-ghost btn-icon-sm" title="View Pass" onClick={() => { setSelected(v); setPassOpen(true); }}><Shield size={15} /></button>
                    {v.status === 'Inside' && (
                      <button className="btn btn-ghost btn-icon-sm" title="Check Out" style={{ color: 'var(--success)' }} onClick={() => handleCheckOut(v)}><LogOut size={15} /></button>
                    )}
                    <button className="btn btn-ghost btn-icon-sm" title="Delete" style={{ color: 'var(--danger)' }} onClick={() => { setSelected(v); setDeleteOpen(true); }}><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <VisitorFormDialog open={formOpen} onClose={() => setFormOpen(false)} onSave={handleSave} />
      <PassDialog open={passOpen} onClose={() => { setPassOpen(false); setSelected(null); }} visitor={selected} />
      <DeleteDialog open={deleteOpen} onClose={() => { setDeleteOpen(false); setSelected(null); }} onConfirm={() => setVisitors(prev => prev.filter(v => v.id !== selected?.id))} name={selected?.fullName} />
    </div>
  );
}
