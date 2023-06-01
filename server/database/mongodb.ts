import mongoose from 'mongoose';

const url = 'mongodb://127.0.0.1/Synapse';

const connectDatabase = () => {
  console.log(`Connecting to MongoDB...`);
  try {
    mongoose.connect(url);

    console.log('MongoDB connected');
  } catch (error) {
    console.log(`MongoDB connection error:`, error);
  }
};

export default connectDatabase;
