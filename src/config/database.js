/**
 * MongoDB Database Connection
 * Handles connection to MongoDB using Mongoose
 */

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/kambaz';
    
    console.log('🔄 Connecting to MongoDB...');
    console.log(`📍 URI: ${mongoURI.replace(/\/\/.*:.*@/, '//<credentials>@')}`);
    
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log('='.repeat(50));
    console.log(`✅ MongoDB Connected Successfully!`);
    console.log(`📦 Database: ${conn.connection.name}`);
    console.log(`🖥️  Host: ${conn.connection.host}`);
    console.log('='.repeat(50));
    
    return conn;
  } catch (error) {
    console.error('='.repeat(50));
    console.error(`❌ MongoDB Connection Error!`);
    console.error(`📛 Error: ${error.message}`);
    console.error('='.repeat(50));
    console.error('\n🔧 Troubleshooting tips:');
    console.error('   1. Check if MONGODB_URI is correct in .env');
    console.error('   2. Verify your IP is whitelisted in MongoDB Atlas');
    console.error('   3. Check database user credentials');
    console.error('   4. Ensure cluster is running\n');
    process.exit(1);
  }
};

export default connectDB;
