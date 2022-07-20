import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';

import User from './models/user.js';
import Product from './models/product.js';
import Order from './models/order.js';

import connectDB from './config/database.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // Deletes all data from collections
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Inserts data to collections
    const createdUser = await User.insertMany(users);
    const adminUser = createdUser.find((user) => user.isAdmin);

    const sampleProducts = products.map((product) => ({
      ...product,
      user: adminUser,
    }));

    await Product.insertMany(sampleProducts);

    console.log('Data successfully loaded!'.yellow.inverse);
    process.exit();
  } catch (err) {
    console.error(err.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data successfully destroyed!'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
