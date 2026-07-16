import User from '../models/User.js';
import Visitor from '../models/Visitor.js';
import Complaint from '../models/Complaint.js';
import Payment from '../models/Payment.js';
import Notice from '../models/Notice.js';
import Event from '../models/Event.js';

export const getDashboardData = async (req, res) => {
  try {
    const usersCount = await User.countDocuments({ role: 'resident' });
    const visitorsCount = await Visitor.countDocuments();
    const pendingComplaintsCount = await Complaint.countDocuments({ status: { $ne: 'Resolved' } });
    const payments = await Payment.find({ status: 'Paid' });
    const totalCollection = payments.reduce((acc, p) => acc + p.amount, 0);

    const dashboardStats = [
      { id: 'total-residents', label: 'Total Residents', value: usersCount.toString(), change: '+2%', trend: 'up', icon: 'Users' },
      { id: 'total-visitors', label: 'Total Visitors', value: visitorsCount.toString(), change: '+5%', trend: 'up', icon: 'UserCheck' },
      { id: 'pending-complaints', label: 'Pending Complaints', value: pendingComplaintsCount.toString(), change: '-1%', trend: 'down', icon: 'MessageSquareWarning' },
      { id: 'monthly-collection', label: 'Total Collection', value: `₹${totalCollection.toLocaleString()}`, change: '+10%', trend: 'up', icon: 'IndianRupee' },
    ];

    // Build Recent Activities
    const recentActivities = [];
    // We will just fetch a few of each and sort them
    const recentUsers = await User.find({ role: 'resident' }).sort({ createdAt: -1 }).limit(2);
    recentUsers.forEach(u => recentActivities.push({ id: `u-${u._id}`, description: `New resident ${u.name} registered`, time: new Date(u.createdAt).toLocaleDateString(), type: 'resident', date: u.createdAt }));
    
    const recentVisitors = await Visitor.find().sort({ createdAt: -1 }).limit(2);
    recentVisitors.forEach(v => recentActivities.push({ id: `v-${v._id}`, description: `Visitor ${v.fullName} checked in for ${v.flatNumber}`, time: new Date(v.createdAt).toLocaleDateString(), type: 'visitor', date: v.createdAt }));

    const recentComplaints = await Complaint.find().sort({ createdAt: -1 }).limit(2);
    recentComplaints.forEach(c => recentActivities.push({ id: `c-${c._id}`, description: `Complaint raised: ${c.title}`, time: new Date(c.createdAt).toLocaleDateString(), type: 'complaint', date: c.createdAt }));

    const recentPayments = await Payment.find().sort({ createdAt: -1 }).limit(2);
    recentPayments.forEach(p => recentActivities.push({ id: `p-${p._id}`, description: `Payment of ₹${p.amount} received from ${p.flatNumber}`, time: new Date(p.createdAt).toLocaleDateString(), type: 'payment', date: p.createdAt }));

    recentActivities.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Build Monthly Collection Data
    const monthlyCollectionMap = {};
    payments.forEach(p => {
      const month = new Date(p.createdAt).toLocaleString('en-US', { month: 'short' });
      monthlyCollectionMap[month] = (monthlyCollectionMap[month] || 0) + p.amount;
    });
    const monthlyCollectionData = Object.keys(monthlyCollectionMap).map(month => ({ month, amount: monthlyCollectionMap[month] }));
    // If empty, supply dummy structure
    if (monthlyCollectionData.length === 0) {
      monthlyCollectionData.push({ month: 'Cur', amount: 0 });
    }

    // Build Complaint Categories
    const complaints = await Complaint.find();
    const catMap = {};
    complaints.forEach(c => {
      catMap[c.category] = (catMap[c.category] || 0) + 1;
    });
    const complaintCategoryData = Object.keys(catMap).map(category => ({ category, count: catMap[category] }));
    if (complaintCategoryData.length === 0) {
      complaintCategoryData.push({ category: 'None', count: 1 });
    }

    res.json({
      dashboardStats,
      recentActivities: recentActivities.slice(0, 6),
      monthlyCollectionData,
      complaintCategoryData
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
