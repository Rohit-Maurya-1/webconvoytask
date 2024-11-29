// config/mongo.js
const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connectMongoDB = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB locally');
    return client.db(); // returns the database object
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = { connectMongoDB };
