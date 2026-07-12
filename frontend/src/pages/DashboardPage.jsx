import { dashboardStats, recentActivities, monthlyCollectionData, complaintCategoryData } from '../data/dummyData.js';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Users, UserCheck, MessageSquareWarning, IndianRupee, Home, Wrench, CreditCard, CalendarDays, Bell } from 'lucide-react';

import { useState, useEffect } from 'react';
import LoadingSpinner from '../components/shared/LoadingSpinner.jsx';

const iconMap = { Users, UserCheck, MessageSquareWarning, IndianRupee };
// Use CSS-variable-aware colors so both light and dark mode look correct
const activityIconMap = {
  resident: { icon: Users,                 color: 'var(--primary)',  bg: 'var(--primary-light)' },
  visitor:  { icon: UserCheck,             color: 'var(--info)',     bg: 'var(--info-light)' },
  complaint:{ icon: MessageSquareWarning,  color: 'var(--warning)',  bg: 'var(--warning-light)' },
  payment:  { icon: IndianRupee,           color: 'var(--success)',  bg: 'var(--success-light)' },
  event:    { icon: CalendarDays,          color: 'var(--primary)',  bg: 'var(--secondary)' },
  notice:   { icon: Bell,                 color: 'var(--danger)',   bg: 'var(--danger-light)' },
};

const CHART_COLORS = ['#4f46e5', '#06b6d4', '#a855f7', '#f59e0b', '#ef4444'];

export default function DashboardPage() {
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  if (pageLoading) {
    return <LoadingSpinner fullPage={true} message="Accessing secure database..." />;
  }

  return (
    <div className="space-y">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Welcome back, Shadan! Here's what's happening in your society.</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {dashboardStats.map(stat => {
          const Icon = iconMap[stat.icon];
          const isUp = stat.trend === 'up';
          return (
            <div key={stat.id} className="stat-card">
              <div className="stat-icon" style={{ background: isUp ? 'var(--primary-light)' : 'var(--danger-light)' }}>
                {Icon && <Icon size={22} color={isUp ? 'var(--primary)' : 'var(--danger)'} />}
              </div>
              <div className="stat-info">
                <div className="stat-label">{stat.label}</div>
                <div className="stat-value">{stat.value}</div>
                <div className={`stat-change ${isUp ? 'up' : 'down'}`}>
                  {isUp ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                  {stat.change} from last month
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts — responsive: 2-col on wide screens, 1-col on mobile */}
      <div className="charts-grid">
        {/* Bar Chart */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Monthly Collection</div>
              <div className="card-subtitle">Last 6 months (in ₹)</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyCollectionData} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--fg-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--fg-muted)' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={v => [`₹${v.toLocaleString()}`, 'Collection']} contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 13 }} />
              <Bar dataKey="amount" fill="var(--primary)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Complaint Categories</div>
              <div className="card-subtitle">Distribution by type</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={complaintCategoryData} dataKey="count" nameKey="category" cx="50%" cy="50%" outerRadius={80} innerRadius={45}>
                {complaintCategoryData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 13 }} />
              <Legend iconType="circle" iconSize={10} wrapperStyle={{ fontSize: 12, color: 'var(--fg-muted)' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">Recent Activities</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {recentActivities.map(activity => {
            const meta = activityIconMap[activity.type];
            const Icon = meta.icon;
            return (
              <div key={activity.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: meta.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={16} color={meta.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, color: 'var(--fg)' }}>{activity.description}</div>
                  <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginTop: 2 }}>{activity.time}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
