import { useState, useMemo } from 'react';
import { initialMaintenanceTasks, facilityOptions, maintenanceCategories } from '../data/maintenanceData.js';
import { Plus, Search, X, Wrench, Eye, Trash2 } from 'lucide-react';

function PriorityBadge({ p }) {
  const map = { High: 'badge-danger', Medium: 'badge-warning', Low: 'badge-success' };
  return <span className={`badge ${map[p]}`}>{p}</span>;
}
function StatusBadge({ s }) {
  const map = { Scheduled: 'badge-info', 'In Progress': 'badge-warning', Completed: 'badge-success', Overdue: 'badge-danger' };
  return <span className={`badge ${map[s]}`}>{s}</span>;
}
function CategoryBadge({ c }) {
  const map = { Routine: 'badge-success', Breakdown: 'badge-danger', Inspection: 'badge-primary', Upgrade: 'badge-info' };
  return <span className={`badge ${map[c]}`}>{c}</span>;
}

// ---- Details Sheet ----
function DetailsSheet({ open, onClose, task, onStatusChange, onCostChange }) {
  const [editCost, setEditCost] = useState('');
  if (!open || !task) return null;
  return (
    <>
      <div className="sheet-overlay" onClick={onClose} />
      <div className="sheet">
        <div className="sheet-header">
          <span className="sheet-title">{task.id}</span>
          <button className="btn btn-ghost btn-icon-sm" onClick={onClose}><X size={16} /></button>
        </div>
        <div className="sheet-body">
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>{task.title}</h3>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 6 }}>
            <StatusBadge s={task.status} />
            <PriorityBadge p={task.priority} />
            <CategoryBadge c={task.category} />
          </div>

          <div className="detail-divider" />

          <div className="detail-section">
            <div><div className="detail-label">Description</div><div className="detail-value" style={{ lineHeight: 1.6 }}>{task.description}</div></div>
            <div className="grid-2">
              <div><div className="detail-label">Facility</div><div className="detail-value">{task.facilityName}</div></div>
              <div><div className="detail-label">Contractor</div><div className="detail-value">{task.contractorName}</div></div>
              <div><div className="detail-label">Phone</div><div className="detail-value">{task.contractorPhone}</div></div>
              <div><div className="detail-label">Cost</div><div className="detail-value" style={{ color: 'var(--primary)', fontWeight: 700 }}>₹{task.cost.toLocaleString()}</div></div>
              <div><div className="detail-label">Scheduled</div><div className="detail-value">{task.scheduledDate}</div></div>
              <div><div className="detail-label">Completed</div><div className="detail-value">{task.completionDate || '—'}</div></div>
            </div>
          </div>

          <div className="detail-divider" />

          <div className="form-group">
            <label className="form-label">Update Status</label>
            <select className="select" value={task.status} onChange={e => onStatusChange(task.id, e.target.value)}>
              {['Scheduled','In Progress','Completed','Overdue'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Update Cost (₹)</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input className="input" type="number" min="0" placeholder={task.cost} value={editCost} onChange={e => setEditCost(e.target.value)} />
              <button className="btn btn-primary btn-sm" onClick={() => { if (editCost) { onCostChange(task.id, +editCost); setEditCost(''); } }}>Set</button>
            </div>
          </div>
        </div>
        <div className="sheet-footer">
          <button className="btn btn-outline w-full" onClick={onClose}>Close</button>
        </div>
      </div>
    </>
  );
}

// ---- Schedule Task Dialog ----
function TaskFormDialog({ open, onClose, onSave }) {
  const empty = { title: '', facilityName: facilityOptions[0], category: 'Routine', priority: 'Medium', status: 'Scheduled', scheduledDate: new Date().toISOString().split('T')[0], cost: 0, contractorName: '', contractorPhone: '', description: '' };
  const [form, setForm] = useState(empty);
  if (!open) return null;
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const handleSubmit = (e) => { e.preventDefault(); onSave(form); setForm(empty); onClose(); };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-lg" onClick={e => e.stopPropagation()}>
        <div className="modal-header"><span className="modal-title">Schedule Maintenance Task</span><button className="btn btn-ghost btn-icon-sm" onClick={onClose}><X size={16} /></button></div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Task Title *</label>
              <input className="input" required value={form.title} onChange={e => set('title', e.target.value)} placeholder="Brief task description" />
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Facility</label>
                <select className="select" value={form.facilityName} onChange={e => set('facilityName', e.target.value)}>
                  {facilityOptions.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="select" value={form.category} onChange={e => set('category', e.target.value)}>
                  {maintenanceCategories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Priority</label>
                <select className="select" value={form.priority} onChange={e => set('priority', e.target.value)}>
                  {['Low','Medium','High'].map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select className="select" value={form.status} onChange={e => set('status', e.target.value)}>
                  {['Scheduled','In Progress','Completed','Overdue'].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Scheduled Date</label>
                <input className="input" type="date" value={form.scheduledDate} onChange={e => set('scheduledDate', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Estimated Cost (₹)</label>
                <input className="input" type="number" min="0" value={form.cost} onChange={e => set('cost', +e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Contractor Name *</label>
                <input className="input" required value={form.contractorName} onChange={e => set('contractorName', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Contractor Phone</label>
                <input className="input" value={form.contractorPhone} onChange={e => set('contractorPhone', e.target.value)} placeholder="+91 98765 43210" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea className="textarea" value={form.description} onChange={e => set('description', e.target.value)} rows={3} placeholder="Detailed task notes…" />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Schedule Task</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ---- Delete Dialog ----
function DeleteDialog({ open, onClose, onConfirm, title }) {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 380 }} onClick={e => e.stopPropagation()}>
        <div className="modal-header"><span className="modal-title">Delete Task</span><button className="btn btn-ghost btn-icon-sm" onClick={onClose}><X size={16} /></button></div>
        <div className="modal-body"><p style={{ fontSize: 14, color: 'var(--fg-muted)' }}>Delete task: <strong style={{ color: 'var(--fg)' }}>{title}</strong>?</p></div>
        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn btn-danger" onClick={() => { onConfirm(); onClose(); }}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default function MaintenancePage() {
  const [tasks, setTasks] = useState(initialMaintenanceTasks);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [priority, setPriority] = useState('all');
  const [status, setStatus] = useState('all');
  const [formOpen, setFormOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => tasks.filter(t => {
    const q = search.toLowerCase();
    const matchSearch = !q || t.id.toLowerCase().includes(q) || t.title.toLowerCase().includes(q) || t.facilityName.toLowerCase().includes(q) || t.contractorName.toLowerCase().includes(q);
    return matchSearch && (category === 'all' || t.category === category) && (priority === 'all' || t.priority === priority) && (status === 'all' || t.status === status);
  }), [tasks, search, category, priority, status]);

  const totalCost = tasks.filter(t => t.status === 'Completed').reduce((s, t) => s + t.cost, 0);
  const statsCards = [
    { label: 'Total Tasks', value: tasks.length, color: '#4f46e5', bg: '#eef2ff' },
    { label: 'In Progress', value: tasks.filter(t => t.status === 'In Progress').length, color: '#f59e0b', bg: '#fef3c7' },
    { label: 'Scheduled', value: tasks.filter(t => t.status === 'Scheduled').length, color: '#3b82f6', bg: '#dbeafe' },
    { label: 'Cost Incurred', value: `₹${(totalCost/1000).toFixed(0)}k`, color: '#10b981', bg: '#d1fae5' },
  ];

  const handleStatusChange = (id, s) => {
    const isCompleted = s === 'Completed';
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: s, completionDate: isCompleted ? new Date().toISOString().split('T')[0] : null } : t));
    setSelected(prev => prev?.id === id ? { ...prev, status: s, completionDate: isCompleted ? new Date().toISOString().split('T')[0] : null } : prev);
  };

  const handleCostChange = (id, cost) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, cost } : t));
    setSelected(prev => prev?.id === id ? { ...prev, cost } : prev);
  };

  const handleSave = (form) => {
    const isCompleted = form.status === 'Completed';
    const newT = { id: `MNT-${Math.floor(2000 + Math.random() * 8000)}`, ...form, completionDate: isCompleted ? new Date().toISOString().split('T')[0] : null };
    setTasks(prev => [newT, ...prev]);
  };

  return (
    <div className="space-y">
      <div className="page-header">
        <h1 className="page-title">Facilities Maintenance</h1>
        <p className="page-subtitle">Schedule equipment check-ups, manage repairs, and track vendor costs.</p>
      </div>

      <div className="stats-grid">
        {statsCards.map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-icon" style={{ background: s.bg }}><Wrench size={22} color={s.color} /></div>
            <div className="stat-info"><div className="stat-label">{s.label}</div><div className="stat-value">{s.value}</div></div>
          </div>
        ))}
      </div>

      <div className="filter-bar">
        <div className="input-wrapper" style={{ flex: 1, maxWidth: 360 }}>
          <Search size={15} className="input-icon" />
          <input className="input" placeholder="Search task, facility, contractor…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="select" style={{ width: 'auto', minWidth: 120 }} value={category} onChange={e => setCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {maintenanceCategories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select className="select" style={{ width: 'auto', minWidth: 110 }} value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="all">All Priority</option>
          {['High','Medium','Low'].map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <select className="select" style={{ width: 'auto', minWidth: 130 }} value={status} onChange={e => setStatus(e.target.value)}>
          <option value="all">All Status</option>
          {['Scheduled','In Progress','Completed','Overdue'].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <div className="filter-actions">
          <button className="btn btn-primary" onClick={() => setFormOpen(true)}><Plus size={16} /> Schedule Task</button>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr><th>ID / Title</th><th>Facility</th><th>Category</th><th>Priority</th><th>Status</th><th>Contractor</th><th>Cost</th><th>Date</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={9}><div className="empty-state"><Wrench size={36} /><h3>No tasks found</h3></div></td></tr>
            ) : filtered.map(t => (
              <tr key={t.id}>
                <td>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{t.id}</div>
                  <div style={{ fontSize: 13 }} className="truncate" title={t.title}>{t.title}</div>
                </td>
                <td style={{ fontSize: 13, color: 'var(--fg-muted)' }} className="truncate">{t.facilityName}</td>
                <td><CategoryBadge c={t.category} /></td>
                <td><PriorityBadge p={t.priority} /></td>
                <td><StatusBadge s={t.status} /></td>
                <td style={{ fontSize: 13 }} className="truncate">{t.contractorName}</td>
                <td style={{ fontWeight: 700, color: 'var(--primary)' }}>₹{t.cost.toLocaleString()}</td>
                <td style={{ fontSize: 12, color: 'var(--fg-muted)' }}>{t.scheduledDate}</td>
                <td>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button className="btn btn-ghost btn-icon-sm" title="View Details" onClick={() => { setSelected(t); setDetailsOpen(true); }}><Eye size={15} /></button>
                    <button className="btn btn-ghost btn-icon-sm" title="Delete" style={{ color: 'var(--danger)' }} onClick={() => { setSelected(t); setDeleteOpen(true); }}><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TaskFormDialog open={formOpen} onClose={() => setFormOpen(false)} onSave={handleSave} />
      <DetailsSheet open={detailsOpen} onClose={() => { setDetailsOpen(false); setSelected(null); }} task={selected} onStatusChange={handleStatusChange} onCostChange={handleCostChange} />
      <DeleteDialog open={deleteOpen} onClose={() => { setDeleteOpen(false); setSelected(null); }} onConfirm={() => setTasks(prev => prev.filter(t => t.id !== selected?.id))} title={selected?.title} />
    </div>
  );
}
