// const mysql = require('mysql2');

// // Create MySQL connection using environment variables
// const mysqlConnection = mysql.createConnection({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DATABASE,
// });

// //fetch users from MySQL database
// const fetchUsersFromMySQL = () => {
//   return new Promise((resolve, reject) => {
//     mysqlConnection.query('SELECT * FROM users', (err, results) => {
//       if (err) {
//         reject(err);
//       }
//       resolve(results);
//     });
//   });
// };
// module.exports = {fetchUsersFromMySQL};
