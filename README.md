const mysql = require('mysql2/promise');

async function queryDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const [rows] = await connection.execute('SELECT * FROM users');
  await connection.end();
  return rows;
}

module.exports = async (event, context) => {
  try {
    const data = await queryDatabase();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Lỗi:', error);
    return {
      statusCode: 500,
      body: 'Lỗi server',
    };
  }
};
