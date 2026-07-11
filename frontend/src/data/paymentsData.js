// =============================================================
// PAYMENTS DATA — SocioSphere AI
// =============================================================

export const paymentTypeOptions = ['Maintenance', 'Parking', 'Amenity', 'Penalty', 'Water', 'Other'];
export const paymentStatusOptions = ['Paid', 'Pending', 'Overdue'];

export const initialPayments = [
  { id: 'PAY-2001', residentName: 'Rahul Sharma',    flatNumber: 'A-401', tower: 'A', type: 'Maintenance', amount: 5500, status: 'Paid',    dueDate: '2026-06-05', paidDate: '2026-06-03', method: 'UPI',         month: 'Jun 2026' },
  { id: 'PAY-2002', residentName: 'Sneha Patel',     flatNumber: 'B-202', tower: 'B', type: 'Maintenance', amount: 5500, status: 'Paid',    dueDate: '2026-06-05', paidDate: '2026-06-01', method: 'Bank Transfer', month: 'Jun 2026' },
  { id: 'PAY-2003', residentName: 'Vikram Malhotra', flatNumber: 'C-103', tower: 'C', type: 'Maintenance', amount: 5500, status: 'Pending', dueDate: '2026-07-05', paidDate: null,          method: null,           month: 'Jul 2026' },
  { id: 'PAY-2004', residentName: 'Priya Nair',      flatNumber: 'D-501', tower: 'D', type: 'Parking',     amount: 1500, status: 'Overdue', dueDate: '2026-06-01', paidDate: null,          method: null,           month: 'Jun 2026' },
  { id: 'PAY-2005', residentName: 'Aditya Joshi',    flatNumber: 'A-302', tower: 'A', type: 'Maintenance', amount: 5500, status: 'Paid',    dueDate: '2026-06-05', paidDate: '2026-06-05', method: 'Cash',         month: 'Jun 2026' },
  { id: 'PAY-2006', residentName: 'Kavita Deshmukh', flatNumber: 'B-104', tower: 'B', type: 'Amenity',     amount: 2000, status: 'Pending', dueDate: '2026-07-10', paidDate: null,          method: null,           month: 'Jul 2026' },
  { id: 'PAY-2007', residentName: 'Arjun Reddy',     flatNumber: 'C-305', tower: 'C', type: 'Maintenance', amount: 5500, status: 'Paid',    dueDate: '2026-06-05', paidDate: '2026-06-04', method: 'UPI',         month: 'Jun 2026' },
  { id: 'PAY-2008', residentName: 'Meena Kapoor',    flatNumber: 'D-201', tower: 'D', type: 'Maintenance', amount: 5500, status: 'Overdue', dueDate: '2026-05-05', paidDate: null,          method: null,           month: 'May 2026' },
  { id: 'PAY-2009', residentName: 'Sanjay Gupta',    flatNumber: 'A-102', tower: 'A', type: 'Parking',     amount: 1500, status: 'Paid',    dueDate: '2026-06-01', paidDate: '2026-05-30', method: 'Bank Transfer', month: 'Jun 2026' },
  { id: 'PAY-2010', residentName: 'Anjali Singh',    flatNumber: 'B-403', tower: 'B', type: 'Water',       amount: 800,  status: 'Paid',    dueDate: '2026-06-10', paidDate: '2026-06-09', method: 'UPI',         month: 'Jun 2026' },
  { id: 'PAY-2011', residentName: 'Deepak Verma',    flatNumber: 'C-210', tower: 'C', type: 'Penalty',     amount: 500,  status: 'Pending', dueDate: '2026-07-05', paidDate: null,          method: null,           month: 'Jul 2026' },
  { id: 'PAY-2012', residentName: 'Sunita Mehta',    flatNumber: 'D-308', tower: 'D', type: 'Maintenance', amount: 5500, status: 'Paid',    dueDate: '2026-06-05', paidDate: '2026-06-02', method: 'Cash',         month: 'Jun 2026' },
  { id: 'PAY-2013', residentName: 'Ramesh Iyer',     flatNumber: 'A-205', tower: 'A', type: 'Amenity',     amount: 2000, status: 'Overdue', dueDate: '2026-05-10', paidDate: null,          method: null,           month: 'May 2026' },
  { id: 'PAY-2014', residentName: 'Pooja Sharma',    flatNumber: 'B-301', tower: 'B', type: 'Maintenance', amount: 5500, status: 'Pending', dueDate: '2026-07-05', paidDate: null,          method: null,           month: 'Jul 2026' },
  { id: 'PAY-2015', residentName: 'Nitin Jain',      flatNumber: 'C-402', tower: 'C', type: 'Water',       amount: 750,  status: 'Paid',    dueDate: '2026-06-10', paidDate: '2026-06-08', method: 'UPI',         month: 'Jun 2026' },
];
