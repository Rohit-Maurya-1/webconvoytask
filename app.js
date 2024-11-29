const { connectMongoDB } = require('./config/mongo');
const migrateUsers = require('./migrates/migratesUsers');
const migrateOrders = require('./migrates/migratesOrders');

const startMigration = async () => {
  try {
    await connectMongoDB(); // Connect to MongoDB
    await migrateUsers();   // Migrate Users
    await migrateOrders();  // Migrate Orders
    console.log('All migrations completed.');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    process.exit(0);
  }
};

startMigration();
