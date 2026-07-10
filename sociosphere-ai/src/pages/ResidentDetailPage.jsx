import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { initialResidents, getInitials } from '../data/residentsData.js';
import { ArrowLeft, Mail, Phone, Car, Users, CreditCard, MessageSquareWarning, UserCheck } from 'lucide-react';

function PaymentBadge({ status }) {
  const map = { Paid: 'badge-success', Pending: 'badge-warning', Overdue: 'badge-danger' };
  return <span className={`badge ${map[status]}`}>{status}</span>;
}
function ComplaintBadge({ status }) {
  const map = { Open: 'badge-danger', 'In Progress': 'badge-warning', Resolved: 'badge-success' };
  return <span className={`badge ${map[status]}`}>{status}</span>;
}

export default function ResidentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const resident = initialResidents.find(r => r.id === id);

  if (!resident) return (
    <div className="empty-state" style={{ marginTop: 60 }}>
      <Users size={40} />
      <h3>Resident not found</h3>
      <button className="btn btn-primary" onClick={() => navigate('/dashboard/residents')}>Back to Residents</button>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'family', label: `Family (${resident.familyMembers.length})` },
    { id: 'vehicles', label: `Vehicles (${resident.vehicles.length})` },
    { id: 'payments', label: `Payments (${resident.payments.length})` },
    { id: 'complaints', label: `Complaints (${resident.complaints.length})` },
    { id: 'visitors', label: `Visitors (${resident.visitors.length})` },
  ];

  return (
    <div className="space-y">
      <button className="btn btn-ghost" style={{ width: 'fit-content', paddingLeft: 0 }} onClick={() => navigate('/dashboard/residents')}>
        <ArrowLeft size={16} /> Back to Residents
      </button>

      {/* Profile Header */}
      <div className="profile-header">
        <div className="avatar avatar-xl">{getInitials(resident.fullName)}</div>
        <div className="profile-info" style={{ flex: 1 }}>
          <h1>{resident.fullName}</h1>
          <p>{resident.flatNumber} · Tower {resident.tower}</p>
          <div className="profile-badges">
            <span className={`badge ${resident.residentType === 'Owner' ? 'badge-primary' : 'badge-warning'}`}>{resident.residentType}</span>
            <span className={`badge ${resident.status === 'Active' ? 'badge-success' : 'badge-muted'}`}>{resident.status}</span>
          </div>
        </div>
        <div className="profile-meta">
          <div className="profile-meta-item">
            <span className="profile-meta-label">Move-in Date</span>
            <span className="profile-meta-value">{resident.moveInDate}</span>
          </div>
          <div className="profile-meta-item">
            <span className="profile-meta-label">Family</span>
            <span className="profile-meta-value">{resident.familyMembersCount} members</span>
          </div>
          <div className="profile-meta-item">
            <span className="profile-meta-label">Resident ID</span>
            <span className="profile-meta-value">{resident.id}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <div className="tabs-list">
          {tabs.map(t => (
            <button key={t.id} className={`tab-trigger ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="grid-2">
              <div className="card">
                <div className="card-title" style={{ marginBottom: 16 }}>Contact Info</div>
                <div className="detail-section">
                  <div className="detail-row">
                    <Mail size={16} className="detail-icon" />
                    <div><div className="detail-label">Email</div><div className="detail-value">{resident.email}</div></div>
                  </div>
                  <div className="detail-row">
                    <Phone size={16} className="detail-icon" />
                    <div><div className="detail-label">Phone</div><div className="detail-value">{resident.phone}</div></div>
                  </div>
                  <div className="detail-row">
                    <Phone size={16} className="detail-icon" />
                    <div><div className="detail-label">Emergency Contact</div><div className="detail-value">{resident.emergencyContact}</div></div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-title" style={{ marginBottom: 16 }}>Personal Info</div>
                <div className="detail-section">
                  <div className="detail-row">
                    <div><div className="detail-label">Date of Birth</div><div className="detail-value">{resident.dateOfBirth}</div></div>
                  </div>
                  <div className="detail-row">
                    <Car size={16} className="detail-icon" />
                    <div><div className="detail-label">Primary Vehicle</div><div className="detail-value">{resident.vehicleNumber || '—'}</div></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'family' && (
            resident.familyMembers.length === 0 ? (
              <div className="empty-state"><Users size={32} /><h3>No family members</h3></div>
            ) : (
              <div className="mini-table-wrapper">
                <table className="mini-table">
                  <thead><tr><th>Name</th><th>Relation</th><th>Age</th></tr></thead>
                  <tbody>
                    {resident.familyMembers.map(fm => (
                      <tr key={fm.id}><td>{fm.name}</td><td>{fm.relation}</td><td>{fm.age}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}

          {activeTab === 'vehicles' && (
            resident.vehicles.length === 0 ? (
              <div className="empty-state"><Car size={32} /><h3>No vehicles registered</h3></div>
            ) : (
              <div className="mini-table-wrapper">
                <table className="mini-table">
                  <thead><tr><th>Type</th><th>Model</th><th>Number</th><th>Color</th></tr></thead>
                  <tbody>
                    {resident.vehicles.map(v => (
                      <tr key={v.id}><td>{v.type}</td><td>{v.model}</td><td><strong>{v.number}</strong></td><td>{v.color}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}

          {activeTab === 'payments' && (
            resident.payments.length === 0 ? (
              <div className="empty-state"><CreditCard size={32} /><h3>No payment records</h3></div>
            ) : (
              <div className="mini-table-wrapper">
                <table className="mini-table">
                  <thead><tr><th>Month</th><th>Amount</th><th>Status</th><th>Paid Date</th></tr></thead>
                  <tbody>
                    {resident.payments.map(p => (
                      <tr key={p.id}>
                        <td>{p.month}</td>
                        <td><strong>₹{p.amount.toLocaleString()}</strong></td>
                        <td><PaymentBadge status={p.status} /></td>
                        <td>{p.paidDate || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}

          {activeTab === 'complaints' && (
            resident.complaints.length === 0 ? (
              <div className="empty-state"><MessageSquareWarning size={32} /><h3>No complaints raised</h3></div>
            ) : (
              <div className="mini-table-wrapper">
                <table className="mini-table">
                  <thead><tr><th>Title</th><th>Category</th><th>Status</th><th>Date</th></tr></thead>
                  <tbody>
                    {resident.complaints.map(c => (
                      <tr key={c.id}><td>{c.title}</td><td>{c.category}</td><td><ComplaintBadge status={c.status} /></td><td>{c.createdDate}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}

          {activeTab === 'visitors' && (
            resident.visitors.length === 0 ? (
              <div className="empty-state"><UserCheck size={32} /><h3>No visitor records</h3></div>
            ) : (
              <div className="mini-table-wrapper">
                <table className="mini-table">
                  <thead><tr><th>Name</th><th>Purpose</th><th>Date</th><th>In</th><th>Out</th></tr></thead>
                  <tbody>
                    {resident.visitors.map(v => (
                      <tr key={v.id}><td>{v.name}</td><td>{v.purpose}</td><td>{v.visitDate}</td><td>{v.inTime}</td><td>{v.outTime}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
