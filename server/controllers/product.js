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

// Delete a product by ID - Route: DELETE - /api/product/:id - PRIVATE - Admin

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product deleted successfully' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// Create a product - Route: POST - /api/product - PRIVATE - Admin

export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample Name',
    price: 0,
    user: 'req.user._id',
    image: '/image/sample.jpg',
    brand: 'Sample Brand',
    category: 'Sample Category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample Description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// Update a product - Route: PUT - /api/product/:id - PRIVATE - Admin

export const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// Create New Review - Route: POST - /api/product/:id/review - PRIVATE

export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find((review) => {
      return review.user.toString() === req.user._id.toString();
    });

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('You have already reviewed this product');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.numReviews;

    await product.save();
    res.status(201).json({
      message: 'Review created successfully',
    });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});
