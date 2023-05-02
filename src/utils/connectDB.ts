import mongoose from 'mongoose';
import config from 'config';

const dbUrl = `mongodb://${config.get('dbName')}:${config.get(
  'dbPass'
)}@localhost:6000/petApp?authSource=admin`;

async function connectDB() {
  try {
    await mongoose.connect(dbUrl);
    console.log('? Database connected successfully');
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
}

export default connectDB;
