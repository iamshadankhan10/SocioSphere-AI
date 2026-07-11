import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
  title:        { type: String, required: true },
  description:  { type: String, default: '' },
  category:     { type: String, enum: ['Plumbing', 'Electrical', 'Cleanliness', 'Parking', 'Security', 'Other'], default: 'Other' },
  priority:     { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
  status:       { type: String, enum: ['Open', 'In Progress', 'Resolved'], default: 'Open' },
  residentName: { type: String, required: true },
  flatNumber:   { type: String, required: true },
  tower:        { type: String, required: true },
  assignedTo:   { type: String, default: 'Unassigned' },
  resolvedDate: { type: String, default: null },
}, { timestamps: true });

export default mongoose.model('Complaint', complaintSchema);
