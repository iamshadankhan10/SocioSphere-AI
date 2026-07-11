import Complaint from '../models/Complaint.js';

// GET all complaints (admin) or own (resident)
export const getComplaints = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'resident') {
      query = { flatNumber: req.user.flatNumber, tower: req.user.tower };
    }
    const complaints = await Complaint.find(query).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// POST submit complaint (any authenticated user)
export const createComplaint = async (req, res) => {
  try {
    // Auto-fill resident info from auth token if resident
    const data = req.user.role === 'resident'
      ? { ...req.body, residentName: req.user.name, flatNumber: req.user.flatNumber, tower: req.user.tower }
      : req.body;
    const complaint = await Complaint.create(data);
    res.status(201).json(complaint);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

// PUT update complaint status / assign (admin)
export const updateComplaint = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (updates.status === 'Resolved' && !updates.resolvedDate) {
      updates.resolvedDate = new Date().toISOString().split('T')[0];
    }
    const complaint = await Complaint.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
    res.json(complaint);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

// DELETE complaint (admin only)
export const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
    res.json({ message: 'Complaint deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
