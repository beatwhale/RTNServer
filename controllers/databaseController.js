const { Pool } = require("pg");

const pool = new Pool({
  database: 'registry',
  username: 'postgres',
  password: '123321',
  host: 'localhost',
  port: '5432',
  dialect: 'postgres',
});

// Обработка запроса проверки подключения к базе данных
exports.checkDatabaseConnection = async (req, res) => {
  try {
    // Попытка установить подключение к базе данных
    await pool.query("SELECT NOW()");
    res.json({ connected: true }); // Отправка JSON-ответа с подтверждением подключения
  } catch (error) {
    console.error("Ошибка при подключении к базе данных:", error);
    res.json({ connected: false }); // Отправка JSON-ответа с отрицательным подключением
  }
};
