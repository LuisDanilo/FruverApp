import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize({
    username: 'admin',
    database: 'fruverdb',
    password: 'Admin123',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
})