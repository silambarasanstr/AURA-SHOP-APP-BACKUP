import Order from "../models/orderModel.js";

export const createOrder = async (req, res) => {
  try {
    const {
      userId,
      items,
      totalPrice,
      discount,
      address,
      deliveryMethod,
      payment,
    } = req.body;

    const orderNumber = `ORD-${new Date()
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`;

    const order = new Order({
      userId,
      items,
      totalPrice,
      discount,
      address,
      orderNumber,
      deliveryMethod,
      payment,
    });

    const savedOrder = await order.save();

    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const { userId, role } = req.query;

    let orders;

    if (role === "admin") {
      orders = await Order.find();
    } else {
      orders = await Order.find({ userId });
    }

    if (!orders) {
      return res.status(404).json({ message: "Orders not found" });
    }

    res.status(200).json(orders.sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOrderStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    const pendingOrders = await Order.countDocuments({
      status: "Pending",
    });

    const processingOrders = await Order.countDocuments({
      status: "Processing",
    });

    const shippedOrders = await Order.countDocuments({
      status: "Shipped",
    });

    const deliveredOrders = await Order.countDocuments({
      status: "Completed",
    });

    const cancelledOrders = await Order.countDocuments({
      status: "Cancelled",
    });

    const revenueResult = await Order.aggregate([
      {
        $match: {
          status: { $ne: "Cancelled" },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ]);

    const totalRevenue =
      revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

    res.status(200).json({
      totalOrders,
      totalRevenue,
      pendingOrders,
      processingOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// 🔴 DELETE /api/orders/:id
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order deleted successfully",
      order: deletedOrder,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
