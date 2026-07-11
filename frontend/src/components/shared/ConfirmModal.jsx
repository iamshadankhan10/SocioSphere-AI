import { AlertTriangle, X } from 'lucide-react';

/**
 * Reusable delete confirmation modal.
 *
 * Props:
 *   open        – boolean
 *   onClose     – () => void
 *   onConfirm   – () => void  (called when user clicks "Delete")
 *   title       – string  (optional, default: "Delete Item")
 *   description – string  (optional, default generic message)
 */
export default function ConfirmModal({ open, onClose, onConfirm, title = 'Delete Item', description }) {
  if (!open) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        style={{ maxWidth: 420 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 'var(--radius)',
              background: 'var(--danger-light)', color: 'var(--danger)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <AlertTriangle size={18} />
            </div>
            <span className="modal-title">{title}</span>
          </div>
          <button className="btn btn-ghost btn-icon-sm" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <p style={{ fontSize: 14, color: 'var(--fg-muted)', lineHeight: 1.6 }}>
            {description || 'Are you sure you want to delete this? This action cannot be undone.'}
          </p>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn btn-outline" style={{ flex: 1 }} onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn"
            style={{ flex: 1, background: 'var(--danger)', color: '#fff' }}
            onClick={handleConfirm}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}
