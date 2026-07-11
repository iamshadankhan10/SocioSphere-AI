// =============================================================
// NOTICE BOARD DATA — SocioSphere AI
// =============================================================

export const noticeCategoryOptions = ['General', 'Maintenance', 'Event', 'Emergency', 'Payment', 'Security'];

export const initialNotices = [
  { id: 'NOT-001', title: 'Water Supply Interruption – 12th July', body: 'Due to pipeline maintenance work, water supply will be interrupted from 10:00 AM to 4:00 PM on 12th July. Please store water in advance.', category: 'Maintenance', pinned: true,  createdAt: '2026-07-09' },
  { id: 'NOT-002', title: 'Annual General Meeting – 15th July',  body: 'All residents are requested to attend the AGM on 15th July at 6:00 PM in the society clubhouse. Agenda includes budget approval and election of new committee members.', category: 'Event',   pinned: true,  createdAt: '2026-07-08' },
  { id: 'NOT-003', title: 'Parking Lot Painting – Weekend Closure', body: 'The parking lot will be closed this Saturday and Sunday for repainting. Please park vehicles outside the premises or in visitor slots during this time.', category: 'General',     pinned: false, createdAt: '2026-07-07' },
  { id: 'NOT-004', title: 'Maintenance Due for July 2026',        body: 'Reminder: July maintenance charges of ₹5,500 are due by 5th July. Kindly pay via UPI, online transfer, or at the society office. Late payments will incur a penalty of ₹200.', category: 'Payment',     pinned: false, createdAt: '2026-07-01' },
  { id: 'NOT-005', title: 'CCTV Upgrade in Common Areas',        body: 'New high-definition CCTV cameras have been installed in all common areas including lobby, parking, and garden. The old cameras have been decommissioned.', category: 'Security',    pinned: false, createdAt: '2026-06-28' },
  { id: 'NOT-006', title: 'No Power Cut – Backup DG Working',    body: 'The society DG set has been fully serviced. Power backup will be available for all common areas within 30 seconds of any outage. Flat power backup requires individual inverters.', category: 'General',     pinned: false, createdAt: '2026-06-25' },
];
