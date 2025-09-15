// controllers/adminController.js
const User = require('../modals/user');
const Order = require('../modals/order');
const Product = require('../modals/product');

exports.getDashboardStats = async (req, res) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  try {
    const usersCount = await User.countDocuments();
    const ordersCount = await Order.countDocuments();
    const totalSales = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$total' } } },
    ]);

    const stats = {
      users: usersCount,
      orders: ordersCount,
      revenue: totalSales[0]?.total || 0,
    };

    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch stats' });
  }
};
