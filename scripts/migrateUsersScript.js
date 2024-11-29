const { connectMongoDB } = require('../config/mongo');
const migrateUsers = require('../migrates/migratesUsers');

const startMigrateUsers = async () => {
  try {
    await connectMongoDB();  // Connect to MongoDB
    await migrateUsers();    // Migrate users
    console.log('User migration completed.');
  } catch (error) {
    console.error('Error migrating users:', error);
  } finally {
    process.exit(0);
  }
};

startMigrateUsers();
