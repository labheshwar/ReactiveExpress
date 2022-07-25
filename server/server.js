import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';

import connectDB from './config/database.js';
import productRoutes from './routes/product.js';
import userRoutes from './routes/user.js';
import orderRoutes from './routes/order.js';
import { notFound, errorHandler } from './middleware/error.js';

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', productRoutes);
app.use('/api', userRoutes);
app.use('/api', orderRoutes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(
  port,
  console.log(
    `Server running in ${process.env.NODE_ENV} at port ${port}`.yellow.bold
  )
);
