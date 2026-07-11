import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema({
  title:    { type: String, required: true },
  body:     { type: String, required: true },
  category: { type: String, enum: ['General', 'Maintenance', 'Event', 'Emergency', 'Finance'], default: 'General' },
  pinned:   { type: Boolean, default: false },
  author:   { type: String, default: 'Admin' },
}, { timestamps: true });

export default mongoose.model('Notice', noticeSchema);
