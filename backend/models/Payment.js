import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  residentName: { type: String, required: true },
  flatNumber:   { type: String, required: true },
  tower:        { type: String, required: true },
  type:         { type: String, enum: ['Maintenance', 'Parking', 'Water', 'Electricity', 'Club House', 'Other'], default: 'Maintenance' },
  amount:       { type: Number, required: true },
  status:       { type: String, enum: ['Paid', 'Pending', 'Overdue'], default: 'Pending' },
  dueDate:      { type: String, required: true },
  paidDate:     { type: String, default: null },
  method:       { type: String, enum: ['UPI', 'Bank Transfer', 'Cash', 'Cheque', null], default: null },
  month:        { type: String, default: '' },
}, { timestamps: true });

export default mongoose.model('Payment', paymentSchema);
