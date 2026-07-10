export const staffOptions = [
  'Ramesh Kumar (Plumbing Contractor)',
  'Vijay Singh (Society Electrician)',
  'Santosh Patra (Cleaning Supervisor)',
  'Baldev Raj (Head Security Guard)',
  'Amit Verma (Estate Manager)',
  'Unassigned',
];

export const categoryOptions = ['Plumbing', 'Electrical', 'Cleanliness', 'Parking', 'Security', 'Other'];

export const initialComplaints = [
  { id: 'CMP-1042', title: 'Water leakage in Master Bathroom', description: 'There is continuous water dripping from the ceiling in the master bathroom. It is starting to damage the wall paint.', category: 'Plumbing', priority: 'High', status: 'Open', createdDate: '2026-06-29', resolvedDate: null, flatNumber: 'A-401', tower: 'A', residentName: 'Rahul Sharma', assignedTo: null },
  { id: 'CMP-1043', title: 'Corridor light fused on 2nd Floor', description: 'The main tube light outside Flat B-202 is fused, making the hallway completely dark after sunset.', category: 'Electrical', priority: 'Medium', status: 'In Progress', createdDate: '2026-06-30', resolvedDate: null, flatNumber: 'B-202', tower: 'B', residentName: 'Sneha Patel', assignedTo: 'Vijay Singh (Society Electrician)' },
  { id: 'CMP-1044', title: 'Garbage not collected from C-103', description: 'Housekeeping staff skipped garbage collection today for flat C-103. This is the second time this week.', category: 'Cleanliness', priority: 'Low', status: 'Open', createdDate: '2026-06-30', resolvedDate: null, flatNumber: 'C-103', tower: 'C', residentName: 'Vikram Malhotra', assignedTo: null },
  { id: 'CMP-1045', title: 'Wrong vehicle parked in slot D-501', description: 'Another car with plate MH 12 PQ 7788 is parked in my assigned parking slot D-501. Please get it moved immediately.', category: 'Parking', priority: 'High', status: 'Open', createdDate: '2026-06-30', resolvedDate: null, flatNumber: 'D-501', tower: 'D', residentName: 'Priya Nair', assignedTo: null },
  { id: 'CMP-1046', title: 'Intercom line has static noise', description: 'The intercom phone in Flat A-302 has heavy static noise. I can barely hear the gate guard.', category: 'Electrical', priority: 'Medium', status: 'In Progress', createdDate: '2026-06-28', resolvedDate: null, flatNumber: 'A-302', tower: 'A', residentName: 'Aditya Joshi', assignedTo: 'Vijay Singh (Society Electrician)' },
  { id: 'CMP-1047', title: 'Stray dog inside Block B lobby', description: 'A stray dog has entered Block B lobby and is sleeping near the elevator. Residents with small kids are scared to go out.', category: 'Security', priority: 'High', status: 'Resolved', createdDate: '2026-06-25', resolvedDate: '2026-06-25', flatNumber: 'B-104', tower: 'B', residentName: 'Kavita Deshmukh', assignedTo: 'Baldev Raj (Head Security Guard)' },
  { id: 'CMP-1048', title: 'Loose wiring in Lift C machine room', description: 'During routine checks, I noticed loose wiring hanging in the lift room. Needs immediate attention to prevent hazard.', category: 'Electrical', priority: 'High', status: 'Resolved', createdDate: '2026-06-20', resolvedDate: '2026-06-21', flatNumber: 'C-305', tower: 'C', residentName: 'Arjun Reddy', assignedTo: 'Vijay Singh (Society Electrician)' },
  { id: 'CMP-1049', title: 'Water clogging near block D entrance', description: 'Due to heavy rain, water is clogging near the block D main entrance pathway. Housekeeping needs to clear the drain.', category: 'Cleanliness', priority: 'Medium', status: 'Resolved', createdDate: '2026-06-24', resolvedDate: '2026-06-25', flatNumber: 'D-201', tower: 'D', residentName: 'Meena Kapoor', assignedTo: 'Santosh Patra (Cleaning Supervisor)' },
  { id: 'CMP-1050', title: 'Main gate barrier not opening automatically', description: 'RFID tag scanner at main gate is slow and is causing a long queue of vehicles in peak morning hours.', category: 'Security', priority: 'Medium', status: 'In Progress', createdDate: '2026-06-28', resolvedDate: null, flatNumber: 'A-102', tower: 'A', residentName: 'Sanjay Gupta', assignedTo: 'Baldev Raj (Head Security Guard)' },
  { id: 'CMP-1051', title: 'Water pipes rattling noise', description: 'Very loud vibration noise whenever water pump starts in the morning. Heavy vibration felt in flat B-403 walls.', category: 'Plumbing', priority: 'Low', status: 'Resolved', createdDate: '2026-06-18', resolvedDate: '2026-06-19', flatNumber: 'B-403', tower: 'B', residentName: 'Anjali Singh', assignedTo: 'Ramesh Kumar (Plumbing Contractor)' },
];
