const mysqlConnection = require('../config/db');
const { connectMongoDB } = require('../config/mongo');

const migrateOrders = async () => {
  try {
    const [rows] = await mysqlConnection.query('SELECT * FROM orders');
    const db =  await connectMongoDB();

    for (const row of rows) {
      const user = await db.collection('users').findOne({_id: row.user_id});

      if (user) {
        const existingOrder = await db.collection('orders').findOne({_id: row.id});
       
       if(!existingOrder){
          await db.collection('orders').insertOne({
            _id:row.id,
            user_id: user._id, //refernce
            order_number: row.order_number,
            amount: row.amount,
            orderDate: row.order_date,
          });
          console.log(`Inserted order: ${row.product}`);
        } else {
          console.log(`Order already exists: ${row.product}`);
        }
      } else {
        console.log(`User not found for order: ${row.product}`);
      }
    }
  } catch (error) {
    console.error('Error migrating orders:', error);
  }
};
module.exports = migrateOrders;
