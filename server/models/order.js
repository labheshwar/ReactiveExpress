import mongoose from 'mongoose';

const orderItemsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId, // reference to product
    required: true,
    ref: 'Product',
  },
});

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // reference to user
    required: true,
    ref: 'User',
  },
  name: {
    type: String,
    requried: true,
  },
  orderItems: [orderItemsSchema],
  shippingAddress: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentResult: {
    id: {
      type: String,
    },
    status: {
      type: String,
    },
    update_tiem: {
      type: String,
    },
    email_address: {
      type: String,
    },
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },
  paidAt: {
    type: Date,
  },
  isDelivered: {
    type: Boolean,
    required: true,
    default: false,
  },
  deliveredAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
