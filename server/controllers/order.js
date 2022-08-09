import asyncHandler from 'express-async-handler';
import Order from '../models/order.js';
import Product from '../models/product.js';
import { v4 as uuidv4 } from 'uuid';
import Stripe from 'stripe';
const stripe = new Stripe(
  'sk_test_51LSHSACD8SCdQJ2EED4Sap2flmrk16dr4gou4wJSaGBr3sD8zaFOp9GvIiv1XMoWskmK1M2zLghy7fBL3kPuuN4N00JXXkcRil',
  {
    apiVersion: '2022-08-01',
  }
);

// Create new order - Route: POST - /api/orders - PRIVATE

export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No items in cart');
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// Get order by ID - Route: GET - /api/order/:id - PRIVATE

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// Update Order to Paid - Route: PUT - /api/order/:id/pay - PRIVATE

export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const token = req.body;
  const order = await Order.findById(req.params.id);
  if (order) {
    try {
      const customer = await stripe.customers.create({
        email: token.email,
        source: token.id,
      });
      const payment = await stripe.charges.create(
        {
          amount: order.totalPrice * 100,
          currency: 'usd',
          customer: customer.id,
          receipt_email: token.email,
        },
        {
          idempotencyKey: uuidv4(),
        }
      );
      if (payment) {
        order.orderItems.forEach(async (item) => {
          const product = await Product.findById(item.product);
          product.countInStock = product.countInStock - item.qty;
          await product.save();
        });
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: payment.id,
          status: payment.status,
          email_address: payment.receipt_email,
        };
        const updatedOrder = await order.save();
        res.json(updatedOrder);
      } else {
        res.status(400);
        throw new Error('Payment failed');
      }
    } catch (error) {
      res.status(400);
      throw new Error(error);
    }
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// Get Logged In User Orders - Route: GET - /api/orders/myorders - PRIVATE

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// Get all Orders - Route: GET - /api/orders - PRIVATE - Admin

export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate('user', 'id name');
  res.json(orders);
});

// Update Order to Delivered - Route: PUT - /api/order/:id/deliver - PRIVATE - Admin

export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});
