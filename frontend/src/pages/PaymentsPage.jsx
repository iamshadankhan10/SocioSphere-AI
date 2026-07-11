import { useState, useMemo } from 'react';
import { initialPayments, paymentTypeOptions } from '../data/paymentsData.js';
import { Plus, Search, X, IndianRupee, Eye, CheckCircle, Clock, AlertCircle } from 'lucide-react';

// ---- Badges ----
function StatusBadge({ s }) {
  const map = { Paid: 'badge-success', Pending: 'badge-warning', Overdue: 'badge-danger' };
  return <span className={`badge ${map[s]}`}>{s}</span>;
}
function TypeBadge({ t }) {
  const map = { Maintenance: 'badge-primary', Parking: 'badge-info', Amenity: 'badge-muted', Penalty: 'badge-danger', Water: 'badge-info', Other: 'badge-muted' };
  return <span className={`badge ${map[t] || 'badge-muted'}`}>{t}</span>;
}

// ---- Add Payment Modal ----
function AddPaymentModal({ open, onClose, onAdd }) {
  const empty = { residentName: '', flatNumber: '', tower: 'A', type: 'Maintenance', amount: '', dueDate: '', month: '' };
  const [form, setForm] = useState(empty);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...form,
      id: `PAY-${Date.now()}`,
      amount: Number(form.amount),
      status: 'Pending',
      paidDate: null,
      method: null,
    });
    setForm(empty);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Add Payment Record</span>
          <button className="btn btn-ghost btn-icon-sm" onClick={onClose}><X size={16} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Resident Name</label>
                <input className="input" required placeholder="e.g. Rahul Sharma" value={form.residentName} onChange={e => set('residentName', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Flat Number</label>
                <input className="input" required placeholder="e.g. A-401" value={form.flatNumber} onChange={e => set('flatNumber', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Tower</label>
                <select className="select" value={form.tower} onChange={e => set('tower', e.target.value)}>
                  {['A', 'B', 'C', 'D'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Payment Type</label>
                <select className="select" value={form.type} onChange={e => set('type', e.target.value)}>
                  {paymentTypeOptions.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Amount (₹)</label>
                <input className="input" type="number" required min="1" placeholder="e.g. 5500" value={form.amount} onChange={e => set('amount', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Due Date</label>
                <input className="input" type="date" required value={form.dueDate} onChange={e => set('dueDate', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Month</label>
                <input className="input" placeholder="e.g. Jul 2026" value={form.month} onChange={e => set('month', e.target.value)} />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Add Payment</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ---- Detail Sheet ----
function DetailSheet({ open, onClose, payment, onMarkPaid }) {
  if (!open || !payment) return null;
  return (
    <>
      <div className="sheet-overlay" onClick={onClose} />
      <div className="sheet">
        <div className="sheet-header">
          <span className="sheet-title">{payment.id}</span>
          <button className="btn btn-ghost btn-icon-sm" onClick={onClose}><X size={16} /></button>
        </div>
        <div className="sheet-body">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <StatusBadge s={payment.status} />
            <TypeBadge t={payment.type} />
          </div>

          <div className="detail-divider" />

          <div className="detail-section">
            <div className="grid-2">
              <div><div className="detail-label">Resident</div><div className="detail-value">{payment.residentName}</div></div>
              <div><div className="detail-label">Flat</div><div className="detail-value">{payment.flatNumber} · Tower {payment.tower}</div></div>
              <div><div className="detail-label">Amount</div><div className="detail-value" style={{ color: 'var(--primary)', fontWeight: 700 }}>₹{payment.amount.toLocaleString()}</div></div>
              <div><div className="detail-label">Month</div><div className="detail-value">{payment.month || '—'}</div></div>
              <div><div className="detail-label">Due Date</div><div className="detail-value">{payment.dueDate}</div></div>
              <div><div className="detail-label">Paid On</div><div className="detail-value">{payment.paidDate || '—'}</div></div>
              <div><div className="detail-label">Method</div><div className="detail-value">{payment.method || '—'}</div></div>
            </div>
          </div>

          {payment.status !== 'Paid' && (
            <>
              <div className="detail-divider" />
              <div className="form-group">
                <label className="form-label">Mark as Paid</label>
                <select className="select" defaultValue="UPI" id={`method-${payment.id}`}>
                  <option>UPI</option>
                  <option>Cash</option>
                  <option>Bank Transfer</option>
                  <option>Cheque</option>
                </select>
              </div>
            </>
          )}
        </div>

        <div className="sheet-footer">
          <button className="btn btn-outline" style={{ flex: 1 }} onClick={onClose}>Close</button>
          {payment.status !== 'Paid' && (
            <button
              className="btn btn-primary"
              style={{ flex: 1 }}
              onClick={() => {
                const sel = document.getElementById(`method-${payment.id}`);
                onMarkPaid(payment.id, sel?.value || 'UPI');
                onClose();
              }}
            >
              <CheckCircle size={15} /> Mark as Paid
            </button>
          )}
        </div>
      </div>
    </>
  );
}

// ---- Main Page ----
export default function PaymentsPage() {
  const [payments, setPayments] = useState(initialPayments);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [addOpen, setAddOpen] = useState(false);
  const [sheet, setSheet] = useState(null);

  // Stats
  const totalCollected = payments.filter(p => p.status === 'Paid').reduce((s, p) => s + p.amount, 0);
  const totalPending   = payments.filter(p => p.status === 'Pending').reduce((s, p) => s + p.amount, 0);
  const totalOverdue   = payments.filter(p => p.status === 'Overdue').reduce((s, p) => s + p.amount, 0);
  const stats = [
    { label: 'Total Collected', value: `₹${totalCollected.toLocaleString()}`, icon: IndianRupee, color: '#10b981', bg: '#d1fae5' },
    { label: 'Pending',         value: `₹${totalPending.toLocaleString()}`,   icon: Clock,       color: '#f59e0b', bg: '#fef3c7' },
    { label: 'Overdue',         value: `₹${totalOverdue.toLocaleString()}`,   icon: AlertCircle, color: '#ef4444', bg: '#fee2e2' },
    { label: 'Total Records',   value: payments.length,                        icon: IndianRupee, color: '#4f46e5', bg: '#eef2ff' },
  ];

  const filtered = useMemo(() => payments.filter(p => {
    const q = search.toLowerCase();
    const matchQ = !q || p.residentName.toLowerCase().includes(q) || p.flatNumber.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
    const matchS = filterStatus === 'All' || p.status === filterStatus;
    const matchT = filterType === 'All' || p.type === filterType;
    return matchQ && matchS && matchT;
  }), [payments, search, filterStatus, filterType]);

  const handleAdd = (payment) => setPayments(p => [payment, ...p]);
  const handleMarkPaid = (id, method) => {
    setPayments(prev => prev.map(p =>
      p.id === id ? { ...p, status: 'Paid', paidDate: new Date().toISOString().split('T')[0], method } : p
    ));
  };
  const handleDelete = (id) => setPayments(prev => prev.filter(p => p.id !== id));

  return (
    <div className="space-y">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Payments</h1>
        <p className="page-subtitle">Track maintenance fees, collections, and dues across the society.</p>
      </div>

      {/* Stats */}
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

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="input-wrapper">
          <Search size={15} className="input-icon" />
          <input className="input" style={{ paddingLeft: 34 }} placeholder="Search by name, flat or ID…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="All">All Status</option>
          <option>Paid</option>
          <option>Pending</option>
          <option>Overdue</option>
        </select>
        <select className="select" value={filterType} onChange={e => setFilterType(e.target.value)}>
          <option value="All">All Types</option>
          {paymentTypeOptions.map(t => <option key={t}>{t}</option>)}
        </select>
        <div className="filter-actions">
          <button className="btn btn-primary" onClick={() => setAddOpen(true)}>
            <Plus size={16} /> Add Payment
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Resident</th>
              <th>Flat</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8}>
                  <div className="empty-state" style={{ padding: '40px 0' }}>
                    <IndianRupee size={32} />
                    <h3>No payments found</h3>
                    <p>Try adjusting your search or filters.</p>
                  </div>
                </td>
              </tr>
            ) : filtered.map(p => (
              <tr key={p.id}>
                <td style={{ fontWeight: 600, color: 'var(--fg-muted)', fontSize: 13 }}>{p.id}</td>
                <td style={{ fontWeight: 600 }}>{p.residentName}</td>
                <td style={{ color: 'var(--fg-muted)' }}>{p.flatNumber} · T{p.tower}</td>
                <td><TypeBadge t={p.type} /></td>
                <td style={{ fontWeight: 700, color: 'var(--primary)' }}>₹{p.amount.toLocaleString()}</td>
                <td style={{ color: p.status === 'Overdue' ? 'var(--danger)' : 'var(--fg-muted)' }}>{p.dueDate}</td>
                <td><StatusBadge s={p.status} /></td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn btn-ghost btn-icon-sm" title="View Details" onClick={() => setSheet(p)}>
                      <Eye size={15} />
                    </button>
                    {p.status !== 'Paid' && (
                      <button className="btn btn-ghost btn-icon-sm" title="Mark as Paid" style={{ color: 'var(--success)' }} onClick={() => handleMarkPaid(p.id, 'UPI')}>
                        <CheckCircle size={15} />
                      </button>
                    )}
                    <button className="btn btn-ghost btn-icon-sm" title="Delete" style={{ color: 'var(--danger)' }} onClick={() => handleDelete(p.id)}>
                      <X size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <AddPaymentModal open={addOpen} onClose={() => setAddOpen(false)} onAdd={handleAdd} />
      <DetailSheet open={!!sheet} onClose={() => setSheet(null)} payment={sheet} onMarkPaid={handleMarkPaid} />
    </div>
  );
}
