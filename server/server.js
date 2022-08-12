import express from 'express';
import morgan from 'morgan';
import path from 'path';
import dotenv from 'dotenv';
import colors from 'colors';

import connectDB from './config/database.js';
import productRoutes from './routes/product.js';
import userRoutes from './routes/user.js';
import orderRoutes from './routes/order.js';
import uploadRoutes from './routes/upload.js';
import { notFound, errorHandler } from './middleware/error.js';

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api', productRoutes);
app.use('/api', userRoutes);
app.use('/api', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.get('/api/stripe/pk', (req, res) =>
  res.send(process.env.STRIPE_PRIMARY_KEY)
);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(
  port,
  console.log(
    `Server running in ${process.env.NODE_ENV} at port ${port}`.yellow.bold
  )
);
