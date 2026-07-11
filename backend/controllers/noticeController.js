import Notice from '../models/Notice.js';

// GET all notices
export const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ pinned: -1, createdAt: -1 });
    res.json(notices);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// GET single notice
export const getNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) return res.status(404).json({ message: 'Notice not found' });
    res.json(notice);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// POST create notice (admin only)
export const createNotice = async (req, res) => {
  try {
    const notice = await Notice.create(req.body);
    res.status(201).json(notice);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

// PUT update notice (pin/unpin or edit)
export const updateNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!notice) return res.status(404).json({ message: 'Notice not found' });
    res.json(notice);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

// DELETE notice (admin only)
export const deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);
    if (!notice) return res.status(404).json({ message: 'Notice not found' });
    res.json({ message: 'Notice deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
