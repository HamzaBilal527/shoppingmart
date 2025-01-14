import User from '../models/userModel.js';

const getUserName = async (userId) => {
  const { name } = await User.findById(userId).select('-password');

  return name;
};

const formatOrderDetails = async (order) => {
  let orderText = 'Order Details:\n\n';
  orderText += `Order ID: ${order._id}\n`;
  orderText += `User ID: ${order.user}\n`;
  const userName = await getUserName(order.user);
  orderText += `User Name: ${userName}\n\n`;

  orderText += 'Items:\n';
  order.orderItems.forEach((item, index) => {
    orderText += `${index + 1}. ${item.name} - Qty: ${item.qty}, Price: $${
      item.price
    }\n`;
  });

  orderText += `\nShipping Address:\n${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}\n\n`;

  orderText += `Payment Method: ${order.paymentMethod}\n\n`;

  orderText += `Prices:\n`;
  orderText += `  Items: $${order.itemsPrice}\n`;
  orderText += `  Tax: $${order.taxPrice}\n`;
  orderText += `  Shipping: $${order.shippingPrice}\n`;
  orderText += `  Total: $${order.totalPrice}\n`;

  return orderText;
};

export default formatOrderDetails;
