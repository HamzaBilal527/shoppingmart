import mongoose from 'mongoose';

const brandSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
});

// Match user entered password to hashed password in database

// Encrypt password using bcrypt

const Brand = mongoose.model('Brand', brandSchema);

export default Brand;
