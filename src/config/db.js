const mysql = require('mysql2/promise')
// 创建数据库连接池
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Googledns8888.',
    database: 'task_scheduler',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });


  // 初始化数据库
async function initDatabase() {
    const conn = await pool.getConnection();
    try {
      await conn.query(`
        CREATE TABLE IF NOT EXISTS tasks (
          id VARCHAR(36) PRIMARY KEY,
          command TEXT,
          params TEXT,
          schedule VARCHAR(100),
          status VARCHAR(20),
          result TEXT
        )
      `);
    } finally {
      conn.release();
    }
  }

  module.exports = {
    pool,
    initDatabase
  }