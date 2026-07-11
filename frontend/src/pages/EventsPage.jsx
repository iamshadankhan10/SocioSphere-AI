import { useState, useMemo } from 'react';
import { initialEvents, eventStatusOptions } from '../data/eventsData.js';
import { Plus, Search, X, CalendarDays, MapPin, Clock, Users, Trash2 } from 'lucide-react';
import ConfirmModal from '../components/shared/ConfirmModal.jsx';

// ---- Status Badge ----
function StatusBadge({ s }) {
  const map = {
    Upcoming: 'badge-primary',
    Ongoing: 'badge-warning',
    Completed: 'badge-success',
    Cancelled: 'badge-danger'
  };
  return <span className={`badge ${map[s] || 'badge-muted'}`}>{s}</span>;
}

// ---- Add Event Modal ----
function AddEventModal({ open, onClose, onAdd }) {
  const empty = { title: '', description: '', date: '', time: '', venue: '', organizer: '', status: 'Upcoming' };
  const [form, setForm] = useState(empty);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...form,
      id: `EVT-${Date.now()}`,
      rsvps: 0
    });
    setForm(empty);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Create New Event</span>
          <button className="btn btn-ghost btn-icon-sm" onClick={onClose}><X size={16} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Event Title</label>
              <input className="input" required placeholder="Event name…" value={form.title} onChange={e => set('title', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Organizer</label>
              <input className="input" required placeholder="e.g. Cultural Committee" value={form.organizer} onChange={e => set('organizer', e.target.value)} />
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Date</label>
                <input className="input" type="date" required value={form.date} onChange={e => set('date', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Time</label>
                <input className="input" required placeholder="e.g. 18:00 - 20:30" value={form.time} onChange={e => set('time', e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Venue</label>
              <input className="input" required placeholder="e.g. Clubhouse Main Hall" value={form.venue} onChange={e => set('venue', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea className="textarea" required placeholder="Event description..." value={form.description} onChange={e => set('description', e.target.value)} />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Create Event</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ---- Main Page ----
export default function EventsPage() {
  const [events, setEvents] = useState(initialEvents);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [addOpen, setAddOpen] = useState(false);

  const handleAdd = (evt) => setEvents(p => [evt, ...p]);
  const handleDelete = (id) => setEvents(p => p.filter(e => e.id !== id));
  const [confirmId, setConfirmId] = useState(null);
  const confirmEvent = events.find(e => e.id === confirmId);
  const handleRsvp = (id) => {
    setEvents(p => p.map(e => e.id === id ? { ...e, rsvps: e.rsvps + 1 } : e));
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return events.filter(e => {
      const matchQ = !q || e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q) || e.venue.toLowerCase().includes(q);
      const matchF = filter === 'All' || e.status === filter;
      return matchQ && matchF;
    });
  }, [events, search, filter]);

  return (
    <div className="space-y">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Events</h1>
        <p className="page-subtitle">Schedule, coordinate and track RSVPs for community events.</p>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="input-wrapper">
          <Search size={15} className="input-icon" />
          <input className="input" style={{ paddingLeft: 34 }} placeholder="Search events…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="select" value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="All">All Statuses</option>
          {eventStatusOptions.map(o => <option key={o}>{o}</option>)}
        </select>
        <div className="filter-actions">
          <button className="btn btn-primary" onClick={() => setAddOpen(true)}>
            <Plus size={16} /> Create Event
          </button>
        </div>
      </div>

      {/* Events Grid */}
      {filtered.length === 0 ? (
        <div className="empty-state" style={{ minHeight: 300 }}>
          <CalendarDays size={36} />
          <h3>No events found</h3>
          <p>Create a new event or adjust your filters.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
          {filtered.map(evt => (
            <div key={evt.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <StatusBadge s={evt.status} />
                  <span style={{ fontSize: 12, color: 'var(--fg-subtle)' }}>{evt.id}</span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--fg)', marginBottom: 8 }}>{evt.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--fg-muted)', marginBottom: 16, lineHeight: 1.5 }}>{evt.description}</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, color: 'var(--fg-muted)', marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <CalendarDays size={14} color="var(--primary)" />
                    <span>{evt.date} &middot; {evt.time}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <MapPin size={14} color="var(--primary)" />
                    <span>{evt.venue}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Users size={14} color="var(--primary)" />
                    <span>Organized by: <strong>{evt.organizer}</strong></span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg)' }}>
                  {evt.rsvps} attending
                </span>
                <div style={{ display: 'flex', gap: 8 }}>
                  {evt.status === 'Upcoming' && (
                    <button className="btn btn-outline btn-sm" onClick={() => handleRsvp(evt.id)}>
                      RSVP (+1)
                    </button>
                  )}
                  <button className="btn btn-ghost btn-icon-sm" style={{ color: 'var(--danger)' }} onClick={() => setConfirmId(evt.id)}>
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddEventModal open={addOpen} onClose={() => setAddOpen(false)} onAdd={handleAdd} />
      <ConfirmModal
        open={!!confirmId}
        onClose={() => setConfirmId(null)}
        onConfirm={() => handleDelete(confirmId)}
        title="Delete Event"
        description={confirmEvent?.title ? `Delete event: "${confirmEvent.title}"? This action cannot be undone.` : undefined}
      />
    </div>
  );
}
