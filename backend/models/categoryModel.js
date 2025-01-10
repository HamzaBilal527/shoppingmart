import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
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

const Category = mongoose.model('Category', categorySchema);

export default Category;
