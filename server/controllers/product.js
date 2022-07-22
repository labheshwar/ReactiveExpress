import asyncHandler from 'express-async-handler';
import Product from '../models/product.js';

// Get all products - Route: GET - /api/products - PUBLIC

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// Get a product by ID - Route: GET - /api/product/:id - PUBLIC

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});
