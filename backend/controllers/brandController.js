import asyncHandler from '../middleware/asyncHandler.js';
import Brand from '../models/brandModel.js';

// @desc    Fetch all brands
// @route   GET /api/brands
// @access  Public
const getBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find();

  res.json(brands);
});

// @desc    Create a brand
// @route   POST /api/brands
// @access  Private/Admin
const createBrand = asyncHandler(async (req, res) => {
  const brand = new Brand({
    name: 'Sample Brand',
    user: req.user._id,
  });

  const createdBrand = await brand.save();
  res.status(201).json(createdBrand);
});

// @desc    Update a brand
// @route   PUT /api/brands/:id
// @access  Private/Admin
const updateBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const brand = await Brand.findById(req.params.id);

  if (brand) {
    brand.name = name;

    const updatedBrand = await brand.save();
    res.json(updatedBrand);
  } else {
    res.status(404);
    throw new Error('Brand not found');
  }
});

// @desc    Delete a brand
// @route   DELETE /api/brands/:id
// @access  Private/Admin
const deleteBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  if (brand) {
    await Brand.deleteOne({ _id: brand._id });
    res.json({ message: 'Brand removed' });
  } else {
    res.status(404);
    throw new Error('Brand not found');
  }
});

// @desc    Fetch single brand
// @route   GET /api/brands/:id
// @access  Public
const getBrandById = asyncHandler(async (req, res) => {
  // NOTE: checking for valid ObjectId to prevent CastError moved to separate
  // middleware. See README for more info.

  const brand = await Brand.findById(req.params.id);
  if (brand) {
    return res.json(brand);
  } else {
    // NOTE: this will run if a valid ObjectId but no brand was found
    // i.e. brand may be null
    res.status(404);
    throw new Error('Brand not found');
  }
});

export { getBrands, getBrandById, createBrand, deleteBrand, updateBrand };
