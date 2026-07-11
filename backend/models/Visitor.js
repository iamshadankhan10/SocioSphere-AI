import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
  fullName:     { type: String, required: true },
  flatNumber:   { type: String, required: true },
  tower:        { type: String, required: true },
  host:         { type: String, default: '' },
  purpose:      { type: String, enum: ['Personal', 'Delivery', 'Service', 'Official', 'Other'], default: 'Personal' },
  status:       { type: String, enum: ['Inside', 'Checked Out', 'Pre-Authorized'], default: 'Pre-Authorized' },
  checkInTime:  { type: String, default: null },
  checkOutTime: { type: String, default: null },
  passCode:     { type: String, default: '' },
  vehicleNo:    { type: String, default: '' },
  phone:        { type: String, default: '' },
}, { timestamps: true });

export default mongoose.model('Visitor', visitorSchema);
