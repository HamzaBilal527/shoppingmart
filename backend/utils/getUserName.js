import User from '../models/userModel.js';

const getUserDetails = async (userId) => {
  const { name, email } = await User.findById(userId).select('-password');
  return { name, email };
};

export default getUserDetails;
