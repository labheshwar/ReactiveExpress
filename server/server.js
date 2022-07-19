import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';

import connectDB from './config/database.js';
import products from './data/products.js';

dotenv.config();
connectDB();
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/product/:id', (req, res) => {
  const product = products.find((product) => product._id === req.params.id);
  res.json(product);
});
const port = process.env.PORT || 4000;
app.listen(
  port,
  console.log(
    `Server running in ${process.env.NODE_ENV} at port ${port}`.yellow.bold
  )
);
