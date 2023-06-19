const SequelizeAuto = require('sequelize-auto');
const path = require('path');

// Конфигурация подключения к базе данных
const databaseConfig = {
    database: 'registry',
    username: 'postgres',
    password: '123321',
    host: 'localhost',
    port: '5432',
    dialect: 'postgres',
};

// Создание экземпляра генератора моделей
const auto = new SequelizeAuto(databaseConfig.database, databaseConfig.username, databaseConfig.password, {
    ...databaseConfig,
    directory: path.resolve(__dirname, 'modelsGenerated'), // Путь для сохранения сгенерированных моделей
    camelCase: true, // Использовать стиль написания в camelCase для имен моделей
});

// Генерация моделей на основе существующей базы данных
auto.run((err) => {
    if (err) {
        console.error('Ошибка генерации моделей:', err);
    } else {
        console.log('Модели успешно сгенерированы!');
    }
});