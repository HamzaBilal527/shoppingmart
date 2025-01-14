import User from '../models/userModel.js';
const generateOrderDetails = async (updatedOrder, statusText) => {
  const getUserName = async (userId) => {
    const { name } = await User.findById(userId).select('-password');
    return name;
  };

  // Fetch customer name
  const customerName = await getUserName(updatedOrder.user);

  // Order details
  const orderDetails = `
    Order ID: ${updatedOrder._id.toString().slice(-5)}
    Payment Method: ${updatedOrder.paymentMethod}
    Shipping Address: ${updatedOrder.shippingAddress.address}, ${
    updatedOrder.shippingAddress.city
  }, ${updatedOrder.shippingAddress.country}, ${
    updatedOrder.shippingAddress.postalCode
  }
    Items: ${updatedOrder.orderItems
      .map(
        (item) =>
          `\n      - ${item.name} (Qty: ${item.qty}, Price: $${item.price})`
      )
      .join('')}
    Items Price: $${updatedOrder.itemsPrice}
    Tax: $${updatedOrder.taxPrice}
    Shipping: $${updatedOrder.shippingPrice}
    Total Price: $${updatedOrder.totalPrice}
  `;

  // Construct the email body
  const emailMessage = `
    Dear Customer ${customerName},

    Your order with the following details:

    ${orderDetails}

    ${statusText}

    Thank you for shopping with us!
  `;

  return emailMessage;
};

export default generateOrderDetails;
