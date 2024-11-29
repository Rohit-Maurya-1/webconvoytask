const { connectMongoDB } = require('../config/mongo');
const migrateOrders = require('../migrates/migratesOrders');

const startMigrateOrders = async () => {
  try {
    await connectMongoDB();   // Connect to MongoDB
    await migrateOrders();    // Migrate orders
    console.log('Order migration completed.');
  } catch (error) {
    console.error('Error migrating orders:', error);
  } finally {
    process.exit(0);
  }
};

startMigrateOrders();
