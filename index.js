require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/errorHandlingMiddleware')

const PORT = process.env.PORT || 5432 || 5321

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)

app.use(errorHandler);

const start = async() => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`☑ Подключение к базе настроено по порту ${PORT}\n ---------------------------\n Имя базы: ${ process.env.DB_NAME}\n Хост: ${ process.env.DB_HOST} \n Порт Postgre: ${ process.env.DB_PORT} \n ---------------------------\n`))
    } catch (error) {
        console.error('⛝ Ошибка подключения к базе данных:\n ---------------------------\n ', error, '\n---------------------------');
    }
}

start()