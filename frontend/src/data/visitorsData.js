export function generatePassCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export const initialVisitors = [
  { id: 'VIS-001', fullName: 'Amit Kumar', phone: '+91 98111 22233', flatNumber: 'A-401', tower: 'A', hostName: 'Rahul Sharma', purpose: 'Guest', status: 'Inside', inTime: '2026-06-30T10:30:00Z', outTime: null, passCode: '482910', vehicleNumber: 'DL 3C AB 9988' },
  { id: 'VIS-002', fullName: 'Suresh Kumar', phone: '+91 98222 33344', flatNumber: 'B-202', tower: 'B', hostName: 'Sneha Patel', purpose: 'Service', status: 'Inside', inTime: '2026-06-30T11:45:00Z', outTime: null, passCode: '591028', vehicleNumber: '' },
  { id: 'VIS-003', fullName: 'Rohan Das', phone: '+91 88333 44455', flatNumber: 'C-103', tower: 'C', hostName: 'Vikram Malhotra', purpose: 'Delivery', status: 'Inside', inTime: '2026-06-30T12:05:00Z', outTime: null, passCode: '820914', vehicleNumber: 'MH 03 XY 5521' },
  { id: 'VIS-004', fullName: 'Karan Johar', phone: '+91 77444 55566', flatNumber: 'D-201', tower: 'D', hostName: 'Meena Kapoor', purpose: 'Guest', status: 'Checked Out', inTime: '2026-06-30T09:15:00Z', outTime: '2026-06-30T11:30:00Z', passCode: '109843', vehicleNumber: 'MH 02 ZY 8812' },
  { id: 'VIS-005', fullName: 'Zomato Rider', phone: '+91 99555 66677', flatNumber: 'D-501', tower: 'D', hostName: 'Priya Nair', purpose: 'Delivery', status: 'Checked Out', inTime: '2026-06-30T13:00:00Z', outTime: '2026-06-30T13:10:00Z', passCode: '302914', vehicleNumber: '' },
  { id: 'VIS-006', fullName: 'Ramesh Sharma', phone: '+91 98666 77788', flatNumber: 'A-302', tower: 'A', hostName: 'Aditya Joshi', purpose: 'Service', status: 'Checked Out', inTime: '2026-06-29T10:00:00Z', outTime: '2026-06-29T12:30:00Z', passCode: '551209', vehicleNumber: 'MH 12 KK 4921' },
  { id: 'VIS-007', fullName: 'Dr. Mehta', phone: '+91 98777 88899', flatNumber: 'B-104', tower: 'B', hostName: 'Kavita Deshmukh', purpose: 'Guest', status: 'Checked Out', inTime: '2026-06-29T16:00:00Z', outTime: '2026-06-29T18:00:00Z', passCode: '219803', vehicleNumber: '' },
  { id: 'VIS-008', fullName: 'Urban Company (AC Repair)', phone: '+91 88888 99900', flatNumber: 'C-305', tower: 'C', hostName: 'Arjun Reddy', purpose: 'Service', status: 'Checked Out', inTime: '2026-06-28T14:15:00Z', outTime: '2026-06-28T16:00:00Z', passCode: '710928', vehicleNumber: '' },
  { id: 'VIS-009', fullName: 'Rakesh Verma (Uncle)', phone: '+91 91999 00011', flatNumber: 'A-102', tower: 'A', hostName: 'Sanjay Gupta', purpose: 'Guest', status: 'Pre-Authorized', inTime: '', outTime: null, passCode: '931204', vehicleNumber: 'MH 01 AB 9000' },
  { id: 'VIS-010', fullName: 'DHL Courier', phone: '+91 92000 11122', flatNumber: 'C-501', tower: 'C', hostName: 'Deepak Verma', purpose: 'Delivery', status: 'Pre-Authorized', inTime: '', outTime: null, passCode: '602984', vehicleNumber: '' },
];
