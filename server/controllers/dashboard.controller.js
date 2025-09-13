
const User = require('../models/user.model');
const Product = require('../models/product.model');
const Order = require('../models/order.model');
const Report = require('../models/report.model');
const Help = require('../models/help.model');

const getDashboardStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const productCount = await Product.countDocuments();
    const orderCount = await Order.countDocuments();
    const reportCount = await Report.countDocuments();
    const helpCount = await Help.countDocuments();

    res.status(200).json({
      userCount,
      productCount,
      orderCount,
      reportCount,
      helpCount,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard stats', error });
  }
};

module.exports = { getDashboardStats };
