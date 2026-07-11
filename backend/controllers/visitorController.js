import Visitor from '../models/Visitor.js';

// GET all visitors
export const getVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find().sort({ createdAt: -1 });
    res.json(visitors);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// POST register visitor
export const createVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.create(req.body);
    res.status(201).json(visitor);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

// PUT update visitor (check in / check out / status)
export const updateVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!visitor) return res.status(404).json({ message: 'Visitor not found' });
    res.json(visitor);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

// DELETE visitor record
export const deleteVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findByIdAndDelete(req.params.id);
    if (!visitor) return res.status(404).json({ message: 'Visitor not found' });
    res.json({ message: 'Visitor record deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
