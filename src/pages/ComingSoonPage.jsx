import { CreditCard, Megaphone, CalendarDays, Settings, Wrench } from 'lucide-react';

const iconMap = { CreditCard, Megaphone, CalendarDays, Settings, Wrench };

export default function ComingSoonPage({ title, icon, desc }) {
  const Icon = iconMap[icon] || Settings;
  return (
    <div className="space-y">
      <div className="page-header">
        <h1 className="page-title">{title}</h1>
      </div>
      <div className="coming-soon">
        <div className="coming-soon-icon">
          <Icon size={36} />
        </div>
        <h2>{title} — Coming Soon</h2>
        <p>{desc}</p>
        <p style={{ fontSize: 13, color: 'var(--fg-subtle)' }}>
          We're working hard to bring this feature to you. Stay tuned!
        </p>
      </div>
    </div>
  );
}
