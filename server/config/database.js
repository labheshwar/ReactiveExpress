import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGOATLAS_URI);
    console.log(
      `MongoDB Connected: ${conn.connection.host}`.green.underline.bold
    );
  } catch (error) {
    console.log(`Error: ${error.message}`.red.bold);
    process.exit(1); // exit process with failure
  }
};

export default connectDB;
