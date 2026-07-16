import { useState, useMemo, useEffect } from 'react';
import { staffOptions, categoryOptions } from '../data/complaintsData.js';
import { apiFetch } from '../utils/api.js';
import toast from 'react-hot-toast';
import { Plus, Search, X, MessageSquareWarning, Eye, Trash2 } from 'lucide-react';
import ConfirmModal from '../components/shared/ConfirmModal.jsx';

function PriorityBadge({ p }) {
  const map = { High: 'badge-danger', Medium: 'badge-warning', Low: 'badge-success' };
  return <span className={`badge ${map[p]}`}>{p}</span>;
}
function StatusBadge({ s }) {
  const map = { Open: 'badge-danger', 'In Progress': 'badge-warning', Resolved: 'badge-success' };
  return <span className={`badge ${map[s]}`}>{s}</span>;
}
function CategoryBadge({ c }) {
  const map = { Plumbing: 'badge-info', Electrical: 'badge-warning', Cleanliness: 'badge-success', Parking: 'badge-muted', Security: 'badge-primary', Other: 'badge-muted' };
  return <span className={`badge ${map[c] || 'badge-muted'}`}>{c}</span>;
}

// ---- Details Sheet ----
function DetailsSheet({ open, onClose, complaint, onStatusChange, onAssignChange }) {
  if (!open || !complaint) return null;
  return (
    <>
      <div className="sheet-overlay" onClick={onClose} />
      <div className="sheet">
        <div className="sheet-header">
          <span className="sheet-title">{complaint._id.substring(0,8)}</span>
          <button className="btn btn-ghost btn-icon-sm" onClick={onClose}><X size={16} /></button>
        </div>
        <div className="sheet-body">
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>{complaint.title}</h3>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 6 }}>
            <StatusBadge s={complaint.status} />
            <PriorityBadge p={complaint.priority} />
            <CategoryBadge c={complaint.category} />
          </div>

          <div className="detail-divider" />

          <div className="detail-section">
            <div><div className="detail-label">Description</div><div className="detail-value" style={{ lineHeight: 1.6 }}>{complaint.description}</div></div>
            <div className="grid-2">
              <div><div className="detail-label">Resident</div><div className="detail-value">{complaint.residentName}</div></div>
              <div><div className="detail-label">Flat</div><div className="detail-value">{complaint.flatNumber} · Tower {complaint.tower}</div></div>
              <div><div className="detail-label">Created</div><div className="detail-value">{new Date(complaint.createdAt).toLocaleDateString()}</div></div>
              <div><div className="detail-label">Resolved</div><div className="detail-value">{complaint.resolvedDate ? new Date(complaint.resolvedDate).toLocaleDateString() : '—'}</div></div>
            </div>
          </div>

          <div className="detail-divider" />

          <div className="form-group">
            <label className="form-label">Update Status</label>
            <select className="select" value={complaint.status} onChange={e => onStatusChange(complaint._id, e.target.value)}>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Assign Staff</label>
            <select className="select" value={complaint.assignedTo || 'Unassigned'} onChange={e => onAssignChange(complaint._id, e.target.value)}>
              {staffOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {complaint.assignedTo && (
            <div style={{ padding: '12px 14px', background: 'var(--primary-light)', borderRadius: 'var(--radius)', fontSize: 14 }}>
              <span style={{ fontWeight: 600, color: 'var(--primary)' }}>Assigned to:</span>{' '}
              <span>{complaint.assignedTo}</span>
            </div>
          )}
        </div>
        <div className="sheet-footer">
          <button className="btn btn-outline w-full" onClick={onClose}>Close</button>
        </div>
      </div>
    </>
  );
}

// ---- Raise Complaint Dialog ----
function ComplaintFormDialog({ open, onClose, onSave }) {
  const empty = { title: '', description: '', category: 'Plumbing', priority: 'Medium', flatNumber: '', tower: 'A', residentName: '' };
  const [form, setForm] = useState(empty);
  if (!open) return null;
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const handleSubmit = (e) => { e.preventDefault(); onSave(form); setForm(empty); onClose(); };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-lg" onClick={e => e.stopPropagation()}>
        <div className="modal-header"><span className="modal-title">Raise Complaint</span><button className="btn btn-ghost btn-icon-sm" onClick={onClose}><X size={16} /></button></div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Title *</label>
              <input className="input" required value={form.title} onChange={e => set('title', e.target.value)} placeholder="Brief summary of the issue" />
            </div>
            <div className="form-group">
              <label className="form-label">Description *</label>
              <textarea className="textarea" required value={form.description} onChange={e => set('description', e.target.value)} placeholder="Detailed description…" rows={3} />
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="select" value={form.category} onChange={e => set('category', e.target.value)}>
                  {categoryOptions.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Priority</label>
                <select className="select" value={form.priority} onChange={e => set('priority', e.target.value)}>
                  {['Low','Medium','High'].map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Resident Name *</label>
                <input className="input" required value={form.residentName} onChange={e => set('residentName', e.target.value)} />
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
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Raise Complaint</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ---- Delete Dialog ----


export default function ComplaintsPage() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [priority, setPriority] = useState('all');
  const [status, setStatus] = useState('all');
  const [formOpen, setFormOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => complaints.filter(c => {
    const q = search.toLowerCase();
    const matchSearch = !q || c.id.toLowerCase().includes(q) || c.title.toLowerCase().includes(q) || c.residentName.toLowerCase().includes(q) || c.flatNumber.toLowerCase().includes(q);
    return matchSearch && (category === 'all' || c.category === category) && (priority === 'all' || c.priority === priority) && (status === 'all' || c.status === status);
  }), [complaints, search, category, priority, status]);

  const stats = {
    total: complaints.length,
    open: complaints.filter(c => c.status === 'Open').length,
    inProgress: complaints.filter(c => c.status === 'In Progress').length,
    resolved: complaints.filter(c => c.status === 'Resolved').length,
  };

  useEffect(() => { fetchComplaints(); }, []);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const data = await apiFetch('/complaints');
      setComplaints(data);
    } catch (err) {
      toast.error('Failed to load complaints');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, s) => {
    try {
      const isResolved = s === 'Resolved';
      const payload = { status: s };
      if (isResolved) payload.resolvedDate = new Date().toISOString();
      const updated = await apiFetch(`/complaints/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
      setComplaints(prev => prev.map(c => c._id === id ? updated : c));
      setSelected(prev => prev?._id === id ? updated : prev);
      toast.success('Status updated');
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const handleAssignChange = async (id, staff) => {
    try {
      const assignedTo = staff === 'Unassigned' ? null : staff;
      const updated = await apiFetch(`/complaints/${id}`, { method: 'PUT', body: JSON.stringify({ assignedTo }) });
      setComplaints(prev => prev.map(c => c._id === id ? updated : c));
      setSelected(prev => prev?._id === id ? updated : prev);
      toast.success('Staff assigned');
    } catch (err) {
      toast.error('Failed to assign staff');
    }
  };

  const handleSave = async (form) => {
    try {
      await apiFetch('/complaints', { method: 'POST', body: JSON.stringify(form) });
      toast.success('Complaint submitted');
      fetchComplaints();
    } catch (err) {
      toast.error('Failed to submit complaint');
    }
  };

  const handleDelete = async () => {
    if (!selected) return;
    try {
      await apiFetch(`/complaints/${selected._id}`, { method: 'DELETE' });
      toast.success('Complaint deleted');
      setDeleteOpen(false);
      setSelected(null);
      fetchComplaints();
    } catch (err) {
      toast.error('Failed to delete complaint');
    }
  };

  const statsCards = [
    { label: 'Total', value: stats.total, color: '#4f46e5', bg: '#eef2ff' },
    { label: 'Open', value: stats.open, color: '#ef4444', bg: '#fee2e2' },
    { label: 'In Progress', value: stats.inProgress, color: '#f59e0b', bg: '#fef3c7' },
    { label: 'Resolved', value: stats.resolved, color: '#10b981', bg: '#d1fae5' },
  ];

  return (
    <div className="space-y">
      <div className="page-header">
        <h1 className="page-title">Complaints Desk</h1>
        <p className="page-subtitle">Track, allocate staff, and resolve resident complaint tickets.</p>
      </div>

      <div className="stats-grid">
        {statsCards.map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-icon" style={{ background: s.bg }}><MessageSquareWarning size={22} color={s.color} /></div>
            <div className="stat-info"><div className="stat-label">{s.label}</div><div className="stat-value">{s.value}</div></div>
          </div>
        ))}
      </div>

      <div className="filter-bar">
        <div className="input-wrapper" style={{ flex: 1, maxWidth: 360 }}>
          <Search size={15} className="input-icon" />
          <input className="input" placeholder="Search by ID, title, resident…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="select" style={{ width: 'auto', minWidth: 130 }} value={category} onChange={e => setCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {categoryOptions.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select className="select" style={{ width: 'auto', minWidth: 110 }} value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="all">All Priority</option>
          {['High','Medium','Low'].map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <select className="select" style={{ width: 'auto', minWidth: 130 }} value={status} onChange={e => setStatus(e.target.value)}>
          <option value="all">All Status</option>
          {['Open','In Progress','Resolved'].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <div className="filter-actions">
          <button className="btn btn-primary" onClick={() => setFormOpen(true)}><Plus size={16} /> Raise Complaint</button>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr><th>ID / Title</th><th>Resident</th><th>Category</th><th>Priority</th><th>Status</th><th>Assigned To</th><th>Date</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8} style={{ textAlign: 'center', padding: 24, color: 'var(--fg-muted)' }}>Loading complaints...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={8}><div className="empty-state"><MessageSquareWarning size={36} /><h3>No complaints found</h3></div></td></tr>
            ) : filtered.map(c => (
              <tr key={c._id}>
                <td>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{c._id.substring(0,8)}</div>
                  <div style={{ fontSize: 13, color: 'var(--fg)' }} className="truncate" title={c.title}>{c.title}</div>
                </td>
                <td>
                  <div style={{ fontWeight: 600 }}>{c.residentName}</div>
                  <div style={{ fontSize: 12, color: 'var(--fg-muted)' }}>{c.flatNumber}</div>
                </td>
                <td><CategoryBadge c={c.category} /></td>
                <td><PriorityBadge p={c.priority} /></td>
                <td><StatusBadge s={c.status} /></td>
                <td style={{ fontSize: 12, color: 'var(--fg-muted)', maxWidth: 140 }} className="truncate">{c.assignedTo || '—'}</td>
                <td style={{ fontSize: 12, color: 'var(--fg-muted)' }}>{new Date(c.createdAt).toLocaleDateString()}</td>
                <td>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button className="btn btn-ghost btn-icon-sm" title="View Details" onClick={() => { setSelected(c); setDetailsOpen(true); }}><Eye size={15} /></button>
                    <button className="btn btn-ghost btn-icon-sm" title="Delete" style={{ color: 'var(--danger)' }} onClick={() => { setSelected(c); setDeleteOpen(true); }}><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ComplaintFormDialog open={formOpen} onClose={() => setFormOpen(false)} onSave={handleSave} />
      <DetailsSheet open={detailsOpen} onClose={() => { setDetailsOpen(false); setSelected(null); }} complaint={selected} onStatusChange={handleStatusChange} onAssignChange={handleAssignChange} />
      <ConfirmModal
        open={deleteOpen}
        onClose={() => { setDeleteOpen(false); setSelected(null); }}
        onConfirm={handleDelete}
        title="Delete Complaint"
        description={selected?.title ? `Delete complaint: "${selected.title}"? This action cannot be undone.` : undefined}
      />
    </div>
  );
}
