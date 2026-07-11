import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { initialResidents, towerOptions, getInitials } from '../data/residentsData.js';
import { Plus, Search, Eye, Edit, Trash2, Users, Home, UserCheck, TrendingUp, X, ChevronDown } from 'lucide-react';
import ConfirmModal from '../components/shared/ConfirmModal.jsx';

// ---- Stats ----
function ResidentStats({ residents }) {
  const total = residents.length;
  const owners = residents.filter(r => r.residentType === 'Owner').length;
  const tenants = residents.filter(r => r.residentType === 'Tenant').length;
  const active = residents.filter(r => r.status === 'Active').length;
  const stats = [
    { label: 'Total Residents', value: total, icon: Users, color: '#4f46e5', bg: '#eef2ff' },
    { label: 'Owners', value: owners, icon: Home, color: '#10b981', bg: '#d1fae5' },
    { label: 'Tenants', value: tenants, icon: UserCheck, color: '#f59e0b', bg: '#fef3c7' },
    { label: 'Active', value: active, icon: TrendingUp, color: '#06b6d4', bg: '#cffafe' },
  ];
  return (
    <div className="stats-grid">
      {stats.map(s => {
        const Icon = s.icon;
        return (
          <div key={s.label} className="stat-card">
            <div className="stat-icon" style={{ background: s.bg }}><Icon size={22} color={s.color} /></div>
            <div className="stat-info">
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.value}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ---- Form Dialog ----
function ResidentFormDialog({ open, onClose, onSave, resident }) {
  const isEdit = !!resident;
  const empty = { fullName: '', email: '', phone: '', flatNumber: '', tower: 'A', dateOfBirth: '', residentType: 'Owner', status: 'Active', familyMembersCount: 1, vehicleNumber: '', emergencyContact: '' };
  const [form, setForm] = useState(isEdit ? { ...resident } : empty);

  if (!open) return null;

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-lg" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">{isEdit ? 'Edit Resident' : 'Add New Resident'}</span>
          <button className="btn btn-ghost btn-icon-sm" onClick={onClose}><X size={16} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input className="input" required value={form.fullName} onChange={e => set('fullName', e.target.value)} placeholder="e.g. Rahul Sharma" />
              </div>
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input className="input" type="email" required value={form.email} onChange={e => set('email', e.target.value)} placeholder="email@example.com" />
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
                  {towerOptions.map(t => <option key={t} value={t}>Tower {t}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Date of Birth</label>
                <input className="input" type="date" value={form.dateOfBirth} onChange={e => set('dateOfBirth', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Resident Type</label>
                <select className="select" value={form.residentType} onChange={e => set('residentType', e.target.value)}>
                  <option value="Owner">Owner</option>
                  <option value="Tenant">Tenant</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select className="select" value={form.status} onChange={e => set('status', e.target.value)}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Family Members</label>
                <input className="input" type="number" min="1" value={form.familyMembersCount} onChange={e => set('familyMembersCount', +e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Vehicle Number</label>
                <input className="input" value={form.vehicleNumber} onChange={e => set('vehicleNumber', e.target.value)} placeholder="MH 01 AB 1234" />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Emergency Contact</label>
                <input className="input" value={form.emergencyContact} onChange={e => set('emergencyContact', e.target.value)} placeholder="+91 98765 43211" />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">{isEdit ? 'Save Changes' : 'Add Resident'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ---- Delete Dialog ----


// ---- Badge helpers ----
function TypeBadge({ type }) {
  return <span className={`badge ${type === 'Owner' ? 'badge-primary' : 'badge-warning'}`}>{type}</span>;
}
function StatusBadge({ status }) {
  return <span className={`badge ${status === 'Active' ? 'badge-success' : 'badge-muted'}`}>{status}</span>;
}

// ---- Main Page ----
export default function ResidentsPage() {
  const navigate = useNavigate();
  const [residents, setResidents] = useState(initialResidents);
  const [search, setSearch] = useState('');
  const [tower, setTower] = useState('all');
  const [type, setType] = useState('all');
  const [status, setStatus] = useState('all');
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    return residents.filter(r => {
      const q = search.toLowerCase();
      const matchSearch = !q || r.fullName.toLowerCase().includes(q) || r.flatNumber.toLowerCase().includes(q);
      const matchTower = tower === 'all' || r.tower === tower;
      const matchType = type === 'all' || r.residentType === type;
      const matchStatus = status === 'all' || r.status === status;
      return matchSearch && matchTower && matchType && matchStatus;
    });
  }, [residents, search, tower, type, status]);

  const handleSave = (form) => {
    if (selected) {
      setResidents(prev => prev.map(r => r.id === selected.id ? { ...r, ...form } : r));
    } else {
      const newR = {
        ...form,
        id: `RES-${String(residents.length + 1).padStart(3, '0')}`,
        moveInDate: new Date().toISOString().split('T')[0],
        profilePhoto: '',
        familyMembers: [], vehicles: [], payments: [], complaints: [], visitors: [],
      };
      setResidents(prev => [newR, ...prev]);
    }
    setSelected(null);
  };

  return (
    <div className="space-y">
      <div className="page-header">
        <h1 className="page-title">Residents</h1>
        <p className="page-subtitle">Manage all residents, their details, and occupancy information.</p>
      </div>

      <ResidentStats residents={residents} />

      {/* Filters */}
      <div className="filter-bar">
        <div className="input-wrapper" style={{ flex: 1, maxWidth: 360 }}>
          <Search size={15} className="input-icon" />
          <input className="input" placeholder="Search by name or flat…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="select" style={{ width: 'auto', minWidth: 130 }} value={tower} onChange={e => setTower(e.target.value)}>
          <option value="all">All Towers</option>
          {towerOptions.map(t => <option key={t} value={t}>Tower {t}</option>)}
        </select>
        <select className="select" style={{ width: 'auto', minWidth: 120 }} value={type} onChange={e => setType(e.target.value)}>
          <option value="all">All Types</option>
          <option value="Owner">Owner</option>
          <option value="Tenant">Tenant</option>
        </select>
        <select className="select" style={{ width: 'auto', minWidth: 120 }} value={status} onChange={e => setStatus(e.target.value)}>
          <option value="all">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <div className="filter-actions">
          <button className="btn btn-primary" onClick={() => { setSelected(null); setFormOpen(true); }}>
            <Plus size={16} /> Add Resident
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Resident</th>
              <th>Flat</th>
              <th>Type</th>
              <th>Status</th>
              <th>Phone</th>
              <th>Move-in</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={7}>
                <div className="empty-state">
                  <Users size={36} />
                  <h3>No residents found</h3>
                  <p>Try adjusting your filters or add a new resident.</p>
                </div>
              </td></tr>
            ) : filtered.map(r => (
              <tr key={r.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div className="avatar">{getInitials(r.fullName)}</div>
                    <div>
                      <div style={{ fontWeight: 600 }}>{r.fullName}</div>
                      <div style={{ fontSize: 12, color: 'var(--fg-muted)' }}>{r.email}</div>
                    </div>
                  </div>
                </td>
                <td><span style={{ fontWeight: 600 }}>{r.flatNumber}</span></td>
                <td><TypeBadge type={r.residentType} /></td>
                <td><StatusBadge status={r.status} /></td>
                <td style={{ color: 'var(--fg-muted)', fontSize: 13 }}>{r.phone}</td>
                <td style={{ color: 'var(--fg-muted)', fontSize: 13 }}>{r.moveInDate}</td>
                <td>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button className="btn btn-ghost btn-icon-sm" title="View" onClick={() => navigate(`/dashboard/residents/${r.id}`)}><Eye size={15} /></button>
                    <button className="btn btn-ghost btn-icon-sm" title="Edit" onClick={() => { setSelected(r); setFormOpen(true); }}><Edit size={15} /></button>
                    <button className="btn btn-ghost btn-icon-sm" title="Delete" style={{ color: 'var(--danger)' }} onClick={() => { setSelected(r); setDeleteOpen(true); }}><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ResidentFormDialog open={formOpen} onClose={() => { setFormOpen(false); setSelected(null); }} onSave={handleSave} resident={selected} />
      <ConfirmModal
        open={deleteOpen}
        onClose={() => { setDeleteOpen(false); setSelected(null); }}
        onConfirm={() => setResidents(prev => prev.filter(r => r.id !== selected?.id))}
        title="Delete Resident"
        description={selected?.fullName ? `Are you sure you want to remove ${selected.fullName}? This action cannot be undone.` : undefined}
      />
    </div>
  );
}
