import { useState, useMemo } from 'react';
import { initialNotices, noticeCategoryOptions } from '../data/noticeBoardData.js';
import { Plus, Pin, PinOff, Trash2, Search, X, Megaphone } from 'lucide-react';

// ---- Category badge ----
const categoryColors = {
  General:     'badge-muted',
  Maintenance: 'badge-warning',
  Event:       'badge-primary',
  Emergency:   'badge-danger',
  Payment:     'badge-info',
  Security:    'badge-success',
};
function CategoryBadge({ c }) {
  return <span className={`badge ${categoryColors[c] || 'badge-muted'}`}>{c}</span>;
}

// ---- Add Notice Modal ----
function AddNoticeModal({ open, onClose, onAdd }) {
  const [form, setForm] = useState({ title: '', body: '', category: 'General' });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...form, id: `NOT-${Date.now()}`, pinned: false, createdAt: new Date().toISOString().split('T')[0] });
    setForm({ title: '', body: '', category: 'General' });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Post New Notice</span>
          <button className="btn btn-ghost btn-icon-sm" onClick={onClose}><X size={16} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Title</label>
              <input className="input" required placeholder="Notice title…" value={form.title} onChange={e => set('title', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="select" value={form.category} onChange={e => set('category', e.target.value)}>
                {noticeCategoryOptions.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea className="textarea" required placeholder="Write the notice content here…" value={form.body} onChange={e => set('body', e.target.value)} />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Post Notice</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ---- Notice Card ----
function NoticeCard({ notice, onPin, onDelete }) {
  return (
    <div className="card" style={{ position: 'relative', borderLeft: notice.pinned ? '3px solid var(--primary)' : undefined }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
            {notice.pinned && (
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--primary)', background: 'var(--primary-light)', padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>
                📌 Pinned
              </span>
            )}
            <CategoryBadge c={notice.category} />
            <span style={{ fontSize: 12, color: 'var(--fg-subtle)', marginLeft: 'auto' }}>{notice.createdAt}</span>
          </div>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--fg)', marginBottom: 8 }}>{notice.title}</h3>
          <p style={{ fontSize: 14, color: 'var(--fg-muted)', lineHeight: 1.6 }}>{notice.body}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
          <button
            className="btn btn-ghost btn-icon-sm"
            title={notice.pinned ? 'Unpin' : 'Pin'}
            style={{ color: notice.pinned ? 'var(--primary)' : undefined }}
            onClick={() => onPin(notice.id)}
          >
            {notice.pinned ? <PinOff size={14} /> : <Pin size={14} />}
          </button>
          <button className="btn btn-ghost btn-icon-sm" title="Delete" style={{ color: 'var(--danger)' }} onClick={() => onDelete(notice.id)}>
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ---- Main Page ----
export default function NoticeBoardPage() {
  const [notices, setNotices] = useState(initialNotices);
  const [search, setSearch]   = useState('');
  const [filter, setFilter]   = useState('All');
  const [addOpen, setAddOpen] = useState(false);

  const handleAdd    = (n) => setNotices(p => [n, ...p]);
  const handlePin    = (id) => setNotices(p => p.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n));
  const handleDelete = (id) => setNotices(p => p.filter(n => n.id !== id));

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return notices
      .filter(n => {
        const matchQ = !q || n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q);
        const matchF = filter === 'All' || n.category === filter;
        return matchQ && matchF;
      })
      .sort((a, b) => b.pinned - a.pinned); // pinned notices float to top
  }, [notices, search, filter]);

  return (
    <div className="space-y">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Notice Board</h1>
        <p className="page-subtitle">Post and manage society announcements for all residents.</p>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="input-wrapper">
          <Search size={15} className="input-icon" />
          <input className="input" style={{ paddingLeft: 34 }} placeholder="Search notices…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="select" value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="All">All Categories</option>
          {noticeCategoryOptions.map(c => <option key={c}>{c}</option>)}
        </select>
        <div className="filter-actions">
          <button className="btn btn-primary" onClick={() => setAddOpen(true)}>
            <Plus size={16} /> Post Notice
          </button>
        </div>
      </div>

      {/* Notices */}
      {filtered.length === 0 ? (
        <div className="empty-state" style={{ minHeight: 300 }}>
          <Megaphone size={36} />
          <h3>No notices found</h3>
          <p>Post a new notice or adjust your search.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {filtered.map(n => (
            <NoticeCard key={n.id} notice={n} onPin={handlePin} onDelete={handleDelete} />
          ))}
        </div>
      )}

      <AddNoticeModal open={addOpen} onClose={() => setAddOpen(false)} onAdd={handleAdd} />
    </div>
  );
}
