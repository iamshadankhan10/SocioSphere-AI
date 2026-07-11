import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, default: '' },
  date:        { type: String, required: true },
  time:        { type: String, default: '' },
  venue:       { type: String, default: '' },
  organizer:   { type: String, default: 'Admin' },
  status:      { type: String, enum: ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'], default: 'Upcoming' },
  rsvps:       { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);
