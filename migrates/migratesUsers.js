// // scripts/migrateUsers.js
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const User = require('../models/userModels');
// const { connectMongoDB, connectMySQL } = require('../config/db');
// const { fetchUsersFromMySQL } = require('../services/mysql');

// dotenv.config();
// // Connect to MongoDB
// connectMongoDB();

// // Connect to MySQL
// const mysqlConnection = connectMySQL();

// // Function to insert user data into MongoDB
// const insertUserIntoMongoDB = async (userData) => {
//   const user = new User(userData);
//   try {
//     await user.save();
//     console.log(`User inserted into MongoDB: ${userData.name}`);
//   } catch (error) {
//     console.error('Error inserting user into MongoDB:', error);
//   }
// };
// const migrateUsers = async () => {
//   try {
//     const users = await fetchUsersFromMySQL();
//     for (const user of users) {
//       const userData = {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         createdAt: user.created_at,
//       };
//       await insertUserIntoMongoDB(userData);
//     }
//     console.log('User migration completed successfully.');
//     mysqlConnection.end();
//     mongoose.connection.close();
//   } catch (error) {
//     console.error('Error during migration:', error);
//   }
// };

// migrateUsers();

const mysqlConnection = require('../config/db');
const { connectMongoDB } = require('../config/mongo');

const migrateUsers = async () => {
  try {
    const [rows] = await mysqlConnection.query('SELECT * FROM users');
    const db = await connectMongoDB();

    for (const row of rows) {
      const existingUser = await db.collection('users').findOne({_id: row.id });

      if (!existingUser) {
        await db.collection('users').insertOne({
          _id: row.id,
          name: row.name,
          email: row.email,
          createdAt: row.created_at,
        });
        console.log(`Inserted user: ${row.name}`);
      } else {
        console.log(`User already exists: ${row.name}`);
      }
    }
  } catch (error) {
    console.error('Error migrating users:', error);
  }
};

module.exports = migrateUsers;
