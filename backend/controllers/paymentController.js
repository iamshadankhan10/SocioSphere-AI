import Payment from '../models/Payment.js';

// GET all payments (admin) or filtered by flat/tower (resident)
export const getPayments = async (req, res) => {
  try {
    let query = {};
    // If resident, only show their payments
    if (req.user.role === 'resident') {
      query = { flatNumber: req.user.flatNumber, tower: req.user.tower };
    }
    const payments = await Payment.find(query).sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// GET single payment
export const getPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.json(payment);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// POST create payment (admin only)
export const createPayment = async (req, res) => {
  try {
    const payment = await Payment.create(req.body);
    res.status(201).json(payment);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

// PUT update payment (mark paid, change status)
export const updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.json(payment);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

// DELETE payment (admin only)
export const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.json({ message: 'Payment deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
